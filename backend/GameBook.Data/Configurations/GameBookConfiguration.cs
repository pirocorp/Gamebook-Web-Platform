using GameBookEntity = GameBook.Core.Domain.GameBooks.GameBook;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GameBook.Data.Configurations;

public sealed class GameBookConfiguration : IEntityTypeConfiguration<GameBookEntity>
{
    public void Configure(EntityTypeBuilder<GameBookEntity> builder)
    {
        builder.ToTable("gamebooks");

        builder.HasKey(gameBook => gameBook.Id);

        builder.Property(gameBook => gameBook.Slug)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasIndex(gameBook => gameBook.Slug)
            .IsUnique();

        builder.Property(gameBook => gameBook.Title)
            .HasMaxLength(400)
            .IsRequired();
    }
}
