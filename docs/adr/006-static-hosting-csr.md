# 0006: Static hosting on GitHub Pages with client-side rendering

Status: Accepted · Date: 2026-11-15

## Context
The demo needs a free, public URL that works from a GitHub repo.

## Decision
- Render on the client (no SSR). GitHub Pages serves static files only, and SSR with federation adds significant complexity.
- Build shell and remotes in one GitHub Actions workflow and publish a single site: the shell at the root, remotes under `/remotes/<name>/`.
- Rewrite the manifest at deploy time, build the shell with the repository base href, and copy `index.html` to `404.html` so deep links survive a refresh.

## Consequences
- Free, simple hosting and a reproducible pipeline.
- No server-side rendering, so no SEO benefit and slower first paint than SSR.
- All apps deploy together in this demo, which does not show true independent releases yet.
- Remotes are same-origin, so there is no CORS configuration.

## Alternatives considered
- **SSR with federation:** more moving parts and needs a server.
- **Separate hosting per remote** (for example three Pages sites or a CDN): closer to independent deployment but more setup than this demo needs.