import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   LANGMA INTERNATIONAL — GOLDEN VISA ELIGIBILITY ASSESSMENT™
   Content, structure, layout and typography ported directly from
   the original HTML build. The colour system is remapped to the
   teal-on-white single-accent palette (teal #0A6B64) carried over
   from the Italy Golden Visa React design — light surfaces, a
   single luminous teal accent, no separate gold.
============================================================ */

/* ---------- assessment data ---------- */

const SECTION_LABELS = ["Objectives", "Investment", "Family", "Outlook", "Vision"];

const QUESTIONS = [
  {
    name: "q1",
    section: 1,
    sectionName: "Objectives",
    sectionLabel: "Section 1 — Your Golden Visa Objectives",
    number: 1,
    q: "What is your primary objective for pursuing a Golden Visa?",
    options: [
      { value: "mobility", label: "Global mobility and visa-free travel" },
      { value: "stability", label: "Securing residency in a stable country" },
      { value: "education", label: "Access to better education opportunities for children" },
      { value: "wealth", label: "Wealth preservation and international diversification" },
      { value: "citizenship", label: "Future citizenship opportunities" },
      { value: "lifestyle", label: "Family relocation and lifestyle enhancement" },
    ],
  },
  {
    name: "q2",
    section: 1,
    sectionName: "Objectives",
    sectionLabel: "Section 1 — Your Golden Visa Objectives",
    number: 2,
    q: "Which residency pathway interests you most?",
    options: [
      { value: "europe", label: "Europe (Portugal, Greece, Italy, Hungary, Latvia)" },
      { value: "uae", label: "UAE Golden Visa" },
      { value: "panama", label: "Panama Investment Residency" },
      { value: "recommend", label: "Open to Expert Recommendations" },
    ],
  },
  {
    name: "q3",
    section: 2,
    sectionName: "Investment",
    sectionLabel: "Section 2 — Timeline & Investment",
    number: 3,
    q: "How soon are you planning to obtain a Golden Visa?",
    options: [
      { value: "3months", label: "Immediately (Within 3 Months)" },
      { value: "6months", label: "Within 6 Months" },
      { value: "12months", label: "Within 12 Months" },
      { value: "future", label: "Exploring Options for the Future" },
      { value: "unsure", label: "Not Sure Yet" },
    ],
  },
  {
    name: "q4",
    section: 2,
    sectionName: "Investment",
    sectionLabel: "Section 2 — Timeline & Investment",
    number: 4,
    q: "What is your estimated investment budget?",
    options: [
      { value: "below100k", label: "Below €100,000" },
      { value: "100to250k", label: "€100,000 – €250,000" },
      { value: "250to500k", label: "€250,000 – €500,000" },
      { value: "500kto1m", label: "€500,000 – €1 Million" },
      { value: "above1m", label: "Above €1 Million" },
    ],
  },
  {
    name: "q5",
    section: 3,
    sectionName: "Family",
    sectionLabel: "Section 3 — Family & Professional Profile",
    number: 5,
    q: "Who would you like to include in your Golden Visa application?",
    options: [
      { value: "self", label: "Self Only" },
      { value: "spouse", label: "Spouse" },
      { value: "spousekids", label: "Spouse and Children" },
      { value: "multigen", label: "Multi-Generational Family (Parents Included)" },
      { value: "undecided", label: "Yet to Decide" },
    ],
  },
  {
    name: "q6",
    section: 3,
    sectionName: "Family",
    sectionLabel: "Section 3 — Family & Professional Profile",
    number: 6,
    q: "What is your current professional status?",
    options: [
      { value: "entrepreneur", label: "Business Owner / Entrepreneur" },
      { value: "executive", label: "Senior Executive" },
      { value: "investor", label: "Investor" },
      { value: "selfemployed", label: "Self-Employed Professional" },
      { value: "retired", label: "Retired Individual" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "q7",
    section: 4,
    sectionName: "Outlook",
    sectionLabel: "Section 4 — Your Global Financial Outlook",
    number: 7,
    q: "Do you currently hold assets or investments outside your home country?",
    options: [
      { value: "multiple", label: "Yes, Multiple International Investments" },
      { value: "limited", label: "Yes, Limited International Investments" },
      { value: "planning", label: "No, But Planning To Diversify" },
      { value: "no", label: "No" },
    ],
  },
  {
    name: "q8",
    section: 4,
    sectionName: "Outlook",
    sectionLabel: "Section 4 — Your Global Financial Outlook",
    number: 8,
    q: "How important is a potential pathway to permanent residency or citizenship?",
    options: [
      { value: "extremely", label: "Extremely Important" },
      { value: "very", label: "Very Important" },
      { value: "somewhat", label: "Somewhat Important" },
      { value: "notpriority", label: "Not a Priority" },
      { value: "unsure", label: "Unsure" },
    ],
  },
  {
    name: "q9",
    section: 5,
    sectionName: "Vision",
    sectionLabel: "Section 5 — Your Future Vision",
    number: 9,
    q: "What is your approximate annual income level?",
    options: [
      { value: "below50k", label: "Below €50,000" },
      { value: "50to100k", label: "€50,000 – €100,000" },
      { value: "100to250k", label: "€100,000 – €250,000" },
      { value: "250to500k", label: "€250,000 – €500,000" },
      { value: "above500k", label: "Above €500,000" },
    ],
  },
  {
    name: "q10",
    section: 5,
    sectionName: "Vision",
    sectionLabel: "Section 5 — Your Future Vision",
    number: 10,
    q: "Would you like a personalised Golden Visa strategy consultation with a specialist advisor?",
    options: [
      { value: "schedule", label: "Yes, Schedule My Consultation" },
      { value: "moreinfo", label: "Yes, I Need More Information First" },
      { value: "later", label: "Maybe Later" },
      { value: "no", label: "No" },
    ],
  },
];

const WHY_FACTORS = [
  {
    label: "Investment Capacity",
    icon: (
      <>
        <ellipse cx="12" cy="7" rx="7" ry="3" />
        <path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </>
    ),
  },
  {
    label: "Family Inclusion",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    label: "Global Mobility Goals",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
      </>
    ),
  },
  {
    label: "Professional Profile",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </>
    ),
  },
  {
    label: "Programme Timeline",
    icon: (
      <>
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10v9h12v-9" />
      </>
    ),
  },
  {
    label: "Future Citizenship Pathway",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Complete the Assessment",
    body: "Answer a focused series of questions about your objectives, investment range, family situation, and timeline.",
    outcome: "A clear picture of your Golden Visa profile — built in minutes, not months.",
  },
  {
    n: "02",
    title: "Receive Your Eligibility Profile",
    body: "Our specialists evaluate your responses to identify programmes genuinely aligned with your profile and investment capacity.",
    outcome: "A curated shortlist built around your goals — not generic programme rankings.",
  },
  {
    n: "03",
    title: "Explore Matched Programmes",
    body: "Receive clear insight into your matched Golden Visa destinations — including investment requirements, timelines, and family inclusion.",
    outcome: "Real context for every programme — financial, practical, and family-focused.",
  },
  {
    n: "04",
    title: "Connect With A Specialist Advisor",
    body: "Book a no-obligation consultation with a Langma International advisor to discuss your personalised global mobility strategy.",
    outcome: "A clear path forward — guided by an expert, not navigated alone.",
  },
];

const NEXT_STEPS = [
  "Personalised Profile Review",
  "Eligibility Assessment by Experts",
  "Tailored Programme Recommendations",
  "Investment & Residency Guidance",
  "One-to-One Consultation Opportunity",
];

const DEST_BADGES = [
  { flag: "🇵🇹", tag: "Highly Matched", name: "Portugal Golden Visa" },
  { flag: "🇦🇪", tag: "Strong Match", name: "UAE Golden Visa" },
  { flag: "🇵🇦", tag: "Consider", name: "Panama Investment Residency" },
];

const TRUST_ITEMS = [
  {
    label: "Confidential & Discreet Advisory",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    label: "Golden Visa Programmes Worldwide",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
      </>
    ),
  },
  {
    label: "Family-Inclusive Planning",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    label: "No Obligation Assessment",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

const TOTAL = QUESTIONS.length; // 10
const SECTIONS = 5;

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function GoldenVisaAssessment() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(0); // 0-indexed
  const [answers, setAnswers] = useState({});
  const [formState, setFormState] = useState("idle"); // idle | submitting | done

  const wizardWrapRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const step = QUESTIONS[current];
  const section = step.section;
  const pct = Math.round((current / TOTAL) * 100);

  const segFill = (segIndex) => {
    const secNum = segIndex + 1;
    if (secNum < section) return "100%";
    if (secNum === section) {
      const posInSection = current - (section - 1) * 2;
      return (posInSection / 2) * 100 + "%";
    }
    return "0%";
  };

  const goTo = (idx) => {
    setCurrent(idx);
    requestAnimationFrame(() => {
      wizardWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  const handleNext = () => {
    if (current < TOTAL - 1) {
      goTo(current + 1);
    } else {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (current > 0) goTo(current - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("done"), 1200);
  };

  return (
    <div className="lgv">
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

/* ============================================================
   DESIGN TOKENS
   Teal (#0A6B64) on white — a single luminous accent system.
   The original emerald + gold palette is remapped to shades of
   teal: deep teal for dark surfaces and headings, a bright teal
   for the luminous accent that formerly read as gold. Variable
   names are preserved for structural compatibility.
============================================================ */
:root{
  --charcoal:#123A34;
  --charcoal-deep:#0A241F;
  --midnight:#0E2E29;
  --emerald:#0A6B64;
  --emerald-deep:#075049;
  --emerald-mid:#0E8079;
  --gold:#4FB8AC;
  --gold-deep:#0A6B64;
  --bronze:#2F8F84;

  --ivory:#F1F8F7;
  --ivory-2:#E7F3F1;
  --stone:#DCEFEB;
  --pearl:#FFFFFF;
  --ink:#1E2A28;
  --ink-soft:#5B6864;
  --accent-tint:rgba(10,107,100,0.08);
  --accent-tint-2:rgba(10,107,100,0.16);
  --gold-tint:rgba(79,184,172,0.18);
  --gold-tint-soft:rgba(79,184,172,0.10);
  --bronze-tint:rgba(14,128,121,0.12);
  --line:rgba(10,107,100,0.14);
  --shadow-soft:0 24px 54px -26px rgba(10,54,49,0.34);
  --shadow-card:0 14px 32px -20px rgba(10,54,49,0.18);
  --radius-lg:28px;
  --radius-md:18px;
  --radius-sm:10px;
  --max:1180px;
  --serif:'Fraunces', serif;
  --sans:'Inter', -apple-system, sans-serif;
  --mono:'IBM Plex Mono', monospace;
}

.lgv *{box-sizing:border-box;}
.lgv{
  scroll-behavior:smooth;
  margin:0;
  font-family:var(--sans);
  color:var(--ink);
  background:var(--ivory);
  -webkit-font-smoothing:antialiased;
  line-height:1.55;
  position:relative;
}
.lgv img,.lgv svg{display:block;}
.lgv a{color:inherit;text-decoration:none;}
.lgv ul{margin:0;padding:0;list-style:none;}
.lgv h1,.lgv h2,.lgv h3,.lgv h4{font-family:var(--serif);margin:0;font-weight:600;letter-spacing:-0.01em;}
.lgv p{margin:0;}
.lgv *:focus-visible{outline:2px solid var(--emerald-mid);outline-offset:3px;border-radius:4px;}

@media (prefers-reduced-motion: reduce){
  .lgv *{animation:none !important;transition:none !important;}
  .lgv{scroll-behavior:auto;}
}

/* signature spectrum bar */
.lgv::before{
  content:"";position:sticky;top:0;left:0;right:0;height:3px;z-index:200;display:block;
  background:linear-gradient(90deg,var(--charcoal),var(--emerald-mid),var(--gold),var(--bronze));
}

.lgv .wrap{max-width:var(--max);margin:0 auto;padding:0 28px;}
.lgv .eyebrow{
  font-family:var(--mono);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;
  color:var(--emerald-deep);display:inline-flex;align-items:center;gap:10px;
}
.lgv .eyebrow::before{
  content:"";width:7px;height:7px;border-radius:50%;background:var(--gold);display:inline-block;
}
.lgv .dotgrid{
  position:absolute;inset:0;
  background-image:radial-gradient(circle, rgba(34,31,27,0.07) 1px, transparent 1.4px);
  background-size:22px 22px;opacity:0.5;pointer-events:none;
}

@keyframes routePulse{0%,100%{stroke-dashoffset:200;}50%{stroke-dashoffset:0;}}
@keyframes dotFloat{0%,100%{transform:translateY(0px);}50%{transform:translateY(-8px);}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}

/* ============ NAV ============ */
.lgv .nav{
  position:sticky;top:3px;z-index:50;
  background:rgba(241,248,247,0.92);backdrop-filter:blur(10px);
  border-bottom:1px solid transparent;transition:border-color .25s ease, box-shadow .25s ease;
}
.lgv .nav.is-scrolled{border-bottom-color:var(--line);box-shadow:0 6px 24px -18px rgba(10,54,49,0.3);}
.lgv .nav__inner{
  max-width:var(--max);margin:0 auto;padding:16px 28px;
  display:flex;align-items:center;justify-content:space-between;
}
.lgv .brand{display:flex;align-items:center;gap:10px;font-family:var(--serif);font-size:19px;font-weight:700;color:var(--charcoal);}
.lgv .brand__dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-mid),var(--gold));flex:0 0 10px;}
.lgv .brand small{display:block;font-family:var(--mono);font-size:10px;letter-spacing:0.12em;font-weight:400;color:var(--ink-soft);text-transform:uppercase;margin-top:1px;}
.lgv .nav__cta{
  font-family:var(--mono);font-size:12px;letter-spacing:0.06em;text-transform:uppercase;
  background:var(--charcoal);color:var(--ivory);padding:11px 22px;border-radius:999px;
  transition:transform .18s ease, background .18s ease;
}
.lgv .nav__cta:hover{background:var(--emerald-deep);transform:translateY(-1px);}

/* ============ BUTTONS ============ */
.lgv .btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-family:var(--sans);font-weight:600;font-size:15px;
  padding:15px 28px;border-radius:999px;border:none;cursor:pointer;
  transition:transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.lgv .btn-primary{
  background:linear-gradient(135deg,var(--charcoal),var(--emerald-deep));color:var(--ivory);
  box-shadow:0 14px 30px -14px rgba(7,80,73,0.55);
}
.lgv .btn-primary:hover{
  background:linear-gradient(135deg,var(--emerald-deep),var(--emerald-mid));
  transform:translateY(-2px);box-shadow:0 18px 34px -12px rgba(7,80,73,0.6);
}
.lgv .btn-gold{
  background:linear-gradient(135deg,var(--emerald),var(--gold));color:var(--pearl);
  box-shadow:0 14px 30px -14px rgba(10,107,100,0.5);font-weight:700;
}
.lgv .btn-gold:hover{transform:translateY(-2px);box-shadow:0 18px 34px -12px rgba(10,107,100,0.55);}
.lgv .btn-ghost{background:transparent;color:var(--ink);border:1.5px solid var(--line);}
.lgv .btn-ghost:hover{border-color:var(--emerald-deep);transform:translateY(-2px);}
.lgv .btn-block{width:100%;}

/* ============ HERO ============ */
.lgv .hero{
  position:relative;overflow:hidden;padding:80px 0 100px;
  background:
    radial-gradient(120% 90% at 82% 6%, rgba(10,107,100,0.08) 0%, transparent 55%),
    radial-gradient(90% 80% at 8% 92%, rgba(14,128,121,0.07) 0%, transparent 55%),
    var(--pearl);
  border-bottom:1px solid var(--line);
}
.lgv .hero .dotgrid{background-image:radial-gradient(circle, rgba(10,107,100,0.08) 1px, transparent 1.4px);opacity:0.6;}
.lgv .hero__grid{position:relative;z-index:1;display:grid;grid-template-columns:1.1fr 0.9fr;gap:56px;align-items:center;}
.lgv .hero h1{font-size:clamp(32px,4.2vw,50px);line-height:1.1;margin:18px 0 18px;color:var(--charcoal);}
.lgv .hero__sub{font-size:16px;color:var(--emerald-deep);max-width:520px;margin-bottom:14px;line-height:1.55;font-family:var(--serif);font-weight:600;}
.lgv .hero__desc{font-size:15px;color:var(--ink-soft);max-width:520px;margin-bottom:24px;line-height:1.65;}
.lgv .hero__eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--emerald-deep);display:inline-flex;align-items:center;gap:10px;}
.lgv .hero__eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--emerald);display:inline-block;}
.lgv .value-list{display:flex;flex-direction:column;gap:11px;margin-bottom:34px;}
.lgv .value-list li{display:flex;align-items:flex-start;gap:10px;font-size:14.5px;color:var(--ink);}
.lgv .value-list li .vcheck{flex:0 0 20px;width:20px;height:20px;margin-top:1px;border-radius:50%;background:var(--accent-tint);border:1.5px solid var(--emerald);display:flex;align-items:center;justify-content:center;}
.lgv .value-list li .vcheck svg{width:10px;height:10px;stroke:var(--emerald-deep);stroke-width:2.5;fill:none;}
.lgv .hero__ctas{display:flex;flex-wrap:wrap;gap:14px;align-items:center;}
.lgv .hero__ctas .btn-ghost{font-size:14px;padding:14px 22px;color:var(--ink);border-color:var(--line);}
.lgv .hero__ctas .btn-ghost:hover{border-color:var(--emerald-deep);color:var(--emerald-deep);}

