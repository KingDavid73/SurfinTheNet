import type { BbsState, GameState } from "./types";

export const BBS_DIAL_NUMBER = "555-0144";
export const BBS_EVIDENCE_IDS = ["silver-thread", "accelerator-signature", "wideworld-acquisition"] as const;
export const PATCH_COMPONENTS = ["BRIDGE22.CHK", "OBJECTMAP.DAT", "C9CLEAN.IDX"] as const;

type Post = { author: string; date: string; body: string };
type Thread = { id: string; board: string; subject: string; minimumPhase?: number; posts: Post[] };
export const BBS_BOARDS = [
  ["general", "General Chatter"], ["classifieds", "Local Classifieds"], ["help", "Computer Help"],
  ["music", "Music and Tape Trades"], ["oldtimers", "Orbit Old-Timers"], ["files", "Files and Shareware"],
  ["mail", "Private Mail"], ["sysop", "Sysop Notices"]
] as const;

export const BBS_THREADS: Thread[] = [
  { id: "welcome", board: "general", subject: "WELCOME TO BYTEFORGE // READ FIRST", posts: [{ author: "SYSOP_MACK", date: "08/14/95", body: "ByteForge is a local computer club board. Be decent, label files, and do not call twice at once." }] },
  { id: "classified-modem", board: "classifieds", subject: "FS: 14.4 modem, makes confident noises", posts: [{ author: "NORTHLAKE_JO", date: "10/22/99", body: "$18 or trade for two blank tapes. Includes cable that fits at least one computer." }] },
  { id: "help-line-noise", board: "help", subject: "Line noise at 11:17 every night", posts: [{ author: "MODEM_MARLA", date: "10/29/99", body: "Not supernatural. The grain elevator fax machine calls its supplier at 11:17. Move your cable away from the wall transformer." }] },
  { id: "shareware-pack", board: "files", subject: "BYTEFORGE ANSI + MODEM SOUND PACK", posts: [{ author: "SYSOP_MACK", date: "11/01/99", body: "Two harmless souvenirs: the ByteForge login ANSI and a text transcription of our least pleasant dial tone. Archive copies only." }] },
  { id: "private-welcome", board: "mail", subject: "PRIVATE: welcome, new caller", posts: [{ author: "SYSOP_MACK", date: "11/03/99", body: "Your account is local to ByteForge. Nothing posted here is copied to the Orbit web bridge. Reply if the menus are confusing." }] },
  { id: "tape-tree", board: "music", subject: "BYTE BARN COVER DUB TREE", minimumPhase: 3, posts: [{ author: "BARNBEAT_BEN", date: "11/11/99", body: "Post what you have and what generation the tape is. Please stop writing MASTER on third-generation dubs." }, { author: "SAFETYPIN_SID", date: "11/11/99", body: "Requesting the version without the choir. For criticism." }] },
  { id: "silver-bridge-1996", board: "oldtimers", subject: "SILVERDIAL ORBIT BRIDGE IS REPLACING PAGE OBJECTS", minimumPhase: 5, posts: [{ author: "BRIDGEPATCH_PAULA", date: "02/17/96", body: "Bridge 1.6 injects its compatibility object before the page map finishes loading. Symptoms: repeated badges, false navigation, replaced backgrounds, audio restarts, and panels copied into unrelated communities." }, { author: "PAGEKEEPER_NEIL", date: "02/18/96", body: "The page source is intact. The public bridge is rendering foreign objects over clean records. Archive signature BRIDGE22 before SilverDial rotates it." }] },
  { id: "randy-signature", board: "help", subject: "WW-22.6 SIGNATURE MATCH // NEED CLEAN OBJECT MAP", minimumPhase: 5, posts: [{ author: "BRIDGEPATCH_PAULA", date: "11/17/99", body: "That Community Accelerator signature is SilverDial's injector with a WideWorld wrapper. I can provide clean bridge rules after all three evidence records are archived." }, { author: "PAGEKEEPER_NEIL", date: "11/17/99", body: "C9 kept pristine page indexes. Combine the signature checker, object map, and preserved index. Do not edit the pages themselves." }] },
  { id: "patch-bay", board: "files", subject: "PATCH BAY // ORBITFIX.PAK", minimumPhase: 6, posts: [{ author: "SYSOP_MACK", date: "11/18/99", body: "The Patch Bay combines BRIDGE22.CHK + OBJECTMAP.DAT + C9CLEAN.IDX. Publish your evidence report before distribution so the gateway cannot quietly switch back on." }] },
  { id: "aftercare", board: "sysop", subject: "ORBIT MAINTENANCE PROGRAM", minimumPhase: 7, posts: [{ author: "SYSOP_MACK", date: "11/20/99", body: "Abuse and security contact staffed. Community admins appointed. Automated accounts labeled. C9 restricted to disclosed archival and recommendation work." }] }
];

