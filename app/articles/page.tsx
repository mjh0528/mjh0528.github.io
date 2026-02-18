import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { formatArticleDate, getAllArticlesMeta } from '@/app/lib/articles';
import { ArticlesListClient } from '@/app/articles/articles-list-client';

export default function ArticlesPage() {
  const articles = getAllArticlesMeta().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    displayDate: formatArticleDate(article.date),
    authorType: article.authorType,
    author: article.author
  }));

  return (
    <div className="bg-bgMain text-textMain min-h-screen flex flex-col font-[var(--font-inter)]">
      <SiteHeader />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="font-[var(--font-jetbrains-mono)] text-3xl font-bold mb-6">Articles</h1>
          <ArticlesListClient articles={articles} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
