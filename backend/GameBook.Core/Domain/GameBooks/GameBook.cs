namespace GameBook.Core.Domain.GameBooks;

public sealed class GameBook
{
    public GameBook(Guid id, string slug, string title)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Gamebook slug is required.", nameof(slug));
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Gamebook title is required.", nameof(title));
        }

        Id = id;
        Slug = slug;
        Title = title;
    }

    public Guid Id { get; private set; }

    public string Slug { get; private set; }

    public string Title { get; private set; }
}
