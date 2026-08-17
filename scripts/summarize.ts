/**
 * summarize.ts — Generate original commentary summaries and meme captions.
 * Uses OpenAI API if configured, falls back to deterministic template-based
 * summaries for zero cost.
 */

import type { ScoredEntry } from './filter.ts';

export interface SummarizedEntry extends ScoredEntry {
  summary: string;
  memeCaption: string;
  slug: string;
  tags: string[];
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';
const USE_AI = Boolean(OPENAI_API_KEY);

// Deterministic tag extraction from matched keywords
function extractTags(entry: ScoredEntry): string[] {
  const tagMap: Record<string, string> = {
    'surveillance': 'surveillance', 'facial recognition': 'facial-recognition',
    'deepfake': 'deepfakes', 'bias': 'ai-bias', 'discrimination': 'ai-bias',
    'autonomous weapons': 'autonomous-weapons', 'killer robot': 'autonomous-weapons',
    'existential risk': 'existential-risk', 'alignment': 'alignment', 'agi': 'agi',
    'disinformation': 'disinformation', 'misinformation': 'disinformation',
    'job displacement': 'labor-displacement', 'automation': 'automation',
    'neural network': 'machine-learning', 'machine learning': 'machine-learning',
    'deep learning': 'machine-learning', 'hallucination': 'ai-hallucination',
    'terminator': 'sci-fi', 'matrix': 'sci-fi', 'blade runner': 'sci-fi',
    'black mirror': 'sci-fi', 'westworld': 'sci-fi', 'dystopia': 'dystopia',
    'metallica': 'music', 'ethics': 'ai-ethics', 'moral': 'ai-ethics',
  };
  const tags = new Set<string>(['ai-risk']);
  for (const kw of entry.matchedKeywords) {
    const tag = tagMap[kw];
    if (tag) tags.add(tag);
  }
  return [...tags].slice(0, 6);
}

function toSlug(title: string, date: string): string {
  const dateStr = date
    ? new Date(date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];
  const slugTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50)
    .replace(/-+$/, '');
  return `${dateStr}-${slugTitle}`;
}

// Template-based summary — zero cost, always available as fallback
function templateSummary(entry: ScoredEntry): { summary: string; memeCaption: string } {
  const themes = entry.matchedKeywords.slice(0, 3).join(', ') || 'AI risk';
  const snippet = entry.rawText.slice(0, 200).trim();
  const summary =
    `This piece from ${entry.source} touches on themes of ${themes} — ` +
    `a recurring cultural conversation about how artificial intelligence intersects with human autonomy, ` +
    `safety, and the fabric of society. ` +
    (snippet.length > 50
      ? `The work explores: "${snippet}..." (original commentary; no copyrighted text reproduced).`
      : `The work raises important questions about our relationship with intelligent systems.`);

  const memeCaption = `When ${themes} meets reality: ${entry.title.slice(0, 60)}`;
  return { summary, memeCaption };
}

async function aiSummary(entry: ScoredEntry): Promise<{ summary: string; memeCaption: string }> {
  const prompt = [
    'You are writing original commentary for a cultural AI-risk blog.',
    'Given this article snippet (do NOT reproduce copyrighted lyrics/dialogue):',
    `Title: ${entry.title}`,
    `Source: ${entry.source}`,
    `Snippet (for context only): ${entry.rawText.slice(0, 300)}`,
    `Keywords: ${entry.matchedKeywords.join(', ')}`,
    '',
    'Write:',
    '1. A 2-3 sentence ORIGINAL commentary/paraphrase on AI risk themes (no verbatim copyrighted text).',
    '2. A short, punchy meme caption (max 15 words).',
    '',
    'Respond with JSON: {"summary": "...", "memeCaption": "..."}',
  ].join('\n');

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: AbortSignal.timeout(20_000),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        response_format: { type: 'json_object' },
      }),
    });
    if (!res.ok) return templateSummary(entry);
    const data = await res.json() as { choices: Array<{ message: { content: string } }> };
    const parsed = JSON.parse(data.choices[0].message.content) as {
      summary?: unknown;
      memeCaption?: unknown;
    };
    return {
      summary: String(parsed.summary ?? '').slice(0, 600) || templateSummary(entry).summary,
      memeCaption: String(parsed.memeCaption ?? '').slice(0, 120) || templateSummary(entry).memeCaption,
    };
  } catch {
    return templateSummary(entry);
  }
}

export async function summarize(entry: ScoredEntry): Promise<SummarizedEntry> {
  const { summary, memeCaption } = USE_AI ? await aiSummary(entry) : templateSummary(entry);
  return {
    ...entry,
    summary,
    memeCaption,
    slug: toSlug(entry.title, entry.published),
    tags: extractTags(entry),
  };
}

// Allow standalone testing
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const { fetchAll } = await import('./fetch.ts');
  const { filterRelevant } = await import('./filter.ts');
  const raw = await fetchAll();
  const relevant = filterRelevant(raw);
  if (relevant.length > 0) {
    const result = await summarize(relevant[0]);
    console.log('Summary:', result.summary);
    console.log('Caption:', result.memeCaption);
    console.log('Tags:', result.tags);
  } else {
    console.log('No relevant entries found');
  }
}