/* golden visa eligibility card */
.lgv .passport-card{
  position:relative;background:var(--pearl);border-radius:var(--radius-lg);
  box-shadow:0 30px 60px -20px rgba(6,30,27,0.5);padding:28px 28px 0;overflow:hidden;
  border:1px solid rgba(255,255,255,0.15);animation:fadeUp 0.8s ease 0.3s both;
}
.lgv .passport-card__stripe{position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--charcoal),var(--emerald-mid),var(--gold));}
.lgv .passport-card__top{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.lgv .passport-card__top .pct-label{font-family:var(--mono);font-size:10.5px;letter-spacing:0.08em;color:var(--ink-soft);text-transform:uppercase;}
.lgv .passport-card__emblem{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--charcoal),var(--emerald-deep));display:flex;align-items:center;justify-content:center;}
.lgv .passport-card__emblem svg{width:18px;height:18px;fill:none;stroke:var(--gold);stroke-width:1.5;}
.lgv .pc-route{display:flex;align-items:center;gap:12px;margin-bottom:22px;}
.lgv .pc-city{flex:1;}
.lgv .pc-city span{display:block;font-family:var(--mono);font-size:10px;color:var(--ink-soft);letter-spacing:0.1em;margin-bottom:5px;text-transform:uppercase;}
.lgv .pc-city strong{font-family:var(--serif);font-size:20px;font-weight:600;color:var(--charcoal);}
.lgv .pc-arrow{color:var(--emerald-mid);font-size:22px;}
.lgv .pc-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px;}
.lgv .pc-tag{font-family:var(--mono);font-size:10.5px;letter-spacing:0.05em;padding:5px 10px;border-radius:6px;background:var(--accent-tint);color:var(--emerald-deep);border:1px solid rgba(10,107,100,0.16);}
.lgv .pc-tag.gold{background:var(--gold-tint);color:var(--bronze);border-color:rgba(79,184,172,0.32);}
.lgv .pc-tag.bronze{background:var(--bronze-tint);color:var(--bronze);border-color:rgba(14,128,121,0.24);}
.lgv .passport-card__perf{position:relative;height:0;border-top:2px dashed var(--line);margin:0 -28px;}
.lgv .passport-card__perf::before,.lgv .passport-card__perf::after{content:"";position:absolute;top:-11px;width:22px;height:22px;border-radius:50%;background:var(--ivory);}
.lgv .passport-card__perf::before{left:-11px;}
.lgv .passport-card__perf::after{right:-11px;}
.lgv .passport-card__stub{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px 0 22px;}
.lgv .passport-card__stub > div span{display:block;font-family:var(--mono);font-size:10px;color:var(--ink-soft);letter-spacing:0.1em;margin-bottom:5px;text-transform:uppercase;}
.lgv .passport-card__stub > div strong{font-family:var(--sans);font-size:14px;font-weight:600;color:var(--charcoal);}
.lgv .stamp{width:62px;height:62px;flex:0 0 62px;opacity:0.9;transform:rotate(-8deg);}
.lgv .stamp circle{fill:none;stroke:var(--emerald-mid);}
.lgv .stamp text{font-family:var(--mono);font-size:6.4px;letter-spacing:1.5px;fill:var(--emerald-mid);text-transform:uppercase;}
.lgv .stamp .stamp-core{font-family:var(--serif);font-size:11px;font-weight:700;fill:var(--emerald-mid);}

