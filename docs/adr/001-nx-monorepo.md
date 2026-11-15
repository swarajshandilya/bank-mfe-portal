# 0001: Use an Nx monorepo

Status: Accepted · Date: 2026-11-15

## Context
The portal has three applications and a shared library that change together. They need consistent tooling, one dependency set and simple cross-project refactoring.

## Decision
Use one Nx workspace containing `apps/shell`, `apps/wealth`, `apps/credit-risk` and `libs/shared-ui`.

## Consequences
- One install, one lint/test/build command set, and cached, affected-only task runs.
- Shared code is a workspace library, not a published package.
- All apps share one Angular version, so upgrades happen together.
- Independent deployment needs separate pipelines per remote (see Known gaps in architecture.md).

## Alternatives considered
- **Separate repositories per app:** stronger team autonomy, but more overhead for a single-author demo and harder to share the UI library.