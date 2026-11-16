# 0007: Make remotes independently releasable

Status: Accepted · Date: 2026-11-16
Amends [005](005-shared-ui-and-bootstrap.md) · Supersedes the deployment part of [006](006-static-hosting-csr.md)

## Context
Review feedback pointed out that this repo claimed independent remotes but did not deliver them:
- `@bank/shared-ui` was shared at runtime, so a remote's behaviour depended on whichever copy of the library the shell loaded. It acted as part of the contract without being named as one.
- One workflow built and deployed all three apps together.
- "Remotes must not import from each other" was a convention, not a rule.

## Decisions

### 1. The runtime contract is explicit, and the UI kit is not part of it
`shared-ui` is no longer shared at runtime. Each app compiles its own copy. With this version of Native Federation, workspace libraries are shared by default, so each app lists `@bank/shared-ui` in `skip` in its `federation.config.mjs`.

The contract between shell and remotes is:
1. The exposed `./routes` of each remote.
2. The remote URLs in `federation.manifest.json`.
3. Design tokens (CSS custom properties such as `--bank-navy` and `--bank-accent`) and Bootstrap 5 global CSS, provided by the shell. Components use token fallbacks.
4. Angular as a shared singleton.

### 2. Each app deploys on its own
One workflow detects which paths changed and runs one job per app. Each publishes to its own folder on the `gh-pages` branch: `/` for the shell, `/remotes/wealth` and `/remotes/credit-risk`. Before a remote publishes, a contract check fails the job if `./routes` is no longer exposed or if `@bank/shared-ui` appears in the remote's `remoteEntry.json`.

### 3. Boundaries are enforced
Projects are tagged by scope (`scope:shell`, `scope:wealth`, `scope:credit-risk`, `scope:shared`) and type (`type:app`, `type:ui`). `@nx/enforce-module-boundaries` allows each scope to depend only on itself and `scope:shared`, and `type:ui` only on `type:ui` and `type:util`. A violation fails lint.

## Consequences
- A remote can be released without rebuilding or redeploying the shell, provided it respects the contract above.
- A change to `shared-ui` rebuilds and redeploys all three apps, because each bundles it. The duplicated bytes are small at this scale.
- Visual drift is possible between apps built from different `shared-ui` versions. Tokens limit it and do not remove it.
- Residual coupling: Angular major upgrades must roll out across all apps together. The Bootstrap major version is also an implicit contract.
- Deploys share one repository and one static host. Real teams would use separate pipelines and a CDN with versioned URLs.
- Tags only help if every new project is tagged.

## Alternatives considered
- **Share `shared-ui` as a versioned singleton** with additive-only changes, version ranges and contract tests against the previous shell build. Stronger for an organisation with a design-system team, but heavy for this repo.
- **Publish `shared-ui` as a versioned package.** Same trade-off, plus registry overhead.
- **Keep Pages artifact deploys.** Simplest, but every deploy ships everything.
- **Separate repositories or Pages sites per remote.** More independent, more overhead for a demo.

## Evidence
<!-- Add a link to the GitHub Actions run where only the wealth job ran after a Wealth-only change. -->