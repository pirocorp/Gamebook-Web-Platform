import path from "node:path";

export function getRepositoryRootDirectory(): string {
  return process.env.INIT_CWD ?? process.cwd();
}

export function resolveRepositoryPath(repoRelativeOrAbsolutePath: string): string {
  if (path.isAbsolute(repoRelativeOrAbsolutePath)) {
    return repoRelativeOrAbsolutePath;
  }

  return path.resolve(getRepositoryRootDirectory(), repoRelativeOrAbsolutePath);
}

export function resolveRepositoryInputPath(repoRelativeOrAbsolutePath: string): string {
  return resolveRepositoryPath(repoRelativeOrAbsolutePath);
}

export function resolveRepositoryOutputPath(repoRelativeOrAbsolutePath: string): string {
  return resolveRepositoryPath(repoRelativeOrAbsolutePath);
}
