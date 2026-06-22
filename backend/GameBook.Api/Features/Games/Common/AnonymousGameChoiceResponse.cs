namespace GameBook.Api.Features.Games.Common;

/// <summary>Represents a player-selectable choice in the current episode.</summary>
public sealed record AnonymousGameChoiceResponse(
    string Key,
    string Label);
