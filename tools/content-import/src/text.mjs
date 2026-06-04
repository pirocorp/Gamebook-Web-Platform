export function getLineRange(lines, startLine, endLine, label = "range") {
  if (!Number.isInteger(startLine) || !Number.isInteger(endLine)) {
    throw new Error(`${label} must use integer sourceLineStart and sourceLineEnd values.`);
  }

  if (startLine < 1 || endLine < startLine || endLine > lines.length) {
    throw new Error(
      `${label} has invalid line range ${startLine}-${endLine}; source has ${lines.length} lines.`
    );
  }

  return lines.slice(startLine - 1, endLine).join("\n").trim();
}

export function cleanSourceBlock(text, episodeKey) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => line !== `- ${episodeKey} -`)
    .filter((line) => !/^--- PAGE \d+ ---$/.test(line))
    .join("\n");
}
