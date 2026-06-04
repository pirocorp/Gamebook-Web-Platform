import fs from "node:fs";
import path from "node:path";

function ensureParentDirectoryExists(targetFilePath: string): void {
  fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
}

export function assertFileExists(filePath: string, fileLabel = "file"): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing ${fileLabel}: ${filePath}`);
  }
}

export function readJsonFile<T>(filePath: string, fileLabel = "JSON file"): T {
  assertFileExists(filePath, fileLabel);

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    const parseError = error instanceof Error ? error.message : String(error);
    throw new Error(`Could not parse ${fileLabel} at ${filePath}: ${parseError}`);
  }
}

export function readTextFileLines(filePath: string, fileLabel = "text file"): string[] {
  assertFileExists(filePath, fileLabel);
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/);
}

export function writeJsonFile(filePath: string, fileContentsAsObject: unknown): void {
  ensureParentDirectoryExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(fileContentsAsObject, null, 2), "utf8");
}

export function writeTextFile(filePath: string, fileContents: string): void {
  ensureParentDirectoryExists(filePath);
  fs.writeFileSync(filePath, fileContents, "utf8");
}
