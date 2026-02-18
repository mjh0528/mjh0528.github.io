import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { siteConfig } from '@/app/lib/site';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export type ArticleAuthorType = 'ai' | 'human';

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  authorType: ArticleAuthorType;
  author: string;
};

export type ParsedArticle = ArticleMeta & {
  content: string;
};

type SortableArticleMeta = ArticleMeta & {
  updatedAtMs: number;
};

export type ArticleHeading = {
  id: string;
  text: string;
  level: number;
};

function ensureArticlesDir() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

function toMeta(slug: string, frontmatter: Record<string, unknown>) {
  const rawAuthorType =
    typeof frontmatter.authorType === 'string' ? frontmatter.authorType.trim().toLowerCase() : 'human';
  const authorType: ArticleAuthorType = rawAuthorType === 'ai' ? 'ai' : 'human';
  const defaultAuthor = authorType === 'ai' ? siteConfig.aiAuthorName : siteConfig.fullName;
  const author = typeof frontmatter.author === 'string' && frontmatter.author.trim() ? frontmatter.author.trim() : defaultAuthor;

  return {
    slug,
    title: typeof frontmatter.title === 'string' ? frontmatter.title : slug,
    date: typeof frontmatter.date === 'string' ? frontmatter.date : '1970-01-01',
    description: typeof frontmatter.description === 'string' ? frontmatter.description : '',
    authorType,
    author
  } satisfies ArticleMeta;
}

function compareByDateDesc(a: SortableArticleMeta, b: SortableArticleMeta) {
  const aTime = Number.isNaN(Date.parse(a.date)) ? 0 : Date.parse(a.date);
  const bTime = Number.isNaN(Date.parse(b.date)) ? 0 : Date.parse(b.date);

  if (bTime !== aTime) {
    return bTime - aTime;
  }

  if (b.updatedAtMs !== a.updatedAtMs) {
    return b.updatedAtMs - a.updatedAtMs;
  }

  return b.slug.localeCompare(a.slug);
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*_~[\]()]/g, '')
    .replace(/[^a-z0-9\u3131-\u3163\uac00-\ud7a3\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .trim();
}

export function extractArticleHeadings(content: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  return lines
    .map((line) => {
      const match = line.match(/^(#{2,4})\s+(.+?)\s*#*\s*$/);
      if (!match) {
        return null;
      }

      const level = match[1].length;
      const text = stripInlineMarkdown(match[2]);
      const id = slugifyHeading(text);
      if (!text || !id) {
        return null;
      }

      return { id, text, level } satisfies ArticleHeading;
    })
    .filter((heading): heading is ArticleHeading => heading !== null);
}

export function formatArticleDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(parsed);
}

export function getAllArticlesMeta() {
  ensureArticlesDir();

  const entries = fs
    .readdirSync(ARTICLES_DIR)
    .filter((fileName) => fileName.endsWith('.mdx') && !fileName.startsWith('_'));

  return entries
    .map((fileName) => {
      const fullPath = path.join(ARTICLES_DIR, fileName);
      const slug = fileName.replace(/\.mdx$/, '');
      const source = fs.readFileSync(fullPath, 'utf-8');
      const parsed = matter(source);
      const stats = fs.statSync(fullPath);
      return {
        ...toMeta(slug, parsed.data as Record<string, unknown>),
        updatedAtMs: stats.mtimeMs
      } satisfies SortableArticleMeta;
    })
    .sort(compareByDateDesc)
    .map(({ updatedAtMs: _, ...article }) => article);
}

export function getAllArticleSlugs() {
  return getAllArticlesMeta().map((article) => article.slug);
}

export function getArticleBySlug(slug: string): ParsedArticle | null {
  ensureArticlesDir();

  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const source = fs.readFileSync(fullPath, 'utf-8');
  const parsed = matter(source);
  const meta = toMeta(slug, parsed.data as Record<string, unknown>);

  return {
    ...meta,
    content: parsed.content.trim()
  };
}
