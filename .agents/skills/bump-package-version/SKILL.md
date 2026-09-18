---
name: bump-package-version
description: Bump the semantic version in package.json after project changes. Use whenever code, content, styles, config, dependencies, or docs in this repository are modified, before considering the task complete.
---

# Bump Package Version

After any real change to this project, increment `version` in `package.json` once for the whole change set. Do this before handing the work off.

## When to bump

Bump when the working tree will contain project changes, including:

- App code, styles, config, or dependencies
- Blog posts and other content under `content/`
- Agent docs or skills that ship with the repo

Do **not** bump when:

- The work was read-only (inspect, explain, review without edits)
- `package.json` `version` was already bumped for this same change set
- The user explicitly asked not to change the version
- The only remaining diff would be the version itself

Never bump more than once per task/change set. Never create a git commit, tag, or publish just because the version changed.

## Choose the increment

Use [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`.

| Change | Increment | Example |
| --- | --- | --- |
| Bug fix, copy, styling, content, chore, docs, or internal refactor | PATCH | `0.1.0` → `0.1.1` |
| New user-facing capability, page, or feature | MINOR | `0.1.0` → `0.2.0` |
| Breaking change to public behavior or APIs | MAJOR | `0.1.0` → `1.0.0` |

If the change set mixes types, use the highest increment that applies. If unsure, use PATCH.

The current version is pre-`1.0.0`. Keep using `0.y.z` until the user asks for `1.0.0`.

## How to bump

1. Read `version` from `package.json`.
2. Run **one** of these from the repo root. `--no-git-tag-version` updates `package.json` without creating a git commit or tag:

```bash
npm version patch --no-git-tag-version
npm version minor --no-git-tag-version
npm version major --no-git-tag-version
```

3. Confirm `package.json` now has the new `version`.
4. Leave the version change in the same working tree as the other edits. Do not commit unless the user asked for a commit.

Do not hand-edit `version` when `npm version` is available. Do not change other `package.json` fields.

## Examples

- Fix a layout bug → `npm version patch --no-git-tag-version`
- Add a new blog post → `npm version patch --no-git-tag-version`
- Add a new page or interactive feature → `npm version minor --no-git-tag-version`
- Multiple files in one feature → one MINOR bump, not one bump per file
