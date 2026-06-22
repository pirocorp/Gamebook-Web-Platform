using GameBook.Api.Features.Games.Common;
using MediatR;

namespace GameBook.Api.Features.Games.StartAnonymousGame;

public sealed record StartAnonymousGameCommand(string GamebookSlug) : IRequest<AnonymousGameStateResponse>;
