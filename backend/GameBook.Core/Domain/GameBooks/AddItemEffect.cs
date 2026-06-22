namespace GameBook.Core.Domain.GameBooks;

public sealed class AddItemEffect(string item) : ChoiceEffect("addItem")
{
    public string Item { get; } = string.IsNullOrWhiteSpace(item)
        ? throw new ArgumentException("Effect item is required.", nameof(item))
        : item;

    public override void Apply(PlayerState playerState)
    {
        ArgumentNullException.ThrowIfNull(playerState);
        playerState.AddItem(Item);
    }
}
