using GameBook.Core.Domain.GameBooks;

namespace GameBook.Core.GameEngine;

public sealed class AnonymousGameState
{
    public AnonymousGameState(
        string gamebookSlug,
        string gamebookTitle,
        AnonymousGameSave save,
        GameBookEpisode episode,
        IReadOnlyList<GameBookChoice> availableChoices)
    {
        GamebookSlug = gamebookSlug;
        GamebookTitle = gamebookTitle;
        Save = save;
        Episode = episode;
        AvailableChoices = availableChoices;
    }

    public string GamebookSlug { get; }

    public string GamebookTitle { get; }

    public AnonymousGameSave Save { get; }

    public GameBookEpisode Episode { get; }

    public IReadOnlyList<GameBookChoice> AvailableChoices { get; }

    public bool IsCompleted => AvailableChoices.Count == 0;
}
