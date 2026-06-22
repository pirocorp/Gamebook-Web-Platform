using System.Text.Json.Serialization;
using GameBook.Api.Common.Middleware;
using GameBook.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddExceptionHandler<ApiExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddOpenApi();
builder.Services.AddMediatR(configuration =>
{
    configuration.RegisterServicesFromAssemblyContaining<Program>();
});
builder.Services.AddGameBookDataAccess(builder.Configuration);

var app = builder.Build();

await using (var scope = app.Services.CreateAsyncScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<GameBookDbContext>();
    await dbContext.Database.MigrateAsync();

    var catalogSeeder = scope.ServiceProvider.GetRequiredService<GameBookCatalogSeeder>();
    await catalogSeeder.SeedAsync(CancellationToken.None);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference("/scalar");
}

app.UseExceptionHandler();
app.UseStatusCodePages();
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program;
