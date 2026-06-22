using System.Text.Json;
using GameBook.Core.Domain.GameBooks;
using GameBook.Core.Interfaces;
using Microsoft.Extensions.Hosting;

namespace GameBook.Data;

public sealed class FileSystemGameBookPackageRepository(IHostEnvironment hostEnvironment) : IGameBookPackageRepository
{
    private static readonly JsonSerializerOptions JsonSerializerOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public async Task<IReadOnlyList<GameBookPackage>> ListAsync(CancellationToken cancellationToken)
    {
        var packagesPath = ResolvePackagesPath();
        var gamebookFiles = Directory.EnumerateFiles(packagesPath, "gamebook.json", SearchOption.AllDirectories)
            .OrderBy(path => path, StringComparer.Ordinal)
            .ToArray();

        var packages = new List<GameBookPackage>(gamebookFiles.Length);
        foreach (var gamebookFile in gamebookFiles)
        {
            packages.Add(await ReadPackageAsync(gamebookFile, cancellationToken));
        }

        return packages;
    }

    public async Task<GameBookPackage?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Gamebook slug is required.", nameof(slug));
        }

        var packagesPath = ResolvePackagesPath();
        var gamebookFile = Path.Combine(packagesPath, slug, "gamebook.json");

        if (!File.Exists(gamebookFile))
        {
            return null;
        }

        return await ReadPackageAsync(gamebookFile, cancellationToken);
    }

    private string ResolvePackagesPath()
    {
        return GameBookPackagePathResolver.Resolve(hostEnvironment.ContentRootPath, AppContext.BaseDirectory);
    }

    private static async Task<GameBookPackage> ReadPackageAsync(string gamebookFile, CancellationToken cancellationToken)
    {
        await using var stream = File.OpenRead(gamebookFile);
        var document = await JsonSerializer.DeserializeAsync<GameBookPackageDocument>(
            stream,
            JsonSerializerOptions,
            cancellationToken)
            ?? throw new InvalidOperationException($"Gamebook package '{gamebookFile}' could not be deserialized.");

        return document.ToDomain();
    }

    private sealed record GameBookPackageDocument(
        string Slug,
        string Language,
        string Title,
        string? Author,
        string? Description,
        string StartEpisodeKey,
        PlayerStateDocument InitialState,
        IReadOnlyList<EpisodeDocument> Episodes)
    {
        public GameBookPackage ToDomain()
        {
            return new GameBookPackage(
                Slug,
                Language,
                Title,
                Author,
                Description,
                StartEpisodeKey,
                InitialState.ToDomain(),
                Episodes.Select(episode => episode.ToDomain()).ToArray());
        }
    }

    private sealed record PlayerStateDocument(
        string? ReaderName,
        int? Rating,
        int Money,
        IReadOnlyList<string>? Items,
        IReadOnlyList<string>? Skills,
        IReadOnlyList<string>? CodeWords,
        string? Notes,
        Dictionary<string, string?>? Custom)
    {
        public PlayerState ToDomain()
        {
            return new PlayerState(
                ReaderName ?? string.Empty,
                Rating,
                Money,
                Items ?? Array.Empty<string>(),
                Skills ?? Array.Empty<string>(),
                CodeWords ?? Array.Empty<string>(),
                Notes ?? string.Empty,
                Custom ?? new Dictionary<string, string?>());
        }
    }

    private sealed record EpisodeDocument(
        string Key,
        string? Title,
        string DisplayText,
        IReadOnlyList<ChoiceDocument>? Choices)
    {
        public GameBookEpisode ToDomain()
        {
            return new GameBookEpisode(
                Key,
                Title,
                DisplayText,
                (Choices ?? Array.Empty<ChoiceDocument>()).Select(choice => choice.ToDomain()).ToArray());
        }
    }

    private sealed record ChoiceDocument(
        string Key,
        string DisplayLabel,
        string TargetEpisodeKey,
        ConditionDocument? Conditions,
        IReadOnlyList<EffectDocument>? Effects)
    {
        public GameBookChoice ToDomain()
        {
            return new GameBookChoice(
                Key,
                DisplayLabel,
                TargetEpisodeKey,
                Conditions?.ToDomain(),
                (Effects ?? Array.Empty<EffectDocument>()).Select(effect => effect.ToDomain()).ToArray());
        }
    }

    private sealed record ConditionDocument(string Type, int? Amount)
    {
        public ChoiceCondition ToDomain()
        {
            return Type switch
            {
                "moneyAtLeast" when Amount.HasValue => new MoneyAtLeastCondition(Amount.Value),
                _ => new UnsupportedChoiceCondition(Type)
            };
        }
    }

    private sealed record EffectDocument(string Type, string? Item, int? Amount)
    {
        public ChoiceEffect ToDomain()
        {
            return Type switch
            {
                "addItem" when !string.IsNullOrWhiteSpace(Item) => new AddItemEffect(Item),
                "removeMoney" when Amount.HasValue => new RemoveMoneyEffect(Amount.Value),
                _ => new UnsupportedChoiceEffect(Type)
            };
        }
    }
}
