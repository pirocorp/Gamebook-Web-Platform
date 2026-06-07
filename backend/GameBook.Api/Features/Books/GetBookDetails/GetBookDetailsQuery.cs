using MediatR;

namespace GameBook.Api.Features.Books.GetBookDetails;

public sealed record GetBookDetailsQuery(string Slug) : IRequest<BookDetailsResponse?>;
