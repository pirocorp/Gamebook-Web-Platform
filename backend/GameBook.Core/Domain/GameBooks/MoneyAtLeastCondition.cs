namespace GameBook.Core.Domain.GameBooks;

public sealed class MoneyAtLeastCondition(int amount) : ChoiceCondition("moneyAtLeast")
{
    public int Amount { get; } = amount;

    public override bool IsSatisfiedBy(PlayerState playerState)
    {
        ArgumentNullException.ThrowIfNull(playerState);
        return playerState.HasAtLeastMoney(Amount);
    }
}
