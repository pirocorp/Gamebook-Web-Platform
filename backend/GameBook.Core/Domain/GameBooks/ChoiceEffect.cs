namespace GameBook.Core.Domain.GameBooks;

public abstract class ChoiceEffect
{
    protected ChoiceEffect(string type)
    {
        Type = type;
    }

    public string Type { get; }

    public abstract void Apply(PlayerState playerState);
}
