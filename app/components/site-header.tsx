import Link from 'next/link';
import { siteConfig } from '@/app/lib/site';
import { ThemeToggle } from '@/app/components/theme-toggle';

export function SiteHeader() {
  return (
    <header className="w-full border-b border-borderSubtle">
      <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link
          className="font-[var(--font-jetbrains-mono)] font-bold text-lg tracking-tight hover:text-accent transition-colors"
          href="/"
        >
          {siteConfig.name}
          <span className="text-accent">.site</span>
        </Link>

        <div className="flex items-center justify-between md:justify-end gap-4">
          <nav className="flex items-center gap-5 text-sm font-medium overflow-x-auto whitespace-nowrap">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.label}
                className="text-textMuted hover:text-textMain transition-colors"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
