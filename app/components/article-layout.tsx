import type { ReactNode } from 'react';
import Link from 'next/link';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';

type ArticleLayoutProps = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  children: ReactNode;
};

export function ArticleLayout({ title, date, description, tags = [], children }: ArticleLayoutProps) {
  return (
    <div className="bg-bgMain text-textMain min-h-screen flex flex-col font-[var(--font-inter)]">
      <SiteHeader />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link className="text-sm text-accent hover:underline" href="/articles">
            ← Articles
          </Link>

          <header className="mt-5 mb-10 border-b border-borderSubtle pb-6">
            <h1 className="font-[var(--font-jetbrains-mono)] text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
            <p className="text-sm text-textMuted mt-3">{date}</p>
            {description ? <p className="text-textMuted mt-4">{description}</p> : null}
            {tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag) => (
                  <li key={tag} className="px-2 py-1 border border-borderSubtle text-xs text-textMuted rounded-sm">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </header>

          <article className="prose prose-invert max-w-none prose-headings:font-[var(--font-jetbrains-mono)] prose-a:text-accent">
            {children}
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
