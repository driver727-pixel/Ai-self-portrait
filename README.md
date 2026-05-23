# AI Self-Portrait

A visual-first gallery for exploring AI models as expressive 3D forms.

## What it does

Most AI education tools focus on technical diagrams, settings, and research details. This project is different: it is designed for people who want to see how AI models feel visually, compare them at a glance, and share those visuals online.

Each model becomes its own 3D "self-portrait" with a distinct personality:

- **Color = identity** — model families and creators can have recognizable visual signatures.
- **Size = presence** — larger or more capable models can feel more massive, dense, or dramatic.
- **Shape = character** — different architectures and behaviors can produce different silhouettes and structures.
- **Motion = mood** — animation can help each model feel alive instead of static.
- **Shareability = purpose** — visuals should be easy to capture, compare, and post online.

## Why it exists

AI models are becoming cultural objects, but most people only experience them through text boxes and technical charts. The goal of this project is to make modern models visually memorable for the general public — no machine learning background required.

Instead of asking users to study parameters, loss curves, or activation functions, this site should help them ask visual questions:

- What makes ChatGPT 5.4 look different from ChatGPT 5.5?
- How does Codex feel compared with Opus?
- What does a small, fast model look like next to a huge, powerful one?
- Which models feel elegant, chaotic, dense, bright, strange, or alive?

The focus is education through visual experience, not technical overload.

## Roadmap

- [ ] Core 3D rendering engine for model portraits
- [ ] Visual personality system using color, size, shape, density, and motion
- [ ] Model gallery covering many current AI systems
- [ ] Side-by-side comparison mode for similar models and model families
- [ ] Shareable views for screenshots, links, and social posts
- [ ] Data pipeline for keeping model information current
- [x] Seed AI model catalog with live family descriptions, training-data notes, and official docs
- [ ] Public web deployment

## Current data seed

The initial model database lives at `data/ai-model-catalog.md`.
It groups live commercial model families by company, keeps open-source/open-weight families in a separate section, and captures:

- community or user-authored descriptions
- public training-data notes
- official documentation links

This seed catalog is meant to be the first input layer for the future visualizer.

Making AI models visible, memorable, and shareable — one 3D self-portrait at a time.
