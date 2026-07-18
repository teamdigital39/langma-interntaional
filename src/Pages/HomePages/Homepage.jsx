import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import PopupForm from "./PopupForm";

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

function Reveal({ as: Tag = "div", className = "", children, delay = 0, style, ...rest }) {
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

  const mergedStyle = delay ? { ...style, transitionDelay: `${delay}ms` } : style;

  return (
    <Tag ref={ref} className={`reveal${visible ? " in" : ""} ${className}`} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}

function twoLineTitle(title) {
  const words = title.split(" ");
  if (words.length === 2) {
    return (
      <>
        {words[0]}
        <br />
        {words[1]}
      </>
    );
  }
  return title;
}

function focusConnectForm() {
  const el = document.getElementById("connect-name-input");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }
}

function CountUp({ target, suffix = "", duration = 1500 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const t0 = performance.now();
            const tick = (now) => {
              const p = Math.min((now - t0) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

function ConnectForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", interest: "Language Learning", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  const canSubmit = values.name.trim().length > 1 && /\S+@\S+\.\S+/.test(values.email);

  if (submitted) {
    return (
      <div className="connect-success">
        <Check />
        <div>
          <strong>Thanks — your message is in.</strong>
          <p>A Langma advisor will reach out soon to talk through your options.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="connect-form">
      <input id="connect-name-input" name="name" aria-label="Full name" placeholder="Full name" value={values.name} onChange={update("name")} />
      <input name="email" aria-label="Email address" type="email" placeholder="Email address" value={values.email} onChange={update("email")} />
      <input name="phone" aria-label="Phone number" type="tel" placeholder="Phone (optional)" value={values.phone} onChange={update("phone")} />
      <select name="interest" aria-label="Area of interest" value={values.interest} onChange={update("interest")}>
        <option>Language Learning</option>
        <option>Study Abroad</option>
        <option>Work Abroad</option>
        <option>Immigration &amp; Mobility</option>
        <option>Business &amp; Trade</option>
        <option>Cultural &amp; Wellness</option>
      </select>
      <textarea name="message" aria-label="Your message" placeholder="Tell us about your goals" rows={4} value={values.message} onChange={update("message")}></textarea>
      <button type="button" className="btn btn--light" onClick={() => canSubmit && setSubmitted(true)} disabled={!canSubmit}>
        Schedule a Consultation
      </button>
    </div>
  );
}

/* ---------- data ---------- */

const ECOSYSTEM = [
  {
    icon: (<><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 17l-2 4v-4" /></>),
    title: "Global Learning",
    short: "Learning",
    body: "Build language proficiency, communication skills, and cultural intelligence through industry-focused language training and certification programs.",
    img: "/images/Global Learning.png",
  },
  {
    icon: (<><path d="M12 4L3 9l9 5 9-5-9-5z" /><path d="M7 11.5V16c0 1.4 2.5 2.5 5 2.5s5-1.1 5-2.5v-4.5" /></>),
    title: "Global Education",
    short: "Education",
    body: "Access world-class education opportunities through expert guidance on admissions, scholarships, student visas, and academic pathways.",
    img: "/images/Global education.png",
  },
  {
    icon: (<><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M3 13h18" /></>),
    title: "Global Careers",
    short: "Careers",
    body: "Prepare for international employment through career readiness programs, recruitment support, language preparation, and professional mobility solutions.",
    img: "/images/Global Careers.png",
  },
  {
    icon: (<><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></>),
    title: "Global Mobility",
    short: "Mobility",
    body: "Explore residency, immigration, PR pathways, Golden Visa opportunities, and international mobility solutions with confidence.",
    img: "/images/Global Mobility.png",
  },
  {
    icon: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>),
    title: "Global Business Services",
    short: "Business",
    body: "Support global business growth through translation, localization, interpretation, corporate training, and cross-cultural consulting services.",
    img: "/images/Global Business Services.png",
  },
  {
    icon: (<><circle cx="12" cy="12" r="9" /><path d="M14.8 9.2l-2 4.4-4.4 2 2-4.4z" /></>),
    title: "Global Cultural Immersion Tours",
    short: "Cultural",
    body: "Experience cultures beyond the classroom through curated educational tours, exchange programs, and immersive international experiences.",
    img: "/images/Global Cultural Immersion Tours.png",
  },
  {
    icon: (<><path d="M4 8h13M14 4l3 4-3 4" /><path d="M20 16H7M10 12l-3 4 3 4" /></>),
    title: "Global Trade Assist Excursion Program",
    short: "Trade",
    body: "Connect with global markets through trade delegations, business exploration missions, networking opportunities, and international exposure programs.",
    img: "/images/Global Trade Assist Excursion Program.png",
  },
  {
    icon: (<><circle cx="12" cy="12" r="3.3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>),
    title: "Yoga-Centric Wellness Immersion Program",
    short: "Wellness",
    body: "Discover authentic wellness experiences rooted in yoga, mindfulness, Ayurveda, and holistic living traditions.",
    img: "/images/Yoga-Centric Wellness Immersion Program.jpg",
  },
];

const ORBIT_COUNT = ECOSYSTEM.length;

const WHY_LANGMA = [
  {
    icon: (<><circle cx="12" cy="12" r="2.3" /><circle cx="12" cy="5" r="1.6" /><circle cx="19" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" /><circle cx="5" cy="12" r="1.6" /><path d="M12 7.3v2.8M12 13.9v2.8M13.9 12h2.8M7.3 12h2.8" /></>),
    title: "Comprehensive Ecosystem",
    body: "A unique platform connecting learning, education, careers, mobility, culture, business, and wellness under one trusted brand.",
  },
  {
    icon: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>),
    title: "Global Perspective",
    body: "Programs and services designed to prepare individuals and organizations for success in an interconnected world.",
  },
  {
    icon: <path d="M12 2.5l2.9 6.2 6.6.6-5 4.6 1.5 6.6L12 17l-5.2 2.9 1.5-6.6-5-4.6 6.6-.6z" />,
    title: "Experienced Guidance",
    body: "Access dedicated advisors, trainers, and industry professionals committed to helping you achieve your goals.",
  },
  {
    icon: (<><circle cx="12" cy="8.3" r="3.3" /><path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" /></>),
    title: "Personalized Support",
    body: "Every journey is unique. Our team provides customized guidance aligned with your aspirations.",
  },
  {
    icon: (<><rect x="3" y="8" width="10" height="8" rx="4" /><rect x="11" y="8" width="10" height="8" rx="4" /></>),
    title: "Trusted Partnerships",
    body: "Strong relationships with institutions, organizations, and global stakeholders create meaningful opportunities for our clients.",
  },
  {
    icon: <path d="M4 12h14M12 6l6 6-6 6" />,
    title: "Future-Focused Approach",
    body: "We continuously innovate to create pathways that remain relevant in a rapidly changing global landscape.",
  },
];

const PATHWAYS = [
  {
    icon: (<><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 17l-2 4v-4" /></>),
    title: "Language Learning",
    body: "Develop language proficiency and cultural intelligence to unlock global opportunities.",
    href: "#ecosystem",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: (<><path d="M12 4L3 9l9 5 9-5-9-5z" /><path d="M7 11.5V16c0 1.4 2.5 2.5 5 2.5s5-1.1 5-2.5v-4.5" /></>),
    title: "Study Abroad",
    body: "Discover universities, scholarships, and academic pathways that align with your ambitions.",
    href: "/study-abroad",
    img: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: (<><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M3 13h18" /></>),
    title: "Work Abroad",
    body: "Build an international career through language readiness, career preparation, and recruitment support.",
    href: "/work-abroad",
    img: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: (<><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></>),
    title: "Immigration & Residency",
    body: "Explore pathways for long-term mobility, residency, and international settlement.",
    href: "/pr-by-investment",
    img: "https://images.unsplash.com/photo-1530469525856-cf37954301f7?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: (<><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /><path d="M9 12l2 2 4-4" /></>),
    title: "Golden Visa Programs",
    body: "Access investment-linked residency opportunities and global mobility solutions.",
    href: "/golden-visa",
    img: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>),
    title: "Business Expansion",
    body: "Connect with international markets through translation, localization, and trade support programs.",
    href: "#trade-assist",
    img: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=600&q=80",
  },
];

const CULTURAL_WELLNESS = [
  {
    icon: (<><circle cx="12" cy="12" r="9" /><path d="M14.8 9.2l-2 4.4-4.4 2 2-4.4z" /></>),
    title: "Cultural Immersion Tours",
    body: "Explore languages, traditions, heritage, and communities through carefully curated international experiences.",
    img: "/images/Cultural Immersion Tours_01.png",
  },
  {
    icon: (<><path d="M4 8h13M14 4l3 4-3 4" /><path d="M20 16H7M10 12l-3 4 3 4" /></>),
    title: "Educational Exchange Programs",
    body: "Encourage global understanding through structured exposure visits and collaborative learning opportunities.",
    img: "/images/Educational Exchange Programs.png",
  },
  {
    icon: (<><circle cx="12" cy="12" r="3.3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>),
    title: "Yoga & Wellness Retreats",
    body: "Reconnect with wellbeing through immersive yoga, mindfulness, meditation, and holistic wellness programs.",
    img: "/images/Yoga & Wellness Retreats.png",
  },
];

const TRADE_HIGHLIGHTS = [
  "International Trade Delegations",
  "Market Exploration Visits",
  "Trade Fair Participation",
  "B2B Networking Opportunities",
  "Export Readiness Programs",
  "Investment Discovery Missions",
];

const SUCCESS_AUDIENCES = [
  {
    icon: (<><path d="M12 4L3 9l9 5 9-5-9-5z" /><path d="M7 11.5V16c0 1.4 2.5 2.5 5 2.5s5-1.1 5-2.5v-4.5" /></>),
    title: "Students",
    body: "Pursuing international education opportunities.",
  },
  {
    icon: (<><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M3 13h18" /></>),
    title: "Professionals",
    body: "Building successful global careers.",
  },
  {
    icon: (<><path d="M4 21V9.5L12 4l8 5.5V21" /><path d="M9 21v-6h6v6" /><path d="M4 21h16" /></>),
    title: "Institutions",
    body: "Enhancing learning ecosystems and global readiness.",
  },
  {
    icon: <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />,
    title: "Businesses",
    body: "Expanding across languages, cultures, and markets.",
  },
  {
    icon: (<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
    title: "Investors",
    body: "Exploring international mobility and growth opportunities.",
  },
];

// Countries actually served by Langma International — combined Study Abroad + Work Abroad destinations
const COUNTRIES = [
  "Poland",
  "Cyprus",
  "Mauritius",
  "Germany",
  "South Korea",
  "UAE",
  "Singapore",
  "Netherlands",
  "Georgia",
  "Montenegro",
  "Serbia",
  "Qatar",
  "Israel",
  "Russia",
  "Japan",
  "Czech Republic",
  "Libya",
  "Bulgaria",
  "France",
  "Spain",
  "Italy",
  "Canada",
  "Australia",
  "Portugal",
  "United Kingdom",
];

const RESOURCES = [
  "Language Learning Resources",
  "Country Guides",
  "Study Abroad Insights",
  "Career Development Articles",
  "Immigration Updates",
  "Global Market Trends",
  "Wellness & Cultural Perspectives",
];

/* Global city photo mosaic for the Global Reach section */
const REACH_MOSAIC = [
  { country: "South Korea", img: "/images/South korea.webp" },
  { country: "Japan", img: "/images/Japan.webp" },
  { country: "Germany", img: "/images/Germany.webp" },
  { country: "UAE", img: "/images/Dubai.webp" },
  { country: "Singapore", img: "/images/Singapore.webp" },
  { country: "Poland", img: "/images/Poland.webp" },
  { country: "Netherlands", img: "/images/Netherland.webp" },
  { country: "Cyprus", img: "/images/Cyprus.webp" },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function HomeLangma() {
  const [muted, setMuted] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>
          Foreign Language Courses, Foreign Language Classes, Study Abroad, Work Abroad Delhi, India
        </title>
        <meta
          name="description"
          content="Langma International offers foreign language courses, international language training, study abroad, work abroad, PR by investment, foreign language classes Delhi NCR, India."
        />
      </Helmet>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600;1,700&family=Roboto:wght@300;400;500;700&display=swap');

:root{
  --teal:#2FC7A1;
  --teal-700:#296166;
  --teal-800:#1F4A4E;
  --teal-deep:#006064;
  --teal-mid:#0d9488;
  --teal-300:#80CBC4;
  --teal-100:#E0F7FA;
  --navy:#1A2540;
  --navy-700:#243160;
  --blue:#4FA3D1;
  --purple:#7c3aed;
  --terracotta:#DB8771;
  --ink:#1A2027;
  --muted:#64748b;
  --muted-2:#4D5756;
  --bg-pale:#F2FEFF;
  --bg-pale-2:#F5F8F6;
  --border:#D8E0EC;
  --white:#FFFFFF;
  --footer-bg:#111827;

  --font-heading:'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body:'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --maxw:1200px;
  --gutter:clamp(18px, 5vw, 64px);
  --orbit-size:min(540px, 88vw);
  --shadow-sm:0 2px 14px rgba(26,37,64,.07);
  --shadow-md:0 12px 40px -18px rgba(26,37,64,.18);
  --shadow-lg:0 24px 70px -30px rgba(26,37,64,.25);
  --ease:cubic-bezier(.22,.61,.36,1);
}

.langma-home *,.langma-home *::before,.langma-home *::after{box-sizing:border-box;}
.langma-home{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
.langma-home{
  margin:0;font-family:var(--font-body);color:var(--muted-2);background:var(--white);
  font-size:16px;line-height:1.7;font-weight:400;-webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;overflow-x:hidden;
}
.langma-home a{color:inherit;text-decoration:none;}
.langma-home h1,.langma-home h2,.langma-home h3,.langma-home h4{font-family:var(--font-heading);font-weight:700;color:var(--ink);margin:0;}
.langma-home p{margin:0 0 0.85em;}
.langma-home em{font-style:italic;font-weight:700;color:var(--blue);}
.langma-home ::selection{background:var(--teal);color:#fff;}
.langma-home img{max-width:100%;height:auto;}

/* layout */
.langma-home .wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
.langma-home .section{padding:clamp(48px,7vw,96px) 0;position:relative;isolation:isolate;scroll-margin-top:20px;}
.langma-home .section > .wrap{position:relative;z-index:1;}
.langma-home .section--sand{background:var(--bg-pale);}
.langma-home .section--tight{padding:clamp(20px,3vw,36px) 0;}

.langma-home .section-body{margin-top:clamp(28px,4vw,40px);}

.langma-home .eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-body);font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--teal-700);margin:0 0 14px;background:rgba(47,199,161,.08);border:1px solid rgba(47,199,161,.35);border-radius:100px;padding:7px 16px 7px 10px;}
.langma-home .eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--teal);flex:none;}
.langma-home .head--center .eyebrow{justify-content:center;}

.langma-home .display{font-size:clamp(1.9rem,4.6vw,3.4rem);font-weight:700;letter-spacing:-.5px;line-height:1.14;color:var(--ink);}
.langma-home h2.display{font-size:clamp(1.6rem,3.6vw,2.5rem);}
.langma-home .lede{font-size:clamp(1rem,1.5vw,1.13rem);color:var(--muted);max-width:60ch;line-height:1.65;font-weight:400;}

.langma-home .head{max-width:760px;}
.langma-home .head--center{max-width:760px;margin:0 auto;text-align:center;}

/* ======= BUTTONS (fixed contrast — text always visible) ======= */
.langma-home .btn{
  --bg:var(--teal-mid);
  --fg:#fff;
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  font-family:var(--font-body);font-weight:600;font-size:14px;letter-spacing:.02em;
  padding:15px 28px;border-radius:100px;
  border:1px solid transparent;
  background:var(--bg);color:var(--fg) !important;
  cursor:pointer;
  transition:transform .3s var(--ease), box-shadow .3s var(--ease), background .3s var(--ease), color .3s var(--ease), border-color .3s var(--ease);
  position:relative;overflow:hidden;text-align:center;text-decoration:none;
  white-space:nowrap;
}
.langma-home .btn::before{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(120deg, transparent, rgba(255,255,255,.35), transparent);transform:skewX(-20deg);transition:left .65s ease;pointer-events:none;}
.langma-home .btn:hover::before{left:130%;}
.langma-home .btn:hover{transform:translateY(-2px);box-shadow:0 14px 26px -12px rgba(13,148,136,.4);background:var(--teal-deep);color:#fff !important;}
.langma-home .btn:focus-visible{outline:2px solid var(--teal);outline-offset:3px;}

/* Ghost — solid teal border, navy text, keeps contrast on both white AND sand backgrounds */
.langma-home .btn--ghost{
  background:#ffffff;
  color:var(--navy) !important;
  border-color:var(--teal);
}
.langma-home .btn--ghost:hover{
  background:var(--teal);
  color:#ffffff !important;
  border-color:var(--teal);
  box-shadow:0 10px 24px -12px rgba(47,199,161,.55);
}

/* Teal filled — used for primary CTAs on light sections */
.langma-home .btn--teal{
  background:var(--teal-mid);
  color:#ffffff !important;
  border-color:var(--teal-mid);
}
.langma-home .btn--teal:hover{
  background:var(--teal-deep);
  color:#ffffff !important;
  border-color:var(--teal-deep);
}

.langma-home .btn--sm{padding:11px 20px;font-size:12.5px;}

/* hero */
.langma-home .hero{position:relative;display:flex;align-items:center;background:var(--white);color:var(--ink);overflow:hidden;padding:clamp(48px,7vw,80px) 0 clamp(40px,5vw,60px);}
.langma-home .hero__glow{position:absolute;top:-25%;right:-10%;width:55vw;height:55vw;max-width:640px;max-height:640px;background:radial-gradient(circle, rgba(47,199,161,.12), transparent 65%);filter:blur(10px);pointer-events:none;}
.langma-home .hero__glow-2{position:absolute;bottom:-20%;left:-10%;width:40vw;height:40vw;max-width:480px;max-height:480px;background:radial-gradient(circle, rgba(79,163,209,.10), transparent 65%);filter:blur(10px);pointer-events:none;}

.langma-home .blob{position:absolute;border-radius:50%;filter:blur(50px);pointer-events:none;z-index:0;opacity:.55;}
.langma-home .blob--teal{background:radial-gradient(circle, rgba(47,199,161,.28), transparent 70%);}
.langma-home .blob--blue{background:radial-gradient(circle, rgba(79,163,209,.22), transparent 70%);}
.langma-home .blob--purple{background:radial-gradient(circle, rgba(124,58,237,.16), transparent 70%);}

.langma-home .hero__grid{position:relative;z-index:2;display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,5vw,56px);align-items:center;}
.langma-home .hero__tag{display:flex;align-items:center;gap:7px;margin-bottom:14px;}
.langma-home .hero__tag .dash{width:26px;height:1.5px;background:var(--teal-700);}
.langma-home .hero__tag span{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--teal-700);font-weight:600;}
.langma-home .hero h1{font-size:clamp(2rem,5.5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-.5px;color:var(--ink);margin-bottom:18px;}
.langma-home .hero__sub{font-size:clamp(.98rem,1.4vw,1.1rem);color:var(--muted);max-width:56ch;margin-bottom:10px;line-height:1.65;}
.langma-home .hero__actions{display:flex;flex-wrap:wrap;gap:12px;margin:22px 0 4px;}
.langma-home .hero__trust{display:flex;align-items:center;gap:14px;margin-top:26px;flex-wrap:wrap;}
.langma-home .hero__trust-avatars{display:flex;}
.langma-home .hero__trust-avatars img{width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid #fff;margin-left:-8px;box-shadow:var(--shadow-sm);}
.langma-home .hero__trust-avatars img:first-child{margin-left:0;}
.langma-home .hero__trust-text{font-size:12.5px;color:var(--muted);line-height:1.4;}
.langma-home .hero__trust-text strong{color:var(--ink);display:block;font-family:var(--font-heading);font-size:13.5px;}

.langma-home .hero__media{position:relative;z-index:2;animation:heroFloat 6s ease-in-out infinite;}
@keyframes heroFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
.langma-home .hero__media-frame{position:relative;border:2px solid var(--ink);border-radius:26px;padding:8px;background:var(--white);}
.langma-home .hero__media-inner{position:relative;border-radius:18px;overflow:hidden;aspect-ratio:4/3.6;background:var(--bg-pale-2);}
.langma-home .hero__media-inner img{display:block;width:100%;height:100%;object-fit:cover;}
.langma-home .hero__media-video{position:relative;width:100%;height:220px;border-radius:16px;overflow:hidden;background:#000;margin:0 auto;}
.langma-home .hero__media-video video{display:block;width:100%;height:100%;object-fit:cover;}
.langma-home .hero__media-video .sound-btn{position:absolute;bottom:16px;right:16px;background:rgba(0,0,0,.6);color:#fff;border:none;padding:8px 14px;border-radius:100px;font-family:var(--font-body);font-size:13px;cursor:pointer;transition:background .25s var(--ease);}
.langma-home .hero__media-video .sound-btn:hover{background:rgba(0,0,0,.78);}
@media (min-width:640px){ .langma-home .hero__media-video{height:280px;} }
@media (min-width:1024px){ .langma-home .hero__media-video{height:333px;} }
.langma-home .hero__badge{position:absolute;background:#fff;box-shadow:var(--shadow-md);border-radius:100px;padding:10px 18px;display:flex;align-items:center;gap:8px;font-family:var(--font-heading);z-index:3;}
.langma-home .hero__badge--top{top:-18px;left:16px;}
.langma-home .hero__badge--bottom{bottom:-16px;right:14px;}
.langma-home .hero__badge .num{font-weight:700;color:var(--teal-700);font-size:15px;}
.langma-home .hero__badge .lbl{color:var(--navy);font-size:13px;}

/* stats */
.langma-home .langma__stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:8px;}
.langma-home .langma__stat{border-radius:20px;padding:24px 22px;box-shadow:var(--shadow-sm);}
.langma-home .langma__stat:nth-child(1){background:var(--teal-deep);color:#fff;}
.langma-home .langma__stat:nth-child(2){background:var(--teal-300);color:var(--teal-deep);}
.langma-home .langma__stat:nth-child(3){background:var(--teal-100);color:var(--teal-deep);}
.langma-home .langma__stat:nth-child(4){background:var(--teal-300);color:var(--teal-deep);}
.langma-home .langma__stat .n{font-family:var(--font-heading);font-size:clamp(1.6rem,2.6vw,2rem);font-weight:700;line-height:1.1;}
.langma-home .langma__stat .l{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;margin-top:8px;font-weight:700;}
.langma-home .langma__stat .d{font-size:13px;margin-top:12px;line-height:1.55;opacity:.9;}
.langma-home .stats-card-shimmer{position:relative;overflow:hidden;transition:transform .35s var(--ease);}
.langma-home .stats-card-shimmer:hover{transform:translateY(-4px);}

.langma-home .year-ring{width:120px;height:120px;flex:none;}

/* grid / card */
.langma-home .grid{display:grid;gap:18px;}
.langma-home .grid-3{grid-template-columns:repeat(3,1fr);}
.langma-home .grid-5{grid-template-columns:repeat(5,1fr);}
.langma-home .card{background:var(--white);border:1px solid var(--border);border-radius:20px;padding:26px 22px;box-shadow:var(--shadow-sm);transition:transform .35s var(--ease), box-shadow .35s var(--ease), border-color .35s var(--ease);display:flex;flex-direction:column;}
.langma-home .card:hover{transform:translateY(-5px);box-shadow:var(--shadow-md), 0 0 0 3px rgba(47,199,161,.12);border-color:rgba(47,199,161,.55);}
.langma-home .card:hover .card__ico{transform:scale(1.1) rotate(-4deg);}
.langma-home .card__ico{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;margin-bottom:14px;background:var(--teal-mid);color:#fff;transition:transform .35s var(--ease);flex:none;}
.langma-home .card h3{font-family:var(--font-heading);font-size:1.14rem;margin-bottom:8px;font-weight:600;}
.langma-home .card p{color:var(--muted);font-size:14px;margin-bottom:0;line-height:1.6;}

.langma-home .card--photo{padding:0;overflow:hidden;}
.langma-home .card--photo .card__photo{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--bg-pale-2);}
.langma-home .card--photo .card__photo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s var(--ease);}
.langma-home .card--photo:hover .card__photo img{transform:scale(1.08);}
.langma-home .card--photo .card__photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg, transparent 40%, rgba(26,37,64,.5));}
.langma-home .card--photo .card__ico{position:absolute;top:14px;left:14px;background:rgba(255,255,255,.95);color:var(--teal-mid);backdrop-filter:blur(4px);margin:0;z-index:2;width:44px;height:44px;border-radius:12px;box-shadow:var(--shadow-sm);}
.langma-home .card--photo .card__body{padding:22px 22px 24px;flex:1;display:flex;flex-direction:column;}
.langma-home .card--photo h3{color:var(--ink);}
.langma-home .card--photo:hover .card__ico{transform:scale(1.1);}

.langma-home .acc-0 .card__ico{background:var(--teal-mid);}
.langma-home .acc-1 .card__ico{background:var(--blue);}
.langma-home .acc-2 .card__ico{background:var(--purple);}
.langma-home .acc-3 .card__ico{background:var(--teal-700);}
.langma-home .acc-4 .card__ico{background:var(--terracotta);}
.langma-home .acc-5 .card__ico{background:var(--teal-deep);}
.langma-home .acc-0 h3{color:var(--teal-mid);}
.langma-home .acc-1 h3{color:var(--blue);}
.langma-home .acc-2 h3{color:var(--purple);}
.langma-home .acc-3 h3{color:var(--teal-700);}
.langma-home .acc-4 h3{color:var(--terracotta);}
.langma-home .acc-5 h3{color:var(--teal-deep);}

.langma-home .audience{text-align:center;padding:22px 14px;align-items:center;}
.langma-home .audience .card__ico{margin:0 auto 12px;border-radius:50%;}
.langma-home .audience h3{font-size:1rem;margin-bottom:4px;}
.langma-home .audience p{font-size:13px;}

/* split */
.langma-home .split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,4vw,56px);align-items:center;}
.langma-home .split__panel{background:var(--bg-pale);border:1px solid var(--border);border-radius:22px;padding:32px 30px;color:var(--ink);position:relative;overflow:hidden;box-shadow:var(--shadow-sm);}
.langma-home .split__panel h3{font-size:1.3rem;margin-bottom:2px;}

.langma-home .pull-quote{font-family:var(--font-heading);font-style:italic;font-weight:600;font-size:clamp(1.2rem,2.4vw,1.6rem);color:var(--teal-700);line-height:1.4;margin:14px 0;padding-left:18px;border-left:3px solid var(--teal);}
.langma-home .closing-line{font-family:var(--font-heading);font-style:italic;font-weight:600;color:var(--teal-700);font-size:1.05rem;margin-top:14px;}

.langma-home .check-list{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:0 32px;}
.langma-home .check-list.cols-1{grid-template-columns:1fr;}
.langma-home .check-list.cols-2{grid-template-columns:repeat(2,1fr);}
.langma-home .check-list li{display:flex;gap:12px;padding:10px 0;font-size:14.5px;color:var(--muted-2);border-bottom:1px dashed var(--border);line-height:1.45;}
.langma-home .check-list li svg{flex:none;color:var(--teal-700);margin-top:3px;}
.langma-home .split__panel .check-list li{border-bottom-color:rgba(41,97,102,.16);}

.langma-home .pill-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px;}
.langma-home .pill{border:1px solid var(--border);background:var(--white);border-radius:100px;padding:10px 20px;font-size:13px;color:var(--muted-2);font-weight:500;box-shadow:var(--shadow-sm);transition:border-color .3s var(--ease), color .3s var(--ease), transform .3s var(--ease);}
.langma-home .pill:hover{border-color:var(--teal);color:var(--teal-700);transform:translateY(-2px);}

.langma-home .marquee{overflow:hidden;position:relative;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);}
.langma-home .marquee__track{display:flex;gap:12px;width:max-content;animation:marquee 32s linear infinite;}
.langma-home .marquee .pill{white-space:nowrap;flex:none;}
.langma-home .marquee:hover .marquee__track{animation-play-state:paused;}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

.langma-home .photo-frame{position:relative;border-radius:22px;overflow:hidden;box-shadow:var(--shadow-lg);background:var(--bg-pale-2);}
.langma-home .photo-frame img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease);}
.langma-home .photo-frame:hover img{transform:scale(1.06);}
.langma-home .photo-frame--tall{aspect-ratio:2/3;}
.langma-home .photo-frame--wide{aspect-ratio:3/2;}
.langma-home .photo-credit{position:absolute;bottom:10px;right:12px;font-size:9.5px;color:rgba(255,255,255,.85);background:rgba(0,0,0,.35);padding:3px 9px;border-radius:100px;backdrop-filter:blur(3px);}

.langma-home .reach-mosaic{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 32px;}
.langma-home .reach-mosaic .tile{position:relative;border-radius:16px;overflow:hidden;box-shadow:var(--shadow-sm);aspect-ratio:3/4;}
.langma-home .reach-mosaic .tile img{width:100%;height:100%;object-fit:cover;object-position:center 30%;transition:transform .5s var(--ease);}
.langma-home .reach-mosaic .tile:hover img{transform:scale(1.1);}
.langma-home .reach-mosaic .tile::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(26,37,64,.75));}
.langma-home .reach-mosaic .tile .name{position:absolute;bottom:8px;left:12px;color:#fff;font-family:var(--font-heading);font-weight:600;font-size:13px;z-index:2;letter-spacing:.02em;}
@media (max-width:768px){
  .langma-home .reach-mosaic{grid-template-columns:repeat(3,1fr);}
  .langma-home .reach-mosaic .tile:nth-child(n+7){display:none;}
}
@media (max-width:480px){
  .langma-home .reach-mosaic{grid-template-columns:repeat(2,1fr);}
  .langma-home .reach-mosaic .tile:nth-child(n+6){display:none;}
}

/* pathway strip */
.langma-home .pathway-strip{display:grid;grid-template-columns:repeat(6,1fr);gap:14px;}
.langma-home .pathway-tile{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:22px 14px;text-align:center;transition:transform .3s var(--ease), box-shadow .3s var(--ease), border-color .3s var(--ease);display:flex;flex-direction:column;}
.langma-home .pathway-tile:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);border-color:rgba(47,199,161,.4);}
.langma-home .pathway-tile:hover .card__ico{transform:scale(1.14) rotate(-4deg);}
.langma-home .pathway-tile .card__ico{width:38px;height:38px;border-radius:10px;margin:0 auto 12px;}
.langma-home .pathway-tile h3{font-family:var(--font-heading);font-size:13px;font-weight:600;color:var(--ink);margin:0 0 5px;line-height:1.3;}
.langma-home .pathway-tile p{font-size:11.5px;color:var(--muted);margin:0 0 12px;line-height:1.5;flex:1;}
.langma-home .pathway-tile .path-link{font-family:var(--font-heading);font-size:11.5px;font-weight:600;color:var(--teal-700);display:inline-flex;align-items:center;gap:4px;transition:gap .25s var(--ease), color .25s var(--ease);}
.langma-home .pathway-tile .path-link:hover{color:var(--teal-deep);gap:8px;}

/* Pathway section CTA row */
.langma-home .pathway-cta{
  display:flex;justify-content:center;align-items:center;flex-wrap:wrap;
  gap:14px;margin-top:clamp(24px,3vw,32px);
}

/* ============ ORBITAL ECOSYSTEM (v3) ============ */
.langma-home .orbit-wrap{display:flex;justify-content:center;margin:0;}
.langma-home .orbit-system{position:relative;width:var(--orbit-size);aspect-ratio:1;}
.orbit-system:hover .orbit-rotor,
.orbit-system:hover .orbit-chip,
.langma-home .orbit-system:hover .orbit-spokes{animation-play-state:paused;}

.langma-home .orbit-ring{position:absolute;border-radius:50%;pointer-events:none;}
.langma-home .orbit-ring--outer{inset:46px;border:1.5px dashed rgba(47,199,161,.4);}
.langma-home .orbit-ring--mid{inset:27%;border:1px solid rgba(79,163,209,.22);}
.langma-home .orbit-ring--halo{inset:8px;border:1px solid rgba(47,199,161,.12);}

.langma-home .orbit-spokes{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
.langma-home .orbit-spokes line{animation:spokeFlow 6s linear infinite;}
@keyframes spokeFlow{to{stroke-dashoffset:-18;}}

.langma-home .orbit-hub{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:3;}
.langma-home .orbit-hub__pulse{position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle, rgba(47,199,161,.35), transparent 70%);animation:hubPulse 3s ease-in-out infinite;}
.langma-home .orbit-hub__core{position:relative;width:108px;height:108px;border-radius:50%;background:linear-gradient(140deg,#4FA3D1,#2FC7A1 60%,#0d9488);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 18px 44px -14px rgba(13,148,136,.55), inset 0 1px 0 rgba(255,255,255,.35);}
.langma-home .orbit-hub__logo{width:76px;height:76px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;padding:14px;box-shadow:0 4px 14px -6px rgba(0,0,0,.25);}
.langma-home .orbit-hub__logo img{width:100%;height:100%;object-fit:contain;display:block;}
@keyframes hubPulse{0%,100%{transform:scale(1);opacity:.9;}50%{transform:scale(1.22);opacity:.35;}}

.langma-home .orbit-rotor{position:absolute;inset:0;animation:orbitSpin 50s linear infinite;}
@keyframes orbitSpin{to{transform:rotate(360deg);}}

.langma-home .orbit-sat{position:absolute;top:50%;left:50%;transform:rotate(var(--angle)) translateY(calc(var(--orbit-size) / -2 + 46px));}
.langma-home .orbit-chip{position:absolute;top:0;left:0;transform:translate(-50%,-50%) rotate(calc(var(--angle) * -1));animation:orbitCounter 50s linear infinite;display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.96);border:1.5px solid rgba(47,199,161,.5);border-radius:100px;padding:5px 14px 5px 6px;width:max-content;box-shadow:0 8px 22px -10px rgba(13,148,136,.35);backdrop-filter:blur(4px);transition:box-shadow .3s var(--ease), border-color .3s var(--ease);cursor:default;}
@keyframes orbitCounter{to{transform:translate(-50%,-50%) rotate(calc(var(--angle) * -1 - 360deg));}}
.langma-home .orbit-chip .ico{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--teal-mid);color:#fff;flex:none;transition:transform .3s var(--ease);}
.langma-home .orbit-chip span{font-family:var(--font-heading);font-size:11.5px;font-weight:600;color:var(--navy);white-space:nowrap;line-height:1;}
.langma-home .orbit-sat:hover .orbit-chip{border-color:var(--teal-mid);box-shadow:0 12px 30px -10px rgba(13,148,136,.55);}
.langma-home .orbit-sat:hover .orbit-chip .ico{transform:scale(1.15);}
.langma-home .orbit-sat:nth-child(3n+2) .orbit-chip .ico{background:var(--blue);}
.langma-home .orbit-sat:nth-child(3n+2):hover .orbit-chip{border-color:var(--blue);}
.langma-home .orbit-sat:nth-child(3n) .orbit-chip .ico{background:var(--teal-700);}
.langma-home .orbit-sat:nth-child(3n):hover .orbit-chip{border-color:var(--teal-700);}

@media (max-width:600px){
  :root{--orbit-size:min(360px,92vw);}
  .langma-home .orbit-ring--outer{inset:34px;}
  .langma-home .orbit-sat{transform:rotate(var(--angle)) translateY(calc(var(--orbit-size) / -2 + 34px));}
  .langma-home .orbit-chip{padding:0;border:2px solid rgba(47,199,161,.5);}
  .langma-home .orbit-chip span{display:none;}
  .langma-home .orbit-chip .ico{width:38px;height:38px;}
  .langma-home .orbit-hub__core{width:84px;height:84px;}
  .langma-home .orbit-hub__logo{width:60px;height:60px;padding:10px;}
}

.langma-home .orbit-legend{display:none;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:18px;}
.langma-home .orbit-legend span{font-size:11px;font-weight:600;color:var(--teal-700);background:rgba(47,199,161,.08);border:1px solid rgba(47,199,161,.3);border-radius:100px;padding:5px 12px;}
@media (max-width:600px){ .langma-home .orbit-legend{display:flex;} }

/* final band */
.langma-home .final-band{background:var(--footer-bg);color:#fff;padding:clamp(56px,7vw,96px) 0;position:relative;overflow:hidden;scroll-margin-top:20px;}
.langma-home .final-band::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at top, rgba(47,199,161,.12), transparent 60%);pointer-events:none;}
.langma-home .final-band .eyebrow{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.25);color:var(--teal-300);}
.langma-home .final-band .eyebrow::before{background:var(--teal-300);}
.langma-home .final-band h2{color:#fff;}
.langma-home .final-band .lede{color:rgba(255,255,255,.72);}
.langma-home .final-band .closing-line{color:var(--teal-300);}
.langma-home .final-band .btn--ghost{background:transparent;color:#fff !important;border-color:rgba(255,255,255,.45);}
.langma-home .final-band .btn--ghost:hover{background:rgba(255,255,255,.12);color:#fff !important;border-color:#fff;}
.langma-home .final-band .btn--light{background:#fff;color:var(--navy) !important;}
.langma-home .final-band .btn--light:hover{background:var(--teal-100);color:var(--navy) !important;}
.langma-home .brand-strip{margin-top:44px;padding-top:32px;border-top:1px solid rgba(255,255,255,.14);text-align:center;}
.langma-home .brand-strip .mark{font-family:var(--font-heading);font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:6px;letter-spacing:-.01em;}
.langma-home .brand-strip .tag{font-family:var(--font-heading);font-style:italic;font-weight:600;color:var(--teal-300);font-size:.95rem;margin-bottom:12px;}
.langma-home .brand-strip .desc{font-size:12.5px;color:rgba(255,255,255,.55);max-width:64ch;margin:0 auto;line-height:1.65;}

/* connect form */
.langma-home .btn:disabled{opacity:.5;cursor:not-allowed;pointer-events:none;}
.langma-home .connect-form{display:flex;flex-direction:column;gap:14px;}
.connect-form input,
.connect-form select,
.langma-home .connect-form textarea{width:100%;font-family:var(--font-body);font-size:14px;color:#fff;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.22);border-radius:12px;padding:13px 16px;transition:border-color .25s var(--ease), background .25s var(--ease);}
.langma-home .connect-form select{color-scheme:dark;}
.connect-form input::placeholder,
.langma-home .connect-form textarea::placeholder{color:rgba(255,255,255,.45);}
.connect-form input:focus-visible,
.connect-form select:focus-visible,
.langma-home .connect-form textarea:focus-visible{outline:2px solid var(--teal-300);outline-offset:2px;border-color:var(--teal-300);background:rgba(255,255,255,.11);}
.langma-home .connect-form textarea{resize:vertical;min-height:96px;font-family:var(--font-body);}
.langma-home .connect-form .btn{align-self:flex-start;margin-top:2px;}
.langma-home .connect-success{display:flex;align-items:flex-start;gap:12px;background:rgba(47,199,161,.14);border:1px solid rgba(47,199,161,.4);border-radius:16px;padding:22px;}
.langma-home .connect-success svg{flex:none;color:var(--teal-300);margin-top:3px;}
.langma-home .connect-success strong{display:block;font-family:var(--font-heading);font-size:15px;margin-bottom:4px;color:#fff;}
.langma-home .connect-success p{margin:0;font-size:13.5px;color:rgba(255,255,255,.75);}

/* reveal */
.langma-home .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s var(--ease), transform .7s var(--ease);}
.langma-home .reveal.in{opacity:1;transform:none;}

/* ============ RESPONSIVE ============ */
@media (max-width:1024px){
  .langma-home .grid-3{grid-template-columns:repeat(2,1fr);}
  .langma-home .grid-5{grid-template-columns:repeat(3,1fr);}
  .langma-home .check-list.cols-2{grid-template-columns:repeat(2,1fr);}
  .langma-home .langma__stats{grid-template-columns:repeat(2,1fr);}
  .langma-home .split{gap:32px;}
  .langma-home .pathway-strip{grid-template-columns:repeat(3,1fr);}
}
@media (max-width:900px){
  .langma-home .hero__grid{grid-template-columns:1fr;text-align:left;}
  .langma-home .hero__media{order:-1;margin:0 auto 24px;max-width:460px;width:100%;}
  .langma-home .split{grid-template-columns:1fr;}
  .langma-home .year-ring{width:100px;height:100px;bottom:-16px !important;right:8px !important;}
}
@media (max-width:768px){
  .langma-home .grid-3{grid-template-columns:1fr;}
  .langma-home .grid-5{grid-template-columns:repeat(2,1fr);}
  .langma-home .check-list.cols-2{grid-template-columns:1fr;}
  .langma-home .pathway-strip{grid-template-columns:repeat(2,1fr);}
  .langma-home .hero__badge--top{top:-14px;left:12px;padding:8px 14px;}
  .langma-home .hero__badge--bottom{bottom:-12px;right:10px;padding:8px 14px;}
  .langma-home .hero__badge .num{font-size:13px;}
  .langma-home .hero__badge .lbl{font-size:12px;}
}
@media (max-width:640px){
  .langma-home .langma__stats{grid-template-columns:1fr 1fr;gap:12px;}
  .langma-home .langma__stat{padding:20px 18px;}
  .langma-home .split__panel{padding:26px 22px;}
  .langma-home .card{padding:22px 18px;}
  .langma-home .final-band .btn--ghost, .langma-home .final-band .btn--light{width:100%;}
  .langma-home .grid-5{grid-template-columns:repeat(2,1fr);}
  .langma-home .photo-frame--tall{aspect-ratio:3/4;}
  .langma-home .display{line-height:1.18;}
  .langma-home .hero__actions{width:100%;}
  .langma-home .hero__actions .btn{flex:1;min-width:calc(50% - 6px);}
  .langma-home .hero__trust{gap:10px;}
  .langma-home .pathway-cta .btn{width:100%;}
}
@media (max-width:480px){
  .langma-home .section{padding:44px 0;}
  .langma-home .hero{padding:36px 0 28px;}
  .langma-home .grid-5{grid-template-columns:1fr 1fr;}
  .langma-home .hero__actions .btn{flex:1 1 100%;}
  .langma-home .pathway-strip{grid-template-columns:1fr;}
  .langma-home .hero__media-frame{padding:6px;}
  .langma-home .card--photo .card__body{padding:18px 18px 20px;}
}
@media (max-width:380px){
  .langma-home .grid-5{grid-template-columns:1fr;}
}
@media (prefers-reduced-motion:reduce){
  .langma-home *{animation:none !important;transition-duration:.01ms !important;scroll-behavior:auto !important;}
  .langma-home .reveal{opacity:1;transform:none;}
}
      `}</style>
      <div className="langma-home">
        <main>
          {/* ============================ HERO ============================ */}
          <section className="hero" id="top">
            <div className="hero__glow" aria-hidden="true"></div>
            <div className="hero__glow-2" aria-hidden="true"></div>
            <div className="wrap">
              <div className="hero__grid">
                <div className="hero__copy">
                  <h1>Your Gateway to <em>Global Opportunities</em></h1>
                  <p className="hero__sub">Langma International is a Global Opportunities Platform connecting individuals, institutions, and businesses to language learning, international education, global careers, cultural exchange, and cross-border opportunities.</p>
                  <p className="hero__sub">We empower people to learn, grow, and succeed in an increasingly connected world.</p>
                  <div className="hero__actions">
                    <button type="button" className="btn" onClick={() => setOpen(true)}>Book a Consultation</button>
                    <a href="#ecosystem" className="btn btn--ghost">Explore Opportunities</a>
                  </div>
                  <div className="hero__trust">
                    <div className="hero__trust-avatars">
                      <img src="/images/img1002.avif" alt="" loading="lazy" />
                      <img src="/images/img1002.avif" alt="" loading="lazy" />
                      <img src="/images/img1003.jpeg" alt="" loading="lazy" />
                      <img src="/images/img1004.avif" alt="" loading="lazy" />
                    </div>
                    <div className="hero__trust-text">
                      <strong>100,000+ learners</strong> trusted us for their global journey
                    </div>
                  </div>
                </div>
                <div className="hero__media">
                  <div className="hero__media-frame">
                    <div className="hero__media-video">
                      <video autoPlay muted={muted} loop playsInline>
                        <source
                          src="https://res.cloudinary.com/dzv9zcrlz/video/upload/v1779520185/Website_Final_Video_Updated_01_f4npde.mp4"
                          type="video/mp4"
                        />
                      </video>
                      {muted && (
                        <button className="sound-btn" onClick={() => setMuted(false)}>
                          Tap for Sound
                        </button>
                      )}
                    </div>
                    <div className="hero__badge hero__badge--top">
                      <span className="num"><CountUp target={100000} suffix="+" /></span><span className="lbl">Candidates Trained</span>
                    </div>
                    <div className="hero__badge hero__badge--bottom">
                      <span className="num"><CountUp target={50} suffix="+" /></span><span className="lbl">Languages</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================ STATS ============================ */}
          <section className="section section--tight">
            <div className="wrap">
              <div className="langma__stats">
                <Reveal as="div" className="langma__stat stats-card-shimmer">
                  <div className="n">2012</div>
                  <div className="l">Established</div>
                  <div className="d">Over a decade of experience in global learning and mobility.</div>
                </Reveal>
                <Reveal as="div" className="langma__stat stats-card-shimmer" delay={80}>
                  <div className="n"><CountUp target={100000} suffix="+" /></div>
                  <div className="l">Candidates Trained</div>
                  <div className="d">Learners empowered across languages, careers, and global opportunities.</div>
                </Reveal>
                <Reveal as="div" className="langma__stat stats-card-shimmer" delay={160}>
                  <div className="n"><CountUp target={50} suffix="+" /></div>
                  <div className="l">Languages</div>
                  <div className="d">Comprehensive language training across major world languages.</div>
                </Reveal>
                <Reveal as="div" className="langma__stat stats-card-shimmer" delay={240}>
                  <div className="n">Global</div>
                  <div className="l">Reach &amp; Staffing</div>
                  <div className="d">A trusted network spanning education, careers, and mobility.</div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ ABOUT LANGMA ============================ */}
          <section className="section" id="about">
            <div className="wrap">
              <div className="split" style={{ alignItems: "center" }}>
                <Reveal style={{ position: "relative" }}>
                  <div className="photo-frame photo-frame--tall">
                    <img src="/images/Learn. Explore. Connect. Grow Globally..jpg" alt="Learners connecting through language and culture, reflecting Langma International's global learning community" loading="lazy" />
                  </div>
                  <svg className="year-ring" viewBox="0 0 120 120" aria-label="Established 2012, over a decade of experience" style={{ position: "absolute", bottom: "-24px", right: "12px", background: "#fff", borderRadius: "50%", boxShadow: "var(--shadow-lg)", padding: "6px" }}>
                    <path d="M 60 18 A 42 42 0 0 1 93.9787137637478 84.68698059628386 L 81.03444185374863 75.2824165596043 A 26 26 0 0 0 60 34 Z" fill="#2FC7A1" />
                    <path d="M 93.9787137637478 84.68698059628386 A 42 42 0 0 1 29.38331764830071 88.75097844900492 L 41.04681568704329 77.7982247541459 A 26 26 0 0 0 81.03444185374863 75.2824165596043 Z" fill="#296166" />
                    <path d="M 29.38331764830071 88.75097844900492 A 42 42 0 0 1 26.0212862362522 35.31301940371613 L 38.96555814625137 44.7175834403957 A 26 26 0 0 0 41.04681568704329 77.7982247541459 Z" fill="#4FA3D1" />
                    <path d="M 26.0212862362522 35.31301940371613 A 42 42 0 0 1 59.99999999999999 18 L 59.99999999999999 34 A 26 26 0 0 0 38.96555814625137 44.7175834403957 Z" fill="#80CBC4" />
                    <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fill="#1A2540" fontSize="19" fontWeight="700" fontFamily="Poppins, sans-serif">Est.</text>
                    <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fill="#1A2540" fontSize="17" fontWeight="700" fontFamily="Poppins, sans-serif">2012</text>
                  </svg>
                </Reveal>
                <Reveal>
                  <span className="eyebrow">About Langma</span>
                  <h2 className="display">Learn. Explore. Connect. <em>Grow Globally.</em></h2>
                  <p style={{ color: "var(--muted)", marginTop: "14px" }}>Langma International began with a vision to bridge cultures through language learning. Over the years, that vision has evolved into a broader mission: empowering individuals and organizations to access opportunities beyond geographical and linguistic boundaries.</p>
                  <p style={{ color: "var(--muted)" }}>Today, Langma serves as a trusted partner for students, professionals, institutions, businesses, and investors seeking global growth through learning, education, careers, mobility, cultural immersion, and international collaboration.</p>
                  <Link to="/about" className="btn btn--ghost btn--sm" style={{ marginTop: "10px" }}>Read More About Us</Link>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ ECOSYSTEM ============================ */}
          <section className="section section--sand" id="ecosystem">
            <div className="blob blob--teal" style={{ width: "420px", height: "420px", top: "-120px", left: "-140px" }} aria-hidden="true"></div>
            <div className="blob blob--blue" style={{ width: "360px", height: "360px", bottom: "-100px", right: "-120px" }} aria-hidden="true"></div>
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Global Opportunities Ecosystem</span>
                <h2 className="display">One Platform. <em>Multiple Global Pathways.</em></h2>
                <p className="lede" style={{ margin: "12px auto 0" }}>Explore an integrated ecosystem designed to support your aspirations at every stage of your journey.</p>
              </Reveal>

              <Reveal className="orbit-wrap section-body">
                <div>
                  <div className="orbit-system" role="img" aria-label="Global pathways orbiting the Langma International hub">
                    <div className="orbit-ring orbit-ring--halo" aria-hidden="true"></div>
                    <div className="orbit-ring orbit-ring--outer" aria-hidden="true"></div>
                    <div className="orbit-ring orbit-ring--mid" aria-hidden="true"></div>
                    <div className="orbit-rotor">
                      <svg className="orbit-spokes" viewBox="0 0 100 100" aria-hidden="true">
                        {ECOSYSTEM.map((item, i) => {
                          const a = ((360 / ORBIT_COUNT) * i * Math.PI) / 180;
                          const x = 50 + 41.5 * Math.sin(a);
                          const y = 50 - 41.5 * Math.cos(a);
                          return (
                            <line key={item.title} x1="50" y1="50" x2={x.toFixed(2)} y2={y.toFixed(2)} stroke="#2FC7A1" strokeWidth="0.35" strokeDasharray="1.4 2.2" strokeLinecap="round" opacity="0.5" />
                          );
                        })}
                      </svg>
                      {ECOSYSTEM.map((item, i) => (
                        <div className="orbit-sat" key={item.title} style={{ "--angle": `${(360 / ORBIT_COUNT) * i}deg` }}>
                          <div className="orbit-chip" title={item.title}>
                            <span className="ico">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                            </span>
                            <span>{item.short}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="orbit-hub">
                      <div className="orbit-hub__pulse" aria-hidden="true"></div>
                      <div className="orbit-hub__core">
                        <div className="orbit-hub__logo">
                          <img src="/images/langma.svg" alt="Langma International" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="orbit-legend" aria-hidden="true">
                    {ECOSYSTEM.map((item) => (
                      <span key={item.title}>{item.short}</span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <div className="grid grid-3 section-body">
                {ECOSYSTEM.map((item, i) => (
                  <Reveal key={item.title} as="article" className="card card--photo" delay={(i % 3) * 90}>
                    <div className="card__photo">
                      <img src={item.img} alt={item.title} loading="lazy" />
                      <div className="card__ico">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                      </div>
                    </div>
                    <div className="card__body">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ WHY LANGMA ============================ */}
          <section className="section" id="why-langma">
            <div className="blob blob--purple" style={{ width: "380px", height: "380px", top: "10%", right: "-160px" }} aria-hidden="true"></div>
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Why Langma</span>
                <h2 className="display">Why Choose <em>Langma International?</em></h2>
              </Reveal>
              <div className="grid grid-3 section-body">
                {WHY_LANGMA.map((item, i) => (
                  <Reveal key={item.title} as="article" className={`card acc-${i % 6}`} delay={(i % 3) * 90}>
                    <div className="card__ico">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ PATHWAYS (with CTA) ============================ */}
          <section className="section section--sand" id="pathways">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Featured Global Pathways</span>
                <h2 className="display">Opportunities Designed Around <em>Your Goals</em></h2>
              </Reveal>

              <div className="pathway-strip section-body">
                {PATHWAYS.map((item, i) => {
                  const isHash = item.href.startsWith("#");
                  const tileClass =
                    "pathway-tile";
                  const tileStyle = {
                    textDecoration: "none",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    font: "inherit",
                    color: "inherit",
                    width: "100%",
                    display: "block",
                  };
                  const tileInner = (
                    <>
                      <div className="card__ico">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                      </div>
                      <h3>{twoLineTitle(item.title)}</h3>
                      <p>{item.body}</p>
                      <span className="path-link">Learn more →</span>
                    </>
                  );
                  return (
                    <Reveal key={item.title} delay={(i % 6) * 70}>
                      {isHash ? (
                        <a href={item.href} className={tileClass} style={tileStyle}>
                          {tileInner}
                        </a>
                      ) : (
                        <Link to={item.href} className={tileClass} style={tileStyle}>
                          {tileInner}
                        </Link>
                      )}
                    </Reveal>
                  );
                })}
              </div>

              {/* CTA row */}
              <Reveal className="pathway-cta">
                <Link to="/study-abroad" className="btn btn--teal">
                  Explore Study Abroad
                </Link>
                <Link to="/work-abroad" className="btn btn--ghost">
                  Explore Work Abroad
                </Link>
                <button type="button" className="btn" onClick={() => setOpen(true)}>
                  Talk to a Counselor
                </button>
              </Reveal>
            </div>
          </section>

          {/* ============================ CULTURAL & WELLNESS ============================ */}
          <section className="section section--sand" id="cultural-wellness">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Cultural &amp; Wellness Experiences</span>
                <h2 className="display">Beyond Learning. <em>Experience the World.</em></h2>
                <p className="lede" style={{ margin: "12px auto 0" }}>Langma believes global growth comes not only from education and careers but also from meaningful cultural engagement and personal transformation.</p>
              </Reveal>
              <div className="grid grid-3 section-body">
                {CULTURAL_WELLNESS.map((item, i) => (
                  <Reveal key={item.title} as="article" className="card card--photo" delay={(i % 3) * 90}>
                    <div className="card__photo" style={{ aspectRatio: "16/10" }}>
                      <img src={item.img} alt={item.title} loading="lazy" style={{ objectFit: "contain" }} />
                      <div className="card__ico">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                      </div>
                    </div>
                    <div className="card__body">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ TRADE ASSIST ============================ */}
          <section className="section" id="trade-assist">
            <div className="wrap">
              <div className="split" style={{ alignItems: "center" }}>
                <Reveal>
                  <span className="eyebrow">Global Trade Assist Program</span>
                  <h2 className="display">Connecting Businesses to <em>Global Opportunities</em></h2>
                  <p className="lede" style={{ marginTop: "12px" }}>Designed for entrepreneurs, exporters, investors, startups, and business leaders seeking international exposure and growth.</p>
                  <p className="closing-line">Through experiential learning and strategic networking, Langma helps businesses build meaningful global connections.</p>
                  <div className="photo-frame photo-frame--wide" style={{ marginTop: "22px" }}>
                    <img src="/images/Connecting Businesses to Global Opportunities.png" alt="Business leaders connecting to explore global trade opportunities" loading="lazy" />
                  </div>
                </Reveal>
                <Reveal>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "4px" }}>Program Highlights</h3>
                  <ul className="check-list cols-2">
                    {TRADE_HIGHLIGHTS.map((item) => (
                      <li key={item}><Check />{item}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ SUCCESS STORIES ============================ */}
          <section className="section section--sand" id="success-stories">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Success Stories</span>
                <h2 className="display">Transforming Aspirations Into <em>Achievements</em></h2>
                <p className="lede" style={{ margin: "12px auto 0" }}>Across education, careers, business, mobility, and cultural engagement, Langma has helped individuals and organizations unlock new possibilities and achieve meaningful outcomes.</p>
              </Reveal>
              <div className="grid grid-5 section-body">
                {SUCCESS_AUDIENCES.map((item, i) => (
                  <Reveal key={item.title} as="article" className="card audience" delay={i * 70}>
                    <div className="card__ico">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal style={{ textAlign: "center", marginTop: "32px" }}>
                <a href="#insights" className="btn">View Success Stories</a>
              </Reveal>
            </div>
          </section>

          {/* ============================ GLOBAL REACH ============================ */}
          <section className="section" id="global-reach">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Global Reach</span>
                <h2 className="display">Countries We <em>Connect</em></h2>
                <p className="lede" style={{ margin: "12px auto 0" }}>Langma supports opportunities across leading education, career, mobility, and cultural destinations worldwide.</p>
              </Reveal>

              <Reveal className="reach-mosaic section-body">
                {REACH_MOSAIC.map((item) => (
                  <div className="tile" key={item.country}>
                    <img src={item.img} alt={`${item.country} skyline`} loading="lazy" />
                    <span className="name">{item.country}</span>
                  </div>
                ))}
              </Reveal>

              <div className="marquee">
                <div className="marquee__track">
                  {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
                    <span className="pill" key={c + i}>{c}</span>
                  ))}
                </div>
              </div>
              <p className="closing-line" style={{ textAlign: "center", margin: "18px auto 0" }}>And many more emerging global destinations.</p>
            </div>
          </section>

          {/* ============================ INSIGHTS ============================ */}
          <section className="section" id="insights">
            <div className="wrap">
              <Reveal className="head head--center" style={{ margin: "0 auto" }}>
                <span className="eyebrow eyebrow--center">Insights &amp; Resources</span>
                <h2 className="display">Knowledge That Creates <em>Opportunity</em></h2>
                <p className="lede" style={{ margin: "12px auto 0" }}>Stay informed through expert insights, guides, and resources designed to support your global journey.</p>
              </Reveal>
              <Reveal className="pill-row" style={{ justifyContent: "center", marginTop: "20px" }}>
                {RESOURCES.map((r) => (
                  <span className="pill" key={r}>{r}</span>
                ))}
              </Reveal>
            </div>
            <div className="wrap section-body">
              <ContactForm />
            </div>
          </section>
        </main>
      </div>
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
}