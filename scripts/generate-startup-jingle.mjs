import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Dependency-free generator for OrbitOS's original startup sound.
// It writes a compact General MIDI Type 0 file for archival/editing and a
// deterministic PCM WAV render for reliable Chromium/Electron playback.

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const outputDirectory = resolve(projectRoot, "assets", "audio");
const midiPath = resolve(outputDirectory, "orbitos-startup.mid");
const wavPath = resolve(outputDirectory, "orbitos-startup.wav");

const ticksPerQuarter = 480;
const tempoBpm = 112;
const microsecondsPerQuarter = Math.round(60_000_000 / tempoBpm);
const secondsPerTick = 60 / tempoBpm / ticksPerQuarter;

// A short I–IV–V–I gesture. The high notes rise E–A–B–C while the final
// C-major chord blooms and decays. All pitches and timing are original.
const chordSteps = [
  { tick: 0, duration: 480, notes: [48, 55, 64] },
  { tick: 480, duration: 480, notes: [53, 60, 69] },
  { tick: 960, duration: 480, notes: [55, 62, 71] },
  { tick: 1440, duration: 960, notes: [48, 55, 60, 64, 67, 72] },
];

function unsigned32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32BE(value);
  return buffer;
}

function unsigned16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16BE(value);
  return buffer;
}

function variableLengthQuantity(value) {
  const bytes = [value & 0x7f];
  while ((value >>= 7) > 0) {
    bytes.unshift((value & 0x7f) | 0x80);
  }
  return Buffer.from(bytes);
}

function midiEvent(delta, bytes) {
  return Buffer.concat([variableLengthQuantity(delta), Buffer.from(bytes)]);
}

function buildMidi() {
  const events = [];
  const trackName = Buffer.from("OrbitOS Startup");

  events.push({ tick: 0, priority: 0, bytes: [0xff, 0x03, trackName.length, ...trackName] });
  events.push({
    tick: 0,
    priority: 0,
    bytes: [
      0xff,
      0x51,
      0x03,
      (microsecondsPerQuarter >> 16) & 0xff,
      (microsecondsPerQuarter >> 8) & 0xff,
      microsecondsPerQuarter & 0xff,
    ],
  });
  events.push({ tick: 0, priority: 0, bytes: [0xff, 0x58, 0x04, 0x04, 0x02, 0x18, 0x08] });

  // Electric Piano 1 on channel 1 and Pad 2 (warm) on channel 2.
  events.push({ tick: 0, priority: 1, bytes: [0xc0, 4] });
  events.push({ tick: 0, priority: 1, bytes: [0xc1, 89] });
  events.push({ tick: 0, priority: 1, bytes: [0xb0, 7, 102] });
  events.push({ tick: 0, priority: 1, bytes: [0xb1, 7, 72] });
  events.push({ tick: 0, priority: 1, bytes: [0xb0, 10, 56] });
  events.push({ tick: 0, priority: 1, bytes: [0xb1, 10, 72] });
  events.push({ tick: 0, priority: 1, bytes: [0xb0, 91, 44] });
  events.push({ tick: 0, priority: 1, bytes: [0xb1, 91, 54] });

  for (const step of chordSteps) {
    for (const note of step.notes) {
      const electricPianoVelocity = note >= 64 ? 86 : 64;
      const padVelocity = note >= 64 ? 42 : 34;
      events.push({ tick: step.tick, priority: 3, bytes: [0x90, note, electricPianoVelocity] });
      events.push({ tick: step.tick, priority: 3, bytes: [0x91, note, padVelocity] });
      events.push({ tick: step.tick + step.duration, priority: 2, bytes: [0x80, note, 0] });
      events.push({ tick: step.tick + step.duration, priority: 2, bytes: [0x81, note, 0] });
    }
  }

  events.sort((left, right) => left.tick - right.tick || left.priority - right.priority);

  let previousTick = 0;
  const trackParts = [];
  for (const event of events) {
    trackParts.push(midiEvent(event.tick - previousTick, event.bytes));
    previousTick = event.tick;
  }
  trackParts.push(midiEvent(0, [0xff, 0x2f, 0x00]));

  const trackData = Buffer.concat(trackParts);
  const header = Buffer.concat([
    Buffer.from("MThd"),
    unsigned32(6),
    unsigned16(0),
    unsigned16(1),
    unsigned16(ticksPerQuarter),
  ]);
  const track = Buffer.concat([Buffer.from("MTrk"), unsigned32(trackData.length), trackData]);
  return Buffer.concat([header, track]);
}

function midiFrequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function smoothStep(value) {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

function envelope(time, noteStart, noteEnd, attack, release) {
  if (time < noteStart || time > noteEnd + release) {
    return 0;
  }
  if (time < noteStart + attack) {
    return smoothStep((time - noteStart) / attack);
  }
  if (time <= noteEnd) {
    return 1;
  }
  return 1 - smoothStep((time - noteEnd) / release);
}

function synthVoice(time, note, start, end, layer) {
  const frequency = midiFrequency(note);
  const localTime = time - start;

  if (layer === "pad") {
    const amp = envelope(time, start, end, 0.075, 0.62);
    const slowTremolo = 0.94 + 0.06 * Math.sin(2 * Math.PI * 3.1 * localTime);
    return (
      amp *
      slowTremolo *
      (0.66 * Math.sin(2 * Math.PI * frequency * localTime) +
        0.22 * Math.sin(2 * Math.PI * frequency * 2 * localTime + 0.1) +
        0.12 * Math.sin(2 * Math.PI * frequency * 0.5 * localTime))
    );
  }

  const amp = envelope(time, start, end, 0.012, 0.38);
  const struckDecay = 0.52 + 0.48 * Math.exp(-2.4 * Math.max(0, localTime));
  return (
    amp *
    struckDecay *
    (0.74 * Math.sin(2 * Math.PI * frequency * localTime) +
      0.18 * Math.sin(2 * Math.PI * frequency * 2 * localTime + 0.08) +
      0.08 * Math.sin(2 * Math.PI * frequency * 3 * localTime + 0.15))
  );
}

function buildWav() {
  const sampleRate = 44_100;
  const channels = 2;
  const bitsPerSample = 16;
  const midiDuration = 2400 * secondsPerTick;
  const durationSeconds = midiDuration + 0.68;
  const frameCount = Math.ceil(durationSeconds * sampleRate);
  const samples = new Float64Array(frameCount * channels);

  const voices = chordSteps.flatMap((step) =>
    step.notes.flatMap((note, noteIndex) => {
      const start = step.tick * secondsPerTick;
      const end = (step.tick + step.duration) * secondsPerTick;
      const pan = ((noteIndex / Math.max(1, step.notes.length - 1)) * 2 - 1) * 0.26;
      return [
        { note, start, end, pan: pan - 0.08, layer: "electric", gain: note >= 64 ? 0.13 : 0.09 },
        { note, start, end, pan: pan + 0.08, layer: "pad", gain: note >= 64 ? 0.052 : 0.042 },
      ];
    }),
  );

  for (let frame = 0; frame < frameCount; frame += 1) {
    const time = frame / sampleRate;
    let left = 0;
    let right = 0;
    for (const voice of voices) {
      const value = synthVoice(time, voice.note, voice.start, voice.end, voice.layer) * voice.gain;
      left += value * Math.sqrt((1 - voice.pan) / 2);
      right += value * Math.sqrt((1 + voice.pan) / 2);
    }
    samples[frame * 2] = left;
    samples[frame * 2 + 1] = right;
  }

  // A tiny room-like echo gives the synthetic chord the polished startup-sound tail.
  const delays = [
    { frames: Math.round(sampleRate * 0.113), gain: 0.17 },
    { frames: Math.round(sampleRate * 0.181), gain: 0.1 },
  ];
  for (const { frames, gain } of delays) {
    for (let frame = frames; frame < frameCount; frame += 1) {
      samples[frame * 2] += samples[(frame - frames) * 2 + 1] * gain;
      samples[frame * 2 + 1] += samples[(frame - frames) * 2] * gain;
    }
  }

  let peak = 0;
  for (const sample of samples) {
    peak = Math.max(peak, Math.abs(sample));
  }
  const normalization = peak > 0 ? 0.86 / peak : 1;

  const bytesPerSample = bitsPerSample / 8;
  const dataSize = frameCount * channels * bytesPerSample;
  const wav = Buffer.alloc(44 + dataSize);
  wav.write("RIFF", 0);
  wav.writeUInt32LE(36 + dataSize, 4);
  wav.write("WAVE", 8);
  wav.write("fmt ", 12);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(channels, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * channels * bytesPerSample, 28);
  wav.writeUInt16LE(channels * bytesPerSample, 32);
  wav.writeUInt16LE(bitsPerSample, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(dataSize, 40);

  for (let index = 0; index < samples.length; index += 1) {
    const value = Math.max(-1, Math.min(1, samples[index] * normalization));
    wav.writeInt16LE(Math.round(value * 32767), 44 + index * 2);
  }
  return { wav, durationSeconds, midiDuration };
}

await mkdir(outputDirectory, { recursive: true });
const midi = buildMidi();
const { wav, durationSeconds, midiDuration } = buildWav();
await Promise.all([writeFile(midiPath, midi), writeFile(wavPath, wav)]);

console.log(`Wrote ${midiPath} (${midi.length} bytes, ${midiDuration.toFixed(3)} s sequence)`);
console.log(`Wrote ${wavPath} (${wav.length} bytes, ${durationSeconds.toFixed(3)} s render)`);
