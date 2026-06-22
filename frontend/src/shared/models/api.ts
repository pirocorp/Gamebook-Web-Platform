export interface BookListItem {
    id: string;
    slug: string;
    title: string;
}

export interface BookDetails {
    id: string;
    slug: string;
    title: string;
}

export interface PlayerState {
    readerName: string;
    rating: number | null;
    money: number;
    items: string[];
    skills: string[];
    codeWords: string[];
    notes: string;
    custom: Record<string, string | null>;
}

export interface AnonymousSave {
    gamebookSlug: string;
    currentEpisodeKey: string;
    playerState: PlayerState;
}

export interface AnonymousGameChoice {
    key: string;
    label: string;
}

export interface AnonymousGameEpisode {
    key: string;
    title: string | null;
    displayText: string;
    choices: AnonymousGameChoice[];
}

export interface AnonymousGameState {
    gamebookSlug: string;
    gamebookTitle: string;
    save: AnonymousSave;
    episode: AnonymousGameEpisode;
    isCompleted: boolean;
}

export interface StoredAnonymousSave {
    id: string;
    gamebookTitle: string;
    save: AnonymousSave;
    updatedAt: string;
}
