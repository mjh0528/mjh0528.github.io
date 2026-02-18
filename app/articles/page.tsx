import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { siteConfig } from '@/app/lib/site';
import Link from 'next/link';

export default function ArticlesPage() {
  return (
    <div className="bg-bgMain text-textMain min-h-screen flex flex-col font-[var(--font-inter)]">
      <SiteHeader />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="font-[var(--font-jetbrains-mono)] text-3xl font-bold mb-6">Articles</h1>

          <div className="mb-8 border-t border-dashed border-borderSubtle" />

          <div className="flex flex-col">
            {siteConfig.featuredWriting.map((article) => (
              <article
                key={article.title}
                className="group py-8 border-b border-borderSubtle flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 transition-colors hover:bg-bgSecondary/30 -mx-4 px-4 rounded-sm"
              >
                <span className="font-[var(--font-jetbrains-mono)] text-xs text-textMuted shrink-0 w-24 pt-1">
                  {article.date}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium text-textMain group-hover:text-accent transition-colors">
                    <Link href={article.href}>{article.title}</Link>
                  </h3>
                  <p className="text-textMuted text-sm leading-relaxed max-w-xl">{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
