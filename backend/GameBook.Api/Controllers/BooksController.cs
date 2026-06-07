using GameBook.Api.Features.Books.GetBookDetails;
using GameBook.Api.Features.Books.GetBooks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GameBook.Api.Controllers;

[ApiController]
[Route("api/books")]
public sealed class BooksController(ISender sender) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<BookListItemResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<BookListItemResponse>>> GetBooks(CancellationToken cancellationToken)
    {
        var response = await sender.Send(new GetBooksQuery(), cancellationToken);
        return Ok(response);
    }

    [HttpGet("{slug}")]
    [ProducesResponseType(typeof(BookDetailsResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<BookDetailsResponse>> GetBookBySlug(
        string slug,
        CancellationToken cancellationToken)
    {
        var response = await sender.Send(new GetBookDetailsQuery(slug), cancellationToken);

        return response is null ? NotFound() : Ok(response);
    }
}
