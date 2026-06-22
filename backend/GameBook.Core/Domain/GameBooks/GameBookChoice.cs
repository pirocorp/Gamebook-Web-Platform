namespace GameBook.Core.Domain.GameBooks;

public sealed class GameBookChoice
{
    public GameBookChoice(
        string key,
        string displayLabel,
        string targetEpisodeKey,
        ChoiceCondition? condition,
        IReadOnlyList<ChoiceEffect> effects)
    {
        if (string.IsNullOrWhiteSpace(key))
        {
            throw new ArgumentException("Choice key is required.", nameof(key));
        }

        if (string.IsNullOrWhiteSpace(displayLabel))
        {
            throw new ArgumentException("Choice display label is required.", nameof(displayLabel));
        }

        if (string.IsNullOrWhiteSpace(targetEpisodeKey))
        {
            throw new ArgumentException("Choice target episode key is required.", nameof(targetEpisodeKey));
        }

        Key = key;
        DisplayLabel = displayLabel;
        TargetEpisodeKey = targetEpisodeKey;
        Condition = condition;
        Effects = effects ?? throw new ArgumentNullException(nameof(effects));
    }

    public string Key { get; }

    public string DisplayLabel { get; }

    public string TargetEpisodeKey { get; }

    public ChoiceCondition? Condition { get; }

    public IReadOnlyList<ChoiceEffect> Effects { get; }

    public bool IsAvailable(PlayerState playerState)
    {
        return Condition?.IsSatisfiedBy(playerState) ?? true;
    }
}
