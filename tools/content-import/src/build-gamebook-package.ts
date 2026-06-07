import { parseCommandLineArguments, requireCommandLineArgument } from "./args.ts";
import { readJsonFile, readTextFileLines, writeJsonFile } from "./io.ts";
import { resolveRepositoryInputPath, resolveRepositoryOutputPath } from "./paths.ts";
import { extractTextBlockByLineRange, normalizeEpisodeSourceText } from "./text.ts";
import type {
  CuratedEpisodeConfig,
  GamebookImportConfig,
  GamebookEpisode,
  GamebookPackage,
  OmittedChoiceNote
} from "./types.ts";

function assertIsObjectRecord(value: unknown, fieldLabel: string): void {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Curation config must contain ${fieldLabel}.`);
  }
}

function assertIsArray(value: unknown, fieldLabel: string): void {
  if (!Array.isArray(value)) {
    throw new Error(`Curation config must contain ${fieldLabel}.`);
  }
}

function validateGamebookImportConfig(gamebookImportConfig: GamebookImportConfig): void {
  assertIsObjectRecord(gamebookImportConfig.package, "a package object");
  assertIsObjectRecord(gamebookImportConfig.initialState, "an initialState object");
  assertIsArray(gamebookImportConfig.episodes, "an episodes array");

  if (!gamebookImportConfig.sourceTextPath) {
    throw new Error("Import config must contain sourceTextPath.");
  }

  if (!gamebookImportConfig.outputPath) {
    throw new Error("Import config must contain outputPath.");
  }
}

function buildGamebookEpisode(
  curatedEpisodeConfig: CuratedEpisodeConfig,
  sourceTextLines: string[]
): GamebookEpisode {
  const sourceTextBlock = extractTextBlockByLineRange(
    sourceTextLines,
    curatedEpisodeConfig.sourceLineStart,
    curatedEpisodeConfig.sourceLineEnd,
    `Episode ${curatedEpisodeConfig.key}`
  );

  return {
    key: curatedEpisodeConfig.key,
    title: `Episode ${curatedEpisodeConfig.key}`,
    originalText: normalizeEpisodeSourceText(sourceTextBlock, curatedEpisodeConfig.key),
    displayText: curatedEpisodeConfig.displayText,
    choices: curatedEpisodeConfig.choices ?? []
  };
}

function collectOmittedChoiceMetadata(
  gamebookImportConfig: GamebookImportConfig
): Array<{ episodeKey: string; choices: OmittedChoiceNote[] }> {
  return gamebookImportConfig.episodes
    .filter(
      (curatedEpisodeConfig) =>
        Array.isArray(curatedEpisodeConfig.omittedChoices) &&
        curatedEpisodeConfig.omittedChoices.length > 0
    )
    .map((curatedEpisodeConfig) => ({
      episodeKey: curatedEpisodeConfig.key,
      choices: curatedEpisodeConfig.omittedChoices ?? []
    }));
}

function collectUnmodeledMechanicMetadata(
  gamebookImportConfig: GamebookImportConfig
): Array<{ episodeKey: string; notes: string[] }> {
  return gamebookImportConfig.episodes
    .filter(
      (curatedEpisodeConfig) =>
        Array.isArray(curatedEpisodeConfig.unmodeledMechanics) &&
        curatedEpisodeConfig.unmodeledMechanics.length > 0
    )
    .map((curatedEpisodeConfig) => ({
      episodeKey: curatedEpisodeConfig.key,
      notes: curatedEpisodeConfig.unmodeledMechanics ?? []
    }));
}

function buildGamebookPackage(
  gamebookImportConfig: GamebookImportConfig,
  sourceTextLines: string[]
): GamebookPackage {
  return {
    ...gamebookImportConfig.package,
    initialState: gamebookImportConfig.initialState,
    metadata: {
      ...gamebookImportConfig.metadata,
      omittedChoices: collectOmittedChoiceMetadata(gamebookImportConfig),
      unmodeledMechanics: collectUnmodeledMechanicMetadata(gamebookImportConfig)
    },
    episodes: gamebookImportConfig.episodes.map((curatedEpisodeConfig) =>
      buildGamebookEpisode(curatedEpisodeConfig, sourceTextLines)
    )
  };
}

function main(): void {
  const commandLineArguments = parseCommandLineArguments(process.argv.slice(2));
  const importConfigPath = resolveRepositoryInputPath(
    requireCommandLineArgument(commandLineArguments, "config")
  );

  const gamebookImportConfig = readJsonFile<GamebookImportConfig>(
    importConfigPath,
    "import config"
  );
  validateGamebookImportConfig(gamebookImportConfig);

  const sourceTextPath = resolveRepositoryInputPath(gamebookImportConfig.sourceTextPath);
  const outputPackagePath = resolveRepositoryOutputPath(gamebookImportConfig.outputPath);
  const sourceTextLines = readTextFileLines(sourceTextPath, "source text");
  const gamebookPackage = buildGamebookPackage(gamebookImportConfig, sourceTextLines);

  writeJsonFile(outputPackagePath, gamebookPackage);

  console.log(`episodes=${gamebookPackage.episodes.length}`);
  console.log(`wrote=${outputPackagePath}`);
}

main();
