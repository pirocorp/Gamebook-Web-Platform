using GameBook.Api.Features.Games.Common;
using GameBook.Core.Domain.GameBooks;
using MediatR;

namespace GameBook.Api.Features.Games.GetAnonymousGameState;

public sealed record GetAnonymousGameStateQuery(AnonymousGameSave Save) : IRequest<AnonymousGameStateResponse>;
