import type { CommandLineArguments } from "./types.ts";

export function parseCommandLineArguments(rawCommandLineTokens: string[]): CommandLineArguments {
  const parsedArguments: CommandLineArguments = new Map();

  for (
    let commandLineTokenIndex = 0;
    commandLineTokenIndex < rawCommandLineTokens.length;
    commandLineTokenIndex += 1
  ) {
    const rawArgument = rawCommandLineTokens[commandLineTokenIndex];
    if (!rawArgument.startsWith("--")) {
      continue;
    }

    const [rawArgumentName, inlineArgumentValue] = rawArgument.slice(2).split("=", 2);
    const argumentName = rawArgumentName.trim();
    if (!argumentName) {
      throw new Error(`Invalid empty argument name in "${rawArgument}".`);
    }

    if (inlineArgumentValue !== undefined) {
      parsedArguments.set(argumentName, inlineArgumentValue);
      continue;
    }

    const followingToken = rawCommandLineTokens[commandLineTokenIndex + 1];
    if (!followingToken || followingToken.startsWith("--")) {
      parsedArguments.set(argumentName, true);
      continue;
    }

    parsedArguments.set(argumentName, followingToken);
    commandLineTokenIndex += 1;
  }

  return parsedArguments;
}

export function requireCommandLineArgument(
  commandLineArguments: CommandLineArguments,
  argumentName: string
): string {
  const argumentValue = commandLineArguments.get(argumentName);
  if (!argumentValue || argumentValue === true) {
    throw new Error(`Missing required --${argumentName} argument.`);
  }

  return argumentValue;
}

export function printCommandUsage(scriptName: string, requiredArguments: string[]): void {
  const usageArguments = requiredArguments
    .map((requiredArgumentName) => `--${requiredArgumentName} <value>`)
    .join(" ");
  console.log(`Usage: npm run ${scriptName} -- ${usageArguments}`);
}
