import type { Metadata } from 'next';
import type { HTMLAttributes, ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Children, isValidElement } from 'react';
import remarkGfm from 'remark-gfm';
import { ArticleLayout } from '@/app/components/article-layout';
import { ShareLinkButton } from '@/app/articles/[slug]/share-link-button';
import {
  extractArticleHeadings,
  formatArticleDate,
  getAllArticleSlugs,
  getArticleBySlug,
  slugifyHeading
} from '@/app/lib/articles';
import { siteConfig } from '@/app/lib/site';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return {};
  }

  const articlePath = `/articles/${article.slug}`;
  const articleUrl = `${siteConfig.siteUrl}${articlePath}`;
  const description = article.description || siteConfig.description;

  return {
    title: article.title,
    description: article.description || undefined,
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: article.title,
      description,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${siteConfig.title} Open Graph Image`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: ['/opengraph-image']
    }
  };
}

function extractText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }
      if (isValidElement(child)) {
        return extractText((child.props as { children?: ReactNode }).children);
      }
      return '';
    })
    .join('')
    .trim();
}

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
};

function HeadingWithId({ children, ...props }: HeadingProps, tag: 'h2' | 'h3' | 'h4') {
  const text = extractText(children);
  const id = slugifyHeading(text);
  if (tag === 'h2') {
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  }
  if (tag === 'h3') {
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  }
  return (
    <h4 id={id} {...props}>
      {children}
    </h4>
  );
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const headings = extractArticleHeadings(article.content);
  const articlePath = `/articles/${article.slug}`;
  const articleUrl = `${siteConfig.siteUrl}${articlePath}`;

  const components = {
    h2: (props: HeadingProps) => HeadingWithId(props, 'h2'),
    h3: (props: HeadingProps) => HeadingWithId(props, 'h3'),
    h4: (props: HeadingProps) => HeadingWithId(props, 'h4')
  };

  return (
    <ArticleLayout
      date={formatArticleDate(article.date)}
      authorType={article.authorType}
      author={article.author}
      description={article.description}
      sidebar={
        <div className="sticky top-28">
          {headings.length > 0 ? (
            <div className="mb-10">
              <p className="mb-4 text-xs font-[var(--font-jetbrains-mono)] uppercase tracking-wider text-textMuted">
                Table of Contents
              </p>
              <nav className="border-l border-borderSubtle pl-4 space-y-3">
                {headings.map((heading) => (
                  <a
                    className={`block text-sm text-textMuted hover:text-textMain transition-colors ${heading.level > 2 ? 'pl-3 text-xs' : ''}`}
                    href={`#${heading.id}`}
                    key={heading.id}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          ) : null}

          <div>
            <p className="mb-4 text-xs font-[var(--font-jetbrains-mono)] uppercase tracking-wider text-textMuted">Share</p>
            <ShareLinkButton url={articleUrl} />
          </div>
        </div>
      }
      title={article.title}
    >
      <MDXRemote
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm]
          }
        }}
        source={article.content}
      />
    </ArticleLayout>
  );
}
