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
import type { CuratedSubsetConfig, ExtractedEpisode } from "./types.ts";

function extractConfiguredEpisodes(
  curatedSubsetConfig: CuratedSubsetConfig,
  sourceTextLines: string[]
): ExtractedEpisode[] {
  return curatedSubsetConfig.episodes.map((curatedEpisodeConfig) => ({
    key: curatedEpisodeConfig.key,
    sourceLineStart: curatedEpisodeConfig.sourceLineStart,
    sourceLineEnd: curatedEpisodeConfig.sourceLineEnd,
    text: extractTextBlockByLineRange(
      sourceTextLines,
      curatedEpisodeConfig.sourceLineStart,
      curatedEpisodeConfig.sourceLineEnd,
      `Episode ${curatedEpisodeConfig.key}`
    )
  }));
}

function main(): void {
  const commandLineArguments = parseCommandLineArguments(process.argv.slice(2));
  const curationConfigPath = resolveRepositoryInputPath(
    requireCommandLineArgument(commandLineArguments, "config")
  );
  const outputJsonPath = resolveRepositoryOutputPath(
    requireCommandLineArgument(commandLineArguments, "out")
  );

  const curatedSubsetConfig = readJsonFile<CuratedSubsetConfig>(
    curationConfigPath,
    "curation config"
  );
  const sourceTextPath = resolveRepositoryInputPath(curatedSubsetConfig.sourceTextPath);
  const sourceTextLines = readTextFileLines(sourceTextPath, "source text");
  const extractedEpisodes = extractConfiguredEpisodes(curatedSubsetConfig, sourceTextLines);

  writeJsonFile(outputJsonPath, extractedEpisodes);

  console.log(`episodes=${extractedEpisodes.length}`);
  console.log(`wrote=${outputJsonPath}`);
}

main();
