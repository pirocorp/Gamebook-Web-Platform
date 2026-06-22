namespace GameBook.Core.Domain.GameBooks;

public abstract class ChoiceCondition
{
    protected ChoiceCondition(string type)
    {
        Type = type;
    }

    public string Type { get; }

    public abstract bool IsSatisfiedBy(PlayerState playerState);
}
