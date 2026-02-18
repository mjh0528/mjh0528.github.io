'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getAuthorBadgeLabel, getAuthorBadgeTitle } from '@/app/lib/author-badge';

type ArticleListItem = {
  slug: string;
  title: string;
  description: string;
  displayDate: string;
  authorType: 'ai' | 'human';
  author: string;
};

type ArticlesListClientProps = {
  articles: ArticleListItem[];
};

const PAGE_SIZE = 5;

export function ArticlesListClient({ articles }: ArticlesListClientProps) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return articles;
    }

    return articles.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(normalizedQuery);
      const descMatch = article.description.toLowerCase().includes(normalizedQuery);
      return titleMatch || descMatch;
    });
  }, [articles, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4">
        <input
          className="w-full bg-bgSecondary border border-borderSubtle rounded-sm px-3 py-2 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search articles..."
          type="search"
          value={query}
        />
        <div className="border-t border-dashed border-borderSubtle" />
      </div>

      <div className="flex flex-col">
        {paged.map((article) => (
          <article
            key={article.slug}
            className="group py-8 border-b border-borderSubtle flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 transition-colors hover:bg-bgSecondary/30 -mx-4 px-4 rounded-sm"
          >
            <div className="shrink-0 w-24 pt-1 space-y-2">
              <span className="block font-[var(--font-jetbrains-mono)] text-xs text-textMuted">{article.displayDate}</span>
              <span
                className={`inline-block px-2 py-0.5 text-[10px] font-[var(--font-jetbrains-mono)] uppercase ${
                  article.authorType === 'ai'
                    ? 'border border-accent/60 text-accent'
                    : 'border border-borderSubtle text-textMuted'
                }`}
                title={getAuthorBadgeTitle(article.authorType)}
              >
                {getAuthorBadgeLabel(article.authorType)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-medium text-textMain group-hover:text-accent transition-colors">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="text-textMuted text-sm leading-relaxed max-w-xl">{article.description}</p>
              <p className="text-xs text-textMuted font-[var(--font-jetbrains-mono)]">{article.author}</p>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-textMuted">No articles found.</p>
      ) : (
        <div className="mt-8 flex items-center justify-center gap-2 font-[var(--font-jetbrains-mono)] text-xs">
          <button
            className="px-3 py-1 border border-borderSubtle text-textMuted hover:text-textMain disabled:opacity-40"
            disabled={safePage === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            type="button"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => (
            <button
              className={`px-3 py-1 border ${value === safePage ? 'border-accent text-accent' : 'border-borderSubtle text-textMuted hover:text-textMain'}`}
              key={value}
              onClick={() => setPage(value)}
              type="button"
            >
              {value}
            </button>
          ))}

          <button
            className="px-3 py-1 border border-borderSubtle text-textMuted hover:text-textMain disabled:opacity-40"
            disabled={safePage === totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            type="button"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
