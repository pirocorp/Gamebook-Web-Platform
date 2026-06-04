import { readArgs, requireArg } from "./args.mjs";
import { readJsonFile, readTextLines, writeJsonFile } from "./io.mjs";
import { resolveInputPath, resolveOutputPath } from "./paths.mjs";
import { cleanSourceBlock, getLineRange } from "./text.mjs";

function requireObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Curation config must contain ${label}.`);
  }
}

function requireArray(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(`Curation config must contain ${label}.`);
  }
}

function validateCurationConfig(config) {
  requireObject(config.package, "a package object");
  requireObject(config.initialState, "an initialState object");
  requireArray(config.episodes, "an episodes array");

  if (!config.sourceTextPath) {
    throw new Error("Curation config must contain sourceTextPath.");
  }

  if (!config.outputPath) {
    throw new Error("Curation config must contain outputPath.");
  }
}

function buildEpisode(episode, sourceLines) {
  const sourceBlock = getLineRange(
    sourceLines,
    episode.sourceLineStart,
    episode.sourceLineEnd,
    `Episode ${episode.key}`
  );

  return {
    key: episode.key,
    title: `Епизод ${episode.key}`,
    originalText: cleanSourceBlock(sourceBlock, episode.key),
    displayText: episode.displayText,
    choices: episode.choices ?? []
  };
}

function collectEpisodeMetadata(config, sourceField, outputField) {
  return config.episodes
    .filter((episode) => Array.isArray(episode[sourceField]) && episode[sourceField].length > 0)
    .map((episode) => ({
      episodeKey: episode.key,
      [outputField]: episode[sourceField]
    }));
}

function buildGamebookPackage(config, sourceLines) {
  return {
    ...config.package,
    initialState: config.initialState,
    metadata: {
      ...config.metadata,
      omittedChoices: collectEpisodeMetadata(config, "omittedChoices", "choices"),
      unmodeledMechanics: collectEpisodeMetadata(config, "unmodeledMechanics", "notes")
    },
    episodes: config.episodes.map((episode) => buildEpisode(episode, sourceLines))
  };
}

const args = readArgs(process.argv.slice(2));
const configPath = resolveInputPath(requireArg(args, "config"));
const config = readJsonFile(configPath, "curation config");
validateCurationConfig(config);

const sourceTextPath = resolveInputPath(config.sourceTextPath);
const outputPath = resolveOutputPath(config.outputPath);
const sourceLines = readTextLines(sourceTextPath, "source text");
const packageJson = buildGamebookPackage(config, sourceLines);

writeJsonFile(outputPath, packageJson);

console.log(`episodes=${packageJson.episodes.length}`);
console.log(`wrote=${outputPath}`);
