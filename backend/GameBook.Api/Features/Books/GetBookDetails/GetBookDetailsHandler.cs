using GameBook.Core.Interfaces;
using MediatR;

namespace GameBook.Api.Features.Books.GetBookDetails;

public sealed class GetBookDetailsHandler(IGameBookRepository gameBookRepository)
    : IRequestHandler<GetBookDetailsQuery, BookDetailsResponse?>
{
    public async Task<BookDetailsResponse?> Handle(
        GetBookDetailsQuery request,
        CancellationToken cancellationToken)
    {
        var gameBook = await gameBookRepository.GetBySlugAsync(request.Slug, cancellationToken);

        return gameBook is null
            ? null
            : new BookDetailsResponse(gameBook.Id, gameBook.Slug, gameBook.Title);
    }
}
