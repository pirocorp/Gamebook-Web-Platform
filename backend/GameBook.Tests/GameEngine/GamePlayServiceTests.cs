using GameBook.Core.Domain.GameBooks;
using GameBook.Core.GameEngine;
using GameBook.Core.Interfaces;

namespace GameBook.Tests.GameEngine;

public sealed class GamePlayServiceTests
{
    [Fact]
    public async Task StartAsync_Returns_Start_Episode_And_Visible_Choices()
    {
        var package = TestGameBookPackageFactory.Create();
        var service = new GamePlayService(new StubGameBookPackageRepository(package));

        var state = await service.StartAsync(package.Slug, CancellationToken.None);

        Assert.Equal(package.Slug, state.GamebookSlug);
        Assert.Equal("1", state.Save.CurrentEpisodeKey);
        Assert.Equal(2, state.AvailableChoices.Count);
    }

    [Fact]
    public async Task GetStateAsync_Filters_Choices_By_MoneyAtLeast()
    {
        var package = TestGameBookPackageFactory.Create();
        var service = new GamePlayService(new StubGameBookPackageRepository(package));
        var save = new AnonymousGameSave(
            package.Slug,
            "8",
            new PlayerState("", null, 10, [], [], [], "", new Dictionary<string, string?>()));

        var state = await service.GetStateAsync(save, CancellationToken.None);

        Assert.Empty(state.AvailableChoices);
    }

    [Fact]
    public async Task ExecuteChoiceAsync_Applies_Effects_And_Moves_To_Target_Episode()
    {
        var package = TestGameBookPackageFactory.Create();
        var service = new GamePlayService(new StubGameBookPackageRepository(package));
        var save = new AnonymousGameSave(
            package.Slug,
            "31",
            new PlayerState("", null, 100, [], [], [], "", new Dictionary<string, string?>()));

        var state = await service.ExecuteChoiceAsync(save, "31-to-11", CancellationToken.None);

        Assert.Equal("11", state.Save.CurrentEpisodeKey);
        Assert.Contains("кинжал", state.Save.PlayerState.Items);
        Assert.Contains("шперц", state.Save.PlayerState.Items);
    }

    [Fact]
    public async Task ExecuteChoiceAsync_Removes_Money_When_Required()
    {
        var package = TestGameBookPackageFactory.Create();
        var service = new GamePlayService(new StubGameBookPackageRepository(package));
        var save = new AnonymousGameSave(
            package.Slug,
            "25",
            new PlayerState("", null, 100, [], [], [], "", new Dictionary<string, string?>()));

        var state = await service.ExecuteChoiceAsync(save, "25-to-56", CancellationToken.None);

        Assert.Equal("56", state.Save.CurrentEpisodeKey);
        Assert.Equal(80, state.Save.PlayerState.Money);
    }

    [Fact]
    public async Task ExecuteChoiceAsync_Throws_When_Choice_Is_Not_Currently_Available()
    {
        var package = TestGameBookPackageFactory.Create();
        var service = new GamePlayService(new StubGameBookPackageRepository(package));
        var save = new AnonymousGameSave(
            package.Slug,
            "8",
            new PlayerState("", null, 10, [], [], [], "", new Dictionary<string, string?>()));

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            service.ExecuteChoiceAsync(save, "8-pay-to-25", CancellationToken.None));
    }

    private sealed class StubGameBookPackageRepository(GameBookPackage package) : IGameBookPackageRepository
    {
        public Task<IReadOnlyList<GameBookPackage>> ListAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult<IReadOnlyList<GameBookPackage>>([package]);
        }

        public Task<GameBookPackage?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
        {
            return Task.FromResult<GameBookPackage?>(slug == package.Slug ? package : null);
        }
    }
}
