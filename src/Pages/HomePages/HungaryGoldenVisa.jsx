import React, { useState, useEffect, useRef } from "react";
import useGoldenVisaConsultationForm from "../../hooks/useGoldenVisaConsultationForm";

/* ============================================================
   HUNGARY GOLDEN VISA — Langma International
   Built on the same design system (navy / gold / ivory
   luxury-finance palette, layout, and interaction patterns)
   as the Panama Golden Visa page. Content sourced from the
   Hungary Golden Visa microsite.
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
  { href: "#overview", label: "Hungary" },
  { href: "#program", label: "The Programme" },
  { href: "#process", label: "Process" },
  { href: "#living", label: "Life in Hungary" },
  { href: "#compare", label: "Compare" },
  { href: "#faq", label: "FAQ" },
];

const BENEFITS = [
  {
    icon: (
      <>
        <path d="M3 12l9-9 9 9M6 10v10h12V10" />
      </>
    ),
    title: "Schengen mobility",
    body: "Residence permit holders may move freely across the Schengen Area for up to 90 days in any 180-day period — Vienna is a three-hour drive away.",
  },
  {
    icon: (
      <>
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    title: "Investment after approval",
    body: "A due-diligence-cleared Guest Investor Visa precedes the capital commitment, so screening happens before funds are placed.",
  },
  {
    icon: <path d="M12 2v20M2 12h20" />,
    title: "A safe, developed base",
    body: "Hungary ranked 14th globally on the 2024 Global Peace Index, and residents may enter even when borders are closed to tourists.",
  },
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    title: "Lower cost of living",
    body: "Groceries, entertainment and property run at roughly half the level of markets like Norway or Italy — central Budapest starts near €3,700/m².",
  },
  {
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 4v16M4 8h4" />
      </>
    ),
    title: "Straightforward banking",
    body: "Residents can open accounts with local and international banks using little more than a passport and a residence permit card.",
  },
  {
    icon: <path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6" />,
    title: "Right to work and trade",
    body: "Investors and family members holding residence permits may work, found businesses, or serve as directors of Hungarian companies.",
  },
];

const WHY_HUNGARY = [
  {
    icon: (
      <>
        <path d="M12 21C7 17 4 13 4 9a8 8 0 0116 0c0 4-3 8-8 12z" />
        <circle cx="12" cy="9" r="2.4" />
      </>
    ),
    title: "Healthcare & education",
    body: "Eleven Hungarian universities rank in the QS World University Rankings' 2025 top 1,500, and healthcare costs run 40–70% below UK and Scandinavian levels.",
  },
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M7 6V4h10v2" />
      </>
    ),
    title: "Favourable taxation",
    body: "A 15% personal income tax rate and a 9% corporate tax rate place Hungary among the most tax-efficient jurisdictions in Europe.",
  },
  {
    icon: <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7z" />,
    title: "A route to citizenship",
    body: "Permanent residence becomes available after three years, with citizenship — and visa-free access to 182 countries — reachable after a further eight.",
  },
];

const FACTS = [
  { k: "Capital", v: "Budapest", s: "Financial & cultural centre" },
  { k: "Population", v: "≈ 9.7 Million", s: "Heart of Central Europe" },
  { k: "Currency", v: "Hungarian Forint", s: "HUF, floating rate" },
  { k: "Official Language", v: "Hungarian", s: "English & German widely used" },
  { k: "Neighbours", v: "7 Countries", s: "Crossroads of the EU" },
  { k: "Personal Income Tax", v: "15% Flat", s: "Among the EU's lowest" },
  { k: "Corporate Tax", v: "9%", s: "Highly competitive rate" },
  { k: "EU Flight Time", v: "2–3 Hours", s: "To major European capitals" },
];

const TILES = [
  {
    wide: true,
    tall: true,
    pin: "Capital",
    loc: "Budapest Parliament",
    d: "The Hungarian Parliament Building at twilight",
    image: "/images/hungary-golden-visa/budapest-parliament.jpg",
  },
  {
    pin: "Landmark",
    loc: "Chain Bridge",
    d: "Linking Buda and Pest across the Danube",
    image: "/images/hungary-golden-visa/chain-bridge.jpg",
  },
  {
    pin: "Heritage",
    loc: "Fisherman's Bastion",
    d: "Neo-Gothic terraces above the river",
    image: "/images/hungary-golden-visa/fishermans-bastion.jpg",
  },
  {
    wide: true,
    pin: "Wellness",
    loc: "Széchenyi Baths",
    d: "Thermal spa culture in central Budapest",
    image: "/images/hungary-golden-visa/szechenyi-baths.jpg",
  },
  {
    pin: "Business",
    loc: "Manufacturing & Tech",
    d: "Automotive, precision industry, growing tech sector",
    image: "/images/hungary-golden-visa/manufacturing-tech.jpg",
  },
  {
    pin: "Education",
    loc: "Academic Hungary",
    d: "11 universities in the QS World Top 1,500",
    image: "/images/hungary-golden-visa/academic-hungary.jpg",
  },
  {
    wide: true,
    pin: "Travel",
    loc: "Schengen Access",
    d: "90 days in any 180 across the Schengen Area",
    image: "/images/hungary-golden-visa/schengen-access.jpg",
  },
];

const TIMELINE = [
  { n: 1, title: "Preliminary due diligence", body: "Our compliance team conducts an early risk assessment to flag any factor that could affect the outcome, before any capital moves — typically completed within a day." },
  { n: 2, title: "Document preparation", body: "Our lawyers issue a tailored checklist, arrange notarisation of copies, and coordinate certified translations while originals remain with the applicant." },
  { n: 3, title: "Guest Investor Visa issued", body: "Valid for up to six months, the visa grants entry to complete the investment and file the residence application. Visa-free nationals may skip this step." },
  { n: 4, title: "Trip to Hungary, application filed", body: "The applicant signs the fund or donation agreement in person, secures a registered residential address, and files the residence permit application." },
  { n: 5, title: "Investment completed", body: "The investor finalises the fund unit purchase or donation within 93 days of first entering Hungary on the Guest Investor Visa." },
  { n: 6, title: "Approval and residence card", body: "The application is typically processed within 21–30 days. Once approved, the residence permit card is issued within seven days and couriered to the investor." },
  { n: 7, title: "Renewal", body: "The residence permit may be extended once for a further ten years, provided the underlying investment conditions are still satisfied." },
];

const DOCS = [
  {
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    title: "Passport & photographs",
    body: "Passport valid for at least 12 months, plus two 3×4 cm photographs taken within the last month.",
  },
  {
    icon: (
      <>
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    title: "Health insurance",
    body: "Valid health insurance covering the investor and each included family member.",
  },
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    title: "Investment confirmation",
    body: "Written confirmation of intent to invest, plus the share certificate (Route One) or institutional certificate (Route Two).",
  },
  {
    icon: <path d="M12 2v20M6 6h9a3 3 0 010 6H6M6 12h11" />,
    title: "Source-of-funds & bank statement",
    body: "Documented proof that investment funds derive from a legitimate source, and a bank statement confirming available balance.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
      </>
    ),
    title: "CV & family documents",
    body: "A CV for every family member aged 18 or over, plus marriage and birth certificates for dependents, where applicable.",
  },
  {
    icon: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M8 4v16M4 8h4" />
      </>
    ),
    title: "Application & address",
    body: "Completed residence permit application form and proof of a registered residential address in Hungary.",
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
    title: "Spouse / Partner",
    body: "A registered spouse or partner joins the same application for a €1,000 administrative fee — no additional qualifying investment.",
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
    body: "Dependent children under the age of 18 may be included at no additional investment.",
  },
  {
    icon: <path d="M12 21C7 17 4 13 4 9a8 8 0 0116 0c0 4-3 8-8 12z" />,
    title: "Dependent parents",
    body: "Parents of either spouse may be included if financially dependent, with a pension as their principal source of income.",
  },
  {
    icon: <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7z" />,
    title: "US nationals, note",
    body: "US nationals — investor, spouse, children or parents — must hold a second citizenship to be included on the application.",
  },
];

const COMPARE_ROWS = [
  { label: "Minimum investment", hungary: "€250,000+", portugal: "€250,000", greece: "€250,000", cyprus: "€300,000", spain: "€500,000", italy: "€250,000" },
  { label: "Typical timeline", hungary: "5+ months", portugal: "12+ months", greece: "4+ months", cyprus: "9+ months", spain: "5+ months", italy: "4+ months" },
  { label: "Real estate option", hungary: "Fund units only", portugal: "Unavailable", greece: "Available", cyprus: "Available", spain: "Available", italy: "Unavailable" },
  { label: "Residency requirement", hungary: "None", portugal: "7 days/year", greece: "None", cyprus: "Visit every 2 years", spain: "None", italy: "None" },
];

const FAQS = [
  {
    q: "Does Hungary have a Golden Visa programme?",
    a: "Yes. Hungary introduced its Guest Investor programme for non-EU and non-EEA nationals, effective 1 July 2024. Applicants may invest in a qualifying real estate fund or donate to an institution of higher learning, with a minimum of €250,000 leading to a ten-year residence permit.",
  },
  {
    q: "Can I qualify by simply buying a house?",
    a: "No. Direct residential property purchase does not qualify you for this programme. The two routes are real estate fund units or an institutional donation. You will still need a registered address in Hungary, which can be rented or owned.",
  },
  {
    q: "How long does the process usually take?",
    a: "Most applicants reach residency in five months or more, from the initial due-diligence check through to receiving the physical residence permit card, which is then valid for ten years.",
  },
  {
    q: "What are the total costs involved?",
    a: "The core investment starts at €250,000 for fund units or €1,000,000 for a donation. On top of this, expect administrative fees, brokerage account charges, and professional service fees, all itemised before you commit.",
  },
  {
    q: "Can I travel across Europe on this permit?",
    a: "Yes. As a Schengen member state, Hungary's residence permit allows visa-free travel and stays of up to 90 days in any 180-day period across the Schengen Area.",
  },
  {
    q: "Can my parents or adult children join the application?",
    a: "Your spouse or registered partner, children under 18, and financially dependent parents of either spouse can be added to the same application. Adult children are not covered by the programme's family definition.",
  },
  {
    q: "Do I need to live in Hungary to keep my residence card?",
    a: "No minimum stay applies to holding the ten-year permit itself. A residency requirement only comes into play if you later pursue permanent residence or citizenship.",
  },
  {
    q: "How do I eventually reach citizenship?",
    a: "Permanent residence can be requested after three years, provided at least 183 days per year are spent in Hungary. Citizenship becomes possible after eight further years as a permanent resident, subject to Hungarian language and history examinations.",
  },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TIMES = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function HungaryGoldenVisa() {
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
    useGoldenVisaConsultationForm("Hungary Guest Investor Programme", { leadType: "Golden Visa Consultation", requirePhone: true });

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
   surfaces stay white or a faint teal-tinted off-white.
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

.skip-link{
  position:absolute;left:-999px;top:auto;width:1px;height:1px;overflow:hidden;
  background:var(--navy);color:var(--ivory);padding:14px 22px;border-radius:4px;
  font-family:var(--sans);font-weight:600;font-size:14px;z-index:1000;
}
.skip-link:focus{left:16px;top:16px;width:auto;height:auto;outline:2px solid var(--gold);}

.wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
.section{padding:clamp(64px,9vw,128px) 0;position:relative;}
.section--tight{padding:clamp(52px,7vw,96px) 0;}
.section--navy{background:var(--white);color:var(--ink);}
.section--sand{background:var(--sand);}

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

.facts{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--sand-line);border:1px solid var(--sand-line);border-radius:8px;overflow:hidden;}
.fact{background:var(--white);padding:30px 26px;transition:background .4s var(--ease);}
.fact:hover{background:var(--ivory);}
.fact__k{font-size:11.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-deep);font-weight:700;margin-bottom:10px;}
.fact__v{font-family:var(--serif);font-size:1.7rem;font-weight:600;color:var(--navy);line-height:1.15;}
.fact__s{font-size:13px;color:var(--muted);margin-top:6px;}

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

.doc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.doc{display:flex;gap:16px;align-items:flex-start;background:var(--white);border:1px solid var(--sand-line);border-radius:6px;padding:22px 24px;transition:border-color .3s var(--ease);}
.doc:hover{border-color:var(--gold);}
.doc__ico{width:38px;height:38px;border-radius:50%;background:var(--sand);color:var(--gold-deep);display:grid;place-items:center;flex:none;}
.doc h4{font-family:var(--sans);font-size:15.5px;font-weight:700;color:var(--navy);margin-bottom:3px;}
.doc p{font-size:13.5px;color:var(--muted);margin:0;line-height:1.5;}

.fam{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.fam__c{text-align:center;padding:34px 22px;background:var(--white);border:1px solid var(--sand-line);border-radius:8px;transition:transform .4s var(--ease), box-shadow .4s var(--ease);}
.fam__c:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);}
.fam__ico{width:58px;height:58px;margin:0 auto 18px;border-radius:50%;background:linear-gradient(150deg,var(--navy),var(--navy-800));color:var(--gold-soft);display:grid;place-items:center;}
.fam__c h4{font-family:var(--serif);font-size:1.35rem;margin-bottom:8px;}
.fam__c p{font-size:14px;color:var(--muted);margin:0;}

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

.book{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(32px,5vw,60px);align-items:start;}
.panel{background:var(--white);border:1px solid var(--sand-line);border-radius:10px;padding:clamp(28px,3.5vw,42px);box-shadow:var(--shadow-md);}
.panel h3{font-size:1.7rem;margin-bottom:6px;}
.panel__sub{color:var(--muted);font-size:14.5px;margin-bottom:26px;}

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

.office{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px;}
.office__c{background:var(--sand);border:1px solid var(--sand-line);border-radius:8px;padding:30px 28px;}
.office__c .k{font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--navy);font-weight:700;margin-bottom:12px;}
.office__c .v{color:var(--ink);font-size:16px;line-height:1.6;}
.office__c a{color:var(--navy);}

.disclaimer{background:var(--sand);border-left:3px solid var(--gold);border-radius:4px;padding:26px 30px;font-size:14px;color:var(--muted);line-height:1.65;max-width:960px;margin:44px auto 0;}
.disclaimer strong{color:var(--navy);font-weight:700;}

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

.header-cta{white-space:nowrap;}
.header-cta .cta-short{display:none;}

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

@media (max-width:768px){
  .grid-3,.grid-2{grid-template-columns:1fr;}
  .facts{grid-template-columns:repeat(2,1fr);}
  .compare th,.compare td{padding:14px 16px;font-size:13.5px;}
  .office{gap:18px;}
  .book{gap:26px;}
}

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
                  <span className="eyebrow hero__eyebrow">Hungary · Guest Investor Programme · Effective 1 July 2024</span>
                  <h1>Residence in <em>Hungary</em>, built on investment.</h1>
                  <p className="hero__sub">Langma International guides investors and their families through Hungary's residence-by-investment route — a ten-year permit, visa-free Schengen travel, and a considered path toward European citizenship.</p>
                  <div className="hero__actions">
                    <a href="#book" className="btn btn-animated">Request a Private Consultation</a>
                    <a href="#program" className="btn btn--ghost btn-animated">Explore the Programme</a>
                  </div>
                  <div className="hero__stats">
                    <div className="stat">
                      <div className="stat__num">€250K+</div>
                      <div className="stat__label">Minimum Investment</div>
                    </div>
                    <div className="stat">
                      <div className="stat__num">5+ Mo.</div>
                      <div className="stat__label">Typical Time to Residency</div>
                    </div>
                    <div className="stat">
                      <div className="stat__num">10 Yrs</div>
                      <div className="stat__label">Residence Permit Validity</div>
                    </div>
                  </div>
                </div>

                <div className="hero__media">
                  <div className="hero__media-frame">
                    <img
                      src="/images/hungary-golden-visa/hero-residence-investment.jpg"
                      alt="Hungarian Parliament Building on the Danube at twilight, Budapest"
                      width="1200"
                      height="1500"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <span className="hero__media-tag">Budapest · Hungary</span>
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

          {/* ============================ PROGRAMME OVERVIEW ============================ */}
          <section className="section" id="program">
            <div className="wrap">
              <div className="split">
                <Reveal>
                  <span className="eyebrow">The Programme</span>
                  <h2 className="display">Two Routes, One<br />Residence Outcome</h2>
                  <p className="lede">Hungary's <strong>Guest Investor Programme</strong>, in force since 1 July 2024, is open exclusively to non-EU and non-EEA nationals. Applicants choose between two qualifying investment structures, both leading to the same ten-year residence permit.</p>
                  <p style={{ color: "var(--muted)" }}>Rather than a temporary permit awaiting renewal, an approved applicant is granted permanent status directly through the ten-year card. Once an investor enters Hungary on a Guest Investor Visa, the chosen investment must be completed within 93 calendar days. Langma International guides every stage, coordinated with regional legal counsel.</p>
                  <a href="#compare" className="btn btn--dark btn-animated">See How Hungary Compares</a>
                </Reveal>
                <Reveal className="split__panel">
                  <div className="factline"><span className="factline__n">01</span><div><div className="factline__t">Ten-year residence permit</div><div className="factline__d">A single approved application grants a residence card valid for ten years, renewable once for a further ten.</div></div></div>
                  <div className="factline"><span className="factline__n">02</span><div><div className="factline__t">Two investment routes</div><div className="factline__d">Real estate fund units from €250,000, or a higher-education donation from €1,000,000.</div></div></div>
                  <div className="factline"><span className="factline__n">03</span><div><div className="factline__t">The 93-day rule</div><div className="factline__d">The qualifying investment must be completed within 93 days of first entering Hungary on the Guest Investor Visa.</div></div></div>
                  <div className="factline"><span className="factline__n">04</span><div><div className="factline__t">No minimum stay</div><div className="factline__d">A residency requirement only applies later, if the family pursues permanent residence or citizenship.</div></div></div>
                  <div className="factline"><span className="factline__n">05</span><div><div className="factline__t">Path to citizenship</div><div className="factline__d">Permanent residence after 3 years; citizenship eligibility after 8 further years, subject to language and history exams.</div></div></div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ INVESTMENT ROUTES ============================ */}
          <section className="section section--sand" id="investment">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Investment Routes</span>
                <h2 className="display">Choose the route that<br />suits your objectives</h2>
                <p className="lede" style={{ margin: "18px auto 0" }}>Both routes lead to the same outcome — a ten-year Hungarian residence permit for you and your qualifying family. The right one depends on whether you prefer regulated fund exposure or a philanthropic contribution.</p>
              </Reveal>

              <div className="grid grid-2" style={{ marginTop: "56px" }}>
                <Reveal as="article" className="route route--featured hover-card">
                  <span className="route__tag">Most Selected</span>
                  <div className="route__label">Real Estate Fund Units</div>
                  <div className="route__amt">€250,000<small>Minimum unit value · 5-year maturity</small></div>
                  <ul className="route__list">
                    <li><Check />Units in a fund on the qualified list maintained by the Constitution Protection Office</li>
                    <li><Check />At least 40% of fund assets allocated to Hungarian residential real estate</li>
                    <li><Check />Share certificate carries a 5-year maturity period</li>
                    <li><Check />The lower entry threshold of the two routes</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn-animated">Discuss This Route</a>
                </Reveal>

                <Reveal as="article" className="route hover-card">
                  <div className="route__label">Higher-Education Donation</div>
                  <div className="route__amt">€1,000,000<small>To a trust-foundation managed institution</small></div>
                  <ul className="route__list">
                    <li><Check />Donation supports education, research, or arts and culture in Hungary</li>
                    <li><Check />Institution must be managed by a public interest trust foundation</li>
                    <li><Check />No fund maturity period applies to this route</li>
                    <li><Check />Suited to philanthropically-minded applicants</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn--dark btn-animated">Discuss This Route</a>
                </Reveal>
              </div>

              <Reveal className="compare-wrap" style={{ marginTop: "48px" }}>
                <table className="compare">
                  <caption>Indicative costs — Route One (Real Estate Fund Units)</caption>
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col" className="hl">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><th scope="row">Qualifying investment</th><td className="hl">€250,000+</td></tr>
                    <tr><th scope="row">Administrative fee — investor</th><td className="hl">€25,000</td></tr>
                    <tr><th scope="row">Administrative fee — per additional family member</th><td className="hl">€1,000</td></tr>
                    <tr><th scope="row">Brokerage account management (5-year term)</th><td className="hl">€8,700</td></tr>
                  </tbody>
                </table>
              </Reveal>

              <Reveal className="disclaimer">
                <strong>Please note.</strong> Thresholds, fees and conditions are set by Hungarian law and can change without notice. Figures shown are indicative and current to the best of our research; the precise terms applicable to your case are confirmed in writing during your consultation. This page is informational and is not legal, tax or immigration advice.
              </Reveal>
            </div>
          </section>

          {/* ============================ BENEFITS ============================ */}
          <section className="section" id="benefits">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">Why Investors Choose It</span>
                <h2 className="display">Nine reasons investors<br />choose the Hungarian route</h2>
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

          {/* ============================ WHY HUNGARY ============================ */}
          <section className="section section--navy" id="why-hungary">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">Why Hungary</span>
                <h2 className="display">A quietly confident<br />corner of Central Europe</h2>
                <p className="lede" style={{ marginTop: "18px" }}>Hungary sits at the geographic heart of the European Union, bordered by seven countries and threaded through by the Danube, which divides Budapest into hilltop Buda and the grand boulevards of Pest.</p>
              </Reveal>
              <div className="grid grid-3" style={{ marginTop: "52px" }}>
                {WHY_HUNGARY.map((c) => (
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

          {/* ============================ ABOUT HUNGARY + FACTS ============================ */}
          <section className="section" id="overview">
            <div className="wrap">
              <div className="split" style={{ marginBottom: "56px" }}>
                <Reveal>
                  <span className="eyebrow">About Hungary</span>
                  <h2 className="display">The heart of the<br />European Union</h2>
                </Reveal>
                <Reveal>
                  <p style={{ color: "var(--muted)" }}>Home to roughly 9.7 million people, Hungary has spent three decades converting a rich industrial and academic heritage into one of the region's most competitive economies. Hungarian is the mother tongue, but English and German are widely spoken in business, hospitality and academic settings.</p>
                  <p style={{ color: "var(--muted)", marginBottom: 0 }}>Economically, Hungary has built its footing on precision manufacturing, automotive production, agriculture and a fast-growing technology sector, supported by EU membership, a strategic location along major European transport corridors, and a currency — the Hungarian forint — that keeps the cost of living notably lower than in Western Europe.</p>
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

          {/* ============================ LIFE IN HUNGARY — MOSAIC ============================ */}
          <section className="section section--sand" id="living">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Life in Hungary</span>
                <h2 className="display">What residence actually<br />feels like, day to day</h2>
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
                <span className="eyebrow eyebrow--center">Application Process</span>
                <h2 className="display">Seven stages, from screening<br />to residence card</h2>
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
                <span className="eyebrow">What You'll Need</span>
                <h2 className="display">The documents,<br />prepared properly</h2>
                <p className="lede" style={{ marginTop: "16px" }}>Requirements are precise, and small errors cause delays. We prepare each item to Hungarian standards before anything is submitted.</p>
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
              <p style={{ textAlign: "center", color: "var(--muted-2)", fontSize: "13.5px", marginTop: "30px" }}>
                Indicative list. A precise, personalised checklist is issued during your consultation.
              </p>
            </div>
          </section>

          {/* ============================ FAMILY INCLUSION ============================ */}
          <section className="section section--sand" id="family">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Family Inclusion</span>
                <h2 className="display">One application.<br />The whole household</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>A spouse or registered partner, dependent children, and dependent parents may all be included in the same application, on the same terms as the main applicant.</p>
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
                  <span className="eyebrow">Taxation</span>
                  <h2 className="display">Among the EU's<br />lowest tax rates</h2>
                  <p className="lede" style={{ marginTop: "16px" }}>Hungary applies a flat <em>15% personal income tax</em> rate and a <em>9% corporate tax</em> rate — among the lowest in the European Union — alongside a 4% stamp duty on property purchases.</p>
                  <p style={{ color: "var(--muted)" }}>These figures describe the general Hungarian tax framework; an investor's personal liability depends on residency status, source of income and any applicable tax treaties, and should be confirmed with a qualified tax adviser.</p>
                </Reveal>
                <Reveal className="split__panel">
                  <div className="factline"><span className="factline__n">✓</span><div><div className="factline__t">Flat 15% personal income tax</div><div className="factline__d">One of the most competitive personal tax rates within the European Union.</div></div></div>
                  <div className="factline"><span className="factline__n">✓</span><div><div className="factline__t">9% corporate tax rate</div><div className="factline__d">Among the lowest corporate rates in Europe, supporting business formation.</div></div></div>
                  <div className="factline"><span className="factline__n">!</span><div><div className="factline__t">4% stamp duty on property</div><div className="factline__d">Applies to qualifying property purchases under Hungarian domestic rules.</div></div></div>
                  <div className="factline"><span className="factline__n">!</span><div><div className="factline__t">Your home country still matters</div><div className="factline__d">Obligations elsewhere may continue; personalised advice is essential.</div></div></div>
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
                  <h2 className="display">An advisory built on<br />clarity, not persuasion</h2>
                  <p className="lede" style={{ marginTop: "18px" }}>We represent one side of the table only: yours. Our role is to make an already sound programme easier to execute correctly — screening every case before capital moves, and managing translation, notarisation and filing in coordination with regional counsel.</p>
                  <p style={{ color: "var(--muted)" }}>Every application is built around the whole household, not a single applicant in isolation, and our support continues well beyond approval — renewals, card replacement, banking introductions and tax registration.</p>
                  <div className="pill-row">
                    <span className="pill">Independent immigration advisory</span>
                    <span className="pill">Confidential, document-led process</span>
                    <span className="pill">Multilingual client team</span>
                    <span className="pill">Family-inclusive applications</span>
                    <span className="pill">End-to-end support after approval</span>
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
                    Figures reflect Langma International's wider institutional experience across language, training and global-mobility services. Legal filing in Hungary is carried out in coordination with regional counsel.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ PROGRAMME COMPARISON ============================ */}
          <section className="section section--sand" id="compare">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">In Context</span>
                <h2 className="display">How Hungary Compares to<br />Other European Routes</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>Several European countries offer residence by investment. None require the investor to live there permanently to keep the status.</p>
              </Reveal>

              <Reveal className="compare-wrap" style={{ marginTop: "48px" }}>
                <table className="compare">
                  <caption>Figures reflect publicly available programme information as of mid-2026 and are subject to change by the relevant governments; always confirm current terms before deciding.</caption>
                  <thead>
                    <tr>
                      <th scope="col">Criteria</th>
                      <th scope="col" className="hl">Hungary</th>
                      <th scope="col">Portugal</th>
                      <th scope="col">Greece</th>
                      <th scope="col">Cyprus</th>
                      <th scope="col">Spain</th>
                      <th scope="col">Italy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((r) => (
                      <tr key={r.label}>
                        <th scope="row">{r.label}</th>
                        <td className="hl">{r.hungary}</td>
                        <td>{r.portugal}</td>
                        <td>{r.greece}</td>
                        <td>{r.cyprus}</td>
                        <td>{r.spain}</td>
                        <td>{r.italy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
              <p style={{ textAlign: "center", color: "var(--muted-2)", fontSize: "13px", marginTop: "18px" }}>
                Conditions vary by nationality and personal circumstances. This comparison is informational and not immigration advice.
              </p>
            </div>
          </section>

          {/* ============================ FAQ ============================ */}
          <section className="section" id="faq">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Questions</span>
                <h2 className="display">Hungary Golden Visa,<br />answered</h2>
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
                  <p className="panel__sub">Consultations run Monday to Saturday. All times shown in India Standard Time (IST).</p>
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
                      <h3>Tell us about you</h3>
                      <p className="panel__sub">Everything you share is treated in strict confidence.</p>
                      <form ref={formRef} noValidate onSubmit={(e) => submitConsultation(e, { selectedDate, selectedTime })}>
                        {errorMsg && (
                          <p role="alert" style={{ color: "#b91c1c", fontSize: 13, marginBottom: 14, padding: "10px 14px", background: "#fef2f2", borderRadius: 8, border: "1px solid #fecaca" }}>{errorMsg}</p>
                        )}
                        <div className="field-2">
                          <div className="field"><label htmlFor="fName">Full name</label><input id="fName" name="name" type="text" autoComplete="name" required placeholder="Your name" /></div>
                          <div className="field"><label htmlFor="fPhone">Phone</label><input id="fPhone" name="phone" type="tel" autoComplete="tel" required placeholder="+91 …" /></div>
                        </div>
                        <div className="field-2">
                          <div className="field"><label htmlFor="fEmail">Email</label><input id="fEmail" name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></div>
                          <div className="field"><label htmlFor="fCountry">Country of residence</label><input id="fCountry" name="country" type="text" autoComplete="country-name" placeholder="e.g. India" /></div>
                        </div>
                        <div className="field">
                          <label htmlFor="fBudget">Preferred investment route</label>
                          <select id="fBudget" name="budget" defaultValue="">
                            <option value="">Select a route</option>
                            <option>Real estate fund units — €250,000+</option>
                            <option>Higher-education donation — €1,000,000+</option>
                            <option>Not sure yet — advise me</option>
                          </select>
                        </div>
                        <div className="field"><label htmlFor="fMsg">How can we help?</label><textarea id="fMsg" name="message" placeholder="A little about your goals and timeline…"></textarea></div>
                        <label className="consent">
                          <input type="checkbox" id="fConsent" required />
                          <span>I consent to Langma International contacting me about this enquiry. I understand this page is informational and not legal or tax advice.</span>
                        </label>
                        <button type="submit" className="btn btn--wide btn-animated" disabled={loading}>{loading ? "Submitting…" : "Request Consultation"}</button>
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