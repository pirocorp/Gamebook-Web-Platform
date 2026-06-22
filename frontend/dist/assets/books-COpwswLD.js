import{a as t,m as a,p as s}from"./main-Bs5VOE8H.js";function r(){a(s(`
        <section class="hero-panel">
            <div class="eyebrow">GameBook Library</div>
            <h1 class="hero-title">Stories meant to be entered, not merely read.</h1>
            <p class="hero-copy">Fetching the current shelf of playable books.</p>
        </section>
        <section class="loading-panel">Loading curated gamebooks...</section>
    `,"books-page"))}async function i(){r();try{const e=await t();if(e.length===0){a(s(`
                <section class="hero-panel">
                    <div class="eyebrow">GameBook Library</div>
                    <h1 class="hero-title">The shelf is ready, but empty.</h1>
                    <p class="hero-copy">No books are currently seeded into the catalog.</p>
                </section>
                <section class="books-empty">No books are available yet.</section>
            `,"books-page"));return}const o=e[0];a(s(`
            <section class="hero-panel">
                <div class="eyebrow">GameBook Library</div>
                <h1 class="hero-title">Choose a tale and step inside it.</h1>
                <p class="hero-copy">
                    This first vertical slice is shaped like a reading room: one featured
                    adventure, one living backend, and a promise that story logic stays
                    authoritative on the server.
                </p>
            </section>

            <section class="feature-grid">
                <article class="feature-card">
                    <div class="feature-content">
                        <div class="eyebrow">Featured Book</div>
                        <h2 class="feature-title">${o.title}</h2>
                        <div class="feature-meta">
                            <span class="meta-pill">Bulgarian</span>
                            <span class="meta-pill">Curated subset</span>
                            <span class="meta-pill">Anonymous play ready</span>
                        </div>
                        <p class="feature-copy">
                            A hand-curated first slice of a larger gamebook world, shaped to
                            prove the engine, the backend-owned rules, and the reader flow.
                        </p>
                        <div class="footer-actions">
                            <a class="primary-button" href="/books/${o.slug}">Open the Book</a>
                        </div>
                    </div>
                    <div class="feature-side">
                        <div class="ornament">✶</div>
                        <p class="feature-copy">
                            The library page leans into print warmth and quiet drama instead of
                            dashboard chrome. This is a shelf, not a settings screen.
                        </p>
                    </div>
                </article>
            </section>
        `,"books-page"))}catch(e){a(s(`
            <section class="hero-panel">
                <div class="eyebrow">GameBook Library</div>
                <h1 class="hero-title">The shelf could not be opened.</h1>
                <p class="hero-copy">Something went wrong while loading the catalog.</p>
            </section>
            <section class="error-panel">${e instanceof Error?e.message:"Unknown error."}</section>
        `,"books-page"))}}i();
