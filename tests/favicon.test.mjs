import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const iconPath = path.join(repoRoot, 'app', 'icon.svg');

test('favicon icon exists and is an svg', () => {
  assert.equal(existsSync(iconPath), true, 'expected app/icon.svg to exist');

  const svg = readFileSync(iconPath, 'utf8');
  assert.match(svg, /<svg[\s>]/);
  assert.match(svg, /viewBox=/);
});
