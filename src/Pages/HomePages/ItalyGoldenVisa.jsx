import React, { useState, useEffect, useRef } from "react";
import useGoldenVisaConsultationForm from "../../hooks/useGoldenVisaConsultationForm";

/* ============================================================
   ITALY GOLDEN VISA — Langma International
   Content sourced from the Italy Golden Visa page; design system
   (teal / white "navy-gold" luxury-finance palette), layout,
   components and interaction utilities are carried over exactly
   from the Panama Golden Visa React build.
============================================================ */

/* ---------- small reusable bits ---------- */

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

const NAV_LINKS = [
  { href: "#program", label: "The Programme" },
  { href: "#investment", label: "Investment" },
  { href: "#italy", label: "Italy" },
  { href: "#process", label: "Process" },
  { href: "#compare", label: "Compare" },
  { href: "#faq", label: "FAQ" },
];

const BENEFITS = [
  {
    icon: (
      <>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.4 8h-2.9a13.5 13.5 0 00-1.2-5.2A8 8 0 0119.4 10zM12 4c.8 1 1.7 3 1.9 6h-3.8c.2-3 1.1-5 1.9-6zM4.6 12h2.9a13.5 13.5 0 001.2 5.2A8 8 0 014.6 12zm2.9-2H4.6a8 8 0 014.1-5.2A13.5 13.5 0 007.5 10zM12 20c-.8-1-1.7-3-1.9-6h3.8c-.2 3-1.1 5-1.9 6zm3.5-.8A13.5 13.5 0 0016.7 14h2.9a8 8 0 01-4.1 5.2z" />
      </>
    ),
    title: "Schengen freedom",
    body: "Travel across the Schengen Area without visas and remain up to 90 days in any 180-day period — a continent open on your terms.",
  },
  {
    icon: (
      <>
        <path d="M4 21V8l8-5 8 5v13" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
    title: "A European plan B",
    body: "Your investor visa guarantees entry to Italy even when borders tighten. Stay indefinitely if you choose — or not at all. Residency without obligation.",
  },
  {
    icon: (
      <>
        <path d="M12 3v2M12 19v2" />
        <path d="M8 7.5c0-1.3 1.6-2 4-2s4 .9 4 2.3c0 3-8 1.7-8 5S9.6 16.5 12 16.5s4-.9 4-2.3" />
      </>
    ),
    title: "Flat-tax elegance",
    body: "Elect Italian tax residency and replace worldwide income taxation with a flat €300,000 per year — a regime available for up to 15 years.",
  },
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    title: "European banking",
    body: "Open euro, dollar and multi-currency accounts within the EU — for international transfers, savings and wealth structuring.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
      </>
    ),
    title: "Family, together",
    body: "Spouse, children and dependent parents obtain residency under a single application — one investment, security for every generation.",
  },
  {
    icon: <path d="M12 2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 14.24l-4.8 2.52.92-5.34L4.24 7.64l5.36-.78L12 2z" />,
    title: "The EU passport horizon",
    body: "After ten years of residence, Italian citizenship — and with it, the right to live anywhere in the EU and visa-free access to 181+ countries.",
  },
];

const WHY_ITALY = [
  {
    icon: (
      <>
        <path d="M12 2v20M2 12h20" />
      </>
    ),
    title: "An accessible entry point",
    body: "An entry threshold of €250,000 sits among the most accessible in the EU, opening a European golden visa without an outsized commitment.",
  },
  {
    icon: (
      <>
        <path d="M3 12l9-9 9 9M6 10v10h12V10" />
      </>
    ),
    title: "A fast-track route",
    body: "Residency is secured in around four months — quicker than most European alternatives, with a defined sequence at every stage.",
  },
  {
    icon: (
      <>
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    title: "No stay requirement",
    body: "The permit endures for as long as the investment does, whether you settle on Lake Como or continue running your affairs from abroad.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
      </>
    ),
    title: "One application, whole family",
    body: "Spouse, children and dependent parents are covered without any additional qualifying investment required.",
  },
  {
    icon: (
      <>
        <path d="M12 3v2M12 19v2" />
        <path d="M8 7.5c0-1.3 1.6-2 4-2s4 .9 4 2.3c0 3-8 1.7-8 5S9.6 16.5 12 16.5s4-.9 4-2.3" />
      </>
    ),
    title: "An exceptional tax regime",
    body: "An optional flat tax of €300,000 per year on worldwide income is available to new tax residents, for up to fifteen years.",
  },
  {
    icon: <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7z" />,
    title: "A clear path onward",
    body: "Permanent residence after five years, and eligibility for Italian — and therefore EU — citizenship after ten.",
  },
];

const FACTS = [
  { k: "Capital", v: "Rome", s: "Seat of government & history" },
  { k: "Population", v: "≈ 59 Million", s: "Third-largest eurozone economy" },
  { k: "Currency", v: "Euro (€)", s: "Founding EU & eurozone member" },
  { k: "Official Language", v: "Italian", s: "B1 level required for citizenship" },
  { k: "Time Zone", v: "CET · UTC+1", s: "Central European Time" },
  { k: "Government", v: "Republic", s: "Founding NATO & EU member" },
  { k: "Connectivity", v: "30+ Airports", s: "40+ seaports across the country" },
  { k: "Investment Climate", v: "Eurozone Top 3", s: "8th-largest economy worldwide" },
];

const TILES = [
  {
    wide: true,
    tall: true,
    pin: "Icon",
    loc: "Venice, Grand Canal",
    d: "Golden-hour gondolas among historic palazzos",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Venice_canals_sunset.JPG?width=1200",
  },
  { pin: "Coastal", loc: "Cinque Terre", d: "Cliffside colour above the Ligurian Sea" },
  { pin: "Heritage", loc: "Tuscan Hill Towns", d: "Stone streets and vineyard horizons" },
  {
    wide: true,
    pin: "Lakes",
    loc: "Lake Como",
    d: "Alpine villas above turquoise water",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Panoramic%20view%20of%20Varenna%20-%20Lake%20Como.jpg?width=1200",
  },
  { pin: "History", loc: "Pisa", d: "Piazza dei Miracoli at sunrise" },
  { pin: "Capital", loc: "Rome", d: "Millennia of history, lived in daily" },
  { wide: true, pin: "Living", loc: "Milanese Residences", d: "Design-led apartments in Italy's business capital" },
];

const TIMELINE = [
  { n: 1, title: "Confidential pre-check", body: "Our compliance specialists run a private due diligence review using only your passport — surfacing any risk before you commit a single euro." },
  { n: 2, title: "Documents & Nulla Osta application", body: "We assemble, translate and certify your file, open your account on the official programme portal and apply for the Nulla Osta — the certificate confirming no obstacles to your investor visa." },
  { n: 3, title: "Nulla Osta issuance", body: "Your file is forwarded to the Prefettura covering the area where you intend to reside; Italian regulations allow this office up to 90 business days to conclude its review." },
  { n: 4, title: "Consular visa filing", body: "Your Nulla Osta remains valid for six months. Within that window we file your investor visa application at the Italian consulate in your country of residence." },
  { n: 5, title: "Investor visa granted", body: "Consular officers examine the file for you and every family member joining the application. Italian law permits up to 120 days, though most approvals arrive within 10 to 20." },
  { n: 6, title: "Arrival & investment transfer", body: "After entering Italy, you file your residence permit application at the Questura within eight days, then complete the qualifying investment within three months." },
  { n: 7, title: "Residence cards issued", body: "The immigration office examines everything your family has submitted, allowing a further 30 days for any additional paperwork, before issuing a card to each family member." },
  { n: 8, title: "Renewal, effortlessly managed", body: "Your initial card carries a two-year validity and can then be extended for a further three, continuing indefinitely as long as the investment remains in place." },
];

const DOCS = [
  {
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    title: "Valid passport",
    body: "A full copy of your passport, submitted at both the Nulla Osta and consular visa stages.",
  },
  {
    icon: (
      <>
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    title: "Professional standing certificate",
    body: "Documentation confirming your professional experience, filed as part of the Nulla Osta application.",
  },
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    title: "Proof of investment funds",
    body: "Documented evidence that the qualifying funds are available and lawfully sourced.",
  },
  {
    icon: <path d="M12 2v20M6 6h9a3 3 0 010 6H6M6 12h11" />,
    title: "Signed investment declaration",
    body: "A signed commitment to transfer the investment once the visa is granted, submitted with your Nulla Osta file.",
  },
  {
    icon: (
      <>
        <path d="M4 21V8l8-5 8 5v13" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
    title: "Property agreement & proof of income",
    body: "A purchase or rental agreement for residential property in Italy, plus proof of income exceeding €8,500, for the consular stage.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
      </>
    ),
    title: "Passport photographs",
    body: "Recent passport-format photographs for the applicant and each included family member.",
  },
];

