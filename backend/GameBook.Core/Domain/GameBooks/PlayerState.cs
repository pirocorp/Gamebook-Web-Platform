namespace GameBook.Core.Domain.GameBooks;

public sealed class PlayerState
{
    public PlayerState(
        string readerName,
        int? rating,
        int money,
        IReadOnlyList<string> items,
        IReadOnlyList<string> skills,
        IReadOnlyList<string> codeWords,
        string notes,
        IReadOnlyDictionary<string, string?> custom)
    {
        if (money < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(money), "Player money cannot be negative.");
        }

        ReaderName = readerName ?? string.Empty;
        Rating = rating;
        Money = money;
        Items = new List<string>(items ?? throw new ArgumentNullException(nameof(items)));
        Skills = new List<string>(skills ?? throw new ArgumentNullException(nameof(skills)));
        CodeWords = new List<string>(codeWords ?? throw new ArgumentNullException(nameof(codeWords)));
        Notes = notes ?? string.Empty;
        Custom = new Dictionary<string, string?>(custom ?? throw new ArgumentNullException(nameof(custom)));
    }

    public string ReaderName { get; private set; }

    public int? Rating { get; private set; }

    public int Money { get; private set; }

    public List<string> Items { get; }

    public List<string> Skills { get; }

    public List<string> CodeWords { get; }

    public string Notes { get; private set; }

    public Dictionary<string, string?> Custom { get; }

    public PlayerState Clone()
    {
        return new PlayerState(
            ReaderName,
            Rating,
            Money,
            Items.ToArray(),
            Skills.ToArray(),
            CodeWords.ToArray(),
            Notes,
            new Dictionary<string, string?>(Custom));
    }

    public bool HasAtLeastMoney(int amount)
    {
        if (amount < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount cannot be negative.");
        }

        return Money >= amount;
    }

    public void AddItem(string item)
    {
        if (string.IsNullOrWhiteSpace(item))
        {
            throw new ArgumentException("Item is required.", nameof(item));
        }

        if (!Items.Contains(item, StringComparer.Ordinal))
        {
            Items.Add(item);
        }
    }

    public void RemoveMoney(int amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount must be greater than zero.");
        }

        if (Money < amount)
        {
            throw new InvalidOperationException($"Player does not have enough money to remove {amount}.");
        }

        Money -= amount;
    }
}
