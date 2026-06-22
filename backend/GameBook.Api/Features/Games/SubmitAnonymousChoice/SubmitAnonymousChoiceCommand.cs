using GameBook.Api.Features.Games.Common;
using GameBook.Core.Domain.GameBooks;
using MediatR;

namespace GameBook.Api.Features.Games.SubmitAnonymousChoice;

public sealed record SubmitAnonymousChoiceCommand(
    AnonymousGameSave Save,
    string ChoiceKey) : IRequest<AnonymousGameStateResponse>;
