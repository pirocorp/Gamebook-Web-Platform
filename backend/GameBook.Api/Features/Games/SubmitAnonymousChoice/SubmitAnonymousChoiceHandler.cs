using GameBook.Api.Features.Games.Common;
using GameBook.Core.Interfaces;
using MediatR;

namespace GameBook.Api.Features.Games.SubmitAnonymousChoice;

public sealed class SubmitAnonymousChoiceHandler(IGamePlayService gamePlayService)
    : IRequestHandler<SubmitAnonymousChoiceCommand, AnonymousGameStateResponse>
{
    public async Task<AnonymousGameStateResponse> Handle(
        SubmitAnonymousChoiceCommand request,
        CancellationToken cancellationToken)
    {
        var state = await gamePlayService.ExecuteChoiceAsync(
            request.Save,
            request.ChoiceKey,
            cancellationToken);

        return AnonymousGameStateResponse.FromDomain(state);
    }
}
