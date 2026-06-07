import test from "node:test";
import assert from "node:assert/strict";
import {
  extractTextBlockByLineRange,
  normalizeEpisodeSourceText
} from "../src/text.ts";

test("extractTextBlockByLineRange returns the requested inclusive range", () => {
  const lines = ["line 1", "line 2", "line 3", "line 4"];

  assert.equal(extractTextBlockByLineRange(lines, 2, 3), "line 2\nline 3");
});

test("extractTextBlockByLineRange rejects invalid ranges", () => {
  const lines = ["line 1", "line 2"];

  assert.throws(
    () => extractTextBlockByLineRange(lines, 0, 2, "Episode 1"),
    /Episode 1 has invalid line range 0-2; source has 2 lines\./
  );
});

test("normalizeEpisodeSourceText removes page markers, episode markers, and blank lines", () => {
  const normalizedText = normalizeEpisodeSourceText(
    "--- PAGE 12 ---\n- 42 -\n  First line. \n\n Second line.\n--- PAGE 13 ---",
    "42"
  );

  assert.equal(normalizedText, "First line.\nSecond line.");
});