const esc = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function renderByteForge(state: GameState) {
  const bbs = state.bbs;
  if (!bbs.connected) return `<div class="bbs-terminal bbs-dial"><pre>ORBIT TERMINAL v2.2\nNO CARRIER\n\nBYTEFORGE COMPUTER CLUB BBS\nDIAL: ${BBS_DIAL_NUMBER}</pre><button data-bbs-dial>DIAL BYTEFORGE</button><small>Separate dial-up route · web bridge not required</small></div>`;
  const selectedBoard = BBS_BOARDS.some(([id]) => id === bbs.selectedBoardId) ? bbs.selectedBoardId : "general";
  const threadIsVisible = (thread: Thread) => (thread.minimumPhase ?? 1) <= state.storyPhase && (thread.id !== "randy-signature" || state.infection.evidenceIds.includes("accelerator-signature"));
  const visibleThreads = BBS_THREADS.filter((thread) => thread.board === selectedBoard && threadIsVisible(thread));
  const thread = bbs.selectedThreadId ? BBS_THREADS.find((candidate) => candidate.id === bbs.selectedThreadId && threadIsVisible(candidate)) : undefined;
  const evidenceReady = state.infection.evidenceIds.length >= 3;
  const allParts = PATCH_COMPONENTS.every((part) => state.infection.patchComponents.includes(part));
  const tools = thread?.id === "silver-bridge-1996" ? `<button data-bbs-evidence="silver-thread">ARCHIVE THREAD + DOWNLOAD BRIDGE22.CHK</button>`
    : thread?.id === "randy-signature" && evidenceReady ? `<button data-bbs-component="OBJECTMAP.DAT">SAVE OBJECTMAP.DAT</button><button data-bbs-component="C9CLEAN.IDX">SAVE C9CLEAN.IDX</button>`
    : thread?.id === "patch-bay" ? `<div class="bbs-patch-bay"><b>COMPONENTS: ${PATCH_COMPONENTS.map((part) => `${state.infection.patchComponents.includes(part) ? "[X]" : "[ ]"} ${part}`).join(" · ")}</b><button data-bbs-build ${allParts ? "" : "disabled"}>BUILD ORBITFIX.PAK</button><button data-bbs-publish ${state.infection.evidenceIds.length >= 3 ? "" : "disabled"}>PUBLISH EVIDENCE REPORT</button><button data-bbs-distribute ${state.infection.patchBuilt && state.infection.exposureReportPublished ? "" : "disabled"}>DISTRIBUTE PATCH</button></div>`
    : thread?.id === "shareware-pack" ? `<button data-bbs-file="BYTEFORGE.ANS">DOWNLOAD BYTEFORGE.ANS</button><button data-bbs-file="DIALTONE.TXT">DOWNLOAD DIALTONE.TXT</button>` : "";
  return `<div class="bbs-terminal"><header>BYTEFORGE BBS // ${BBS_DIAL_NUMBER} // ${state.storyPhase >= 5 ? "BRIDGE ALERT" : "1 CALLER"}</header><div class="bbs-columns"><nav>${BBS_BOARDS.map(([id, label]) => `<button data-bbs-board="${id}" class="${id === selectedBoard ? "active" : ""}">${label}</button>`).join("")}<button data-bbs-hangup>Hang Up</button></nav><main>${thread ? `<button data-bbs-board="${thread.board}">← THREAD LIST</button><h2>${esc(thread.subject)}</h2>${thread.posts.map((post) => `<article><b>${esc(post.author)}</b><time>${post.date}</time><p>${esc(post.body)}</p></article>`).join("")}${bbs.replies.filter((reply) => reply.threadId === thread.id).map((reply) => `<article class="player"><b>YOU</b><time>${esc(reply.createdAt.slice(0, 10))}</time><p>${esc(reply.text)}</p></article>`).join("")}<form data-bbs-reply="${thread.id}"><textarea name="reply" maxlength="500" placeholder="Write a public reply..."></textarea><button>POST REPLY</button></form>${tools}` : `<h2>${BBS_BOARDS.find(([id]) => id === selectedBoard)?.[1]}</h2>${visibleThreads.map((item) => `<button class="bbs-thread ${bbs.readThreadIds.includes(item.id) ? "read" : ""}" data-bbs-thread="${item.id}"><span>${bbs.readThreadIds.includes(item.id) ? " " : "*"}</span><b>${esc(item.subject)}</b><small>${item.posts.length} authored post${item.posts.length === 1 ? "" : "s"}</small></button>`).join("") || "<p>NO MESSAGES IN THIS AREA.</p>"}`}</main></div></div>`;
}
