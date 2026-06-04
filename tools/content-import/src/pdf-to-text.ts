import fs from "node:fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { parseCommandLineArguments, requireCommandLineArgument } from "./args.ts";
import { assertFileExists, writeTextFile } from "./io.ts";
import {
  resolveRepositoryInputPath,
  resolveRepositoryOutputPath
} from "./paths.ts";

interface PositionedTextItem {
  text: string;
  x: number;
  y: number;
}

interface PdfTextContentLike {
  items: Array<{
    str?: unknown;
    transform: number[];
  }>;
}

interface PdfPageLike {
  getTextContent(): Promise<PdfTextContentLike>;
}

interface PdfDocumentLike {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfPageLike>;
}

const SAME_LINE_Y_TOLERANCE = 2;

function mapPdfTextRunsToPositionedTextItems(
  pdfTextContent: PdfTextContentLike
): PositionedTextItem[] {
  return pdfTextContent.items
    .filter(
      (pdfTextItem): pdfTextItem is { str: string; transform: number[] } =>
        typeof pdfTextItem.str === "string"
    )
    .filter((pdfTextItem) => pdfTextItem.str.trim().length > 0)
    .map((pdfTextItem) => ({
      text: pdfTextItem.str,
      x: Math.round(pdfTextItem.transform[4] * 100) / 100,
      y: Math.round(pdfTextItem.transform[5] * 100) / 100
    }));
}

function sortPositionedTextItemsForReadingOrder(
  positionedTextItems: PositionedTextItem[]
): PositionedTextItem[] {
  return [...positionedTextItems].sort((leftItem, rightItem) => {
    if (Math.abs(rightItem.y - leftItem.y) > SAME_LINE_Y_TOLERANCE) {
      return rightItem.y - leftItem.y;
    }

    return leftItem.x - rightItem.x;
  });
}

function joinPositionedTextItemsIntoLine(positionedTextItems: PositionedTextItem[]): string {
  return positionedTextItems
    .map((positionedTextItem) => positionedTextItem.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function groupPositionedTextItemsIntoLines(positionedTextItems: PositionedTextItem[]): string[] {
  const extractedLines: string[] = [];
  let currentLinePositionedTextItems: PositionedTextItem[] = [];
  let currentLineY: number | null = null;

  // PDF.js returns positioned glyph runs, not semantic lines.
  // Group nearby Y coordinates so the generated text stays stable for curation line ranges.
  for (const positionedTextItem of positionedTextItems) {
    if (
      currentLineY === null ||
      Math.abs(positionedTextItem.y - currentLineY) <= SAME_LINE_Y_TOLERANCE
    ) {
      currentLinePositionedTextItems.push(positionedTextItem);
      currentLineY = currentLineY === null ? positionedTextItem.y : currentLineY;
      continue;
    }

    extractedLines.push(joinPositionedTextItemsIntoLine(currentLinePositionedTextItems));
    currentLinePositionedTextItems = [positionedTextItem];
    currentLineY = positionedTextItem.y;
  }

  if (currentLinePositionedTextItems.length > 0) {
    extractedLines.push(joinPositionedTextItemsIntoLine(currentLinePositionedTextItems));
  }

  return extractedLines;
}

async function extractTextLinesFromPdfPage(
  pdfDocument: PdfDocumentLike,
  pageNumber: number
): Promise<string[]> {
  const pdfPage = await pdfDocument.getPage(pageNumber);
  const pdfTextContent = await pdfPage.getTextContent();
  const positionedTextItems = mapPdfTextRunsToPositionedTextItems(pdfTextContent);
  const sortedTextItems = sortPositionedTextItemsForReadingOrder(positionedTextItems);
  return groupPositionedTextItemsIntoLines(sortedTextItems);
}

async function main(): Promise<void> {
  const commandLineArguments = parseCommandLineArguments(process.argv.slice(2));
  const sourcePdfPath = resolveRepositoryInputPath(
    requireCommandLineArgument(commandLineArguments, "source")
  );
  const outputTextPath = resolveRepositoryOutputPath(
    requireCommandLineArgument(commandLineArguments, "out")
  );

  assertFileExists(sourcePdfPath, "source PDF");

  const pdfBytes = new Uint8Array(fs.readFileSync(sourcePdfPath));
  const pdfDocument = (await getDocument({ data: pdfBytes }).promise) as PdfDocumentLike;
  const extractedPages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    const pageLines = await extractTextLinesFromPdfPage(pdfDocument, pageNumber);
    extractedPages.push(`--- PAGE ${pageNumber} ---\n${pageLines.join("\n")}`);
  }

  writeTextFile(outputTextPath, extractedPages.join("\n\n"));

  console.log(`pages=${pdfDocument.numPages}`);
  console.log(`wrote=${outputTextPath}`);
}

await main();
