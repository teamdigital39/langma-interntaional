import { useState, useRef, useEffect } from "react";
import API_BASE from "../../config";

// Cultural activities and experiences carousel, shown near the reviews
const ACTIVITIES = [
  {
    title: "Oktoberfest 2025",
    tag: "Festival",
    text: "A lively celebration of German culture at Langma, bringing students and team members together through music, food, games and festive spirit.",
    image: "/images/1.jpg",
    alt: "Students and team members celebrating Oktoberfest 2025 at Langma",
  },
  {
    title: "Oktoberfest 2025",
    tag: "Celebration",
    text: "From traditional-inspired decorations to joyful group moments, our Oktoberfest celebration created a fun and memorable German cultural experience.",
    image: "/images/2.jpg",
    alt: "Langma students enjoying the Oktoberfest 2025 celebration",
  },
  {
    title: "Langma Spotlight",
    tag: "Activities",
    text: "A showcase of creativity and participation, featuring face painting, fun activities, sweet treats, creative bookmarks and plenty of festive moments.",
    image: "/images/3.jpg",
    alt: "Students participating in creative activities during Oktoberfest at Langma",
  },
  {
    title: "Langma Performers",
    tag: "Entertainment",
    text: "Music, dance and laughter took centre stage as Langma students showcased their talents and brought the Oktoberfest celebration to life.",
    image: "/images/4.jpg",
    alt: "Langma students performing music and dance during Oktoberfest",
  },
  {
    title: "Team Langma",
    tag: "Community",
    text: "Celebrating together beyond the classroom, the Langma team came together to share smiles, memories and the spirit of Oktoberfest.",
    image: "/images/5.jpg",
    alt: "Team Langma celebrating together at Oktoberfest 2025",
  },
];

// German language certification exam badges shown in the hero exam strip
const EXAM_BADGES = [
  { code: "Goethe", subtitle: "Zertifikat", ring: "#E30613", accent: "#0A2422", letter: "G" },
  { code: "TestDaF", subtitle: "Deutsch als Fremdsprache", ring: "#003A70", accent: "#E30613", letter: "T" },
  { code: "telc", subtitle: "Deutsch A1–C2", ring: "#DA291C", accent: "#0A2422", letter: "t" },
  { code: "ÖSD", subtitle: "Sprachdiplom", ring: "#C8102E", accent: "#000000", letter: "Ö" },
  { code: "DSH", subtitle: "Hochschulzugang", ring: "#000000", accent: "#FFCC00", letter: "D" },
  { code: "DSD", subtitle: "Deutsches Sprachdiplom", ring: "#B0122B", accent: "#E30613", letter: "D" },
  { code: "BAMF", subtitle: "Integration Certified", ring: "#000000", accent: "#DD0000", letter: "B" },
];

// CEFR proficiency ladder infographic data
const CEFR_LEVELS = [
  { code: "A1", name: "Foundations", pct: 26 },
  { code: "A2", name: "Everyday German", pct: 40 },
  { code: "B1", name: "Independent Use", pct: 55 },
  { code: "B2", name: "Fluent Exchange", pct: 71 },
  { code: "C1", name: "Advanced Command", pct: 86 },
  { code: "C2", name: "Mastery", pct: 100 },
];

// Cumulative self-study hours to reach each CEFR level (commonly cited Goethe-Institut estimates)
const STUDY_HOURS = [
  { level: "A1", hrs: "50 hrs", pct: 10 },
  { level: "A2", hrs: "50 hrs", pct: 20 },
  { level: "B1", hrs: "50 hrs", pct: 38 },
  { level: "B2", hrs: "50 hrs", pct: 62 },
  { level: "C1", hrs: "50 hrs", pct: 85 },
  { level: "C2", hrs: "50 hrs", pct: 100 },
];

const CURRICULUM = [
  {
    level: "Level 01 · A1",
    title: "Foundations",
    text: "Build the base you need to start understanding and using German.",
    items: ["The alphabet & pronunciation", "Der/die/das and basic cases", "Greetings & introductions", "Everyday vocabulary", "Simple present-tense sentences"],
  },
  {
    level: "Level 02 · A2",
    title: "Everyday German",
    text: "Move from basic phrases into more independent everyday communication.",
    items: ["Expanded grammar & vocabulary", "Past tense (Perfekt)", "Daily-life conversations", "Reading simple notices & texts", "A2 exam preparation"],
  },
  {
    level: "Level 03 · B1",
    title: "Independent Use",
    text: "Develop longer conversations and wider real-world German.",
    items: ["Subordinate clauses", "Expressing opinions & plans", "Workplace vocabulary", "Longer reading passages", "B1 exam & Einbürgerung prep"],
  },
  {
    level: "Level 04 · B2",
    title: "Fluent Exchange",
    text: "Build stronger comprehension and communication for professional life.",
    items: ["Complex sentence structures", "Passive voice & Konjunktiv", "News & workplace German", "Formal writing & letters", "B2 exam preparation"],
  },
  {
    level: "Level 05 · C1",
    title: "Advanced Command",
    text: "Handle complex written and spoken German with precision.",
    items: ["Nuanced grammar structures", "Academic & technical vocabulary", "Abstract & formal discussion", "High-level reading & listening", "C1 / TestDaF preparation"],
  },
  {
    level: "Level 06 · C2",
    title: "Mastery",
    text: "Communicate at a near-native level across any context.",
    items: ["Idiomatic & stylistic nuance", "Literary & scientific texts", "Public speaking & debate", "Editing & precision writing", "C2 exam preparation"],
  },
];

const AUDIENCE = [
  { num: "Students", title: "Study in Germany", text: "Build German proficiency for Studienkolleg, university admission and DSH-level academic pathways.", icon: <><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></> },
  { num: "Career", title: "Work in Germany", text: "Prepare for workplace German, interviews and the Ausbildung or skilled-worker route.", icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></> },
  { num: "Healthcare", title: "Nursing & Care Jobs", text: "Build the B1/B2 German that hospitals and care homes look for, plus ward-specific vocabulary.", icon: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/> },
  { num: "Personal", title: "Travel & Culture", text: "Learn practical German for travel, conversation, German media and cultural understanding.", icon: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></> },
];

