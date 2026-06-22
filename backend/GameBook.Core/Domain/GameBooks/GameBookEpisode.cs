namespace GameBook.Core.Domain.GameBooks;

public sealed class GameBookEpisode
{
    public GameBookEpisode(
        string key,
        string? title,
        string displayText,
        IReadOnlyList<GameBookChoice> choices)
    {
        if (string.IsNullOrWhiteSpace(key))
        {
            throw new ArgumentException("Episode key is required.", nameof(key));
        }

        if (string.IsNullOrWhiteSpace(displayText))
        {
            throw new ArgumentException("Episode display text is required.", nameof(displayText));
        }

        Key = key;
        Title = title;
        DisplayText = displayText;
        Choices = choices ?? throw new ArgumentNullException(nameof(choices));
    }

    public string Key { get; }

    public string? Title { get; }

    public string DisplayText { get; }

    public IReadOnlyList<GameBookChoice> Choices { get; }
}
