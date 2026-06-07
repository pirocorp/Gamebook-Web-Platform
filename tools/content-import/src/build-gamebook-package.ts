import { parseCommandLineArguments, requireCommandLineArgument } from "./args.ts";
import {
  buildGamebookPackage,
  validateGamebookImportConfig
} from "./import-workflow.ts";
import { readJsonFile, readTextFileLines, writeJsonFile } from "./io.ts";
import { resolveRepositoryInputPath, resolveRepositoryOutputPath } from "./paths.ts";
import type { GamebookImportConfig } from "./types.ts";

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
