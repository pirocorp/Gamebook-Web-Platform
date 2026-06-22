using GameBook.Core.Domain.GameBooks;

namespace GameBook.Api.Features.Games.Common;

/// <summary>Represents the mutable player diary state used during anonymous play.</summary>
public sealed record PlayerStateDto(
    string ReaderName,
    int? Rating,
    int Money,
    IReadOnlyList<string> Items,
    IReadOnlyList<string> Skills,
    IReadOnlyList<string> CodeWords,
    string Notes,
    IReadOnlyDictionary<string, string?> Custom)
{
    public PlayerState ToDomain()
    {
        return new PlayerState(
            ReaderName,
            Rating,
            Money,
            Items,
            Skills,
            CodeWords,
            Notes,
            Custom);
    }

    public static PlayerStateDto FromDomain(PlayerState playerState)
    {
        return new PlayerStateDto(
            playerState.ReaderName,
            playerState.Rating,
            playerState.Money,
            playerState.Items.ToArray(),
            playerState.Skills.ToArray(),
            playerState.CodeWords.ToArray(),
            playerState.Notes,
            new Dictionary<string, string?>(playerState.Custom));
    }
}
