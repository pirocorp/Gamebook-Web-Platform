using GameBook.Api.Features.Games.Common;
using GameBook.Api.Features.Games.GetAnonymousGameState;
using GameBook.Api.Features.Games.StartAnonymousGame;
using GameBook.Api.Features.Games.SubmitAnonymousChoice;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GameBook.Api.Controllers;

[ApiController]
[Route("api/games")]
public sealed class GamesController(ISender sender) : ControllerBase
{
    [HttpPost("anonymous/start")]
    [ProducesResponseType(typeof(AnonymousGameStateResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AnonymousGameStateResponse>> StartAnonymousGame(
        [FromBody] StartAnonymousGameRequest request,
        CancellationToken cancellationToken)
    {
        var response = await sender.Send(new StartAnonymousGameCommand(request.GamebookSlug), cancellationToken);
        return Ok(response);
    }

    [HttpPost("anonymous/state")]
    [ProducesResponseType(typeof(AnonymousGameStateResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AnonymousGameStateResponse>> GetAnonymousGameState(
        [FromBody] GetAnonymousGameStateRequest request,
        CancellationToken cancellationToken)
    {
        var response = await sender.Send(new GetAnonymousGameStateQuery(request.Save.ToDomain()), cancellationToken);
        return Ok(response);
    }

    [HttpPost("anonymous/choice")]
    [ProducesResponseType(typeof(AnonymousGameStateResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<AnonymousGameStateResponse>> SubmitAnonymousChoice(
        [FromBody] SubmitAnonymousChoiceRequest request,
        CancellationToken cancellationToken)
    {
        var response = await sender.Send(
            new SubmitAnonymousChoiceCommand(request.Save.ToDomain(), request.ChoiceKey),
            cancellationToken);

        return Ok(response);
    }
}
