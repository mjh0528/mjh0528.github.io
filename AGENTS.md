# AGENTS.md

This file is the execution guide for agents working in this repository.

## 1. Project Summary
- Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + MDX
- Goal: Build and ship a static personal blog to GitHub Pages
- Deployment: Automatic deploy on push to `main` via `.github/workflows/deploy.yml`

## 2. Required Commands
- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Production build (verification): `npm run build`
- Lint: `npm run lint`
- Full test gate (lint + unit): `npm test`
- Create a new post: `npm run new:post -- --title "Post Title"`

After code changes, run at least `npm run build` to verify static export success.

## 3. Key Directories
- `app/`: Routes and UI
- `app/components/`: Shared components (header, footer, article layout)
- `app/lib/`: Site config and article parsing utilities
- `content/articles/`: MDX article source files
- `.github/workflows/deploy.yml`: GitHub Pages workflow

## 4. Content Rules (MDX)
- Article location: `content/articles/*.mdx`
- Files starting with `_` are excluded from list/detail generation
- Slug is derived from filename
- Recommended frontmatter fields:
  - `title`
  - `date` (`YYYY-MM-DD`)
  - `description`
  - `authorType` (`ai` or `human`)
  - `author`

## 5. Styling and Theme Rules
- Dark mode is class-based using `html.dark`
- Prefer CSS variables in `app/globals.css` (`--bg-main`, `--text-main`, etc.)
- When using Typography (`prose`), separate light/dark behavior:
  - Recommended: `prose dark:prose-invert`
  - Avoid: unconditional `prose-invert` (breaks light mode readability)

## 6. Deployment Notes
- `next.config.mjs` sets `basePath` automatically in GitHub Actions based on repo name
- User site (`*.github.io`) uses `/`
- Project site uses `/<repo-name>`
- If Pages deployment fails, check in order:
  1. Local `npm run build` success
  2. Failure stage in GitHub Actions logs (build vs deploy)
  3. `out/` artifact generation

## 7. Change Principles
- Keep existing structure, naming, and style
- Avoid unrelated large refactors
- Stay within user-requested scope
- Make minimal, targeted file changes

## 8. Documentation Language Policy
- Keep `AGENTS.md` and `README.md` in English
- Blog articles under `content/articles/` may be written in Korean

## 9. Test Code Rules
- Add or update tests for every behavior change, not only for new features.
- For script-level logic, use Node's built-in test runner and place tests in `tests/*.test.mjs`.
- Keep tests deterministic: no network calls, no random dependencies, and no time-based flakiness.
- File-system tests must run in temporary directories and clean up after execution.
- For bug fixes, include at least one regression test that would fail before the fix.
- Before pushing, run both `npm test` and `npm run build`.
