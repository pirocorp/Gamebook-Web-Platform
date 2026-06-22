import { getJson, postJson } from "./client";
import type { AnonymousGameState, AnonymousSave, BookDetails, BookListItem } from "../models/api";

export function getBooks(): Promise<BookListItem[]> {
    return getJson<BookListItem[]>("/api/books");
}

export function getBookDetails(slug: string): Promise<BookDetails> {
    return getJson<BookDetails>(`/api/books/${slug}`);
}

export function startAnonymousGame(gamebookSlug: string): Promise<AnonymousGameState> {
    return postJson<AnonymousGameState, { gamebookSlug: string }>("/api/games/anonymous/start", { gamebookSlug });
}

export function getAnonymousGameState(save: AnonymousSave): Promise<AnonymousGameState> {
    return postJson<AnonymousGameState, { save: AnonymousSave }>("/api/games/anonymous/state", { save });
}

export function submitAnonymousChoice(save: AnonymousSave, choiceKey: string): Promise<AnonymousGameState> {
    return postJson<AnonymousGameState, { save: AnonymousSave; choiceKey: string }>("/api/games/anonymous/choice", {
        save,
        choiceKey
    });
}
