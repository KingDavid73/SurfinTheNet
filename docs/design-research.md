# Design research: an interactive character-driven old web

This note combines four research passes: *Hypnospace Outlaw*, GeoCities and
late-1990s personal sites, Flash-era web design, and broader 1990s/2000s visual
culture. It separates observed precedents from decisions for this project.

## Product thesis

Build an authored old-web mystery where static pages remain dependable evidence,
but the people behind those pages can know the player, remember private
conversations, become more or less trusting, and change what they publish.

Generated dialogue should deepen or shorten an investigation, never be the only
route to a required clue. Game rules own relationship changes, schedules, plot
flags, and clue availability; the model owns phrasing and conversational texture.

## Lessons from Hypnospace Outlaw

Hypnospace uses themed Zones as social hubs. Its directory is intentionally
incomplete: unlisted pages are found through search, links, usernames, unusual
phrases, filenames, passwords, and relationships between members. The basic
investigation loop combines authored email, hub browsing, phrase search,
cross-referencing, tools, and exact evidence selection.

Its story advances through authored snapshots rather than a punishing continuous
deadline. Pages and relationships change between those snapshots. Characters
are understood through page design, writing voice, music, affiliations, other
people's remarks, and revisions over time; direct player communication is
limited. That gap is the clearest place for this game to become distinct.

Project decisions:

- Use a slow continuous clock for presence, reply latency, and atmosphere.
- Gate major story changes on both authored flags and minimum fictional times.
- Put characters into themed hubs that express communities, not just categories.
- Give important hidden pages at least two discovery handles.
- Repeat important facts through public, third-party, and private perspectives.
- Never make model variation capable of breaking the critical path.

