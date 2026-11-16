# 0005: Shared UI library with plain Bootstrap CSS

Status: Accepted · Date: 2026-11-15

## Context
All three apps need a consistent look and a few reusable components. We also wanted a familiar styling base (Bootstrap).

## Decision
- Put reusable presentational components in `libs/shared-ui` (`lib-bank-card`, `lib-risk-meter`), exported through a public `index.ts` and shared as a singleton via Native Federation shared mappings.
- Use Bootstrap 5 CSS, imported in each app's `styles.scss`.
- Build the risk meter from plain Bootstrap classes instead of the `ng-bootstrap` progress bar.

## Consequences
- One place to change the look of shared components.
- Each app imports the Bootstrap stylesheet, so remotes also look right when run standalone.
- `ng-bootstrap` components require `@angular/localize`. The first version of the risk meter used it and failed at runtime with `$localize is not defined`, but only on the Credit Risk page. Making `$localize` available across a shell and independent remotes adds setup, so we removed the dependency for the demo.
- Trade-off: simpler runtime, but we hand-build components that `ng-bootstrap` would provide.

## Alternatives considered
- **Keep `ng-bootstrap` and load `@angular/localize` in every app:** viable, but adds startup coupling between shell and remotes.
- **Angular Material or another design system:** heavier, and not needed for the demo.

## Status
Amended by 0007