const FAMILY = [
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
      </>
    ),
    title: "Spouse",
    body: "Your officially married partner receives residency alongside you, on the same application.",
  },
  {
    icon: (
      <>
        <circle cx="8" cy="9" r="2.6" />
        <circle cx="16" cy="9" r="2.6" />
        <path d="M3 19c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5M13 19c0-2.8 2.2-4.5 5-4.5" />
      </>
    ),
    title: "Children",
    body: "All children under 18 — and adult children who are fully dependent on you for serious health reasons.",
  },
  {
    icon: <path d="M12 21C7 17 4 13 4 9a8 8 0 0116 0c0 4-3 8-8 12z" />,
    title: "Dependent parents",
    body: "Parents who rely on you financially and have no other children in their country of origin, or parents over 65 whose other children cannot support them.",
  },
  {
    icon: <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7z" />,
    title: "Dependents with disabilities",
    body: "Adult children rendered fully dependent through serious, documented health circumstances may still be included.",
  },
];

const COMPARE_ROWS = [
  { label: "Minimum investment", panama: "€250,000+", greece: "€250,000+", portugal: "€250,000+", hungary: "€250,000+", uae: "€300,000+" },
  { label: "Investment options", panama: "Startup shares, company shares, government bonds, or a philanthropic donation", greece: "Real estate, a bank deposit, or investment funds", portugal: "Investment funds or support for qualifying arts and culture projects", hungary: "Regulated fund units or a university-linked contribution", uae: "Real estate" },
  { label: "Typical processing time", panama: "4+ months", greece: "4+ months", portugal: "12+ months", hungary: "5+ months", uae: "9+ months" },
  { label: "Stay requirement", panama: "None required", greece: "None required", portugal: "About 7 days per year on average", hungary: "None required", uae: "Visit at least once every 2 years" },
  { label: "Investment holding period", panama: "For as long as the permit stays active", greece: "For as long as the permit stays active", portugal: "6+ years", hungary: "5 years", uae: "For as long as the permit stays valid" },
  { label: "Residence status granted", panama: "2-year initial permit, renewable for 3 more", greece: "5-year renewable permit", portugal: "2-year initial permit", hungary: "10-year permit", uae: "Unlimited-validity permit" },
  { label: "Path to citizenship", panama: "Potentially eligible after 10 years", greece: "Potentially eligible after 7 years", portugal: "Potentially eligible after 5 years", hungary: "Naturalisation generally considered after roughly 11 years", uae: "Potentially eligible after 8 years" },
];

