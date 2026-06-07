using GameBook.Core.Interfaces;
using GameBookEntity = GameBook.Core.Domain.GameBooks.GameBook;
using Microsoft.EntityFrameworkCore;

namespace GameBook.Data.Repositories;

public sealed class GameBookRepository(GameBookDbContext dbContext) : IGameBookRepository
{
    public async Task<IReadOnlyList<GameBookEntity>> ListAsync(CancellationToken cancellationToken)
    {
        return await dbContext.GameBooks
            .AsNoTracking()
            .OrderBy(gameBook => gameBook.Title)
            .ToListAsync(cancellationToken);
    }

    public async Task<GameBookEntity?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        return await dbContext.GameBooks
            .AsNoTracking()
            .SingleOrDefaultAsync(gameBook => gameBook.Slug == slug, cancellationToken);
    }
}
