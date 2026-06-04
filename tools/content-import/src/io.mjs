import fs from "node:fs";
import path from "node:path";

export function ensureFileExists(filePath, label = "file") {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing ${label}: ${filePath}`);
  }
}

export function readJsonFile(filePath, label = "JSON file") {
  ensureFileExists(filePath, label);

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Could not parse ${label} at ${filePath}: ${error.message}`);
  }
}

export function readTextLines(filePath, label = "text file") {
  ensureFileExists(filePath, label);
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/);
}

export function writeJsonFile(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
}

export function writeTextFile(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value, "utf8");
}
