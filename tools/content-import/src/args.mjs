export function readArgs(argv) {
  const args = new Map();
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const [rawKey, inlineValue] = token.slice(2).split("=", 2);
    const key = rawKey.trim();
    if (!key) {
      throw new Error(`Invalid empty argument name in "${token}".`);
    }

    if (inlineValue !== undefined) {
      args.set(key, inlineValue);
      continue;
    }

    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      args.set(key, true);
      continue;
    }

    args.set(key, value);
    index += 1;
  }

  return args;
}

export function requireArg(args, key) {
  const value = args.get(key);
  if (!value || value === true) {
    throw new Error(`Missing required --${key} argument.`);
  }

  return value;
}

export function printUsage(scriptName, requiredArgs) {
  const args = requiredArgs.map((arg) => `--${arg} <value>`).join(" ");
  console.log(`Usage: npm run ${scriptName} -- ${args}`);
}
