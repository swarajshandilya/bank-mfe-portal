# 0003: Use Native Federation, not webpack Module Federation

Status: Accepted · Date: 2026-11-15

## Context
The goal was Module Federation for Angular in Nx. While setting up (Node 26, Angular 22, Nx 24), we found:
- Nx deprecated its Angular host/remote generators in v23 and removes them in v24. Nx recommends `@angular-architects/native-federation` for Angular. See https://nx.dev/docs/kb/angular-micro-frontends
- Angular 22 deprecates the webpack-based builders.
- Node 26 requires Angular 22 (Angular 21 does not support it).

## Decision
Use `@angular-architects/native-federation`. It keeps the Module Federation mental model (host, remotes, shared dependencies) but builds on Angular's esbuild application builder and loads remotes as ES modules through import maps.

## Consequences
- Aligned with the supported Nx and Angular direction; esbuild builds are fast.
- Remote entry is `remoteEntry.json` plus ES modules, not a webpack container.
- Smaller ecosystem and fewer tutorials than webpack Module Federation.
- Not interchangeable with webpack remotes at runtime.

## Alternatives considered
- **Pin Nx 22 and use `@nx/angular:host`/`remote`:** works today but sits on a removed path and would need migration soon.
- **Rspack Module Federation with Angular:** possible, but it adds a non-standard Angular build setup for no demo benefit.