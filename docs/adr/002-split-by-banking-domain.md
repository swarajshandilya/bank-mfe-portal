# 0002: Split micro frontends by banking domain

Status: Accepted · Date: 2026-11-15

## Context
A micro-frontend split should follow business boundaries, so a team can own a domain end to end.

## Decision
Create one remote per bounded context: `wealth` (wealth management) and `credit-risk` (credit risk). The `shell` owns only navigation and layout.

## Consequences
- Each domain can evolve and release on its own.
- Cross-domain UI is limited to `libs/shared-ui`.
- Remotes must not import from each other.
- More moving parts than a single Angular app, which is only justified when teams or release cadence differ.

## Alternatives considered
- **Split by technical layer** (for example a "forms" app): couples every domain to every change.
- **Single Angular app with lazy routes:** simpler, but does not demonstrate independent deployability.