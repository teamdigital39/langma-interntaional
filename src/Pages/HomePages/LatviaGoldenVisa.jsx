import React, { useState, useEffect, useRef } from "react";
import useGoldenVisaConsultationForm from "../../hooks/useGoldenVisaConsultationForm";

/* ============================================================
   LATVIA GOLDEN VISA — Langma International
   Content sourced from the Latvia Golden Visa page; visual
   design system (teal / ivory single-accent luxury-finance
   palette, layout, components and interactions) ported verbatim
   from the Panama Golden Visa React component.
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
  { href: "#about", label: "Latvia" },
  { href: "#programme", label: "The Golden Visa" },
  { href: "#finance", label: "Investment" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

const BENEFITS = [
  {
    icon: <path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6" />,
    title: "Residence in the EU",
    body: "The legal right to live in Latvia as a European Union member state, with a recognised biometric residence card for you and your qualifying family.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
      </>
    ),
    title: "Family included",
    body: "Bring a legally married spouse and unmarried, financially dependent children under 18 within the same application.",
  },
  {
    icon: (
      <>
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    title: "Schengen mobility",
    body: "As a Latvian residence-permit holder, travel visa-free for short stays of up to 90 days in any 180 across the Schengen Area.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
    title: "No lifestyle conditions",
    body: "No minimum-stay requirement, no language test and no job requirement — investors keep full flexibility over how and when they use their Latvian residency.",
  },
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M7 6V4h10v2" />
      </>
    ),
    title: "Tax-efficient business base",
    body: "Zero corporate tax on reinvested profits, with the standard 20% rate applying only once profits are distributed as dividends.",
  },
  {
    icon: <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7z" />,
    title: "Route to permanence",
    body: "A defined path toward permanent residency after five years, and potential citizenship eligibility after ten years, under the rules in force at the time.",
  },
];

const WHY_LATVIA = [
  {
    icon: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z" />,
    title: "The EU's lowest entry point",
    body: "A qualifying investment from €50,000 makes the Latvia Golden Visa the most accessible residence-by-investment route currently offered inside the European Union.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
    title: "Schengen & EU mobility",
    body: "A Latvian residence permit allows visa-free travel across the Schengen Area for stays of up to 90 days in any 180-day period.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
    title: "No relocation required",
    body: "There is no minimum-stay obligation to hold the permit, no language test and no employment requirement — investors are free to build their life in Latvia at their own pace.",
  },
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    title: "Tax-efficient business base",
    body: "Latvia charges no corporate tax on profits reinvested into the business, with the standard 20% rate applying only once profits are distributed.",
  },
  {
    icon: (
      <>
        <path d="M12 21C7 17 4 13 4 9a8 8 0 0116 0c0 4-3 8-8 12z" />
        <circle cx="12" cy="9" r="2.4" />
      </>
    ),
    title: "Baltic heritage & lifestyle",
    body: "A UNESCO Old Town, the world's richest concentration of Art Nouveau architecture, pine-backed Baltic beaches and deep, quiet forests, all within a short flight of Europe.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
    title: "Fast-moving process",
    body: "With no application backlog, the Latvia Golden Visa is typically among the quickest EU residence-by-investment routes to complete.",
  },
];

const FACTS = [
  { k: "Population", v: "~1.8M", s: "A compact Baltic nation" },
  { k: "Capital", v: "Riga", s: "Political & cultural centre" },
  { k: "Currency", v: "Euro (€)", s: "Official currency since 2014" },
  { k: "Membership", v: "EU · NATO · Schengen", s: "Full member state" },
  { k: "Founded", v: "2010", s: "Golden Visa programme established" },
  { k: "Heritage", v: "UNESCO", s: "Riga's medieval Old Town" },
  { k: "Language", v: "Latvian", s: "Russian & Belarusian also widely spoken" },
  { k: "Processing", v: "3+ Months", s: "Among the EU's fastest routes" },
];

const TILES = [
  {
    wide: true,
    tall: true,
    pin: "Capital",
    loc: "Riga",
    d: "A UNESCO Old Town and the world's finest Art Nouveau architecture",
    image: "/images/latvia-golden-visa/riga.jpg",
  },
  {
    pin: "Heritage",
    loc: "Riga's Cultural Heart",
    d: "The Freedom Monument and the medieval House of the Blackheads",
    image: "/images/latvia-golden-visa/riga-cultural-heart.jpg",
  },
  {
    pin: "Nature",
    loc: "Latvia's Forests",
    d: "Half the country lies under forest, with quiet trails and lakes nearby",
    image: "/images/latvia-golden-visa/latvias-forests.jpg",
  },
  {
    wide: true,
    pin: "Coastline",
    loc: "The Baltic Shore",
    d: "Pine-backed beaches at Jurmala, a short drive from Riga",
    image: "/images/latvia-golden-visa/baltic-shore.jpg",
  },
];

const LIFE_TAGS = [
  "Baltic Sea coastline",
  "Art Nouveau architecture",
  "UNESCO Old Town",
  "High quality of life",
  "EU & Schengen access",
  "Skilled, multilingual workforce",
];

const TIMELINE = [
  { n: 1, title: "Preliminary due diligence", body: "A confidential compliance check on your background and source of funds before any agreement is signed, reducing the risk of a later refusal." },
  { n: 2, title: "Route selection & documentation", body: "Choosing between the business, real estate or bank deposit route, then assembling and certifying the passport, medical, financial and family documents your file requires." },
  { n: 3, title: "Fulfilling the investment", body: "Completing the share-capital contribution, property purchase, or bank deposit, together with any applicable state fees." },
  { n: 4, title: "Application submission", body: "Filing the application either through a Latvian embassy in your country of residence or directly with the Office of Citizenship and Migration Affairs (OCMA) in Latvia." },
  { n: 5, title: "Biometrics & residence card", body: "Travelling to Latvia to submit biometric data, undergo a medical examination and collect residence-permit cards for you and your family." },
  { n: 6, title: "Annual compliance & renewal", body: "Visiting Latvia each year to renew your physical card, and exchanging it for permanent residence after five years, subject to maintaining the investment." },
];

const DOCS = [
  {
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    title: "Proof of investment",
    body: "A company share certificate, signed property title deed, or bank deposit confirmation, depending on the route chosen.",
  },
  {
    icon: <path d="M12 2v20M6 6h9a3 3 0 010 6H6M6 12h11" />,
    title: "Subsistence funds",
    body: "Around €8,880 for the main applicant (or €26,640 if purchasing real estate), plus €8,880 for a spouse and €2,664 per dependent child.",
  },
  {
    icon: (
      <>
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    title: "Clean record & medical certificate",
    body: "A recent criminal-record certificate and a medical certificate confirming good health, both properly apostilled and translated.",
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
    title: "Main applicant",
    body: "A non-EU, non-EEA or non-Swiss national aged 18 or over who completes the qualifying investment and meets the good-character and health requirements.",
  },
  {
    icon: <path d="M12 21C7 17 4 13 4 9a8 8 0 0116 0c0 4-3 8-8 12z" />,
    title: "Spouse",
    body: "A legally married spouse is included alongside the main applicant, receiving their own residence permit.",
  },
  {
    icon: (
      <>
        <circle cx="9" cy="9" r="2.6" />
        <circle cx="16" cy="9" r="2.6" />
        <path d="M3 19c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5M13 19c0-2.8 2.2-4.5 5-4.5" />
      </>
    ),
    title: "Children under 18",
    body: "Unmarried children who are financially dependent on the main applicant may be included within the same application.",
  },
];

const LANGMA_CAPABILITIES = [
  { title: "Global mobility expertise", body: "Cross-border residency experience spanning Europe and beyond, applied to your specific circumstances." },
  { title: "Personalised consultation", body: "A considered assessment of your investment goals, family composition and timeline — not a templated checklist." },
  { title: "Documentation support", body: "Hands-on help assembling, certifying and sequencing the paperwork that makes or breaks a file." },
  { title: "OCMA application guidance", body: "Coordination through every official stage of the Latvian process, from due diligence to biometrics." },
  { title: "International network", body: "Trusted partners in Latvia for banking, property and legal representation, keeping your investment on track." },
  { title: "Transparent process", body: "Clear timelines, honest expectations and plain answers about what is — and isn't — within reach." },
];

const COMPARE_ROWS = [
  { label: "Minimum investment", latvia: "€50,000+", italy: "€250,000+", greece: "€400,000+ (€250,000 for heritage/conversion projects)", portugal: "€200,000+ donation route; most choose the €500,000 fund route" },
  { label: "Other requirements", latvia: "Maintain ~€8,880 in a Latvian bank account, plus the qualifying investment to renew", italy: "Maintain the qualifying investment for the life of the permit", greece: "Maintain ownership of the qualifying investment to remain eligible", portugal: "Spend an average of at least 7 days per year in Portugal" },
  { label: "Typical processing time", latvia: "3+ months", italy: "3–6 months", greece: "6+ months, extending toward 12 amid backlogs", portugal: "12+ months, some cases toward 18–24" },
  { label: "Initial permit validity", latvia: "5 years", italy: "2 years", greece: "5 years", portugal: "2 years" },
  { label: "Indicative time to citizenship", latvia: "10 years", italy: "10 years", greece: "7 years", portugal: "10 years (7 for EU/CPLP nationals)" },
  { label: "Eligible family members", latvia: "Spouse and dependent children under 18", italy: "Spouse, minor children and dependent parents (generally 65+)", greece: "Spouse/partner, children under 21, and parents of both spouses", portugal: "Spouse/partner, dependent children under 26, and parents" },
];

const FAQS = [
  {
    q: "What is the Latvia Golden Visa?",
    a: "The Latvia Golden Visa is a temporary residence permit issued under Section 23, Paragraph one, Clause 28 of Latvia's Immigration Law to non-EU, non-EEA and non-Swiss nationals who make a qualifying investment. It grants a residence permit valid for five years, together with visa-free travel across the Schengen Area, and is administered by Latvia's Office of Citizenship and Migration Affairs (OCMA).",
  },
  {
    q: "How much do I need to invest?",
    a: "There are currently three main routes. The business route requires at least €50,000 (or €100,000 for larger companies) in the share capital of a Latvian company, plus a €10,000 state fee. The real estate route requires already-built property worth at least €250,000 in Riga or within 30 kilometres, plus a one-time state fee of 5% of the property's value. The bank deposit route requires at least €280,000 in subordinated bonds of a Latvian bank for five years. A new Immigration Law passed by Latvia's parliament in June 2026 would remove the real estate and bank deposit routes, but as of this writing it has not been signed into force, so all three routes remain available — confirm current terms before proceeding.",
  },
  {
    q: "Can I include my family?",
    a: "Yes. A legally married spouse and unmarried, financially dependent children under 18 can be included in the same application as the main investor, each receiving their own residence permit.",
  },
  {
    q: "What tax advantages does Latvia offer?",
    a: "Latvia does not charge corporate income tax on profits reinvested into a business. The standard 20% rate applies only once profits are distributed as dividends, making Latvia one of the more tax-efficient jurisdictions for entrepreneurs in the European Union. Personal tax positions vary and should be confirmed with a qualified Latvian tax adviser.",
  },
  {
    q: "Can it lead to permanent residency or citizenship?",
    a: "Yes. After five years of holding the residence permit and maintaining the qualifying investment, holders may apply for permanent residency. Latvian citizenship generally becomes available after ten years of lawful residence in total, subject to language, civic knowledge and integration requirements, and Latvia's general rule against dual citizenship, which carries defined exceptions.",
  },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TIMES = ["09:30", "11:00", "13:00", "15:30", "17:00", "18:30"];

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function LatviaGoldenVisa() {
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
    useGoldenVisaConsultationForm("Latvia Golden Visa", { leadType: "Golden Visa Consultation" });

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
   system ported from the Panama build. Teal carries headings,
   links, icons and button fills; surfaces stay white or a faint
   teal-tinted off-white.
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

.lgv *,.lgv *::before,.lgv *::after{box-sizing:border-box;}
.lgv{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
.lgv{
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
.lgv img{max-width:100%;display:block;}
.lgv a{color:inherit;text-decoration:none;}
.lgv h1,.lgv h2,.lgv h3,.lgv h4{font-family:var(--serif);font-weight:600;line-height:1.08;letter-spacing:.2px;color:var(--navy);margin:0;}
.lgv p{margin:0 0 1.1em;}
.lgv ::selection{background:var(--gold);color:#fff;}

/* skip link */
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
.stat{flex:1 1 130px;padding:6px 20px;border-left:1px solid var(--sand-line);}
.stat:first-child{border-left:0;padding-left:0;}
.stat__num{font-family:var(--serif);font-size:clamp(1.6rem,2.5vw,2.3rem);font-weight:600;color:var(--navy);line-height:1;white-space:nowrap;}
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
.route__amt{font-family:var(--serif);font-size:2.6rem;font-weight:600;color:var(--navy);line-height:1;}
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
.doc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.doc{display:flex;gap:16px;align-items:flex-start;background:var(--white);border:1px solid var(--sand-line);border-radius:6px;padding:22px 24px;transition:border-color .3s var(--ease);}
.doc:hover{border-color:var(--gold);}
.doc__ico{width:38px;height:38px;border-radius:50%;background:var(--sand);color:var(--gold-deep);display:grid;place-items:center;flex:none;}
.doc h4{font-family:var(--sans);font-size:15.5px;font-weight:700;color:var(--navy);margin-bottom:3px;}
.doc p{font-size:13.5px;color:var(--muted);margin:0;line-height:1.5;}

