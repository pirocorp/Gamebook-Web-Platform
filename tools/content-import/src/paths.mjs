import path from "node:path";

export function getRepoRoot() {
  return process.env.INIT_CWD ?? process.cwd();
}

export function resolveInputPath(filePath) {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }

  return path.resolve(getRepoRoot(), filePath);
}

export function resolveOutputPath(filePath) {
  return resolveInputPath(filePath);
}
