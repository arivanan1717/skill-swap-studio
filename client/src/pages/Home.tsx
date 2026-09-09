import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronRight,
  CircleUserRound,
  Code2,
  Compass,
  Filter,
  HeartHandshake,
  Link2,
  Menu,
  MessageCircle,
  Play,
  Search,
  Sparkles,
  Star,
  UsersRound,
  Wand2,
  X,
  Zap,
} from "lucide-react";

type Match = {
  name: string;
  role: string;
  avatar: string;
  initials: string;
  teaches: string;
  wants: string;
  score: number;
  color: string;
  meta: string;
};

const matches: Match[] = [
  {
    name: "Maya Chen",
    role: "Motion designer · Singapore",
    avatar: "https://i.pravatar.cc/160?img=47",
    initials: "MC",
    teaches: "Video editing",
    wants: "Python basics",
    score: 96,
    color: "coral",
    meta: "12 swaps completed",
  },
  {
    name: "Ethan Okafor",
    role: "Creative coder · London",
    avatar: "https://i.pravatar.cc/160?img=12",
    initials: "EO",
    teaches: "Python",
    wants: "Brand strategy",
    score: 91,
    color: "blue",
    meta: "8 swaps completed",
  },
  {
    name: "Sofia Alvarez",
    role: "Brand strategist · Mexico City",
    avatar: "https://i.pravatar.cc/160?img=32",
    initials: "SA",
    teaches: "Brand strategy",
    wants: "Motion design",
    score: 87,
    color: "gold",
    meta: "17 swaps completed",
  },
  {
    name: "Noah Williams",
    role: "Product builder · Austin",
    avatar: "https://i.pravatar.cc/160?img=68",
    initials: "NW",
    teaches: "No-code tools",
    wants: "Public speaking",
    score: 84,
    color: "mint",
    meta: "5 swaps completed",
  },
];

const genres = [
  { name: "Creative tools", count: "1,240 people", accent: "coral", icon: Sparkles },
  { name: "Code & data", count: "890 people", accent: "blue", icon: Code2 },
  { name: "Business brain", count: "620 people", accent: "gold", icon: Zap },
  { name: "Life & languages", count: "1,080 people", accent: "mint", icon: Compass },
];