/* floating programme badges */
.lgv .dest-badges{display:flex;flex-direction:column;gap:10px;margin-top:16px;}
.lgv .dest-badge{display:flex;align-items:center;gap:12px;background:var(--pearl);border:1px solid var(--line);box-shadow:var(--shadow-card);border-radius:12px;padding:12px 16px;animation:dotFloat 4s ease-in-out infinite;}
.lgv .dest-badge:nth-child(2){animation-delay:1.3s;}
.lgv .dest-badge:nth-child(3){animation-delay:2.6s;}
.lgv .dest-badge__flag{width:32px;height:32px;border-radius:8px;flex:0 0 32px;display:flex;align-items:center;justify-content:center;font-size:18px;background:var(--accent-tint);}
.lgv .dest-badge__info span{display:block;font-family:var(--mono);font-size:10px;color:var(--emerald-deep);letter-spacing:0.06em;text-transform:uppercase;}
.lgv .dest-badge__info strong{display:block;font-size:13px;font-weight:600;color:var(--charcoal);}

/* route lines */
.lgv .globe-routes{position:absolute;top:0;right:0;width:50%;height:100%;pointer-events:none;opacity:0.28;}
.lgv .route-path{stroke:var(--emerald-mid);stroke-width:1;fill:none;stroke-dasharray:180;animation:routePulse 5s ease-in-out infinite;}
.lgv .route-path:nth-child(2){animation-delay:-2s;stroke:var(--gold);}
.lgv .route-path:nth-child(3){animation-delay:-3.5s;stroke:var(--emerald-deep);}

