namespace GameBook.Core.Domain.GameBooks;

public sealed class AnonymousGameSave
{
    public AnonymousGameSave(string gamebookSlug, string currentEpisodeKey, PlayerState playerState)
    {
        if (string.IsNullOrWhiteSpace(gamebookSlug))
        {
            throw new ArgumentException("Gamebook slug is required.", nameof(gamebookSlug));
        }

        if (string.IsNullOrWhiteSpace(currentEpisodeKey))
        {
            throw new ArgumentException("Current episode key is required.", nameof(currentEpisodeKey));
        }

        GamebookSlug = gamebookSlug;
        CurrentEpisodeKey = currentEpisodeKey;
        PlayerState = playerState ?? throw new ArgumentNullException(nameof(playerState));
    }

    public string GamebookSlug { get; }

    public string CurrentEpisodeKey { get; }

    public PlayerState PlayerState { get; }
}
