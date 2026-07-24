import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(projectRoot, "assets", "audio", "pages");
const ticksPerBeat = 480;

const tracks = [
  {
    id: "orbit-avenue",
    title: "Orbit Avenue Afterglow",
    bpm: 68,
    program: 4,
    wave: "soft",
    melodyGain: 0.32,
    melodyVelocity: 54,
    melodyLength: 1.7,
    melody: [72, -1, -1, 74, -1, -1, 71, -1, 69, -1, -1, 67, -1, 71, -1, -1],
    bass: [45, 41, 48, 43, 45, 41, 43, 40],
    bassVelocity: 38,
    padProgram: 89,
    padWave: "warm-pad",
    padChords: [
      [57, 64, 69],
      [53, 60, 64],
      [55, 62, 67],
      [52, 59, 64]
    ],
    accentProgram: 98,
    accentWave: "crystal",
    accents: [
      { beat: 2, note: 81 },
      { beat: 7, note: 79 },
      { beat: 11, note: 84 },
      { beat: 14, note: 76 }
    ]
  },
  { id: "garden-sprites", title: "Garden Sprites", bpm: 126, program: 10, wave: "bell", melody: [76, 79, 83, 79, 74, 77, 81, 77, 76, 81, 84, 81, 79, 77, 74, 72], bass: [48, 55, 53, 55, 48, 53, 55, 48] },
  { id: "after-midnight", title: "After Midnight", bpm: 82, program: 89, wave: "soft", melody: [69, -1, 72, 71, 69, -1, 64, 67, 69, -1, 72, 74, 72, 71, 67, -1], bass: [45, 41, 43, 40, 45, 41, 43, 40] },
  { id: "cached-shadows", title: "Cached Shadows", bpm: 96, program: 19, wave: "organ", melody: [64, 67, 68, 67, 63, 67, 70, 67, 64, 68, 71, 68, 63, 62, 59, 62], bass: [40, 39, 44, 35, 40, 39, 44, 35] },
  { id: "silicon-saturday", title: "Silicon Saturday", bpm: 118, program: 81, wave: "square", melody: [60, 67, 72, 67, 62, 69, 74, 69, 64, 71, 76, 71, 67, 74, 79, 74], bass: [36, 38, 40, 43, 36, 38, 40, 43] },
  { id: "pepperoni-comet", title: "Pepperoni Comet", bpm: 144, program: 21, wave: "bright", melody: [67, 71, 74, 71, 69, 72, 76, 72, 71, 74, 79, 74, 72, 71, 69, 67], bass: [43, 45, 47, 48, 43, 45, 47, 50] },
  { id: "paws-on-the-keys", title: "Paws on the Keys", bpm: 132, program: 13, wave: "bell", melody: [72, 74, 76, 79, 76, 74, 72, 67, 69, 71, 72, 76, 74, 71, 67, 72], bass: [48, 50, 52, 55, 45, 47, 43, 48] },
  { id: "everybodys-in", title: "Everybody's In", bpm: 152, program: 81, wave: "square", melody: [64, 67, 71, 76, 74, 71, 67, 69, 64, 67, 72, 76, 79, 76, 72, 71], bass: [40, 40, 43, 45, 40, 47, 43, 45] },
  { id: "second-world", title: "Second World", bpm: 76, program: 98, wave: "bell", melody: [57, -1, 64, 68, 69, -1, 73, 68, 61, -1, 64, 69, 68, 64, 61, -1], bass: [33, 40, 38, 35, 33, 40, 42, 35] },
  { id: "four-on-the-floor", title: "Four on the Floor", bpm: 138, program: 10, wave: "bright", melody: [72, 76, 79, 84, 83, 79, 76, 74, 71, 74, 79, 83, 81, 79, 76, 72], bass: [48, 55, 52, 57, 48, 55, 50, 43] },
  { id: "toybox-turbo", title: "Toybox Turbo", bpm: 156, program: 12, wave: "bright", melody: [72, 79, 76, 84, 74, 81, 77, 86, 76, 83, 79, 88, 84, 81, 79, 76], bass: [48, 55, 50, 57, 52, 59, 55, 48] },
  { id: "moon-munch-march", title: "Moon Munch March", bpm: 132, program: 13, wave: "bell", melody: [67, 71, 74, 79, 76, 74, 71, -1, 69, 72, 76, 81, 79, 76, 74, 67], bass: [43, 47, 48, 50, 45, 48, 50, 43] },
  { id: "toonburst-theme", title: "ToonBurst Theme", bpm: 174, program: 81, wave: "square", melody: [64, 67, 71, 72, 76, 72, 71, 67, 65, 69, 72, 77, 76, 72, 69, 66], bass: [40, 43, 38, 45, 41, 45, 38, 47] },
  { id: "crown-and-clunker", title: "Crown and Clunker", bpm: 146, program: 56, wave: "bright", melody: [67, 71, 74, 79, 78, 74, 71, 67, 69, 72, 76, 81, 79, 76, 72, 67], bass: [43, 47, 50, 48, 45, 48, 50, 43] },
  { id: "honest-handshake", title: "Honest Handshake", bpm: 128, program: 22, wave: "organ", melody: [64, 69, 72, 76, 72, 69, 67, 64, 62, 67, 71, 74, 71, 67, 66, 62], bass: [40, 45, 43, 48, 38, 43, 45, 38] },
  { id: "curb-static", title: "Curb Static", bpm: 176, program: 29, wave: "square", melody: [52, 52, 55, 57, 52, 59, 57, 55, 52, 55, 59, 60, 59, 57, 55, 52], bass: [28, 31, 33, 31, 28, 35, 33, 31], melodyVelocity: 92, bassVelocity: 70 },
  { id: "dirtline-drive", title: "Dirtline Drive", bpm: 160, program: 30, wave: "bright", melody: [55, 62, 58, 65, 55, 67, 65, 62, 58, 65, 60, 67, 65, 62, 58, 55], bass: [31, 34, 36, 38, 31, 36, 34, 29], melodyVelocity: 88, bassVelocity: 68 },
  { id: "eight-wheel-velocity", title: "Eight-Wheel Velocity", bpm: 150, program: 81, wave: "bright", melody: [72, 76, 79, 83, 74, 78, 81, 86, 76, 79, 83, 88, 86, 83, 79, 76], bass: [36, 43, 41, 45, 36, 48, 43, 41], padProgram: 89, padWave: "warm-pad", padChords: [[60, 64, 67], [62, 66, 69], [57, 60, 64], [59, 62, 67]] },
  { id: "pacific-lazyline", title: "Pacific Lazyline", bpm: 92, program: 27, wave: "soft", melody: [64, -1, 67, 69, 71, -1, 69, 67, 64, -1, 62, 64, 67, 64, 62, -1], bass: [40, 47, 45, 43, 40, 45, 47, 38], melodyVelocity: 56, bassVelocity: 42, padProgram: 89, padWave: "warm-pad", padChords: [[52, 59, 64], [55, 62, 67], [57, 64, 69], [50, 57, 62]] },
  { id: "roost-and-thunder", title: "Roost and Thunder", bpm: 172, program: 30, wave: "bright", melody: [52, 55, 59, 64, 52, 60, 59, 55, 54, 57, 60, 66, 64, 60, 57, 54], bass: [28, 35, 33, 31, 30, 37, 35, 33], melodyVelocity: 94, bassVelocity: 74 },
  { id: "scooter-siren", title: "Scooter Siren", bpm: 164, program: 56, wave: "bright", melody: [67, 67, 72, 69, 74, 72, 69, 67, 71, 71, 76, 72, 78, 76, 72, 71], bass: [43, 43, 48, 45, 47, 47, 50, 43], melodyVelocity: 78, bassVelocity: 62, accentProgram: 56, accentWave: "bright", accents: [{ beat: 3, note: 79 }, { beat: 7, note: 81 }, { beat: 11, note: 83 }, { beat: 15, note: 78 }] },
  { id: "riviera-idle", title: "Riviera Idle", bpm: 78, program: 5, wave: "soft", melody: [69, -1, 73, 76, 74, -1, 71, 69, 68, -1, 71, 74, 73, 69, 66, -1], bass: [33, 40, 38, 42, 33, 37, 40, 35], melodyVelocity: 50, bassVelocity: 38, padProgram: 48, padWave: "warm-pad", padChords: [[57, 61, 64], [54, 57, 61], [59, 62, 66], [52, 56, 59]] },
  { id: "whisker-waltz", title: "Whisker Waltz", bpm: 114, program: 10, wave: "bell", melody: [72, 76, 79, 76, 74, 77, 81, 77, 72, 76, 83, 81, 79, 77, 74, 72], bass: [48, 55, 53, 55, 48, 52, 55, 47], melodyVelocity: 62, bassVelocity: 42 },
  { id: "backyard-bound", title: "Backyard Bound", bpm: 148, program: 25, wave: "bright", melody: [64, 67, 72, 76, 74, 72, 69, 67, 64, 69, 72, 77, 76, 72, 69, 64], bass: [40, 47, 45, 48, 40, 45, 47, 43], melodyVelocity: 78, bassVelocity: 58 },
  { id: "parsley-promenade", title: "Parsley Promenade", bpm: 102, program: 45, wave: "soft", melody: [69, 72, 76, 72, 67, 71, 74, 71, 69, 74, 77, 74, 72, 71, 67, -1], bass: [45, 52, 50, 52, 45, 50, 52, 43], melodyVelocity: 54, bassVelocity: 38, padProgram: 89, padWave: "warm-pad", padChords: [[57, 60, 64], [55, 59, 62], [52, 57, 60], [55, 59, 62]] },
  { id: "tubenet-telemetry", title: "TubeNet Telemetry", bpm: 136, program: 81, wave: "square", melody: [72, 76, 79, 84, 74, 77, 81, 86, 76, 79, 83, 88, 84, 81, 79, 76], bass: [36, 43, 41, 45, 38, 45, 43, 40], melodyVelocity: 66, bassVelocity: 48 },
  { id: "basking-after-dark", title: "Basking After Dark", bpm: 74, program: 19, wave: "organ", melody: [64, -1, 67, 68, 67, -1, 63, 64, 59, -1, 63, 67, 68, 67, 63, -1], bass: [40, 39, 44, 35, 40, 39, 36, 35], melodyVelocity: 48, bassVelocity: 38, padProgram: 89, padWave: "warm-pad", padChords: [[52, 55, 59], [51, 55, 58], [47, 52, 55], [48, 51, 55]] },
  { id: "cabinet-caper", title: "Cabinet Caper", bpm: 126, program: 71, wave: "bright", melody: [67, 71, 74, 71, 66, 69, 72, 69, 64, 67, 71, 76, 74, 71, 67, 64], bass: [43, 47, 45, 48, 40, 45, 47, 43], melodyVelocity: 67, bassVelocity: 48 },
  { id: "fogberry-moon", title: "Fogberry Moon", bpm: 84, program: 68, wave: "soft", melody: [69, -1, 72, 76, 74, -1, 71, 67, 69, 72, 76, 79, 76, 74, 71, -1], bass: [45, 40, 43, 38, 45, 41, 43, 40], melodyVelocity: 53, bassVelocity: 37, melodyLength: 1.55, padProgram: 89, padWave: "warm-pad", padChords: [[57, 60, 64], [52, 57, 60], [55, 59, 62], [50, 55, 59]], accentProgram: 98, accentWave: "crystal", accents: [{ beat: 3, note: 84 }, { beat: 10, note: 81 }, { beat: 14, note: 86 }] },
  { id: "store-zero-loader", title: "Store 00 Loader", bpm: 142, program: 81, wave: "square", melody: [64, 71, 76, 79, 67, 74, 79, 83, 69, 76, 81, 84, 71, 78, 83, 86], bass: [40, 47, 43, 50, 45, 52, 47, 42], melodyVelocity: 68, bassVelocity: 50, padProgram: 89, padWave: "warm-pad", padChords: [[52, 55, 59], [55, 59, 62], [57, 60, 64], [59, 62, 66]], accentProgram: 98, accentWave: "crystal", accents: [{ beat: 1, note: 88 }, { beat: 5, note: 91 }, { beat: 9, note: 93 }, { beat: 13, note: 95 }] },
  { id: "weather-drawer-waltz", title: "Weather Drawer Waltz", bpm: 96, program: 68, wave: "soft", melody: [72, -1, 76, 79, 77, -1, 74, 71, 69, -1, 72, 76, 74, 71, 67, -1], bass: [45, 40, 43, 38, 41, 45, 43, 40], melodyVelocity: 51, bassVelocity: 36, melodyLength: 1.45, padProgram: 89, padWave: "warm-pad", padChords: [[57, 60, 64], [52, 57, 60], [55, 59, 62], [50, 55, 59]], accentProgram: 10, accentWave: "bell", accents: [{ beat: 2, note: 84 }, { beat: 6, note: 79 }, { beat: 10, note: 86 }, { beat: 14, note: 81 }] },
  { id: "five-color-drive", title: "Five-Color Drive", bpm: 158, program: 81, wave: "bright", melody: [69, 73, 76, 81, 71, 74, 78, 83, 73, 76, 81, 85, 76, 81, 83, 88], bass: [33, 40, 38, 42, 35, 42, 40, 45], melodyVelocity: 76, bassVelocity: 55, padProgram: 89, padWave: "warm-pad", padChords: [[57, 61, 64], [59, 62, 66], [61, 64, 68], [64, 68, 71]], accentProgram: 98, accentWave: "crystal", accents: [{ beat: 0, note: 88 }, { beat: 4, note: 90 }, { beat: 8, note: 92 }, { beat: 12, note: 95 }] },
  { id: "lusterkin-descent", title: "Lusterkin Descent", bpm: 68, program: 98, wave: "crystal", melody: [76, -1, -1, 71, -1, 67, -1, -1, 64, -1, 59, -1, 55, -1, -1, 52], bass: [28, 31, 26, 23, 28, 24, 21, 16], melodyVelocity: 47, bassVelocity: 36, melodyLength: 1.8, padProgram: 89, padWave: "warm-pad", padChords: [[40, 47, 52], [38, 43, 50], [36, 43, 48], [33, 40, 45]], accentProgram: 10, accentWave: "bell", accents: [{ beat: 1, note: 88 }, { beat: 7, note: 83 }, { beat: 13, note: 79 }] },
  { id: "atlas-in-the-wind", title: "Atlas in the Wind", bpm: 88, program: 68, wave: "soft", melody: [67, -1, 71, 74, 72, -1, 69, 67, 64, -1, 67, 72, 71, 67, 64, -1], bass: [43, 38, 40, 35, 43, 40, 38, 36], melodyVelocity: 50, bassVelocity: 36, melodyLength: 1.5, padProgram: 48, padWave: "warm-pad", padChords: [[55, 59, 62], [50, 55, 59], [52, 57, 60], [48, 52, 55]], accentProgram: 10, accentWave: "bell", accents: [{ beat: 3, note: 79 }, { beat: 8, note: 76 }, { beat: 14, note: 81 }] }
];

