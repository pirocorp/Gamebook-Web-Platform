using System.Text.Json.Serialization;
using GameBook.Api.Common.Middleware;
using GameBook.Data;
using MediatR;
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

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference("/scalar");
}

app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program;
