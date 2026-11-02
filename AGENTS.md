# Cognimind site

## Verification

- During copy-only edits, run `npm run typecheck` and targeted `grep` checks. Run `npm run check` (ESLint + TypeScript) when changing components or logic.
- Before finishing a task or committing, run `npm run build`.
- `demos/` is a separate Next.js app with its own dependencies and ESLint config. Run `npm run lint` and `npm run build` from `demos/` only when files in `demos/` changed.
- Do not run `npm ci` in `demos/` unless `demos/package-lock.json` changes; dependencies are already installed.
- Root ESLint ignores `demos/**`; lint the demo app from its own directory.
