using GameBook.Core.Domain.GameBooks;
using GameBook.Core.GameEngine;

namespace GameBook.Core.Interfaces;

public interface IGamePlayService
{
    Task<AnonymousGameState> StartAsync(string gamebookSlug, CancellationToken cancellationToken);

    Task<AnonymousGameState> GetStateAsync(AnonymousGameSave save, CancellationToken cancellationToken);

    Task<AnonymousGameState> ExecuteChoiceAsync(
        AnonymousGameSave save,
        string choiceKey,
        CancellationToken cancellationToken);
}
