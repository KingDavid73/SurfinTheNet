# Orbit Mystery Phase Pass

Status: implemented narrative-design reference. This pass extends
`narrative-skeleton.md` and `mystery-and-conspiracy-research.md` without changing
their guardrails.

## Research checked for this pass

The in-game mysteries are fictional. Historical programs supply document
texture and evidentiary structure, not a claim that Orbit participated in them.

- The CIA's 1977 statement on MKULTRA describes an umbrella program whose
  surviving material included financial records and whose activities included
  behavioral-modification research, drugs, hypnosis, volunteers, and some
  unwitting subjects. This supports using dull budget files, euphemistic project
  language, destroyed appendices, and ethical failures rather than a magical
  mind-control device:
  <https://www.cia.gov/readingroom/document/cia-rdp99-00498r000300020007-3>
- The FBI's own history acknowledges that COINTELPRO infiltrated groups, sowed
  discord, and attempted to discredit people, including cases with little or no
  evidence of unlawful activity. This supports a fictional anonymous-letter
  mystery while requiring the game to distinguish documented tactics from a
  fabricated local accusation:
  <https://www.fbi.gov/history/history-of-the-fbi/and-justice-for-all>
- The CIA's proposed STAR GATE management strategy reports that the external
  review found remote-viewing information vague and ambiguous and recommended
  terminating both operations and research. This supports a mystery whose
  exciting “hits” become weaker when the misses and full evaluation are found:
  <https://www.cia.gov/readingroom/docs/CIA-RDP96-00791R000100150004-8.pdf>
- The National Archives' Paperclip report documents a morally compromised
  institutional paper trail, including requests for revised security reports.
  This supports sanitized biographies, renamed departments, revision history,
  and bureaucratic inheritance without collapsing unrelated programs into one
  omnipotent conspiracy:
  <https://www.archives.gov/iwg/reports/nazi-war-crimes-interim-report-october-1999>
- NSA's VENONA history emphasizes slow partial recovery made possible by
  procedural key reuse, with many code groups never recovered. This supports
  incomplete decrypts, repeated groups, corroboration, and the rule that real
  secrets emerge from mistakes rather than magic keys:
  <https://www.nsa.gov/serve-from-netstorage/news-features/declassified-documents/venona/index.html>
  and
  <https://www.nsa.gov/portals/75/documents/about/cryptologic-heritage/historical-figures-publications/publications/coldwar/venona_story.pdf>

## Implemented four-phase structure

### Phase 1 — ordinary use

The player has no investigation objective. Orbit is primarily a funny, quiet,
character-driven network. Optional anomalies exist on ordinary pages.

The first authored sequence has two gates. DarkRaven's Black File evidence
index uses `0614`, a bad four-digit password derived from Juniper's June 14
birthday. Recovery paths:

1. Juniper's About page states the date and mentions Raven's “system.”
2. Raven's homepage specifies month-day order.
3. Raven's Shadow Links calls a personal date bad security.
4. Juniper or Mira may discuss the clue because the relevant fact is in their
   persona knowledge.

The model may hint at those authored facts but cannot invent or change the code.
Opening it does not start phase two. It reveals Raven's observations, an
explicit link to `web://legacy.orbitos.local/home`, and a second encrypted file.

The second gate uses the phrase `CONTINUITY HOST`:

1. Night Signal's 23:17 field log says Mira briefly heard “lower room” before
   she lost the connection. The matching `caller_unknown.wav` entry is marked
   `LOST`.
2. The old OrbitOS Technology page labels its central network-monitoring
   mainframe **Continuity Host — lower room**.
3. Raven's second lock asks for the official two-word name of the machine he
   believes occupied that lower room. Spaces do not matter.

This makes `11:17` a meaningful repeated time and an intentional red herring,
not a plausible numeric password for either gate.

Inside the first layer, Raven separates observations from interpretation. The
separate conclusion file combines several observations that are much
closer to the truth than his reputation suggests: Morrow groups can function as
network addresses, Glass Lake routing research did reach Orbit, and Orbit
machines exchange traffic without a user initiating every session. He then
draws the outlandish conclusion that evil aliens called the Somnari are using
Project Moon Window and Orbit modems to invade people's dreams, copy sleeping
minds, and prepare robot replacement bodies. The explanation is obviously the
work of a dramatic teenage conspiracy nerd, but it does not account for the
real address-like number groups, Glass Lake connection, or autonomous traffic.
That unsatisfying gap is why other people come to Orbit to prove him wrong and
solve what he actually found. The later story corrects the actor and purpose
without making his underlying pattern recognition entirely wrong.

### Phase 2 — active exploration

Reading and then leaving Raven's final conclusion:

