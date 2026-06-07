using GameBookEntity = GameBook.Core.Domain.GameBooks.GameBook;
using Microsoft.EntityFrameworkCore;

namespace GameBook.Data;

public sealed class GameBookDbContext(DbContextOptions<GameBookDbContext> options) : DbContext(options)
{
    public DbSet<GameBookEntity> GameBooks => Set<GameBookEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(GameBookDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
