using GameBookEntity = GameBook.Core.Domain.GameBooks.GameBook;

namespace GameBook.Tests.Domain.GameBooks;

public sealed class GameBookTests
{
    [Fact]
    public void Constructor_Assigns_Required_Values()
    {
        var id = Guid.NewGuid();

        var gameBook = new GameBookEntity(id, "kotarakat-avreya", "Котаракът и Спасението на Аврея");

        Assert.Equal(id, gameBook.Id);
        Assert.Equal("kotarakat-avreya", gameBook.Slug);
        Assert.Equal("Котаракът и Спасението на Аврея", gameBook.Title);
    }

    [Fact]
    public void Constructor_Throws_When_Slug_Is_Missing()
    {
        Action act = () => _ = new GameBookEntity(Guid.NewGuid(), string.Empty, "Title");

        Assert.Throws<ArgumentException>(act);
    }
}
