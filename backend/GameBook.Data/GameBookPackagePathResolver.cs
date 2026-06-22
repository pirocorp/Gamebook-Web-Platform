namespace GameBook.Data;

internal static class GameBookPackagePathResolver
{
    public static string Resolve(string contentRootPath, string baseDirectory)
    {
        var candidates = new[]
        {
            Path.Combine(baseDirectory, "content", "gamebooks"),
            Path.GetFullPath(Path.Combine(contentRootPath, "..", "..", "content", "gamebooks")),
            Path.GetFullPath(Path.Combine(baseDirectory, "..", "..", "..", "..", "..", "content", "gamebooks"))
        };

        foreach (var candidate in candidates)
        {
            if (Directory.Exists(candidate))
            {
                return candidate;
            }
        }

        throw new DirectoryNotFoundException(
            $"Could not find the gamebook package directory. Checked: {string.Join(", ", candidates)}");
    }
}
