namespace GameBook.Core.Domain.GameBooks;

public sealed class UnsupportedChoiceEffect(string type) : ChoiceEffect(type)
{
    public override void Apply(PlayerState playerState)
    {
        ArgumentNullException.ThrowIfNull(playerState);
        throw new InvalidOperationException($"Effect type '{Type}' is not supported in the current backend slice.");
    }
}