/* ============ TRUST BAR ============ */
.lgv .trust-bar{background:var(--charcoal);padding:20px 0;border-top:1px solid rgba(255,255,255,0.06);}
.lgv .trust-bar__inner{display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap;}
.lgv .trust-item{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:11px;letter-spacing:0.06em;color:rgba(255,255,255,0.66);text-transform:uppercase;}
.lgv .trust-item svg{width:16px;height:16px;stroke:var(--gold);fill:none;stroke-width:1.6;flex:0 0 16px;}

/* ============ WHY SECTION ============ */
.lgv .why{padding:96px 0;background:var(--ivory);}
.lgv .why__grid{display:grid;grid-template-columns:1.05fr 0.95fr;gap:60px;align-items:start;}
.lgv .why h2{font-size:clamp(28px,3.4vw,38px);margin:16px 0 20px;color:var(--charcoal);}
.lgv .why p{color:var(--ink-soft);font-size:15.5px;margin-bottom:16px;line-height:1.65;}
.lgv .why p strong{color:var(--ink);font-weight:600;}
.lgv .why__cta{margin-top:8px;font-family:var(--mono);font-size:13px;letter-spacing:0.04em;color:var(--emerald-deep);display:inline-flex;align-items:center;gap:6px;border-bottom:1.5px solid var(--emerald-deep);padding-bottom:3px;transition:color .15s,border-color .15s;}
.lgv .why__cta:hover{color:var(--bronze);border-color:var(--bronze);}
.lgv .factor-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.lgv .factor-card{background:var(--pearl);border:1px solid var(--line);border-radius:var(--radius-md);padding:20px 18px;box-shadow:var(--shadow-card);display:flex;flex-direction:column;gap:12px;transition:transform .18s ease, box-shadow .18s ease;}
.lgv .factor-card:hover{transform:translateY(-3px);box-shadow:0 18px 36px -20px rgba(10,54,49,0.22);}
.lgv .factor-icon{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--accent-tint),var(--gold-tint-soft));display:flex;align-items:center;justify-content:center;}
.lgv .factor-icon svg{width:18px;height:18px;stroke:var(--emerald-deep);fill:none;stroke-width:1.6;}
.lgv .factor-card span{font-size:13.5px;font-weight:600;color:var(--charcoal);}

