namespace GameBook.Api.Features.Games.Common;

/// <summary>Represents the current episode returned to the reader.</summary>
public sealed record AnonymousGameEpisodeResponse(
    string Key,
    string? Title,
    string DisplayText,
    IReadOnlyList<AnonymousGameChoiceResponse> Choices);
