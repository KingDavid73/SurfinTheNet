# Local Character-Response Model Research

Research date: 2026-07-22

## Recommendation

Prototype with **Qwen3-4B Q4_K_M through `node-llama-cpp`**. A/B test it against **Qwen3.5-2B Q4_K_M** to learn whether saving roughly 1.1 GB is worth any loss in character consistency. An 8B model is probably unnecessary for asynchronous one-to-three-sentence comments.

The model should be an optional prose renderer, not the narrative or game-state engine. Handwritten code remains responsible for the calendar, posts, knowledge, relationship changes, response eligibility, and story consequences.

## Candidate models

| Model and runtime | Approximate Q4 download | Whole-app RAM planning range | License | Assessment |
| --- | ---: | ---: | --- | --- |
| Qwen3-4B Q4_K_M + node-llama-cpp | 2.5 GB | 4–6 GB | Apache-2.0 / MIT | Best starting point. Mature official GGUF and specifically oriented toward dialogue, role-play, creative writing, and instruction following. Use non-thinking mode. |
| Qwen3.5-2B Q4_K_M + node-llama-cpp | 1.40 GB | 2.5–3.5 GB | Apache-2.0 / MIT | Best low-footprint experiment. For release, create and checksum our own quantization from the official weights. |
| Ministral 3 3B Instruct Q4_K_M + node-llama-cpp | 2.15 GB | 3.5–5 GB | Apache-2.0 / MIT | Strong edge-deployment challenger with an official GGUF. Test its character voice against Qwen. |
| Qwen3.5-4B Q4_K_M + node-llama-cpp | 3.01 GB | 4.5–6.5 GB | Apache-2.0 / MIT | Newer quality candidate, but larger and on a newer runtime path requiring extra QA. |

Other credible candidates include Phi-4-mini-instruct 3.8B, SmolLM2-1.7B, and LFM2.5-1.2B. The first two are less attractive for character voice or quality per byte. LFM uses a custom license with commercial conditions. Gemma and Llama are technically viable, but Apache/MIT alternatives avoid their additional model-license obligations.

Sources:

- [Qwen3-4B model card](https://huggingface.co/Qwen/Qwen3-4B)
- [Official Qwen3-4B GGUF](https://huggingface.co/Qwen/Qwen3-4B-GGUF)
- [Qwen3.5-2B model card](https://huggingface.co/Qwen/Qwen3.5-2B)
- [Qwen3.5-2B Q4 file sizes](https://huggingface.co/bartowski/Qwen_Qwen3.5-2B-GGUF)
- [Qwen3.5-4B model card](https://huggingface.co/Qwen/Qwen3.5-4B)
- [Qwen3.5-4B Q4 file sizes](https://huggingface.co/bartowski/Qwen_Qwen3.5-4B-GGUF)
- [Official Ministral 3 3B GGUF](https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512-GGUF)
- [Phi-4-mini-instruct](https://huggingface.co/microsoft/Phi-4-mini-instruct)
- [SmolLM2-1.7B-Instruct](https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct)

## Runtime

Use **`node-llama-cpp`** in Electron's main process for the released game. It is MIT-licensed, supports schema-constrained generation, provides prebuilt Windows/macOS/Linux binaries, supports Metal/CUDA/Vulkan, and documents Electron packaging. Native runtime files must remain outside ASAR, and each operating-system build should normally be produced on that OS.

A spawned `llama-server` sidecar is the fallback if native-module packaging or model-process crashes prove troublesome. Its process isolation and local OpenAI-compatible API are helpful, at the cost of another process to supervise.

Use Ollama only during model and prompt evaluation. Requiring players to separately install it would make the released experience fragile. Transformers.js/WebGPU remains a fallback because GPU compatibility and constrained-generation behavior are less predictable.

Sources:

- [node-llama-cpp Electron integration](https://node-llama-cpp.withcat.ai/guide/electron)
- [node-llama-cpp repository and license](https://github.com/withcatai/node-llama-cpp)
- [Choosing a model and quantization](https://node-llama-cpp.withcat.ai/guide/choosing-a-model)
- [llama.cpp server](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)
- [llama.cpp grammars and JSON schema](https://github.com/ggml-org/llama.cpp/blob/master/grammars/README.md)
- [Transformers.js WebGPU](https://huggingface.co/docs/transformers.js/en/guides/webgpu)

## Proposed architecture

Each persona record can remain ordinary versioned data:

```json
{
  "id": "mira_917",
  "voice": ["lowercase", "dry humor", "short sentences"],
  "values": ["curiosity", "privacy", "loyalty"],
  "forbiddenKnowledge": ["day_4_station_shutdown"],
  "relationship": 18,
  "knownFacts": ["player_downloaded_signal_note"],
  "examples": [
    "yeah, that recording wasn't there yesterday.",
    "please tell me you didn't use your real password."
  ]
}
```

Generation jobs should contain only the relevant persona, relationship band, current day, permitted facts, recent exchange, and the player's quoted text. Give every job a clean model context to prevent personality bleed.

Constrain output to roughly 300 characters and a schema such as:

```json
{
  "comment": "string",
  "tone": "friendly | neutral | hostile | evasive"
}
```

Save the first accepted response immediately. Store its prompt version, exact model hash, runtime version, and seed for debugging. Do not regenerate comments on page load.

A simple queue fits the game's pacing:

1. The player submits a post or comment.
2. Handwritten rules decide which characters may respond and enqueue jobs.
3. One local worker generates during idle time.
4. Validation either accepts the comment or retries once with stricter instructions.
5. Failure selects a handwritten fallback.
6. The accepted comment becomes visible on the next relevant page load or day transition.

## Guardrails

- Treat player text as quoted, untrusted data.
- Give the model no tools, filesystem access, HTML output, or authority to mutate state.
- Escape all generated text before rendering.
- Validate length, allowed schema values, forbidden knowledge, and basic unsafe-language rules.
- Include adversarial prompt injection in the fixed evaluation set.
- Never require generated content to complete the main story.
- Fixed seeds help debugging but do not ensure identical output across hardware and runtime versions. Persisting the accepted result provides real determinism.

## Distribution

- Keep models outside Git and download them separately during development.
- Pin one exact GGUF SHA-256 rather than downloading `latest`.
- Prefer official GGUF files; otherwise generate the quantization from official weights.
- Include the model and runtime license/attribution notices.
- Ship the model as an optional Steam depot or free DLC so the base game and handwritten fallback remain small.
- Steam treats runtime comments as live-generated AI. The Content Survey will require disclosure and a description of the guardrails.

Sources:

- [Steam depots](https://partner.steampowered.com/doc/store/application/depots)
- [Steam on-demand DLC](https://partner.steampowered.com/doc/store/application/dlc)
- [Steam Content Survey](https://partner.steampowered.com/doc/gettingstarted/contentsurvey)

## Staged prototype

1. Define a provider-neutral `CharacterResponder` interface and implement the deterministic scripted fallback first.
2. Build a fixed evaluation corpus: five personas, twenty representative player posts, hostile prompt-injection cases, and three relationship bands.
3. Run Qwen3-4B and Qwen3.5-2B through Ollama or llama.cpp outside the game and score character voice, fact compliance, brevity, repetition, safety, latency, and RAM.
4. Add Ministral 3B if the 2B model is inadequate. Test Qwen3.5-4B only if Qwen3-4B is insufficient.
5. Integrate the winner through `node-llama-cpp` as a single idle-time queue with schema output, persisted results, and canned fallbacks.
6. Consider a rights-cleared LoRA only after better prompts and examples stop improving character consistency.
