import { readArgs, requireArg } from "./args.mjs";
import { readJsonFile, readTextLines, writeJsonFile } from "./io.mjs";
import { resolveInputPath, resolveOutputPath } from "./paths.mjs";
import { getLineRange } from "./text.mjs";

function extractConfiguredEpisodes(config, sourceLines) {
  if (!Array.isArray(config.episodes)) {
    throw new Error("Curation config must contain an episodes array.");
  }

  return config.episodes.map((episode) => ({
    key: episode.key,
    sourceLineStart: episode.sourceLineStart,
    sourceLineEnd: episode.sourceLineEnd,
    text: getLineRange(
      sourceLines,
      episode.sourceLineStart,
      episode.sourceLineEnd,
      `Episode ${episode.key}`
    )
  }));
}

const args = readArgs(process.argv.slice(2));
const configPath = resolveInputPath(requireArg(args, "config"));
const outPath = resolveOutputPath(requireArg(args, "out"));

const config = readJsonFile(configPath, "curation config");
const sourceTextPath = resolveInputPath(config.sourceTextPath);
const sourceLines = readTextLines(sourceTextPath, "source text");
const episodes = extractConfiguredEpisodes(config, sourceLines);

writeJsonFile(outPath, episodes);

console.log(`episodes=${episodes.length}`);
console.log(`wrote=${outPath}`);
