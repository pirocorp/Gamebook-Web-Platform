namespace GameBook.Api.Features.Games.StartAnonymousGame;

/// <summary>Payload for starting a new anonymous game from a gamebook slug.</summary>
public sealed record StartAnonymousGameRequest(string GamebookSlug);
