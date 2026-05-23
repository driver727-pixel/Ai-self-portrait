# 3D AI Architecture Visualizer

An interactive 3D visualization tool that maps the structural anatomy of AI models as living, explorable trees — where every node represents a real parameter, and scale reflects reality.

## What it does

Most people have no mental model of what an AI actually looks like under the hood. This project makes that concrete. Each AI architecture is rendered as a 3D node tree where:

- **Size = scale** — models with more parameters grow larger and more structurally complex.
- **Shape = structure** — architectural differences (transformers, CNNs, MoEs, etc.) produce distinct morphologies.
- **Identity = style** — models from different organizations carry unique color themes and visual signatures.
- **Data = live** — the repository continuously syncs with current model specs, staying up to date as the AI landscape evolves.

## Why it exists

AI is increasingly central to daily life, yet its internal structure remains opaque to most people. This tool is built for the general public — no ML background required. The goal is to replace vague intuitions about "neural networks" with something you can actually see, rotate, and explore.

## Roadmap

- [ ] Core 3D rendering engine with node-graph layout
- [ ] Model parameter ingestion pipeline
- [x] Seed AI model catalog with live family descriptions, training-data notes, and official docs
- [ ] Organization-specific visual theming system
- [ ] Live sync with model registries (Hugging Face, etc.)
- [ ] Public web deployment

## Current data seed

The initial model database lives at `data/ai-model-catalog.md`.
It groups live commercial model families by company, keeps open-source/open-weight families in a separate section, and captures:

- community or user-authored descriptions
- public training-data notes
- official documentation links

This seed catalog is meant to be the first input layer for the future visualizer.

Bridging the gap between AI complexity and human understanding — one node at a time.