const steps = [
  { number: "01", title: "Find", copy: "Tell us what you can teach and what you are curious about.", icon: Search },
  { number: "02", title: "Smart match", copy: "Our matching layer finds the overlap worth showing up for.", icon: Wand2 },
  { number: "03", title: "Swap", copy: "Meet for a focused session. No invoices. Just useful exchange.", icon: HeartHandshake },
  { number: "04", title: "Verify", copy: "Both sides confirm the handoff and build a reputation that travels.", icon: BadgeCheck },
  { number: "05", title: "Connect", copy: "Keep the relationship open for the next idea, project, or swap.", icon: Link2 },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Avatar({ match, large = false }: { match: Match; large?: boolean }) {
  return (
    <div className={`avatar ${large ? "avatar-large" : ""} avatar-${match.color}`}>
      <img src={match.avatar} alt={`${match.name} avatar`} onError={(event) => { event.currentTarget.style.display = "none"; }} />
      <span>{match.initials}</span>
      <i aria-hidden="true" />
    </div>
  );
}

function AppLogo() {
  return (
    <button className="brand" onClick={() => scrollToId("top")} aria-label="Go to top">
      <span className="brand-mark"><span /><span /><span /></span>
      <span className="brand-name">swap<span>/</span>space</span>
    </button>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All skills");
  const [selectedSkill, setSelectedSkill] = useState("Video editing");
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredMatches = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return matches.filter((match) => {
      const matchesQuery = !normalized || `${match.name} ${match.teaches} ${match.wants} ${match.role}`.toLowerCase().includes(normalized);
      const matchesGenre = activeGenre === "All skills" ||
        (activeGenre === "Creative tools" && ["Video editing", "Motion design"].includes(match.teaches)) ||
        (activeGenre === "Code & data" && ["Python", "No-code tools"].includes(match.teaches)) ||
        (activeGenre === "Business brain" && match.teaches === "Brand strategy") ||
        (activeGenre === "Life & languages" && match.wants === "Public speaking");
      return matchesQuery && matchesGenre;
    });
  }, [activeGenre, query]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };

  return (
    <div className="site-shell" id="top">
      <header className="topbar">
        <div className="topbar-inner">
          <AppLogo />
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
            <button onClick={() => { scrollToId("explore"); setMenuOpen(false); }}>Explore</button>
            <button onClick={() => { scrollToId("how-it-works"); setMenuOpen(false); }}>How it works</button>
            <button onClick={() => { scrollToId("manifesto"); setMenuOpen(false); }}>Why swap?</button>
          </nav>
          <div className="topbar-actions">
            <button className="text-button" onClick={() => showNotice("Sign in is coming to the beta soon.")}>Sign in</button>
            <button className="nav-cta" onClick={() => scrollToId("explore")}>Start swapping <ArrowUpRight size={15} /></button>
          </div>
          <button className="mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow eyebrow-light"><span className="live-dot" /> Design Championship 2026 <span className="eyebrow-divider" /> A new kind of network</div>
            <h1 id="hero-title">Swap skills.<br /><em>Skip the bills.</em></h1>
            <p className="hero-copy">A living network for people who teach what they know<br className="desktop-break" /> and learn what they need — one useful exchange at a time.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollToId("explore")}>Find your match <ArrowRight size={18} /></button>
              <button className="play-button" onClick={() => scrollToId("how-it-works")}><span><Play size={13} fill="currentColor" /></span> See how it works</button>
            </div>
          </div>
          <div className="hero-profile orbit-profile" aria-hidden="true">
            <div className="orbit-line orbit-one" /><div className="orbit-line orbit-two" />
            <div className="demo-avatar"><CircleUserRound size={40} strokeWidth={1.1} /></div>
            <div className="orbit-tag tag-top"><Sparkles size={13} /> open to learn</div>
            <div className="orbit-tag tag-bottom"><span className="tiny-avatar">MC</span> Maya is looking for you</div>
          </div>
          <div className="hero-footnote"><span>01</span><span className="footnote-line" /><span>Where knowledge moves freely</span></div>
          <button className="scroll-cue" onClick={() => scrollToId("manifesto")} aria-label="Scroll to learn more"><span>Scroll to explore</span><ArrowDownRight size={18} /></button>
        </section>

        <section className="manifesto section-pad" id="manifesto">
          <div className="section-kicker"><span>01 / THE PROBLEM</span><span>Learning should feel reciprocal</span></div>
          <div className="manifesto-layout">
            <div>
              <h2>The internet is full of answers.<br /><span>It is missing the right people.</span></h2>
              <p className="section-lede">Courses are one-way. Marketplaces put a price on every conversation. Swap/space makes learning feel more like a good introduction: mutual, specific, and worth coming back to.</p>
              <button className="underlined-button" onClick={() => scrollToId("how-it-works")}>Meet the model <ArrowUpRight size={17} /></button>
            </div>
            <div className="quote-stack">
              <div className="quote-card quote-card-main"><span className="quote-mark">“</span><p>I know Python, but who actually wants to learn it?</p><span className="quote-author">— Ethan, creative coder</span></div>
              <div className="quote-card quote-card-small"><span className="quote-mark">“</span><p>Where do I start with video?</p><span className="quote-author">— Maya, motion designer</span></div>
              <div className="plus-orb">+</div>
            </div>
          </div>
        </section>

        <section className="explore-section section-pad" id="explore">
          <div className="explore-heading">
            <div><div className="section-kicker"><span>02 / THE CATALOG</span><span>Browse by energy</span></div><h2>Find a skill.<br /><em>Find your people.</em></h2></div>
            <p>Search the living catalog of people who are ready to trade notes, shortcuts, context, and a little momentum.</p>
          </div>
          <div className="catalog-toolbar">
            <div className="search-field"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a skill, person, or goal" aria-label="Search the skill catalog" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}</div>
            <button className="filter-button"><Filter size={16} /> Filters <span>2</span></button>
          </div>
          <div className="genre-row">
            <button className={activeGenre === "All skills" ? "genre-pill is-active" : "genre-pill"} onClick={() => setActiveGenre("All skills")}>All skills <span>3,830</span></button>
            {genres.map((genre) => { const Icon = genre.icon; return <button key={genre.name} className={`genre-pill ${activeGenre === genre.name ? "is-active" : ""}`} onClick={() => setActiveGenre(genre.name)}><Icon size={16} /> {genre.name} <span>{genre.count.split(" ")[0]}</span></button>; })}
          </div>
          <div className="catalog-layout">
            <div className="catalog-side-note"><span className="side-note-number">24<span>h</span></span><span>Average time to<br />your first reply</span></div>
            <div className="match-rail">
              {filteredMatches.length === 0 ? <div className="empty-state">No exact match yet. Try another skill or browse the full catalog.</div> : filteredMatches.map((match, index) => (
                <button className={`match-card ${selectedMatch?.name === match.name ? "is-selected" : ""}`} key={match.name} onClick={() => setSelectedMatch(match)} style={{ "--card-index": index } as React.CSSProperties}>
                  <div className={`match-card-top ${match.color}`}><span className="match-score"><Sparkles size={13} /> {match.score}% match</span><span className="match-arrow"><ArrowUpRight size={17} /></span><Avatar match={match} large /></div>
                  <div className="match-card-body"><div className="match-name-row"><span><strong>{match.name}</strong><small>{match.role}</small></span><span className="status-dot" /></div><div className="swap-line"><span className="label-teach">can teach</span><strong>{match.teaches}</strong><ArrowRight size={15} /><span className="label-want">wants</span><strong>{match.wants}</strong></div><div className="match-card-meta"><span><Star size={13} fill="currentColor" /> 4.9</span><span>{match.meta}</span></div></div>
                </button>
              ))}
            </div>
          </div>
          <div className="catalog-footer"><span>Showing {filteredMatches.length} of 3,830 people open to swap</span><button onClick={() => showNotice("The full catalog is opening soon in the beta.")}>See all people <ArrowRight size={16} /></button></div>
        </section>

        <section className="how-section section-pad" id="how-it-works">
          <div className="section-kicker"><span>03 / THE LOOP</span><span>Simple by design</span></div>
          <div className="how-heading"><h2>Less “take a course.”<br /><em>More “make a connection.”</em></h2><p>Knowledge gets more valuable when it has somewhere to go. Five lightweight steps turn a vague curiosity into a real exchange.</p></div>
          <div className="steps-grid">{steps.map((step) => { const Icon = step.icon; return <div className="step-card" key={step.number}><div className="step-card-top"><span>{step.number}</span><Icon size={20} /></div><h3>{step.title}</h3><p>{step.copy}</p><ChevronRight className="step-arrow" size={20} /></div>; })}</div>
        </section>

        <section className="swap-feature section-pad">
          <div className="swap-feature-copy"><div className="section-kicker"><span>04 / THE EXCHANGE</span><span>Two sides. One good loop.</span></div><h2>Trade your<br /><em>unfair advantage.</em></h2><p>Maybe you know how to make a pitch land. Maybe they know how to make a prototype sing. Swap/space is where those two things meet.</p><button className="underlined-button" onClick={() => { setSelectedSkill("Python"); scrollToId("explore"); }}>Explore a live swap <ArrowUpRight size={17} /></button></div>
          <div className="exchange-visual"><div className="exchange-glow" /><div className="exchange-person person-left"><Avatar match={matches[0]} large /><strong>Maya</strong><span>teaches</span><b>Video editing</b></div><div className="exchange-core"><div className="exchange-arrow arrow-left"><ArrowRight size={19} /></div><div className="exchange-symbol">↔</div><div className="exchange-arrow arrow-right"><ArrowRight size={19} /></div><small>reciprocal by design</small></div><div className="exchange-person person-right"><Avatar match={matches[1]} large /><strong>Ethan</strong><span>teaches</span><b>Python</b></div><div className="exchange-caption"><span className="caption-dot" /> matched on 4 shared goals</div></div>
        </section>

        <section className="trust-section section-pad">
          <div className="trust-panel"><div className="trust-copy"><div className="section-kicker"><span>05 / THE TRUST LAYER</span><span>Good swaps compound</span></div><h2>Not a rating.<br /><em>A track record.</em></h2><p>Both people verify the exchange. Useful contributions build a reputation that says more than five stars ever could.</p><button className="ghost-button" onClick={() => showNotice("Your reputation starts with your first useful swap.")}>How verification works <ArrowRight size={16} /></button></div><div className="reputation-card"><div className="rep-head"><span><BadgeCheck size={18} /> verified swap</span><span>just now</span></div><div className="rep-people"><div className="rep-person"><Avatar match={matches[0]} /><span>Maya</span></div><div className="rep-connector"><Check size={16} /><span>completed</span></div><div className="rep-person"><Avatar match={matches[1]} /><span>Ethan</span></div></div><div className="rep-stat"><div><strong>+12</strong><span>swap credits</span></div><div><strong>4.9</strong><span>experience rating</span></div><div><strong>02</strong><span>new connections</span></div></div><div className="rep-quote"><MessageCircle size={17} /><span>“Came for Python, stayed for the way Maya thinks.”</span></div></div></div>
        </section>

        <section className="final-cta section-pad"><div className="final-orbit" aria-hidden="true" /><div className="final-cta-content"><div className="eyebrow"><span className="live-dot" /> The network is warming up</div><h2>What could you<br /><em>teach each other?</em></h2><p>Bring one skill. Leave with a new one, a better question, and maybe a collaborator.</p><button className="primary-button" onClick={() => scrollToId("explore")}>Start your swap <ArrowRight size={18} /></button></div></section>
      </main>

      <footer className="footer"><div className="footer-top"><AppLogo /><span className="footer-note">A reciprocal learning network<br />for the curious.</span><div className="footer-links"><button onClick={() => scrollToId("explore")}>Explore</button><button onClick={() => scrollToId("how-it-works")}>How it works</button><button onClick={() => showNotice("About Swap/space is coming soon.")}>About</button></div><div className="footer-social"><button aria-label="Community"><UsersRound size={17} /></button><button aria-label="Messages"><MessageCircle size={17} /></button></div></div><div className="footer-bottom"><span>© 2026 swap/space</span><span>Built for Design Championship</span><span>Made for people who share</span></div></footer>

      {selectedMatch && <div className="match-drawer-backdrop" onClick={() => setSelectedMatch(null)}><aside className="match-drawer" onClick={(event) => event.stopPropagation()}><button className="drawer-close" onClick={() => setSelectedMatch(null)} aria-label="Close match details"><X size={19} /></button><div className={`drawer-avatar ${selectedMatch.color}`}><Avatar match={selectedMatch} large /></div><div className="drawer-kicker"><Sparkles size={13} /> {selectedMatch.score}% compatible</div><h2>{selectedMatch.name}</h2><p className="drawer-role">{selectedMatch.role}</p><div className="drawer-divider" /><div className="drawer-swap"><div><span>They can teach</span><strong>{selectedMatch.teaches}</strong></div><ArrowRight size={18} /><div><span>They want to learn</span><strong>{selectedMatch.wants}</strong></div></div><p className="drawer-copy">Your goals overlap in the right places. Start with a 45-minute exchange and see where the conversation goes.</p><div className="drawer-trust"><BadgeCheck size={17} /><span>{selectedMatch.meta} <b>·</b> 4.9 average rating</span></div><button className="primary-button drawer-button" onClick={() => { setSelectedMatch(null); showNotice(`Intro request sent to ${selectedMatch.name}.`); }}>Suggest a swap <ArrowRight size={17} /></button></aside></div>}
      {notice && <div className="notice"><Check size={16} /> {notice}</div>}
    </div>
  );
}
