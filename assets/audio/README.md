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

## Web page music

The `pages` directory contains authored MP3 music in domain folders alongside
the remaining legacy General MIDI loops and their deterministic WAV renders.
Pages on the same domain share a playlist so sub-pages sound like parts of one
site. OrbitAmp plays MP3 or WAV assets directly; a legacy `.mid` file is kept
only as editable source while its corresponding placeholder is still active.

Regenerate the remaining legacy page tracks with:

```powershell
npm.cmd run music:generate
```
