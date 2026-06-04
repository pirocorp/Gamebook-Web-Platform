export function extractTextBlockByLineRange(
  sourceTextLines: string[],
  startLineNumber: number,
  endLineNumber: number,
  rangeLabel = "range"
): string {
  if (!Number.isInteger(startLineNumber) || !Number.isInteger(endLineNumber)) {
    throw new Error(`${rangeLabel} must use integer sourceLineStart and sourceLineEnd values.`);
  }

  if (
    startLineNumber < 1 ||
    endLineNumber < startLineNumber ||
    endLineNumber > sourceTextLines.length
  ) {
    throw new Error(
      `${rangeLabel} has invalid line range ${startLineNumber}-${endLineNumber}; source has ${sourceTextLines.length} lines.`
    );
  }

  return sourceTextLines.slice(startLineNumber - 1, endLineNumber).join("\n").trim();
}

export function normalizeEpisodeSourceText(rawEpisodeSourceText: string, episodeKey: string): string {
  return rawEpisodeSourceText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => line !== `- ${episodeKey} -`)
    .filter((line) => !/^--- PAGE \d+ ---$/.test(line))
    .join("\n");
}
