/**
 * pipeline.ts — Main orchestrator: fetch → filter → summarize → meme → publish.
 * Runs the full pipeline with cost controls and dedup.
 */

import { fetchAll } from './fetch.ts';
import { filterRelevant } from './filter.ts';
import { summarize } from './summarize.ts';
import { generateMeme } from './meme.ts';
import { isAlreadyPublished, publishPost, loadIndex } from './publish.ts';

const MAX_POSTS_PER_RUN = parseInt(process.env.MAX_POSTS_PER_RUN ?? '3', 10);

async function run(): Promise<void> {
  console.log(`\n🤖 AI Risk Blog Pipeline — ${new Date().toISOString()}`);
  console.log(`Max posts per run: ${MAX_POSTS_PER_RUN}`);

  // 1. Fetch
  console.log('\n📡 Fetching feeds...');
  const raw = await fetchAll();
  console.log(`  Found ${raw.length} entries`);

  // 2. Filter
  console.log('\n🔍 Filtering for AI risk relevance...');
  const relevant = filterRelevant(raw);
  console.log(`  Relevant: ${relevant.length}`);

  // 3. Dedupe
  const index = loadIndex();
  const newEntries = relevant.filter(e => !isAlreadyPublished(e.url, index));
  console.log(`  New (not yet published): ${newEntries.length}`);

  if (newEntries.length === 0) {
    console.log('\n✅ Nothing new to publish.');
    return;
  }

  // 4. Take top N
  const toProcess = newEntries.slice(0, MAX_POSTS_PER_RUN);
  console.log(`\n✍️  Processing ${toProcess.length} entries...`);

  let published = 0;
  for (const entry of toProcess) {
    try {
      // Summarize
      const summarized = await summarize(entry);
      // Generate meme (with fallback)
      const meme = await generateMeme(summarized.memeCaption, summarized.slug);
      // Publish
      const destPath = publishPost(summarized, meme);
      console.log(`  ✓ Published: ${summarized.slug}`);
      console.log(`    → ${destPath}`);
      console.log(`    → Meme: ${meme.imagePath}${meme.isPlaceholder ? ' (placeholder)' : ''}`);
      published++;
    } catch (err) {
      console.error(`  ✗ Failed to process "${entry.title}":`, (err as Error).message);
    }
  }

  console.log(`\n🎉 Done! Published ${published} post(s).`);
}

run().catch(err => {
  console.error('Pipeline failed:', err);
  process.exit(1);
});
