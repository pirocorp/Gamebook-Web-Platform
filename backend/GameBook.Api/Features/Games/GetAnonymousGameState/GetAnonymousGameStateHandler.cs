using GameBook.Api.Features.Games.Common;
using GameBook.Core.Interfaces;
using MediatR;

namespace GameBook.Api.Features.Games.GetAnonymousGameState;

public sealed class GetAnonymousGameStateHandler(IGamePlayService gamePlayService)
    : IRequestHandler<GetAnonymousGameStateQuery, AnonymousGameStateResponse>
{
    public async Task<AnonymousGameStateResponse> Handle(
        GetAnonymousGameStateQuery request,
        CancellationToken cancellationToken)
    {
        var state = await gamePlayService.GetStateAsync(request.Save, cancellationToken);
        return AnonymousGameStateResponse.FromDomain(state);
    }
}
