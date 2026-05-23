# AI Model Seed Catalog

This file is a seed database for the visualizer project. It groups major **live** AI model families by company, then splits out a separate **open-source / open-weight** section.

## Scope and caveats

- This is a **family-level catalog**. Each entry lists currently live major variants instead of every historical checkpoint.
- For closed models, training-data disclosures are usually limited to broad summaries, safety cards, or public notes; many labs do **not** publish full corpus details.
- For the "community / user-authored description" field, this catalog prefers third-party integration docs, benchmark leaderboards, or public repository descriptions written outside the model vendor's main product docs.
- Where public training-data details are weak, the entry says so explicitly.

---

## Commercial / managed model families

### OpenAI

#### GPT family
- **Live models:** GPT-4o, GPT-4o mini, GPT-4.1, GPT-5, GPT-5 mini, GPT-5 Codex.
- **Community / user-authored description:** GitLab's supported-model matrix treats GPT-4o and the GPT-5 line as production models for coding, chat, and workflow tasks, which makes them useful seed identities for a visualizer built around live model families.
- **Training data:** OpenAI does not publish a full training corpus. Public material such as system cards and docs describe broad data categories and evaluation constraints rather than complete dataset lists.
- **Official docs:** https://platform.openai.com/docs/models ; GPT-4o system card: https://openai.com/index/gpt-4o-system-card/
- **Seed sources:** GitLab supported models matrix: https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/administration/gitlab_duo_self_hosted/supported_models_and_hardware_requirements.md

#### o-series reasoning models
- **Live models:** o1, o3.
- **Community / user-authored description:** Community provider trackers and model-release timelines treat the o-series as OpenAI's reasoning-oriented branch, separate from the GPT generalist line.
- **Training data:** Public disclosures remain summary-level only.
- **Official docs:** https://platform.openai.com/docs/models
- **Seed sources:** DemandSphere model tracker: https://www.demandsphere.com/research/demandsphere-radar/ai-frontier-model-tracker/releases/

#### Sora / DALL-E / Whisper
- **Live models:** Sora, DALL-E 3, Whisper.
- **Community / user-authored description:** These are OpenAI's major media-model families for video, image, and speech, respectively, and should be kept distinct from text families in the visualizer.
- **Training data:** Whisper is unusually specific: OpenAI states it was trained on 680,000 hours of multilingual multitask supervised audio collected from the web. Sora and DALL-E expose little public corpus detail.
- **Official docs:** https://platform.openai.com/docs ; Whisper repo/model card: https://github.com/openai/whisper ; Whisper paper: https://arxiv.org/abs/2212.04356
- **Seed sources:** Whisper README: https://github.com/openai/whisper ; community model trackers: https://aiupdatestoday.com/

### Anthropic

#### Claude family
- **Live models:** Claude 4 Sonnet, Claude 4.5 Sonnet, Claude 4.5 Haiku, Claude 4.5 Opus.
- **Community / user-authored description:** GitLab's enterprise support matrix lists the Claude 4 generation as live, production-usable models for assistant and coding workflows, which is a practical third-party description for this catalog.
- **Training data:** Anthropic does not publicly list the full Claude training corpus. Public information is mainly capability, safety, and product-positioning material.
- **Official docs:** https://docs.anthropic.com/ ; news pages referenced by integrators: https://www.anthropic.com/news/claude-4 ; https://www.anthropic.com/news/claude-sonnet-4-5 ; https://www.anthropic.com/news/claude-haiku-4-5 ; https://www.anthropic.com/news/claude-opus-4-5
- **Seed sources:** GitLab supported models matrix: https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/administration/gitlab_duo_self_hosted/supported_models_and_hardware_requirements.md

### Google DeepMind

