import type { AnonymousGameState, StoredAnonymousSave } from "../models/api";

export const SAVES_STORAGE_KEY = "gamebook.play.saves";
export const ACTIVE_SAVE_ID_STORAGE_KEY = "gamebook.play.activeSaveId";

function parseSaves(raw: string | null): Record<string, StoredAnonymousSave> {
    if (!raw) {
        return {};
    }

    try {
        const parsed = JSON.parse(raw) as Record<string, StoredAnonymousSave>;
        return parsed ?? {};
    } catch {
        return {};
    }
}

function writeSaves(saves: Record<string, StoredAnonymousSave>): void {
    window.localStorage.setItem(SAVES_STORAGE_KEY, JSON.stringify(saves));
}

export function createSaveId(): string {
    return crypto.randomUUID();
}

export function persistGameState(saveId: string, state: AnonymousGameState): void {
    const saves = parseSaves(window.localStorage.getItem(SAVES_STORAGE_KEY));
    saves[saveId] = {
        id: saveId,
        gamebookTitle: state.gamebookTitle,
        save: state.save,
        updatedAt: new Date().toISOString()
    };

    writeSaves(saves);
    window.localStorage.setItem(ACTIVE_SAVE_ID_STORAGE_KEY, saveId);
}

export function getSaveById(saveId: string): StoredAnonymousSave | null {
    const saves = parseSaves(window.localStorage.getItem(SAVES_STORAGE_KEY));
    return saves[saveId] ?? null;
}

export function getMostRecentSaveForBook(slug: string): StoredAnonymousSave | null {
    const saves = Object.values(parseSaves(window.localStorage.getItem(SAVES_STORAGE_KEY)));
    return saves
        .filter(entry => entry.save.gamebookSlug === slug)
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))[0] ?? null;
}
