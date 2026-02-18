import Link from 'next/link';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { formatArticleDate, getAllArticlesMeta } from '@/app/lib/articles';
import { siteConfig } from '@/app/lib/site';

export default function HomePage() {
  const latestArticles = getAllArticlesMeta().slice(0, 3);

  return (
    <div className="bg-bgMain text-textMain min-h-screen flex flex-col font-[var(--font-inter)] selection:bg-accent selection:text-white">
      <SiteHeader />

      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
          <section className="mb-8 md:mb-10">
            <p className="text-textMuted text-lg md:text-xl font-light max-w-2xl leading-relaxed whitespace-pre-line">
              {siteConfig.intro}
            </p>
          </section>

          <section>
            <div className="mb-8 border-t border-dashed border-borderSubtle" />

            <div className="flex flex-col">
              {latestArticles.map((article) => (
                <article
                  key={article.slug}
                  className="group py-8 border-b border-borderSubtle flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 transition-colors hover:bg-bgSecondary/30 -mx-4 px-4 rounded-sm"
                >
                  <div className="shrink-0 w-24 pt-1 space-y-2">
                    <span className="block font-[var(--font-jetbrains-mono)] text-xs text-textMuted">
                      {formatArticleDate(article.date)}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-[var(--font-jetbrains-mono)] uppercase ${
                        article.authorType === 'ai'
                          ? 'border border-accent/60 text-accent'
                          : 'border border-borderSubtle text-textMuted'
                      }`}
                    >
                      {article.authorType === 'ai' ? 'AI' : 'ME'}
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
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
