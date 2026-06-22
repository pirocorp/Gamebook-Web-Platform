namespace GameBook.Core.Domain.GameBooks;

public sealed class GameBookPackage
{
    private readonly Dictionary<string, GameBookEpisode> episodesByKey;

    public GameBookPackage(
        string slug,
        string language,
        string title,
        string? author,
        string? description,
        string startEpisodeKey,
        PlayerState initialState,
        IReadOnlyList<GameBookEpisode> episodes)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Gamebook package slug is required.", nameof(slug));
        }

        if (string.IsNullOrWhiteSpace(language))
        {
            throw new ArgumentException("Gamebook package language is required.", nameof(language));
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Gamebook package title is required.", nameof(title));
        }

        if (string.IsNullOrWhiteSpace(startEpisodeKey))
        {
            throw new ArgumentException("Gamebook package start episode key is required.", nameof(startEpisodeKey));
        }

        if (episodes.Count == 0)
        {
            throw new ArgumentException("Gamebook package must contain at least one episode.", nameof(episodes));
        }

        episodesByKey = episodes.ToDictionary(episode => episode.Key, StringComparer.Ordinal);

        if (!episodesByKey.ContainsKey(startEpisodeKey))
        {
            throw new ArgumentException("Gamebook package start episode key must exist in the episodes list.", nameof(startEpisodeKey));
        }

        Slug = slug;
        Language = language;
        Title = title;
        Author = author;
        Description = description;
        StartEpisodeKey = startEpisodeKey;
        InitialState = initialState ?? throw new ArgumentNullException(nameof(initialState));
        Episodes = episodes;
    }

    public string Slug { get; }

    public string Language { get; }

    public string Title { get; }

    public string? Author { get; }

    public string? Description { get; }

    public string StartEpisodeKey { get; }

    public PlayerState InitialState { get; }

    public IReadOnlyList<GameBookEpisode> Episodes { get; }

    public GameBookEpisode GetEpisode(string episodeKey)
    {
        if (!episodesByKey.TryGetValue(episodeKey, out var episode))
        {
            throw new KeyNotFoundException($"Episode '{episodeKey}' does not exist in gamebook '{Slug}'.");
        }

        return episode;
    }
}
