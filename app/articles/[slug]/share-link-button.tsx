'use client';

import { useEffect, useRef, useState } from 'react';

type ShareLinkButtonProps = {
  url: string;
};

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export function ShareLinkButton({ url }: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await copyToClipboard(url);
      setCopied(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex items-center gap-2 text-textMuted">
      <button
        aria-label="Copy article URL"
        className="hover:text-textMain transition-colors"
        onClick={handleCopy}
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">link</span>
      </button>
      <span
        aria-live="polite"
        className={`text-[11px] font-[var(--font-jetbrains-mono)] uppercase tracking-wide transition-opacity ${
          copied ? 'opacity-100 text-accent' : 'opacity-0'
        }`}
      >
        Copied
      </span>
    </div>
  );
}
