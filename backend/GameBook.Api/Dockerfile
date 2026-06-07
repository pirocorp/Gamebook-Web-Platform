FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["GameBook.WebPlatform.sln", "./"]
COPY ["backend/GameBook.Api/GameBook.Api.csproj", "backend/GameBook.Api/"]
COPY ["backend/GameBook.Core/GameBook.Core.csproj", "backend/GameBook.Core/"]
COPY ["backend/GameBook.Data/GameBook.Data.csproj", "backend/GameBook.Data/"]
COPY ["backend/GameBook.Tests/GameBook.Tests.csproj", "backend/GameBook.Tests/"]

RUN dotnet restore "backend/GameBook.Api/GameBook.Api.csproj"

COPY . .
RUN dotnet publish "backend/GameBook.Api/GameBook.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "GameBook.Api.dll"]
