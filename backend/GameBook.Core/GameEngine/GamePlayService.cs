using GameBook.Core.Domain.GameBooks;
using GameBook.Core.Interfaces;

namespace GameBook.Core.GameEngine;

public sealed class GamePlayService(IGameBookPackageRepository gameBookPackageRepository) : IGamePlayService
{
    public async Task<AnonymousGameState> StartAsync(string gamebookSlug, CancellationToken cancellationToken)
    {
        var package = await GetPackageOrThrowAsync(gamebookSlug, cancellationToken);
        var save = new AnonymousGameSave(package.Slug, package.StartEpisodeKey, package.InitialState.Clone());

        return BuildGameState(package, save);
    }

    public async Task<AnonymousGameState> GetStateAsync(AnonymousGameSave save, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(save);

        var package = await GetPackageOrThrowAsync(save.GamebookSlug, cancellationToken);
        return BuildGameState(package, save);
    }

    public async Task<AnonymousGameState> ExecuteChoiceAsync(
        AnonymousGameSave save,
        string choiceKey,
        CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(save);

        if (string.IsNullOrWhiteSpace(choiceKey))
        {
            throw new ArgumentException("Choice key is required.", nameof(choiceKey));
        }

        var package = await GetPackageOrThrowAsync(save.GamebookSlug, cancellationToken);
        var episode = package.GetEpisode(save.CurrentEpisodeKey);
        var choice = episode.Choices.SingleOrDefault(item => item.Key == choiceKey)
            ?? throw new KeyNotFoundException($"Choice '{choiceKey}' does not exist in episode '{episode.Key}'.");

        if (!choice.IsAvailable(save.PlayerState))
        {
            throw new InvalidOperationException($"Choice '{choiceKey}' is not currently available.");
        }

        var nextState = save.PlayerState.Clone();
        foreach (var effect in choice.Effects)
        {
            effect.Apply(nextState);
        }

        var nextEpisode = package.GetEpisode(choice.TargetEpisodeKey);
        var nextSave = new AnonymousGameSave(package.Slug, nextEpisode.Key, nextState);

        return BuildGameState(package, nextSave);
    }

    private async Task<GameBookPackage> GetPackageOrThrowAsync(string gamebookSlug, CancellationToken cancellationToken)
    {
        var package = await gameBookPackageRepository.GetBySlugAsync(gamebookSlug, cancellationToken);
        return package ?? throw new KeyNotFoundException($"Gamebook '{gamebookSlug}' was not found.");
    }

    private static AnonymousGameState BuildGameState(GameBookPackage package, AnonymousGameSave save)
    {
        var episode = package.GetEpisode(save.CurrentEpisodeKey);
        var availableChoices = episode.Choices
            .Where(choice => choice.IsAvailable(save.PlayerState))
            .ToArray();

        return new AnonymousGameState(
            package.Slug,
            package.Title,
            new AnonymousGameSave(package.Slug, episode.Key, save.PlayerState.Clone()),
            episode,
            availableChoices);
    }
}