/* ============ HOW IT WORKS ============ */
.lgv .how{padding:96px 0;background:linear-gradient(180deg,var(--ivory-2),var(--ivory));}
.lgv .how__head{text-align:center;max-width:560px;margin:0 auto 48px;}
.lgv .how__head h2{font-size:clamp(28px,3.4vw,38px);margin:14px 0 0;color:var(--charcoal);}
.lgv .steps{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.lgv .step-card{background:var(--pearl);border:1px solid var(--line);border-radius:var(--radius-md);padding:26px 22px;box-shadow:var(--shadow-card);transition:transform .18s ease;}
.lgv .step-card:hover{transform:translateY(-4px);}
.lgv .step-badge{width:46px;height:46px;border-radius:50%;border:1.6px solid var(--emerald-mid);display:flex;align-items:center;justify-content:center;margin-bottom:18px;position:relative;background:var(--pearl);}
.lgv .step-badge::before{content:"";position:absolute;inset:5px;border-radius:50%;border:1px solid var(--accent-tint-2);}
.lgv .step-badge span{font-family:var(--mono);font-weight:500;font-size:14px;color:var(--emerald-deep);}
.lgv .step-card h3{font-size:16.5px;font-weight:600;font-family:var(--sans);margin-bottom:8px;color:var(--charcoal);}
.lgv .step-card p{font-size:13.5px;color:var(--ink-soft);margin-bottom:14px;line-height:1.55;}
.lgv .step-outcome{font-family:var(--mono);font-size:11px;color:var(--emerald-deep);background:var(--accent-tint);padding:8px 10px;border-radius:8px;line-height:1.45;border:1px solid rgba(10,107,100,0.15);}

/* ============ ASSESSMENT (wizard) ============ */
.lgv .assessment{padding:96px 0;background:var(--ivory);}
.lgv .assessment__head{max-width:620px;margin:0 auto 14px;text-align:center;}
.lgv .assessment__head .eyebrow{justify-content:center;}
.lgv .assessment__head h2{font-size:clamp(28px,3.4vw,38px);margin:16px 0 10px;color:var(--charcoal);}
.lgv .assessment__head p{color:var(--ink-soft);font-size:15px;}
.lgv .wizard-progress{max-width:760px;margin:42px auto 50px;}
.lgv .progress-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
.lgv .progress-pct{font-family:var(--mono);font-size:11px;letter-spacing:0.06em;color:var(--emerald-deep);font-weight:500;}
.lgv .progress-bar{display:flex;gap:5px;}
.lgv .progress-seg{flex:1;height:5px;border-radius:6px;background:var(--line);overflow:hidden;}
.lgv .progress-seg__fill{height:100%;width:0%;background:linear-gradient(90deg,var(--charcoal),var(--emerald-mid));transition:width .4s ease;}
.lgv .progress-labels{display:flex;justify-content:space-between;margin-top:10px;font-family:var(--mono);font-size:10px;letter-spacing:0.06em;color:var(--ink-soft);text-transform:uppercase;}
.lgv .progress-labels span.is-active{color:var(--emerald-deep);font-weight:600;}
.lgv .wizard-wrap{max-width:760px;margin:0 auto;}
.lgv .wizard-step{animation:fadeUp 0.35s ease both;}
.lgv .qcard{background:var(--pearl);border:1px solid var(--line);border-radius:var(--radius-md);box-shadow:var(--shadow-card);padding:32px 32px 28px;margin-bottom:16px;}
.lgv .qcard__section{font-family:var(--mono);font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:var(--bronze);margin-bottom:6px;}
.lgv .qcard__num{font-family:var(--mono);font-size:11px;color:var(--ink-soft);margin-bottom:14px;display:block;}
.lgv .qcard h3{font-family:var(--sans);font-size:17px;font-weight:600;color:var(--charcoal);margin-bottom:6px;line-height:1.35;}
.lgv .qcard .qhint{display:block;font-family:var(--mono);font-size:10.5px;color:var(--ink-soft);letter-spacing:0.04em;margin-bottom:18px;text-transform:uppercase;}
.lgv .options{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.lgv .option{position:relative;display:flex;align-items:center;gap:11px;border:1.5px solid var(--line);border-radius:var(--radius-sm);padding:13px 15px;font-size:13.8px;cursor:pointer;transition:border-color .15s ease, background .15s ease, box-shadow .15s ease;color:var(--ink);}
.lgv .option input{position:absolute;opacity:0;inset:0;cursor:pointer;margin:0;}
.lgv .option__dot{width:18px;height:18px;border-radius:50%;border:1.6px solid #bcd6d2;flex:0 0 18px;position:relative;transition:border-color .15s ease;}
.lgv .option__dot::after{content:"";position:absolute;inset:3px;border-radius:50%;background:linear-gradient(135deg,var(--charcoal),var(--emerald-mid));transform:scale(0);transition:transform .15s ease;}
.lgv .option:has(input:checked){border-color:var(--emerald-deep);background:var(--accent-tint);}
.lgv .option:has(input:checked) .option__dot{border-color:var(--emerald-deep);}
.lgv .option:has(input:checked) .option__dot::after{transform:scale(1);}
.lgv .option:hover:not(:has(input:checked)){border-color:rgba(10,107,100,0.3);background:rgba(10,107,100,0.03);}
.lgv .wizard-nav{display:flex;align-items:center;justify-content:space-between;margin-top:28px;max-width:760px;margin-left:auto;margin-right:auto;padding:0 2px;}
.lgv .wizard-nav .btn{min-width:140px;}
.lgv .wizard-nav .btn-back{background:transparent;color:var(--ink-soft);border:1.5px solid var(--line);}
.lgv .wizard-nav .btn-back:hover{border-color:var(--charcoal);color:var(--charcoal);}
.lgv .wizard-counter{font-family:var(--mono);font-size:11.5px;color:var(--ink-soft);letter-spacing:0.04em;}

/* ============ RESULTS ============ */
.lgv .results{padding:100px 0;background:linear-gradient(180deg,var(--stone),var(--ivory-2));position:relative;}
.lgv .results__head{text-align:center;max-width:660px;margin:0 auto 14px;}
.lgv .results__head .eyebrow{justify-content:center;}
.lgv .results__head h2{font-size:clamp(26px,3.2vw,36px);margin:16px 0 12px;color:var(--charcoal);}
.lgv .results__head p{font-size:15px;color:var(--ink-soft);line-height:1.65;}
.lgv .next-head{text-align:center;max-width:520px;margin:56px auto 28px;}
.lgv .next-head .eyebrow{justify-content:center;}
.lgv .next-head h3{font-family:var(--serif);font-size:clamp(20px,2.4vw,26px);margin:14px 0 0;color:var(--charcoal);}
.lgv .next-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;max-width:1040px;margin:0 auto 64px;}
.lgv .next-card{background:var(--pearl);border:1px solid var(--line);border-radius:var(--radius-md);padding:20px 16px;box-shadow:var(--shadow-card);text-align:center;transition:transform .2s ease, box-shadow .2s ease;}
.lgv .next-card:hover{transform:translateY(-4px);box-shadow:0 18px 34px -18px rgba(10,54,49,0.22);}
.lgv .next-card__check{width:34px;height:34px;border-radius:50%;margin:0 auto 12px;background:var(--accent-tint);border:1.5px solid var(--emerald-mid);display:flex;align-items:center;justify-content:center;}
.lgv .next-card__check svg{width:15px;height:15px;stroke:var(--emerald-deep);stroke-width:2.4;fill:none;}
.lgv .next-card p{font-size:12.5px;color:var(--ink);font-weight:600;line-height:1.4;}

/* lead capture card */
.lgv .lead-card{max-width:580px;margin:0 auto;background:var(--pearl);border-radius:var(--radius-lg);box-shadow:var(--shadow-soft);padding:46px 42px;text-align:center;position:relative;border:1px solid var(--line);}
.lgv .lead-card__badge{position:absolute;top:-18px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--charcoal),var(--emerald-deep));color:var(--ivory);font-family:var(--mono);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;padding:8px 20px;border-radius:999px;box-shadow:0 8px 20px -8px rgba(7,80,73,0.5);white-space:nowrap;}
.lgv .lead-card h2{font-size:clamp(22px,2.6vw,28px);margin:20px 0 12px;color:var(--charcoal);}
.lgv .lead-card > p{color:var(--ink-soft);font-size:14.5px;margin-bottom:28px;text-align:left;line-height:1.6;}
.lgv .form-grid{display:flex;flex-direction:column;gap:14px;text-align:left;margin-bottom:18px;}
.lgv .field label{display:block;font-family:var(--mono);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:7px;}
.lgv .field input{width:100%;border:1.5px solid var(--line);border-radius:var(--radius-sm);padding:12px 14px;font-family:var(--sans);font-size:14px;background:var(--ivory);color:var(--ink);transition:border-color .15s ease, background .15s ease;appearance:none;-webkit-appearance:none;}
.lgv .field input:focus{border-color:var(--emerald-deep);background:var(--pearl);outline:none;}
.lgv .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.lgv .trust-note{font-family:var(--mono);font-size:11px;color:var(--ink-soft);margin-top:16px;line-height:1.55;display:flex;align-items:flex-start;gap:8px;text-align:left;}
.lgv .trust-note svg{width:14px;height:14px;stroke:var(--emerald-mid);fill:none;stroke-width:1.6;flex:0 0 14px;margin-top:1px;}

