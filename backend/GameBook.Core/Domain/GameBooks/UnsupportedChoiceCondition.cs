namespace GameBook.Core.Domain.GameBooks;

public sealed class UnsupportedChoiceCondition(string type) : ChoiceCondition(type)
{
    public override bool IsSatisfiedBy(PlayerState playerState)
    {
        ArgumentNullException.ThrowIfNull(playerState);
        return false;
    }
}
