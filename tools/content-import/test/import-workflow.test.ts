import test from "node:test";
import assert from "node:assert/strict";
import {
  buildGamebookPackage,
  extractConfiguredEpisodes,
  validateGamebookImportConfig
} from "../src/import-workflow.ts";
import type { GamebookImportConfig } from "../src/types.ts";

function createImportConfig(): GamebookImportConfig {
  return {
    sourceTextPath: "content/source/book/book-text.txt",
    outputPath: "content/gamebooks/book/gamebook.json",
    package: {
      formatVersion: "1.0",
      slug: "book",
      language: "bg",
      title: "Book",
      accessLevel: "public",
      startEpisodeKey: "1"
    },
    initialState: {
      readerName: "",
      rating: null,
      money: 3,
      items: ["sword"],
      skills: [],
      codeWords: [],
      notes: "",
      custom: {}
    },
    metadata: {
      curationStrategy: "full-book",
      notes: ["Imported for test"]
    },
    episodes: [
      {
        key: "1",
        sourceLineStart: 1,
        sourceLineEnd: 4,
        displayText: "Opening text",
        choices: [
          {
            key: "to-2",
            originalLabel: "Go to 2",
            displayLabel: "Go to 2",
            targetEpisodeKey: "2",
            conditions: null,
            effects: []
          }
        ],
        omittedChoices: [
          {
            originalLabel: "Hidden branch",
            targetEpisodeKey: "99",
            reason: "Not part of playable slice"
          }
        ],
        unmodeledMechanics: ["Dice roll omitted"]
      },
      {
        key: "2",
        sourceLineStart: 5,
        sourceLineEnd: 8,
        displayText: "Second text"
      }
    ]
  };
}

const sourceTextLines = [
  "--- PAGE 1 ---",
  "- 1 -",
  "Opening source line.",
  "Still opening.",
  "- 2 -",
  "Second source line.",
  "Still second.",
  "--- PAGE 2 ---"
];

test("validateGamebookImportConfig accepts a complete config", () => {
  assert.doesNotThrow(() => validateGamebookImportConfig(createImportConfig()));
});

test("validateGamebookImportConfig rejects missing required paths", () => {
  const invalidConfig = createImportConfig();
  invalidConfig.sourceTextPath = "";

  assert.throws(
    () => validateGamebookImportConfig(invalidConfig),
    /Import config must contain sourceTextPath\./
  );
});

test("extractConfiguredEpisodes returns the configured line ranges", () => {
  const extractedEpisodes = extractConfiguredEpisodes(createImportConfig(), sourceTextLines);

  assert.deepEqual(extractedEpisodes, [
    {
      key: "1",
      sourceLineStart: 1,
      sourceLineEnd: 4,
      text: "--- PAGE 1 ---\n- 1 -\nOpening source line.\nStill opening."
    },
    {
      key: "2",
      sourceLineStart: 5,
      sourceLineEnd: 8,
      text: "- 2 -\nSecond source line.\nStill second.\n--- PAGE 2 ---"
    }
  ]);
});

test("buildGamebookPackage normalizes source text and preserves metadata", () => {
  const gamebookPackage = buildGamebookPackage(createImportConfig(), sourceTextLines);

  assert.equal(gamebookPackage.episodes[0]?.originalText, "Opening source line.\nStill opening.");
  assert.equal(gamebookPackage.episodes[1]?.originalText, "Second source line.\nStill second.");
  assert.deepEqual(gamebookPackage.metadata.omittedChoices, [
    {
      episodeKey: "1",
      choices: [
        {
          originalLabel: "Hidden branch",
          targetEpisodeKey: "99",
          reason: "Not part of playable slice"
        }
      ]
    }
  ]);
  assert.deepEqual(gamebookPackage.metadata.unmodeledMechanics, [
    {
      episodeKey: "1",
      notes: ["Dice roll omitted"]
    }
  ]);
});
