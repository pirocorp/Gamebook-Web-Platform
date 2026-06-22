import{m as o,g as r,p as i,s as c}from"./main-Bs5VOE8H.js";import{g as l,c as d,p}from"./local-save-store-CPIlv3_z.js";function u(){return window.location.pathname.split("/").filter(Boolean)[1]??""}function g(){o(i(`
        <section class="loading-panel">Loading book details...</section>
    `,"book-details-page"))}async function h(e){const a=await c(e),t=d();p(t,a),window.location.href=`/play/${t}`}async function b(){g();const e=u();if(!e){o(i('<section class="error-panel">Missing book slug.</section>',"book-details-page"));return}try{const a=await r(e),t=l(e);o(i(`
            <section class="hero-panel">
                <div class="eyebrow">Book Details</div>
                <h1 class="hero-title">${a.title}</h1>
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
                            <span class="meta-pill">Slug: ${a.slug}</span>
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
                    ${t?`
                        <section class="status-card">
                            <div class="eyebrow">Existing Save</div>
                            <p class="status-copy">
                                A local save for this book already exists. Starting again will create
                                a fresh slot and make it the active save.
                            </p>
                            <div class="footer-actions">
                                <a class="secondary-link" href="/play/${t.id}">Resume Latest Save</a>
                            </div>
                        </section>
                    `:""}
                </aside>
            </section>
        `,"book-details-page")),document.querySelector("[data-start-book]")?.addEventListener("click",async()=>{const s=document.querySelector("[data-start-book]");s&&(s.disabled=!0,s.textContent="Preparing the story...");try{await h(e)}catch(n){s&&(s.disabled=!1,s.textContent="Start Reading"),o(i(`
                    <section class="error-panel">${n instanceof Error?n.message:"Could not start the book."}</section>
                `,"book-details-page"))}})}catch(a){o(i(`
            <section class="error-panel">${a instanceof Error?a.message:"Could not load the book."}</section>
        `,"book-details-page"))}}b();
