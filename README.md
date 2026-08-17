# AI Self-Portrait + AI Risk: Cultural Signals Blog

This repository contains two related projects:

1. **AI Self-Portrait** — A visual-first gallery for exploring AI models as expressive 3D forms (see `data/ai-model-catalog.md`).
2. **AI Risk: Cultural Signals Blog** — A compact, low-cost static blog that automatically discovers and publishes cultural commentary on the dangers and harms of artificial intelligence.

---

## AI Risk: Cultural Signals Blog

A compact, low-cost static blog that **automatically discovers and publishes cultural commentary** on the dangers and harms of artificial intelligence — drawing from news, science, and public discourse, and pairing each post with an AI-generated meme.

> **Rights Policy:** This site publishes *original commentary and paraphrase only*. No copyrighted lyrics, movie dialogue, or substantial plot excerpts are reproduced. All content is the author's own analysis. See [Rights-Safe Policy](#rights-safe-policy) below.

### Architecture

```
.
├── site/                     # Astro static site
│   ├── src/
│   │   ├── content/posts/    # Generated markdown posts (committed)
│   │   ├── pages/
│   │   │   ├── index.astro   # Homepage feed
│   │   │   └── posts/[slug].astro  # Individual post pages
│   │   └── content/config.ts # Astro content collection schema
│   └── public/assets/memes/  # Generated meme images (committed)
├── scripts/                  # Pipeline scripts (Node.js + TypeScript)
│   ├── fetch.ts              # RSS/feed ingestion
│   ├── filter.ts             # AI-risk relevance scoring
│   ├── summarize.ts          # Summary + meme caption generation
│   ├── meme.ts               # Meme image generation with fallback
│   ├── publish.ts            # Write markdown + update index
│   └── pipeline.ts           # Main orchestrator
├── content/
│   └── index.json            # Dedup cache (URL hashes of seen items)
├── .github/workflows/
│   └── auto-publish.yml      # Scheduled GitHub Actions workflow
└── .env.example              # Environment variable template
```

### Pipeline Flow

```
Feeds (RSS) → fetch.ts → filter.ts → summarize.ts → meme.ts → publish.ts
                                                                    ↓
                                                    site/src/content/posts/*.md
                                                    site/public/assets/memes/*.png
                                                    content/index.json (dedup)
```

### Setup

#### Prerequisites

- Node.js ≥ 22
- npm

#### Install

```bash
# Install pipeline dependencies
npm install

# Install site dependencies
cd site && npm install
```

#### Configure (optional)

```bash
cp .env.example .env
# Edit .env with your API keys (all optional — works without any keys)
```

#### Run pipeline locally

```bash
# Full pipeline (fetch → filter → summarize → meme → publish)
npm run pipeline

# Or run individual steps
npm run fetch       # Test feed fetching
npm run publish     # Test publishing a mock post
```

#### Build and preview site

```bash
cd site
npm run build       # Build static site to ../dist/
npm run preview     # Preview locally
npm run dev         # Dev server with hot reload
```

#### Quick local preview (no public URL needed)

If you do not have a deployed URL yet, run this from the repository root:

```bash
npm run preview:blogs
```

This will generate a post and start the site locally at:

```text
http://localhost:4321
```

For real auto-generated content, run `npm run pipeline` first, then `npm run site:dev`.

### GitHub Actions

The workflow at `.github/workflows/auto-publish.yml` runs automatically every **6 hours** (4× daily).

It also supports manual dispatch from the GitHub Actions tab, with an optional `max_posts` override.

#### Required Secrets (all optional)

| Secret | Purpose | Default behavior without it |
|---|---|---|
| `OPENAI_API_KEY` | Richer summaries via `gpt-4o-mini` | Template-based summaries |
| `IMAGE_API_KEY` | Meme image generation (DALL·E) | Placeholder PNG used |
| `IMAGE_API_URL` | Image API endpoint | Placeholder PNG used |

#### Repository Variables (optional)

| Variable | Purpose | Default |
|---|---|---|
| `MAX_POSTS_PER_RUN` | Posts to publish per run | `3` |
| `IMAGE_MODEL` | Image model to use | `dall-e-2` |

### Cost Tuning

| Lever | How to adjust |
|---|---|
| **Post frequency** | Change `cron` in `auto-publish.yml` |
| **Posts per run** | Set `MAX_POSTS_PER_RUN` env var or repo variable |
| **Summarization cost** | Remove `OPENAI_API_KEY` → uses zero-cost templates |
| **Image cost** | Remove `IMAGE_API_KEY` → uses placeholder image |
| **Cheaper images** | Set `IMAGE_MODEL=dall-e-2` (default, ~$0.02/image) |
| **No image cost** | Leave `IMAGE_API_KEY` unset |

Running without any API keys costs **$0** per run (uses GitHub Actions free tier minutes).

### Rights-Safe Policy

This project enforces the following rules in code and content:

1. **No verbatim copyrighted lyrics, movie dialogue, or substantial plot excerpts** are stored or published.
2. Each post stores only:
   - Title and source URL
   - Short **original summary/commentary** (author's own words)
   - Thematic tags
   - Meme caption and generated image
3. AI summarization prompts explicitly instruct: *"do NOT reproduce copyrighted lyrics/dialogue"*.
4. If a source snippet appears quote-heavy, the pipeline paraphrases themes only.
5. All posts include a disclaimer: *"Content is original commentary/paraphrase only."*

### Post Schema

Each generated markdown post frontmatter:

```yaml
title: "string"
date: "ISO 8601 timestamp"
sourceUrl: "https://..."
tags: ["ai-risk", "automation", ...]
summary: "Original commentary (author's words)"
memeImage: "/assets/memes/slug.png"
memeCaption: "Short punchy caption"
```

---

## Original: AI Self-Portrait

A visual-first gallery for exploring AI models as expressive 3D forms.

### What it does

Most AI education tools focus on technical diagrams, settings, and research details. This project is different: it is designed for people who want to see how AI models feel visually, compare them at a glance, and share those visuals online.

Each model becomes its own 3D "self-portrait" with a distinct personality:

- **Color = identity** — model families and creators can have recognizable visual signatures.
- **Size = presence** — larger or more capable models can feel more massive, dense, or dramatic.
- **Shape = character** — different architectures and behaviors can produce different silhouettes and structures.
- **Motion = mood** — animation can help each model feel alive instead of static.
- **Shareability = purpose** — visuals should be easy to capture, compare, and post online.

### Roadmap

- [ ] Core 3D rendering engine for model portraits
- [ ] Visual personality system using color, size, shape, density, and motion
- [ ] Model gallery covering many current AI systems
- [ ] Side-by-side comparison mode for similar models and model families
- [ ] Shareable views for screenshots, links, and social posts
- [ ] Data pipeline for keeping model information current
- [x] Seed AI model catalog with live family descriptions, training-data notes, and official docs
- [ ] Public web deployment

The initial model database lives at `data/ai-model-catalog.md`.

---

*Opinions expressed are original commentary only and do not reflect the views of any referenced artists, filmmakers, authors, or organizations. This is cultural criticism and commentary.*
