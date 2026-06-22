using GameBook.Core.Domain.GameBooks;
using GameBook.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GameBook.Data;

public sealed class GameBookCatalogSeeder(
    GameBookDbContext dbContext,
    IGameBookPackageRepository gameBookPackageRepository)
{
    public async Task SeedAsync(CancellationToken cancellationToken)
    {
        var packages = await gameBookPackageRepository.ListAsync(cancellationToken);
        foreach (var package in packages)
        {
            await UpsertGameBookAsync(package, cancellationToken);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task UpsertGameBookAsync(GameBookPackage package, CancellationToken cancellationToken)
    {
        var existingGameBook = await dbContext.GameBooks
            .SingleOrDefaultAsync(gameBook => gameBook.Slug == package.Slug, cancellationToken);

        if (existingGameBook is not null)
        {
            return;
        }

        dbContext.GameBooks.Add(new GameBook.Core.Domain.GameBooks.GameBook(Guid.NewGuid(), package.Slug, package.Title));
    }
}
