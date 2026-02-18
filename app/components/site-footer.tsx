import { siteConfig } from '@/app/lib/site';

export function SiteFooter() {
  const github = siteConfig.socials.find((social) => social.label === 'GitHub');
  const linkedIn = siteConfig.socials.find((social) => social.label === 'LinkedIn');

  return (
    <footer className="border-t border-borderSubtle mt-auto py-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-textMuted">
        <p className="font-[var(--font-jetbrains-mono)]">© {new Date().getFullYear()} {siteConfig.fullName}</p>

        <div className="flex items-center gap-4">
          {github ? (
            <a
              aria-label="GitHub"
              className="text-textMuted hover:text-textMain transition-colors"
              href={github.href}
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.5-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 5.5 8c-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2a4.7 4.7 0 0 1 1.3 3.3c0 4.6-2.8 5.7-5.5 6 .4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
              </svg>
            </a>
          ) : null}

          {linkedIn ? (
            <a
              aria-label="LinkedIn"
              className="text-textMuted hover:text-textMain transition-colors"
              href={linkedIn.href}
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9v5.7H9.2V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.7 0 4.4 2.4 4.4 5.6v6.2ZM5.1 7.4a2.1 2.1 0 1 1 0-4.3 2.1 2.1 0 0 1 0 4.3ZM6.9 20.5H3.3V9H7v11.5ZM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Z" />
              </svg>
            </a>
          ) : null}

          <a className="hover:text-textMain transition-colors" href="https://pinnate-rabbit-15a.notion.site/2856f8ab69b18051927ac267d14c9301?source=copy_link">
            CV
          </a>
          <a className="hover:text-textMain transition-colors" href={`mailto:${siteConfig.email}`}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
