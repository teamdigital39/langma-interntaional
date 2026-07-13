import React, { useState, useEffect, useRef } from "react";
const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal${visible ? " in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- data ---------- */

const STATS = [
  { n: "2012", l: "Established" },
  { n: "100,000+", l: "Candidates Trained" },
  { n: "40+", l: "Languages" },
  { n: "Global", l: "Reach & Staffing" },
];

const STORY_AREAS = [
  "Global Learning",
  "International Education",
  "Career Mobility",
  "Immigration Pathways",
  "Cultural Immersion",
  "Business Engagement",
  "Wellness Experiences",
];

const MISSION_ITEMS = [
  "Expanding access to global learning opportunities.",
  "Building international education pathways.",
  "Supporting career mobility and professional growth.",
  "Promoting cultural understanding and global citizenship.",
  "Facilitating business collaboration across borders.",
  "Creating innovative learning ecosystems.",
  "Enabling personal and professional transformation.",
];

const CORE_VALUES = [
  {
    icon: <path d="M12 2.5l2.9 6.2 6.6.6-5 4.6 1.5 6.6L12 17l-5.2 2.9 1.5-6.6-5-4.6 6.6-.6z" />,
    title: "Excellence",
    body: "Delivering quality, professionalism and continuous improvement in everything we do.",
  },
  {
    icon: (
      <>
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    title: "Integrity",
    body: "Building trust through transparency, honesty and ethical practices.",
  },
  {
    icon: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 00-3.2 11.1c.4.3.7.8.7 1.4v.5h5v-.5c0-.6.3-1.1.7-1.4A6 6 0 0012 3z" />
      </>
    ),
    title: "Innovation",
    body: "Creating new pathways and solutions for a rapidly evolving world.",
  },
  {
    icon: (
      <>
        <circle cx="9" cy="9" r="2.6" />
        <circle cx="16" cy="9" r="2.6" />
        <path d="M3 19c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5M13 19c0-2.8 2.2-4.5 5-4.5" />
      </>
    ),
    title: "Inclusion",
    body: "Celebrating diversity and fostering meaningful cross-cultural engagement.",
  },
  {
    icon: (
      <>
        <rect x="3" y="8" width="10" height="8" rx="4" />
        <rect x="11" y="8" width="10" height="8" rx="4" />
      </>
    ),
    title: "Collaboration",
    body: "Building partnerships that create long-term value and impact.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
    title: "Impact",
    body: "Focusing on outcomes that transform lives, institutions and communities.",
  },
];

const WHAT_WE_DO = [
  {
    icon: (
      <>
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M8 17l-2 4v-4" />
      </>
    ),
    title: "Global Learning",
    body: "Foreign language training, certifications and communication development.",
  },
  {
    icon: (
      <>
        <path d="M12 4L3 9l9 5 9-5-9-5z" />
        <path d="M7 11.5V16c0 1.4 2.5 2.5 5 2.5s5-1.1 5-2.5v-4.5" />
      </>
    ),
    title: "Global Education",
    body: "Study abroad guidance, admissions support and international academic pathways.",
  },
  {
    icon: (
      <>
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path d="M3 13h18" />
      </>
    ),
    title: "Global Careers",
    body: "International career readiness, recruitment support and workforce mobility.",
  },
  {
    icon: (
      <>
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4z" />
      </>
    ),
    title: "Global Mobility",
    body: "Immigration guidance, residency solutions and Golden Visa pathways.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
    title: "Global Business Services",
    body: "Translation, localization, interpretation and cross-cultural consulting.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.8 9.2l-2 4.4-4.4 2 2-4.4z" />
      </>
    ),
    title: "Global Cultural Immersion Tours",
    body: "Educational travel and transformative international experiences.",
  },
  {
    icon: (
      <>
        <path d="M4 8h13M14 4l3 4-3 4" />
        <path d="M20 16H7M10 12l-3 4 3 4" />
      </>
    ),
    title: "Global Trade Assist Excursion Program",
    body: "Business exposure initiatives connecting organizations to global markets.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="3.3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
      </>
    ),
    title: "Yoga-Centric Wellness Immersion Program",
    body: "Wellness experiences rooted in authentic Indian traditions.",
  },
  {
    icon: <path d="M9 3h6M10 3v6.2L4.6 18a1.8 1.8 0 001.5 2.8h11.8a1.8 1.8 0 001.5-2.8L14 9.2V3" />,
    title: "Langma Language Lab™",
    body: "Technology-enabled language learning ecosystems for educational institutions.",
  },
];

