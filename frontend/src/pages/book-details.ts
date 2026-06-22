import { getBookDetails, startAnonymousGame } from "../shared/api/gamebook-api";
import { mount } from "../shared/dom/render";
import { pageShell } from "../shared/layout/shell";
import { createSaveId, getMostRecentSaveForBook, persistGameState } from "../shared/saves/local-save-store";
import "../shared/styles/main.css";

function getSlugFromPath(): string {
    const segments = window.location.pathname.split("/").filter(Boolean);
    return segments[1] ?? "";
}

function renderLoading(): void {
    mount(pageShell(`
        <section class="loading-panel">Loading book details...</section>
    `, "book-details-page"));
}

async function startBook(slug: string): Promise<void> {
    const gameState = await startAnonymousGame(slug);
    const saveId = createSaveId();
    persistGameState(saveId, gameState);
    window.location.href = `/play/${saveId}`;
}

async function renderPage(): Promise<void> {
    renderLoading();

    const slug = getSlugFromPath();
    if (!slug) {
        mount(pageShell(`<section class="error-panel">Missing book slug.</section>`, "book-details-page"));
        return;
    }

    try {
        const details = await getBookDetails(slug);
        const existingSave = getMostRecentSaveForBook(slug);

        mount(pageShell(`
            <section class="hero-panel">
                <div class="eyebrow">Book Details</div>
                <h1 class="hero-title book-hero-title">${details.title}</h1>
                <p class="hero-copy">
                    A curated first-path adventure prepared to validate the engine and the
                    anonymous reading flow before the wider catalog arrives.
                </p>
            </section>

            <section class="details-layout">
                <article class="content-card">
                    <div class="details-content">
                        <div class="eyebrow">About This Slice</div>
                        <h2 class="details-title">A featured path through a larger world.</h2>
                        <div class="details-meta">
                            <span class="meta-pill">Slug: ${details.slug}</span>
                            <span class="meta-pill">Mode: Anonymous local save</span>
                            <span class="meta-pill">Backend-owned rules</span>
                        </div>
                        <p class="details-copy">
                            The current playable backend slice uses a curated package and a
                            stateless anonymous play loop. Your browser keeps the save, while
                            the backend decides what each choice truly means.
                        </p>
                        <div class="footer-actions">
                            <button class="primary-button" data-start-book type="button">Start Reading</button>
                            <a class="secondary-link" href="/books">Back to Library</a>
                        </div>
                    </div>
                </article>
                <aside class="details-side">
                    <section class="status-card">
                        <div class="eyebrow">Reading Mode</div>
                        <p class="status-copy">
                            Anonymous play uses browser storage and can be resumed from this
                            device later.
                        </p>
                    </section>
                    ${existingSave ? `
                        <section class="status-card">
                            <div class="eyebrow">Existing Save</div>
                            <p class="status-copy">
                                A local save for this book already exists. Starting again will create
                                a fresh slot and make it the active save.
                            </p>
                            <div class="footer-actions">
                                <a class="secondary-link" href="/play/${existingSave.id}">Resume Latest Save</a>
                            </div>
                        </section>
                    ` : ""}
                </aside>
            </section>
        `, "book-details-page"));

        document.querySelector<HTMLButtonElement>("[data-start-book]")?.addEventListener("click", async () => {
            const button = document.querySelector<HTMLButtonElement>("[data-start-book]");
            if (button) {
                button.disabled = true;
                button.textContent = "Preparing the story...";
            }

            try {
                await startBook(slug);
            } catch (error) {
                if (button) {
                    button.disabled = false;
                    button.textContent = "Start Reading";
                }

                mount(pageShell(`
                    <section class="error-panel">${error instanceof Error ? error.message : "Could not start the book."}</section>
                `, "book-details-page"));
            }
        });
    } catch (error) {
        mount(pageShell(`
            <section class="error-panel">${error instanceof Error ? error.message : "Could not load the book."}</section>
        `, "book-details-page"));
    }
}

void renderPage();
