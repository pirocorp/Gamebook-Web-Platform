using GameBook.Core.Domain.GameBooks;

namespace GameBook.Api.Features.Games.Common;

/// <summary>Represents the anonymous save payload persisted by the browser.</summary>
public sealed record AnonymousGameSaveDto(
    string GamebookSlug,
    string CurrentEpisodeKey,
    PlayerStateDto PlayerState)
{
    public AnonymousGameSave ToDomain()
    {
        return new AnonymousGameSave(GamebookSlug, CurrentEpisodeKey, PlayerState.ToDomain());
    }

    public static AnonymousGameSaveDto FromDomain(AnonymousGameSave save)
    {
        return new AnonymousGameSaveDto(
            save.GamebookSlug,
            save.CurrentEpisodeKey,
            PlayerStateDto.FromDomain(save.PlayerState));
    }
}