/* ============ FOOTER ============ */
.lgv footer{padding:42px 0;text-align:center;background:var(--charcoal);border-top:1px solid rgba(255,255,255,0.05);}
.lgv footer p{font-family:var(--mono);font-size:11.5px;color:rgba(255,255,255,0.45);letter-spacing:0.06em;}
.lgv footer a{color:rgba(255,255,255,0.6);transition:color .15s;}
.lgv footer a:hover{color:var(--gold);}

/* ============ RESPONSIVE ============ */
@media (max-width:980px){
  .lgv .hero__grid{grid-template-columns:1fr;}
  .lgv .hero__right{display:none;}
  .lgv .why__grid{grid-template-columns:1fr;}
  .lgv .factor-grid{grid-template-columns:1fr 1fr;}
  .lgv .steps{grid-template-columns:repeat(2,1fr);}
  .lgv .next-grid{grid-template-columns:repeat(3,1fr);}
  .lgv .trust-bar__inner{gap:28px;}
}
@media (max-width:660px){
  .lgv .wrap{padding:0 20px;}
  .lgv .nav__inner{padding:14px 20px;}
  .lgv .hero{padding:52px 0 68px;}
  .lgv .factor-grid{grid-template-columns:1fr;}
  .lgv .options{grid-template-columns:1fr;}
  .lgv .progress-labels span{font-size:9px;}
  .lgv .lead-card{padding:34px 22px;}
  .lgv .next-grid{grid-template-columns:1fr 1fr;}
  .lgv .form-row{grid-template-columns:1fr;}
  .lgv .qcard{padding:24px 20px 20px;}
  .lgv .trust-bar__inner{gap:16px;}
  .lgv .trust-item{font-size:10px;}
}
      `}</style>
      {/* ============ TRUST BAR ============ */}
      <div className="trust-bar" role="complementary" aria-label="Trust indicators">
        <div className="wrap trust-bar__inner">
          {TRUST_ITEMS.map((t) => (
            <div className="trust-item" key={t.label}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{t.icon}</svg>
              {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* ============ WHY THIS ASSESSMENT ============ */}
      <section className="why" id="why" aria-labelledby="whyHeading">
        <div className="wrap why__grid">
          <div>
            <span className="eyebrow">The Strategy Behind The Decision</span>
            <h2 id="whyHeading">Why Take the Golden Visa Assessment?</h2>
            <p>Choosing a Golden Visa programme is rarely a straightforward decision. It's shaped by your investment capacity, your family's needs, your timeline, and the global mobility you want to build for the years ahead.</p>
            <p>Most individuals approach this decision with fragmented information — generic programme brochures, conflicting online advice, and no structured framework to evaluate genuine suitability. This assessment changes that by evaluating the factors that meaningfully determine the right fit for your profile.</p>
            <p><strong>Every recommendation that follows is grounded in your unique profile — not a generic ranking of popular programmes.</strong> That's the difference between guessing your residency strategy and planning it with a Langma International advisor at your side.</p>
            <a className="why__cta" href="#assessment">Begin Your Assessment →</a>
          </div>

          <div className="factor-grid" aria-label="Assessment evaluation factors">
            {WHY_FACTORS.map((f) => (
              <div className="factor-card" key={f.label}>
                <div className="factor-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">{f.icon}</svg>
                </div>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="how" id="how" aria-labelledby="howHeading">
        <div className="wrap">
          <div className="how__head">
            <span className="eyebrow">Your Path To A Golden Visa</span>
            <h2 id="howHeading">How It Works</h2>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step-card" key={s.n}>
                <div className="step-badge"><span>{s.n}</span></div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="step-outcome">{s.outcome}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ASSESSMENT WIZARD ============ */}
      <section className="assessment" id="assessment" aria-labelledby="assessHeading">
        <div className="wrap">
          <div className="assessment__head">
            <span className="eyebrow">Your Assessment</span>
            <h2 id="assessHeading">10 Strategic Questions</h2>
            <p>No right or wrong answers — just clarity. Each question helps our specialists understand your profile and recommend the most suitable Golden Visa options.</p>
          </div>

          <div className="wizard-progress">
            <div className="progress-header">
              <span className="progress-pct" aria-live="polite">
                Section {section} of {SECTIONS} — {step.sectionName}
              </span>
              <span className="progress-pct" aria-hidden="true">{pct}% complete</span>
            </div>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
            >
              {Array.from({ length: SECTIONS }).map((_, s) => (
                <div className="progress-seg" key={s}>
                  <div className="progress-seg__fill" style={{ width: segFill(s) }}></div>
                </div>
              ))}
            </div>
            <div className="progress-labels" aria-hidden="true">
              {SECTION_LABELS.map((l, i) => (
                <span key={l} className={i + 1 === section ? "is-active" : ""}>{l}</span>
              ))}
            </div>
          </div>

          <div className="wizard-wrap" ref={wizardWrapRef}>
            <div className="wizard-step" key={step.name}>
              <div className="qcard">
                <div className="qcard__section">{step.sectionLabel}</div>
                <span className="qcard__num">Question {step.number} of {TOTAL}</span>
                <h3>{step.q}</h3>
                <span className="qhint">Select one option</span>
                <div className="options" role="radiogroup" aria-label={step.q}>
                  {step.options.map((opt) => (
                    <label className="option" key={opt.value}>
                      <input
                        type="radio"
                        name={step.name}
                        value={opt.value}
                        checked={answers[step.name] === opt.value}
                        onChange={() => setAnswers((a) => ({ ...a, [step.name]: opt.value }))}
                      />
                      <span className="option__dot" aria-hidden="true"></span>
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="wizard-nav">
            <button
              className="btn btn-back"
              aria-label="Go to previous question"
              style={{ display: current === 0 ? "none" : "inline-flex" }}
              onClick={handleBack}
            >
              ← Previous
            </button>
            <span className="wizard-counter" aria-hidden="true">{current + 1} / {TOTAL}</span>
            <button
              className="btn btn-primary"
              aria-label={current === TOTAL - 1 ? "View my results" : "Go to next question"}
              onClick={handleNext}
            >
              {current === TOTAL - 1 ? "View My Results →" : "Next →"}
            </button>
          </div>
        </div>
      </section>

      {/* ============ RESULTS & LEAD CAPTURE ============ */}
      <section className="results" id="results" aria-labelledby="resultsHeading" ref={resultsRef}>
        <div className="wrap">
          <div className="results__head">
            <span className="eyebrow">Assessment Complete</span>
            <h2 id="resultsHeading">Thank You for Completing Your Assessment</h2>
            <p>Based on your responses, our Golden Visa specialists will evaluate your profile and identify the most suitable residency-by-investment opportunities aligned with your objectives, investment capacity, family requirements, and long-term international goals.</p>
          </div>

          <div className="next-head">
            <span className="eyebrow">Your Next Steps</span>
            <h3>What Happens Next?</h3>
          </div>
          <div className="next-grid">
            {NEXT_STEPS.map((n) => (
              <div className="next-card" key={n}>
                <div className="next-card__check">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="4,12 9,18 20,6" /></svg>
                </div>
                <p>{n}</p>
              </div>
            ))}
          </div>

          {/* LEAD CAPTURE FORM */}
          <div className="lead-card" id="leadForm">
            <div className="lead-card__badge">Unlock Your Golden Visa Report</div>
            <h2>Get Your Personalised Golden Visa Report</h2>
            <p>Enter your details below to receive your personalised Golden Visa assessment report and connect with a dedicated Langma International advisor.</p>

            <form className="form-grid" onSubmit={handleFormSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fname">Full Name</label>
                  <input id="fname" type="text" placeholder="Enter your full name" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="femail">Email Address</label>
                  <input id="femail" type="email" placeholder="you@example.com" required autoComplete="email" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fphone">Phone Number</label>
                  <input id="fphone" type="tel" placeholder="+1 555 000 0000" required autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="fnationality">Nationality</label>
                  <input id="fnationality" type="text" placeholder="e.g. British, Indian" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="fresidence">Country of Residence</label>
                <input id="fresidence" type="text" placeholder="e.g. United Arab Emirates" required autoComplete="country-name" />
              </div>
              <button
                className="btn btn-gold btn-block"
                type="submit"
                disabled={formState !== "idle"}
                style={
                  formState === "done"
                    ? { background: "linear-gradient(135deg,var(--emerald-deep),var(--emerald-mid))", color: "var(--ivory)" }
                    : undefined
                }
              >
                {formState === "idle" && "Receive My Personalised Golden Visa Assessment"}
                {formState === "submitting" && "Submitting…"}
                {formState === "done" && "✓ Report Requested — Our Advisor Will Contact You Shortly"}
              </button>
            </form>

            <p className="trust-note">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              At Langma International, we provide strategic guidance for globally minded individuals and families seeking residency-by-investment opportunities. Every assessment is reviewed with discretion, professionalism, and a commitment to helping you explore the most suitable pathways for international mobility and long-term security.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}