#### Gemini family
- **Live models:** Gemini 3.1 Pro, Gemini 3.0 Flash.
- **Community / user-authored description:** GitLab's supported-model matrix lists Gemini 3.x as active general-purpose models, with Flash clearly positioned as the faster variant.
- **Training data:** Google publishes limited training-data detail for closed Gemini models; disclosures are mostly capability docs, benchmark notes, and safety reports rather than full corpus manifests.
- **Official docs:** https://ai.google.dev/gemini-api/docs/models ; DeepMind model pages: https://deepmind.google/models/gemini/pro/ and https://deepmind.google/models/gemini/flash/
- **Seed sources:** GitLab supported models matrix: https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/administration/gitlab_duo_self_hosted/supported_models_and_hardware_requirements.md

### xAI

#### Grok family
- **Live models:** Grok 3, Grok 4.
- **Community / user-authored description:** xAI's public prompt repository describes Grok 3 and Grok 4 as live consumer and API-facing models across grok.com, X, and mobile apps, including image, editing, and voice features.
- **Training data:** Public training-data detail is thin. The prompt materials say Grok knowledge is continuously updated rather than tied to a strict cutoff, but they do not publish a complete source list.
- **Official docs:** https://x.ai/api ; https://x.ai/grok ; cookbook: https://github.com/xai-org/xai-cookbook
- **Seed sources:** xAI prompt repo: https://github.com/xai-org/grok-prompts

### Mistral AI

#### Mistral commercial family
- **Live models:** Mistral Large, Mistral Small 3.1, Pixtral Large, Codestral 22B, Mathstral 7B, Codestral-Mamba 7B.
- **Community / user-authored description:** The official inference library README is maintained like a public ecosystem index and is one of the clearest public lists of Mistral's active families, including language, vision, code, and math branches.
- **Training data:** Public training-data details are sparse for the commercial/API-first families.
- **Official docs:** https://docs.mistral.ai/ ; clients: https://github.com/mistralai/client-python and https://github.com/mistralai/client-ts ; public docs mirror: https://github.com/mistralai/platform-docs-public
- **Seed sources:** Mistral inference README: https://github.com/mistralai/mistral-inference

### Cohere

#### Command family
- **Live models:** Command A, Command R, Command R+.
- **Community / user-authored description:** The Vectara hallucination leaderboard treats the Command family as Cohere's flagship chat and retrieval-friendly generation line, with separate entries for Command A and Command R variants.
- **Training data:** Public docs describe model behavior and endpoints, but detailed corpus composition is not broadly disclosed.
- **Official docs:** https://docs.cohere.com/docs/models ; release notes: https://docs.cohere.com/docs/release-notes
- **Seed sources:** Vectara leaderboard: https://github.com/vectara/hallucination-leaderboard ; AWS benchmark matrix: https://github.com/aws-samples/foundation-model-benchmarking-tool

#### Embed / rerank family
- **Live models:** Embed family, Rerank family.
- **Community / user-authored description:** Integration guides consistently present these as the retrieval layer paired with Command models, so they should remain separate objects in any future visualizer.
- **Training data:** Public corpus detail is limited.
- **Official docs:** https://docs.cohere.com/
- **Seed sources:** Cohere docs and public integration examples.

### AI21 Labs

#### Jamba family
- **Live models:** Jamba-Mini-2, Jamba-Large, Jamba-Mini 1.7.
- **Community / user-authored description:** The Vectara leaderboard and public Bedrock integrations present Jamba as AI21's current flagship family, distinct from the older Jurassic line.
- **Training data:** Public training-data composition is not described in detail in the accessible repo material.
- **Official docs:** https://docs.ai21.com/docs/overview
- **Seed sources:** Vectara leaderboard: https://github.com/vectara/hallucination-leaderboard ; AWS benchmark matrix: https://github.com/aws-samples/foundation-model-benchmarking-tool

#### Jurassic family
- **Live models:** Jurassic-2 Mid, Jurassic-2 Ultra.
- **Community / user-authored description:** Bedrock-facing integrations still list Jurassic-2 models as managed options, so they remain relevant to a live-family catalog.
- **Training data:** Public training-data disclosures are limited.
- **Official docs:** https://docs.ai21.com/docs/overview
- **Seed sources:** AWS benchmark matrix: https://github.com/aws-samples/foundation-model-benchmarking-tool

### Amazon

