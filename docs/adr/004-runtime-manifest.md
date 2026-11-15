# 0004: Load remote URLs from a runtime manifest

Status: Accepted · Date: 2026-11-15

## Context
Remote locations differ between local development (localhost ports) and production (GitHub Pages paths). Hard-coding them in the shell would force a shell rebuild for every URL change.

## Decision
Make the shell a dynamic host. It reads `federation.manifest.json` at startup. Locally it points to ports 4201 and 4202. The deploy workflow overwrites it with production URLs.

## Consequences
- Remote URLs change without rebuilding the shell.
- Environments are handled by swapping one small file.
- A wrong manifest fails at runtime, not build time. We hit this during setup, when both remotes pointed at the shell's own port and the routes silently failed.
- Remote and shell names must match exactly across the manifest, federation configs and `loadRemoteModule` calls.

## Alternatives considered
- **Static host with URLs compiled in:** simpler, but requires a shell rebuild for each change.