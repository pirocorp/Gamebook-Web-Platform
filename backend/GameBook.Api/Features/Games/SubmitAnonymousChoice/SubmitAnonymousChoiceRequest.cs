using GameBook.Api.Features.Games.Common;

namespace GameBook.Api.Features.Games.SubmitAnonymousChoice;

/// <summary>Payload for applying a reader choice to the current anonymous save state.</summary>
public sealed record SubmitAnonymousChoiceRequest(
    AnonymousGameSaveDto Save,
    string ChoiceKey);