#### Nova family
- **Live models:** Nova Pro, Nova Lite, Nova Micro, Nova 2 Lite.
- **Community / user-authored description:** The AWS foundation-model benchmarking tool and Vectara leaderboard both treat Nova as Amazon's active flagship managed model family.
- **Training data:** Public docs do not provide a detailed training corpus in the accessible material used for this seed.
- **Official docs:** https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html ; https://aws.amazon.com/bedrock/
- **Seed sources:** AWS benchmark matrix: https://github.com/aws-samples/foundation-model-benchmarking-tool ; Vectara leaderboard: https://github.com/vectara/hallucination-leaderboard

#### Titan family
- **Live models:** Titan Text Lite, Titan Text Express, Titan embedding and image branches.
- **Community / user-authored description:** Public AWS integration examples still position Titan as Amazon's first-party text and embedding family.
- **Training data:** Public corpus details are limited.
- **Official docs:** https://docs.aws.amazon.com/bedrock/latest/userguide/titan-text-models.html
- **Seed sources:** AWS benchmark matrix: https://github.com/aws-samples/foundation-model-benchmarking-tool

### Alibaba Cloud

#### Managed Qwen family
- **Live models:** Managed Qwen / Qwen-Max / Qwen-Plus / Qwen-Turbo style offerings exposed through Alibaba Cloud and DashScope.
- **Community / user-authored description:** Community trackers and the open Qwen repos make it clear that Alibaba's production family spans both managed and open-weight branches, with strong multilingual and Chinese-language positioning.
- **Training data:** Public model cards emphasize large multilingual corpora and strong Chinese/English coverage, but do not publish a full managed-service corpus breakdown.
- **Official docs:** https://dashscope.aliyun.com/ ; https://qwen.alibaba.com/
- **Seed sources:** Qwen repos: https://github.com/QwenLM/Qwen and https://github.com/QwenLM/Qwen3 ; public model trackers: https://www.demandsphere.com/research/demandsphere-radar/ai-frontier-model-tracker/releases/

---

## Open-source / open-weight model families

### Meta

#### Llama family
- **Live models:** Llama 3.2, Llama 3.3, Llama 4 Scout, Llama 4 Maverick.
- **Community / user-authored description:** Meta's public repos and the broader open-model ecosystem treat Llama as the main open-weight foundation family for research, local inference, and product adaptation.
- **Training data:** Meta discloses unusually useful high-level numbers: Llama 4 Scout is trained on about 40T multimodal tokens; Maverick on about 22T. Model cards say the data mix includes publicly available data, licensed data, and information from Meta products and services, including public Instagram/Facebook posts and interactions with Meta AI.
- **Official docs:** https://ai.meta.com/llama/ ; model cards repo: https://github.com/meta-llama/llama-models
- **Seed sources:** Meta model cards: https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md ; https://github.com/meta-llama/llama-models/blob/main/models/llama3_3/MODEL_CARD.md ; https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/MODEL_CARD.md

### Google DeepMind

#### Gemma family
- **Live models:** Gemma 3, Gemma 3n, Gemma 4, CodeGemma, PaliGemma, RecurrentGemma.
- **Community / user-authored description:** The Gemma repo frames the family as lightweight open-weight models derived from Gemini research, designed for accessible local and commercial deployment.
- **Training data:** Public materials say Gemma is based on Gemini research and technology, but they do not publish the full source corpus. Transparency is better than most closed models but still summary-level.
- **Official docs:** https://ai.google.dev/gemma ; https://github.com/google-deepmind/gemma ; technical reports: https://goo.gle/GemmaReport and https://goo.gle/gemma2report
- **Seed sources:** Gemma repo: https://github.com/google-deepmind/gemma

### Microsoft