const WHY_APART = [
  "Integrated Global Opportunities Ecosystem",
  "Learner-Centric Approach",
  "Experienced Advisors and Trainers",
  "Strong Institutional Network",
  "Future-Focused Innovation",
  "Personalized Guidance",
  "Commitment to Global Citizenship",
];

const IMPACT_ITEMS = [
  "Enhanced global employability",
  "International academic success",
  "Cross-cultural understanding",
  "Business growth and collaboration",
  "Institutional capacity building",
  "Personal transformation and wellbeing",
];

const INNOVATIONS = [
  {
    icon: <path d="M9 3h6M10 3v6.2L4.6 18a1.8 1.8 0 001.5 2.8h11.8a1.8 1.8 0 001.5-2.8L14 9.2V3" />,
    title: "Langma Language Lab™",
    body: "A scalable language learning solution for schools, colleges, universities and skill development institutions.",
  },
  {
    icon: (
      <>
        <path d="M4 21V9.5L12 4l8 5.5V21" />
        <path d="M9 21v-6h6v6" />
        <path d="M4 21h16" />
      </>
    ),
    title: "Langma Centres of Excellence",
    body: "Collaborative hubs designed to create globally competent learners and future-ready professionals.",
  },
  {
    icon: (
      <>
        <circle cx="6" cy="7" r="2.3" />
        <circle cx="18" cy="7" r="2.3" />
        <circle cx="12" cy="18" r="2.3" />
        <path d="M8 8.3L10.7 16M16 8.3L13.3 16M8.3 7h7.4" />
      </>
    ),
    title: "Global Partnership Network",
    body: "Building connections that create opportunities across education, business and cultural engagement.",
  },
];

