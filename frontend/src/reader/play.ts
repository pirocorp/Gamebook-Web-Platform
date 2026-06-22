import { getAnonymousGameState, submitAnonymousChoice } from "../shared/api/gamebook-api";
import { mount, paragraphize } from "../shared/dom/render";
import { pageShell } from "../shared/layout/shell";
import type { AnonymousGameState, StoredAnonymousSave } from "../shared/models/api";
import { getSaveById, persistGameState } from "../shared/saves/local-save-store";
import "../shared/styles/main.css";

function getSaveIdFromPath(): string {
    const segments = window.location.pathname.split("/").filter(Boolean);
    return segments[1] ?? "";
}

function renderDiary(state: AnonymousGameState): string {
    const { playerState } = state.save;
    const listOrEmpty = (values: string[]) => values.length > 0
        ? `<ul class="diary-list">${values.map(value => `<li>${value}</li>`).join("")}</ul>`
        : `<div class="diary-empty">Nothing recorded yet.</div>`;

    return `
        <aside class="diary-card">
            <h2 class="diary-title">Diary</h2>
            <div class="diary-grid">
                <section class="diary-section">
                    <h3>Money</h3>
                    <div>${playerState.money}</div>
                </section>
                <section class="diary-section">
                    <h3>Items</h3>
                    ${listOrEmpty(playerState.items)}
                </section>
                <section class="diary-section">
                    <h3>Skills</h3>
                    ${listOrEmpty(playerState.skills)}
                </section>
                <section class="diary-section">
                    <h3>Code Words</h3>
                    ${listOrEmpty(playerState.codeWords)}
                </section>
                <section class="diary-section">
                    <h3>Notes</h3>
                    ${playerState.notes ? `<div>${playerState.notes}</div>` : `<div class="diary-empty">No notes yet.</div>`}
                </section>
            </div>
        </aside>
    `;
}

function renderState(saveId: string, state: AnonymousGameState, statusMessage?: string): void {
    const choicesHtml = state.episode.choices.length > 0
        ? state.episode.choices.map(choice => `
            <button class="choice-button" type="button" data-choice-key="${choice.key}">
                <span>
                    <strong>${choice.label}</strong>
                    <span class="choice-caption">The backend will validate and apply the move.</span>
                </span>
            </button>
        `).join("")
        : `<section class="status-card"><p class="status-copy">This path currently ends here. The reader has reached a terminal episode in the curated slice.</p></section>`;

    mount(pageShell(`
        ${statusMessage ? `<section class="status-panel status-card"><p class="status-copy">${statusMessage}</p></section>` : ""}
        <section class="play-layout">
            <article class="reader-card">
                <div class="eyebrow">Now Reading</div>
                <h1 class="reader-title">${state.gamebookTitle}</h1>
                <div class="reader-meta">
                    <span class="meta-pill">Episode ${state.episode.key}</span>
                    <span class="meta-pill">Save ${saveId.slice(0, 8)}</span>
                </div>
                <div class="reader-body">${paragraphize(state.episode.displayText)}</div>
                <section class="choices-list">
                    ${choicesHtml}
                </section>
                <div class="footer-actions">
                    <a class="secondary-link" href="/books/${state.gamebookSlug}">Back to Book</a>
                    <a class="secondary-link" href="/books">Back to Library</a>
                </div>
            </article>
            ${renderDiary(state)}
        </section>
    `, "play-page"));

    document.querySelectorAll<HTMLButtonElement>("[data-choice-key]").forEach(button => {
        button.addEventListener("click", async () => {
            const choiceKey = button.dataset.choiceKey;
            if (!choiceKey) {
                return;
            }

            document.querySelectorAll<HTMLButtonElement>("[data-choice-key]").forEach(item => {
                item.disabled = true;
            });

            try {
                const nextState = await submitAnonymousChoice(state.save, choiceKey);
                persistGameState(saveId, nextState);
                renderState(saveId, nextState, "Choice resolved and saved locally.");
            } catch (error) {
                renderState(saveId, state, error instanceof Error ? error.message : "Could not apply that choice.");
            }
        });
    });
}

async function restoreState(storedSave: StoredAnonymousSave, saveId: string): Promise<void> {
    const state = await getAnonymousGameState(storedSave.save);
    persistGameState(saveId, state);
    renderState(saveId, state);
}

async function renderPage(): Promise<void> {
    const saveId = getSaveIdFromPath();
    if (!saveId) {
        mount(pageShell(`<section class="error-panel">Missing local save id in the URL.</section>`, "play-page"));
        return;
    }

    const storedSave = getSaveById(saveId);
    if (!storedSave) {
        mount(pageShell(`
            <section class="error-panel">
                No local save was found for this reader path. Start a book from the library first.
            </section>
        `, "play-page"));
        return;
    }

    mount(pageShell(`<section class="loading-panel">Restoring the current episode...</section>`, "play-page"));

    try {
        await restoreState(storedSave, saveId);
    } catch (error) {
        mount(pageShell(`
            <section class="error-panel">${error instanceof Error ? error.message : "Could not restore the current save."}</section>
        `, "play-page"));
    }
}

void renderPage();
