using GameBook.Core.Domain.GameBooks;

namespace GameBook.Core.Interfaces;

public interface IGameBookPackageRepository
{
    Task<IReadOnlyList<GameBookPackage>> ListAsync(CancellationToken cancellationToken);

    Task<GameBookPackage?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
}