Sources: [official site](https://www.hypnospace.net/),
[GameSpot review](https://www.gamespot.com/reviews/hypnospace-outlaw-review-weird-world-web/1900-6417106/),
[Steam description](https://store.steampowered.com/app/844590/Hypnospace_Outlaw/),
[Game Developer interview](https://www.gamedeveloper.com/business/road-to-the-igf-tholen-lasch-nelson-jr-and-cochran-s-i-hypnospace-outlaw-i-),
[Wireframe interview](https://www.mclibre.org/descargar/docs/revistas/wireframe/wireframe-04-en-201812.pdf).

## Period-authentic interaction channels

Treat the character homepage as their public "home." One site-colored comment
thread belongs on that homepage, not on every internal file.

Keep three channels socially distinct:

| Channel | Meaning | Timing | Game use |
| --- | --- | --- | --- |
| Homepage comments | Public and observable | Slow/asynchronous | Reactions, community performance, low-risk questions |
| Email | Private and deliberate | Asynchronous | Longer context, attachments, sensitive questions |
| AIM | Private and intimate | Presence-dependent | Fast rapport, away messages, time-specific opportunities |
| Guestbook | Public signature, not a dialogue | One-time | Social graph, handles, homepage links, small affinity change |

Historically, guestbooks acted like signing a book in a person's home rather than
parallel forums on each subpage. "Mail Me" links commonly sat at the end of
personal pages, while AIM exposed webpage-invoked `GoIM` and `AddBuddy` actions
plus online/offline status graphics.

Mutable relationship data belongs in the player's save, not the canonical
persona file. A useful character state is:

```text
relationship: -100..100
knownTopics: string[]
disclosedSecrets: string[]
lastContactAt: timestamp by channel
channelCooldowns: timestamp by channel
pendingReplies: message[]
plotOverrides: string[]
```

Suggested tone tiers are `<= -25` hostile/distrustful, `-24..24` guarded or
neutral, `25..59` friendly, and `>= 60` confiding. The number should remain
hidden; authored behavior, reply warmth, availability, and newly shared links
make it legible.

Sources: [1997 personal-homepage study](https://pages.gseis.ucla.edu/faculty/bates/articles/Home_pages-n_970614.html),
[archived GeoCities guestbook](https://www.geocities.ws/rosejune2401/archive.html),
[Olia Lialina on email links](https://art.teleportacia.org/observation/vernacular/email/),
[2002 EE Times AIM URL article](https://www.eetimes.com/ever-hear-of-aim-urls/).

## Hubs, links, and hidden pages

GeoCities neighborhoods grouped sites around identity and interest: family,
software, art, entertainment, and other social territories. Webrings provided
decentralized Previous, Next, Random, and List navigation. Guestbook signers,
friend-page button walls, webrings, and "cool links" made the web feel socially
constructed.

Use this discovery ladder:

```text
OrbitNet directory
  -> themed hub or neighborhood
     -> selected member homepages
        -> visible subpages
        -> friends, guestbook signers, webrings
        -> unlisted old files and private-looking paths
```

Page metadata should support:

```text
listed
hubId
ownerId
searchTerms
incoming clue phrases
earliest discoverable time
required flags/tools/passwords
page version or scheduled revision
```

Period-plausible hidden URLs should remain readable:
`/old/phonejack.html`, `/members/lyrics2.htm`, `/private/`, or `/below`.

Sources: [restored GeoCities gallery](https://geocities.restorativland.org/),
[Internet Archive GeoCities preservation note](https://blog.archive.org/2009/08/25/geocities-preserved/),
[Webring history](https://webring.com/webring-history/).

## Personal-web visual grammar

Do not apply every nostalgic motif to every page. Give each domain one primary
grammar and at most one secondary influence. Production quality should reveal
age, money, skill, and subculture.

Useful site archetypes:

- Newbie/family: tiled clouds or florals, centered welcome graphic, clashing
  serif/Comic Sans, pet photos, counter, last-updated line.
- Sci-fi/fan: star field, neon text, flames/sparkles, webring, image-button nav.
- Skilled hobbyist: narrow table layout, left rail, tiny Arial/Verdana,
  matched pixel buttons and a sliced masthead.
- Utilitarian/institutional: white/gray, dense serif text, restrained links,
  perhaps one badge or counter.
- Abandoned: old date, one broken image, dead external link, empty coming-soon
  file, inconsistent remnants of redesigns.

Empirical restraint matters. The 1997 homepage study found counters and patterned
backgrounds were common, but guestbooks appeared on a minority of pages and
audio on only about five percent. A believable network needs plain pages too.

Sources: [personal-homepage study](https://pages.gseis.ucla.edu/faculty/bates/articles/Home_pages-n_970614.html),
[Olia Lialina's vernacular-web essay](https://networkcultures.org/decadeofwebdesign/2014/06/05/olia-lialina/),
[Web Design Museum exhibitions](https://www.webdesignmuseum.org/exhibitions).

## Creator-made directory graphics

Zone and member-page entry graphics should feel authored by the people behind
the pages, not commissioned as one professional icon family. The useful lesson
from the [Hypnospace club-button archive](https://hypnospace-outlaw-rips.neocities.org/clubs/Clubs)
is variety in skill, materials, dimensions, and taste: one creator may use an
early Photoshop bevel and lens flare, another a scanned photograph with a crude
lasso edge, and another a Paint-style doodle or stretched clip-art image.

Production rules:

- Generate low-resolution contact sheets in a 4x4 grid when the set can share a
  research brief. Sixteen source graphics per sheet is the default efficiency
  target.
- Downsample directory crops to roughly 180 pixels wide before integration.
- Preserve jagged selections, dithering, scanner dust, JPEG halos, cheap preset
  effects, awkward whitespace, and inconsistent creator skill.
- Keep page names in HTML when image-generation lettering would be unreliable.
  The graphic can act as the creator-made badge beside the editable link label.
- Do not turn the network into a unified set of polished retro app icons.

For every future page batch, search [GifCities](https://gifcities.org/) for one
or two theme-appropriate archived GeoCities animations after the design research
is locked. Record the original GIF and archived-page provenance beside the
download, following the existing Yesterday Online `SOURCES.md` pattern.
[Internet Archive's GifCities update](https://blog.archive.org/2025/06/09/keep-on-gifin-a-new-version-of-gifcities-internet-archives-geocities-animated-gif-search-engine/)
documents semantic and size-filtered search. [Cameron's World](https://www.cameronsworld.net/)
is a useful composition reference for dense, personal, uneven collage rather
than a source to copy wholesale.

Future tiled-background passes should use the
[Hypnospace background archive](https://hypnospace-outlaw-rips.neocities.org/backgrounds/backgrounds)
as a reference for scale, repetition, contrast, and page-specific identity.
Create original tiles for OrbitNet instead of importing Hypnospace's shipped
art.

## Flash-era sites

Flash was a medium, not a single style. Its recognizable grammar was a fixed
stage, splash/ENTER screen, real preloader, scene transitions, custom four-state
buttons, environmental navigation, short looping motion, and tightly integrated
audio. It served futuristic agencies, film experiences, portfolios, cartoons,
games, photography, grunge, and art sites.

Use Flash-style sites sparingly:

- 65–75% ordinary HTML/personal pages
- 15–25% lightly animated hybrids
- 5–10% fully immersive fixed-stage microsites

A conspicuously expensive microsite among crude homepages can itself be a clue.
Implement original content with HTML/CSS/Web Animations and occasional Canvas,
not actual Flash. Preserve Back/Forward, deep links, mute controls, skip-intro
state, and reduced-motion behavior even when the historical precedent did not.

Sources: [Web Design Museum Flash archive](https://www.webdesignmuseum.org/flash-websites),
[Game Studies Flash history](https://www.gamestudies.org/2503/articles/bahia),
[*Pretty Loaded* exhibition](https://movingimage.org/archived-events/pretty-loaded/),
[NN/g Flash usability report](https://media.nngroup.com/media/reports/free/Website_Tools_and_Applications_with_Flash.pdf),
[Electron security checklist](https://www.electronjs.org/docs/latest/tutorial/security).

## Broader style palette

These are separate historical dialects, not interchangeable "retro" decoration:

| Grammar | Approximate period | Visual ingredients | Strong hub/character use |
| --- | --- | --- | --- |
| Wacky postmodern commercial | late 1980s–mid 1990s | teal, purple, hot pink, checker, zigzags, confetti | arcade, school media club, novelty shop |
| Digital New Wave | mid 1980s–mid 1990s | pixels, scanner noise, spectral gradients, cosmic symbols | multimedia artist, new-age technologist |
| California grunge | 1989–97 | dirty white, rust, distressed type, tape, photocopies, broken grids | zine, skater, unreliable diarist |
| Acid rave DIY | 1988–94 | fluorescent cartoons, photocopy dirt, smileys, dense flyer type | pirate radio, party rumors |
| Techno/cyber-industrial | 1993–2003 | black/gray, signal accent, microtype, serials, barcodes, warning marks | label, hacker collective, hidden server |
| Optimistic Y2K | 1997–2003 | ice blue, white, chrome, translucent candy colors, rounded pods | dot-com, gadgets, pop futurist |
| Corporate clean | 1990s–2000s | white/navy/gray, strict grid, restrained sans and photography | directory, employer, institution |
| Teen bedroom pop | 1997–2004 | lavender, pink, lime, silver, butterflies, stickers, glitter | diary, fan page, friend group |
| Eco/coffeehouse | early–mid 1990s | kraft, forest, burgundy, woodcut leaves, earnest hand lettering | activist, café, nature club |

Historical cautions:

- Memphis was primarily an early-1980s movement; late "wacky pomo" is its
  commercial afterlife, not Memphis itself.
- Grunge is material/editorial disruption, not merely a dark palette.
- Acid-rave DIY and disciplined techno branding are related but distinct.
- Y2K futurism is not everything from the 2000s.
- McBling, Superflat/kawaii, Visual Kei, and Gothic Lolita are separate cultural
  languages.
- Vaporwave is a later nostalgic label.
- Frutiger Aero and consolidated Web 2.0 styling belong later than 1998–2001.

Sources: [Design Museum on Memphis](https://designmuseum.org/memphis),
[V&A postmodernism](https://www.vam.ac.uk/collections/postmodernism/),
[MoMA digital fonts](https://www.moma.org/explore/inside_out/2011/01/24/digital-fonts-23-new-faces-in-moma-s-collection/),
[Cooper Hewitt experimental typography](https://www.cooperhewitt.org/2019/10/14/jennifer-morla-experimental-typography/),
[V&A Dundee club graphics](https://www.vam.ac.uk/dundee/articles/ten-iconic-graphics-from-club-culture-history),
[MoMA iMac](https://www.moma.org/collection/works/82133).

## Scope rule

Implement metadata, authored state transitions, and reliable investigation
routes before attempting a general social-network or fake-web authoring engine.
Character interaction is the differentiator, but the authored mystery remains
the spine.
