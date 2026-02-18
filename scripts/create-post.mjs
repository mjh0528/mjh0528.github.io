#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const HUMAN_DEFAULT_AUTHOR = 'Joonhyeop Moon';
const AI_DEFAULT_AUTHOR = 'Codex';
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      continue;
    }

    const raw = token.slice(2);
    const eqIndex = raw.indexOf('=');
    if (eqIndex >= 0) {
      const key = raw.slice(0, eqIndex);
      parsed[key] = raw.slice(eqIndex + 1);
      continue;
    }

    const next = argv[index + 1];
    if (next && !next.startsWith('--')) {
      parsed[raw] = next;
      index += 1;
      continue;
    }

    parsed[raw] = 'true';
  }

  return parsed;
}

function toSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function quote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function exitWithUsage(message) {
  if (message) {
    console.error(`Error: ${message}`);
  }

  console.log(
    [
      'Usage:',
      '  npm run new:post -- --title "Post title" [--description "summary"] [--slug "post-slug"]',
      '                      [--author-type ai|human] [--author "name"] [--date YYYY-MM-DD]'
    ].join('\n')
  );
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));
const title = typeof args.title === 'string' ? args.title.trim() : '';
if (!title) {
  exitWithUsage('--title is required.');
}

const date = typeof args.date === 'string' && args.date.trim() ? args.date.trim() : new Date().toISOString().slice(0, 10);
const description =
  typeof args.description === 'string' && args.description.trim()
    ? args.description.trim()
    : 'One-line summary shown in home and article list.';
const authorType = args['author-type'] === 'ai' ? 'ai' : args['author-type'] === 'human' ? 'human' : 'ai';
const defaultAuthor = authorType === 'ai' ? AI_DEFAULT_AUTHOR : HUMAN_DEFAULT_AUTHOR;
const author = typeof args.author === 'string' && args.author.trim() ? args.author.trim() : defaultAuthor;
const providedSlug = typeof args.slug === 'string' ? args.slug.trim() : '';
const slug = toSlug(providedSlug || title) || `post-${date}`;

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  exitWithUsage('--date must follow YYYY-MM-DD format.');
}

if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
if (fs.existsSync(filePath)) {
  exitWithUsage(`File already exists: content/articles/${slug}.mdx`);
}

const output = `---
title: ${quote(title)}
date: ${quote(date)}
description: ${quote(description)}
authorType: ${quote(authorType)}
author: ${quote(author)}
---

## TL;DR

Write a short intro here.

## Context

Explain why this topic matters.

## What I Did

- Step 1
- Step 2
- Step 3

## Notes

Use inline code like \`const x = 1\` and links like [Next.js](https://nextjs.org/).

\`\`\`ts
export function example() {
  return 'hello';
}
\`\`\`

## Conclusion

Wrap up key takeaways.
`;

fs.writeFileSync(filePath, output, 'utf-8');
console.log(`Created: content/articles/${slug}.mdx`);