/* family cards */
.fam{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.fam__c{text-align:center;padding:34px 22px;background:var(--white);border:1px solid var(--sand-line);border-radius:8px;transition:transform .4s var(--ease), box-shadow .4s var(--ease);}
.fam__c:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);}
.fam__ico{width:58px;height:58px;margin:0 auto 18px;border-radius:50%;background:linear-gradient(150deg,var(--navy),var(--navy-800));color:var(--gold-soft);display:grid;place-items:center;}
.fam__c h4{font-family:var(--serif);font-size:1.35rem;margin-bottom:8px;}
.fam__c p{font-size:14px;color:var(--muted);margin:0;}

/* ============================================================
   LIFE IN LATVIA — DUOTONE MOSAIC
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
.compare{width:100%;border-collapse:collapse;min-width:820px;background:var(--white);}
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
.footer__legal{font-size:12.5px;color:var(--muted-2);line-height:1.6;max-width:100%;margin:26px 0 0;}
.footer__bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;padding-top:22px;font-size:13px;color:var(--muted-2);}
.footer__bottom a{color:var(--muted);}

/* ============================================================
   REVEAL + micro-interactions
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
.header-cta{white-space:nowrap;}
.header-cta .cta-short{display:none;}

@media (max-width:1024px){
  .grid-3{grid-template-columns:repeat(2,1fr);}
  .grid-4{grid-template-columns:repeat(2,1fr);}
  .facts{grid-template-columns:repeat(2,1fr);}
  .langma__stats{grid-template-columns:repeat(2,1fr);}
  .fam{grid-template-columns:repeat(2,1fr);}
  .doc-grid{grid-template-columns:repeat(2,1fr);}
  .office{grid-template-columns:1fr;}
  .mosaic{grid-template-columns:repeat(2,1fr);grid-auto-rows:190px;}
  .hero__grid{gap:40px;}
  .split{gap:40px;}
  .book{gap:32px;}
  .footer__grid{grid-template-columns:1fr 1fr;}
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
  .fam{grid-template-columns:1fr;}
  .compare th,.compare td{padding:14px 16px;font-size:13.5px;}
  .office{gap:18px;}
  .book{gap:26px;}
  .footer__grid{grid-template-columns:1fr;gap:32px;}
}
@media (max-width:640px){
  .grid-4,.langma__stats,.mosaic{grid-template-columns:1fr;}
  .facts{grid-template-columns:1fr;}
  .mosaic{grid-auto-rows:170px;}
  .tile--wide,.tile--tall{grid-column:auto;grid-row:auto;}
  .hero__stats{flex-direction:column;padding:18px 20px;}
  .stat{border-left:0;border-top:1px solid var(--sand-line);padding:14px 0 0;}
  .stat:first-child{border-top:0;padding-top:0;}
  .stat__num{font-size:1.9rem;}
  .timeline::before{left:24px;}
  .tl-step{padding-left:66px;}
  .tl-step__n{width:42px;height:42px;font-size:1.1rem;}
  .brand__tag{display:none;}
  .brand__name{font-size:17px;}
  .brand__mark{width:34px;height:34px;font-size:17px;}
  .header-cta{padding:12px 18px;font-size:13.5px;}
}
@media (max-width:480px){
  .lgv{font-size:16px;}
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
  .lgv *{animation:none !important;transition-duration:.01ms !important;scroll-behavior:auto !important;}
  .reveal{opacity:1;transform:none;}
}
      `}</style>

      <div className="lgv">
        <a className="skip-link" href="#main-content">Skip to main content</a>

        <main id="main-content">
          {/* ============================ HERO ============================ */}
          <section className="hero" id="top">
            <div className="hero__glow" aria-hidden="true"></div>
            <div className="wrap">
              <div className="hero__grid">
                <div className="hero__copy">
                  <span className="eyebrow hero__eyebrow">Latvia · EU Residence by Investment</span>
                  <h1>Latvia Golden Visa: the EU's most <em>accessible route to residency</em></h1>
                  <p className="hero__sub">A five-year Latvian residence permit, Schengen mobility and a genuine pathway to permanent residence — reachable from an investment of just €50,000, the lowest threshold of any European golden visa. Langma International guides investors and their families from the first eligibility review through to a collected residence card.</p>
                  <div className="hero__actions">
                    <a href="#book" className="btn btn-animated">Schedule Your Private Consultation</a>
                    <a href="#programme" className="btn btn--ghost btn-animated">Explore the Programme</a>
                  </div>
                  <div className="hero__stats">
                    <div className="stat">
                      <div className="stat__num">€50K<span style={{ color: "var(--muted-2)", fontSize: ".5em" }}>+</span></div>
                      <div className="stat__label">Minimum Investment</div>
                    </div>
                    <div className="stat">
                      <div className="stat__num">5 Yrs</div>
                      <div className="stat__label">Residence Permit Validity</div>
                    </div>
                    <div className="stat">
                      <div className="stat__num">3+ Mo.</div>
                      <div className="stat__label">Typical Processing Period</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "11.5px", color: "var(--muted-2)", margin: "12px 0 0" }}>
                    The lowest qualifying threshold of any European Union golden visa currently offered.
                  </p>
                </div>

                <div className="hero__media">
                  <div className="hero__media-frame">
                    <img
                      src="/images/latvia-golden-visa/hero-accessible-route.jfif"
                      width="1200"
                      height="1500"
                      alt="Panoramic skyline of Riga's Old Town along the Daugava River in Latvia"
                      loading="eager"
                    />
                    <span className="hero__media-tag">Riga · Latvia</span>
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
          <section className="section" id="programme">
            <div className="wrap">
              <div className="split">
                <Reveal>
                  <span className="eyebrow">The Programme</span>
                  <h2 className="display">The Latvia Golden Visa,<br />explained clearly</h2>
                  <p className="lede">A residence route built around a qualifying investment rather than proof of income or employment — transparent, well-regulated and genuinely one of Europe's fastest.</p>
                  <p style={{ color: "var(--muted)" }}>The Golden Visa is a temporary residence permit issued under Section 23, Paragraph one, Clause 28 of Latvia's Immigration Law to non-EU, non-EEA and non-Swiss nationals who complete a qualifying investment, administered by the Office of Citizenship and Migration Affairs (OCMA). Langma International guides you through every stage, coordinating with trusted partners in Latvia for banking, property and legal representation.</p>
                  <a href="#finance" className="btn btn--dark btn-animated">See the Investment Options</a>
                </Reveal>
                <Reveal className="split__panel">
                  <div className="factline"><span className="factline__n">01</span><div><div className="factline__t">What is the Golden Visa?</div><div className="factline__d">A temporary residence permit for non-EU, non-EEA and non-Swiss nationals who complete a qualifying investment, administered by OCMA.</div></div></div>
                  <div className="factline"><span className="factline__n">02</span><div><div className="factline__t">Who can apply?</div><div className="factline__d">Investors aged 18 or over, with a clean criminal record, a medical certificate confirming good health, and sufficient funds to support themselves and any family included.</div></div></div>
                  <div className="factline"><span className="factline__n">03</span><div><div className="factline__t">Business route</div><div className="factline__d">Commit at least €50,000 (or €100,000 depending on the company's turnover and headcount) into a Latvian company's share capital for five or ten years, plus a €10,000 state fee.</div></div></div>
                  <div className="factline"><span className="factline__n">04</span><div><div className="factline__t">Real estate route</div><div className="factline__d">Buy already-built residential or commercial property worth at least €250,000, in Riga or within 30km, plus a 5% state fee on the property's value.</div></div></div>
                  <div className="factline"><span className="factline__n">05</span><div><div className="factline__t">Bank deposit route</div><div className="factline__d">Place at least €280,000 into subordinated bonds of a Latvian bank for a five-year term, earning a return of up to roughly 3% per annum.</div></div></div>
                  <div className="factline"><span className="factline__n">06</span><div><div className="factline__t">Long-term horizon</div><div className="factline__d">Apply for permanent residency after five years of holding the permit, and for citizenship after ten years of lawful residence in total, subject to further requirements.</div></div></div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ INVESTMENT OPTIONS ============================ */}
          <section className="section section--sand" id="finance">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Investment Options &amp; Costs</span>
                <h2 className="display">Three routes, one<br />Latvian residence permit</h2>
                <p className="lede" style={{ margin: "18px auto 0" }}>Every route leads to the same five-year residence permit. The figures below reflect current published thresholds and indicative total costs for a single applicant.</p>
              </Reveal>

              <div className="grid grid-3" style={{ marginTop: "56px" }}>
                <Reveal as="article" className="route route--featured hover-card">
                  <span className="route__tag">Lowest Entry Point</span>
                  <div className="route__label">Business — Share Capital</div>
                  <div className="route__amt">€50,000+<small>Indicative total ~€61,340 · plus €10,000 state fee</small></div>
                  <ul className="route__list">
                    <li><Check />Share capital of a Latvian company, 5 or 10 years</li>
                    <li><Check />€100,000 threshold for larger companies</li>
                    <li><Check />The most accessible EU golden-visa route</li>
                    <li><Check />A genuine operating business, not a passive fund</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn-animated">Discuss This Route</a>
                </Reveal>

                <Reveal as="article" className="route hover-card">
                  <div className="route__label">Real Estate</div>
                  <div className="route__amt">€250,000+<small>Indicative total ~€269,840 · Riga or within 30km</small></div>
                  <ul className="route__list">
                    <li><Check />Already-built residential or commercial property</li>
                    <li><Check />5% state fee on the property's value</li>
                    <li><Check />A tangible, occupiable or letable asset</li>
                    <li><Check />Located in or near the capital, Riga</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn--dark btn-animated">Discuss This Route</a>
                </Reveal>

                <Reveal as="article" className="route hover-card">
                  <div className="route__label">Bank Deposit</div>
                  <div className="route__amt">€280,000+<small>Indicative total ~€311,340 · subordinated bonds, 5 years</small></div>
                  <ul className="route__list">
                    <li><Check />Subordinated bonds of a Latvian bank</li>
                    <li><Check />A five-year term with defined maturity</li>
                    <li><Check />Indicative return of up to roughly 3% per annum</li>
                    <li><Check />No property or business to manage</li>
                  </ul>
                  <a href="#book" className="btn btn--wide btn--dark btn-animated">Discuss This Route</a>
                </Reveal>
              </div>

              <Reveal className="disclaimer" style={{ marginTop: "28px" }}>
                <strong>A note on current terms.</strong> On 11 June 2026, Latvia's parliament (the Saeima) passed a new Immigration Law that would remove the real estate and bank deposit investment routes, retain the business investment route, and introduce a new state investment-fund route. Latvia's President declined to sign the law and returned it to parliament for reconsideration, so it is not yet in force, and all three routes described above remain valid under the current law. Applications submitted before any new law takes effect are expected to continue under existing rules. Beyond the qualifying investment, applicants must also hold additional subsistence funds and document their investment via a share certificate, title deed or bank deposit confirmation, alongside a clean-record and medical certificate. Investors should confirm the routes, thresholds and conditions in force at the time of application with a Langma International advisor before committing funds. This page is informational and is not legal, tax or financial advice.
              </Reveal>
            </div>
          </section>

          {/* ============================ BENEFITS ============================ */}
          <section className="section" id="benefits">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">Key Benefits</span>
                <h2 className="display">What the residence permit<br />makes possible</h2>
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

          {/* ============================ WHY LATVIA ============================ */}
          <section className="section section--navy" id="why-latvia">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">Why Investors Choose Latvia</span>
                <h2 className="display">The most accessible door<br />into the European Union</h2>
                <p className="lede" style={{ marginTop: "18px" }}>Among Europe's residence-by-investment programmes, Latvia stands apart for its low entry threshold, its light-touch conditions and the genuine lifestyle waiting on the other side of approval.</p>
              </Reveal>
              <div className="grid grid-3" style={{ marginTop: "52px" }}>
                {WHY_LATVIA.map((c) => (
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

          {/* ============================ ABOUT LATVIA + FACTS ============================ */}
          <section className="section" id="about">
            <div className="wrap">
              <div className="split" style={{ marginBottom: "56px" }}>
                <Reveal>
                  <span className="eyebrow">Discover Latvia</span>
                  <h2 className="display">A Baltic gateway with an<br />EU passport and a Hanseatic soul</h2>
                </Reveal>
                <Reveal>
                  <p style={{ color: "var(--muted)" }}>Set on the Baltic Sea in Northern Europe, Latvia is a nation of around 1.8 million people whose capital, Riga, serves as the country's political, economic and cultural centre. Latvian is the official language, while Russian and Belarusian are also widely spoken, reflecting a rich and layered history at the crossroads of Northern and Eastern Europe.</p>
                  <p style={{ color: "var(--muted)", marginBottom: 0 }}>Latvia runs a small, open economy built on advanced transit and logistics services, connecting Scandinavia, wider Europe and markets further east. The euro has been its currency since 2014, and as a full member of the European Union, NATO and the Schengen Area, Latvia offers the institutional stability and mobility that come with belonging to Europe's core alliances. Riga's UNESCO-listed medieval Old Town sits alongside the world's finest concentration of Art Nouveau architecture, while beyond the capital, sweeping forests, a gentle coastline and a celebrated culinary tradition combine to give residents a genuinely high quality of life.</p>
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

          {/* ============================ LIFE IN LATVIA — MOSAIC ============================ */}
          <section className="section section--sand" id="life">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Life in Latvia</span>
                <h2 className="display">Where will your<br />Baltic chapter begin?</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>From Riga's Art Nouveau boulevards to the pine-backed sands of the coast, Latvia offers distinct settings for distinct lives.</p>
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
              <Reveal className="pill-row" style={{ marginTop: "28px", justifyContent: "center" }}>
                {LIFE_TAGS.map((tag) => (
                  <span className="pill" key={tag}>{tag}</span>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ============================ PROCESS TIMELINE ============================ */}
          <section className="section section--navy" id="process">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">The Application Journey</span>
                <h2 className="display">A guided,<br />six-stage process</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>Langma International coordinates every stage and works with trusted partners in Latvia for banking, property and legal representation where required.</p>
              </Reveal>
              <Reveal className="timeline" style={{ marginTop: "56px" }}>
                {TIMELINE.map((s) => (
                  <div className="tl-step" key={s.n}>
                    <span className="tl-step__n">{String(s.n).padStart(2, "0")}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ============================ REQUIREMENTS ============================ */}
          <section className="section" id="documents">
            <div className="wrap">
              <Reveal className="head">
                <span className="eyebrow">What You'll Need</span>
                <h2 className="display">The documents,<br />prepared properly</h2>
                <p className="lede" style={{ marginTop: "16px" }}>Requirements are precise, and small errors cause delays. We prepare each item to Latvian standards before anything is submitted.</p>
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
              <p style={{ textAlign: "center", color: "var(--muted-2)", fontSize: "13.5px", marginTop: "26px" }}>
                A precise, personalised checklist is issued during your consultation.
              </p>
            </div>
          </section>

          {/* ============================ FAMILY INCLUSION ============================ */}
          <section className="section section--sand" id="family">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Eligible Applicants &amp; Family</span>
                <h2 className="display">One application,<br />your family included</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>One application can extend residence to a spouse and dependent children, on the same terms as the main applicant.</p>
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
                  <h2 className="display">Latvia's reinvested-<br />profit tax advantage</h2>
                  <p className="lede" style={{ marginTop: "16px" }}>Latvia does not charge corporate income tax on profits that a company reinvests into itself — capital simply keeps compounding inside the business.</p>
                  <p style={{ color: "var(--muted)" }}>The standard 20% corporate rate only applies once profits are actually distributed to shareholders as dividends, giving founders meaningful control over the timing of their tax exposure. Combined with a skilled, multilingual and cost-effective workforce and Latvia's position at the crossroads of Northern and Eastern Europe, this makes the country an efficient base from which to operate across the EU's single market.</p>
                </Reveal>
                <Reveal className="split__panel">
                  <div className="factline"><span className="factline__n">✓</span><div><div className="factline__t">Corporate tax on reinvested profits</div><div className="factline__d">0% — capital reinvested into the business is not taxed.</div></div></div>
                  <div className="factline"><span className="factline__n">!</span><div><div className="factline__t">Corporate tax once profits are distributed</div><div className="factline__d">20% applies only once profits are paid out as dividends.</div></div></div>
                  <div className="factline"><span className="factline__n">✓</span><div><div className="factline__t">Indicative real estate rental yields</div><div className="factline__d">Up to roughly 9%, depending on the property and location.</div></div></div>
                  <div className="factline"><span className="factline__n">✓</span><div><div className="factline__t">Indicative bank deposit annual return</div><div className="factline__d">Up to roughly 3% under the subordinated-bond route.</div></div></div>
                </Reveal>
              </div>
              <Reveal className="disclaimer">
                <strong>Not tax advice.</strong> The above is a general summary of publicly available information and does not constitute tax, legal or financial advice. Personal and corporate tax outcomes depend on individual circumstances and current Latvian law. Langma International is not a tax adviser; confirm your position with a qualified Latvian professional.
              </Reveal>
            </div>
          </section>

          {/* ============================ WHY LANGMA ============================ */}
          <section className="section section--navy" id="langma">
            <div className="wrap">
              <div className="split" style={{ alignItems: "center" }}>
                <Reveal>
                  <span className="eyebrow">Why Langma International</span>
                  <h2 className="display">A trusted partner for a<br />process that deserves care</h2>
                  <p className="lede" style={{ marginTop: "18px" }}>We help investors and families access European residency through transparent guidance, careful compliance and genuinely personalised support — never overpromising, never guaranteeing outcomes we cannot control.</p>
                  <p style={{ color: "var(--muted)" }}>From your first conversation to your collected residence card, you work with people who understand both the regulation and the human reality of moving capital, and sometimes a whole family, into a new country.</p>
                </Reveal>
                <Reveal>
                  <div className="langma__stats">
                    <div className="langma__stat stats-card-shimmer"><div className="n">2012</div><div className="l">Established</div></div>
                    <div className="langma__stat stats-card-shimmer"><div className="n">100,000+</div><div className="l">Candidates Trained</div></div>
                    <div className="langma__stat stats-card-shimmer"><div className="n">40+</div><div className="l">Languages</div></div>
                    <div className="langma__stat stats-card-shimmer"><div className="n">Global</div><div className="l">Reach &amp; Staffing</div></div>
                  </div>
                  <p style={{ color: "var(--muted-2)", fontSize: "13px", marginTop: "22px", lineHeight: "1.6" }}>
                    Figures reflect Langma International's wider institutional experience across language, training and global-mobility services. Legal immigration processing in Latvia is carried out by trusted partners with whom we coordinate.
                  </p>
                </Reveal>
              </div>

              <div className="grid grid-3" style={{ marginTop: "52px" }}>
                {LANGMA_CAPABILITIES.map((c) => (
                  <Reveal key={c.title} className="card hover-card">
                    <h3 style={{ fontSize: "1.35rem" }}>{c.title}</h3>
                    <p>{c.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ PROGRAMME COMPARISON ============================ */}
          <section className="section section--sand" id="compare">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Programme Comparison</span>
                <h2 className="display">Could Latvia's Golden Visa<br />Help You Reach Your Goals?</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>See how a Latvia Golden Visa measures up against Italy, Greece and Portugal's residence-by-investment routes — from entry-level thresholds to residence validity, processing speed and the road toward citizenship.</p>
              </Reveal>

              <Reveal className="compare-wrap" style={{ marginTop: "48px" }}>
                <table className="compare">
                  <caption>Figures reflect publicly available programme information as of mid-2026 and are subject to change by the relevant governments; always confirm current terms before deciding.</caption>
                  <thead>
                    <tr>
                      <th scope="col">Criteria</th>
                      <th scope="col" className="hl">Latvia</th>
                      <th scope="col">Italy</th>
                      <th scope="col">Greece</th>
                      <th scope="col">Portugal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((r) => (
                      <tr key={r.label}>
                        <th scope="row">{r.label}</th>
                        <td className="hl">{r.latvia}</td>
                        <td>{r.italy}</td>
                        <td>{r.greece}</td>
                        <td>{r.portugal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
              <p style={{ textAlign: "center", color: "var(--muted-2)", fontSize: "13px", marginTop: "18px" }}>
                Citizenship timelines are indicative and depend on continuous lawful residence, language and integration requirements, and the immigration rules in force at the time of application. This comparison is informational and not immigration advice.
              </p>
            </div>
          </section>

          {/* ============================ FAQ ============================ */}
          <section className="section" id="faq">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Frequently Asked Questions</span>
                <h2 className="display">Clear answers,<br />accurately stated</h2>
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
          <section className="section" id="book">
            <div className="wrap">
              <Reveal className="head head--center">
                <span className="eyebrow eyebrow--center">Book a Consultation</span>
                <h2 className="display">Begin with a private,<br />no-obligation conversation</h2>
                <p className="lede" style={{ margin: "16px auto 0" }}>Choose a time that suits you, or send us a note. A senior advisor will compare your investment options and outline a realistic path forward.</p>
              </Reveal>

              <Reveal className="book" style={{ marginTop: "52px" }}>
                {/* Calendar */}
                <div className="panel">
                  <h3>Select a date &amp; time</h3>
                  <p className="panel__sub">Consultations run Monday to Saturday. All times shown in India Standard Time (IST), local to our advisory office.</p>
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
                      <h3>Request a private consultation</h3>
                      <p className="panel__sub">We typically respond within one business day. Everything you share is treated in strict confidence.</p>
                      <form ref={formRef} noValidate onSubmit={(e) => submitConsultation(e, { selectedDate, selectedTime })}>
                        {errorMsg && (
                          <p role="alert" style={{ color: "#b91c1c", fontSize: 13, marginBottom: 14, padding: "10px 14px", background: "#fef2f2", borderRadius: 8, border: "1px solid #fecaca" }}>{errorMsg}</p>
                        )}
                        <div className="field-2">
                          <div className="field"><label htmlFor="fFirst">First name</label><input id="fFirst" name="firstName" type="text" autoComplete="given-name" required placeholder="First name" /></div>
                          <div className="field"><label htmlFor="fLast">Last name</label><input id="fLast" name="lastName" type="text" autoComplete="family-name" required placeholder="Last name" /></div>
                        </div>
                        <div className="field"><label htmlFor="fEmail">Email address</label><input id="fEmail" name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></div>
                        <div className="field-2">
                          <div className="field"><label htmlFor="fPhone">Phone</label><input id="fPhone" name="phone" type="tel" autoComplete="tel" placeholder="+ Country code" /></div>
                          <div className="field"><label htmlFor="fCountry">Country of residence</label><input id="fCountry" name="country" type="text" autoComplete="country-name" placeholder="e.g. India" /></div>
                        </div>
                        <div className="field">
                          <label htmlFor="fRoute">Preferred investment route</label>
                          <select id="fRoute" name="route" defaultValue="">
                            <option value="">Please select</option>
                            <option>Business — share capital investment</option>
                            <option>Real estate purchase</option>
                            <option>Bank deposit</option>
                            <option>Not yet decided</option>
                          </select>
                        </div>
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