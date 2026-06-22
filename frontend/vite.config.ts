import { defineConfig } from "vite";

function rewritePath(pathname: string): string | null {
    if (pathname === "/" || pathname === "/books") {
        return "/books.html";
    }

    if (/^\/books\/[^/]+$/.test(pathname)) {
        return "/book-details.html";
    }

    if (/^\/play\/[^/]+$/.test(pathname)) {
        return "/play.html";
    }

    return null;
}

export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            "/api": {
                target: process.env.VITE_API_PROXY_TARGET ?? "http://localhost:8080",
                changeOrigin: true
            }
        }
    },
    plugins: [
        {
            name: "gamebook-route-rewrites",
            configureServer(server) {
                server.middlewares.use((req, _res, next) => {
                    if (!req.url) {
                        next();
                        return;
                    }

                    const url = new URL(req.url, "http://localhost");
                    const rewrite = rewritePath(url.pathname);
                    if (rewrite) {
                        req.url = `${rewrite}${url.search}`;
                    }

                    next();
                });
            }
        }
    ],
    build: {
        rollupOptions: {
            input: {
                books: "books.html",
                bookDetails: "book-details.html",
                play: "play.html"
            }
        }
    }
});