const METHOD_STEPS = [
  { no: "01 / LEARN", title: "Understand", text: "Learn grammar, vocabulary, cases and pronunciation through structured lessons.", icon: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.05V17h6v-.25c0-.85.4-1.55 1-2.05A7 7 0 0 0 12 2z"/> },
  { no: "02 / PRACTISE", title: "Use it", text: "Apply new language through drills, exercises, dialogues and guided activities.", icon: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></> },
  { no: "03 / SPEAK", title: "Communicate", text: "Build confidence through conversation, role plays and real-life German scenarios.", icon: <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></> },
  { no: "04 / CULTURE", title: "Experience Germany", text: "Learn German etiquette, traditions, workplace customs and everyday life through cultural context.", icon: <><path d="M5 21V4"/><path d="M5 4h14l-3 4 3 4H5"/></> },
  { no: "05 / ASSESS", title: "Measure", text: "Use tests and feedback to identify gaps and keep your learning on track.", icon: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 3v2h6V3M9 12l2 2 4-4"/></> },
  { no: "06 / PROGRESS", title: "Advance", text: "Move towards your next level, exam, study route or career objective.", icon: <><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></> },
];

const INCLUDED_ITEMS = [
  "Live instructor-led German classes",
  "A1–C2 structured learning pathway",
  "Speaking, listening, reading & writing practice",
  "Grammar & vocabulary development",
  "German exam preparation",
  "Mock tests & progress assessment",
  "Cultural & real-life communication practice",
  "Online, offline & hybrid learning options",
  "Goal-based counselling for Germany pathways",
];

const EXAM_COMPARE = [
  { exam: "Goethe-Zertifikat", known: "General German proficiency", levels: "A1–C2", useful: "Visa, university and general proficiency requirements" },
  { exam: "TestDaF", known: "Academic German", levels: "TDN 3–5 (≈B2–C1)", useful: "University admission in Germany" },
  { exam: "telc Deutsch", known: "Practical, everyday German", levels: "A1–C2", useful: "Visa, Einbürgerung and workplace requirements" },
  { exam: "DSH", known: "University-entrance German", levels: "DSH-1 to DSH-3", useful: "Direct admission to German universities" },
];

const BATCHES = [
  { tag: "Online", title: "Live Online Batch", meta: [["Level", "A1 / A2 / B1 / B2 / C1"], ["Format", "Instructor-led"], ["Timings", "Ask for current schedule"]], msg: "Hi Langma, I'd like the latest German online batch details." },
  { tag: "South Delhi", title: "Classroom Batch", meta: [["Location", "South Extension I"], ["Format", "Face-to-face"], ["Timings", "Ask for current schedule"]], msg: "Hi Langma, I'd like the latest German classroom batch details." },
  { tag: "Flexible", title: "Hybrid Batch", meta: [["Format", "Online + classroom"], ["Level", "Based on availability"], ["Timings", "Ask for current schedule"]], msg: "Hi Langma, I'd like the latest German hybrid batch details." },
];

const FAQS = [
  { q: "Do I need any prior knowledge of German to join?", a: "No, most of our learners start at A1 with zero German. Classes are structured so complete beginners build confidence from the very first session." },
  { q: "What's the hardest part of learning German?", a: "Most learners find noun genders (der, die, das) and the case system the trickiest part. Once the pattern clicks with enough live practice, it stops being a wall and starts becoming automatic." },
  { q: "How long does it take to become conversational?", a: "Most learners feel comfortable with everyday conversation by the end of A2–B1, usually within a few months of consistent classes, depending on how many hours a week you can commit." },
  { q: "Can I also prepare for an exam like Goethe or TELC?", a: "Yes, once you're at the right level, we offer focused certificate preparation for Goethe-Zertifikat, TestDaF, telc and DSH alongside the regular course, for anyone who needs one for a visa or university application." },
  { q: "What's the difference between online, offline, and hybrid batches?", a: "All three follow the same curriculum and expert trainers. Online is fully remote, offline meets in person at our South Delhi centre, and hybrid lets you mix the two around your week." },
  { q: "How big are the batches?", a: "We keep batches small so everyone gets real speaking practice and individual feedback, rather than sitting through a one-way lecture." },
  { q: "Can I start German from zero?", a: "Yes. The pathway begins at A1, and the programme is structured for learners with no prior German knowledge as well as learners joining at a higher level." },
  { q: "How do I know which level I should join?", a: "A counsellor can help identify the appropriate starting point based on your previous German study, current ability and objective." },
  { q: "Do you offer a free demo class?", a: "You can request a German demo or speak with a counsellor to understand the teaching format, level and current batch options." },
  { q: "Do you provide Germany career or visa guidance?", a: "Germany pathway support is available for the routes described on this page, including Ausbildung, healthcare jobs and the Chancenkarte. Exact eligibility and immigration decisions depend on the applicable requirements." },
];

// Real photography used across the page (Unsplash, free license)
const PHOTOS = {
  brandenburgWide: "images/Pick-your-platform.png",
  brandenburgClose: "images/Pick-your-platform.png",
  studyDesk: "images/Pick-your-platform.png",
  loveToLearn: "images/Deutsch.png",
};

export default function LangmaGermanCourse() {
  const [phoneError, setPhoneError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showWaTip, setShowWaTip] = useState(false);
  const phoneRef = useRef(null);

  const [heroPhoneError, setHeroPhoneError] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroFormMessage, setHeroFormMessage] = useState("");
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const heroPhoneRef = useRef(null);

  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [activitySlideIndex, setActivitySlideIndex] = useState(0);
  const activityTouchStartX = useRef(null);
  const activityTouchDeltaX = useRef(0);

  useEffect(() => {
    function updateSlidesPerView() {
      const w = window.innerWidth;
      if (w <= 780) setSlidesPerView(1);
      else if (w <= 1100) setSlidesPerView(2);
      else if (w <= 1480) setSlidesPerView(3);
      else setSlidesPerView(4);
    }
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  useEffect(() => {
    setActivitySlideIndex((i) => Math.min(i, Math.max(0, ACTIVITIES.length - slidesPerView)));
  }, [slidesPerView]);

  useEffect(() => {
    if (isPaused) return;
    const activityMax = Math.max(0, ACTIVITIES.length - slidesPerView);
    const timer = setInterval(() => {
      setActivitySlideIndex((i) => (i >= activityMax ? 0 : i + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [slidesPerView, isPaused]);

  function goToActivitySlide(i) {
    const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
    setActivitySlideIndex(Math.min(Math.max(i, 0), maxIndex));
  }
  function nextActivitySlide() {
    const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
    setActivitySlideIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }
  function prevActivitySlide() {
    const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
    setActivitySlideIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }
  function handleActivityTouchStart(e) {
    activityTouchStartX.current = e.touches[0].clientX;
    activityTouchDeltaX.current = 0;
    setIsPaused(true);
  }
  function handleActivityTouchMove(e) {
    if (activityTouchStartX.current === null) return;
    activityTouchDeltaX.current = e.touches[0].clientX - activityTouchStartX.current;
  }
  function handleActivityTouchEnd() {
    if (Math.abs(activityTouchDeltaX.current) > 45) {
      if (activityTouchDeltaX.current < 0) nextActivitySlide();
      else prevActivitySlide();
    }
    activityTouchStartX.current = null;
    activityTouchDeltaX.current = 0;
    setIsPaused(false);
  }

  useEffect(() => {
    setShowWaTip(true);
    const timer = setTimeout(() => setShowWaTip(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  async function submitLead(form, phoneValue, { setError, setSubmitted, setBusy, setMessage }) {
    if (!/^[0-9]{10}$/.test(phoneValue)) {
      setError(true);
      return;
    }

    setError(false);
    setBusy(true);
    setMessage("");

    const formData = new FormData(form);
    formData.set("mobile", phoneValue);
    formData.set("currenturl", window.location.href);
    formData.set("language", "German");
    if (!formData.get("message")) {
      formData.set("message", "German Language Course enquiry");
    }

    try {
      const res = await fetch(`${API_BASE}/apply-submit`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        setMessage("Thanks, our counsellor will call you shortly with the course fee and batch details. For an instant reply, message us on WhatsApp.");
        form.reset();
        return;
      }
      throw new Error("apply-submit failed");
    } catch {
      try {
        const fallback = await fetch(`${API_BASE}/api/contact-lead`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            mobile: phoneValue,
            message: formData.get("message") || "German Language Course enquiry",
            type: "German Landing",
            service: "Language Training - German",
          }),
        });
        if (fallback.ok) {
          setSubmitted(true);
          setMessage("Thanks, our counsellor will call you shortly with the course fee and batch details. For an instant reply, message us on WhatsApp.");
          form.reset();
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } catch {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await submitLead(e.target, phoneRef.current.value.trim(), {
      setError: setPhoneError,
      setSubmitted: setFormSubmitted,
      setBusy: setSubmitting,
      setMessage: setFormMessage,
    });
  }

  async function handleHeroSubmit(e) {
    e.preventDefault();
    await submitLead(e.target, heroPhoneRef.current.value.trim(), {
      setError: setHeroPhoneError,
      setSubmitted: setHeroSubmitted,
      setBusy: setHeroSubmitting,
      setMessage: setHeroFormMessage,
    });
  }

  const slideWidthPct = 100 / slidesPerView;
  const activityMaxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
  const activityDotCount = activityMaxIndex + 1;

  return (
    <div className="langma-page" id="top">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  :root{
    --header-h:74px;
    --ink:#181210;
    --ink-soft:#3f5652;
    --ink-mute:#5b7671;
    --paper:#FAF6EE;
    --paper-2:#F1E7D2;
    --prussian:#B0122B;
    --prussian-deep:#141110;
    --gold:#E8B02C;
    --gold-soft:#FCEFC7;
    --rust:#8C0F24;
    --rust-deep:#6E0C1D;
    --white:#FFFFFF;
    --de-black:#000000;
    --de-red:#DD0000;
    --de-gold:#FFCC00;
    --line: rgba(20,17,16,0.14);
    --line-strong: rgba(20,17,16,0.24);
    --line-soft: rgba(20,17,16,0.07);
    --line-on-dark: rgba(255,255,255,0.14);

    --r-sm:4px; --r-md:8px; --r-lg:14px; --r-pill:999px;
    --shadow-sm:0 2px 8px rgba(20,17,16,.08);
    --shadow-md:0 14px 34px -14px rgba(20,17,16,.32);
    --shadow-lg:0 28px 60px -20px rgba(20,17,16,.4);
    --section-pad: clamp(56px, 8vw, 96px);
    --ease: cubic-bezier(.65,0,.35,1);
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  section[id]{scroll-margin-top:calc(var(--header-h) + 14px);}
  .langma-page{
    background:var(--paper);
    color:var(--ink);
    font-family:'IBM Plex Sans', sans-serif;
    font-size:16px;
    line-height:1.55;
    -webkit-font-smoothing:antialiased;
    min-height:100vh;
    overflow-x:hidden;
    width:100%;
    max-width:100vw;
  }
  img{max-width:100%; display:block;}
  a{color:inherit;}
  .wrap{max-width:1180px; margin:0 auto; padding:0 32px; width:100%; box-sizing:border-box;}
  h1,h2,h3{font-family:'Fraunces', serif; font-weight:600; letter-spacing:-0.01em;}
  * { min-width: 0; }
  table, pre, code { min-width: unset; }
  ::selection{background:var(--gold); color:var(--prussian-deep);}
  :focus-visible{outline:2px solid var(--rust); outline-offset:2px;}
  @media (prefers-reduced-motion: reduce){*{animation:none !important; transition:none !important;}}

  /* ===== BUTTONS ===== */
  .btn{font-family:'IBM Plex Sans', sans-serif; font-weight:600; font-size:14px; padding:11px 20px; border-radius:var(--r-sm); border:1.5px solid transparent; display:inline-flex; align-items:center; gap:8px; cursor:pointer; text-decoration:none; white-space:nowrap; transition:transform .18s ease, box-shadow .18s ease, background .18s ease; max-width:100%;}
  .btn-primary{background:var(--rust); color:var(--white); box-shadow:var(--shadow-sm);}
  .btn-primary:hover{transform:translateY(-2px); box-shadow:0 8px 18px rgba(140,15,36,.35);}
  .btn-ghost{background:transparent; border-color:var(--ink); color:var(--ink);}
  .btn-ghost:hover{background:var(--ink); color:var(--paper);}
  .btn-wa{background:#25D366; color:#08350F;}
  .btn-wa:hover{transform:translateY(-2px); box-shadow:0 8px 18px rgba(37,211,102,.4);}
  .btn-sm{padding:9px 15px; font-size:13px;}

  /* ===== HEADER ===== */
  .de-header{background:rgba(250,246,238,.96); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); position:fixed; top:0; left:0; right:0; width:100%; height:var(--header-h); z-index:80; box-shadow:0 4px 18px rgba(20,17,16,.08);}
  .de-nav{min-height:74px; display:flex; align-items:center; justify-content:space-between; gap:24px;}
  .de-brand{display:flex; align-items:center; text-decoration:none;}
  .de-brand-text{display:flex; align-items:center; width:200px; min-width:150px; height:46px;}
  .de-brand-logo{width:100%; height:100%; object-fit:contain; object-position:left center; display:block;}
  .de-menu{display:flex; align-items:center; gap:18px; flex-wrap:wrap;}
  .de-menu .de-cta{background:var(--rust); color:#fff; padding:11px 18px; border-radius:var(--r-sm); font-size:13px; font-weight:600; text-decoration:none; transition:background .18s ease, transform .18s ease;}
  .de-menu .de-cta:hover{background:var(--rust-deep); transform:translateY(-1px);}

  /* ===== TOPBAR ===== */
  .flag-rule{height:4px; background:linear-gradient(90deg, var(--de-black) 0 33.33%, var(--de-red) 33.33% 66.66%, var(--de-gold) 66.66% 100%);}
  .topbar{background:var(--prussian-deep); color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:12.5px; margin-top:var(--header-h);}
  .topbar .wrap{display:flex; justify-content:center; align-items:center; padding:9px 32px;}
  .topbar-links{display:flex; justify-content:center; gap:8px 22px; flex-wrap:wrap; width:100%;}
  .topbar-links a{display:inline-flex; align-items:center; gap:8px; text-decoration:none; opacity:.92; white-space:nowrap;}
  .topbar-links a:hover{opacity:1; text-decoration:underline;}
  .topbar-icon{width:20px; height:20px; border-radius:50%; background:rgba(232,176,44,.16); border:1px solid rgba(232,176,44,.5); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .18s ease, transform .18s ease;}
  .topbar-links a:hover .topbar-icon{background:var(--gold); transform:translateY(-1px);}
  .topbar-icon svg{width:11px; height:11px; stroke:var(--gold-soft); transition:stroke .18s ease;}
  .topbar-links a:hover .topbar-icon svg{stroke:var(--prussian-deep);}

  /* ===== HERO ===== */
  .hero{position:relative; overflow:hidden; border-bottom:1px solid var(--line); max-width:100vw; padding:0;}
  .hero-wash{position:absolute; inset:0; pointer-events:none; background:
      radial-gradient(680px 560px at 92% 0%, rgba(232,176,44,.24), transparent 62%),
      radial-gradient(560px 480px at 2% 0%, rgba(176,18,43,.10), transparent 60%);}
  .hero-inner{position:relative; z-index:2; display:grid; grid-template-columns:1.15fr .85fr; gap:40px; padding:56px 32px 48px; max-width:1180px; margin:0 auto; align-items:start;}
  .hero-inner > div{min-width:0;}
  .hero-kicker{display:inline-flex; align-items:center; gap:9px; font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:.1em; text-transform:uppercase; color:var(--rust); margin-bottom:18px;}
  .hero-kicker-dot{width:7px; height:7px; border-radius:50%; background:var(--gold); box-shadow:0 0 0 3px rgba(232,176,44,.25); flex-shrink:0;}
  .hero-title{font-size:clamp(32px, 4.8vw, 64px); line-height:1.05; margin:0 0 22px; word-break:break-word;}
  .hero-title em{font-style:italic; color:var(--prussian); font-weight:500;}
  .hero-sub{font-size:17.5px; max-width:560px; color:var(--ink-soft); margin-bottom:34px;}
  .hero-actions{display:flex; gap:14px; flex-wrap:wrap; margin-bottom:30px;}
  .hero-stats{display:grid; grid-template-columns:repeat(4, 1fr); gap:16px 24px; border-top:1px solid var(--line); padding-top:22px;}
  .stat{padding-right:20px; border-right:1px solid var(--line); min-width:0;}
  .stat:last-child{border-right:none; padding-right:0;}
  .stat b{font-family:'Fraunces', serif; font-size:26px; display:block; color:var(--prussian); font-weight:700;}
  .stat span{font-size:12px; color:var(--ink-mute); font-family:'IBM Plex Mono', monospace; letter-spacing:.03em;}

  /* Ticket visual */
  .ticket{background:var(--prussian); color:var(--white); border-radius:var(--r-md); padding:0; position:relative; box-shadow:var(--shadow-lg); overflow:hidden; width:100%; max-width:100%; transition:transform .3s ease, box-shadow .3s ease;}
  .ticket:hover{transform:translateY(-4px); box-shadow:0 36px 74px -18px rgba(20,17,16,.45);}
  .ticket::before{content:''; position:absolute; top:0; left:0; right:0; height:7px; background:linear-gradient(90deg, var(--de-black) 0 33.33%, var(--de-red) 33.33% 66.66%, var(--de-gold) 66.66% 100%); z-index:3;}
  .ticket-top{padding:28px 26px 22px; border-bottom:1px solid rgba(255,255,255,.16); position:relative;}
  .ticket-notch{position:absolute; width:22px; height:22px; background:var(--paper); border-radius:50%; bottom:-11px;}
  .ticket-notch.left{left:-11px;} .ticket-notch.right{right:-11px;}
  .ticket-route{display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; gap:8px; flex-wrap:wrap;}
  .ticket-route .city{font-family:'Fraunces', serif; font-size:22px; font-weight:600;}
  .ticket-route .arrow{font-family:'IBM Plex Mono', monospace; color:var(--gold-soft); font-size:12px; text-align:center;}
  .ticket-route .sub{font-family:'IBM Plex Mono', monospace; font-size:10.5px; opacity:.65; letter-spacing:.08em; text-transform:uppercase; margin-top:3px;}
  .ticket-form-head{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--gold-soft); margin-bottom:14px;}
  .ticket-form .form-row{margin-bottom:12px;}
  .ticket-form-row{display:grid; grid-template-columns:1fr 1fr; gap:0 12px;}
  .ticket-form-row > .form-row{min-width:0;}
  .ticket-bottom{padding:16px 26px 22px; text-align:center;}
  .ticket-barcode{height:22px; max-width:170px; margin:0 auto 13px; opacity:.5; background-image:repeating-linear-gradient(90deg, rgba(255,255,255,.9) 0, rgba(255,255,255,.9) 2px, transparent 2px, transparent 5px, rgba(255,255,255,.9) 5px, rgba(255,255,255,.9) 6px, transparent 6px, transparent 10px);}
  .ticket-rating{font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--gold-soft); letter-spacing:.02em;}
  .field-error{display:block; margin-top:7px; font-size:12px; color:#FF8A80; font-family:'IBM Plex Sans', sans-serif;}

  /* ===== PHOTO STRIP ===== */
  .photo-strip{position:relative; z-index:2; background:var(--paper); padding:8px 0 4px;}
  .photo-strip-grid{display:grid; grid-template-columns:1.4fr 1fr 1fr; gap:14px;}
  .photo-tile{position:relative; border-radius:var(--r-sm); overflow:hidden; aspect-ratio:16/10; box-shadow:0 14px 30px -16px rgba(20,17,16,.35); border:1px solid var(--line);}
  .photo-tile img{width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease;}
  .photo-tile:hover img{transform:scale(1.06);}
  .photo-tile::after{content:''; position:absolute; inset:0; background:linear-gradient(180deg, transparent 50%, rgba(10,8,7,.72) 100%);}
  .photo-tile .tile-cap{position:absolute; left:14px; right:14px; bottom:12px; z-index:2; color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:.04em; text-transform:uppercase;}
  .photo-tile .tile-cap b{display:block; font-family:'Fraunces', serif; font-style:italic; font-size:17px; text-transform:none; letter-spacing:0; margin-bottom:2px;}
  @media (max-width:780px){ .photo-strip-grid{grid-template-columns:1fr 1fr;} .photo-strip-grid .photo-tile:first-child{grid-column:1 / -1;} }
  @media (max-width:480px){ .photo-strip-grid{grid-template-columns:1fr;} .photo-strip-grid .photo-tile:first-child{grid-column:auto;} }

  /* ===== EXAM BADGES STRIP ===== */
  .exam-strip{position:relative; z-index:2; background:linear-gradient(180deg, rgba(176,18,43,.05) 0%, var(--paper) 100%); border-top:1px dashed var(--line); padding:30px 0 8px; max-width:100vw; overflow:hidden;}
  .exam-strip .exam-head{text-align:center; margin-bottom:22px;}
  .exam-strip .exam-head .kicker{font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--rust); margin-bottom:6px; display:block;}
  .exam-strip .exam-head h3{font-family:'Fraunces', serif; font-size:clamp(20px, 2.4vw, 26px); color:var(--prussian-deep); font-weight:600; line-height:1.25;}
  .exam-strip .exam-head h3 em{font-style:italic; color:var(--rust);}
  .exam-row{display:flex; justify-content:center; align-items:center; gap:26px; flex-wrap:wrap; padding:6px 0;}
  .exam-badge{display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none; color:inherit; transition:transform .22s ease;}
  .exam-badge:hover{transform:translateY(-4px);}
  .exam-badge .badge-circle{width:78px; height:78px; border-radius:50%; background:var(--white); display:flex; align-items:center; justify-content:center; position:relative; box-shadow:var(--shadow-sm), 0 0 0 1px var(--line); overflow:hidden;}
  .exam-badge .badge-circle::before{content:''; position:absolute; inset:3px; border-radius:50%; border:2px solid var(--ring, var(--prussian)); background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.9), rgba(228,244,242,.6));}
  .exam-badge .badge-inner{position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%;}
  .exam-badge .badge-letter{font-family:'Fraunces', serif; font-weight:700; font-size:24px; color:var(--ring, var(--prussian-deep)); line-height:1; text-shadow:0 1px 0 rgba(255,255,255,.6);}
  .exam-badge .badge-code{font-family:'IBM Plex Sans', sans-serif; font-size:9px; font-weight:700; letter-spacing:.06em; color:var(--accent, #0A2422); margin-top:3px; text-transform:uppercase;}
  .exam-badge .badge-code.wide{letter-spacing:.02em;}
  .exam-badge .badge-flag{position:absolute; top:8px; left:50%; transform:translateX(-50%); width:22px; height:4px; border-radius:1px; overflow:hidden; display:flex; z-index:3; box-shadow:0 1px 2px rgba(0,0,0,.15);}
  .exam-badge .badge-flag i{flex:1; height:100%;}
  .exam-badge .badge-flag i:nth-child(1){background:#000;}
  .exam-badge .badge-flag i:nth-child(2){background:#DD0000;}
  .exam-badge .badge-flag i:nth-child(3){background:#FFCC00;}
  .exam-badge .badge-caption{font-family:'IBM Plex Mono', monospace; font-size:10.5px; letter-spacing:.04em; color:var(--ink-mute); text-align:center; max-width:96px; line-height:1.3;}
  .exam-badge .badge-caption b{color:var(--prussian-deep); font-weight:600; font-family:'IBM Plex Sans', sans-serif;}

  /* ===== SECTION RHYTHM ===== */
  section[id]{padding:var(--section-pad) 0; max-width:100vw; overflow-x:hidden;}
  .sec-head{max-width:660px; margin-bottom:40px;}
  .sec-head h2{font-size:clamp(28px,3.4vw,42px); line-height:1.08;}
  .sec-head p{color:var(--ink-soft); font-size:16px; margin-top:12px; max-width:580px;}
  .sec-head-row{display:flex; align-items:center; justify-content:flex-start; gap:32px; margin-bottom:40px;}
  .sec-head-row .sec-head{margin-bottom:0;}
  .sec-icon-big{flex-shrink:0; width:108px; height:108px; color:var(--rust); opacity:.9;}
  .sec-icon-big svg{width:100%; height:100%;}
  @media (max-width:720px){ .sec-head-row{gap:16px;} .sec-icon-big{width:60px; height:60px;} }

  /* ===== COURSE QUICK FACTS ===== */
  .course-facts{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .course-facts-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .course-fact{background:var(--white); padding:24px 22px; min-width:0;}
  .course-fact .fact-label{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--rust); margin-bottom:7px;}
  .course-fact b{font-family:'Fraunces', serif; font-size:20px; line-height:1.2; color:var(--prussian-deep); display:block;}
  .course-fact span{display:block; font-size:12.5px; color:var(--ink-mute); margin-top:6px; line-height:1.4;}
  .course-facts-cta{margin-top:22px; display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap; padding:18px 20px; background:var(--prussian-deep); color:var(--white); border-radius:var(--r-md);}
  .course-facts-cta p{font-size:13.5px; color:rgba(255,255,255,.75); margin:0; max-width:650px;}
  .course-facts-cta .btn{flex-shrink:0;}

  /* ===== WHO THIS IS FOR ===== */
  .audience-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:16px;}
  .audience-card{border:1px solid var(--line); background:var(--white); padding:28px 24px; border-radius:var(--r-md); min-width:0; transition:box-shadow .2s ease, transform .2s ease;}
  .audience-card:hover{box-shadow:var(--shadow-md); transform:translateY(-3px);}
  .box-icon{width:44px; height:44px; border-radius:50%; background:var(--prussian-deep); color:var(--gold); display:flex; align-items:center; justify-content:center; margin-bottom:16px; flex-shrink:0;}
  .audience-num{font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:.08em; font-size:10px; color:var(--rust); margin-bottom:17px;}
  .audience-card h3{font-size:20px; margin-bottom:9px;}
  .audience-card p{font-size:13.5px; color:var(--ink-soft);}

  /* ===== WHAT YOU'LL LEARN ===== */
  .skills-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .skill-stamp{background:var(--white); padding:30px 24px; position:relative; min-width:0;}
  .skill-stamp .skill-de{font-family:'Fraunces', serif; font-style:italic; font-size:22px; color:var(--prussian); margin-bottom:4px;}
  .skill-stamp .skill-en{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--rust); margin-bottom:14px; display:block;}
  .skill-stamp p{font-size:13.6px; color:var(--ink-soft);}

  /* ===== CEFR LEVEL INFOGRAPHIC ===== */
  .cefr-chart{display:flex; align-items:flex-end; gap:clamp(8px,1.6vw,18px); height:180px; margin:8px 0 44px; padding:0 2px;}
  .cefr-col{flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%; min-width:0;}
  .cefr-bar{width:100%; max-width:70px; border-radius:5px 5px 2px 2px; background:linear-gradient(180deg, var(--gold) 0%, var(--de-red) 100%); position:relative; box-shadow:0 6px 14px -6px rgba(0,0,0,.5);}
  .cefr-bar b{position:absolute; top:-24px; left:50%; transform:translateX(-50%); font-family:'IBM Plex Mono', monospace; font-size:12px; color:var(--gold-soft); white-space:nowrap; letter-spacing:.04em;}
  .cefr-pct{position:absolute; bottom:6px; left:50%; transform:translateX(-50%); font-family:'IBM Plex Mono', monospace; font-size:9.5px; color:rgba(10,8,7,.55); white-space:nowrap;}
  .cefr-name{margin-top:12px; font-family:'IBM Plex Sans', sans-serif; font-size:11.5px; font-weight:600; color:rgba(255,255,255,.85); text-align:center; line-height:1.3;}
  @media (max-width:720px){ .cefr-chart{height:150px;} .cefr-bar b{font-size:10.5px; top:-20px;} .cefr-name{font-size:10px;} }

  /* ===== JOURNEY / RAIL LINE ===== */
  .journey{background:var(--prussian-deep); color:var(--white); position:relative; overflow:hidden;}
  .journey .sec-head p{color:rgba(255,255,255,.68);}
  .journey .sec-head h2{color:var(--white);}
  .rail-wrap{position:relative; padding-top:10px;}
  .rail{display:grid; grid-template-columns:repeat(6, 1fr); gap:0; position:relative;}
  .rail::before{content:''; position:absolute; top:27px; left:0; right:0; height:3px; background:repeating-linear-gradient(90deg, var(--gold) 0 10px, transparent 10px 18px);}
  .stop{padding:0 14px 0 0; position:relative; min-width:0;}
  .stop-dot{width:20px; height:20px; border-radius:50%; background:var(--prussian-deep); border:3px solid var(--gold); position:relative; z-index:2; margin-bottom:20px;}
  .stop-dot.final{background:var(--gold); border-color:var(--white);}
  .stop-code{font-family:'IBM Plex Mono', monospace; font-size:13px; color:var(--gold-soft); letter-spacing:.06em;}
  .stop h3{font-family:'Fraunces', serif; font-size:22px; margin:6px 0 8px; font-weight:600;}
  .stop p{font-size:13.4px; color:rgba(255,255,255,.72); line-height:1.5;}
  .rail-flag{position:absolute; right:18px; top:-6px; font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--gold-soft); letter-spacing:.1em; text-transform:uppercase; display:flex; align-items:center; gap:6px;}
  .unlock-tag{display:inline-block; margin-top:12px; font-family:'IBM Plex Mono', monospace; font-size:10.5px; letter-spacing:.04em; color:var(--prussian-deep); background:var(--gold-soft); padding:5px 9px; border-radius:2px; font-weight:500;}

  /* ===== STUDY HOURS ===== */
  .study-hours{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .hours-chart{display:flex; flex-direction:column; gap:20px; max-width:840px;}
  .hours-row{display:grid; grid-template-columns:56px 1fr 108px; align-items:center; gap:18px;}
  .hours-level{font-family:'Fraunces', serif; font-weight:700; font-size:19px; color:var(--ink);}
  .hours-track{height:14px; background:var(--white); border:1px solid var(--line); border-radius:var(--r-pill); overflow:hidden; position:relative;}
  .hours-bar{height:100%; background:linear-gradient(90deg, var(--rust), var(--gold)); border-radius:var(--r-pill); transition:width .4s ease;}
  .hours-value{font-family:'IBM Plex Mono', monospace; font-size:12.5px; color:var(--prussian-deep); text-align:right; white-space:nowrap;}
  .hours-note{font-size:12.5px; color:var(--ink-mute); margin-top:20px; max-width:640px;}

  /* ===== CURRICULUM ===== */
  .curriculum-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
  .curriculum-card{border:1px solid var(--line); border-radius:var(--r-md); padding:26px 24px; background:var(--white);}
  .curriculum-level{color:var(--rust); font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:.06em; text-transform:uppercase;}
  .curriculum-card h3{font-size:22px; margin:8px 0 9px;}
  .curriculum-card p{font-size:13.5px; color:var(--ink-soft); margin-bottom:16px;}
  .curriculum-card ul{list-style:none; display:grid; gap:9px;}
  .curriculum-card li{font-size:13px; color:var(--ink); padding-left:19px; position:relative;}
  .curriculum-card li::before{content:'✓'; position:absolute; left:0; color:var(--prussian); font-weight:700;}

  /* ===== LANGUAGE FACTS ===== */
  .lang-facts{background:var(--paper); border-top:1px solid var(--line);}
  .lang-inner{display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start;}
  .lang-inner > div{min-width:0;}
  .lang-copy p{color:var(--ink-soft); font-size:15.5px; margin-bottom:16px; max-width:480px;}
  .lang-copy p:last-child{margin-bottom:0;}
  .fact-strip{display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden; margin-top:8px;}
  .fact-box{background:var(--white); padding:24px 22px; min-width:0;}
  .fact-box b{font-family:'Fraunces', serif; font-size:28px; display:block; color:var(--prussian); font-weight:700; line-height:1;}
  .fact-box span{font-size:12.5px; color:var(--ink-mute); display:block; margin-top:8px; line-height:1.4;}
  .lang-photo{border-radius:var(--r-md); overflow:hidden; border:1px solid var(--line); box-shadow:0 20px 40px -22px rgba(20,17,16,.4); position:relative; aspect-ratio:16/10; margin-bottom:20px;}
  .lang-photo img{width:100%; height:100%; object-fit:cover; display:block;}
  .lang-photo::after{content:''; position:absolute; inset:0; background:linear-gradient(180deg, transparent 55%, rgba(10,8,7,.68) 100%);}
  .lang-photo .lang-photo-cap{position:absolute; left:16px; right:16px; bottom:14px; z-index:2; color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.05em;}
  .cognates{margin-top:26px; border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden; background:var(--white);}
  .cognates-head{display:grid; grid-template-columns:1fr 1fr 1fr; background:var(--prussian); color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:.06em; text-transform:uppercase;}
  .cognates-head div{padding:10px 14px; min-width:0;}
  .cognate-row{display:grid; grid-template-columns:1fr 1fr 1fr; border-top:1px solid var(--line); font-size:14px;}
  .cognate-row div{padding:11px 14px; min-width:0; overflow-wrap:break-word;}
  .cognate-row div:first-child{font-weight:600; font-family:'Fraunces', serif; font-style:italic;}
  .cognate-row div:last-child{color:var(--ink-mute); font-size:13px;}
  .lang-note{margin-top:26px; border:1px solid var(--line); border-radius:var(--r-md); padding:22px 24px; background:var(--white);}
  .lang-note h4{font-family:'IBM Plex Mono', monospace; font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); margin-bottom:10px;}
  .lang-note p{font-size:14px; color:var(--ink-soft); line-height:1.6;}

  /* ===== CAREER ICONS ===== */
  .career-icons{display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:22px;}
  .career-icon-item{display:flex; flex-direction:column; align-items:center; gap:9px; text-align:center; min-width:0;}
  .career-icon-circle{width:50px; height:50px; border-radius:50%; background:var(--prussian-deep); color:var(--gold); display:flex; align-items:center; justify-content:center; flex-shrink:0;}
  .career-icon-item span{font-family:'IBM Plex Mono', monospace; font-size:9.5px; color:var(--ink-mute); letter-spacing:.02em; line-height:1.3;}
  @media (max-width:480px){ .career-icons{grid-template-columns:repeat(2,1fr); gap:18px;} }

  /* ===== FEATURES ===== */
  .features-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .feature{background:var(--paper); padding:36px 30px; min-width:0;}
  .feature .fnum{font-family:'IBM Plex Mono', monospace; font-size:12px; color:var(--rust); letter-spacing:.08em;}
  .feature h3{font-size:21px; margin:14px 0 10px; font-weight:600;}
  .feature p{font-size:14.3px; color:var(--ink-soft);}

  /* ===== MODES ===== */
  .modes{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .modes-photo{width:100%; height:450px; object-fit:cover; border-radius:var(--r-md); margin-bottom:34px; border:1px solid var(--line); box-shadow:var(--shadow-md);}
  .modes-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:24px;}
  .mode-card{background:var(--white); border:1px solid var(--line); border-radius:var(--r-md); padding:0; position:relative; overflow:hidden;}
  .mode-card::after{content:''; position:absolute; top:0; left:0; width:4px; height:100%; background:var(--gold); z-index:2;}
  .mode-photo{width:100%; aspect-ratio:16/9; overflow:hidden;}
  .mode-photo img{width:100%; height:100%; object-fit:cover; display:block;}
  .mode-body{padding:24px 28px 28px;}
  .mode-card h3{font-size:20px; margin-bottom:10px;}
  .mode-card p{font-size:14px; color:var(--ink-soft); margin-bottom:16px;}
  .mode-tag{font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); background:rgba(176,18,43,.08); padding:4px 9px; border-radius:2px; display:inline-block;}

  /* ===== METHODOLOGY ===== */
  .method-grid{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .method-step{background:var(--white); padding:30px 24px;}
  .step-no{font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--rust); letter-spacing:.05em;}
  .method-step h3{font-size:19px; margin:14px 0 9px;}
  .method-step p{font-size:13px; color:var(--ink-soft);}

  /* ===== WHAT'S INCLUDED ===== */
  .included{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .included-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:12px;}
  .included-item{border:1px solid var(--line); background:var(--white); border-radius:var(--r-sm); padding:17px 19px; display:flex; gap:12px; align-items:flex-start;}
  .included-item .tick{width:22px; height:22px; border-radius:50%; background:var(--gold-soft); color:var(--prussian-deep); display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0; font-size:12px;}
  .included-item span:last-child{font-size:13.5px; color:var(--ink);}

  /* ===== PATHWAYS ===== */
  .pathways{background:var(--prussian-deep); color:var(--white);}
  .pathways .sec-head h2{color:var(--white);}
  .pathways .sec-head p{color:rgba(255,255,255,.68);}
  .path-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:22px;}
  .path-card{background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.14); border-radius:var(--r-lg); padding:30px 26px; position:relative; overflow:hidden; min-width:0;}
  .path-card .path-icon{width:46px; height:46px; border-radius:50%; background:var(--gold); color:var(--prussian-deep); display:flex; align-items:center; justify-content:center; margin-bottom:20px;}
  .path-card h3{font-size:23px; margin-bottom:6px; color:var(--white);}
  .path-card .path-tag{font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--gold-soft); text-transform:uppercase; letter-spacing:.08em;}
  .path-card ul{margin-top:18px; list-style:none; display:flex; flex-direction:column; gap:12px;}
  .path-card li{display:flex; gap:10px; font-size:14px; color:rgba(255,255,255,.82); line-height:1.5;}
  .path-card li::before{content:'◦'; color:var(--gold); flex-shrink:0;}
  .path-card .path-photo{display:block; width:calc(100% + 52px); max-width:none; margin:-30px -26px 22px; aspect-ratio:15/12; object-fit:cover;}

  /* ===== CAREERS ===== */
  .career-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:18px;}
  .career-card{border:1px solid var(--line); background:var(--white); border-radius:var(--r-md); padding:28px 26px;}
  .career-card h3{font-size:21px; margin-bottom:14px;}
  .career-tags{display:flex; flex-wrap:wrap; gap:8px;}
  .career-tag{font-family:'IBM Plex Mono', monospace; font-size:10.5px; color:var(--prussian-deep); background:var(--gold-soft); border:1px solid var(--line); padding:7px 10px; border-radius:var(--r-sm);}

  /* ===== EXAM COMPARE TABLE ===== */
  .exam-compare{background:var(--white); border-top:1px solid var(--line);}
  .compare-wrap{overflow-x:auto; border:1px solid var(--line); border-radius:var(--r-md);}
  .compare-table{width:100%; min-width:720px; border-collapse:collapse;}
  .compare-table th, .compare-table td{padding:17px 20px; border-bottom:1px solid var(--line); text-align:left; font-size:13.5px; vertical-align:top;}
  .compare-table th{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.07em; color:var(--white); background:var(--prussian-deep);}
  .compare-table tr:last-child td{border-bottom:none;}
  .compare-table td:first-child{font-weight:700;}

  /* ===== BATCHES ===== */
  .batches{background:var(--paper);}
  .batch-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
  .batch-card{border:1px solid var(--line); background:var(--white); border-radius:var(--r-md); padding:28px 24px; position:relative;}
  .batch-card::before{content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--gold); border-radius:var(--r-md) 0 0 var(--r-md);}
  .batch-tag{font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:.08em; font-size:10.5px; color:var(--rust);}
  .batch-card h3{font-size:21px; margin:9px 0 14px;}
  .batch-meta{display:grid; gap:9px; margin-bottom:20px;}
  .batch-meta div{display:flex; justify-content:space-between; gap:12px; font-size:13px; border-bottom:1px dashed var(--line); padding-bottom:8px;}
  .batch-meta span{color:var(--ink-mute); text-align:right;}
  .batch-card .btn{width:100%; justify-content:center;}
  .batch-note{font-size:12px; color:var(--ink-mute); margin-top:20px;}

  /* ===== FAQ ===== */
  .faq-list{display:flex; flex-direction:column; gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .faq-item{background:var(--white); padding:0;}
  .faq-item summary{padding:20px 24px; cursor:pointer; font-weight:600; font-size:15.5px; list-style:none; display:flex; justify-content:space-between; align-items:center; gap:12px;}
  .faq-item summary::-webkit-details-marker{display:none;}
  .faq-item summary::after{content:'+'; font-family:'IBM Plex Mono', monospace; font-size:20px; color:var(--rust); flex-shrink:0; transition:transform .2s ease;}
  .faq-item[open] summary::after{transform:rotate(45deg);}
  .faq-item .faq-a{padding:0 24px 20px; font-size:14.3px; color:var(--ink-soft); max-width:720px;}

  /* ===== ACTIVITIES CAROUSEL ===== */
  .activities{background:var(--ink); color:var(--white); position:relative; overflow:hidden;}
  .activities .sec-head h2{color:var(--white);}
  .activities .sec-head p{color:rgba(255,255,255,.65);}
  .activity-slider{position:relative;}
  .activity-viewport{overflow:hidden; border-radius:var(--r-md);}
  .activity-track{display:flex; align-items:stretch; transition:transform .5s var(--ease); touch-action:pan-y;}
  .activity-slide{flex-shrink:0; padding:0 8px; min-width:0; display:flex;}
  .activity-card{background:linear-gradient(145deg,#2A1418,#1B0C0F); border:1px solid rgba(255,255,255,.08); border-radius:var(--r-md); width:100%; height:100%; display:flex; flex-direction:column; position:relative; overflow:hidden;}
  .activity-image{width:100%; aspect-ratio:4/0; height:auto; object-fit:contain; object-position:center; display:block; flex-shrink:0; background:#1B0C0F;}
  .activity-image-wrap{position:relative; overflow:hidden; background:#1B0C0F;}
  .activity-image-wrap::after{content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(10,5,7,0) 45%,rgba(10,5,7,.45) 100%); pointer-events:none;}
  .activity-content{padding:18px 18px 20px; position:relative; z-index:2; flex:1; display:flex; flex-direction:column;}
  .activity-content p{margin-top:auto; padding-top:10px;}
  .activity-icon{width:36px; height:36px; border:1.5px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-soft); font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:700; margin-bottom:10px; background:rgba(27,12,15,.92);}
  .activity-tag{font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.08em; color:var(--gold-soft); text-transform:uppercase;}
  .activity-card h3{font-size:17px; color:var(--white); margin:6px 0 9px; font-family:'Fraunces', serif; font-weight:600;}
  .activity-card p{font-size:13px; color:rgba(255,255,255,.72); line-height:1.55; min-height:4.65em; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;}
  .activity-controls{display:flex; align-items:center; justify-content:space-between; margin-top:26px; gap:20px;}
  .activity-arrows{display:flex; gap:10px;}
  .activity-arrow{width:44px; height:44px; border-radius:50%; border:1.5px solid rgba(255,255,255,.25); background:transparent; color:var(--white); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .18s ease, border-color .18s ease, transform .18s ease;}
  .activity-arrow:hover{background:rgba(255,255,255,.1); border-color:var(--gold-soft); transform:translateY(-1px);}
  .activity-dots{display:flex; gap:8px; flex-wrap:wrap;}
  .activity-dot{width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.25); border:none; cursor:pointer; padding:0; transition:width .2s ease, background .2s ease;}
  .activity-dot.active{background:var(--gold); width:22px; border-radius:var(--r-pill);}
  @media (max-width:720px){ .activity-arrow{width:40px; height:40px;} }

  /* ===== FINAL CTA ===== */
  .final-cta{background:var(--prussian-deep); color:var(--white); text-align:center; position:relative; overflow:hidden;}
  .final-cta .kicker{font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--gold-soft);}
  .final-cta h2{font-size:clamp(30px,4vw,48px); margin:14px auto; max-width:760px; color:var(--white);}
  .final-cta p{max-width:650px; margin:0 auto 28px; color:rgba(255,255,255,.7); font-size:16px;}
  .final-cta-actions{display:flex; justify-content:center; gap:12px; flex-wrap:wrap;}
  .final-cta .btn-ghost{border-color:rgba(255,255,255,.45); color:var(--white);}
  .final-cta .btn-ghost:hover{background:var(--white); color:var(--ink);}
  .final-cta .microcopy{font-family:'IBM Plex Mono', monospace; font-size:10.5px; color:rgba(255,255,255,.5); margin-top:18px;}

  /* ===== CONTACT ===== */
  .contact{background:var(--paper);}
  .contact-grid{display:grid; grid-template-columns:.95fr 1.05fr; gap:56px; align-items:start;}
  .contact-grid > div{min-width:0;}
  .contact-list{display:flex; flex-direction:column; gap:0; border-top:1px solid var(--line);}
  .contact-row{display:flex; gap:18px; padding:22px 0; border-bottom:1px solid var(--line); align-items:flex-start;}
  .contact-icon{width:42px; height:42px; border-radius:50%; background:var(--prussian); color:var(--white); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 6px 14px -6px rgba(176,18,43,.55);}
  .contact-row > div:last-child{min-width:0;}
  .contact-row h4{font-size:12px; font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:.08em; color:var(--ink-mute); margin-bottom:5px;}
  .contact-row a, .contact-row div.val{font-size:16.5px; font-weight:600; text-decoration:none; word-break:break-word;}
  .contact-row a:hover{color:var(--rust);}
  .contact-row .note{font-size:13px; color:var(--ink-soft); font-weight:400; margin-top:3px;}
  .social-row{display:flex; gap:12px; margin-top:24px; flex-wrap:wrap;}
  .social-chip{width:38px; height:38px; border-radius:50%; border:1.5px solid var(--ink); display:flex; align-items:center; justify-content:center; text-decoration:none; color:var(--ink); transition:all .2s ease; flex-shrink:0;}
  .social-chip:hover{background:var(--ink); color:var(--paper);}

  .enroll-card{background:var(--prussian); color:var(--white); border-radius:var(--r-lg); padding:38px 34px; position:relative; overflow:hidden; box-shadow:var(--shadow-lg);}
  .enroll-card::before{content:''; position:absolute; top:-60px; right:-60px; width:180px; height:180px; border-radius:50%; background:rgba(232,176,44,.22);}
  .enroll-card h3{font-size:24px; margin-bottom:8px; position:relative; color:var(--white);}
  .enroll-card p{font-size:14px; color:rgba(255,255,255,.7); margin-bottom:26px; position:relative;}
  .form-row{margin-bottom:16px; position:relative;}
  .form-row label{display:block; font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.08em; margin-bottom:7px; color:var(--gold-soft);}
  .form-row input{width:100%; box-sizing:border-box; padding:12px 14px; border-radius:var(--r-sm); border:1px solid rgba(255,255,255,.25); background:rgba(255,255,255,.06); color:var(--white); font-family:'IBM Plex Sans', sans-serif; font-size:14.5px; min-height:46px;}
  .form-row input::placeholder{color:rgba(255,255,255,.4);}
  .form-row input:focus{outline:2px solid var(--gold); outline-offset:1px; background:rgba(255,255,255,.1);}
  .submit-btn{width:100%; padding:14px; background:var(--rust); color:var(--white); border:none; border-radius:var(--r-sm); font-weight:600; font-size:15px; cursor:pointer; margin-top:6px; transition:transform .18s ease, background .18s ease; font-family:'IBM Plex Sans', sans-serif;}
  .submit-btn:hover{transform:translateY(-2px); background:var(--rust-deep);}
  .submit-btn:disabled{opacity:.7; cursor:not-allowed; transform:none;}
  .form-msg{display:block; font-size:13.5px; line-height:1.45; margin-top:14px; padding:12px 14px; border-radius:var(--r-sm); font-family:'IBM Plex Sans', sans-serif; font-weight:500;}
  .form-msg.success{color:#0f3d2e; background:#d9f5e5; border:1px solid #8fd9b4;}
  .form-msg.error{color:#7a1c1c; background:#fde8e8; border:1px solid #f0b4b4;}
  .form-alt{display:flex; align-items:center; gap:10px; margin-top:20px; padding-top:20px; border-top:1px dashed rgba(255,255,255,.2); flex-wrap:wrap;}

  /* ===== MAP STRIP ===== */
  .map-strip{border-top:1px solid var(--line); border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; padding:22px 0; flex-wrap:wrap; gap:16px;}
  .map-strip a{text-decoration:none; font-weight:600; display:inline-flex; align-items:center; gap:8px; color:var(--rust);}

  /* ===== FOOTER ===== */
  .de-footer{background:var(--prussian-deep); color:#fff; position:relative; overflow:hidden; padding:64px 0 30px;}
  .footer-grid{display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; padding-bottom:40px; border-bottom:1px solid var(--line-on-dark);}
  .footer-brand h2{font-family:'Fraunces',serif; font-size:28px; margin-bottom:7px; color:var(--white);}
  .footer-logo{height:44px; width:auto; max-width:220px; object-fit:contain; display:block; margin-bottom:14px;}
  .footer-brand .de-motto{font-family:'IBM Plex Sans',sans-serif; font-style:italic; color:var(--gold-soft); font-size:14px; margin-bottom:15px;}
  .footer-brand p{font-size:13px; color:rgba(255,255,255,.62); max-width:360px;}
  .footer-col h4{font-family:'IBM Plex Sans',sans-serif; color:var(--gold-soft); font-size:13px; margin-bottom:14px; letter-spacing:.04em; text-transform:uppercase;}
  .footer-col a{display:block; text-decoration:none; color:rgba(255,255,255,.68); font-size:13px; margin:9px 0; transition:color .15s ease;}
  .footer-col a:hover{color:#fff;}
  .footer-bottom{display:flex; justify-content:space-between; gap:20px; align-items:center; padding-top:22px; flex-wrap:wrap;}
  .footer-bottom span{font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:rgba(255,255,255,.45);}

  /* ===== FLOATING ACTIONS ===== */
  .wa-float{position:fixed; bottom:26px; right:26px; z-index:100; width:60px; height:60px; border-radius:50%; background:#25D366; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 26px rgba(37,211,102,.5); text-decoration:none; animation:wa-pulse 2.6s infinite;}
  .wa-float:hover{transform:scale(1.06);}
  @keyframes wa-pulse{0%{box-shadow:0 10px 26px rgba(37,211,102,.5), 0 0 0 0 rgba(37,211,102,.55);} 70%{box-shadow:0 10px 26px rgba(37,211,102,.5), 0 0 0 16px rgba(37,211,102,0);} 100%{box-shadow:0 10px 26px rgba(37,211,102,.5), 0 0 0 0 rgba(37,211,102,0);}}
  .wa-tip{position:fixed; bottom:38px; right:96px; z-index:100; background:var(--ink); color:var(--white); padding:9px 14px; border-radius:5px; font-size:13px; font-weight:500; opacity:0; pointer-events:none; transition:opacity .25s ease; white-space:nowrap;}
  .wa-float:hover + .wa-tip, .wa-tip.show{opacity:1;}
  .call-float{position:fixed; bottom:26px; left:26px; z-index:100; width:60px; height:60px; border-radius:50%; background:var(--rust); display:flex; align-items:center; justify-content:center; box-shadow:0 10px 26px rgba(140,15,36,.4); text-decoration:none;}
  .call-float:hover{transform:scale(1.06);}
  .call-tip{position:fixed; bottom:38px; left:96px; z-index:100; background:var(--ink); color:var(--white); padding:9px 14px; border-radius:5px; font-size:13px; font-weight:500; opacity:0; pointer-events:none; transition:opacity .25s ease; white-space:nowrap;}
  .call-float:hover + .call-tip{opacity:1;}

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1180px){
    .path-grid{grid-template-columns:1fr 1fr;}
    .wrap{padding:0 24px;}
  }
  @media (max-width: 980px){
    .course-facts-grid,.audience-grid,.curriculum-grid,.method-grid,.included-grid{grid-template-columns:1fr 1fr;}
    .batch-grid,.career-grid{grid-template-columns:1fr;}
    .hero-inner{grid-template-columns:1fr; padding-top:28px;}
    .ticket{max-width:440px; margin:0 auto;}
    .features-grid{grid-template-columns:1fr 1fr;}
    .modes-grid{grid-template-columns:1fr;}
    .contact-grid{grid-template-columns:1fr;}
    .rail{grid-template-columns:1fr 1fr; row-gap:36px;}
    .rail::before{display:none;}
    .lang-inner{grid-template-columns:1fr;}
    .path-grid{grid-template-columns:1fr;}
    .fact-strip{grid-template-columns:1fr 1fr;}
    .skills-grid{grid-template-columns:1fr 1fr;}
    section[id]{padding:52px 0;}
    .exam-row{gap:18px;}
    .exam-badge .badge-circle{width:68px; height:68px;}
    .exam-badge .badge-letter{font-size:21px;}
    .footer-grid{grid-template-columns:1fr 1fr;}
    .footer-brand{grid-column:1/-1;}
  }
  @media (max-width: 720px){
    .course-facts-grid,.audience-grid,.curriculum-grid,.method-grid,.included-grid{grid-template-columns:1fr;}
    .course-facts-cta{align-items:flex-start;}
    :root{--header-h:66px;}
    .topbar-links{display:flex; gap:6px 14px; font-size:10.5px;}
    .topbar .wrap{padding:7px 20px;}
    .wrap{padding:0 20px;}
    .features-grid{grid-template-columns:1fr;}
    .form-row input{font-size:16px;}
    .btn{white-space:normal; text-align:center; justify-content:center;}
    .hero-inner{padding:20px 20px 32px; gap:28px;}
    .hero-stats{grid-template-columns:repeat(2, 1fr); gap:18px 20px;}
    .stat{padding-right:18px;}
    .stat:nth-child(2n){border-right:none; padding-right:0;}
    .rail{grid-template-columns:1fr; row-gap:30px;}
    .ticket-form-row{grid-template-columns:1fr; row-gap:14px;}
    .skills-grid{grid-template-columns:1fr;}
    .path-grid{grid-template-columns:1fr;}
    .contact-row{gap:14px;}
    section[id]{padding:42px 0;}
    .sec-head{margin-bottom:28px;}
    .exam-row{gap:14px; justify-content:flex-start; overflow-x:auto; flex-wrap:nowrap; padding:6px 4px 10px; -webkit-overflow-scrolling:touch;}
    .exam-badge{flex-shrink:0;}
    .exam-badge .badge-circle{width:60px; height:60px;}
    .exam-badge .badge-letter{font-size:18px;}
    .exam-badge .badge-code{font-size:8px;}
    .exam-badge .badge-caption{font-size:9.5px; max-width:80px;}
    .exam-strip{padding:24px 0 8px;}
    .de-nav{min-height:66px; height:66px;}
    .de-brand-text{width:150px; min-width:130px; height:38px;}
    .modes-photo{height:170px;}
    .footer-grid{grid-template-columns:1fr 1fr; gap:28px;}
    .footer-brand{grid-column:1/-1;}
  }
  @media (max-width: 480px){
    .de-nav{gap:12px;}
    .de-brand-text{width:120px; min-width:96px; height:34px;}
    .de-menu .de-cta{padding:9px 13px; font-size:11.5px;}
    .hero-title{font-size:clamp(28px, 9vw, 40px);}
    .hero-sub{font-size:15.5px;}
    .stat{padding-right:14px;}
    .stat b{font-size:21px;}
    .ticket-top, .ticket-bottom{padding-left:18px; padding-right:18px;}
    .ticket-route .city{font-size:19px;}
    .enroll-card{padding:24px 20px;}
    .path-card{padding:24px 18px;}
    .path-card .path-photo{margin:-24px -18px 18px; width:calc(100% + 36px);}
    .feature{padding:26px 20px;}
    .skill-stamp{padding:22px 18px;}
    .btn{padding:11px 15px; font-size:13.5px;}
    .sec-head h2{line-height:1.16;}
    .wa-float{width:50px; height:50px; bottom:16px; right:16px;}
    .wa-tip{right:74px; bottom:26px; font-size:11.5px; padding:7px 11px;}
    .call-float{width:50px; height:50px; bottom:16px; left:16px;}
    .call-tip{left:74px; bottom:26px; font-size:11.5px; padding:7px 11px;}
    .faq-item summary{padding:15px 16px; font-size:14px;}
    .faq-item .faq-a{padding:0 16px 16px; font-size:13.6px;}
    .fact-strip{grid-template-columns:1fr;}
    .cognates-head div, .cognate-row div{padding:9px 10px; font-size:12.5px;}
    .contact-row a, .contact-row div.val{font-size:15px;}
    .final-cta-actions{flex-direction:column; align-items:stretch;}
    .final-cta-actions .btn{white-space:normal; justify-content:center; text-align:center;}
    .footer-grid{grid-template-columns:1fr 1fr; gap:20px;}
    .footer-brand{grid-column:1/-1;}
  }
  @media (max-width: 360px){
    .hero-stats{gap:14px 10px;}
    .stat{padding-right:10px;}
  }
      `}</style>

      {/* HEADER */}
      <header className="de-header">
        <div className="wrap de-nav">
          <a className="de-brand" href="#top" aria-label="Langma International">
            <span className="de-brand-text">
              <img src="https://www.langmainternational.com/images/lngm2.png" alt="Langma International" className="de-brand-logo" />
            </span>
          </a>
          <nav className="de-menu" aria-label="German course navigation">
            <a className="de-cta" href="#contact">Free Counselling</a>
          </nav>
        </div>
      </header>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-links">
            <a href="tel:+919810117094">
              <span className="topbar-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              +91-98101-17094
            </a>
            <a href="mailto:info@langmainternational.com">
              <span className="topbar-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
              </span>
              info@langmainternational.com
            </a>
            <a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">
              <span className="topbar-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              South Extension I, New Delhi
            </a>
          </div>
        </div>
      </div>
      <div className="flag-rule" aria-hidden="true"></div>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-wash" aria-hidden="true"></div>
        <div className="hero-inner">
          <div>
            <h1 className="hero-title">Learn German <em>from zero</em><br />to a life in Germany.</h1>
            <p className="hero-sub">Small live batches, native-speaking trainers, and a curriculum built for real conversation, from your first "Guten Tag" to full visa &amp; placement support, whenever you're ready for Germany.</p>
            <div className="hero-actions">
              <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20a%20free%20German%20demo%20class." target="_blank" rel="noopener" className="btn btn-wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
                Chat on WhatsApp
              </a>
              <a href="tel:+919810117094" className="btn btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Talk to a German Counsellor
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat"><b>13+ yrs</b><span>TEACHING GERMAN</span></div>
              <div className="stat"><b>A1–C2</b><span>ALL CEFR LEVELS</span></div>
              <div className="stat"><b>4.6★</b><span>GOOGLE RATING</span></div>
              <div className="stat"><b>100%</b><span>EXPERT TRAINERS</span></div>
            </div>
          </div>

          <div className="ticket">
            <div className="ticket-top">
              <div className="ticket-route">
                <div>
                  <div className="city">DEL</div>
                  <div className="sub">New Delhi, India</div>
                </div>
                <div className="arrow">ONLINE · OFFLINE</div>
                <div style={{textAlign: 'right'}}>
                  <div className="city">GER</div>
                  <div className="sub">Your Future, Germany</div>
                </div>
              </div>
              <div className="ticket-form-head">Get Course Fee &amp; Batch Details</div>
              <form className="ticket-form" onSubmit={handleHeroSubmit}>
                <div className="ticket-form-row">
                  <div className="form-row">
                    <label htmlFor="hname">Name</label>
                    <input type="text" id="hname" name="name" autoComplete="name" placeholder="Your name" required />
                  </div>
                  <div className="form-row">
                    <label htmlFor="hphone">Phone</label>
                    <input
                      type="tel"
                      id="hphone"
                      name="phone"
                      autoComplete="tel"
                      ref={heroPhoneRef}
                      placeholder="10-digit number"
                      pattern="[0-9]{10}"
                      required
                      aria-invalid={heroPhoneError}
                      aria-describedby={heroPhoneError ? "hphone-error" : undefined}
                      onChange={() => setHeroPhoneError(false)}
                      style={heroPhoneError ? { outline: '2px solid #E4574C' } : undefined}
                    />
                    {heroPhoneError && <span id="hphone-error" className="field-error" role="alert">Enter a valid 10-digit number</span>}
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="hemail">Email</label>
                  <input type="email" id="hemail" name="email" autoComplete="email" placeholder="you@example.com" required />
                </div>
                <input type="hidden" name="language" value="German" />
                <input type="hidden" name="message" value="German Language Course enquiry" />
                <button type="submit" className="submit-btn" disabled={heroSubmitting}>
                  {heroSubmitting ? "Submitting..." : heroSubmitted ? "Details Requested ✓" : "Request Details →"}
                </button>
                {heroFormMessage && (
                  <div className={`form-msg ${heroSubmitted ? "success" : "error"}`} role="status">
                    {heroSubmitted ? `✓ ${heroFormMessage}` : heroFormMessage}
                  </div>
                )}
              </form>
            </div>
            <div className="ticket-notch left"></div>
            <div className="ticket-notch right"></div>
            <div className="ticket-bottom">
              <div className="ticket-barcode" aria-hidden="true"></div>
              <div className="ticket-rating">{heroSubmitted ? 'Details Requested ✓' : '4.6★ Rated · 13+ Yrs Teaching German'}</div>
            </div>
          </div>
        </div>
        {/* EXAM BADGES */}
        <div className="exam-strip">
          <div className="wrap">
            <div className="exam-head">
              <span className="kicker">Official German Language Exam Preparation</span>
              <h3>Learn German &amp; ace every major <em>German Language</em> certification</h3>
            </div>
            <div className="exam-row" role="list" aria-label="German language certification exams we prepare you for">
              {EXAM_BADGES.map((b, i) => {
                const codeClass = b.code.length > 5 ? 'badge-code wide' : 'badge-code';
                return (
                  <div className="exam-badge" role="listitem" key={i} style={{ '--ring': b.ring, '--accent': b.accent }}>
                    <div className="badge-circle">
                      <div className="badge-flag" aria-hidden="true"><i></i><i></i><i></i></div>
                      <div className="badge-inner">
                        <div className="badge-letter">{b.letter}</div>
                        <div className={codeClass}>{b.code}</div>
                      </div>
                    </div>
                    <div className="badge-caption"><b>{b.code}</b><br/>{b.subtitle}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COURSE QUICK FACTS */}
      <section className="course-facts" id="course-details">
        <div className="wrap">
          <div className="sec-head-row">
            <div className="sec-head">
              <h2>Everything you need to choose your German course.</h2>
              <p>Skip the guesswork. Get the current fee and batch options based on your level, preferred schedule and learning goal.</p>
            </div>
            <div className="sec-icon-big" aria-hidden="true">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="14" width="80" height="96" rx="10" stroke="currentColor" strokeWidth="6"/><path d="M45 14h30v10a4 4 0 0 1-4 4H49a4 4 0 0 1-4-4V14z" fill="currentColor"/><path d="M34 46l6 6 12-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 44h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><path d="M34 74l6 6 12-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 72h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><path d="M34 96h52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".45"/></svg>
            </div>
          </div>
          <div className="course-facts-grid">
            <div className="course-fact"><div className="fact-label">Levels</div><b>A1 → C2</b><span>Complete CEFR pathway from beginner to advanced.</span></div>
            <div className="course-fact"><div className="fact-label">Class Format</div><b>Online / Offline / Hybrid</b><span>Choose the format that fits your schedule.</span></div>
            <div className="course-fact"><div className="fact-label">Location</div><b>South Extension I</b><span>In-person classes at our South Delhi centre.</span></div>
            <div className="course-fact"><div className="fact-label">Exam Prep</div><b>Goethe • TestDaF • telc</b><span>Focused preparation when you need certification.</span></div>
            <div className="course-fact"><div className="fact-label">Teaching</div><b>Expert Trainers</b><span>Small live batches with practical speaking practice.</span></div>
            <div className="course-fact"><div className="fact-label">Experience</div><b>13+ Years</b><span>German teaching experience in Delhi since 2012.</span></div>
            <div className="course-fact"><div className="fact-label">Course Fee</div><b>Get Current Fee</b><span>Fee details are shared by the counsellor.</span></div>
            <div className="course-fact"><div className="fact-label">Next Step</div><b>Free Demo / Counselling</b><span>Discuss your goal and get a recommended learning path.</span></div>
          </div>
          <div className="course-facts-cta">
            <p><strong>Want the exact fee and next available batch?</strong><br />Share your details and we'll help you choose the right German course.</p>
            <a href="#enrollForm" className="btn btn-wa">Get Course Fee &amp; Batch Details →</a>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section id="who">
        <div className="wrap">
          <div className="sec-head">
            <h2>German for the goal you're working towards.</h2>
            <p>Whether you're starting from zero or already know German, choose a learning route that matches your objective.</p>
          </div>
          <div className="audience-grid">
            {AUDIENCE.map((a, i) => (
              <div className="audience-card" key={i}>
                <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{a.icon}</svg></div>
                <div className="audience-num">{a.num}</div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section id="skills">
        <div className="wrap">
          <div className="sec-head">
            <h2>Real German, for real conversations.</h2>
            <p>Our German Language curriculum builds all four core skills side by side, so you actually learn German you can use, not just recognise it on a page.</p>
          </div>
          <div className="skills-grid">
            <div className="skill-stamp">
              <div className="skill-de">Sprechen</div>
              <span className="skill-en">Speaking</span>
              <p>Guided conversation practice from day one, so you're comfortable speaking long before you're "fluent."</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-de">Hören</div>
              <span className="skill-en">Listening</span>
              <p>Native-accent audio and dialogues that train your ear for how German is actually spoken.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-de">Lesen</div>
              <span className="skill-en">Reading</span>
              <p>From simple notices to full articles, building comprehension level by level.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-de">Schreiben</div>
              <span className="skill-en">Writing</span>
              <p>Everyday messages, formal letters, and essays, corrected and improved as you go.</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY / LEVELS */}
      <section className="journey" id="journey">
        <div className="wrap">
          <div className="sec-head">
            <h2>Six stops to fluency.</h2>
            <p>Every learner boards at A1 and rides the same line through to C2, each stop building the grammar, conversation and confidence you need for the next.</p>
          </div>

          <div className="cefr-chart" role="img" aria-label="Bar chart showing the six CEFR levels from A1 to C2, rising in proficiency from Foundations to Mastery">
            {CEFR_LEVELS.map((lvl) => (
              <div className="cefr-col" key={lvl.code}>
                <div className="cefr-bar" style={{ height: `${lvl.pct}%` }}>
                  <b>{lvl.code}</b>
                  <span className="cefr-pct">{lvl.pct}%</span>
                </div>
                <div className="cefr-name">{lvl.name}</div>
              </div>
            ))}
          </div>

          <div className="rail-wrap">
            <div className="rail">
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 01 · A1</div>
                <h3>Foundations</h3>
                <p>Build grammar and vocabulary for real-world conversation and gain confidence in everyday interaction.</p>
                <span className="unlock-tag">Unlocks: travel & basic greetings</span>
              </div>
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 02 · A2</div>
                <h3>Everyday German</h3>
                <p>Read and understand simple texts, and express yourself clearly in day-to-day situations.</p>
                <span className="unlock-tag">Unlocks: spouse / family reunion visa</span>
              </div>
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 03 · B1</div>
                <h3>Independent Use</h3>
                <p>Revise core grammar and lead discussions on topics that interest you, confidently, in German.</p>
                <span className="unlock-tag">Unlocks: Ausbildung eligibility</span>
              </div>
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 04 · B2</div>
                <h3>Fluent Exchange</h3>
                <p>Practise reading and writing, and discuss complex topics in everyday conversation with ease.</p>
                <span className="unlock-tag">Unlocks: skilled-worker jobs, Chancenkarte points</span>
              </div>
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 05 · C1</div>
                <h3>Advanced Command</h3>
                <p>Express yourself clearly on almost any subject and understand nearly all texts you encounter.</p>
                <span className="unlock-tag">Unlocks: German-taught university admission</span>
              </div>
              <div className="stop">
                <div className="stop-dot final"></div>
                <div className="stop-code">STOP 06 · C2</div>
                <h3>Mastery</h3>
                <p>Speak fluent German and engage confidently in literary, cultural and scientific discussion.</p>
                <span className="unlock-tag">Unlocks: teaching, translation, native-level roles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDY HOURS */}
      <section className="study-hours" id="study-hours">
        <div className="wrap">
          <div className="sec-head">
            <h2>How much runway each level takes.</h2>
            <p>Approximate cumulative study hours to reach each CEFR level from zero, based on commonly cited Goethe-Institut estimates. Your actual pace depends on prior exposure, study method and hours committed per week.</p>
          </div>
          <div className="hours-chart">
            {STUDY_HOURS.map((h) => (
              <div className="hours-row" key={h.level}>
                <div className="hours-level">{h.level}</div>
                <div className="hours-track"><div className="hours-bar" style={{ width: `${h.pct}%` }}></div></div>
                <div className="hours-value">{h.hrs}</div>
              </div>
            ))}
          </div>
          <p className="hours-note">Figures are commonly cited estimates, not a guarantee. Structured classes, native-speaker practice and consistent weekly hours are what actually move learners along this line faster.</p>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum">
        <div className="wrap">
          <div className="sec-head">
            <h2>What you study at every level.</h2>
            <p>The learning journey develops grammar, vocabulary, cases and communication together as you progress from A1 towards advanced German.</p>
          </div>
          <div className="curriculum-grid">
            {CURRICULUM.map((c, i) => (
              <div className="curriculum-card" key={i}>
                <div className="curriculum-level">{c.level}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <ul>
                  {c.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE LANGUAGE */}
      <section className="lang-facts" id="language">
        <div className="wrap">
          <div className="lang-inner">
            <div>
              <h2 style={{fontSize: 'clamp(26px,3vw,38px)', margin: '0 0 20px', lineHeight: '1.1'}}>Deutsch: more useful than most people expect.</h2>
              <div className="lang-copy">
                <p>The German Language is the most widely spoken native language in the European Union, and the official language of Germany, Austria, Switzerland, Liechtenstein and Luxembourg, with recognised status in parts of Belgium and Italy too.</p>
                <p>It belongs to the same Germanic language family as English, which is why when you learn German so much vocabulary feels familiar from day one: Haus and house, Wasser and water, Buch and book. That head start is one reason English speakers pick up conversational German faster than many other foreign languages.</p>
                <p>Germany is Europe's largest economy and one of the world's biggest exporters, which means learning German isn't just a classroom exercise. It's a career move, opening doors in engineering, IT, healthcare, and manufacturing across the EU.</p>
              </div>
              <div className="cognates">
                <div className="cognates-head"><div>German</div><div>English</div><div>Sounds like</div></div>
                <div className="cognate-row"><div>Haus</div><div>House</div><div>house</div></div>
                <div className="cognate-row"><div>Wasser</div><div>Water</div><div>vasser</div></div>
                <div className="cognate-row"><div>Freund</div><div>Friend</div><div>froynd</div></div>
                <div className="cognate-row"><div>Garten</div><div>Garden</div><div>garten</div></div>
              </div>
            </div>
            <div>
              <div className="lang-photo">
                <img src={PHOTOS.loveToLearn} alt="Love to learn: pencil signage representing everyday German study" loading="lazy" />
                <div className="lang-photo-cap">Built for learners starting from zero</div>
              </div>
              <div className="fact-strip">
                <div className="fact-box"><b>~100M+</b><span>native speakers, plus tens of millions more as a second language</span></div>
                <div className="fact-box"><b>#1 in EU</b><span>most spoken native language across the European Union</span></div>
                <div className="fact-box"><b>5</b><span>countries where German is an official national language</span></div>
                <div className="fact-box"><b>Top 3</b><span>most learned foreign languages in the world</span></div>
              </div>
              <div className="lang-note">
                <h4>Good to know</h4>
                <p>German nouns come in three genders (der, die, das) and change form by case. That's the part that trips up most beginners. It's also famous for compound words that stack several ideas into one: <em style={{fontFamily: "'Fraunces', serif"}}>Handschuh</em> ("hand shoe") simply means glove. Once the pattern clicks, vocabulary starts building itself.</p>
                <div className="career-icons" role="list" aria-label="Career fields German opens doors in">
                  <div className="career-icon-item" role="listitem">
                    <div className="career-icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
                    <span>Engineering</span>
                  </div>
                  <div className="career-icon-item" role="listitem">
                    <div className="career-icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
                    <span>IT &amp; Tech</span>
                  </div>
                  <div className="career-icon-item" role="listitem">
                    <div className="career-icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg></div>
                    <span>Healthcare</span>
                  </div>
                  <div className="career-icon-item" role="listitem">
                    <div className="career-icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20M4 20V10l4-3 4 3v10M12 20V6l4-3 4 3v14"/></svg></div>
                    <span>Manufacturing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why">
        <div className="wrap">
          <div className="sec-head">
            <h2>Language is the passport.<br />We help you use it.</h2>
            <p>A structured curriculum is only half the journey. The rest is culture, confidence, and what happens after you're fluent.</p>
          </div>
        </div>
        <div className="wrap">
          <div className="features-grid">
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"/></svg></div>
              <div className="fnum">01 / TRAINERS</div>
              <h3>Learn from native experts</h3>
              <p>Certified, experienced trainers who are highly proficient in German ensure you get the highest quality instruction, not a script.</p>
            </div>
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg></div>
              <div className="fnum">02 / IMMERSION</div>
              <h3>Cultural integration</h3>
              <p>Experience German culture, ethos and lifestyle through real-life scenarios and practical exercises that prepare you for life in Germany.</p>
            </div>
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
              <div className="fnum">03 / CAREERS</div>
              <h3>Placement & visa assistance</h3>
              <p>Exclusive support for the Ausbildung program, Chancenkarte, and in-demand IT and healthcare roles in Germany, right after your course.</p>
            </div>
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 22l5-3 5 3-1.5-9.5"/></svg></div>
              <div className="fnum">04 / CERTIFICATION</div>
              <h3>Exam-ready, if you need it</h3>
              <p>For learners who need a certificate, we prepare you for Goethe-Zertifikat, TestDaF and telc, targeting the exact score your visa or program requires.</p>
            </div>
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6.5C10.5 5 8 4 4 4v14c4 0 6.5 1 8 2.5 1.5-1.5 4-2.5 8-2.5V4c-4 0-6.5 1-8 2.5z"/></svg></div>
              <div className="fnum">05 / CURRICULUM</div>
              <h3>Built for your goal</h3>
              <p>Learning for travel, study, work or personal growth, beginner to advanced: the curriculum adapts to why you're learning.</p>
            </div>
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
              <div className="fnum">06 / SCHEDULE</div>
              <h3>Learn on your terms</h3>
              <p>Online, offline, or hybrid classes at a pace that fits your week, from anywhere in the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODES */}
      <section className="modes" id="modes">
        <div className="wrap">
          <div className="sec-head">
            <h2>Pick your platform.</h2>
            <p>Every format runs the same rigorous, native-taught curriculum. Choose the one that fits your life.</p>
          </div>
          <img className="modes-photo" src={PHOTOS.brandenburgWide} alt="Brandenburg Gate in Berlin, representing where your German course can take you" loading="lazy" />
          <div className="modes-grid">
            <div className="mode-card">
              <div className="mode-body">
                <span className="mode-tag">Most Popular</span>
                <h3 style={{marginTop: '14px'}}>Live Online</h3>
                <p>Interactive, instructor-led classes from any internet-enabled phone or computer, anywhere in the world.</p>
              </div>
            </div>
            <div className="mode-card">
              <div className="mode-body">
                <span className="mode-tag">In Person</span>
                <h3 style={{marginTop: '14px'}}>Classroom, South Delhi</h3>
                <p>Face-to-face batches at our South Extension centre, with peer conversation practice built in.</p>
              </div>
            </div>
            <div className="mode-card">
              <div className="mode-body">
                <span className="mode-tag">Flexible</span>
                <h3 style={{marginTop: '14px'}}>Hybrid</h3>
                <p>Mix classroom and online sessions to match a schedule that shifts week to week.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="methodology" id="methodology">
        <div className="wrap">
          <div className="sec-head">
            <h2>Not just lessons. A system for learning German.</h2>
            <p>Our approach combines structured instruction with active practice, assessment and real-world application.</p>
          </div>
          <div className="method-grid">
            {METHOD_STEPS.map((m, i) => (
              <div className="method-step" key={i}>
                <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{m.icon}</svg></div>
                <div className="step-no">{m.no}</div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="included" id="included">
        <div className="wrap">
          <div className="sec-head">
            <h2>What your German learning experience can include.</h2>
            <p>Support is designed around both language development and the goal behind your German learning journey.</p>
          </div>
          <div className="included-grid">
            {INCLUDED_ITEMS.map((it, i) => (
              <div className="included-item" key={i}><span className="tick">✓</span><span>{it}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* AUSBILDUNG / HEALTHCARE / CHANCENKARTE */}
      <section className="pathways" id="pathways">
        <div className="wrap">
          <div className="sec-head">
            <h2>Ausbildung. Healthcare jobs. Chancenkarte.</h2>
            <p>Langma's counsellors don't stop at fluency. These are the three routes we actively place candidates on, once your German is at the level each one needs.</p>
          </div>
          <div className="path-grid">
            <div className="path-card">
              <img className="path-photo" src="images/Ausbildung.png?fm=jpg&q=80&w=1200&auto=format&fit=crop" alt="Apprentices working together on a metalworking project during hands-on vocational training" loading="lazy" />
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>
              </div>
              <span className="path-tag">Vocational Training</span>
              <h3>Ausbildung</h3>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>Paid, dual vocational training: classroom study plus on-the-job pay, usually needing a B1-level German course completed to apply.</p>
              <ul>
                <li>German coaching timed to your Ausbildung application deadline</li>
                <li>Employer and training-company shortlisting by trade</li>
                <li>Application, contract review, and interview preparation</li>
                <li>Visa paperwork and pre-departure briefing</li>
              </ul>
            </div>

            <div className="path-card">
              <img className="path-photo" src="images/hl.jpg" alt="Healthcare worker in scrubs walking through a hospital corridor, representing nursing and caregiving roles" loading="lazy" />
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/><path d="M12 8v4M10 10h4"/></svg>
              </div>
              <span className="path-tag">Skilled Worker Route</span>
              <h3>Healthcare Jobs</h3>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>Germany's hospitals and care homes are actively hiring nurses and caregivers from abroad. Most listings ask for conversational B1 or B2 German, with medical vocabulary on top.</p>
              <ul>
                <li>Healthcare-specific German coaching (ward vocabulary, patient conversations)</li>
                <li>Qualification recognition guidance for nursing and caregiving degrees</li>
                <li>Direct placement support with hospitals and care-home employers</li>
                <li>Relocation, contract, and work-visa paperwork</li>
              </ul>
            </div>

            <div className="path-card">
              <img className="path-photo" src="images/Chancenkarte.jpg?fm=jpg&q=80&w=1200&auto=format&fit=crop" alt="Person using a laptop to search and apply for jobs, representing the Chancenkarte job-hunt visa" loading="lazy" />
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <span className="path-tag">Opportunity Card</span>
              <h3>Chancenkarte</h3>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>A points-based 1-year visa to job-hunt in Germany, working up to 20 hrs/week while you look. Stronger German earns you more points.</p>
              <ul>
                <li>Points-based eligibility assessment before you apply</li>
                <li>Language coaching aimed at the score that maximises your points</li>
                <li>Document checklist and application filing support</li>
                <li>Job-search coaching for the duration of the card</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER OPPORTUNITIES */}
      <section id="careers">
        <div className="wrap">
          <div className="sec-head">
            <h2>Where can German take you?</h2>
            <p>German can support multiple academic, professional and EU-wide pathways, depending on your qualifications, experience and target route.</p>
          </div>
          <div className="career-grid">
            <div className="career-card">
              <h3>Career &amp; Work in Germany</h3>
              <div className="career-tags">
                <span className="career-tag">Ausbildung</span>
                <span className="career-tag">Skilled Worker Visa</span>
                <span className="career-tag">Healthcare &amp; Nursing</span>
                <span className="career-tag">IT &amp; Engineering</span>
                <span className="career-tag">Chancenkarte</span>
                <span className="career-tag">EU Blue Card</span>
              </div>
            </div>
            <div className="career-card">
              <h3>Study &amp; Professional Opportunities</h3>
              <div className="career-tags">
                <span className="career-tag">Studienkolleg</span>
                <span className="career-tag">German Universities</span>
                <span className="career-tag">DSH Preparation</span>
                <span className="career-tag">German MNCs</span>
                <span className="career-tag">Translation</span>
                <span className="career-tag">Business German</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXAM COMPARE TABLE */}
      <section className="exam-compare" id="exam-guide">
        <div className="wrap">
          <div className="sec-head">
            <h2>Goethe, TestDaF, telc or DSH: which one is right for you?</h2>
            <p>The right assessment depends on your objective. A counsellor can help you identify the appropriate preparation route.</p>
          </div>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr><th>Exam</th><th>Best known for</th><th>Levels / format</th><th>Useful for</th></tr>
              </thead>
              <tbody>
                {EXAM_COMPARE.map((row, i) => (
                  <tr key={i}>
                    <td>{row.exam}</td>
                    <td>{row.known}</td>
                    <td>{row.levels}</td>
                    <td>{row.useful}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* UPCOMING BATCHES */}
      <section className="batches" id="batches">
        <div className="wrap">
          <div className="sec-head">
            <h2>Find a batch that fits your schedule.</h2>
            <p>We offer online, classroom and hybrid options. Ask us for the latest batch start dates, timings and course fee details.</p>
          </div>
          <div className="batch-grid">
            {BATCHES.map((b, i) => (
              <div className="batch-card" key={i}>
                <div className="batch-tag">{b.tag}</div>
                <h3>{b.title}</h3>
                <div className="batch-meta">
                  {b.meta.map(([k, v], j) => (
                    <div key={j}><b>{k}</b><span>{v}</span></div>
                  ))}
                </div>
                <a className="btn btn-primary" href={`https://wa.me/919810117094?text=${encodeURIComponent(b.msg)}`} target="_blank" rel="noopener">Get {b.tag} Batch Details →</a>
              </div>
            ))}
          </div>
          <p className="batch-note">Course fees, schedules and batch availability may vary. Contact Langma International for the current course options.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="sec-head">
            <h2>Common questions about learning German.</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details className="faq-item" key={i}>
                <summary>{f.q}</summary>
                <p className="faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES & GERMAN CULTURE */}
      <section className="activities" id="activities">
        <div className="wrap">
          <div className="sec-head">
            <div style={{fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '.14em', color: 'var(--gold-soft)', textTransform: 'uppercase', marginBottom: '10px'}}>Activities &amp; German Experience</div>
            <h2>Learn. Celebrate. Connect.</h2>
            <p>Learning German at Langma goes beyond classroom lessons. Build confidence through cultural celebrations, festive traditions and real German conversation practice.</p>
          </div>
          <div className="activity-slider" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className="activity-viewport" onTouchStart={handleActivityTouchStart} onTouchMove={handleActivityTouchMove} onTouchEnd={handleActivityTouchEnd}>
              <div className="activity-track" style={{ transform: `translateX(-${activitySlideIndex * slideWidthPct}%)` }}>
                {ACTIVITIES.map((item, i) => (
                  <div className="activity-slide" key={i} style={{ width: `${slideWidthPct}%` }}>
                    <article className="activity-card">
                      <div className="activity-image-wrap">
                        <img className="activity-image" src={item.image} alt={item.alt} loading="lazy" />
                      </div>
                      <div className="activity-content">
                        <div className="activity-icon" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                        <div className="activity-tag">{item.tag}</div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <div className="activity-controls">
              <div className="activity-dots" role="tablist" aria-label="Activity slides">
                {Array.from({ length: activityDotCount }).map((_, i) => (
                  <button key={i} className={`activity-dot${i === activitySlideIndex ? ' active' : ''}`} onClick={() => goToActivitySlide(i)} aria-label={`Go to activity slide ${i + 1}`} aria-current={i === activitySlideIndex} />
                ))}
              </div>
              <div className="activity-arrows">
                <button className="activity-arrow" onClick={prevActivitySlide} aria-label="Previous activities">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="activity-arrow" onClick={nextActivitySlide} aria-label="Next activities">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="start">
        <div className="wrap">
          <span className="kicker">Your German journey starts here</span>
          <h2>Don't just learn German. Learn where it can take you.</h2>
          <p>Get the current course fee, batch timings, learning mode and recommended level, without committing to a course first.</p>
          <div className="final-cta-actions">
            <a className="btn btn-wa" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20German%20course%20fee%20and%20batch%20details." target="_blank" rel="noopener">Get Course Details on WhatsApp →</a>
            <a className="btn btn-ghost" href="tel:+919810117094">Talk to a German Counsellor</a>
          </div>
          <div className="microcopy">No price displayed here. Ask us for the current course options, fees &amp; batch availability.</div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div className="sec-head">
            <h2>Board the next batch.</h2>
            <p>Call, WhatsApp, or drop by our South Delhi centre. A counsellor will help you pick the right starting level.</p>
          </div>

          <div className="contact-grid">
            <div>
              <div className="contact-list">
                <div className="contact-row">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h4>Call or WhatsApp</h4>
                    <a href="tel:+919810117094">+91-98101-17094</a>
                    <div className="note">Daily, 10:00 AM – 10:00 PM IST</div>
                  </div>
                </div>

                <div className="contact-row">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:info@langmainternational.com">info@langmainternational.com</a>
                    <div className="note">We reply within one business day</div>
                  </div>
                </div>

                <div className="contact-row">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4>Visit Us</h4>
                    <a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">E-73, South Extension I, Block E, New Delhi – 110049</a>
                    <div className="note">Langma International Pvt. Ltd.</div>
                  </div>
                </div>
              </div>

              <div className="social-row">
                <a className="social-chip" href="https://www.facebook.com/officiallangma" target="_blank" rel="noopener" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>
                </a>
                <a className="social-chip" href="https://www.instagram.com/officiallangma/" target="_blank" rel="noopener" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                </a>
                <a className="social-chip" href="https://www.linkedin.com/school/langma-international" target="_blank" rel="noopener" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg>
                </a>
                <a className="social-chip" href="https://x.com/official_langma" target="_blank" rel="noopener" aria-label="X">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.4 22H1.3l8.1-9.3L1 2h7l4.9 6.3L18.9 2z"/></svg>
                </a>
                <a className="social-chip" href="https://www.youtube.com/user/langmaschool" target="_blank" rel="noopener" aria-label="YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a3 3 0 0 0-2.1-2.1C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.5.4a3 3 0 0 0-2.1 2.1C2 8.8 2 12 2 12s0 3.2.4 4.7a3 3 0 0 0 2.1 2.1c1.6.4 7.5.4 7.5.4s5.9 0 7.5-.4a3 3 0 0 0 2.1-2.1c.4-1.5.4-4.7.4-4.7z"/></svg>
                </a>
              </div>
            </div>

            <div className="enroll-card">
              <h3>Get Course Fee &amp; Batch Details</h3>
              <p>Tell us your current level (or start from zero) and preferred mode. A counsellor can share the current fee, batch options and recommended level.</p>
              <form id="enrollForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label htmlFor="fname">Full Name</label>
                  <input type="text" id="fname" name="name" autoComplete="name" placeholder="Your name" required />
                </div>
                <div className="form-row">
                  <label htmlFor="fphone">Phone Number</label>
                  <input
                    type="tel"
                    id="fphone"
                    name="phone"
                    autoComplete="tel"
                    ref={phoneRef}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                    aria-invalid={phoneError}
                    aria-describedby={phoneError ? "fphone-error" : undefined}
                    onChange={() => setPhoneError(false)}
                    style={phoneError ? { outline: '2px solid #E4574C' } : undefined}
                  />
                  {phoneError && <span id="fphone-error" className="field-error" role="alert">Enter a valid 10-digit phone number</span>}
                </div>
                <div className="form-row">
                  <label htmlFor="femail">Email</label>
                  <input type="email" id="femail" name="email" autoComplete="email" placeholder="you@example.com" required />
                </div>
                <input type="hidden" name="language" value="German" />
                <input type="hidden" name="message" value="German Language Course enquiry" />
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Submitting..." : "Get Course Fee & Batch Details →"}
                </button>
                {formMessage && (
                  <div className={`form-msg ${formSubmitted ? "success" : "error"}`} role="status">
                    {formSubmitted ? `✓ ${formMessage}` : formMessage}
                  </div>
                )}
              </form>
              <div className="form-alt">
                <span style={{fontSize: '13px', color: 'rgba(255,255,255,.7)'}}>Prefer to skip the form?</span>
                <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20German%20course%20fee%20and%20batch%20details." target="_blank" rel="noopener" style={{fontSize: '13px', fontWeight: '600', color: 'var(--gold-soft)', textDecoration: 'underline'}}>Message us on WhatsApp →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="map-strip">
            <a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">Get Directions →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="de-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="https://www.langmainternational.com/images/ftrnlg.png" alt="Langma International" className="footer-logo" />
              <div className="de-motto">Learn German. Understand Germany. Build Your Future.</div>
              <p>Learn German with structured A1–C2 learning, practical communication, cultural context and Germany-focused counselling.</p>
            </div>
            <div className="footer-col">
              <h4>Learn</h4>
              <a href="#course-details">German Course</a>
              <a href="#skills">What You Learn</a>
              <a href="#methodology">Teaching Method</a>
              <a href="#batches">Batches</a>
            </div>
            <div className="footer-col">
              <h4>Germany</h4>
              <a href="#activities">Cultural Activities</a>
              <a href="#pathways">Germany Pathways</a>
              <a href="#careers">Career Opportunities</a>
              <a href="#exam-guide">Goethe / TestDaF / telc</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="tel:+919810117094">+91-98101-17094</a>
              <a href="mailto:info@langmainternational.com">info@langmainternational.com</a>
              <a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">South Extension I, New Delhi</a>
              <a href="#contact">Free Counselling</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Langma International Pvt. Ltd.</span>
            <span>GERMAN LANGUAGE · NEW DELHI</span>
          </div>
        </div>
      </footer>

      {/* FLOATING CALL */}
      <a href="tel:+919810117094" className="call-float" id="callFloat" aria-label="Call Langma">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
      <div className="call-tip" id="callTip">Call us: +91-98101-17094</div>

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20German%20course%20fee%20and%20next%20batch%20details." target="_blank" rel="noopener" className="wa-float" id="waFloat" aria-label="Chat on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
      </a>
      <div className={`wa-tip${showWaTip ? ' show' : ''}`} id="waTip">Chat with us, usually replies in minutes</div>
    </div>
  );
}