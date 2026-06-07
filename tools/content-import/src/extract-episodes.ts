import {
  parseCommandLineArguments,
  requireCommandLineArgument
} from "./args.ts";
import { readJsonFile, readTextFileLines, writeJsonFile } from "./io.ts";
import {
  resolveRepositoryInputPath,
  resolveRepositoryOutputPath
} from "./paths.ts";
import { extractTextBlockByLineRange } from "./text.ts";
import type { ExtractedEpisode, GamebookImportConfig } from "./types.ts";

function extractConfiguredEpisodes(
  gamebookImportConfig: GamebookImportConfig,
  sourceTextLines: string[]
): ExtractedEpisode[] {
  return gamebookImportConfig.episodes.map((episodeImportConfig) => ({
    key: episodeImportConfig.key,
    sourceLineStart: episodeImportConfig.sourceLineStart,
    sourceLineEnd: episodeImportConfig.sourceLineEnd,
    text: extractTextBlockByLineRange(
      sourceTextLines,
      episodeImportConfig.sourceLineStart,
      episodeImportConfig.sourceLineEnd,
      `Episode ${episodeImportConfig.key}`
    )
  }));
}

function main(): void {
  const commandLineArguments = parseCommandLineArguments(process.argv.slice(2));
  const importConfigPath = resolveRepositoryInputPath(
    requireCommandLineArgument(commandLineArguments, "config")
  );
  const outputJsonPath = resolveRepositoryOutputPath(
    requireCommandLineArgument(commandLineArguments, "out")
  );

  const gamebookImportConfig = readJsonFile<GamebookImportConfig>(
    importConfigPath,
    "import config"
  );
  const sourceTextPath = resolveRepositoryInputPath(gamebookImportConfig.sourceTextPath);
  const sourceTextLines = readTextFileLines(sourceTextPath, "source text");
  const extractedEpisodes = extractConfiguredEpisodes(gamebookImportConfig, sourceTextLines);

  writeJsonFile(outputJsonPath, extractedEpisodes);

  console.log(`episodes=${extractedEpisodes.length}`);
  console.log(`wrote=${outputJsonPath}`);
}

main();
