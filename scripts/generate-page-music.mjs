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
  { id: "honest-handshake", title: "Honest Handshake", bpm: 128, program: 22, wave: "organ", melody: [64, 69, 72, 76, 72, 69, 67, 64, 62, 67, 71, 74, 71, 67, 66, 62], bass: [40, 45, 43, 48, 38, 43, 45, 38] }
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