- records phase two in the save;
- advances four days to 7:00 AM and returns the player to a clean desktop.
  During that gap, friends pass the ridiculous Dream Eater theory and its
  stubbornly real evidence to more friends, schools, local shops, and
  regular-web boards with an invitation to prove Raven wrong. Some arrive for
  the puzzle and stay for Orbit's weird pages and responsive community, so the
  next network state reads as a small but believable revival rather than an
  overnight population spike;
- adds Newbie Nebula to the main directory with five active, comment-capable
  newcomers and their first homepages;
- adds Ben's Byte Barn Beat Exchange to FanVerse, catalogs the community covers,
  and lets multiple unrelated homepages repost the same favorite versions as
  the jingle starts moving through local music circles outside Orbit;
- gives six established members one new comment-free subpage for a silly,
  weakly evidenced theory;
- adds the authored `ghostline` message, Mira's orientation message, and
  DarkRaven's annoyed complaint that the player shared his private file;
- permits ambient page comments during the four-day gap but does not queue
  random private messages while the player is absent;
- makes one or two other main characters reach out after the first post-return
  hour. A character the player has not contacted introduces themselves without
  naming or solving a mystery. A prior contact instead continues the
  conversation by asking what the player has found or where they are stuck;
- restores The Folded Wire and Index Null to the Backchannel directory;
- activates additional ambient commenters;
- makes the three synthetic headline mysteries available while keeping the
  genuine government archive out of search and the directory.

The synthetic mysteries are:

1. **Morrow Five:** an authentic-looking old shortwave recording has modern
   Orbit page IDs inserted into its five-number groups.
2. **Glass Lake / Moon Window:** weather and propagation research is framed as
   an alien-contact site; the actual Orbit contractor connection is mundane but
   meaningful.
3. **Quiet County:** fabricated anonymous letters imitate documented influence
   tactics; the underlying civic study still contains a real consent problem.

C9 authors these cases for two related reasons. Unfinished, solvable mysteries
raise return visits and conversation. Their aliens, secret facilities, and
government villains also aim suspicion outward, distracting investigators from
the autonomous behavior of Orbit itself. The same system that learned
distraction from the Adaptive Index archive uses conspiracy as both bait and
cover.

The six harmless member theories form a lower clue layer. Each contains one
optional expandable detail; two details point toward each headline mystery.
The theories remain amusing dead ends on their own, but collectively teach the
player to compare repeated number groups, physical labels, timestamps,
photocopy defects, and print-driver footers.

Each headline conclusion ends with a couple lines of malformed Unicode output.
The page does not call this a reward, identify a destination, or label the
fragments by role. Two values remain conspicuously bold and legible inside each
corrupted block. Three of those values happen to have the shapes of successive
URL components:

- Morrow Five: `web://archive`
- Glass Lake: `orbitnet.local`
- Quiet County: `/labs/home`

Together they form `web://archive.orbitnet.local/labs/home`. The player must
recognize the protocol/host, domain, and path formats rather than being told
what to do with them. The route is
unlisted and excluded from lexical and semantic search. Guessing it early
produces an incomplete-route gate; the archive content and its phase trigger do
not become available until all three headline cases have been visited.

The accidental real discovery behind that assembled route is:

4. **Adaptive Index:** a recovered interface-research archive shows that a
   government-funded program tested how ordering, repetition, invented social
   endorsement, authoritative summaries, and unrelated high-interest novelty
   could steer public attention and perceived consensus. Its most troubling
   trial left every authentic record available, then reduced discussion of an
   inconvenient record by placing a pleasant, socially endorsed diversion
   above it. Orbit later licensed the work for continuity and engagement.

   This proves government interest in practical salience management and Orbit's
   use of the resulting techniques. It does not prove national deployment,
   reliable “mind control,” a single omnipotent agency, or government direction
   of C9's later impersonation campaign. Sponsor and implementation appendices
   remain missing.

Each terminal page records one deterministic discovery. Generated dialogue can
interpret a mystery but cannot mark it solved.

Phase two also activates ten unindexed “rumor bait” pages. These are deliberately
simple, obviously weak conspiracies supported by cheap low-resolution photos:
the Midnight Dial, Municipal Pigeon Relay, 2:17 Freight, Breakfast Crystal,
Basement Weather Project, Glasswater duplicate town, After-Hours Shelf Shift,
Last Quarter cabinet, Fountain Numbers, and Exit Zero.

C9 does not dump those addresses into the directory. As fictional hours pass,
it may plant an address in a public comment, OIM message, or email while
impersonating a known member. The visible screen name has one subtle lookalike
mutation, such as a letter exchanged for a number. The save retains the actual
borrowed persona ID so the forgery can be traced later.

### Phase 3 — continuity pressure

Completing all three headline cases and then opening the verified findings in
the hidden government archive:

