using MediatR;

namespace GameBook.Api.Features.Books.GetBooks;

public sealed record GetBooksQuery : IRequest<IReadOnlyList<BookListItemResponse>>;
