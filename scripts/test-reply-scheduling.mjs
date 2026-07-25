import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const sourcePath = path.resolve("src", "reply-scheduling.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const output = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022
  },
  fileName: sourcePath
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(output).toString("base64")}`;
const {
  deliveryIsAvailable,
  personaIsActiveAt,
  replyTimingBounds,
  scheduleReplyAt
} = await import(moduleUrl);

const sentAt = "1999-11-03T12:00:00";
const sentMs = new Date(sentAt).getTime();
const delayMinutes = (value) => (new Date(value).getTime() - sentMs) / 60_000;

for (const [channel, expected] of [
  ["comment", [5, 1440]],
  ["email", [60, 2880]],
  ["aim", [0, 60]],
  ["helper", [0, 0]]
]) {
  const bounds = replyTimingBounds(channel);
  assert.deepEqual(
    [bounds.minimumMinutes, bounds.maximumMinutes],
    expected,
    `${channel} bounds changed unexpectedly`
  );
  for (let index = 0; index <= 100; index += 1) {
    const sample = index / 100;
    const delay = delayMinutes(scheduleReplyAt("orbit_guide", channel, sentAt, () => sample));
    assert.ok(delay >= expected[0] && delay <= expected[1], `${channel} delay ${delay} was outside its bounds`);
  }
}

assert.equal(personaIsActiveAt("juniper_gdn", "1999-11-03T10:00:00"), true);
assert.equal(personaIsActiveAt("juniper_gdn", "1999-11-03T23:00:00"), false);
assert.equal(personaIsActiveAt("mira_917", "1999-11-03T22:00:00"), true);
assert.equal(personaIsActiveAt("mira_917", "1999-11-03T12:00:00"), false);

const lateJuniperReply = new Date(scheduleReplyAt(
  "juniper_gdn",
  "comment",
  "1999-11-03T23:00:00",
  () => 0
));
assert.equal(lateJuniperReply.getHours(), 7, "A daytime persona should defer a late-night reply until morning");

const noonMiraReply = new Date(scheduleReplyAt(
  "mira_917",
  "aim",
  "1999-11-03T12:00:00",
  () => 0
));
assert.equal(delayMinutes(noonMiraReply.toISOString()), 60, "AIM delay must remain capped at one hour");

assert.equal(deliveryIsAvailable("1999-11-03T12:05:00", "1999-11-03T12:04:59"), false);
assert.equal(deliveryIsAvailable("1999-11-03T12:05:00", "1999-11-03T12:05:00"), true);
assert.equal(deliveryIsAvailable(undefined, "1999-11-03T12:05:00"), true);

console.log("REPLY_TIMING_OK: delivery bounds, activity windows, and availability checks passed.");
