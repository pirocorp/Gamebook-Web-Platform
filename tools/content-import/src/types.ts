export type CommandLineArgumentValue = string | boolean;
export type CommandLineArguments = Map<string, CommandLineArgumentValue>;

export interface EpisodeChoiceCondition {
  type: string;
  [key: string]: unknown;
}

export interface EpisodeChoiceEffect {
  type: string;
  [key: string]: unknown;
}

export interface PlayableChoice {
  key: string;
  originalLabel: string;
  displayLabel: string;
  targetEpisodeKey: string;
  conditions: EpisodeChoiceCondition | null;
  effects: EpisodeChoiceEffect[];
}

export interface OmittedChoiceNote {
  originalLabel: string;
  targetEpisodeKey: string;
  reason: string;
}

export interface CuratedEpisodeConfig {
  key: string;
  sourceLineStart: number;
  sourceLineEnd: number;
  displayText: string;
  choices?: PlayableChoice[];
  omittedChoices?: OmittedChoiceNote[];
  unmodeledMechanics?: string[];
}

export interface GamebookPackageMetadata {
  curationStrategy?: string;
  sourcePdf?: string;
  selectedEpisodeKeys?: string[];
  notes?: string[];
  omittedChoices?: Array<{
    episodeKey: string;
    choices: OmittedChoiceNote[];
  }>;
  unmodeledMechanics?: Array<{
    episodeKey: string;
    notes: string[];
  }>;
  [key: string]: unknown;
}

export interface GamebookPackageConfig {
  formatVersion: string;
  slug: string;
  language: string;
  title: string;
  author?: string;
  description?: string;
  accessLevel: string;
  startEpisodeKey: string;
}

export interface PlayerStateConfig {
  readerName: string;
  rating: number | null;
  money: number;
  items: string[];
  skills: string[];
  codeWords: string[];
  notes: string;
  custom: Record<string, unknown>;
}

export interface GamebookImportConfig {
  sourceTextPath: string;
  outputPath: string;
  package: GamebookPackageConfig;
  initialState: PlayerStateConfig;
  metadata?: GamebookPackageMetadata;
  episodes: CuratedEpisodeConfig[];
}

export interface ExtractedEpisode {
  key: string;
  sourceLineStart: number;
  sourceLineEnd: number;
  text: string;
}

export interface GamebookEpisode {
  key: string;
  title: string;
  originalText: string;
  displayText: string;
  choices: PlayableChoice[];
}

export interface GamebookPackage {
  formatVersion: string;
  slug: string;
  language: string;
  title: string;
  author?: string;
  description?: string;
  accessLevel: string;
  startEpisodeKey: string;
  initialState: PlayerStateConfig;
  metadata: GamebookPackageMetadata;
  episodes: GamebookEpisode[];
}
