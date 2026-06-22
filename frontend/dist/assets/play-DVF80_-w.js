import{m as i,p as c,b as p,c as y,d as h}from"./main-Bs5VOE8H.js";import{a as m,p as d}from"./local-save-store-CPIlv3_z.js";function u(){return window.location.pathname.split("/").filter(Boolean)[1]??""}function v(s){const{playerState:e}=s.save,a=n=>n.length>0?`<ul class="diary-list">${n.map(t=>`<li>${t}</li>`).join("")}</ul>`:'<div class="diary-empty">Nothing recorded yet.</div>';return`
        <aside class="diary-card">
            <h2 class="diary-title">Diary</h2>
            <div class="diary-grid">
                <section class="diary-section">
                    <h3>Money</h3>
                    <div>${e.money}</div>
                </section>
                <section class="diary-section">
                    <h3>Items</h3>
                    ${a(e.items)}
                </section>
                <section class="diary-section">
                    <h3>Skills</h3>
                    ${a(e.skills)}
                </section>
                <section class="diary-section">
                    <h3>Code Words</h3>
                    ${a(e.codeWords)}
                </section>
                <section class="diary-section">
                    <h3>Notes</h3>
                    ${e.notes?`<div>${e.notes}</div>`:'<div class="diary-empty">No notes yet.</div>'}
                </section>
            </div>
        </aside>
    `}function r(s,e,a){const n=e.episode.choices.length>0?e.episode.choices.map(t=>`
            <button class="choice-button" type="button" data-choice-key="${t.key}">
                <span>
                    <strong>${t.label}</strong>
                    <span class="choice-caption">The backend will validate and apply the move.</span>
                </span>
            </button>
        `).join(""):'<section class="status-card"><p class="status-copy">This path currently ends here. The reader has reached a terminal episode in the curated slice.</p></section>';i(c(`
        ${a?`<section class="status-panel status-card"><p class="status-copy">${a}</p></section>`:""}
        <section class="play-layout">
            <article class="reader-card">
                <div class="eyebrow">Now Reading</div>
                <h1 class="reader-title">${e.gamebookTitle}</h1>
                <div class="reader-meta">
                    <span class="meta-pill">Episode ${e.episode.key}</span>
                    <span class="meta-pill">Save ${s.slice(0,8)}</span>
                </div>
                <div class="reader-body">${y(e.episode.displayText)}</div>
                <section class="choices-list">
                    ${n}
                </section>
                <div class="footer-actions">
                    <a class="secondary-link" href="/books/${e.gamebookSlug}">Back to Book</a>
                    <a class="secondary-link" href="/books">Back to Library</a>
                </div>
            </article>
            ${v(e)}
        </section>
    `,"play-page")),document.querySelectorAll("[data-choice-key]").forEach(t=>{t.addEventListener("click",async()=>{const l=t.dataset.choiceKey;if(l){document.querySelectorAll("[data-choice-key]").forEach(o=>{o.disabled=!0});try{const o=await h(e.save,l);d(s,o),r(s,o,"Choice resolved and saved locally.")}catch(o){r(s,e,o instanceof Error?o.message:"Could not apply that choice.")}}})})}async function g(s,e){const a=await p(s.save);d(e,a),r(e,a)}async function f(){const s=u();if(!s){i(c('<section class="error-panel">Missing local save id in the URL.</section>',"play-page"));return}const e=m(s);if(!e){i(c(`
            <section class="error-panel">
                No local save was found for this reader path. Start a book from the library first.
            </section>
        `,"play-page"));return}i(c('<section class="loading-panel">Restoring the current episode...</section>',"play-page"));try{await g(e,s)}catch(a){i(c(`
            <section class="error-panel">${a instanceof Error?a.message:"Could not restore the current save."}</section>
        `,"play-page"))}}f();
