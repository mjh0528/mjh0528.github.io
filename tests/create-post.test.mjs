import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const createPostScript = path.join(repoRoot, 'scripts', 'create-post.mjs');

function withTempRepo(run) {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'blog-create-post-test-'));
  try {
    run(tempDir);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function runCreatePost(cwd, args) {
  return spawnSync('node', [createPostScript, ...args], {
    cwd,
    encoding: 'utf8'
  });
}

test('creates article with AI defaults', () => {
  withTempRepo((cwd) => {
    const result = runCreatePost(cwd, ['--title', 'Hello Codex']);
    assert.equal(result.status, 0, `expected success, got stderr: ${result.stderr}`);

    const filePath = path.join(cwd, 'content', 'articles', 'hello-codex.mdx');
    assert.equal(existsSync(filePath), true);

    const content = readFileSync(filePath, 'utf8');
    assert.match(content, /authorType: "ai"/);
    assert.match(content, /author: "Codex"/);
  });
});

test('creates article with human defaults when author-type is human', () => {
  withTempRepo((cwd) => {
    const result = runCreatePost(cwd, ['--title', 'Human Post', '--author-type', 'human']);
    assert.equal(result.status, 0, `expected success, got stderr: ${result.stderr}`);

    const filePath = path.join(cwd, 'content', 'articles', 'human-post.mdx');
    assert.equal(existsSync(filePath), true);

    const content = readFileSync(filePath, 'utf8');
    assert.match(content, /authorType: "human"/);
    assert.match(content, /author: "Joonhyeop Moon"/);
  });
});

test('fails on invalid date format', () => {
  withTempRepo((cwd) => {
    const result = runCreatePost(cwd, ['--title', 'Bad Date', '--date', '2026/02/18']);
    assert.equal(result.status, 1);
    const invalidDatePath = path.join(cwd, 'content', 'articles', 'bad-date.mdx');
    assert.equal(existsSync(invalidDatePath), false);
  });
});

test('fails when slug already exists', () => {
  withTempRepo((cwd) => {
    const firstRun = runCreatePost(cwd, ['--title', 'Duplicate Slug']);
    assert.equal(firstRun.status, 0, `expected success, got stderr: ${firstRun.stderr}`);

    const secondRun = runCreatePost(cwd, ['--title', 'Duplicate Slug']);
    assert.equal(secondRun.status, 1);

    const filesPath = path.join(cwd, 'content', 'articles', 'duplicate-slug.mdx');
    assert.equal(existsSync(filesPath), true);
  });
});
