namespace GameBook.Core.Domain.GameBooks;

public sealed class RemoveMoneyEffect(int amount) : ChoiceEffect("removeMoney")
{
    public int Amount { get; } = amount > 0
        ? amount
        : throw new ArgumentOutOfRangeException(nameof(amount), "Effect amount must be greater than zero.");

    public override void Apply(PlayerState playerState)
    {
        ArgumentNullException.ThrowIfNull(playerState);
        playerState.RemoveMoney(Amount);
    }
}