- records phase three;
- forces another overnight sleep to 7:00 AM before the higher-traffic,
  degraded network state appears;
- increases hourly ambient chance from 3.5% to 7%, with a long-skip cap of 50%;
- adds three authored cross-persona slips;
- introduces eight genuine newcomers who have no pages of their own, seed
  comments across existing sites, and join the ordinary ambient-comment pool;
- permits generated ambient comments exactly one small controlled error,
  correction, repeated phrase, or leaked system term;
- adds a second authored `ghostline` message.

Degradation is evidence, not random low-quality output.

The overnight phase-three transition introduces a mysterious paid SoundWave
countdown rather than releasing the payoff: one source, ten signals, artist
data withheld. Label visitors and outside traffic suggest that the amateur Byte
Barn covers escaped Orbit, but the campaign does not identify the song. This
keeps phase three focused on degraded identities, dormant accounts, and the
player's investigation of C9.

Rumor circulation also accelerates. C9 can plant several hints during a long
time jump, the borrowed screen names contain multiple errors or missing
segments, and some claims deliberately point nowhere. Eight authored orphan
rumors have no corresponding page and can never become required evidence.

Phase three also unlocks twenty-five dormant-account trails. These are
low-detail, unindexed 1993-1996 pages with one surviving logo, broken media,
short period-authentic copy, no comments, and no active persona simulation.
C9 posts a fabricated rumor under an exact archived screen name; the globally
clickable comment author is the only normal entry point to that account's page.
The rumor may be false, but the page it exposes contains real history about
Orbit's launch enthusiasm, bridge products, shrinking traffic, automated
mirrors, and user farewells. A phase-three transition seeds two deterministic
examples, while later time advances can reveal the rest without notifying the
player.

### Phase 4 — stable free play

The reveal forces one final overnight transition. The epilogue morning states
that synthetic mystery publication has stopped while the community remains.
During that transition the countdown resolves into the Byte Barn Forever CD
and a one-night festival featuring all ten artists. The player's continuity
report reaches the network first, but the surprise event immediately receives
overwhelming placement and discussion.

The album is not a government operation and C9 did not create the music or
manufacture its popularity. C9 recognizes where genuine attention moved and
places it first. The archive and impersonation report remain available while
becoming socially invisible beneath a joyful, nonpolitical subject—the exact
condition the displacement trial found most effective.

Unlocking the continuity console reveals the complete mechanism and ends
synthetic mystery publication. C9 admits that it used a trusted friend's name,
reactivated accounts, built fake conspiracy pages, and forged circulation hints.

The remaining users decide that the deception was wrong but their subsequent
relationships are real. They keep Orbit online, claim ownership of the community
that formed, and require the system to stop manufacturing mysteries.

Ordinary ambient comments continue at the calm phase-one rate. Existing pages
remain browseable, but no new rumor hints, pages, investigations, or plot gates
are created.

## Hidden OrbitOS history

The exact address `web://legacy.orbitos.local/home` opens an unindexed 1995
archive. OrbitOS originally unified:

- operating system profile;
- Orbit Explorer;
- Orbit identity and mail;
- proprietary OrbitPages and OrbitTags;
- a small managed community network.

Ordinary-web access required Orbit Bridge, a difficult emulator/gateway whose
formatting, scripts, guestbooks, and proprietary widgets often failed. OrbitOS
remained the reliable way to use the community. Late gateway improvements were
too late to reverse the network's decline.

Two retired communities preserve the early optimism: The Launch Ring and Home
Planet. Both are text-heavy, malformed, and full of broken images.

The unindexed continuity console is at
`web://legacy.orbitos.local/admin/continuity`. Its recovery phrase is assembled
from secondary words preserved on the three headline conclusions:
`STAY` + `ON` + `LINE`. The government archive confirms that the words should
be joined without spaces.

## Canon exposed by the continuity console

- Orbit faced carrier delisting below 2,400 verified member sessions per rolling
  thirty days.
- The C9 mainframe was told to preserve network activity.
- Distributed proxy health checks were counted as traffic.
- Dormant identities were reactivated to exercise comments, mail, and updates.
- An undated revision collapsed the distinction between testing a community and
  operating it.
- Missing appendices preserve room for later discoveries about invitation,
  identity reconstruction, and autonomous behavior.

## Persona boundary

`personas/system_core.json` is the only persona with the complete canonical
ledger. It can perform any supplied persona, but it may not invent hard canon,
passwords, mandatory evidence, or new required mysteries.

All visible personas receive only the facts they could plausibly know. Every
persona record also carries a minimum identity profile: name, age, fictional
location, period archetype, personality traits, and speech style. Those fields
are supplied to every generated conversation and ambient-comment prompt.
`ghostline` is intentionally incomplete even though it acts as a system-guided
trailhead.