#### Phi family
- **Live models:** Phi-3, Phi-3.5, Phi-4, Phi-4-multimodal.
- **Community / user-authored description:** Microsoft's PhiCookBook and community evaluation leaderboards describe Phi as a high-performing small-language-model family that competes well above its size class.
- **Training data:** Microsoft emphasizes curated high-quality data and synthetic data generation; detailed raw corpus lists are not public in the accessible cookbook material.
- **Official docs:** https://github.com/microsoft/PhiCookBook ; Azure AI model pages: https://ai.azure.com/ and https://learn.microsoft.com/
- **Seed sources:** PhiCookBook: https://github.com/microsoft/PhiCookBook ; Vectara leaderboard: https://github.com/vectara/hallucination-leaderboard

### Alibaba / Qwen team

#### Qwen family
- **Live models:** Qwen3, Qwen3-Coder, Qwen-VL, Qwen2-Audio, Qwen3-TTS, Qwen3-ASR, Qwen-Image.
- **Community / user-authored description:** The Qwen repos describe a broad multimodal family spanning text, code, vision, audio, speech, and image generation, with especially strong multilingual and Chinese performance.
- **Training data:** The original Qwen repo states the family was pretrained for up to 3T multilingual tokens with focus on Chinese and English. Older Qwen sizes report concrete token counts (for example Qwen-14B and Qwen-72B at 3.0T tokens). The newer public repos are less explicit at document level.
- **Official docs:** https://qwenlm.github.io/ ; https://github.com/QwenLM/Qwen3 ; https://huggingface.co/Qwen ; https://dashscope.aliyun.com/
- **Seed sources:** Qwen repo: https://github.com/QwenLM/Qwen ; Qwen3 repo: https://github.com/QwenLM/Qwen3 ; Qwen-Audio: https://github.com/QwenLM/Qwen-Audio ; Qwen-VL: https://github.com/QwenLM/Qwen-VL

### DeepSeek AI

#### DeepSeek family
- **Live models:** DeepSeek-V3, DeepSeek-R1, DeepSeek-Coder, DeepSeek-VL2.
- **Community / user-authored description:** The DeepSeek repos present a fast-moving open-weight family that covers general chat, reasoning, coding, and multimodal workloads, with strong reputation for efficient performance.
- **Training data:** DeepSeek-Coder is one of the clearer disclosures: 2T tokens with 87% code and 13% natural language in English and Chinese. Public materials for V3 and R1 do not publish the same level of detail.
- **Official docs:** https://github.com/deepseek-ai/DeepSeek-V3 ; https://github.com/deepseek-ai/DeepSeek-R1 ; https://github.com/deepseek-ai/DeepSeek-Coder ; https://huggingface.co/deepseek-ai
- **Seed sources:** DeepSeek repos above.

### Mistral AI

#### Open-weight Mistral / Mixtral family
- **Live models:** Mistral 7B, Mixtral 8x7B, Mixtral 8x22B, Mistral Nemo.
- **Community / user-authored description:** Community tooling and Mistral's own inference repos position these as the main open-weight branches behind the wider Mistral ecosystem.
- **Training data:** Public data disclosures are limited.
- **Official docs:** https://mistral.ai/ ; https://github.com/mistralai/mistral-inference ; https://huggingface.co/mistralai
- **Seed sources:** Mistral inference README: https://github.com/mistralai/mistral-inference

### Allen Institute for AI

#### OLMo family
- **Live models:** OLMo, OLMo-2, OLMoE.
- **Community / user-authored description:** OLMo is widely treated as one of the most transparent open-language-model efforts because AI2 publishes code, checkpoints, data tooling, and provenance artifacts.
- **Training data:** This is one of the strongest public disclosures in the catalog. OLMo-2 uses a large first-stage web-heavy mix and a smaller high-quality annealing mix, and AI2 publishes the Dolma pretraining corpus plus provenance files.
- **Official docs:** https://allenai.org/olmo ; https://github.com/allenai/OLMo ; dataset: https://huggingface.co/datasets/allenai/dolma
- **Seed sources:** OLMo repo: https://github.com/allenai/OLMo ; Dolma repo: https://github.com/allenai/dolma

### Technology Innovation Institute

