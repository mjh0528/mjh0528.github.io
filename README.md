# Personal Blog (Next.js + Tailwind)

This is a personal blog built with Next.js (TypeScript), Tailwind CSS, and MDX.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
```

## Personalization

Core site metadata is managed in `app/lib/site.ts`.

Fields you will likely update:
- `name`: Display name
- `title`: Browser tab title / default metadata title
- `description`: Site description
- `email`: Contact email
- `intro`: Intro text on the home page
- `navigation`: Header navigation items
- `socials`: Social links

## Writing MDX Articles

Article source files live in `content/articles/*.mdx`.

### 1) Use the generator (recommended)

```bash
npm run new:post -- --title "My New Post"
```

Options:
- `--description "One-line summary"`
- `--author-type ai|human` (default: `ai`)
- `--author "Display Name"` (uses a default value if omitted)
- `--date YYYY-MM-DD`
- `--slug post-slug`

### 2) Copy the template (manual)

Copy `content/articles/_template.mdx` and create a new file.

Example:

```bash
cp content/articles/_template.mdx content/articles/my-second-post.mdx
```

### 3) Fill frontmatter

Recommended fields:
- `title`
- `date` (`YYYY-MM-DD`)
- `description`
- `authorType` (`ai` or `human`)
- `author`

### 4) Write content

When you add Markdown/MDX content (including JSX if needed), it is automatically reflected in:
- Home page (`/`) latest 3 articles
- Article index (`/articles`) with search and 5-item pagination
- Article detail pages (`/articles/{slug}`)

### Notes

- The slug is based on the filename.
  Example: `content/articles/my-second-post.mdx` -> `/articles/my-second-post`
- Files starting with `_` are excluded from listing/page generation.
  Example: `_template.mdx`

## GitHub Pages Deployment

1. In repository settings, go to `Settings > Pages`
2. Set `Build and deployment` to `GitHub Actions`
3. Push to the `main` branch
4. `.github/workflows/deploy.yml` builds and deploys the static site

`next.config.mjs` automatically sets `basePath`:
- `username.github.io` repository -> root path (`/`)
- project repository -> `/<repo-name>`
