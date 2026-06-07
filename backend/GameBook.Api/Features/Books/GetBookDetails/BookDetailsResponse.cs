namespace GameBook.Api.Features.Books.GetBookDetails;

/// <summary>Represents the public details payload for a single gamebook.</summary>
public sealed record BookDetailsResponse(
    Guid Id,
    string Slug,
    string Title);
