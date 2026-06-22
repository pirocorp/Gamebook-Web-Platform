export function pageShell(content: string, pageClass: string): string {
    return `
        <div class="app-shell ${pageClass}">
            ${content}
        </div>
    `;
}