function u16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16BE(value);
  return buffer;
}

function u32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32BE(value);
  return buffer;
}

function vlq(value) {
  const bytes = [value & 0x7f];
  while ((value >>= 7) > 0) bytes.unshift((value & 0x7f) | 0x80);
  return Buffer.from(bytes);
}

function buildMidi(track) {
  const microseconds = Math.round(60_000_000 / track.bpm);
  const endTick = 16 * ticksPerBeat;
  const name = Buffer.from(track.title);
  const events = [
    { tick: 0, priority: 0, data: [0xff, 0x03, name.length, ...name] },
    { tick: 0, priority: 0, data: [0xff, 0x51, 0x03, (microseconds >> 16) & 255, (microseconds >> 8) & 255, microseconds & 255] },
    { tick: 0, priority: 1, data: [0xc0, track.program] },
    { tick: 0, priority: 1, data: [0xc1, 33] },
    ...(track.padProgram === undefined ? [] : [{ tick: 0, priority: 1, data: [0xc2, track.padProgram] }]),
    ...(track.accentProgram === undefined ? [] : [{ tick: 0, priority: 1, data: [0xc3, track.accentProgram] }])
  ];
  const melodyLength = Math.round((track.melodyLength ?? 0.8) * ticksPerBeat);
  track.melody.forEach((note, beat) => {
    if (note < 0) return;
    events.push({ tick: beat * ticksPerBeat, priority: 3, data: [0x90, note, track.melodyVelocity ?? 82] });
    events.push({ tick: Math.min(endTick, beat * ticksPerBeat + melodyLength), priority: 2, data: [0x80, note, 0] });
  });
  track.bass.forEach((note, step) => {
    const tick = step * ticksPerBeat * 2;
    events.push({ tick, priority: 3, data: [0x91, note, track.bassVelocity ?? 58] });
    events.push({ tick: tick + 768, priority: 2, data: [0x81, note, 0] });
  });
  track.padChords?.forEach((chord, step) => {
    const tick = step * ticksPerBeat * 4;
    for (const note of chord) {
      events.push({ tick, priority: 3, data: [0x92, note, 30] });
      events.push({ tick: tick + ticksPerBeat * 4 - 32, priority: 2, data: [0x82, note, 0] });
    }
  });
  track.accents?.forEach(({ beat, note }) => {
    const tick = beat * ticksPerBeat;
    events.push({ tick, priority: 3, data: [0x93, note, 38] });
    events.push({ tick: Math.min(endTick, tick + ticksPerBeat * 2), priority: 2, data: [0x83, note, 0] });
  });
  events.sort((a, b) => a.tick - b.tick || a.priority - b.priority);
  let previousTick = 0;
  const parts = [];
  for (const event of events) {
    parts.push(vlq(event.tick - previousTick), Buffer.from(event.data));
    previousTick = event.tick;
  }
  parts.push(vlq(endTick - previousTick), Buffer.from([0xff, 0x2f, 0]));
  const data = Buffer.concat(parts);
  return Buffer.concat([
    Buffer.from("MThd"), u32(6), u16(0), u16(1), u16(ticksPerBeat),
    Buffer.from("MTrk"), u32(data.length), data
  ]);
}

function frequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function oscillator(phase, wave) {
  if (wave === "square") return Math.sin(phase) >= 0 ? 0.72 : -0.72;
  if (wave === "organ") return Math.sin(phase) * 0.72 + Math.sin(phase * 2) * 0.2 + Math.sin(phase * 3) * 0.08;
  if (wave === "bright") return Math.sin(phase) * 0.68 + Math.sin(phase * 2) * 0.24 + Math.sin(phase * 3) * 0.08;
  if (wave === "bell") return Math.sin(phase) * 0.7 + Math.sin(phase * 2.01) * 0.18 + Math.sin(phase * 3.98) * 0.12;
  if (wave === "warm-pad") return Math.sin(phase) * 0.64 + Math.sin(phase * 0.501) * 0.2 + Math.sin(phase * 1.997) * 0.16;
  if (wave === "crystal") return Math.sin(phase) * 0.62 + Math.sin(phase * 2.005) * 0.2 + Math.sin(phase * 4.01) * 0.18;
  return Math.sin(phase) * 0.82 + Math.sin(phase * 0.5) * 0.18;
}

function noteEnvelope(position, length, bell) {
  const attack = Math.min(1, position / 0.035);
  const release = Math.min(1, Math.max(0, (length - position) / 0.12));
  const decay = bell ? Math.exp(-1.5 * position) : 0.78 + 0.22 * Math.exp(-2 * position);
  return attack * release * decay;
}

