import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const siteConfigPath = path.join(repoRoot, 'app', 'lib', 'site.ts');
const layoutPath = path.join(repoRoot, 'app', 'layout.tsx');
const headerPath = path.join(repoRoot, 'app', 'components', 'site-header.tsx');
const opengraphImagePath = path.join(repoRoot, 'app', 'opengraph-image.tsx');

test('site title uses joonhyeop.site domain', () => {
  const source = readFileSync(siteConfigPath, 'utf8');
  assert.match(source, /title:\s*'joonhyeop\.site'/);
});

test('layout metadata includes Open Graph and Twitter image settings', () => {
  const source = readFileSync(layoutPath, 'utf8');

  assert.match(source, /metadataBase:\s*new URL\(siteConfig\.siteUrl\)/);
  assert.match(source, /openGraph:\s*\{/);
  assert.match(source, /twitter:\s*\{/);
  assert.match(source, /url:\s*'\/opengraph-image'/);
  assert.match(source, /images:\s*\['\/opengraph-image'\]/);
});

test('header brand suffix is .site', () => {
  const source = readFileSync(headerPath, 'utf8');
  assert.match(source, /<span className="text-accent">\.site<\/span>/);
});

test('opengraph image route exists', () => {
  assert.equal(existsSync(opengraphImagePath), true, 'expected app/opengraph-image.tsx to exist');
});
