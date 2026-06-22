export function mount(html: string): HTMLElement {
    const app = document.querySelector<HTMLElement>("#app");
    if (!app) {
        throw new Error("The #app root element was not found.");
    }

    app.innerHTML = html;
    return app;
}

export function escapeHtml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#39;");
}

export function paragraphize(value: string): string {
    return value
        .split(/\n{2,}/)
        .map(part => `<p>${escapeHtml(part).replaceAll("\n", "<br>")}</p>`)
        .join("");
}
