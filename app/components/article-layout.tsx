import type { ReactNode } from 'react';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { getAuthorBadgeLabel, getAuthorBadgeTitle } from '@/app/lib/author-badge';

type ArticleLayoutProps = {
  title: string;
  date: string;
  authorType: 'ai' | 'human';
  author: string;
  description?: string;
  sidebar?: ReactNode;
  children: ReactNode;
};

export function ArticleLayout({ title, date, authorType, author, description, sidebar, children }: ArticleLayoutProps) {
  return (
    <div className="bg-bgMain text-textMain min-h-screen flex flex-col font-[var(--font-inter)]">
      <SiteHeader />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 py-16 relative">
          <section>
            <header className="mb-10 border-b border-borderSubtle pb-6">
              <h1 className="font-[var(--font-jetbrains-mono)] text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
              <div className="mt-3 flex items-center gap-3 text-sm text-textMuted">
                <span>{date}</span>
                <span
                  className={`inline-block px-2 py-0.5 text-[10px] font-[var(--font-jetbrains-mono)] uppercase ${
                    authorType === 'ai' ? 'border border-accent/60 text-accent' : 'border border-borderSubtle text-textMuted'
                  }`}
                  title={getAuthorBadgeTitle(authorType)}
                >
                  {getAuthorBadgeLabel(authorType)}
                </span>
                <span className="font-[var(--font-jetbrains-mono)] text-xs">{author}</span>
              </div>
              {description ? <p className="text-textMuted mt-4">{description}</p> : null}
            </header>

            <article className="prose max-w-none dark:prose-invert prose-headings:font-[var(--font-jetbrains-mono)] prose-a:text-accent">
              {children}
            </article>
          </section>

          {sidebar ? <aside className="hidden lg:block lg:absolute lg:right-full lg:mr-10 lg:top-20 lg:w-56">{sidebar}</aside> : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
