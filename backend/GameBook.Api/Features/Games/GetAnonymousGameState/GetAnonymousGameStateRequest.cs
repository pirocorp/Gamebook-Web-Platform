using GameBook.Api.Features.Games.Common;

namespace GameBook.Api.Features.Games.GetAnonymousGameState;

/// <summary>Payload for hydrating the current anonymous game state from browser storage.</summary>
public sealed record GetAnonymousGameStateRequest(AnonymousGameSaveDto Save);
