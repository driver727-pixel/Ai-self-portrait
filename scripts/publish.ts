/**
 * publish.ts — Write markdown posts, update content/index.json, move assets.
 * Rights-safe: only stores metadata + original summaries, never full copyrighted text.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import type { SummarizedEntry } from './summarize.ts';
import type { MemeResult } from './meme.ts';

export interface PostRecord {
  slug: string;
  urlHash: string;
  publishedAt: string;
  title: string;
  sourceUrl: string;
}

export interface ContentIndex {
  posts: PostRecord[];
  lastUpdated: string;
}

const CONTENT_POSTS_DIR = join(process.cwd(), 'site', 'src', 'content', 'posts');
const INDEX_PATH = join(process.cwd(), 'content', 'index.json');

export function loadIndex(): ContentIndex {
  if (!existsSync(INDEX_PATH)) return { posts: [], lastUpdated: '' };
  try {
    return JSON.parse(readFileSync(INDEX_PATH, 'utf-8')) as ContentIndex;
  } catch {
    return { posts: [], lastUpdated: '' };
  }
}

function saveIndex(index: ContentIndex): void {
  const dir = join(process.cwd(), 'content');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n', 'utf-8');
}

export function urlHash(url: string): string {
  return createHash('sha256').update(url).digest('hex').slice(0, 16);
}

export function isAlreadyPublished(url: string, index: ContentIndex): boolean {
  const hash = urlHash(url);
  return index.posts.some(p => p.urlHash === hash);
}

function escapeFrontmatterString(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
}

export function buildMarkdown(
  entry: SummarizedEntry,
  meme: MemeResult,
): string {
  const date = entry.published
    ? new Date(entry.published).toISOString()
    : new Date().toISOString();
  const tagsYaml = entry.tags.map(t => `  - "${t}"`).join('\n');
  const summary = escapeFrontmatterString(entry.summary);
  const memeCaption = escapeFrontmatterString(entry.memeCaption);
  const title = escapeFrontmatterString(entry.title);
  const sourceUrl = entry.url;
  const memeImage = meme.isPlaceholder ? '/assets/memes/placeholder.png' : meme.imagePath;

  return `---
title: "${title}"
date: "${date}"
sourceUrl: "${sourceUrl}"
tags:
${tagsYaml}
summary: "${summary}"
memeImage: "${memeImage}"
memeCaption: "${memeCaption}"
---

${entry.summary}

*This is original commentary and paraphrase only. No copyrighted lyrics, movie dialogue, or substantial plot text is reproduced. All analysis is the author's own.*

**Source:** [${new URL(sourceUrl).hostname}](${sourceUrl})
`;
}

export function publishPost(
  entry: SummarizedEntry,
  meme: MemeResult,
): string {
  if (!existsSync(CONTENT_POSTS_DIR)) mkdirSync(CONTENT_POSTS_DIR, { recursive: true });

  const markdown = buildMarkdown(entry, meme);
  const filename = `${entry.slug}.md`;
  const destPath = join(CONTENT_POSTS_DIR, filename);

  writeFileSync(destPath, markdown, 'utf-8');

  const index = loadIndex();
  index.posts.push({
    slug: entry.slug,
    urlHash: urlHash(entry.url),
    publishedAt: new Date().toISOString(),
    title: entry.title,
    sourceUrl: entry.url,
  });
  index.lastUpdated = new Date().toISOString();
  saveIndex(index);

  return destPath;
}

// Allow standalone testing
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const mockEntry: SummarizedEntry = {
    title: 'Test: AI Risk in Popular Culture',
    url: 'https://example.com/test-ai-risk',
    published: new Date().toISOString(),
    rawText: 'A test entry about AI risks discussed in popular culture.',
    source: 'example.com',
    score: 5,
    matchedKeywords: ['ai risk', 'automation', 'sci-fi'],
    summary: 'This is a test summary about AI risks discussed in popular culture.',
    memeCaption: 'When the future arrives early and nobody read the manual.',
    slug: `${new Date().toISOString().split('T')[0]}-test-ai-risk-culture`,
    tags: ['ai-risk', 'sci-fi'],
  };
  const mockMeme: MemeResult = { imagePath: '/assets/memes/placeholder.png', isPlaceholder: true };
  const path = publishPost(mockEntry, mockMeme);
  console.log('Published to:', path);
}
