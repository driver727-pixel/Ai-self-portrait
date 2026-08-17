/**
 * filter.ts — Classify relevance to AI harms/dangers using keyword scoring.
 * Deterministic and cheap: no API calls.
 */

import type { RawEntry } from './fetch.ts';

export interface ScoredEntry extends RawEntry {
  score: number;
  matchedKeywords: string[];
}

// Primary keywords — strong AI-risk signal
const PRIMARY_KEYWORDS = [
  'artificial intelligence', ' ai ', 'machine learning', 'deep learning', 'neural network',
  'algorithm', 'automation', 'robot', 'autonomous',
  'surveillance', 'facial recognition', 'deepfake', 'bias', 'discrimination',
  'existential risk', 'alignment', 'agi', 'superintelligence',
  'job displacement', 'disinformation', 'misinformation', 'hallucination',
  'weaponized ai', 'autonomous weapons', 'killer robot',
];

// Cultural/thematic keywords — adds signal when combined with AI keywords
const CULTURAL_KEYWORDS = [
  'dystopia', 'terminator', 'matrix', 'blade runner', '2001', 'hal 9000',
  'science fiction', 'sci-fi', 'warning', 'danger', 'harm', 'risk', 'threat',
  'control', 'dehumaniz', 'replace', 'fear', 'ethics', 'moral',
  'surveillance state', 'big brother', 'orwellian',
  'metallica', 'black mirror', 'westworld', 'ex machina',
];

const MIN_SCORE = 2;

export function scoreEntry(entry: RawEntry): ScoredEntry {
  const text = `${entry.title} ${entry.rawText}`.toLowerCase();
  const matched: string[] = [];
  let score = 0;

  for (const kw of PRIMARY_KEYWORDS) {
    if (text.includes(kw)) {
      score += 2;
      matched.push(kw.trim());
    }
  }
  for (const kw of CULTURAL_KEYWORDS) {
    if (text.includes(kw)) {
      score += 1;
      matched.push(kw.trim());
    }
  }

  return { ...entry, score, matchedKeywords: [...new Set(matched)] };
}

export function filterRelevant(entries: RawEntry[]): ScoredEntry[] {
  return entries
    .map(scoreEntry)
    .filter(e => e.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);
}

// Allow standalone testing
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const { fetchAll } = await import('./fetch.ts');
  const raw = await fetchAll();
  const relevant = filterRelevant(raw);
  console.log(`Relevant: ${relevant.length}/${raw.length}`);
  relevant.slice(0, 5).forEach(e => console.log(` [${e.score}] ${e.title}`));
}
