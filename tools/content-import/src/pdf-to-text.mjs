import fs from "node:fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { readArgs, requireArg } from "./args.mjs";
import { ensureFileExists, writeTextFile } from "./io.mjs";
import { resolveInputPath, resolveOutputPath } from "./paths.mjs";

const SAME_LINE_Y_TOLERANCE = 2;

function toPositionedTextItems(textContent) {
  return textContent.items
    .filter((item) => typeof item.str === "string" && item.str.trim().length > 0)
    .map((item) => ({
      text: item.str,
      x: Math.round(item.transform[4] * 100) / 100,
      y: Math.round(item.transform[5] * 100) / 100
    }));
}

function sortTopToBottomThenLeftToRight(items) {
  return [...items].sort((a, b) => {
    if (Math.abs(b.y - a.y) > SAME_LINE_Y_TOLERANCE) {
      return b.y - a.y;
    }

    return a.x - b.x;
  });
}

function joinLine(parts) {
  return parts
    .map((part) => part.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function groupItemsIntoLines(items) {
  const lines = [];
  let currentLine = [];
  let currentY = null;

  // PDF.js returns positioned glyph runs rather than semantic lines.
  // Group nearby Y coordinates so later tooling can use stable line numbers.
  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) <= SAME_LINE_Y_TOLERANCE) {
      currentLine.push(item);
      currentY = currentY === null ? item.y : currentY;
      continue;
    }

    lines.push(joinLine(currentLine));
    currentLine = [item];
    currentY = item.y;
  }

  if (currentLine.length > 0) {
    lines.push(joinLine(currentLine));
  }

  return lines;
}

async function extractPageText(document, pageNumber) {
  const page = await document.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const sortedItems = sortTopToBottomThenLeftToRight(toPositionedTextItems(textContent));
  return groupItemsIntoLines(sortedItems);
}

const args = readArgs(process.argv.slice(2));
const sourcePath = resolveInputPath(requireArg(args, "source"));
const outPath = resolveOutputPath(requireArg(args, "out"));

ensureFileExists(sourcePath, "source PDF");

const data = new Uint8Array(fs.readFileSync(sourcePath));
const document = await getDocument({ data }).promise;
const pages = [];

for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
  const lines = await extractPageText(document, pageNumber);
  pages.push(`--- PAGE ${pageNumber} ---\n${lines.join("\n")}`);
}

writeTextFile(outPath, pages.join("\n\n"));

console.log(`pages=${document.numPages}`);
console.log(`wrote=${outPath}`);