const ROADMAP = [
  "Expansion of Global Learning Programs",
  "International Education Partnerships",
  "Career Mobility Solutions",
  "Language Lab Deployments",
  "Franchise & Centre of Excellence Network",
  "Cultural Immersion Initiatives",
  "Trade and Business Collaboration Programs",
  "Wellness and Global Exchange Experiences",
];

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function AboutLangma() {
  return (
    <>
      <style>{`
/* ============================================================
   DESIGN TOKENS — ported verbatim from the Langma Golden Visa
   pages. Palette: teal (#0A6B64) on white, single-accent.
============================================================ */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Manrope:wght@400;500;600;700;800&display=swap');

.langma-about {

  --navy:#0A6B64;
  --navy-900:#075049;
  --navy-800:#0E8079;
  --navy-700:#129089;
  --gold:#0A6B64;
  --gold-soft:#FFFFFF;
  --gold-deep:#0A6B64;
  --ivory:#FFFFFF;
  --sand:#EAF5F4;
  --sand-line:#D3E9E6;
  --charcoal:#16211F;
  --ink:#1E2A28;
  --muted:#5B6864;
  --muted-2:#8B9793;
  --white:#FFFFFF;

  --serif:'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --sans:'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;

  --maxw:1200px;
  --gutter:clamp(20px, 5vw, 64px);
  --radius:4px;
  --shadow-sm:0 2px 14px rgba(10,107,100,.07);
  --shadow-md:0 18px 50px -24px rgba(10,107,100,.22);
  --shadow-lg:0 40px 80px -40px rgba(10,107,100,.28);
  --ease:cubic-bezier(.22,.61,.36,1);
}

.langma-about *,.langma-about *::before,.langma-about *::after{box-sizing:border-box;}
.langma-about{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
.langma-about{
  margin:0;font-family:var(--sans);color:var(--ink);background:var(--ivory);
  font-size:17px;line-height:1.7;font-weight:400;-webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;overflow-x:hidden;
}
.langma-about a{color:inherit;text-decoration:none;}
.langma-about h1,.langma-about h2,.langma-about h3,.langma-about h4{font-family:var(--serif);font-weight:600;color:var(--navy);margin:0;}
.langma-about p{margin:0 0 1.1em;}
.langma-about ::selection{background:var(--gold);color:#fff;}

/* layout */
.langma-about .wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
.langma-about .section{padding:clamp(64px,9vw,128px) 0;position:relative;}
.langma-about .section--sand{background:var(--sand);}

.langma-about .eyebrow{display:inline-flex;align-items:center;gap:12px;font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:.32em;text-transform:uppercase;color:var(--gold-deep);margin:0 0 22px;}
.langma-about .eyebrow::before{content:"";width:34px;height:1px;background:var(--gold);}
.langma-about .eyebrow--center{justify-content:center;}

.langma-about .display{font-size:clamp(2.3rem,5.4vw,4.15rem);font-weight:600;letter-spacing:-.5px;line-height:1.03;}
.langma-about h2.display{font-size:clamp(1.9rem,4.2vw,3.1rem);}
.langma-about .lede{font-size:clamp(1.05rem,1.7vw,1.28rem);color:var(--muted);max-width:60ch;line-height:1.65;font-weight:400;}

.langma-about .head{max-width:760px;}
.langma-about .head--center{max-width:760px;margin:0 auto;text-align:center;}

/* buttons */
.langma-about .btn{--bg:var(--navy);--fg:#fff;display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:var(--sans);font-weight:600;font-size:14.5px;letter-spacing:.04em;padding:16px 30px;border-radius:var(--radius);border:1px solid transparent;background:var(--bg);color:var(--fg);cursor:pointer;transition:transform .35s var(--ease), box-shadow .35s var(--ease), background .3s var(--ease), color .3s var(--ease);}
.langma-about .btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px -14px rgba(10,107,100,.4);}
.langma-about .btn:focus-visible{outline:2px solid var(--gold);outline-offset:3px;}
.langma-about .btn--ghost{background:transparent;color:var(--navy);border-color:var(--sand-line);}
.langma-about .btn--ghost:hover{background:rgba(10,107,100,.06);box-shadow:none;color:var(--navy);border-color:var(--navy);}

/* hero */
.langma-about .hero{position:relative;min-height:94vh;display:flex;align-items:center;background:radial-gradient(120% 90% at 78% 8%, rgba(10,107,100,.08), transparent 55%),var(--white);color:var(--ink);overflow:hidden;padding:150px 0 60px;}
.langma-about .hero__glow{position:absolute;top:-20%;right:-10%;width:60vw;height:60vw;max-width:720px;max-height:720px;background:radial-gradient(circle, rgba(10,107,100,.09), transparent 62%);filter:blur(10px);pointer-events:none;}
.langma-about .hero__grid{position:relative;z-index:2;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center;}
.langma-about .hero h1{font-size:clamp(2.5rem,5.6vw,4.5rem);font-weight:600;line-height:1.05;letter-spacing:-1px;color:var(--ink);margin-bottom:18px;}
.langma-about .hero h1 em{font-style:italic;color:var(--navy);font-weight:500;}
.langma-about .hero__tagline{font-family:var(--serif);font-style:italic;font-size:clamp(1.15rem,1.9vw,1.5rem);color:var(--navy);margin-bottom:22px;font-weight:500;}
.langma-about .hero__sub{font-size:clamp(1.01rem,1.5vw,1.15rem);color:var(--muted);max-width:54ch;margin-bottom:14px;line-height:1.65;}
.langma-about .hero__actions{display:flex;flex-wrap:wrap;gap:16px;margin:30px 0 6px;}

.langma-about .hero__media{position:relative;z-index:2;border:1px solid var(--sand-line);border-radius:8px;padding:10px;background:var(--white);box-shadow:var(--shadow-lg);}
.langma-about .hero__media-frame{position:relative;border-radius:4px;overflow:hidden;aspect-ratio:4/4.6;background:var(--sand);}
.langma-about .hero__media-frame svg{display:block;width:100%;height:100%;}
.langma-about .hero__media-tag{position:absolute;left:16px;bottom:16px;z-index:2;display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.92);border:1px solid var(--sand-line);border-radius:100px;padding:9px 16px;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);backdrop-filter:blur(6px);}
.langma-about .bridge-arc{animation:dashflow 7s linear infinite;}
@keyframes dashflow{to{stroke-dashoffset:-90;}}
.langma-about .node-pulse{animation:pulse 3.6s var(--ease) infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}

/* stats */
.langma-about .langma__stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--sand-line);border-radius:8px;overflow:hidden;margin-top:38px;box-shadow:var(--shadow-sm);max-width:600px;}
.langma-about .langma__stat{background:var(--white);padding:18px 12px;text-align:center;min-width:0;}
.langma-about .langma__stat .n{font-family:var(--serif);font-size:1.7rem;font-weight:600;color:var(--navy);line-height:1.1;white-space:nowrap;}
.langma-about .langma__stat .l{font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);margin-top:8px;font-weight:600;line-height:1.35;}
.langma-about .stats-card-shimmer{position:relative;overflow:hidden;}
.langma-about .stats-card-shimmer::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg, transparent 40%, rgba(10,107,100,.10) 50%, transparent 60%);transform:translateX(-100%);transition:transform 0s;}
.langma-about .stats-card-shimmer:hover::after{transform:translateX(200%);transition:transform .7s ease;}

/* grid / card */
.langma-about .grid{display:grid;gap:24px;}
.langma-about .grid-3{grid-template-columns:repeat(3,1fr);}
.langma-about .card{background:var(--white);border:1px solid var(--sand-line);border-radius:6px;padding:32px 28px;box-shadow:var(--shadow-sm);transition:transform .4s var(--ease), box-shadow .4s var(--ease), border-color .4s var(--ease);}
.langma-about .card:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);border-color:var(--gold);}
.langma-about .card__ico{width:50px;height:50px;border-radius:50%;display:grid;place-items:center;margin-bottom:20px;background:linear-gradient(150deg,var(--navy),var(--navy-800));color:var(--gold-soft);}
.langma-about .card h3{font-size:1.32rem;margin-bottom:9px;}
.langma-about .card p{color:var(--muted);font-size:14.5px;margin-bottom:0;line-height:1.6;}

/* split */
.langma-about .split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,88px);align-items:center;}
.langma-about .split__panel{background:var(--sand);border:1px solid var(--sand-line);border-radius:8px;padding:44px 40px;color:var(--ink);position:relative;overflow:hidden;box-shadow:var(--shadow-sm);}
.langma-about .split__panel h3{font-size:1.5rem;margin-bottom:4px;}
.langma-about .story-est{display:flex;align-items:baseline;gap:10px;margin-top:26px;padding-top:22px;border-top:1px solid var(--sand-line);}
.langma-about .story-est__n{font-family:var(--serif);font-size:1.4rem;font-weight:600;color:var(--navy);}
.langma-about .story-est__l{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600;}

/* pull quote + closing line */
.langma-about .pull-quote{font-family:var(--serif);font-style:italic;font-size:clamp(1.4rem,2.8vw,2rem);color:var(--navy);line-height:1.4;margin:24px 0;padding-left:24px;border-left:3px solid var(--gold);}
.langma-about .closing-line{font-family:var(--serif);font-style:italic;color:var(--muted);font-size:1.15rem;margin-top:22px;}

/* pillars (philosophy tagline) */
.langma-about h2.pillars{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px;margin:6px 0 30px;line-height:1.2;}
.langma-about .pillars .word{font-family:var(--serif);font-size:clamp(1.5rem,3.2vw,2.4rem);font-weight:600;color:var(--navy);}
.langma-about .pillars .dot{width:6px;height:6px;border-radius:50%;background:var(--gold);}

/* check list */
.langma-about .check-list{list-style:none;margin:26px 0 0;padding:0;display:grid;gap:0 32px;}
.langma-about .check-list.cols-1{grid-template-columns:1fr;}
.langma-about .check-list.cols-2{grid-template-columns:repeat(2,1fr);}
.langma-about .check-list.cols-3{grid-template-columns:repeat(3,1fr);}
.langma-about .check-list li{display:flex;gap:12px;padding:12px 0;font-size:15px;color:var(--ink);border-bottom:1px dashed var(--sand-line);line-height:1.45;}
.langma-about .check-list li svg{flex:none;color:var(--gold-deep);margin-top:3px;}
.langma-about .split__panel .check-list li{border-bottom-color:rgba(10,107,100,.16);}

/* pill row */
.langma-about .pill-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;}
.langma-about .pill{border:1px solid var(--sand-line);background:var(--sand);border-radius:100px;padding:10px 22px;font-size:13.5px;color:var(--ink);font-weight:500;box-shadow:var(--shadow-sm);}

/* final band */
.langma-about .final-band{background:linear-gradient(150deg,var(--navy-700),var(--navy-900));color:var(--ivory);padding:clamp(64px,9vw,120px) 0;}
.langma-about .final-band .eyebrow{color:var(--gold-soft);}
.langma-about .final-band .eyebrow::before{background:var(--gold-soft);}
.langma-about .final-band h2{color:#fff;}
.langma-about .final-band .lede{color:rgba(255,255,255,.82);}
.langma-about .final-band .closing-line{color:#fff;}
.langma-about .final-band .btn--ghost{color:#fff;border-color:rgba(255,255,255,.4);}
.langma-about .final-band .btn--ghost:hover{background:rgba(255,255,255,.12);color:#fff;border-color:#fff;}
.langma-about .final-band .btn--light{background:#fff;color:var(--navy);}
.langma-about .final-band .btn--light:hover{background:var(--sand);}

/* reveal + micro-interactions */
.langma-about .reveal{opacity:0;transform:translateY(26px);transition:opacity .8s var(--ease), transform .8s var(--ease);}
.langma-about .reveal.in{opacity:1;transform:none;}
.langma-about .hover-card{transition:box-shadow .3s ease, transform .3s ease;}
.langma-about .hover-card:hover{box-shadow:0 16px 40px rgba(0,0,0,.12);transform:translateY(-4px);}
.langma-about .btn-animated{position:relative;overflow:hidden;transition:color .3s ease, background-color .3s ease, transform .2s ease, box-shadow .3s ease;}
.langma-about .btn-animated:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.15);}
.langma-about .btn-animated:active{transform:translateY(0);}

/* responsive */
@media (max-width:1024px){
  .langma-about .grid-3{grid-template-columns:repeat(2,1fr);}
  .langma-about .check-list.cols-2,.langma-about .check-list.cols-3{grid-template-columns:repeat(2,1fr);}
  .langma-about .langma__stats{grid-template-columns:repeat(2,1fr);max-width:360px;}
  .langma-about .hero__grid{gap:40px;}
  .langma-about .split{gap:40px;}
}
@media (max-width:900px){
  .langma-about .hero__grid{grid-template-columns:1fr;}
  .langma-about .hero__media{margin-top:8px;max-width:420px;}
  .langma-about .split{grid-template-columns:1fr;}
}
@media (max-width:768px){
  .langma-about .grid-3{grid-template-columns:1fr;}
  .langma-about .check-list.cols-2,.langma-about .check-list.cols-3{grid-template-columns:1fr;}
}
@media (max-width:640px){
  .langma-about .langma__stats{grid-template-columns:1fr;max-width:280px;}
  .langma-about .hero{padding:130px 0 48px;}
  .langma-about .split__panel{padding:32px 26px;}
  .langma-about .card{padding:26px 22px;}
  .langma-about .final-band .btn--ghost, .langma-about .final-band .btn--light{width:100%;}
}
@media (max-width:480px){
  .langma-about{font-size:16px;}
  .langma-about .section{padding:52px 0;}
  .langma-about .hero__actions .btn{width:100%;}
}
@media (prefers-reduced-motion:reduce){
  .langma-about *{animation:none !important;transition-duration:.01ms !important;scroll-behavior:auto !important;}
  .langma-about .reveal{opacity:1;transform:none;}
  .langma-about .bridge-arc,.langma-about .node-pulse{animation:none !important;}
}
      `}</style>

      <div className="langma-about">
        <main>
          {/* ============================ HERO ============================ */}
          <section className="hero" id="top">
            <div className="hero__glow" aria-hidden="true"></div>
            <div className="wrap">
              <div className="hero__grid">
                <div className="hero__copy">
                  <h1>Beyond Language.<br /><em>Beyond Borders.</em></h1>
                  <p className="hero__tagline">Building Bridges Between People, Cultures and Opportunities.</p>
                  <p className="hero__sub">Langma International is a Global Opportunities Platform committed to empowering individuals, institutions, businesses and investors through learning, education, careers, mobility, cultural exchange, business collaboration and transformative international experiences.</p>
                  <p className="hero__sub">What began as a foreign language training initiative has evolved into a dynamic ecosystem connecting people with opportunities across borders and industries.</p>
                  <div className="hero__actions">
                    <a href="#connect" className="btn btn-animated">Book a Consultation</a>
                    <a href="#connect" className="btn btn--ghost btn-animated">Become a Partner</a>
                  </div>
                  <div className="langma__stats">
                    {STATS.map((s) => (
                      <div className="langma__stat stats-card-shimmer" key={s.l}>
                        <div className="n">{s.n}</div>
                        <div className="l">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero__media">
                  <div className="hero__media-frame">
                    <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Abstract illustration of a globe with connected nodes representing global bridges">
                      <defs>
                        <radialGradient id="heroGlow" cx="50%" cy="34%" r="68%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                          <stop offset="100%" stopColor="#EAF5F4" stopOpacity="1" />
                        </radialGradient>
                      </defs>
                      <rect width="400" height="460" fill="url(#heroGlow)" />

                      {/* globe grid */}
                      <circle cx="200" cy="195" r="118" fill="none" stroke="#0A6B64" strokeOpacity="0.32" strokeWidth="1.3" />
                      <line x1="82" y1="195" x2="318" y2="195" stroke="#0A6B64" strokeOpacity="0.26" strokeWidth="1" />
                      <path d="M200 77 C255 77 255 313 200 313" fill="none" stroke="#0A6B64" strokeOpacity="0.22" strokeWidth="1" />
                      <path d="M200 77 C145 77 145 313 200 313" fill="none" stroke="#0A6B64" strokeOpacity="0.22" strokeWidth="1" />
                      <ellipse cx="200" cy="195" rx="118" ry="42" fill="none" stroke="#0A6B64" strokeOpacity="0.16" strokeWidth="1" />

                      {/* bridge arcs */}
                      <path className="bridge-arc" d="M110 150 Q200 60 290 140" fill="none" stroke="#0A6B64" strokeWidth="1.6" strokeDasharray="2 7" strokeLinecap="round" />
                      <path className="bridge-arc" d="M290 140 Q345 200 310 255" fill="none" stroke="#0A6B64" strokeWidth="1.6" strokeDasharray="2 7" strokeLinecap="round" />
                      <path className="bridge-arc" d="M310 255 Q265 342 150 300" fill="none" stroke="#0A6B64" strokeWidth="1.6" strokeDasharray="2 7" strokeLinecap="round" />
                      <path className="bridge-arc" d="M150 300 Q65 232 110 150" fill="none" stroke="#0A6B64" strokeWidth="1.6" strokeDasharray="2 7" strokeLinecap="round" />
                      <path className="bridge-arc" d="M230 90 Q335 128 310 255" fill="none" stroke="#0A6B64" strokeWidth="1.4" strokeDasharray="2 7" strokeLinecap="round" opacity="0.7" />

                      {/* nodes */}
                      <circle className="node-pulse" cx="110" cy="150" r="4.5" fill="#FFFFFF" stroke="#0A6B64" strokeWidth="2" />
                      <circle className="node-pulse" cx="290" cy="140" r="7" fill="#FFFFFF" stroke="#0A6B64" strokeWidth="2.2" style={{ animationDelay: "0.4s" }} />
                      <circle cx="290" cy="140" r="2.3" fill="#0A6B64" />
                      <circle className="node-pulse" cx="310" cy="255" r="4.5" fill="#FFFFFF" stroke="#0A6B64" strokeWidth="2" style={{ animationDelay: "0.8s" }} />
                      <circle className="node-pulse" cx="150" cy="300" r="7" fill="#FFFFFF" stroke="#0A6B64" strokeWidth="2.2" style={{ animationDelay: "1.2s" }} />
                      <circle cx="150" cy="300" r="2.3" fill="#0A6B64" />
                      <circle className="node-pulse" cx="230" cy="90" r="4.5" fill="#FFFFFF" stroke="#0A6B64" strokeWidth="2" style={{ animationDelay: "1.6s" }} />
                      <circle className="node-pulse" cx="95" cy="235" r="4.5" fill="#FFFFFF" stroke="#0A6B64" strokeWidth="2" style={{ animationDelay: "2s" }} />
                    </svg>
                    <span className="hero__media-tag">Global Opportunities Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================ OUR STORY ============================ */}
          <section className="section" id="story">
            <div className="wrap">
              <div className="split" style={{ alignItems: "start" }}>
                <Reveal>
                  <span className="eyebrow">Our Story</span>
                  <h2 className="display">From Language Learning to<br />Global Opportunities</h2>
                  <p className="lede" style={{ marginTop: "18px" }}>Langma International was founded with a simple yet powerful belief:</p>
                  <p className="pull-quote">Language has the power to connect worlds.</p>
                  <p style={{ color: "var(--muted)" }}>Over the years, we have witnessed how language learning transforms lives by opening doors to education, careers, cultural understanding and international opportunities. As the aspirations of our learners and partners expanded, so did our vision.</p>
                  <p style={{ color: "var(--muted)" }}>Today, Langma International has grown beyond language education to become a trusted platform supporting global learning, international education, career mobility, immigration pathways, cultural immersion, business engagement and wellness experiences.</p>
                  <p className="closing-line">Our journey reflects a commitment to helping people discover opportunities that extend beyond geography, borders and limitations.</p>
                </Reveal>
                <Reveal className="split__panel">
                  <h3>A Trusted Platform Supporting</h3>
                  <ul className="check-list cols-1">
                    {STORY_AREAS.map((item) => (
                      <li key={item}><Check />{item}</li>
                    ))}
                  </ul>
                  <div className="story-est">
                    <span className="story-est__n">2012</span>
                    <span className="story-est__l">Established</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ WHO WE ARE ============================ */}
          <section className="section section--sand" id="who-we-are">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Who We Are</span>
                <h2 className="display">A Global Opportunities Platform</h2>
                <p className="lede" style={{ margin: "18px auto 0" }}>Langma International serves as a bridge between ambition and opportunity.</p>
              </Reveal>
              <Reveal className="head head--center" style={{ margin: "28px auto 0" }}>
                <p style={{ color: "var(--muted)" }}>We work with students seeking world-class education, professionals pursuing international careers, institutions building globally competent learners, businesses expanding into new markets and investors exploring international mobility pathways.</p>
                <p style={{ color: "var(--muted)", marginBottom: 0 }}>Through our integrated ecosystem, we help individuals and organizations navigate the global landscape with confidence and clarity.</p>
              </Reveal>
            </div>
          </section>

          {/* ============================ VISION + MISSION ============================ */}
          <section className="section" id="vision-mission">
            <div className="wrap">
              <div className="split">
                <Reveal>
                  <span className="eyebrow">Our Vision</span>
                  <h2 className="display">Creating a World Without<br />Opportunity Barriers</h2>
                  <p className="pull-quote" style={{ marginTop: "22px" }}>To become a globally trusted platform that empowers people and organizations to learn, connect, grow and thrive across cultures, industries and nations.</p>
                </Reveal>
                <Reveal className="split__panel">
                  <span className="eyebrow" style={{ marginBottom: "8px" }}>Our Mission</span>
                  <h3>Empowering Global Citizens</h3>
                  <p style={{ color: "var(--muted)", marginTop: "10px", marginBottom: 0 }}>We are committed to:</p>
                  <ul className="check-list cols-1">
                    {MISSION_ITEMS.map((item) => (
                      <li key={item}><Check />{item}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ OUR PHILOSOPHY ============================ */}
          <section className="section section--sand" id="philosophy">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Our Philosophy</span>
                <h2 className="pillars">
                  <span className="word">Learn</span>
                  <span className="dot" aria-hidden="true"></span>
                  <span className="word">Explore</span>
                  <span className="dot" aria-hidden="true"></span>
                  <span className="word">Connect</span>
                  <span className="dot" aria-hidden="true"></span>
                  <span className="word">Grow</span>
                </h2>
                <p style={{ color: "var(--muted)" }}>At Langma, we believe that meaningful growth happens when people are exposed to new languages, new ideas, new cultures and new opportunities.</p>
                <p style={{ color: "var(--muted)", marginBottom: 0 }}>Every interaction, program and partnership is designed to help individuals and organizations move closer to their goals while becoming active participants in a connected global community.</p>
              </Reveal>
            </div>
          </section>

          {/* ============================ OUR CORE VALUES ============================ */}
          <section className="section" id="values">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">What We Stand For</span>
                <h2 className="display">Our Core Values</h2>
              </Reveal>
              <div className="grid grid-3" style={{ marginTop: "48px" }}>
                {CORE_VALUES.map((v) => (
                  <Reveal key={v.title} as="article" className="card hover-card">
                    <div className="card__ico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{v.icon}</svg>
                    </div>
                    <h3>{v.title}</h3>
                    <p>{v.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ WHAT WE DO ============================ */}
          <section className="section section--sand" id="what-we-do">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">What We Do</span>
                <h2 className="display">Creating Opportunities Across<br />Multiple Pathways</h2>
              </Reveal>
              <div className="grid grid-3" style={{ marginTop: "48px" }}>
                {WHAT_WE_DO.map((w) => (
                  <Reveal key={w.title} as="article" className="card hover-card">
                    <div className="card__ico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{w.icon}</svg>
                    </div>
                    <h3>{w.title}</h3>
                    <p>{w.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ WHY LANGMA ============================ */}
          <section className="section" id="why-langma">
            <div className="wrap">
              <div className="split" style={{ alignItems: "start" }}>
                <Reveal>
                  <span className="eyebrow">Why Langma</span>
                  <h2 className="display">More Than a<br />Service Provider</h2>
                  <p className="lede" style={{ marginTop: "18px" }}>Langma is not simply an institution delivering programs.</p>
                  <p style={{ color: "var(--muted)" }}>We are a long-term partner committed to helping people and organizations navigate global opportunities with confidence.</p>
                </Reveal>
                <Reveal>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "4px" }}>What Sets Us Apart</h3>
                  <ul className="check-list cols-2">
                    {WHY_APART.map((item) => (
                      <li key={item}><Check />{item}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ OUR IMPACT ============================ */}
          <section className="section section--sand" id="impact">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Our Impact</span>
                <h2 className="display">Creating Meaningful Change</h2>
                <p className="lede" style={{ margin: "18px auto 0" }}>Through our programs, partnerships and initiatives, Langma continues to contribute to:</p>
              </Reveal>
              <ul className="check-list cols-3" style={{ maxWidth: "900px", margin: "40px auto 0" }}>
                {IMPACT_ITEMS.map((item) => (
                  <li key={item}><Check />{item}</li>
                ))}
              </ul>
              <p className="closing-line" style={{ textAlign: "center", maxWidth: "700px", margin: "34px auto 0" }}>Every success story represents a journey of growth, resilience and opportunity.</p>
            </div>
          </section>

          {/* ============================ LANGMA INNOVATIONS ============================ */}
          <section className="section" id="innovations">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Langma Innovations</span>
                <h2 className="display">Building the Future of<br />Global Learning</h2>
              </Reveal>
              <div className="grid grid-3" style={{ marginTop: "48px" }}>
                {INNOVATIONS.map((i) => (
                  <Reveal key={i.title} as="article" className="card hover-card">
                    <div className="card__ico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{i.icon}</svg>
                    </div>
                    <h3>{i.title}</h3>
                    <p>{i.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ LOOKING AHEAD ============================ */}
          <section className="section section--sand" id="looking-ahead">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">Looking Ahead</span>
                <h2 className="display">The Future of Langma</h2>
                <p className="lede" style={{ marginTop: "18px" }}>As the world becomes increasingly interconnected, Langma International remains committed to expanding access to opportunities that empower individuals and organizations to succeed globally.</p>
                <p style={{ color: "var(--muted)" }}>Our future roadmap includes:</p>
              </Reveal>
              <Reveal className="pill-row" style={{ marginTop: "8px" }}>
                {ROADMAP.map((item) => (
                  <span className="pill" key={item}>{item}</span>
                ))}
              </Reveal>
              <p className="closing-line" style={{ maxWidth: "700px", marginTop: "36px" }}>We envision a future where opportunities are not limited by language, geography or circumstance.</p>
            </div>
          </section>

          {/* ============================ FINAL CTA ============================ */}
          <section className="final-band" id="connect">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Get Started</span>
                <h2 className="display">Join Us in Creating Opportunities<br />Beyond Borders</h2>
                <p className="lede" style={{ margin: "18px auto 0" }}>Whether you are a student, professional, institution, entrepreneur or investor, Langma International invites you to become part of a growing global community built on learning, collaboration and opportunity.</p>
                <p className="closing-line" style={{ margin: "22px auto 0" }}>Let&rsquo;s build a more connected future together.</p>
                <div className="hero__actions" style={{ justifyContent: "center", marginTop: "36px" }}>
                  <a href="#" className="btn btn--light btn-animated">Book a Consultation</a>
                  <a href="#" className="btn btn--ghost btn-animated">Become a Partner</a>
                </div>
              </Reveal>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}