namespace GameBook.Api.Features.Books.GetBooks;

/// <summary>Represents a gamebook item returned in the public book list.</summary>
public sealed record BookListItemResponse(
    Guid Id,
    string Slug,
    string Title);
