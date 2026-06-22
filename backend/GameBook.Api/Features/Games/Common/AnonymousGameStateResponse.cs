using GameBook.Core.GameEngine;

namespace GameBook.Api.Features.Games.Common;

/// <summary>Represents the reader-facing game state returned by the backend.</summary>
public sealed record AnonymousGameStateResponse(
    string GamebookSlug,
    string GamebookTitle,
    AnonymousGameSaveDto Save,
    AnonymousGameEpisodeResponse Episode,
    bool IsCompleted)
{
    public static AnonymousGameStateResponse FromDomain(AnonymousGameState state)
    {
        return new AnonymousGameStateResponse(
            state.GamebookSlug,
            state.GamebookTitle,
            AnonymousGameSaveDto.FromDomain(state.Save),
            new AnonymousGameEpisodeResponse(
                state.Episode.Key,
                state.Episode.Title,
                state.Episode.DisplayText,
                state.AvailableChoices
                    .Select(choice => new AnonymousGameChoiceResponse(choice.Key, choice.DisplayLabel))
                    .ToArray()),
            state.IsCompleted);
    }
}