const FAQS = [
  {
    q: "What is the minimum investment for the Italy Golden Visa?",
    a: "The entry threshold is €250,000, invested in a government-approved innovative Italian startup. The other qualifying routes are €500,000 or more in an established Italian company, €1,000,000 or more as a philanthropic donation, or €2,000,000 or more in Italian government bonds. Routes cannot be combined.",
  },
  {
    q: "Can I obtain Italian residency by purchasing property?",
    a: "No. Real estate does not qualify under the investor programme, however beautiful the villa. You may certainly own property in Italy — a purchase or rental agreement forms part of your visa file — but the qualifying investment must be a startup, company, donation, or bond route.",
  },
  {
    q: "How long does the process take?",
    a: "Around four months or more from start to residence card. The Nulla Osta certificate takes up to 90 business days; consular visas are typically approved within 10 to 20 days despite a legal maximum of 120; and the residence permit is issued after your arrival in Italy.",
  },
  {
    q: "Do I need to live in Italy to keep my residency?",
    a: "No. Italy imposes no minimum stay to keep the investor residence permit itself. Reaching permanent residence at 5 years or citizenship at 10 years, however, requires continuous legal residence in the country.",
  },
  {
    q: "When do I actually transfer the investment?",
    a: "Only after your visa is granted and you have entered Italy — you then have three months to complete the transfer. Before that point, you need only demonstrate the funds exist and originate lawfully.",
  },
  {
    q: "Which family members can join my application?",
    a: "Your spouse, children under 18, adult children rendered fully dependent by a serious health condition, and parents who rely on you financially may all be included.",
  },
  {
    q: "How does renewal work?",
    a: "Your first permit is valid for two years and renews for a further three, indefinitely, as long as the investment is held. Renewal applications are filed at least 60 days before expiry.",
  },
  {
    q: "Does the Golden Visa lead to permanent residence or citizenship?",
    a: "Both. After five years of continuous legal residence you may qualify for permanent residence, no longer tied to the investment. After ten years, citizenship becomes available, subject to a B1 Italian language test and demonstrated integration.",
  },
  {
    q: "Must I travel to Italy to apply?",
    a: "Not initially. The Nulla Osta is filed online and the visa through the Italian consulate in your home country. Physical presence is required only after the visa is granted, when you enter Italy and file at the Questura within eight days.",
  },
  {
    q: "What are the tax implications of Italian residency?",
    a: "Holding the permit alone does not make you an Italian taxpayer. Tax residents may elect a flat €300,000 per year on worldwide foreign income, plus €50,000 per family member, for up to 15 years. Standard progressive rates otherwise range from 23% to 43%.",
  },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TIMES = ["10:30", "12:00", "14:30", "16:00", "17:30"];

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function ItalyGoldenVisa() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const faqRefs = useRef({});

  const today = useRef(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }).current();

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const formRef = useRef(null);
  const { handleSubmit: submitConsultation, loading, submitted, doneText, errorMsg } =
    useGoldenVisaConsultationForm("Italy Investor Visa", { leadType: "Golden Visa Consultation" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevDisabled = view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  const firstDow = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const confirmed = selectedDate && selectedTime;
  let confirmText = "";
  if (confirmed) {
    const opts = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    confirmText = `Reserved: ${selectedDate.toLocaleDateString("en-GB", opts)} at ${selectedTime} IST`;
  }

  return (
    <>
      <style>{`
/* ============================================================
   DESIGN TOKENS
   Palette: teal (#0A6B64) on white — a clean, light, single-accent
   system. Teal carries headings, links, icons and button fills;
   surfaces stay white or a faint teal-tinted off-white. No dark
   "navy" sections remain — variable names are kept for structural
   compatibility across the stylesheet, but every value below now
   resolves to a white/light surface or a teal accent.
============================================================ */
:root{
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

.pgv *,.pgv *::before,.pgv *::after{box-sizing:border-box;}
.pgv{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
.pgv{
  margin:0;
  font-family:var(--sans);
  color:var(--ink);
  background:var(--ivory);
  font-size:17px;
  line-height:1.7;
  font-weight:400;
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  overflow-x:hidden;
}
.pgv img{max-width:100%;display:block;}
.pgv a{color:inherit;text-decoration:none;}
.pgv h1,.pgv h2,.pgv h3,.pgv h4{font-family:var(--serif);font-weight:600;line-height:1.08;letter-spacing:.2px;color:var(--navy);margin:0;}
.pgv p{margin:0 0 1.1em;}
.pgv ::selection{background:var(--gold);color:var(--navy);}

/* skip link — visually hidden until keyboard focus */
.skip-link{
  position:absolute;left:-999px;top:auto;width:1px;height:1px;overflow:hidden;
  background:var(--navy);color:var(--ivory);padding:14px 22px;border-radius:4px;
  font-family:var(--sans);font-weight:600;font-size:14px;z-index:1000;
}
.skip-link:focus{left:16px;top:16px;width:auto;height:auto;outline:2px solid var(--gold);}

/* ---------- shared layout ---------- */
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
.section{padding:clamp(64px,9vw,128px) 0;position:relative;}
.section--tight{padding:clamp(52px,7vw,96px) 0;}
.section--navy{background:var(--white);color:var(--ink);}
.section--sand{background:var(--sand);}

/* eyebrow — the recurring signature label */
.eyebrow{
  display:inline-flex;align-items:center;gap:12px;
  font-family:var(--sans);font-size:12px;font-weight:600;
  letter-spacing:.32em;text-transform:uppercase;color:var(--gold-deep);
  margin:0 0 22px;
}
.eyebrow::before{content:"";width:34px;height:1px;background:var(--gold);}

.eyebrow--center{justify-content:center;}

.display{
  font-size:clamp(2.3rem,5.4vw,4.15rem);
  font-weight:600;letter-spacing:-.5px;line-height:1.03;
}
.lede{
  font-size:clamp(1.05rem,1.7vw,1.28rem);
  color:var(--muted);max-width:60ch;line-height:1.65;font-weight:400;
}

.head{max-width:760px;}
.head--center{max-width:760px;margin:0 auto;text-align:center;}

/* buttons */
.btn{
  --bg:var(--navy);--fg:#fff;
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  font-family:var(--sans);font-weight:600;font-size:14.5px;letter-spacing:.04em;
  padding:16px 30px;border-radius:var(--radius);border:1px solid transparent;
  background:var(--bg);color:var(--fg);cursor:pointer;
  transition:transform .35s var(--ease), box-shadow .35s var(--ease), background .3s var(--ease), color .3s var(--ease);
  will-change:transform;
}
.btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px -14px rgba(10,107,100,.4);}
.btn:focus-visible{outline:2px solid var(--gold);outline-offset:3px;}
.btn--ghost{background:transparent;color:var(--navy);border-color:var(--sand-line);}
.btn--ghost:hover{background:rgba(10,107,100,.06);box-shadow:none;color:var(--navy);border-color:var(--navy);}
.btn--dark{background:var(--navy-900);color:#fff;}
.btn--dark:hover{background:var(--navy-800);box-shadow:0 16px 30px -16px rgba(10,107,100,.4);}
.btn--wide{width:100%;}

/* ============================================================
   HEADER
============================================================ */
.header{
  position:fixed;top:0;left:0;right:0;z-index:60;
  transition:background .4s var(--ease), box-shadow .4s var(--ease), padding .4s var(--ease);
  padding:20px 0;
}
.header::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--sand-line);}
.header.scrolled{background:rgba(255,255,255,.96);backdrop-filter:blur(12px);padding:12px 0;box-shadow:0 10px 30px -20px rgba(10,107,100,.18);}
.header.scrolled::after{background:var(--sand-line);}
.nav{display:flex;align-items:center;justify-content:space-between;gap:24px;}
.brand{display:flex;align-items:center;gap:13px;color:var(--ink);}
.brand__mark{
  width:40px;height:40px;border:1px solid var(--gold);border-radius:50%;
  display:grid;place-items:center;font-family:var(--serif);font-weight:700;
  font-size:20px;color:var(--navy);flex:none;
}
.brand__name{font-family:var(--serif);font-size:20px;font-weight:600;letter-spacing:.5px;line-height:1;}
.brand__tag{display:block;font-family:var(--sans);font-size:9.5px;letter-spacing:.34em;text-transform:uppercase;color:var(--navy);margin-top:4px;font-weight:600;}
.nav__links{display:flex;align-items:center;gap:30px;list-style:none;margin:0;padding:0;}
.nav__links a{
  color:var(--ink);font-size:14px;font-weight:500;letter-spacing:.02em;
  position:relative;padding:4px 0;transition:color .3s var(--ease);
}
.nav__links a::after{content:"";position:absolute;left:0;bottom:-2px;width:0;height:1px;background:var(--gold);transition:width .35s var(--ease);}
.nav__links a:hover{color:var(--navy);}
.nav__links a:hover::after{width:100%;}
.nav__cta{display:flex;align-items:center;gap:14px;}
.nav__phone{color:var(--navy);font-size:14px;font-weight:600;letter-spacing:.02em;white-space:nowrap;}
.burger{display:none;flex-direction:column;gap:5px;background:none;border:0;cursor:pointer;padding:8px;}
.burger span{width:24px;height:2px;background:var(--ink);transition:.3s var(--ease);display:block;}

/* ============================================================
   HERO
============================================================ */
.hero{
  position:relative;min-height:100vh;display:flex;align-items:center;
  background:
    radial-gradient(120% 90% at 78% 8%, rgba(10,107,100,.08), transparent 55%),
    var(--white);
  color:var(--ink);overflow:hidden;padding:140px 0 60px;
}
.hero__skyline{position:absolute;left:0;right:0;bottom:0;z-index:0;width:100%;height:clamp(70px,14vw,190px);opacity:.55;pointer-events:none;}
.hero__glow{position:absolute;top:-20%;right:-10%;width:60vw;height:60vw;max-width:720px;max-height:720px;
  background:radial-gradient(circle, rgba(10,107,100,.09), transparent 62%);filter:blur(10px);pointer-events:none;}
.hero__grid{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center;}
.hero h1{font-size:clamp(2.7rem,6.4vw,5.1rem);font-weight:600;line-height:1.0;letter-spacing:-1px;color:var(--ink);margin-bottom:24px;}
.hero h1 em{font-style:italic;color:var(--navy);font-weight:500;}
.hero__sub{font-size:clamp(1.05rem,1.6vw,1.24rem);color:var(--muted);max-width:52ch;margin-bottom:36px;line-height:1.6;}
.hero__actions{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:44px;}
.hero__stats{
  position:relative;z-index:5;isolation:isolate;
  display:flex;gap:0;flex-wrap:wrap;
  background:var(--white);box-shadow:var(--shadow-sm);
  border:1px solid var(--sand-line);border-radius:8px;
  padding:22px clamp(18px,3vw,28px);
}
.stat{flex:1 1 140px;padding:6px 22px;border-left:1px solid var(--sand-line);}
.stat:first-child{border-left:0;padding-left:0;}
.stat__num{font-family:var(--serif);font-size:clamp(1.7rem,2.6vw,2.5rem);font-weight:600;color:var(--navy);line-height:1;white-space:nowrap;}
.stat__label{font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:8px;font-weight:600;line-height:1.4;}

.hero__media{position:relative;z-index:2;border:1px solid var(--sand-line);border-radius:8px;padding:10px;background:var(--white);box-shadow:var(--shadow-lg);}
.hero__media-frame{position:relative;border-radius:4px;overflow:hidden;aspect-ratio:4/5;}
.hero__media-frame img{width:100%;height:100%;object-fit:cover;display:block;}
.hero__media-frame::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg, rgba(8,21,39,0) 55%, rgba(8,21,39,.6) 100%);pointer-events:none;}
.hero__media-tag{
  position:absolute;left:18px;bottom:18px;z-index:2;
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(255,255,255,.92);border:1px solid var(--sand-line);border-radius:100px;
  padding:9px 18px;font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--navy);
  backdrop-filter:blur(6px);
}
/* ============================================================
   GENERIC CARD GRIDS
============================================================ */
.grid{display:grid;gap:24px;}
.grid-2{grid-template-columns:repeat(2,1fr);}
.grid-3{grid-template-columns:repeat(3,1fr);}
.grid-4{grid-template-columns:repeat(4,1fr);}

.card{
  background:var(--white);border:1px solid var(--sand-line);border-radius:6px;
  padding:34px 30px;box-shadow:var(--shadow-sm);
  transition:transform .4s var(--ease), box-shadow .4s var(--ease), border-color .4s var(--ease);
}
.card:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);border-color:var(--gold);}
.card__ico{
  width:52px;height:52px;border-radius:50%;display:grid;place-items:center;margin-bottom:22px;
  background:linear-gradient(150deg,var(--navy),var(--navy-800));color:var(--gold-soft);
}
.card h3{font-size:1.5rem;margin-bottom:12px;}
.card p{color:var(--muted);font-size:15.5px;margin-bottom:0;line-height:1.62;}

/* ============================================================
   PROGRAM OVERVIEW (split)
============================================================ */
.split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,88px);align-items:center;}
.split__panel{
  background:var(--sand);
  border:1px solid var(--sand-line);
  border-radius:8px;padding:48px 44px;color:var(--ink);position:relative;overflow:hidden;
  box-shadow:var(--shadow-sm);
}
.split__panel::after{content:"";position:absolute;inset:0;background:
  radial-gradient(120% 80% at 90% 0%, rgba(10,107,100,.06), transparent 55%);pointer-events:none;}
.factline{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--sand-line);position:relative;z-index:1;}
.factline:last-child{border-bottom:0;}
.factline__n{font-family:var(--serif);color:var(--navy);font-size:1.4rem;line-height:1.2;flex:none;width:38px;}
.factline__t{font-weight:600;color:var(--ink);margin-bottom:2px;font-size:15.5px;}
.factline__d{color:var(--muted);font-size:14px;line-height:1.55;}

/* ============================================================
   INVESTMENT ROUTES
============================================================ */
.route{
  background:var(--white);border:1px solid var(--sand-line);border-radius:8px;
  padding:38px 32px;position:relative;box-shadow:var(--shadow-sm);
  transition:transform .4s var(--ease), box-shadow .4s var(--ease), border-color .4s var(--ease);
  display:flex;flex-direction:column;
}
.route:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:var(--gold);}
.route--featured{border-color:var(--gold);box-shadow:var(--shadow-md);}
.route__tag{
  position:absolute;top:-13px;left:32px;background:var(--gold);color:#fff;
  font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  padding:6px 14px;border-radius:3px;
}
.route__label{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-deep);font-weight:700;margin-bottom:14px;}
.route__amt{font-family:var(--serif);font-size:2.9rem;font-weight:600;color:var(--navy);line-height:1;}
.route__amt small{font-size:1rem;font-family:var(--sans);color:var(--muted);font-weight:500;display:block;margin-top:8px;letter-spacing:.02em;}
.route__list{list-style:none;margin:24px 0 26px;padding:0;flex:1;}
.route__list li{display:flex;gap:12px;padding:9px 0;font-size:15px;color:var(--ink);border-bottom:1px dashed var(--sand-line);}
.route__list li:last-child{border-bottom:0;}
.route__list svg{flex:none;color:var(--gold-deep);margin-top:4px;}

/* ============================================================
   COUNTRY OVERVIEW — FACT CARDS
============================================================ */
.facts{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--sand-line);border:1px solid var(--sand-line);border-radius:8px;overflow:hidden;}
.fact{background:var(--white);padding:30px 26px;transition:background .4s var(--ease);}
.fact:hover{background:var(--ivory);}
.fact__k{font-size:11.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-deep);font-weight:700;margin-bottom:10px;}
.fact__v{font-family:var(--serif);font-size:1.7rem;font-weight:600;color:var(--navy);line-height:1.15;}
.fact__s{font-size:13px;color:var(--muted);margin-top:6px;}

/* ============================================================
   TIMELINE
============================================================ */
.timeline{position:relative;max-width:820px;margin:0 auto;padding-left:8px;}
.timeline::before{content:"";position:absolute;left:32px;top:8px;bottom:8px;width:1px;background:linear-gradient(var(--gold),rgba(10,107,100,.15));}
.tl-step{position:relative;padding:0 0 40px 82px;}
.tl-step:last-child{padding-bottom:0;}
.tl-step__n{
  position:absolute;left:8px;top:-6px;width:50px;height:50px;border-radius:50%;
  background:var(--white);border:1px solid var(--gold);display:grid;place-items:center;
  font-family:var(--serif);font-size:1.35rem;font-weight:600;color:var(--gold-deep);z-index:1;
}

.tl-step h3{font-size:1.45rem;margin-bottom:6px;}
.tl-step p{color:var(--muted);font-size:15px;margin:0;}


/* ============================================================
   DOCUMENTS / SIMPLE LISTS
============================================================ */
.doc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.doc{display:flex;gap:16px;align-items:flex-start;background:var(--white);border:1px solid var(--sand-line);border-radius:6px;padding:22px 24px;transition:border-color .3s var(--ease);}
.doc:hover{border-color:var(--gold);}
.doc__ico{width:38px;height:38px;border-radius:50%;background:var(--sand);color:var(--gold-deep);display:grid;place-items:center;flex:none;}
.doc h4{font-family:var(--sans);font-size:15.5px;font-weight:700;color:var(--navy);margin-bottom:3px;}
.doc p{font-size:13.5px;color:var(--muted);margin:0;line-height:1.5;}

/* family cards */
.fam{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.fam__c{text-align:center;padding:34px 22px;background:var(--white);border:1px solid var(--sand-line);border-radius:8px;transition:transform .4s var(--ease), box-shadow .4s var(--ease);}
.fam__c:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);}
.fam__ico{width:58px;height:58px;margin:0 auto 18px;border-radius:50%;background:linear-gradient(150deg,var(--navy),var(--navy-800));color:var(--gold-soft);display:grid;place-items:center;}
.fam__c h4{font-family:var(--serif);font-size:1.35rem;margin-bottom:8px;}
.fam__c p{font-size:14px;color:var(--muted);margin:0;}

/* ============================================================
   LIFE IN ITALY — DUOTONE MOSAIC
============================================================ */
.mosaic{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:210px;gap:16px;}
.tile{
  position:relative;border-radius:8px;overflow:hidden;color:var(--ivory);
  display:flex;align-items:flex-end;padding:26px;
  background:linear-gradient(150deg,var(--navy-700),var(--navy-900));
  box-shadow:var(--shadow-sm);isolation:isolate;
  transition:transform .5s var(--ease);
}
.tile::before{content:"";position:absolute;inset:0;background:
  radial-gradient(120% 90% at 20% 0%, rgba(255,255,255,.12), transparent 60%);z-index:-1;}
.tile::after{content:"";position:absolute;inset:0;border:1px solid rgba(255,255,255,.16);border-radius:8px;pointer-events:none;}
.tile:hover{transform:scale(1.015);}
.tile--wide{grid-column:span 2;}
.tile--tall{grid-row:span 2;}
.tile__loc{font-family:var(--serif);font-size:1.5rem;font-weight:600;line-height:1.1;}
.tile__d{font-size:12.5px;color:rgba(248,245,238,.72);margin-top:4px;letter-spacing:.02em;}
.tile__pin{position:absolute;top:20px;left:22px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-soft);font-weight:700;}

/* ============================================================
   WHY LANGMA — STAT PANEL
============================================================ */
.langma__stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--sand-line);border-radius:8px;overflow:hidden;margin-top:44px;box-shadow:var(--shadow-sm);}
.langma__stat{background:var(--white);padding:20px 14px;text-align:center;min-width:0;container-type:inline-size;}
.langma__stat .n{font-family:var(--serif);font-size:1.9rem;font-weight:600;color:var(--navy);line-height:1.1;white-space:nowrap;}
.langma__stat .l{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-top:10px;font-weight:600;line-height:1.4;}
@container (min-width:210px){
  .langma__stat{padding:34px 26px;}
  .langma__stat .n{font-size:2.5rem;}
  .langma__stat .l{font-size:12.5px;letter-spacing:.1em;}
}
@container (max-width:120px){
  .langma__stat .n{font-size:1.5rem;}
}
@container (max-width:90px){
  .langma__stat .n{font-size:1.2rem;}
}
.pill-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px;}
.pill{border:1px solid var(--sand-line);background:var(--sand);border-radius:100px;padding:9px 20px;font-size:13.5px;color:var(--ink);font-weight:500;}

/* ============================================================
   PROGRAMME COMPARISON TABLE
============================================================ */
.compare-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--sand-line);border-radius:10px;box-shadow:var(--shadow-sm);}
.compare{width:100%;border-collapse:collapse;min-width:760px;background:var(--white);}
.compare caption{caption-side:bottom;text-align:left;font-size:12.5px;color:var(--muted-2);padding:14px 20px;}
.compare th,.compare td{padding:18px 20px;text-align:left;font-size:14.5px;border-bottom:1px solid var(--sand-line);}
.compare thead th{
  background:var(--navy);color:var(--ivory);font-family:var(--sans);font-weight:700;
  font-size:12px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;
}
.compare thead th.hl{background:var(--navy-900);}
.compare tbody th{font-weight:700;color:var(--navy);font-size:13.5px;background:var(--ivory);white-space:nowrap;}
.compare tbody td.hl{background:rgba(10,107,100,.07);font-weight:700;color:var(--navy);}
.compare tbody tr:last-child th,.compare tbody tr:last-child td{border-bottom:0;}
.compare tbody tr:hover td,.compare tbody tr:hover th{background:rgba(10,107,100,.05);}

/* ============================================================
   FAQ
============================================================ */
.faq{max-width:840px;margin:0 auto;}
.faq__item{border-bottom:1px solid var(--sand-line);}
.faq__q{
  width:100%;text-align:left;background:none;border:0;cursor:pointer;
  display:flex;justify-content:space-between;align-items:center;gap:20px;
  padding:26px 4px;font-family:var(--serif);font-size:1.35rem;font-weight:600;color:var(--navy);
}
.faq__q:focus-visible{outline:2px solid var(--gold);outline-offset:2px;}
.faq__ico{flex:none;width:26px;height:26px;position:relative;transition:transform .4s var(--ease);}
.faq__ico::before,.faq__ico::after{content:"";position:absolute;background:var(--gold-deep);border-radius:2px;}
.faq__ico::before{top:12px;left:2px;right:2px;height:2px;}
.faq__ico::after{left:12px;top:2px;bottom:2px;width:2px;transition:transform .4s var(--ease);}
.faq__item.open .faq__ico::after{transform:scaleY(0);}
.faq__a{max-height:0;overflow:hidden;transition:max-height .5s var(--ease);}
.faq__a-inner{padding:0 4px 28px;color:var(--muted);font-size:16px;line-height:1.7;max-width:70ch;}

/* ============================================================
   CONSULTATION — CALENDAR + FORM + OFFICE
============================================================ */
.book{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(32px,5vw,60px);align-items:start;}
.panel{background:var(--white);border:1px solid var(--sand-line);border-radius:10px;padding:clamp(28px,3.5vw,42px);box-shadow:var(--shadow-md);}
.panel h3{font-size:1.7rem;margin-bottom:6px;}
.panel__sub{color:var(--muted);font-size:14.5px;margin-bottom:26px;}

/* calendar */
.cal__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
.cal__title{font-family:var(--serif);font-size:1.35rem;font-weight:600;color:var(--navy);}
.cal__nav{display:flex;gap:8px;}
.cal__btn{width:38px;height:38px;border-radius:50%;border:1px solid var(--sand-line);background:var(--white);cursor:pointer;display:grid;place-items:center;color:var(--navy);transition:.25s var(--ease);}
.cal__btn:hover:not(:disabled){background:var(--navy);color:var(--gold-soft);border-color:var(--navy);}
.cal__btn:disabled{opacity:.35;cursor:not-allowed;}
.cal__dow{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px;}
.cal__dow span{text-align:center;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted-2);font-weight:700;}
.cal__grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;}
.cal__day{
  aspect-ratio:1;border:1px solid transparent;border-radius:6px;background:var(--ivory);
  font-family:var(--sans);font-size:15px;color:var(--ink);cursor:pointer;
  display:grid;place-items:center;transition:.2s var(--ease);position:relative;
}
.cal__day:hover:not(:disabled){border-color:var(--gold);background:#fff;}
.cal__day:disabled{color:var(--muted-2);opacity:.4;cursor:not-allowed;background:transparent;}
.cal__day.available::after{content:"";position:absolute;bottom:7px;width:5px;height:5px;border-radius:50%;background:var(--gold);}
.cal__day.selected{background:var(--navy);color:var(--gold-soft);border-color:var(--navy);}
.cal__day.selected::after{background:var(--gold-soft);}
.cal__day.empty{background:transparent;border:0;cursor:default;}

.slots{margin-top:24px;}
.slots__label{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-deep);font-weight:700;margin-bottom:14px;}
.slots__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.slot{padding:12px 8px;border:1px solid var(--sand-line);border-radius:6px;background:var(--white);cursor:pointer;font-size:14px;font-weight:600;color:var(--navy);transition:.2s var(--ease);text-align:center;}
.slot:hover{border-color:var(--gold);}
.slot.selected{background:var(--gold);border-color:var(--gold);color:#fff;}
.cal__confirm{margin-top:22px;padding:18px 20px;border-radius:8px;background:var(--navy);color:var(--ivory);display:none;align-items:center;gap:14px;}
.cal__confirm.show{display:flex;}
.cal__confirm svg{flex:none;color:var(--gold-soft);}
.cal__confirm b{color:var(--gold-soft);}
.cal__hint{font-size:12.5px;color:var(--muted);margin-top:14px;}

/* form */
.field{margin-bottom:16px;}
.field label{display:block;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:7px;}
.field input,.field select,.field textarea{
  width:100%;padding:14px 15px;border:1px solid var(--sand-line);border-radius:6px;background:var(--ivory);
  font-family:var(--sans);font-size:15px;color:var(--ink);transition:.25s var(--ease);
}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--gold);background:#fff;box-shadow:0 0 0 3px rgba(10,107,100,.14);}
.field textarea{resize:vertical;min-height:96px;}
.field-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.consent{display:flex;gap:11px;align-items:flex-start;font-size:12.5px;color:var(--muted);margin:6px 0 20px;line-height:1.5;}
.consent input{width:17px;height:17px;flex:none;margin-top:2px;accent-color:var(--gold-deep);}
.form-done{display:none;text-align:center;padding:30px 10px;}
.form-done.show{display:block;}
.form-done .ok{width:64px;height:64px;margin:0 auto 18px;border-radius:50%;background:var(--navy);color:var(--gold-soft);display:grid;place-items:center;}
.form-done h4{font-family:var(--serif);font-size:1.6rem;margin-bottom:8px;}
.form-done p{color:var(--muted);font-size:15px;}

/* office visit */
.office{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px;}
.office__c{background:var(--sand);border:1px solid var(--sand-line);border-radius:8px;padding:30px 28px;}
.office__c .k{font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--navy);font-weight:700;margin-bottom:12px;}
.office__c .v{color:var(--ink);font-size:16px;line-height:1.6;}
.office__c a{color:var(--navy);}

/* ============================================================
   DISCLAIMER
============================================================ */
.disclaimer{background:var(--sand);border-left:3px solid var(--gold);border-radius:4px;padding:26px 30px;font-size:14px;color:var(--muted);line-height:1.65;max-width:960px;margin:44px auto 0;}
.disclaimer strong{color:var(--navy);font-weight:700;}

/* ============================================================
   FOOTER
============================================================ */
.footer{background:var(--sand);color:var(--muted);padding:72px 0 32px;border-top:1px solid var(--sand-line);}
.footer__grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:40px;padding-bottom:48px;border-bottom:1px solid var(--sand-line);}
.footer h4{font-family:var(--sans);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--navy);margin-bottom:20px;font-weight:700;}
.footer ul{list-style:none;margin:0;padding:0;}
.footer li{margin-bottom:11px;}
.footer a{font-size:14.5px;color:var(--muted);transition:color .25s var(--ease);}
.footer a:hover{color:var(--navy);}
.footer__brand .brand__name{color:var(--ink);}
.footer__brand p{font-size:14px;color:var(--muted);max-width:34ch;margin:18px 0 0;line-height:1.65;}
.socials{display:flex;gap:12px;margin-top:22px;}
.socials a{width:38px;height:38px;border:1px solid var(--sand-line);border-radius:50%;display:grid;place-items:center;color:var(--navy);transition:.25s var(--ease);}
.socials a:hover{background:var(--gold);color:#fff;border-color:var(--gold);}
.footer__bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;padding-top:26px;font-size:13px;color:var(--muted-2);}
.footer__bottom a{color:var(--muted);}

/* ============================================================
   REVEAL ANIMATION (+ hover/press micro-interactions from index.css)
============================================================ */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .8s var(--ease), transform .8s var(--ease);}
.reveal.in{opacity:1;transform:none;}

.hover-card{transition:box-shadow .3s ease, transform .3s ease;}
.hover-card:hover{box-shadow:0 16px 40px rgba(0,0,0,.12);transform:translateY(-4px);}

.btn-animated{position:relative;overflow:hidden;transition:color .3s ease, background-color .3s ease, transform .2s ease, box-shadow .3s ease;}
.btn-animated:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.15);}
.btn-animated:active{transform:translateY(0);}

.stats-card-shimmer{position:relative;overflow:hidden;}
.stats-card-shimmer::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(105deg, transparent 40%, rgba(10,107,100,.10) 50%, transparent 60%);
  transform:translateX(-100%);transition:transform 0s;
}
.stats-card-shimmer:hover::after{transform:translateX(200%);transition:transform .7s ease;}

/* ============================================================
   RESPONSIVE
============================================================ */
/* ============================================================
   RESPONSIVE
   Tiers: 1024 (small laptop/tablet-landscape), 860 (nav collapse),
   768 (tablet-portrait), 640 (large phone), 480 (phone), 380 (small phone).
============================================================ */

/* ---- helper: header CTA short label, hidden by default ---- */
.header-cta{white-space:nowrap;}
.header-cta .cta-short{display:none;}

/* ---- 1024px: small laptop / tablet landscape ---- */
@media (max-width:1024px){
  .grid-3{grid-template-columns:repeat(2,1fr);}
  .grid-4{grid-template-columns:repeat(2,1fr);}
  .facts{grid-template-columns:repeat(2,1fr);}
  .langma__stats{grid-template-columns:repeat(2,1fr);}
  .fam{grid-template-columns:repeat(2,1fr);}
  .office{grid-template-columns:1fr;}
  .mosaic{grid-template-columns:repeat(2,1fr);grid-auto-rows:190px;}
  .hero__grid{gap:40px;}
  .split{gap:40px;}
  .book{gap:32px;}
}

/* ---- 900px: header collapses to burger menu ---- */
@media (max-width:900px){
  .nav__links,.nav__phone{display:none;}
  .burger{display:flex;}
  .nav__links.open{
    display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;
    background:rgba(255,255,255,.98);backdrop-filter:blur(12px);padding:26px var(--gutter);gap:18px;
    border-top:1px solid var(--sand-line);box-shadow:var(--shadow-md);
  }
  .hero__grid,.split,.book{grid-template-columns:1fr;}
  .hero__media{margin-top:8px;max-width:420px;}
  .doc-grid{grid-template-columns:1fr;}
}

/* ---- 768px: tablet portrait ---- */
@media (max-width:768px){
  .grid-3,.grid-2{grid-template-columns:1fr;}
  .facts{grid-template-columns:repeat(2,1fr);}
  .compare th,.compare td{padding:14px 16px;font-size:13.5px;}
  .office{gap:18px;}
  .book{gap:26px;}
}

/* ---- 640px: large phones / small tablets ---- */
@media (max-width:640px){
  .grid-4,.langma__stats,.fam,.mosaic{grid-template-columns:1fr;}
  .facts{grid-template-columns:1fr;}
  .mosaic{grid-auto-rows:170px;}
  .tile--wide,.tile--tall{grid-column:auto;grid-row:auto;}
  .hero__stats{flex-direction:column;padding:18px 20px;}
  .stat{border-left:0;border-top:1px solid var(--sand-line);padding:14px 0 0;}
  .stat:first-child{border-top:0;padding-top:0;}
  .stat__num{font-size:2.1rem;}
  .timeline::before{left:24px;}
  .tl-step{padding-left:66px;}
  .tl-step__n{width:42px;height:42px;font-size:1.1rem;}
  .brand__tag{display:none;}
  .brand__name{font-size:17px;}
  .brand__mark{width:34px;height:34px;font-size:17px;}
  .header-cta{padding:12px 18px;font-size:13.5px;}
}

/* ---- 480px: phones ---- */
@media (max-width:480px){
  .pgv{font-size:16px;}
  .section{padding:52px 0;}
  .section--tight{padding:40px 0;}
  .hero{padding:120px 0 48px;}
  .field-2,.slots__grid{grid-template-columns:1fr;}
  .doc{flex-direction:column;}
  .split__panel{padding:32px 24px;}
  .panel{padding:26px 20px;}
  .route,.card{padding:28px 22px;}
  .compare th,.compare td{padding:12px 14px;font-size:13px;}
  .header-cta .cta-full{display:none;}
  .header-cta .cta-short{display:inline;}
  .header-cta{padding:11px 16px;}
  .cal__grid{gap:4px;}
  .cal__day{font-size:13.5px;}
}

/* ---- 380px: small phones (SE, older Android) ---- */
@media (max-width:380px){
  .wrap{padding:0 16px;}
  .brand__name{font-size:15.5px;}
  .brand__mark{width:30px;height:30px;font-size:15px;}
  .header-cta{padding:9px 13px;font-size:12.5px;}
  .nav__cta{gap:8px;}
  .hero__actions .btn{width:100%;}
  .fam,.langma__stats{grid-template-columns:1fr;}
  .cal__dow span{font-size:9.5px;}
  .slots__grid{grid-template-columns:1fr;}
}

@media (prefers-reduced-motion:reduce){
  .pgv *{animation:none !important;transition-duration:.01ms !important;scroll-behavior:auto !important;}
  .reveal{opacity:1;transform:none;}
}
      `}</style>

      <div className="pgv">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <main id="main-content">
          {/* ============================ HERO ============================ */}
          <section className="hero" id="top">
            <div className="hero__glow" aria-hidden="true"></div>
            <div className="wrap">
              <div className="hero__grid">
                <div className="hero__copy">
                  <span className="eyebrow hero__eyebrow">Italy · Residence by Investment</span>
                  <h1>The Italy <em>Golden&nbsp;Visa</em>, handled with mastery.</h1>
                  <p className="hero__sub">European residency for you and your family from a €250,000 investment — with no obligation to relocate, Schengen freedom of movement, and a defined pathway to permanent residence and EU citizenship. Langma International manages every step, discreetly and precisely.</p>
                  <div className="hero__actions">
                    <a href="#book" className="btn btn-animated">Request a Private Consultation</a>
                    <a href="#program" className="btn btn--ghost btn-animated">Explore the Programme</a>
                  </div>
                  <div className="hero__stats">
                    <div className="stat">
                      <div className="stat__num">€250K+</div>
                      <div className="stat__label">Investment From</div>
                    </div>
                    <div className="stat">
                      <div className="stat__num">4+ Mo.</div>
                      <div className="stat__label">Investment to Residency</div>
                    </div>
                    <div className="stat">
                      <div className="stat__num">5 Yrs</div>
                      <div className="stat__label">To Permanent Residence</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "11.5px", color: "var(--muted-2)", margin: "12px 0 0" }}>
                    The Investor Visa for Italy was established in 2017; terms are set by Italian law and may change.
                  </p>
                </div>

                <div className="hero__media">
                  <div className="hero__media-frame">
                    <img
                      src="https://commons.wikimedia.org/wiki/Special:FilePath/Venice_canals_sunset.JPG?width=1200"
                      alt="Golden-hour view of Venice's Grand Canal with a gondola gliding past historic Italian palazzos"
                      width="1200"
                      height="1500"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <span className="hero__media-tag">Venice · Italy</span>
                  </div>
                </div>
              </div>
            </div>

            <svg className="hero__skyline" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="1" stopColor="#EAF5F4" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="1440" height="220" fill="url(#sky)" />
              <g fill="none" stroke="#0A6B64" strokeOpacity="0.28" strokeWidth="1.4">
                <path d="M0 210 H120 V150 H150 V120 H175 V150 H210 V90 H240 V60 L255 44 L270 60 V150 H300 V170 H340 V110 H365 V80 H388 V110 H420 V200 H470 V130 H495 V95 H520 V130 H560 V210" />
                <path d="M560 210 V120 H590 V70 L605 52 L620 70 V120 H655 V160 H690 V100 H716 V70 H740 V100 H775 V180 H820 V130 H848 V96 H872 V130 H910 V210" />
                <path d="M910 210 V150 H945 V110 H970 V150 H1010 V80 H1035 V50 L1050 34 L1065 50 V150 H1100 V175 H1140 V120 H1165 V90 H1188 V120 H1220 V200 H1270 V140 H1296 V100 H1320 V140 H1360 V210 H1440" />
              </g>
              <g fill="#0A6B64" fillOpacity="0.35">
                <rect x="250" y="44" width="2" height="12" />
                <rect x="1048" y="34" width="2" height="16" />
                <rect x="603" y="52" width="2" height="14" />
              </g>
            </svg>
          </section>

          {/* ============================ TRUST STATISTICS ============================ */}
          <section className="section section--tight section--sand">
            <div className="wrap">
              <div className="grid grid-4">
                <Reveal className="fact" style={{ textAlign: "center", border: "1px solid var(--sand-line)", borderRadius: "8px" }}>
                  <div className="fact__v">2017</div>
                  <div className="fact__s">Investor Visa Established</div>
                </Reveal>
                <Reveal className="fact" style={{ textAlign: "center", border: "1px solid var(--sand-line)", borderRadius: "8px" }}>
                  <div className="fact__v">90/180</div>
                  <div className="fact__s">Schengen Days, Visa-Free</div>
                </Reveal>
                <Reveal className="fact" style={{ textAlign: "center", border: "1px solid var(--sand-line)", borderRadius: "8px" }}>
                  <div className="fact__v">2+3 Yrs</div>
                  <div className="fact__s">Permit Validity &amp; Renewal</div>
                </Reveal>
                <Reveal className="fact" style={{ textAlign: "center", border: "1px solid var(--sand-line)", borderRadius: "8px" }}>
                  <div className="fact__v">181+</div>
                  <div className="fact__s">Countries with Italian Passport</div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ PROGRAMME OVERVIEW ============================ */}
          <section className="section" id="program">
            <div className="wrap">
              <div className="split">
                <Reveal>
                  <span className="eyebrow">The Programme</span>
                  <h2 className="display">What the Italy<br />Golden Visa Actually Is</h2>
                  <p className="lede">Established in 2017, the <strong>Investor Visa for Italy</strong> grants non-EU nationals a residence permit in exchange for a qualifying investment in the Italian economy. The sequence is elegant: obtain the investor visa, enter Italy, then convert it into a residence permit.</p>
                  <p style={{ color: "var(--muted)" }}>Non-EU and non-EEA citizens aged 18 or over, with lawful income, a clean criminal record and valid health insurance, may apply. Legality of funds is verified before any commitment is made, and Langma International's legal partners in Italy handle every filing on your behalf.</p>
                  <a href="#investment" className="btn btn--dark btn-animated">See the Four Routes</a>
                </Reveal>
                <Reveal className="split__panel">
                  <div className="factline"><span className="factline__n">01</span><div><div className="factline__t">A two-year residence permit</div><div className="factline__d">Renewable for a further three years, carrying visa-free Schengen travel of up to 90 days in any 180-day period for your entire family.</div></div></div>
                  <div className="factline"><span className="factline__n">02</span><div><div className="factline__t">Lawfully sourced funds</div><div className="factline__d">Proof that your investment funds are legally sourced and available is verified before any visa is granted.</div></div></div>
                  <div className="factline"><span className="factline__n">03</span><div><div className="factline__t">Investment made after approval</div><div className="factline__d">Funds are transferred only after your investor visa is granted and you have entered Italy — you then have three months to complete it.</div></div></div>
                  <div className="factline"><span className="factline__n">04</span><div><div className="factline__t">No minimum stay</div><div className="factline__d">There is no obligation to live in Italy to hold the permit — though permanent residence and citizenship require continuous legal residence.</div></div></div>
                  <div className="factline"><span className="factline__n">05</span><div><div className="factline__t">Path to citizenship</div><div className="factline__d">Permanent residence after five years of continuous residence; Italian — and EU — citizenship eligibility after ten, subject to a B1 language test.</div></div></div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ INVESTMENT ROUTES ============================ */}
          <section className="section section--sand" id="investment">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Investment Routes</span>
                <h2 className="display">Four defined paths<br />to European residency</h2>
                <p className="lede" style={{ margin: "18px auto 0" }}>Italy accepts four qualifying investments. Routes cannot be combined — a single option must meet its full threshold — and funds are transferred only after your visa is approved and you have entered Italy.</p>
              </Reveal>

              <div className="grid grid-4" style={{ marginTop: "56px" }}>
                <Reveal as="article" className="route route--featured hover-card">
                  <span className="route__tag">Most Selected</span>
                  <div className="route__label">Innovative Startup</div>
                  <div className="route__amt">€250,000<small>Shares or equity · lowest entry point</small></div>
                  <ul className="route__list">
                    <li><Check />Government-approved innovative Italian startups</li>
                    <li><Check />Official register refreshed weekly by the Chambers of Commerce</li>
                    <li><Check />Transfer completed within 3 months of arrival</li>
                    <li><Check />Exposure to Italy's fast-growing innovation economy</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn-animated">Discuss This Route</a>
                </Reveal>

                <Reveal as="article" className="route hover-card">
                  <div className="route__label">Italian Company Shares</div>
                  <div className="route__amt">€500,000<small>An operating limited liability company</small></div>
                  <ul className="route__list">
                    <li><Check />Business must be active with a published financial statement</li>
                    <li><Check />A more mature, track-record-based investment</li>
                    <li><Check />Same residency rights and renewal terms</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn--dark btn-animated">Discuss This Route</a>
                </Reveal>

                <Reveal as="article" className="route hover-card">
                  <div className="route__label">Philanthropic Donation</div>
                  <div className="route__amt">€1,000,000<small>Irrevocable, no return of capital</small></div>
                  <ul className="route__list">
                    <li><Check />Funds a project in culture, education, research or heritage</li>
                    <li><Check />No ongoing management of an asset required</li>
                    <li><Check />Same residency rights and renewal terms</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn--dark btn-animated">Discuss This Route</a>
                </Reveal>

                <Reveal as="article" className="route hover-card">
                  <div className="route__label">Government Bonds</div>
                  <div className="route__amt">€2,000,000<small>Residual maturity of at least 2 years</small></div>
                  <ul className="route__list">
                    <li><Check />Sovereign-backed, lowest-risk qualifying route</li>
                    <li><Check />Minimal ongoing administration once purchased</li>
                    <li><Check />Same residency rights and renewal terms</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn--dark btn-animated">Discuss This Route</a>
                </Reveal>
              </div>

              <Reveal className="disclaimer">
                <strong>Please note.</strong> Real estate purchases do not qualify under the current programme — property may of course still be owned and enjoyed in Italy, it simply is not one of the four qualifying investment routes. Beyond the qualifying investment, a defined set of administrative fees applies across all routes: a subscription fee of €12,200, power of attorney from €605, tax ID and digital signature of €781, a residence permit fee of €3,406 for the main applicant, €567 for each dependant aged 18 and over, and €313 for each dependant under 18. Final costs vary with family composition, insurance and translation requirements. Investment thresholds and conditions are set by Italian law and can change without notice. This page is informational and is not legal, tax or immigration advice.
              </Reveal>
            </div>
          </section>

          {/* ============================ BENEFITS ============================ */}
          <section className="section" id="benefits">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">Key Benefits</span>
                <h2 className="display">What Italian residency<br />places in your hands</h2>
              </Reveal>
              <div className="grid grid-3" style={{ marginTop: "52px" }}>
                {BENEFITS.map((b) => (
                  <Reveal key={b.title} className="card hover-card">
                    <div className="card__ico">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{b.icon}</svg>
                    </div>
                    <h3>{b.title}</h3>
                    <p>{b.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ WHY ITALY ============================ */}
          <section className="section section--navy" id="why-italy">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">Why Italy</span>
                <h2 className="display">The rare golden visa<br />that asks nothing of your calendar</h2>
                <p className="lede" style={{ marginTop: "18px" }}>Among Europe's residence-by-investment programmes, Italy stands apart for its flexibility — your residency remains valid whether you settle on Lake Como or continue running your affairs from Dubai, Singapore or New York.</p>
              </Reveal>
              <div className="grid grid-3" style={{ marginTop: "52px" }}>
                {WHY_ITALY.map((c) => (
                  <Reveal key={c.title} className="card hover-card">
                    <div className="card__ico">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{c.icon}</svg>
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ ABOUT ITALY + FACTS ============================ */}
          <section className="section" id="italy">
            <div className="wrap">
              <div className="split" style={{ marginBottom: "56px" }}>
                <Reveal>
                  <span className="eyebrow">About Italy</span>
                  <h2 className="display">A founding pillar<br />of Europe</h2>
                </Reveal>
                <Reveal>
                  <p style={{ color: "var(--muted)" }}>Italy is where heritage and modern enterprise share the same postcode. Home to roughly 59 million people and anchored by its capital, Rome, the country is a founding member of both the European Union and NATO, trades in the euro, and holds more UNESCO World Heritage Sites than any nation on earth.</p>
                  <p style={{ color: "var(--muted)", marginBottom: 0 }}>Beyond the beauty lies serious economic weight: the third-largest economy in the eurozone and the eighth-largest in the world, connected through more than 30 international airports and 40 seaports, with universities such as Bocconi and Politecnico di Milano drawing global talent.</p>
                </Reveal>
              </div>

              <Reveal className="facts">
                {FACTS.map((f) => (
                  <div className="fact" key={f.k}>
                    <div className="fact__k">{f.k}</div>
                    <div className="fact__v">{f.v}</div>
                    <div className="fact__s">{f.s}</div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ============================ LIVING IN ITALY — MOSAIC ============================ */}
          <section className="section section--sand" id="living">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Living in Italy</span>
                <h2 className="display">La dolce vita,<br />with substance beneath the beauty</h2>
              </Reveal>
              <Reveal className="mosaic" style={{ marginTop: "48px" }}>
                {TILES.map((t) => (
                  <div
                    key={t.loc}
                    className={`tile${t.wide ? " tile--wide" : ""}${t.tall ? " tile--tall" : ""}`}
                    style={
                      t.image
                        ? {
                            backgroundImage: `linear-gradient(0deg,rgba(8,21,39,.88),rgba(8,21,39,.1) 55%),url('${t.image}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  >
                    <span className="tile__pin">{t.pin}</span>
                    <div>
                      <div className="tile__loc">{t.loc}</div>
                      <div className="tile__d">{t.d}</div>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ============================ PROCESS TIMELINE ============================ */}
          <section className="section section--navy" id="process">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">The Journey</span>
                <h2 className="display">From first conversation<br />to residence card</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>Eight measured steps, each managed by Langma's legal team. Most clients hold their Italian residence permit around four months after we begin.</p>
              </Reveal>
              <Reveal className="timeline" style={{ marginTop: "56px" }}>
                {TIMELINE.map((s) => (
                  <div className="tl-step" key={s.n}>
                    <span className="tl-step__n">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ============================ REQUIRED DOCUMENTS ============================ */}
          <section className="section" id="documents">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">Required Documents</span>
                <h2 className="display">Your file, prepared<br />to consular standard</h2>
                <p className="lede" style={{ marginTop: "16px" }}>Two document packages carry your application — one for the Nulla Osta, one for the consulate. Langma's lawyers handle translation, certification and formatting throughout.</p>
              </Reveal>
              <Reveal className="doc-grid" style={{ marginTop: "44px" }}>
                {DOCS.map((d) => (
                  <div className="doc" key={d.title}>
                    <div className="doc__ico">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{d.icon}</svg>
                    </div>
                    <div>
                      <h4>{d.title}</h4>
                      <p>{d.body}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
              <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "14px", marginTop: "30px", maxWidth: "640px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.6" }}>
                <strong style={{ color: "var(--navy)" }}>Administrative fees, itemised:</strong> €12,200 subscription fee, €605+ power of attorney, €781 tax ID and digital signature, plus residence permit fees of €3,406 (main applicant), €567 (dependant 18+) and €313 (dependant under 18).
              </p>
              <p style={{ textAlign: "center", color: "var(--muted-2)", fontSize: "13.5px", marginTop: "10px" }}>
                Indicative list. A precise, personalised checklist is issued during your consultation.
              </p>
            </div>
          </section>

          {/* ============================ FAMILY INCLUSION ============================ */}
          <section className="section section--sand" id="family">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Family Inclusion</span>
                <h2 className="display">One investment.<br />Residency for every generation.</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>Italy extends residency to your closest family under the same application — no additional investment required.</p>
              </Reveal>
              <Reveal className="fam" style={{ marginTop: "48px" }}>
                {FAMILY.map((f) => (
                  <div className="fam__c" key={f.title}>
                    <div className="fam__ico">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{f.icon}</svg>
                    </div>
                    <h4>{f.title}</h4>
                    <p>{f.body}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ============================ TAX ============================ */}
          <section className="section" id="tax">
            <div className="wrap">
              <div className="split">
                <Reveal>
                  <span className="eyebrow">Tax Considerations</span>
                  <h2 className="display">Residency that can<br />be structured intelligently</h2>
                  <p className="lede" style={{ marginTop: "16px" }}>Holding an Italian residence permit does not automatically make you an Italian taxpayer. Taxation follows presence — and for those who choose Italy as their fiscal home, an exceptional regime awaits.</p>
                  <p style={{ color: "var(--muted)" }}>Italy's ordinary personal income tax runs progressively from 23% to 43%. Langma coordinates with cross-border tax counsel so your structure is decided before, not after, you move.</p>
                </Reveal>
                <Reveal className="split__panel">
                  <div className="factline"><span className="factline__n">✓</span><div><div className="factline__t">Non-resident status</div><div className="factline__d">Spend fewer than 183 days a year in Italy and your worldwide income generally remains outside Italian taxation.</div></div></div>
                  <div className="factline"><span className="factline__n">✓</span><div><div className="factline__t">An optional flat-tax regime</div><div className="factline__d">New tax residents may elect a flat €300,000 per year on all foreign income, plus €50,000 per family member, for up to 15 years.</div></div></div>
                  <div className="factline"><span className="factline__n">!</span><div><div className="factline__t">Standard rates apply otherwise</div><div className="factline__d">Ordinary progressive income tax runs from 23% to 43% for those who do not elect the flat-tax regime.</div></div></div>
                  <div className="factline"><span className="factline__n">!</span><div><div className="factline__t">Personalised planning is essential</div><div className="factline__d">Your position depends on citizenship, existing tax residencies and the structure of your affairs.</div></div></div>
                </Reveal>
              </div>
              <Reveal className="disclaimer">
                <strong>Not tax advice.</strong> The above is a general summary of publicly available information and does not constitute tax, legal or financial advice. Tax outcomes depend on your specific circumstances and can change. Please obtain personalised advice from a licensed professional before making any decision.
              </Reveal>
            </div>
          </section>

          {/* ============================ WHY LANGMA ============================ */}
          <section className="section section--navy" id="langma">
            <div className="wrap">
              <div className="split" style={{ alignItems: "center" }}>
                <Reveal>
                  <span className="eyebrow">Why Langma International</span>
                  <h2 className="display">An institution built<br />on trust since 2012</h2>
                  <p className="lede" style={{ marginTop: "18px" }}>For over a decade, Langma International has served governments, embassies, public-sector undertakings and corporations across languages and borders. We bring that same discipline, discretion and end-to-end care to investment migration, guiding Indian and internationally mobile families alike through the Italy Golden Visa process.</p>
                  <p style={{ color: "var(--muted)" }}>Your Italy application is handled by a dedicated advisor and executed in coordination with seasoned legal partners in Italy who file with the authorities. You receive one considered point of contact from first consultation to settlement.</p>
                  <div className="pill-row">
                    <span className="pill">Government projects</span>
                    <span className="pill">Embassy engagements</span>
                    <span className="pill">PSU &amp; corporate clients</span>
                    <span className="pill">MEA-recognised language services</span>
                    <span className="pill">Global staffing</span>
                    <span className="pill">End-to-end support</span>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="langma__stats">
                    <div className="langma__stat stats-card-shimmer"><div className="n">2012</div><div className="l">Established</div></div>
                    <div className="langma__stat stats-card-shimmer"><div className="n">100,000+</div><div className="l">Candidates Trained</div></div>
                    <div className="langma__stat stats-card-shimmer"><div className="n">40+</div><div className="l">Languages</div></div>
                    <div className="langma__stat stats-card-shimmer"><div className="n">Global</div><div className="l">Reach &amp; Staffing</div></div>
                  </div>
                  <p style={{ color: "var(--muted-2)", fontSize: "13px", marginTop: "22px", lineHeight: "1.6" }}>
                    Figures reflect Langma International's wider institutional experience across language, training and global-mobility services. Legal immigration processing in Italy is carried out by licensed Italian counsel with whom we coordinate.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ PROGRAMME COMPARISON ============================ */}
          <section className="section section--sand" id="compare">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">How Italy Measures Up</span>
                <h2 className="display">How Italy Compares to<br />Europe's Leading Golden Visas</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>A side-by-side look at Italy's Investor Visa against well-known residency-by-investment routes in Portugal, Greece, Hungary and Cyprus — covering investment size, conditions, and what each ultimately offers over time.</p>
              </Reveal>

              <Reveal className="compare-wrap" style={{ marginTop: "48px" }}>
                <table className="compare">
                  <caption>Figures reflect publicly available programme information as of mid-2026 and are subject to change by the relevant governments; always confirm current terms before deciding.</caption>
                  <thead>
                    <tr>
                      <th scope="col">Criteria</th>
                      <th scope="col" className="hl">Italy</th>
                      <th scope="col">Portugal</th>
                      <th scope="col">Greece</th>
                      <th scope="col">Hungary</th>
                      <th scope="col">Cyprus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((r) => (
                      <tr key={r.label}>
                        <th scope="row">{r.label}</th>
                        <td className="hl">{r.panama}</td>
                        <td>{r.portugal}</td>
                        <td>{r.greece}</td>
                        <td>{r.hungary}</td>
                        <td>{r.uae}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
              <p style={{ textAlign: "center", color: "var(--muted-2)", fontSize: "13px", marginTop: "18px" }}>
                *Routes and conditions vary by nationality and personal circumstances. This comparison is informational and not immigration advice.
              </p>
            </div>
          </section>

          {/* ============================ FAQ ============================ */}
          <section className="section" id="faq">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Questions, Answered</span>
                <h2 className="display">Italy Golden Visa,<br />answered</h2>
              </Reveal>
              <Reveal className="faq" style={{ marginTop: "48px" }}>
                {FAQS.map((f, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div className={`faq__item${isOpen ? " open" : ""}`} key={f.q}>
                      <button
                        className="faq__q"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                      >
                        <span>{f.q}</span>
                        <span className="faq__ico" aria-hidden="true"></span>
                      </button>
                      <div
                        className="faq__a"
                        style={{ maxHeight: isOpen ? `${faqRefs.current[i]?.scrollHeight ?? 1000}px` : "0px" }}
                      >
                        <div className="faq__a-inner" ref={(el) => (faqRefs.current[i] = el)}>
                          {f.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Reveal>
            </div>
          </section>

          {/* ============================ BOOK — CALENDAR + FORM ============================ */}
          <section className="section section--sand" id="book">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Book a Consultation</span>
                <h2 className="display">Begin with a private,<br />no-obligation conversation</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>Choose a time that suits you, or send us a note. A senior advisor will discuss your objectives and outline the most suitable route.</p>
              </Reveal>

              <Reveal className="book" style={{ marginTop: "52px" }}>
                {/* Calendar */}
                <div className="panel">
                  <h3>Select a date &amp; time</h3>
                  <p className="panel__sub">Consultations run Monday to Saturday, in person or by private video call. All times shown in India Standard Time (IST).</p>
                  <div className="cal__head">
                    <span className="cal__title">{MONTHS[view.getMonth()]} {view.getFullYear()}</span>
                    <div className="cal__nav">
                      <button
                        className="cal__btn"
                        aria-label="Previous month"
                        disabled={prevDisabled}
                        onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                      </button>
                      <button
                        className="cal__btn"
                        aria-label="Next month"
                        onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                      </button>
                    </div>
                  </div>
                  <div className="cal__dow" aria-hidden="true">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>
                  <div className="cal__grid" role="grid" aria-label="Available consultation dates">
                    {Array.from({ length: firstDow }).map((_, i) => (
                      <div className="cal__day empty" key={`empty-${i}`}></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const d = i + 1;
                      const date = new Date(view.getFullYear(), view.getMonth(), d);
                      const dow = date.getDay();
                      const isPast = date < today;
                      const isSunday = dow === 0;
                      const disabled = isPast || isSunday;
                      const isSelected = selectedDate && sameDay(date, selectedDate);
                      return (
                        <button
                          key={d}
                          type="button"
                          className={`cal__day${!disabled ? " available" : ""}${isSelected ? " selected" : ""}`}
                          disabled={disabled}
                          aria-label={!disabled ? `${date.toDateString()} available` : undefined}
                          onClick={() => handleSelectDate(date)}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>

                  {selectedDate && (
                    <div className="slots">
                      <div className="slots__label">Available times</div>
                      <div className="slots__grid">
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            className={`slot${selectedTime === t ? " selected" : ""}`}
                            onClick={() => setSelectedTime(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`cal__confirm${confirmed ? " show" : ""}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    <span>{confirmText}</span>
                  </div>
                  <p className="cal__hint">Selecting a slot reserves it in your enquiry below — final confirmation follows by email.</p>
                </div>

                {/* Form */}
                <div className="panel">
                  {!submitted ? (
                    <div>
                      <h3>Request your assessment</h3>
                      <p className="panel__sub">Complimentary · Confidential · No obligation.</p>
                      <form ref={formRef} noValidate onSubmit={(e) => submitConsultation(e, { selectedDate, selectedTime })}>
                        {errorMsg && (
                          <p role="alert" style={{ color: "#b91c1c", fontSize: 13, marginBottom: 14, padding: "10px 14px", background: "#fef2f2", borderRadius: 8, border: "1px solid #fecaca" }}>{errorMsg}</p>
                        )}
                        <div className="field-2">
                          <div className="field"><label htmlFor="fName">Full name</label><input id="fName" name="name" type="text" autoComplete="name" required placeholder="Alessandro Ricci" /></div>
                          <div className="field"><label htmlFor="fPhone">Phone / WhatsApp</label><input id="fPhone" name="phone" type="tel" autoComplete="tel" placeholder="+00 000 000 0000" /></div>
                        </div>
                        <div className="field-2">
                          <div className="field"><label htmlFor="fEmail">Email</label><input id="fEmail" name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></div>
                          <div className="field"><label htmlFor="fCountry">Nationality</label><input id="fCountry" name="country" type="text" autoComplete="country-name" placeholder="Your citizenship" /></div>
                        </div>
                        <div className="field">
                          <label htmlFor="fBudget">Preferred investment route</label>
                          <select id="fBudget" name="budget" defaultValue="">
                            <option value="">Not sure yet — advise me</option>
                            <option>Innovative startup — €250,000</option>
                            <option>Established company — €500,000+</option>
                            <option>Philanthropic donation — €1,000,000+</option>
                            <option>Government bonds — €2,000,000+</option>
                          </select>
                        </div>
                        <div className="field"><label htmlFor="fMsg">Your objectives</label><textarea id="fMsg" name="message" placeholder="Tell us what you hope to achieve — relocation, plan B, tax planning, education for children…"></textarea></div>
                        <label className="consent">
                          <input type="checkbox" id="fConsent" required />
                          <span>I consent to Langma International contacting me about this enquiry. I understand this page is informational and not legal or tax advice.</span>
                        </label>
                        <button type="submit" className="btn btn--wide btn-animated" disabled={loading}>{loading ? "Submitting…" : "Request Confidential Assessment"}</button>
                      </form>
                    </div>
                  ) : (
                    <div className="form-done show">
                      <div className="ok">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                      </div>
                      <h4>Thank you</h4>
                      <p>{doneText}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}