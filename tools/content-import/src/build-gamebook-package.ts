import { parseCommandLineArguments, requireCommandLineArgument } from "./args.ts";
import { readJsonFile, readTextFileLines, writeJsonFile } from "./io.ts";
import { resolveRepositoryInputPath, resolveRepositoryOutputPath } from "./paths.ts";
import { extractTextBlockByLineRange, normalizeEpisodeSourceText } from "./text.ts";
import type {
  CuratedEpisodeConfig,
  CuratedSubsetConfig,
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

function validateCuratedSubsetConfig(curatedSubsetConfig: CuratedSubsetConfig): void {
  assertIsObjectRecord(curatedSubsetConfig.package, "a package object");
  assertIsObjectRecord(curatedSubsetConfig.initialState, "an initialState object");
  assertIsArray(curatedSubsetConfig.episodes, "an episodes array");

  if (!curatedSubsetConfig.sourceTextPath) {
    throw new Error("Curation config must contain sourceTextPath.");
  }

  if (!curatedSubsetConfig.outputPath) {
    throw new Error("Curation config must contain outputPath.");
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
  curatedSubsetConfig: CuratedSubsetConfig
): Array<{ episodeKey: string; choices: OmittedChoiceNote[] }> {
  return curatedSubsetConfig.episodes
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
  curatedSubsetConfig: CuratedSubsetConfig
): Array<{ episodeKey: string; notes: string[] }> {
  return curatedSubsetConfig.episodes
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
  curatedSubsetConfig: CuratedSubsetConfig,
  sourceTextLines: string[]
): GamebookPackage {
  return {
    ...curatedSubsetConfig.package,
    initialState: curatedSubsetConfig.initialState,
    metadata: {
      ...curatedSubsetConfig.metadata,
      omittedChoices: collectOmittedChoiceMetadata(curatedSubsetConfig),
      unmodeledMechanics: collectUnmodeledMechanicMetadata(curatedSubsetConfig)
    },
    episodes: curatedSubsetConfig.episodes.map((curatedEpisodeConfig) =>
      buildGamebookEpisode(curatedEpisodeConfig, sourceTextLines)
    )
  };
}

function main(): void {
  const commandLineArguments = parseCommandLineArguments(process.argv.slice(2));
  const curationConfigPath = resolveRepositoryInputPath(
    requireCommandLineArgument(commandLineArguments, "config")
  );

  const curatedSubsetConfig = readJsonFile<CuratedSubsetConfig>(
    curationConfigPath,
    "curation config"
  );
  validateCuratedSubsetConfig(curatedSubsetConfig);

  const sourceTextPath = resolveRepositoryInputPath(curatedSubsetConfig.sourceTextPath);
  const outputPackagePath = resolveRepositoryOutputPath(curatedSubsetConfig.outputPath);
  const sourceTextLines = readTextFileLines(sourceTextPath, "source text");
  const gamebookPackage = buildGamebookPackage(curatedSubsetConfig, sourceTextLines);

  writeJsonFile(outputPackagePath, gamebookPackage);

  console.log(`episodes=${gamebookPackage.episodes.length}`);
  console.log(`wrote=${outputPackagePath}`);
}

main();
