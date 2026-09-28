# Orbit Revival Expansion (phases 3–7)

This document is the compact implementation map for the post-C9 story extension. The existing phase-1 through phase-4 investigation and Byte Barn Forever resolution remain authoritative.

## Phase flow

1. Phase 3 adds two public, three-page music rings: **BarnRaisers** (Ben, Rico, Simon) and **Byte Barn Bites!** (Sid, Tess, LagMaster). They feud affectionately about nostalgia, commercial art, credit, remix ownership, and selling out.
2. Phase 4 remains the stable C9/Byte Barn ending. Leaving Byte Barn Forever quietly adds one harmless Big Randy page to Newbie Nebula. Following Randy's reunion-ring action arms a two-day transition.
3. Phase 5 begins with several Big Randy pages but no page corruption. Raven's message points to WideWorld's unsolicited Reunion Directory; the terminal remains clean and optional.
4. The player archives three evidence records: the 1996 SilverDial ByteForge thread, the live Accelerator signature, and WideWorld's SilverDial acquisition/reactivation archive. Leaving the investigation arms phase 6.
5. Phase 6 is the aggressive but reversible rendering attack: false navigation, Randy panels, nuisance windows, and desktop noise. Every nuisance window is dismissible; ByteForge remains clean.
6. Paula Reyes and Neil Harrow provide clean-object guidance through ByteForge. The Patch Bay combines `BRIDGE22.CHK`, `OBJECTMAP.DAT`, and `C9CLEAN.IDX` into `ORBITFIX.PAK`.
7. Publishing the evidence report and distributing the patch arms phase 7. The overnight cleanup removes only the rendering layer and establishes a small transparent Orbit maintenance program. The feud resumes.

## Persistence and safety

- Save version: 17.
- `StoryPhase`: `1 | 2 | 3 | 4 | 5 | 6 | 7`.
- `bbs` stores connection/menu state, read threads, free-text replies, read private mail IDs, and downloaded BBS files.
- `infection` stores level, Randy discoveries, evidence, patch components, report/build/distribution flags, and cleanup status.
- Existing phase-4 saves migrate to stable pre-WideWorld phase 4 with empty BBS and infection records.
- The attack never rewrites page definitions, comments, messages, downloads, music, or other player data. It is a deterministic browser/desktop rendering layer.

## Core files

- `src/orbit-revival.ts`: feud rings, WideWorld pages, Randy pages, neutral story URLs.
- `src/byteforge-bbs.ts`: authored boards, threads, evidence, Patch Bay, terminal renderer.
- `src/types.ts`: phase, BBS, infection, and app persistence types.
- `src/main.ts`: migration, transitions, terminal window, actions, reversible injection layer.
- `src/pages.ts`: zone directory and Orbit homepage discovery surfaces.
