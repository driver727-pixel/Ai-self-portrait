/**
 * meme.ts — Generate meme images via configurable image API with robust fallback.
 * Fallback: creates a local placeholder PNG using canvas-free approach.
 */

import { createWriteStream, mkdirSync, existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface MemeResult {
  imagePath: string; // relative to site/public
  isPlaceholder: boolean;
}

const IMAGE_API_URL = process.env.IMAGE_API_URL ?? '';
const IMAGE_API_KEY = process.env.IMAGE_API_KEY ?? '';
const MEMES_DIR = join(process.cwd(), 'site', 'public', 'assets', 'memes');
const MEMES_REL = '/assets/memes'; // URL path served by Astro

function ensureMemesDir(): void {
  if (!existsSync(MEMES_DIR)) mkdirSync(MEMES_DIR, { recursive: true });
}

// Minimal valid 1×1 pixel placeholder PNG (base64 encoded)
// This is a hardcoded small PNG so we never need an external lib at runtime
const PLACEHOLDER_PNG_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

async function writePlaceholder(filename: string): Promise<string> {
  ensureMemesDir();
  const dest = join(MEMES_DIR, filename);
  if (!existsSync(dest)) {
    const buf = Buffer.from(PLACEHOLDER_PNG_B64, 'base64');
    await writeFile(dest, buf);
  }
  return `${MEMES_REL}/${filename}`;
}

/**
 * Generate meme via DALL·E / compatible image API.
 * Falls back to placeholder if API not configured or request fails.
 */
export async function generateMeme(
  caption: string,
  slug: string,
): Promise<MemeResult> {
  ensureMemesDir();
  const filename = `${slug}.png`;
  const destPath = join(MEMES_DIR, filename);
  const relPath = `${MEMES_REL}/${filename}`;

  // Already generated — reuse
  if (existsSync(destPath)) {
    return { imagePath: relPath, isPlaceholder: false };
  }

  // No API configured — use placeholder
  if (!IMAGE_API_URL || !IMAGE_API_KEY) {
    const placeholder = await writePlaceholder('placeholder.png');
    return { imagePath: placeholder, isPlaceholder: true };
  }

  try {
    const prompt = `Humorous editorial meme about AI risk: "${caption.slice(0, 100)}". ` +
      'Style: bold graphic design, dark humor, no text overlay, safe for work.';

    const res = await fetch(IMAGE_API_URL, {
      method: 'POST',
      signal: AbortSignal.timeout(30_000),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + IMAGE_API_KEY,
      },
      body: JSON.stringify({
        model: process.env.IMAGE_MODEL ?? 'dall-e-2',
        prompt,
        n: 1,
        size: '512x512',
        response_format: 'url',
      }),
    });

    if (!res.ok) {
      console.warn(`Image API error ${res.status} — using placeholder`);
      return { imagePath: await writePlaceholder('placeholder.png'), isPlaceholder: true };
    }

    const data = await res.json() as { data?: Array<{ url?: string }> };
    const imageUrl = data?.data?.[0]?.url;
    if (!imageUrl) throw new Error('No image URL in response');

    // Download and save image
    const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(20_000) });
    if (!imgRes.ok || !imgRes.body) throw new Error(`Image download failed: ${imgRes.status}`);

    const writer = createWriteStream(destPath);
    const reader = imgRes.body.getReader();
    await new Promise<void>((resolve, reject) => {
      writer.on('error', reject);
      writer.on('finish', resolve);
      (async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) { writer.end(); break; }
            writer.write(value);
          }
        } catch (e) { reject(e); }
      })();
    });

    return { imagePath: relPath, isPlaceholder: false };
  } catch (err) {
    console.warn('Meme generation failed, using placeholder:', (err as Error).message);
    return { imagePath: await writePlaceholder('placeholder.png'), isPlaceholder: true };
  }
}

// Allow standalone testing
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = await generateMeme('When the robot decides your job was optional', 'test-meme');
  console.log('Meme result:', result);
}
