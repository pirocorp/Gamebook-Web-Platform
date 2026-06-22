using GameBook.Core.Domain.GameBooks;

namespace GameBook.Tests.GameEngine;

internal static class TestGameBookPackageFactory
{
    public static GameBookPackage Create()
    {
        return new GameBookPackage(
            "kotarakat-avreya",
            "bg",
            "Котаракът и Спасението на Аврея",
            "Ал Торо",
            "Curated subset.",
            "1",
            new PlayerState("", null, 100, [], [], [], "", new Dictionary<string, string?>()),
            [
                new GameBookEpisode(
                    "1",
                    "Episode 1",
                    "Start",
                    [
                        new GameBookChoice("1-to-11", "Go now", "11", null, []),
                        new GameBookChoice("1-to-31", "Grab gear", "31", null, [])
                    ]),
                new GameBookEpisode(
                    "31",
                    "Episode 31",
                    "Take items",
                    [
                        new GameBookChoice(
                            "31-to-11",
                            "Leave",
                            "11",
                            null,
                            [new AddItemEffect("кинжал"), new AddItemEffect("шперц")])
                    ]),
                new GameBookEpisode(
                    "8",
                    "Episode 8",
                    "Pay the contact",
                    [
                        new GameBookChoice(
                            "8-pay-to-25",
                            "Pay",
                            "25",
                            new MoneyAtLeastCondition(20),
                            [])
                    ]),
                new GameBookEpisode(
                    "25",
                    "Episode 25",
                    "Pay 20",
                    [
                        new GameBookChoice(
                            "25-to-56",
                            "Continue",
                            "56",
                            null,
                            [new RemoveMoneyEffect(20)])
                    ]),
                new GameBookEpisode("11", "Episode 11", "Street", []),
                new GameBookEpisode("56", "Episode 56", "Terminal", [])
            ]);
    }
}
