using GameBook.Core.Interfaces;
using MediatR;

namespace GameBook.Api.Features.Books.GetBooks;

public sealed class GetBooksHandler(IGameBookRepository gameBookRepository)
    : IRequestHandler<GetBooksQuery, IReadOnlyList<BookListItemResponse>>
{
    public async Task<IReadOnlyList<BookListItemResponse>> Handle(
        GetBooksQuery request,
        CancellationToken cancellationToken)
    {
        var gameBooks = await gameBookRepository.ListAsync(cancellationToken);

        return gameBooks
            .Select(gameBook => new BookListItemResponse(gameBook.Id, gameBook.Slug, gameBook.Title))
            .ToArray();
    }
}
