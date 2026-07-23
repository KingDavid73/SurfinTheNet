# OrbitOS startup jingle

`orbitos-startup.mid` and `orbitos-startup.wav` are an original, dependency-free
startup sound created for this project. The composition is a brief C-major
I–IV–V–I gesture at 112 BPM, voiced as General MIDI Electric Piano 1 and Pad 2
(warm). It was not adapted from an existing melody.

The MIDI file is retained as a tiny, editable source asset. The WAV is the
canonical in-game asset because it has deterministic timbre and is directly
playable by Chromium/Electron without a MIDI device, operating-system
synthesizer, SoundFont, or browser MIDI permission.

Regenerate both files from the repository root:

```powershell
node scripts/generate-startup-jingle.mjs
```

Generation is deterministic and uses only Node.js built-ins. The WAV renderer
uses simple additive synthesis, shaped envelopes, stereo placement, and two
short echoes.

## Web page loops

The `pages` directory contains seven original General MIDI loops, one for each
current site style, plus deterministic mono WAV renders. Pages on the same
domain share a theme so sub-pages sound like parts of one site. Orbit
Explorer's “PAGE MIDI” bar controls the WAV render because Chromium cannot
natively synthesize MIDI; the `.mid` files remain the editable source assets.

Regenerate all page tracks with:

```powershell
npm.cmd run music:generate
```
