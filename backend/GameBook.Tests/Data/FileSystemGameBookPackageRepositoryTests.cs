using GameBook.Data;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

namespace GameBook.Tests.Data;

public sealed class FileSystemGameBookPackageRepositoryTests
{
    [Fact]
    public async Task GetBySlugAsync_Loads_Curated_Package_From_Content_Folder()
    {
        var repository = new FileSystemGameBookPackageRepository(new StubHostEnvironment());

        var package = await repository.GetBySlugAsync("kotarakat-avreya", CancellationToken.None);

        Assert.NotNull(package);
        Assert.Equal("kotarakat-avreya", package.Slug);
        Assert.Equal("1", package.StartEpisodeKey);
        Assert.Contains(package.Episodes, episode => episode.Key == "31");
    }

    private sealed class StubHostEnvironment : IHostEnvironment
    {
        public string EnvironmentName { get; set; } = "Development";

        public string ApplicationName { get; set; } = "GameBook.Tests";

        public string ContentRootPath { get; set; } = ResolveProjectPath();

        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
    }

    private static string ResolveProjectPath()
    {
        return Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "GameBook.Api"));
    }
}
