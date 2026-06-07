using GameBookEntity = GameBook.Core.Domain.GameBooks.GameBook;

namespace GameBook.Core.Interfaces;

public interface IGameBookRepository
{
    Task<IReadOnlyList<GameBookEntity>> ListAsync(CancellationToken cancellationToken);

    Task<GameBookEntity?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
}