function buildWav(track) {
  const sampleRate = 22_050;
  const secondsPerBeat = 60 / track.bpm;
  const duration = secondsPerBeat * 16;
  const frames = Math.round(duration * sampleRate);
  const pcm = Buffer.alloc(frames * 2);
  for (let frame = 0; frame < frames; frame += 1) {
    const time = frame / sampleRate;
    const beatPosition = time / secondsPerBeat;
    const beat = Math.floor(beatPosition);
    let melodyBeat = beat;
    if ((track.melodyLength ?? 0.8) > 1) {
      const earliestBeat = Math.max(0, Math.ceil(beatPosition - track.melodyLength));
      while (melodyBeat >= earliestBeat && (track.melody[melodyBeat] ?? -1) < 0) melodyBeat -= 1;
    }
    const local = (beatPosition - melodyBeat) * secondsPerBeat;
    const melody = track.melody[melodyBeat] ?? -1;
    const bass = track.bass[Math.floor(beat / 2)] ?? -1;
    let sample = 0;
    const melodyDuration = secondsPerBeat * (track.melodyLength ?? 0.8);
    if (melody >= 0 && local < melodyDuration) {
      sample += oscillator(2 * Math.PI * frequency(melody) * local, track.wave) *
        noteEnvelope(local, melodyDuration, track.wave === "bell") * (track.melodyGain ?? 0.42);
    }
    const bassLocal = (beatPosition % 2) * secondsPerBeat;
    if (bass >= 0 && bassLocal < secondsPerBeat * 1.6) {
      sample += Math.sin(2 * Math.PI * frequency(bass) * bassLocal) * noteEnvelope(bassLocal, secondsPerBeat * 1.6, false) * 0.22;
    }
    if (track.padChords) {
      const chord = track.padChords[Math.floor(beatPosition / 4) % track.padChords.length];
      const chordLocal = (beatPosition % 4) * secondsPerBeat;
      const chordLength = secondsPerBeat * 4;
      for (const note of chord) {
        sample += oscillator(2 * Math.PI * frequency(note) * chordLocal, track.padWave) *
          noteEnvelope(chordLocal, chordLength, false) * 0.055;
      }
    }
    for (const accent of track.accents ?? []) {
      const accentLocal = time - accent.beat * secondsPerBeat;
      const accentLength = secondsPerBeat * 2;
      if (accentLocal >= 0 && accentLocal < accentLength) {
        sample += oscillator(2 * Math.PI * frequency(accent.note) * accentLocal, track.accentWave) *
          noteEnvelope(accentLocal, accentLength, true) * 0.075;
      }
    }
    pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, sample)) * 26_000), frame * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

await mkdir(outputDirectory, { recursive: true });
for (const track of tracks) {
  await Promise.all([
    writeFile(resolve(outputDirectory, `${track.id}.mid`), buildMidi(track)),
    writeFile(resolve(outputDirectory, `${track.id}.wav`), buildWav(track))
  ]);
  console.log(`Wrote ${track.id}.mid and ${track.id}.wav`);
}
