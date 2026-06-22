using GameBook.Core.Interfaces;
using GameBook.Core.GameEngine;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GameBook.Data;

public static class DependencyInjection
{
    public static IServiceCollection AddGameBookDataAccess(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("GameBook")
            ?? throw new InvalidOperationException("Connection string 'GameBook' was not found.");

        services.AddDbContext<GameBookDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        services.AddScoped<IGameBookRepository, Repositories.GameBookRepository>();
        services.AddScoped<IGameBookPackageRepository, FileSystemGameBookPackageRepository>();
        services.AddScoped<IGamePlayService, GamePlayService>();
        services.AddScoped<GameBookCatalogSeeder>();

        return services;
    }
}
