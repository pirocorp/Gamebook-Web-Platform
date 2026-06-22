using GameBook.Api.Features.Games.Common;
using GameBook.Core.Interfaces;
using MediatR;

namespace GameBook.Api.Features.Games.StartAnonymousGame;

public sealed class StartAnonymousGameHandler(IGamePlayService gamePlayService)
    : IRequestHandler<StartAnonymousGameCommand, AnonymousGameStateResponse>
{
    public async Task<AnonymousGameStateResponse> Handle(
        StartAnonymousGameCommand request,
        CancellationToken cancellationToken)
    {
        var state = await gamePlayService.StartAsync(request.GamebookSlug, cancellationToken);
        return AnonymousGameStateResponse.FromDomain(state);
    }
}