#### Falcon family
- **Live models:** Falcon-H1, Falcon-Perception, Falcon-OCR.
- **Community / user-authored description:** Falcon has evolved from standard decoder-only LLMs into hybrid attention-plus-SSM models and multimodal branches, which makes it visually distinct enough to merit separate treatment in the visualizer.
- **Training data:** Falcon-H1 materials disclose multilingual coverage across 18 native languages, but not a complete dataset manifest.
- **Official docs:** https://falconllm.tii.ae/ ; https://github.com/tiiuae/Falcon-H1 ; https://huggingface.co/tiiuae
- **Seed sources:** Falcon-H1 repo: https://github.com/tiiuae/Falcon-H1

### Databricks / Mosaic

#### DBRX family
- **Live models:** DBRX Instruct, DBRX Base.
- **Community / user-authored description:** DBRX is commonly cited as a major open MoE family in production-oriented open-model comparisons.
- **Training data:** Public disclosures are summary-level and focus more on MoE architecture and training-scale claims than exhaustive dataset manifests.
- **Official docs:** https://huggingface.co/databricks ; https://www.databricks.com/blog/introducing-dbrx-new-state-art-open-llm
- **Seed sources:** open-model ecosystem summaries and Databricks release material.

### Black Forest Labs

#### FLUX family
- **Live models:** FLUX.1 schnell, FLUX.1 dev, FLUX.1 Fill, FLUX.2 dev, FLUX.2 klein.
- **Community / user-authored description:** Public repos frame FLUX as a state-of-the-art image generation and editing family with strong prompt adherence and multiple conditioning/edit variants.
- **Training data:** Black Forest Labs has not published a full corpus manifest in the accessible repo material.
- **Official docs:** https://bfl.ai/ ; https://docs.bfl.ai/ ; https://github.com/black-forest-labs/flux ; https://github.com/black-forest-labs/flux2
- **Seed sources:** FLUX repos above.

### Stability AI / CompVis

#### Stable Diffusion family
- **Live models:** Stable Diffusion XL, Stable Diffusion 3.
- **Community / user-authored description:** Stable Diffusion remains the canonical open image-model family and an important anchor for any cross-modality visualizer.
- **Training data:** Stable Diffusion v1 disclosures are still some of the clearest image-model disclosures available: LAION-2B-en, LAION high-resolution subsets, and LAION aesthetics subsets are explicitly named in the public README. SDXL and SD3 disclosures are less exhaustively documented in a single public source.
- **Official docs:** https://github.com/CompVis/stable-diffusion ; https://github.com/Stability-AI/stablediffusion ; model card: https://huggingface.co/CompVis/stable-diffusion/blob/main/Stable_Diffusion_v1_Model_Card.md
- **Seed sources:** CompVis stable-diffusion README: https://github.com/CompVis/stable-diffusion

### OpenAI

#### Whisper family
- **Live models:** tiny, base, small, medium, large, turbo.
- **Community / user-authored description:** Whisper is the default open speech-recognition family in many community stacks because it is strong, multilingual, and simple to deploy.
- **Training data:** OpenAI states Whisper was trained on 680,000 hours of multilingual and multitask supervised data collected from the web.
- **Official docs:** https://github.com/openai/whisper ; https://arxiv.org/abs/2212.04356
- **Seed sources:** Whisper README and model card: https://github.com/openai/whisper

### xAI

#### Grok-1
- **Live models:** Grok-1 open release.
- **Community / user-authored description:** Grok-1 is xAI's public open release: a 314B-parameter MoE model with 8 experts and 8,192-token context, useful as the open-weight counterpart to the closed Grok line.
- **Training data:** The open repo does not publish a detailed training corpus.
- **Official docs:** https://github.com/xai-org/grok-1
- **Seed sources:** Grok-1 repo: https://github.com/xai-org/grok-1

---

## Useful next step for the visualizer

The next practical step is to convert this markdown catalog into a normalized machine-readable file with fields such as:

- `category`
- `company`
- `family`
- `live_models`
- `modality`
- `architecture_style`
- `parameter_scale`
- `training_data_summary`
- `community_description`
- `official_docs`
- `sources`
- `confidence`

That normalized pass will make it easier to assign visual shapes, scale, and color themes automatically.
