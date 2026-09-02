import { useState, useRef, useEffect } from "react";
import API_BASE from "../../config";

// Cultural activities and experiences carousel
const ACTIVITIES = [
  {
    title: "Seollal Celebration",
    tag: "Tradition",
    text: "Our Seollal celebration began with a graceful Korean Fan Dance, traditional hanbok, and a joyful exploration of the customs and festive spirit of the Korean New Year.",
    image: "images/KOREANNY5.png",
    alt: "Students celebrating Seollal in colorful traditional Korean hanbok",
  },
  {
    title: "Jegi",
    tag: "Traditional Game",
    text: "The excitement continued with the traditional Korean game Jegi, as students enthusiastically joined in for a lively challenge filled with balance, coordination, and fun.",
    image: "images/KOREANNY1.png",
    alt: "Students participating in a traditional Korean Jegi game",
  },
  {
    title: "Cultural Drama",
    tag: "Performance",
    text: "Through a heartfelt drama performance, our students beautifully portrayed friendship, invitations, respect for elders, and the richness of Korean culture.",
    image: "images/KOREANNY2.png",
    alt: "Students performing a Korean cultural drama",
  },
  {
    title: "K-Pop Dance",
    tag: "Performance",
    text: "Our celebration continued with an energetic K-Pop dance performance, where students lit up the stage with synchronized moves and vibrant spirit.",
    image: "images/KOREANNY3.png",
    alt: "Students performing a K-Pop dance at a Korean cultural celebration",
  },
  {
    title: "Takchi",
    tag: "Traditional Game",
    text: "The fun carried on with Takchi, a traditional Korean game that brought out teamwork, excitement, and plenty of cheerful moments among the students.",
    image: "images/KOREANNY4.png",
    alt: "Students enjoying the traditional Korean game Takchi",
  },
];
// Korean language certification exam badges shown in the hero exam strip
const EXAM_BADGES = [
  {
    code: "TOPIK",
    subtitle: "Level 1–6, Worldwide",
    ring: "#003478",
    accent: "#171B22",
    letter: "T",
  },
  {
    code: "EPS-TOPIK",
    subtitle: "E-9 Visa Korean",
    ring: "#16418C",
    accent: "#CD2E3A",
    letter: "E",
  },
  {
    code: "KLAT",
    subtitle: "Level 1–5, Yearly",
    ring: "#1a1a2e",
    accent: "#16418C",
    letter: "K",
    official: true,
  },
  {
    code: "KLPT",
    subtitle: "Practical & Business",
    ring: "#C9A24C",
    accent: "#171B22",
    letter: "L",
  },
  {
    code: "BKT",
    subtitle: "B1–B5+ Business",
    ring: "#003A70",
    accent: "#CD2E3A",
    letter: "B",
  },
  {
    code: "KIIP",
    subtitle: "Integration & PR",
    ring: "#6B2D5C",
    accent: "#171B22",
    letter: "K",
  },
];

// Proficiency ladder infographic data (TOPIK 1-6)
const LEVEL_LADDER = [
  { code: "1", name: "Foundations", pct: 20 },
  { code: "2", name: "Everyday Korean", pct: 34 },
  { code: "3", name: "Bridging Level", pct: 50 },
  { code: "4", name: "Upper-Intermediate", pct: 68 },
  { code: "5", name: "Near-Native", pct: 85 },
  { code: "6", name: "Beyond Level 6", pct: 100 },
];

// Cumulative self-study hours to reach each TOPIK level (commonly cited estimates)
const STUDY_HOURS = [
  { level: "Lv 1", hrs: "50 hrs", pct: 15 },
  { level: "Lv 2", hrs: "50 hrs", pct: 28 },
  { level: "Lv 3", hrs: "50 hrs", pct: 45 },
  { level: "Lv 4", hrs: "50 hrs", pct: 65 },
  { level: "Lv 5", hrs: "50 hrs", pct: 85 },
  { level: "Lv 6", hrs: "50 hrs", pct: 100 },
];

// Reused activity photography for the language-facts and modes sections
const PHOTOS = {
  hanbok: "https://images.unsplash.com/photo-1506480932912-dbbe35e3e516?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  streetFood: "https://images.unsplash.com/photo-1750548006629-16f691ff97f6?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  gyeongbokgung: "images/pp.png",
  conversation: "https://images.unsplash.com/photo-1758270705290-62b6294dd044?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  traditionalDress: "images/people.jpeg?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  epsWorker: "images/Skilled_Worker.jpeg?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  seoulBusiness: "images/Engineers.jpeg?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  koreanCampus: "images/study_korea.jpeg?fm=jpg&q=80&w=1200&auto=format&fit=crop",
};

export default function LangmaKoreanCourse() {
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

  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const slideCount = Math.max(1, ACTIVITIES.length - slidesPerView + 1);

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
    setSlideIndex((i) => Math.min(i, Math.max(0, ACTIVITIES.length - slidesPerView)));
  }, [slidesPerView]);

  useEffect(() => {
    if (isPaused) return;
    const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
    const timer = setInterval(() => {
      setSlideIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [slidesPerView, isPaused]);

  function goToSlide(i) {
    const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
    setSlideIndex(Math.min(Math.max(i, 0), maxIndex));
  }
  function nextSlide() {
    const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
    setSlideIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }
  function prevSlide() {
    const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
    setSlideIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  }
  function handleTouchMove(e) {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }
  function handleTouchEnd() {
    if (Math.abs(touchDeltaX.current) > 45) {
      if (touchDeltaX.current < 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
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
    formData.set("language", "Korean");
    if (!formData.get("message")) {
      formData.set("message", "Korean Language Course enquiry");
    }

    try {
      const res = await fetch(`${API_BASE}/apply-submit`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        setMessage("Thanks, our counsellor will call you shortly. For an instant reply, message us on WhatsApp.");
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
            message: formData.get("message") || "Korean Language Course enquiry",
            type: "Korean Landing",
            service: "Language Training - Korean",
          }),
        });
        if (fallback.ok) {
          setSubmitted(true);
          setMessage("Thanks, our counsellor will call you shortly. For an instant reply, message us on WhatsApp.");
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
  const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
  const dotCount = maxIndex + 1;

  return (
    <div className="langma-page" id="top">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  :root{
    --header-h:74px;
    --ink:#171B22;
    --paper:#FAF7F0;
    --paper-2:#F0E8D8;
    --prussian:#16418C;
    --prussian-deep:#0A2456;
    --gold:#C9A24C;
    --gold-soft:#F4E8C6;
    --rust:#C8262F;
    --rust-deep:#9E1D26;
    --line: rgba(23,27,34,0.14);
    --line-soft: rgba(23,27,34,0.07);
    --white:#FFFFFF;
    --kr-red:#CD2E3A;
    --kr-blue:#003478;
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
  .reduced-motion, .no-anim{transition:none !important; animation:none !important;}

  /* ===== HEADER ===== */
  .kr-header{background:rgba(250,247,240,.96); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); position:fixed; top:0; left:0; right:0; width:100%; height:var(--header-h); z-index:80; box-shadow:0 4px 18px rgba(23,27,34,.08);}
  .kr-nav{min-height:74px; display:flex; align-items:center; justify-content:space-between; gap:24px;}
  .kr-brand{display:flex; align-items:center; text-decoration:none;}
  .kr-brand-text{display:flex; align-items:center; width:200px; min-width:150px; height:46px;}
  .kr-brand-logo{width:100%; height:100%; object-fit:contain; object-position:left center; display:block;}
  .kr-menu{display:flex; align-items:center; gap:18px; flex-wrap:wrap;}
  .kr-menu .kr-cta{background:var(--rust); color:#fff; padding:11px 18px; border-radius:3px; font-size:13px; font-weight:600; text-decoration:none; transition:background .18s ease, transform .18s ease;}
  .kr-menu .kr-cta:hover{background:#9E1D26; transform:translateY(-1px);}
  @media (max-width:720px){ .kr-nav{min-height:66px; height:66px;} .kr-brand-text{width:150px; min-width:130px; height:38px;} :root{--header-h:66px;} }
  @media (max-width:480px){ .kr-nav{gap:12px;} .kr-brand-text{width:120px; min-width:96px; height:34px;} .kr-menu .kr-cta{padding:9px 13px; font-size:11.5px;} }

  /* ===== TOPBAR ===== */
  .topbar{background:var(--prussian-deep); color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:12.5px; margin-top:var(--header-h);}
  .topbar .wrap{display:flex; justify-content:flex-end; align-items:center; padding:9px 32px; gap:16px; flex-wrap:wrap;}
  .topbar-links{display:flex; gap:22px; flex-wrap:wrap;}
  .topbar-links a{display:inline-flex; align-items:center; gap:6px; text-decoration:none; opacity:.92;}
  .topbar-links a:hover{opacity:1; text-decoration:underline;}

  /* ===== BUTTONS ===== */
  .btn{font-family:'IBM Plex Sans', sans-serif; font-weight:600; font-size:14px; padding:11px 20px; border-radius:3px; border:1.5px solid transparent; display:inline-flex; align-items:center; gap:8px; cursor:pointer; text-decoration:none; white-space:nowrap; transition:transform .18s ease, box-shadow .18s ease, background .18s ease; max-width:100%;}
  .btn-primary{background:var(--rust); color:var(--white);}
  .btn-primary:hover{transform:translateY(-2px); box-shadow:0 8px 18px rgba(200,38,47,.35);}
  .btn-ghost{background:transparent; border-color:var(--ink); color:var(--ink);}
  .btn-ghost:hover{background:var(--ink); color:var(--paper);}
  .btn-wa{background:#25D366; color:#08350F;}
  .btn-wa:hover{transform:translateY(-2px); box-shadow:0 8px 18px rgba(37,211,102,.4);}
  .btn-sm{padding:9px 15px; font-size:13px;}

  /* ===== HERO ===== */
  .hero{--hero-paper:#FCFBF8; --hero-blue:#003478; --hero-blue-deep:#0A2456; --hero-red:#CD2E3A; --hero-ink:#171B22; position:relative; overflow:hidden; border-bottom:1px solid rgba(0,52,120,.16); max-width:100vw; padding:0; background:linear-gradient(135deg, var(--hero-paper) 0%, #FFFFFF 58%, #F0F4FA 100%); color:var(--hero-ink);}
  .hero::before{content:''; position:absolute; width:520px; height:520px; right:-210px; top:-190px; border-radius:50%; background:radial-gradient(circle at 38% 42%, rgba(205,46,58,.14) 0 18%, transparent 18.5%), radial-gradient(circle at 62% 58%, rgba(0,52,120,.13) 0 18%, transparent 18.5%); transform:rotate(-18deg); pointer-events:none;}
  .hero::after{content:''; position:absolute; left:0; right:0; bottom:0; height:5px; background:linear-gradient(90deg, var(--hero-blue) 0 48%, var(--hero-red) 48% 100%); opacity:.9; pointer-events:none;}

  .hero-inner{position:relative; z-index:2; display:grid; grid-template-columns:1.15fr .85fr; gap:40px; padding:56px 32px 40px; max-width:1180px; margin:0 auto; align-items:center;}
  .hero-inner > div{min-width:0;}
  .hero-kicker{display:inline-flex; align-items:center; gap:8px; font-family:'IBM Plex Mono', monospace; font-size:11.5px; font-weight:500; text-transform:uppercase; letter-spacing:.12em; color:var(--hero-red); margin-bottom:14px;}
  .hero-kicker::before{content:''; width:24px; height:1.5px; background:var(--hero-red); display:inline-block; flex-shrink:0;}
  .hero-title{font-size:clamp(32px, 4.8vw, 64px); line-height:1.05; margin:18px 0 22px; word-break:break-word; color:var(--hero-ink);}
  .hero-title em{font-style:italic; color:var(--hero-blue); font-weight:500;}
  .hero-sub{font-size:17.5px; max-width:540px; color:#333944; margin-bottom:22px;}
  .hero-keywords{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:26px;}
  .hero-keywords span{font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:.05em; text-transform:uppercase; background:rgba(0,52,120,.07); color:var(--hero-blue-deep); padding:5px 10px; border-radius:2px; border:1px solid rgba(0,52,120,.14);}
  .hero-keywords .hero-keyword-highlight{background:var(--hero-red); color:var(--white); border-color:var(--hero-red);}
  .hero-actions{display:flex; gap:14px; flex-wrap:wrap; margin-bottom:30px;}
  .hero-stats{display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); column-gap:0; row-gap:16px; border-top:1px solid rgba(0,52,120,.16); padding-top:22px;}
  .stat{padding-right:18px; margin-right:18px; border-right:1px solid var(--line); min-width:0;}
  .stat:last-child{border-right:none; margin-right:0; padding-right:0;}
  .stat{display:flex; align-items:flex-start; gap:10px;}
  .stat-icon{width:36px; height:36px; border-radius:50%; border:1.5px solid var(--hero-red); color:var(--hero-red); background:rgba(255,255,255,.78); display:flex; align-items:center; justify-content:center; flex-shrink:0;}
  .stat-icon svg{width:16px; height:16px; display:block;}
  .stat-text{display:flex; flex-direction:column; min-width:0;}
  .stat b{font-family:'Fraunces', serif; font-size:26px; display:block; color:var(--hero-blue); font-weight:700; white-space:nowrap;}
  .stat span{font-size:12px; color:#4B5058; font-family:'IBM Plex Mono', monospace; letter-spacing:.03em; line-height:1.25;}

  /* Ticket visual */
  .ticket{background:var(--hero-blue-deep); color:var(--white); border-radius:6px; padding:0; position:relative; box-shadow:0 30px 60px -20px rgba(0,52,120,.4); overflow:hidden; width:100%; max-width:100%; transition:transform .35s ease;}
  .ticket:hover{transform:rotate(0deg);}
  .ticket::before{content:''; position:absolute; top:0; left:0; right:0; height:6px; background:repeating-linear-gradient(90deg, var(--hero-red) 0 14px, transparent 14px 24px);}
  .ticket-top{padding:28px 26px 22px; border-bottom:1px dashed rgba(255,255,255,.28); position:relative;}
  .ticket-notch{position:absolute; width:22px; height:22px; background:var(--paper); border-radius:50%; bottom:-11px;}
  .ticket-notch.left{left:-11px;} .ticket-notch.right{right:-11px;}
  .ticket-route{display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; gap:8px; flex-wrap:wrap;}
  .ticket-route .city{font-family:'Fraunces', serif; font-size:22px; font-weight:600;}
  .ticket-route .arrow{font-family:'IBM Plex Mono', monospace; color:var(--gold-soft); font-size:12px; text-align:center;}
  .ticket-route .sub{font-family:'IBM Plex Mono', monospace; font-size:10.5px; opacity:.65; letter-spacing:.08em; text-transform:uppercase; margin-top:3px;}
  .ticket-meta{display:flex; justify-content:space-between; gap:16px; margin-bottom:18px; padding-bottom:16px; border-bottom:1px dashed rgba(255,255,255,.2);}
  .ticket-meta-item{display:flex; flex-direction:column; gap:3px;}
  .ticket-meta-label{font-family:'IBM Plex Mono', monospace; font-size:9.5px; text-transform:uppercase; letter-spacing:.08em; color:rgba(255,255,255,.5);}
  .ticket-meta-value{font-family:'IBM Plex Sans', sans-serif; font-size:13px; font-weight:600; color:var(--gold-soft);}
  .ticket-form-head{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--gold-soft); margin-bottom:14px;}
  .ticket-form .form-row{margin-bottom:12px;}
  .ticket-form-row{display:grid; grid-template-columns:1fr 1fr; gap:0 12px;}
  .ticket-form-row > .form-row{min-width:0;}
  .ticket-bottom{padding:18px 26px 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;}
  .ticket-bottom .barcode{display:flex; gap:2px; align-items:flex-end; height:32px;}
  .ticket-bottom .barcode i{display:block; width:2.5px; background:var(--gold-soft); opacity:.85;}
  .ticket-rating{font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--gold-soft);}

  /* ===== EXAM BADGES STRIP (Korean certification logos) ===== */
  .exam-strip{position:relative; z-index:2; background:linear-gradient(180deg, rgba(22,65,140,.04) 0%, var(--paper) 100%); border-top:1px dashed var(--line); padding:30px 0 40px; max-width:100vw; overflow:hidden;}
  .exam-strip .exam-head{text-align:center; margin-bottom:22px;}
  .exam-strip .exam-head .kicker{font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--rust); margin-bottom:6px; display:block;}
  .exam-strip .exam-head h3{font-family:'Fraunces', serif; font-size:clamp(20px, 2.4vw, 26px); color:var(--prussian-deep); font-weight:600; line-height:1.25;}
  .exam-strip .exam-head h3 em{font-style:italic; color:var(--rust);}
  .exam-row{display:flex; justify-content:center; align-items:center; gap:26px; flex-wrap:nowrap; overflow-x:auto; padding:6px 0; -webkit-overflow-scrolling:touch;}
  .exam-badge{display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none; color:inherit; transition:transform .22s ease;}
  .exam-badge:hover{transform:translateY(-4px);}
  .exam-badge .badge-circle{
    width:78px; height:78px; border-radius:50%; background:var(--white);
    display:flex; align-items:center; justify-content:center; position:relative;
    box-shadow:0 6px 14px -6px rgba(23,27,34,.18), 0 0 0 1px var(--line);
    overflow:hidden;
  }
  .exam-badge .badge-circle::before{
    content:''; position:absolute; inset:3px; border-radius:50%;
    border:2px solid var(--ring, var(--prussian));
    background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.9), rgba(240,232,216,.6));
  }
  .exam-badge .badge-inner{
    position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center;
    width:100%; height:100%;
  }
  .exam-badge .badge-letter{
    font-family:'Fraunces', serif; font-weight:700; font-size:24px;
    color:var(--ring, var(--prussian-deep)); line-height:1;
    text-shadow:0 1px 0 rgba(255,255,255,.6);
  }
  .exam-badge .badge-code{
    font-family:'IBM Plex Sans', sans-serif; font-size:9px; font-weight:700;
    letter-spacing:.06em; color:var(--accent, #171B22); margin-top:3px; text-transform:uppercase;
  }
  .exam-badge .badge-code.wide{letter-spacing:.02em;}
  .exam-badge .badge-flag{
    position:absolute; top:7px; left:50%; transform:translateX(-50%);
    width:15px; height:15px; border-radius:50%; background:#fff;
    border:1.5px solid var(--kr-blue); z-index:3; box-shadow:0 1px 2px rgba(0,0,0,.15);
    display:flex; align-items:center; justify-content:center;
  }
  .exam-badge .badge-flag i{display:block; width:7px; height:7px; border-radius:50%; background:linear-gradient(180deg, var(--kr-red) 0 50%, var(--kr-blue) 50% 100%);}
  .exam-badge .badge-caption{
    font-family:'IBM Plex Mono', monospace; font-size:10.5px; letter-spacing:.04em;
    color:#4B5058; text-align:center; max-width:96px; line-height:1.3;
  }
  .exam-badge .badge-caption b{color:var(--prussian-deep); font-weight:600; font-family:'IBM Plex Sans', sans-serif;}
  .exam-badge .badge-official{display:inline-block; font-family:'IBM Plex Mono', monospace; font-size:8.5px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:var(--white); background:var(--rust); padding:3px 8px; border-radius:99px; white-space:nowrap;}

  /* ===== SECTION HEADS ===== */
  section{padding:64px 0; max-width:100vw; overflow-x:hidden;}
  .sec-head{max-width:660px; margin-bottom:40px;}
  .sec-head h2{font-size:clamp(28px,3.4vw,42px); line-height:1.08;}
  .sec-head p{color:#3A3F48; font-size:16px; margin-top:12px; max-width:580px;}
  .sec-head-row{display:flex; align-items:center; justify-content:flex-start; gap:32px; margin-bottom:40px;}
  .sec-head-row .sec-head{margin-bottom:0;}
  .sec-icon-big{flex-shrink:0; width:108px; height:108px; color:var(--rust); opacity:.9;}
  .sec-icon-big svg{width:100%; height:100%;}
  @media (max-width:720px){ .sec-head-row{gap:16px;} .sec-icon-big{width:60px; height:60px;} }

  /* ===== COURSE FACTS (richer quick-facts style) ===== */
  .course-facts{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .course-facts-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:5px; overflow:hidden;}
  .course-fact{background:var(--white); padding:24px 22px; min-width:0;}
  .course-fact .fact-label{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--rust); margin-bottom:7px;}
  .course-fact b{font-family:'Fraunces', serif; font-size:20px; line-height:1.2; color:var(--prussian-deep); display:block;}
  .course-fact span{display:block; font-size:12.5px; color:#4B5058; margin-top:6px; line-height:1.4;}
  .course-facts-cta{margin-top:22px; display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap; padding:18px 20px; background:var(--prussian-deep); color:var(--white); border-radius:5px;}
  .course-facts-cta p{font-size:13.5px; color:rgba(255,255,255,.75); margin:0; max-width:650px;}
  .course-facts-cta .btn{flex-shrink:0;}

  /* ===== AUDIENCE NUM LABEL ===== */
  .audience-num{font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:.08em; font-size:10px; color:var(--rust); margin-bottom:17px;}

  /* ===== WHAT YOU'LL LEARN ===== */
  .skills-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line);}
  .skill-stamp{background:var(--white); padding:30px 24px; position:relative; min-width:0;}
  .skill-stamp .skill-native{font-family:'Fraunces', serif; font-style:italic; font-size:22px; color:var(--prussian); margin-bottom:4px;}
  .skill-stamp .skill-en{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--rust); margin-bottom:14px; display:block;}
  .skill-stamp p{font-size:13.6px; color:#3A3F48;}

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

  /* ===== LEVEL LADDER CHART ===== */
  .level-chart{display:flex; align-items:flex-end; gap:clamp(8px,1.6vw,18px); height:180px; margin:8px 0 44px; padding:0 2px;}
  .level-col{flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%; min-width:0;}
  .level-bar{width:100%; max-width:70px; border-radius:5px 5px 2px 2px; background:linear-gradient(180deg, var(--gold) 0%, var(--rust) 100%); position:relative; box-shadow:0 6px 14px -6px rgba(0,0,0,.5);}
  .level-bar b{position:absolute; top:-24px; left:50%; transform:translateX(-50%); font-family:'IBM Plex Mono', monospace; font-size:12px; color:var(--gold-soft); white-space:nowrap; letter-spacing:.04em;}
  .level-pct{position:absolute; bottom:6px; left:50%; transform:translateX(-50%); font-family:'IBM Plex Mono', monospace; font-size:9.5px; color:rgba(10,8,7,.55); white-space:nowrap;}
  .level-name{margin-top:12px; font-family:'IBM Plex Sans', sans-serif; font-size:11.5px; font-weight:600; color:rgba(255,255,255,.85); text-align:center; line-height:1.3;}
  @media (max-width:720px){ .level-chart{height:150px;} .level-bar b{font-size:10.5px; top:-20px;} .level-name{font-size:10px;} }

  /* ===== LANGUAGE FACTS ===== */
  .lang-facts{background:var(--paper); border-top:1px solid var(--line);}
  .lang-inner{display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start;}
  .lang-inner > div{min-width:0;}
  .lang-copy p{color:#333944; font-size:15.5px; margin-bottom:16px; max-width:480px;}
  .lang-copy p:last-child{margin-bottom:0;}
  .lang-photo{border-radius:5px; overflow:hidden; border:1px solid var(--line); box-shadow:0 20px 40px -22px rgba(20,17,16,.4); position:relative; aspect-ratio:12/10; margin-bottom:20px;}
  .lang-photo img{width:100%; height:100%; object-fit:cover; display:block;}
  .lang-photo::after{content:''; position:absolute; inset:0; background:linear-gradient(180deg, transparent 55%, rgba(10,8,7,.68) 100%);}
  .lang-photo .lang-photo-cap{position:absolute; left:16px; right:16px; bottom:14px; z-index:2; color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.05em;}
  .fact-strip{display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--line); border:1px solid var(--line); margin-top:8px;}
  .fact-box{background:var(--white); padding:24px 22px; min-width:0;}
  .fact-box b{font-family:'Fraunces', serif; font-size:28px; display:block; color:var(--prussian); font-weight:700; line-height:1;}
  .fact-box span{font-size:12.5px; color:#4B5058; display:block; margin-top:8px; line-height:1.4;}
  .cognates{margin-top:26px; border:1px solid var(--line); border-radius:4px; overflow:hidden; background:var(--white);}
  .cognates-head{display:grid; grid-template-columns:1fr 1fr 1fr; background:var(--prussian); color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:.06em; text-transform:uppercase;}
  .cognates-head div{padding:10px 14px; min-width:0;}
  .cognate-row{display:grid; grid-template-columns:1fr 1fr 1fr; border-top:1px solid var(--line); font-size:14px;}
  .cognate-row div{padding:11px 14px; min-width:0; overflow-wrap:break-word;}
  .cognate-row div:first-child{font-weight:600; font-family:'Fraunces', serif; font-style:italic;}
  .cognate-row div:last-child{color:#4B5058; font-size:13px;}
  .career-icons{display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:22px;}
  .career-icon-item{display:flex; flex-direction:column; align-items:center; gap:9px; text-align:center; min-width:0;}
  .career-icon-circle{width:50px; height:50px; border-radius:50%; background:var(--prussian-deep); color:var(--gold); display:flex; align-items:center; justify-content:center; flex-shrink:0;}
  .career-icon-item span{font-family:'IBM Plex Mono', monospace; font-size:9.5px; color:#4B5058; letter-spacing:.02em; line-height:1.3;}
  @media (max-width:480px){ .career-icons{grid-template-columns:repeat(2,1fr); gap:18px;} }

  /* ===== FEATURES ===== */
  .features-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:1px; background:var(--line); border:1px solid var(--line);}
  .feature{background:var(--paper); padding:36px 30px; min-width:0;}
  .feature .fnum{font-family:'IBM Plex Mono', monospace; font-size:12px; color:var(--rust); letter-spacing:.08em;}
  .feature h3{font-size:21px; margin:14px 0 10px; font-weight:600;}
  .feature p{font-size:14.3px; color:#3A3F48;}

  /* ===== STUDY HOURS ===== */
  .study-hours{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .hours-chart{display:flex; flex-direction:column; gap:20px; max-width:840px;}
  .hours-row{display:grid; grid-template-columns:56px 1fr 108px; align-items:center; gap:18px;}
  .hours-level{font-family:'Fraunces', serif; font-weight:700; font-size:19px; color:var(--ink);}
  .hours-track{height:14px; background:var(--white); border:1px solid var(--line); border-radius:999px; overflow:hidden; position:relative;}
  .hours-bar{height:100%; background:linear-gradient(90deg, var(--rust), var(--gold)); border-radius:999px; transition:width .4s ease;}
  .hours-value{font-family:'IBM Plex Mono', monospace; font-size:12.5px; color:var(--prussian-deep); text-align:right; white-space:nowrap;}
  .hours-note{font-size:12.5px; color:#4B5058; margin-top:20px; max-width:640px;}

  /* ===== MODES ===== */
  .modes{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .modes-photo{width:100%; height:450px; object-fit:cover; border-radius:5px; margin-bottom:34px; border:1px solid var(--line); box-shadow:0 14px 34px -14px rgba(23,27,34,.32);}
  .modes-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:24px;}
  .mode-card{background:var(--white); border:1px solid var(--line); border-radius:4px; padding:0; position:relative; overflow:hidden; min-width:0;}
  .mode-card::after{content:''; position:absolute; top:0; left:0; width:4px; height:100%; background:var(--gold); z-index:2;}
  .mode-photo{width:100%; aspect-ratio:16/9; overflow:hidden;}
  .mode-photo img{width:100%; height:100%; object-fit:cover; display:block;}
  .mode-body{padding:24px 28px 28px;}
  .mode-card h3{font-size:20px; margin-bottom:10px;}
  .mode-card p{font-size:14px; color:#3A3F48; margin-bottom:16px;}
  .mode-tag{font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); background:rgba(22,65,140,.08); padding:4px 9px; border-radius:2px; display:inline-block;}

  /* ===== PATHWAYS ===== */
  .pathways{background:var(--prussian-deep); color:var(--white);}
  .pathways .sec-head h2{color:var(--white);}
  .pathways .sec-head p{color:rgba(255,255,255,.68);}
  .path-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:22px;}
  .path-card{background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.14); border-radius:6px; padding:0; position:relative; overflow:hidden; min-width:0;}
  .path-photo{width:100%; aspect-ratio:9/10; overflow:hidden;}
  .path-photo img{width:100%; height:100%; object-fit:cover; display:block;}
  .path-body{padding:26px 26px 30px;}
  .path-card .path-icon{width:46px; height:46px; border-radius:50%; background:var(--gold); color:var(--prussian-deep); display:flex; align-items:center; justify-content:center; margin-bottom:20px; flex-shrink:0;}
  .path-card h3{font-size:23px; margin-bottom:6px; color:var(--white);}
  .path-card .path-tag{font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--gold-soft); text-transform:uppercase; letter-spacing:.08em;}
  .path-card ul{margin-top:18px; list-style:none; display:flex; flex-direction:column; gap:12px;}
  .path-card li{display:flex; gap:10px; font-size:14px; color:rgba(255,255,255,.82); line-height:1.5;}
  .path-card li::before{content:'◦'; color:var(--gold); flex-shrink:0;}

  /* ===== FINAL CTA ===== */
  .final-cta{background:var(--prussian-deep); color:var(--white); text-align:center; position:relative; overflow:hidden;}
  .final-cta .kicker{font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--gold-soft);}
  .final-cta h2{font-size:clamp(30px,4vw,48px); margin:14px auto; max-width:760px; color:var(--white);}
  .final-cta p{max-width:650px; margin:0 auto 28px; color:rgba(255,255,255,.7); font-size:16px;}
  .final-cta-actions{display:flex; justify-content:center; gap:12px; flex-wrap:wrap;}
  .final-cta .btn-ghost{border-color:rgba(255,255,255,.45); color:var(--white);}
  .final-cta .btn-ghost:hover{background:var(--white); color:var(--ink);}
  .final-cta .microcopy{font-family:'IBM Plex Mono', monospace; font-size:10.5px; color:rgba(255,255,255,.5); margin-top:18px;}
  @media (max-width:480px){ .final-cta-actions{flex-direction:column; align-items:stretch;} .final-cta-actions .btn{white-space:normal; justify-content:center; text-align:center;} }

  /* ===== FAQ ===== */
  .faq-list{display:flex; flex-direction:column; gap:1px; background:var(--line); border:1px solid var(--line); border-radius:4px; overflow:hidden;}
  .faq-item{background:var(--white); padding:0;}
  .faq-item summary{padding:20px 24px; cursor:pointer; font-weight:600; font-size:15.5px; list-style:none; display:flex; justify-content:space-between; align-items:center; gap:12px;}
  .faq-item summary::-webkit-details-marker{display:none;}
  .faq-item summary::after{content:'+'; font-family:'IBM Plex Mono', monospace; font-size:20px; color:var(--rust); flex-shrink:0; transition:transform .2s ease;}
  .faq-item[open] summary::after{transform:rotate(45deg);}
  .faq-item .faq-a{padding:0 24px 20px; font-size:14.3px; color:#3A3F48; max-width:720px;}

  /* ===== ACTIVITIES CAROUSEL ===== */
  .activities{background:var(--ink); color:var(--white); position:relative; overflow:hidden;}
  .activities .sec-head h2{color:var(--white);}
  .activities .sec-head p{color:rgba(255,255,255,.65);}
  .activity-slider{position:relative;}
  .activity-viewport{overflow:hidden; border-radius:4px;}
  .activity-track{display:flex; align-items:stretch; transition:transform .5s cubic-bezier(.65,0,.35,1); touch-action:pan-y;}
  .activity-slide{flex-shrink:0; padding:0 8px; min-width:0; display:flex;}
  .activity-card{background:linear-gradient(145deg,#15316B,#0A1B3D); border:1px solid rgba(255,255,255,.08); border-radius:4px; width:100%; height:100%; display:flex; flex-direction:column; position:relative; overflow:hidden;}
  .activity-image{width:100%; aspect-ratio:4/4; height:auto; object-fit:contain; object-position:center; display:block; flex-shrink:0; background:#0A1B3D;}
  .activity-image-wrap{position:relative; overflow:hidden; background:#0A1B3D;}
  .activity-image-wrap::after{content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(5,10,20,0) 45%,rgba(5,10,20,.45) 100%); pointer-events:none;}
  .activity-content{padding:18px 18px 20px; position:relative; z-index:2; flex:1; display:flex; flex-direction:column;}
  .activity-content p{margin-top:auto; padding-top:10px;}
  .activity-icon{width:36px; height:36px; border:1.5px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-soft); font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:700; margin-bottom:10px; background:rgba(10,27,61,.92);}
  .activity-tag{font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.08em; color:var(--gold-soft); text-transform:uppercase;}
  .activity-card h3{font-size:17px; color:var(--white); margin:6px 0 9px; font-family:'Fraunces', serif; font-weight:600;}
  .activity-card p{font-size:13px; color:rgba(255,255,255,.72); line-height:1.55; min-height:4.65em; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;}
  .activity-controls{display:flex; align-items:center; justify-content:space-between; margin-top:26px; gap:20px;}
  .activity-arrows{display:flex; gap:10px;}
  .activity-arrow{width:44px; height:44px; border-radius:50%; border:1.5px solid rgba(255,255,255,.25); background:transparent; color:var(--white); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .18s ease, border-color .18s ease, transform .18s ease;}
  .activity-arrow:hover{background:rgba(255,255,255,.1); border-color:var(--gold-soft); transform:translateY(-1px);}
  .activity-dots{display:flex; gap:8px; flex-wrap:wrap;}
  .activity-dot{width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.25); border:none; cursor:pointer; padding:0; transition:width .2s ease, background .2s ease;}
  .activity-dot.active{background:var(--gold); width:22px; border-radius:999px;}
  @media (max-width:720px){ .activity-arrow{width:40px; height:40px;} }

  /* ===== CONTACT ===== */
  .contact{background:var(--paper);}
  .contact-grid{display:grid; grid-template-columns:.95fr 1.05fr; gap:56px; align-items:start;}
  .contact-grid > div{min-width:0;}
  .contact-list{display:flex; flex-direction:column; gap:0; border-top:1px solid var(--line);}
  .contact-row{display:flex; gap:18px; padding:22px 0; border-bottom:1px solid var(--line); align-items:flex-start;}
  .contact-icon{width:42px; height:42px; border-radius:50%; background:var(--prussian); color:var(--white); display:flex; align-items:center; justify-content:center; flex-shrink:0;}
  .contact-row > div:last-child{min-width:0;}
  .contact-row h4{font-size:12px; font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:.08em; color:#5C636E; margin-bottom:5px;}
  .contact-row a, .contact-row div.val{font-size:16.5px; font-weight:600; text-decoration:none; word-break:break-word;}
  .contact-row a:hover{color:var(--rust);}
  .contact-row .note{font-size:13px; color:#4B5058; font-weight:400; margin-top:3px;}
  .social-row{display:flex; gap:12px; margin-top:24px; flex-wrap:wrap;}
  .social-chip{width:38px; height:38px; border-radius:50%; border:1.5px solid var(--ink); display:flex; align-items:center; justify-content:center; text-decoration:none; color:var(--ink); transition:all .2s ease; flex-shrink:0;}
  .social-chip:hover{background:var(--ink); color:var(--paper);}

  .enroll-card{background:var(--prussian); color:var(--white); border-radius:6px; padding:38px 34px; position:relative; overflow:hidden;}
  .enroll-card::before{content:''; position:absolute; top:-60px; right:-60px; width:180px; height:180px; border-radius:50%; background:rgba(201,162,76,.2);}
  .enroll-card h3{font-size:24px; margin-bottom:8px; position:relative;}
  .enroll-card p{font-size:14px; color:rgba(255,255,255,.7); margin-bottom:26px; position:relative;}
  .form-row{margin-bottom:16px; position:relative;}
  .form-row label{display:block; font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.08em; margin-bottom:7px; color:var(--gold-soft);}
  .form-row input{width:100%; padding:12px 14px; border-radius:3px; border:1px solid rgba(255,255,255,.25); background:rgba(255,255,255,.06); color:var(--white); font-family:'IBM Plex Sans', sans-serif; font-size:14.5px;}
  .form-row input::placeholder{color:rgba(255,255,255,.4);}
  .form-row input:focus{outline:2px solid var(--gold); outline-offset:1px; background:rgba(255,255,255,.1);}
  .submit-btn{width:100%; padding:14px; background:var(--rust); color:var(--white); border:none; border-radius:3px; font-weight:600; font-size:15px; cursor:pointer; margin-top:6px; transition:transform .18s ease, background .18s ease; font-family:'IBM Plex Sans', sans-serif;}
  .submit-btn:hover{transform:translateY(-2px); background:#9E1D26;}
  .submit-btn:disabled{opacity:.7; cursor:not-allowed; transform:none;}
  .form-msg{display:block; font-size:13.5px; line-height:1.45; margin-top:14px; padding:12px 14px; border-radius:3px; font-family:'IBM Plex Sans', sans-serif; font-weight:500;}
  .form-msg.success{color:#0f3d2e; background:#d9f5e5; border:1px solid #8fd9b4;}
  .form-msg.error{color:#7a1c1c; background:#fde8e8; border:1px solid #f0b4b4;}
  .form-alt{display:flex; align-items:center; gap:10px; margin-top:20px; padding-top:20px; border-top:1px dashed rgba(255,255,255,.2); flex-wrap:wrap;}

  /* ===== MAP STRIP ===== */
  .map-strip{border-top:1px solid var(--line); border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; padding:22px 0; flex-wrap:wrap; gap:16px;}
  .map-strip a{text-decoration:none; font-weight:600; display:inline-flex; align-items:center; gap:8px;}

  /* ===== FOOTER ===== */
  .kr-footer{background:var(--prussian-deep); color:#fff; position:relative; overflow:hidden; padding:64px 0 30px;}
  .footer-grid{display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; padding-bottom:40px; border-bottom:1px solid rgba(255,255,255,.14);}
  .footer-brand h2{font-family:'Fraunces',serif; font-size:28px; margin-bottom:7px; color:#fff;}
  .footer-logo{height:44px; width:auto; max-width:220px; object-fit:contain; display:block; margin-bottom:14px;}
  .footer-brand .kr-motto{font-family:'IBM Plex Sans',sans-serif; font-style:italic; color:var(--gold-soft); font-size:14px; margin-bottom:15px;}
  .footer-brand p{font-size:13px; color:rgba(255,255,255,.62); max-width:360px;}
  .footer-col h4{font-family:'IBM Plex Sans',sans-serif; color:var(--gold-soft); font-size:13px; margin-bottom:14px; letter-spacing:.04em; text-transform:uppercase;}
  .footer-col a{display:block; text-decoration:none; color:rgba(255,255,255,.68); font-size:13px; margin:9px 0; transition:color .15s ease;}
  .footer-col a:hover{color:#fff;}
  .footer-bottom{display:flex; justify-content:space-between; gap:20px; align-items:center; padding-top:22px; flex-wrap:wrap;}
  .footer-bottom span{font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:rgba(255,255,255,.45);}
  @media (max-width:980px){ .footer-grid{grid-template-columns:1fr 1fr;} .footer-brand{grid-column:1/-1;} }
  @media (max-width:720px){ .footer-grid{grid-template-columns:1fr 1fr; gap:28px;} .footer-brand{grid-column:1/-1;} }
  @media (max-width:480px){ .footer-grid{grid-template-columns:1fr 1fr; gap:20px;} .footer-brand{grid-column:1/-1;} }

  /* ===== FLOATING WHATSAPP ===== */
  .wa-float{position:fixed; bottom:26px; right:26px; z-index:100; width:60px; height:60px; border-radius:50%; background:#25D366; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 26px rgba(37,211,102,.5); text-decoration:none; animation:wa-pulse 2.6s infinite;}
  .wa-float:hover{transform:scale(1.06);}
  @keyframes wa-pulse{0%{box-shadow:0 10px 26px rgba(37,211,102,.5), 0 0 0 0 rgba(37,211,102,.55);} 70%{box-shadow:0 10px 26px rgba(37,211,102,.5), 0 0 0 16px rgba(37,211,102,0);} 100%{box-shadow:0 10px 26px rgba(37,211,102,.5), 0 0 0 0 rgba(37,211,102,0);}}
  .wa-tip{position:fixed; bottom:38px; right:96px; z-index:100; background:var(--ink); color:var(--white); padding:9px 14px; border-radius:5px; font-size:13px; font-weight:500; opacity:0; pointer-events:none; transition:opacity .25s ease; white-space:nowrap;}
  .wa-float:hover + .wa-tip, .wa-tip.show{opacity:1;}

  /* ===== FLOATING CALL ===== */
  .call-float{position:fixed; bottom:26px; left:26px; z-index:100; width:60px; height:60px; border-radius:50%; background:var(--rust); display:flex; align-items:center; justify-content:center; box-shadow:0 10px 26px rgba(200,38,47,.45); text-decoration:none;}
  .call-float:hover{transform:scale(1.06);}
  .call-tip{position:fixed; bottom:38px; left:96px; z-index:100; background:var(--ink); color:var(--white); padding:9px 14px; border-radius:5px; font-size:13px; font-weight:500; opacity:0; pointer-events:none; transition:opacity .25s ease; white-space:nowrap;}
  .call-float:hover + .call-tip{opacity:1;}

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1180px){
    .path-grid{grid-template-columns:1fr 1fr;}
    .wrap{padding:0 24px;}
  }
  @media (max-width: 980px){
    .hero-inner{grid-template-columns:1fr; padding-top:44px;}
    .ticket{max-width:440px; transform:rotate(0deg); margin:0 auto;}
    .features-grid{grid-template-columns:1fr 1fr;}
    .modes-grid{grid-template-columns:1fr;}
    .contact-grid{grid-template-columns:1fr;}
    .rail{grid-template-columns:1fr 1fr; row-gap:36px;}
    .rail::before{display:none;}
    .lang-inner{grid-template-columns:1fr;}
    .path-grid{grid-template-columns:1fr;}
    .fact-strip{grid-template-columns:1fr 1fr;}
    .skills-grid{grid-template-columns:1fr 1fr;}
    .course-facts-grid{grid-template-columns:1fr 1fr;}
    section{padding:52px 0;}
    .exam-row{gap:18px;}
    .exam-badge .badge-circle{width:68px; height:68px;}
    .exam-badge .badge-letter{font-size:21px;}
  }
  @media (max-width: 720px){
    .topbar-links{display:none;}
    .topbar .wrap{justify-content:center; text-align:center;}
    .wrap{padding:0 20px;}
    .features-grid{grid-template-columns:1fr;}
    .hero-inner{padding:28px 20px 32px; gap:28px;}
    .stat{padding-right:18px; margin-right:18px;}
    .rail{grid-template-columns:1fr; row-gap:30px;}
    .ticket-form-row{grid-template-columns:1fr;}
    .skills-grid{grid-template-columns:1fr;}
    .path-grid{grid-template-columns:1fr;}
    .contact-row{gap:14px;}
    .form-row input{font-size:16px;}
    .btn{white-space:normal; text-align:center; justify-content:center;}
    section{padding:42px 0;}
    .sec-head{margin-bottom:28px;}
    .exam-row{gap:14px;}
    .exam-badge .badge-circle{width:60px; height:60px;}
    .exam-badge .badge-letter{font-size:18px;}
    .exam-badge .badge-code{font-size:8px;}
    .exam-badge .badge-caption{font-size:9.5px; max-width:80px;}
    .exam-strip{padding:24px 0 32px;}
    .course-facts-grid{grid-template-columns:1fr;}
    .course-facts-cta{align-items:flex-start;}
    .modes-photo{height:170px;}
  }
  @media (max-width: 480px){
    .hero-title{font-size:clamp(28px, 9vw, 40px);}
    .hero-sub{font-size:15.5px;}
    .hero-stats{grid-template-columns:repeat(2, minmax(0,1fr));}
    .stat{padding-right:14px; margin-right:14px;}
    .stat:nth-child(2n){border-right:none; margin-right:0; padding-right:0;}
    .stat b{font-size:21px;}
    .ticket-top, .ticket-bottom{padding-left:18px; padding-right:18px;}
    .ticket-route .city{font-size:19px;}
    .enroll-card{padding:24px 20px;}
    .path-body{padding:24px 18px;}
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
    .exam-row{gap:12px; justify-content:flex-start; overflow-x:auto; flex-wrap:nowrap; padding:6px 4px 10px; -webkit-overflow-scrolling:touch;}
    .exam-badge{flex-shrink:0;}
    .hero-actions{flex-direction:column; align-items:stretch;}
    .hero-actions .btn{white-space:normal; justify-content:center; text-align:center;}
    .ticket-route{justify-content:center; text-align:center; gap:12px;}
    .ticket-route > div:last-child{text-align:center !important;}
  }
  @media (max-width: 360px){
    .hero-stats{gap:0; row-gap:14px;}
    .stat{padding-right:12px; margin-right:12px;}
    .wrap{padding:0 16px;}
    .hero-inner{padding-left:16px; padding-right:16px;}
  }


  /* ===== CONVERSION SECTIONS ===== */
  .quick-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:5px;overflow:hidden;}
  .quick-card{background:var(--white);padding:24px 20px;min-height:120px;}
  .quick-card span{display:block;font:10px 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.08em;color:#5C636E;margin-bottom:9px;}
  .quick-card strong{font-size:17px;color:var(--prussian-deep);display:block;line-height:1.35;}
  .audience-grid,.career-grid,.method-grid,.include-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .audience-card,.career-card,.method-card,.include-card{border:1px solid var(--line);background:var(--white);padding:24px;border-radius:5px;}
  .audience-card h3,.career-card h3,.method-card h3,.include-card h3{font-size:18px;margin-bottom:8px;}
  .audience-card p,.career-card p,.method-card p,.include-card p{font-size:14px;color:#4B5058;line-height:1.6;}
  .career-tags{display:flex; flex-wrap:wrap; gap:8px; margin-top:14px;}
  .career-tag{font-family:'IBM Plex Mono', monospace; font-size:10.5px; color:var(--prussian-deep); background:var(--gold-soft); border:1px solid var(--line); padding:7px 10px; border-radius:2px;}
  .box-icon{width:44px; height:44px; border-radius:50%; background:var(--prussian-deep); color:var(--gold); display:flex; align-items:center; justify-content:center; margin-bottom:16px; flex-shrink:0;}
  .curriculum-list{display:flex;flex-direction:column;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:5px;overflow:hidden;}
  .curriculum-list details{background:var(--white);padding:0;}
  .curriculum-list summary{padding:19px 22px;cursor:pointer;font-weight:700;display:flex;justify-content:space-between;align-items:center;gap:15px;}
  .curriculum-list summary::after{content:'+';font:20px 'IBM Plex Mono',monospace;color:var(--rust);}
  .curriculum-list details[open] summary::after{transform:rotate(45deg);}
  .curriculum-body{padding:0 22px 20px;color:#4B5058;font-size:14px;line-height:1.7;}
  .curriculum-body span{display:inline-block;margin:4px 6px 0 0;padding:5px 9px;border:1px solid var(--line);background:var(--paper);border-radius:2px;}
  .compare-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:5px;}
  .compare-table{width:100%;border-collapse:collapse;background:var(--white);min-width:650px;}
  .compare-table th,.compare-table td{padding:15px 17px;border-bottom:1px solid var(--line);text-align:left;font-size:14px;}
  .compare-table th{font:11px 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.07em;color:var(--prussian);background:rgba(22,65,140,.06);}
  .batch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .batch-card{border:1px solid var(--line);background:var(--white);padding:24px;border-radius:5px;position:relative;}
  .batch-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--gold);}
  .batch-card .batch-tag{font:10px 'IBM Plex Mono',monospace;text-transform:uppercase;color:var(--prussian);letter-spacing:.08em;}
  .batch-card h3{font-size:20px;margin:9px 0 7px;}
  .batch-card p{font-size:14px;color:#4B5058;line-height:1.6;}
  .btn-gold{display:inline-flex;align-items:center;justify-content:center;background:var(--gold);color:var(--prussian-deep);padding:12px 18px;border-radius:3px;font-weight:700;text-decoration:none;font-size:14px;transition:transform .18s ease,background .18s ease;}
  .btn-gold:hover{transform:translateY(-2px);background:var(--gold-soft);}
  .detail-cta{margin-top:28px;padding:22px 24px;background:var(--prussian-deep);color:var(--white);border-radius:5px;display:flex;align-items:center;justify-content:space-between;gap:20px;}
  .detail-cta h3{color:var(--white);margin-bottom:4px;font-size:20px;}
  .detail-cta p{color:rgba(255,255,255,.7);font-size:13px;margin:0;}
  .detail-cta .btn{flex-shrink:0;}
  @media(max-width:900px){.quick-grid{grid-template-columns:repeat(2,1fr)}.audience-grid,.career-grid,.method-grid,.include-grid,.batch-grid{grid-template-columns:1fr 1fr}.detail-cta{align-items:flex-start;flex-direction:column}}
  @media(max-width:600px){.quick-grid,.audience-grid,.career-grid,.method-grid,.include-grid,.batch-grid{grid-template-columns:1fr}.quick-card{min-height:auto}}

  /* ===== DEFENSIVE OVERFLOW GUARDS ===== */
  .skills-grid, .features-grid, .modes-grid, .path-grid, .rail,
  .fact-strip, .cognates-head, .cognate-row, .contact-grid, .lang-inner {
    min-width: 0;
  }
  * { min-width: 0; }
  table, pre, code { min-width: unset; }

  ::selection{background:var(--gold); color:var(--prussian-deep);}
  :focus-visible{outline:2px solid var(--rust); outline-offset:2px;}
  @media (prefers-reduced-motion: reduce){*{animation:none !important; transition:none !important;}}
      `}</style>

      {/* HEADER */}
      <header className="kr-header">
        <div className="wrap kr-nav">
          <a className="kr-brand" href="#top" aria-label="Langma International">
            <span className="kr-brand-text">
              <img src="https://www.langmainternational.com/images/lngm2.png" alt="Langma International" className="kr-brand-logo" />
            </span>
          </a>
          <nav className="kr-menu" aria-label="Korean course navigation">
            <a className="kr-cta" href="#contact">Free Counselling</a>
          </nav>
        </div>
      </header>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-links">
            <a href="tel:+919810117094">📞 +91-98101-17094</a>
            <a href="mailto:info@langmainternational.com">✉ info@langmainternational.com</a>
            <a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">📍 South Extension I, New Delhi</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1 className="hero-title">Learn Korean <em>from zero</em><br />to a life in Korea.</h1>
            <p className="hero-sub">Small live batches, expert trainers, and a curriculum built for real conversation — from your first Hangul lesson to full visa &amp; placement support, whenever you're ready for Korea.</p>
            <div className="hero-keywords" aria-hidden="true">
            </div>
            <div className="hero-actions">
              <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20a%20free%20Korean%20demo%20class." target="_blank" rel="noopener" className="btn btn-wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
                Get Course Details on WhatsApp
              </a>
              <a href="tel:+919810117094" className="btn btn-ghost">Call +91-98101-17094</a>
            </div>
            <div className="hero-stats">
              <div className="stat"><div className="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div><div className="stat-text"><b>13+ yrs</b><span>TEACHING IN DELHI</span></div></div>
              <div className="stat"><div className="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></div><div className="stat-text"><b>Lv 1–6</b><span>ALL TOPIK LEVELS</span></div></div>
              <div className="stat"><div className="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.7z"/></svg></div><div className="stat-text"><b>4.6★</b><span>GOOGLE RATING</span></div></div>
              <div className="stat"><div className="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><div className="stat-text"><b>100%</b><span>EXPERT TRAINERS</span></div></div>
            </div>
          </div>

          <div className="ticket">
            <div className="ticket-top">
              <div className="ticket-route">
                <div>
                  <div className="city">DEL</div>
                  <div className="sub">New Delhi, India</div>
                </div>
                <div className="arrow">✈ ONLINE / OFFLINE ✈</div>
                <div style={{textAlign: 'right'}}>
                  <div className="city">KOR</div>
                  <div className="sub">Your Future, Korea</div>
                </div>
              </div>
              <div className="ticket-meta">
                <div className="ticket-meta-item"><span className="ticket-meta-label">Centre</span><span className="ticket-meta-value">South Extension I</span></div>
                <div className="ticket-meta-item"><span className="ticket-meta-label">Est.</span><span className="ticket-meta-value">2007</span></div>
              </div>
              <div className="ticket-form-head">Get Course Details &amp; Batch Options</div>
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
                      placeholder={heroPhoneError ? "Invalid number" : "10-digit number"}
                      pattern="[0-9]{10}"
                      required
                      aria-invalid={heroPhoneError}
                      onChange={() => setHeroPhoneError(false)}
                      style={heroPhoneError ? { outline: '2px solid #E4574C' } : undefined}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <label htmlFor="hemail">Email</label>
                  <input type="email" id="hemail" name="email" autoComplete="email" placeholder="you@example.com" required />
                </div>
                <input type="hidden" name="language" value="Korean" />
                <input type="hidden" name="message" value="Korean Language Course enquiry" />
                <button type="submit" className="submit-btn" disabled={heroSubmitting}>
                  {heroSubmitting ? "Submitting..." : heroSubmitted ? "Request Received ✓" : "Get Course Details →"}
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
              <div className="barcode" aria-hidden="true">
                <i style={{height: '24px'}}></i><i style={{height: '32px'}}></i><i style={{height: '18px'}}></i><i style={{height: '28px'}}></i>
                <i style={{height: '14px'}}></i><i style={{height: '30px'}}></i><i style={{height: '20px'}}></i><i style={{height: '26px'}}></i>
                <i style={{height: '16px'}}></i><i style={{height: '32px'}}></i>
              </div>
              <div className="ticket-rating">{heroSubmitted ? 'REQUEST RECEIVED ✓' : '4.6★ Rated · 18+ Yrs Teaching'}</div>
            </div>
          </div>
        </div>

        {/* ===== KOREAN EXAM CERTIFICATION LOGOS STRIP ===== */}
        <div className="exam-strip">
          <div className="wrap">
            <div className="exam-head">
              <span className="kicker">Official Korean Language Exam Preparation</span>
              <h3>Learn Korean &amp; ace every major <em>Korean Language</em> certification</h3>
            </div>
            <div className="exam-row" role="list" aria-label="Korean language certification exams we prepare you for">
              {EXAM_BADGES.map((b, i) => {
                const codeClass = b.code.length > 5 ? 'badge-code wide' : 'badge-code';
                return (
                  <div className="exam-badge" role="listitem" key={i}
                       style={{ '--ring': b.ring, '--accent': b.accent }}>
                    <div className="badge-circle">
                      <div className="badge-flag" aria-hidden="true"><i></i></div>
                      <div className="badge-inner">
                        <div className="badge-letter">{b.letter}</div>
                        <div className={codeClass}>{b.code}</div>
                      </div>
                    </div>
                    {b.official && <span className="badge-official">Official Exam Centre</span>}
                    <div className="badge-caption"><b>{b.code}</b><br/>{b.subtitle}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section id="skills">
        <div className="wrap">
          <div className="sec-head">
            <h2>Real Korean, for real conversations.</h2>
            <p>Our Korean Language curriculum builds all four core skills side by side, so you actually learn Korean you can use, not just recognise it on a page.</p>
          </div>
          <div className="skills-grid">
            <div className="skill-stamp">
              <div className="skill-native">말하기</div>
              <span className="skill-en">Speaking (Malhagi)</span>
              <p>Guided conversation practice from day one, so you're comfortable speaking long before you've memorised every honorific ending.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">듣기</div>
              <span className="skill-en">Listening (Deutgi)</span>
              <p>Native-accent audio and dialogues that train your ear for natural spoken Korean, not textbook Korean.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">읽기</div>
              <span className="skill-en">Reading (Ilggi)</span>
              <p>From Hangul basics to everyday Sino-Korean vocabulary, building comprehension block by block, level by level.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">쓰기</div>
              <span className="skill-en">Writing (Sseugi)</span>
              <p>Stroke order, sentence structure, and the shift from banmal to jondaetmal, corrected and improved as you go.</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY / LEVELS */}
      <section className="journey" id="journey">
        <div className="wrap">
          <div className="sec-head">
            <h2>Six stops to fluency.</h2>
            <p>Every learner boards at Level 1 and rides the same line through to Level 6, and one stop beyond, each stage building the grammar, conversation and confidence you need for the next.</p>
          </div>

          <div className="level-chart" role="img" aria-label="Bar chart showing the six TOPIK levels rising in proficiency from Foundations to Beyond Level 6">
            {LEVEL_LADDER.map((lvl) => (
              <div className="level-col" key={lvl.code}>
                <div className="level-bar" style={{ height: `${lvl.pct}%` }}>
                  <b>Lv {lvl.code}</b>
                  <span className="level-pct">{lvl.pct}%</span>
                </div>
                <div className="level-name">{lvl.name}</div>
              </div>
            ))}
          </div>

          <div className="rail-wrap">
            <div className="rail">
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 01 · LEVEL 1</div>
                <h3>Foundations</h3>
                <p>Hangul consonants, vowels, batchim, basic grammar and greetings: everyday phrases you'll actually use from week one.</p>
                <span className="unlock-tag">Unlocks: travel &amp; basic greetings</span>
              </div>
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 02 · LEVEL 2</div>
                <h3>Everyday Korean</h3>
                <p>Basic vocabulary and slower daily conversation, read and understood with growing confidence.</p>
                <span className="unlock-tag">Unlocks: E-9 (EPS) visa eligibility (EPS-TOPIK)</span>
              </div>
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 03 · LEVEL 3</div>
                <h3>Bridging Level</h3>
                <p>The bridge between basic and intermediate: workplace vocabulary and longer, more natural conversation.</p>
                <span className="unlock-tag">Unlocks: sector skills-test readiness</span>
              </div>
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 04 · LEVEL 4</div>
                <h3>Upper-Intermediate</h3>
                <p>Korean used in a broad range of everyday and workplace scenes: news, meetings, real conversation.</p>
                <span className="unlock-tag">Unlocks: E-7 Specialist visa readiness</span>
              </div>
              <div className="stop">
                <div className="stop-dot"></div>
                <div className="stop-code">STOP 05 · LEVEL 5–6</div>
                <h3>Near-Native Mastery</h3>
                <p>Highly complex, formal and abstract Korean, read, listened to and understood the way educated native speakers do.</p>
                <span className="unlock-tag">Unlocks: graduate study &amp; elite corporate roles</span>
              </div>
              <div className="stop">
                <div className="rail-flag">한국에 오신 것을 환영합니다 →</div>
                <div className="stop-dot final"></div>
                <div className="stop-code">STOP 06 · BEYOND LEVEL 6</div>
                <h3>Business &amp; Jondaetmal</h3>
                <p>Honorific speech, boardroom Korean and the etiquette TOPIK alone doesn't test: full executive fluency.</p>
                <span className="unlock-tag">Unlocks: teaching, translation, executive roles</span>
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
            <p>Approximate cumulative study hours to reach each TOPIK level from zero. Your actual pace depends on prior exposure, study method and hours committed per week.</p>
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

      {/* ABOUT THE LANGUAGE */}
      <section className="lang-facts" id="language">
        <div className="wrap">
          <div className="lang-inner">
            <div>
              <h2 style={{fontSize: 'clamp(26px,3vw,38px)', margin: '0 0 20px', lineHeight: '1.1'}}>한국어: more useful than most people expect.</h2>
              <div className="lang-copy">
                <p>Korean is spoken by roughly 80 million people, mostly across the Korean peninsula and diaspora communities worldwide. It's one of the few major world languages tied to a single ethno-linguistic identity, and still one of the most-spoken languages on Earth.</p>
                <p>It belongs to the Koreanic language family, unrelated to English or the Romance and Germanic languages, so learning Korean usually means different study habits than learning German or Spanish. There aren't many cognates to lean on. Instead, once Korean sentence structure clicks (verb at the end, particles doing the work English uses word order for), vocabulary starts building itself.</p>
                <p>South Korea is the world's 13th-largest economy and a global leader in semiconductors, automotive, shipbuilding and K-content, which means learning Korean isn't just a classroom exercise. It's a career move, opening doors in engineering, IT, manufacturing and skilled-trade roles across the country.</p>
              </div>
              <div className="cognates">
                <div className="cognates-head"><div>Korean</div><div>Sounds like</div><div>English</div></div>
                <div className="cognate-row"><div>커피</div><div>keopi</div><div>Coffee</div></div>
                <div className="cognate-row"><div>텔레비전</div><div>tellebijeon</div><div>Television</div></div>
                <div className="cognate-row"><div>호텔</div><div>hotel</div><div>Hotel</div></div>
                <div className="cognate-row"><div>카메라</div><div>kamera</div><div>Camera</div></div>
              </div>
            </div>
            <div>
              <div className="lang-photo">
                <img src={PHOTOS.traditionalDress} alt="Traditional Korean dress worn on a city street" loading="lazy" />
                <div className="lang-photo-cap">Built for learners starting from zero</div>
              </div>
              <div className="fact-strip">
                <div className="fact-box"><b>~80M</b><span>native speakers across Korea and diaspora</span></div>
                <div className="fact-box"><b>#13</b><span>world's 13th-largest economy by nominal GDP</span></div>
                <div className="fact-box"><b>1</b><span>featural alphabet: Hangul, invented in 1443 by King Sejong</span></div>
                <div className="fact-box"><b>Top 20</b><span>among the world's most spoken languages</span></div>
              </div>
              <div style={{marginTop: '24px', border: '1px solid var(--line)', borderRadius: '4px', padding: '22px 22px', background: 'var(--white)'}}>
                <h4 style={{fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--prussian)', marginBottom: '10px'}}>Good to know</h4>
                <p style={{fontSize: '14px', color: '#3A3F48', lineHeight: '1.6'}}>Korean verbs go at the end of the sentence, and speech level (polite, formal, casual) can change a sentence's ending entirely, which is the part that trips up most beginners. It's also a language built for feeling: <em style={{fontFamily: "'Fraunces', serif"}}>nunchi</em> (눈치) simply means the subtle art of reading the room and sensing what others feel. Once the sentence pattern clicks, vocabulary starts building itself.</p>
                <div className="career-icons" role="list" aria-label="Career fields Korean opens doors in">
                  <div className="career-icon-item" role="listitem">
                    <div className="career-icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
                    <span>Engineering</span>
                  </div>
                  <div className="career-icon-item" role="listitem">
                    <div className="career-icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
                    <span>IT &amp; Tech</span>
                  </div>
                  <div className="career-icon-item" role="listitem">
                    <div className="career-icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20M4 20V10l4-3 4 3v10M12 20V6l4-3 4 3v14"/></svg></div>
                    <span>Manufacturing</span>
                  </div>
                  <div className="career-icon-item" role="listitem">
                    <div className="career-icon-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg></div>
                    <span>K-Content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE QUICK FACTS */}
      <section className="course-facts" id="course-details">
        <div className="wrap">
          <div className="sec-head-row">
            <div className="sec-head">
              <h2>Everything you need to know before you enrol.</h2>
              <p>Get the course structure, learning format and batch information in one place. Fees and current batch availability are shared on enquiry.</p>
            </div>
            <div className="sec-icon-big" aria-hidden="true">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="14" width="80" height="96" rx="10" stroke="currentColor" strokeWidth="6"/><path d="M45 14h30v10a4 4 0 0 1-4 4H49a4 4 0 0 1-4-4V14z" fill="currentColor"/><path d="M34 46l6 6 12-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 44h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><path d="M34 74l6 6 12-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 72h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><path d="M34 96h52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".45"/></svg>
            </div>
          </div>
          <div className="course-facts-grid">
            <div className="course-fact"><div className="fact-label">Levels</div><b>Lv 1 → Lv 6</b><span>Complete TOPIK pathway from beginner to advanced.</span></div>
            <div className="course-fact"><div className="fact-label">Class Format</div><b>Online / Offline / Hybrid</b><span>Choose the format that fits your schedule.</span></div>
            <div className="course-fact"><div className="fact-label">Location</div><b>South Extension I</b><span>In-person classes at our South Delhi centre.</span></div>
            <div className="course-fact"><div className="fact-label">Exam Prep</div><b>TOPIK • EPS-TOPIK</b><span>Focused preparation when you need certification.</span></div>
            <div className="course-fact"><div className="fact-label">Teaching</div><b>Expert Trainers</b><span>Small live batches with practical speaking practice.</span></div>
            <div className="course-fact"><div className="fact-label">Experience</div><b>18+ Years</b><span>Language teaching experience in Delhi since 2007.</span></div>
            <div className="course-fact"><div className="fact-label">Course Fee</div><b>Get Current Fee</b><span>Fee details are shared by the counsellor.</span></div>
            <div className="course-fact"><div className="fact-label">Next Step</div><b>Free Demo / Counselling</b><span>Discuss your goal and get a recommended learning path.</span></div>
          </div>
          <div className="course-facts-cta">
            <p><strong>Want the exact fee and next available batch?</strong><br />Share your details and we'll help you choose the right Korean course.</p>
            <a href="#enrollForm" className="btn btn-wa">Get Course Fee &amp; Batch Details →</a>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section id="who">
        <div className="wrap">
          <div className="sec-head"><h2>Who is this Korean course for?</h2><p>Choose the reason you're learning. We'll help you choose the right level and pathway.</p></div>
          <div className="audience-grid">
            <div className="audience-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg></div><div className="audience-num">Students</div><h3>Study in Korea</h3><p>Build Korean proficiency for university, language-school and academic pathways.</p></div>
            <div className="audience-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div><div className="audience-num">Career</div><h3>Work in Korea</h3><p>Develop practical Korean for workplace communication and Korea-focused career routes.</p></div>
            <div className="audience-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/></svg></div><div className="audience-num">EPS</div><h3>EPS / E-9 Candidates</h3><p>Prepare your Korean foundation and exam skills around the requirements of your chosen route.</p></div>
            <div className="audience-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div><div className="audience-num">IT</div><h3>IT &amp; Professionals</h3><p>Build language confidence for Korean companies, teams, clients and professional environments.</p></div>
            <div className="audience-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></svg></div><div className="audience-num">Personal</div><h3>Travel &amp; Everyday Life</h3><p>Learn practical Korean for travel, conversation, food, shopping and everyday situations.</p></div>
            <div className="audience-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div><div className="audience-num">Culture</div><h3>K-Culture Enthusiasts</h3><p>Go beyond subtitles and connect with Korean music, dramas, culture and conversations.</p></div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="modes" id="curriculum">
        <div className="wrap">
          <div className="sec-head"><h2>What you'll learn at each level.</h2><p>A progressive curriculum that takes you from Hangul and everyday expressions to advanced Korean communication.</p></div>
          <div className="curriculum-list">
            <details><summary>Level 1 · Beginner Foundation</summary><div className="curriculum-body"><span>Hangul</span><span>Greetings</span><span>Introductions</span><span>Numbers &amp; time</span><span>Basic grammar</span><span>Everyday vocabulary</span></div></details>
            <details><summary>Level 2 · Elementary Communication</summary><div className="curriculum-body"><span>Daily conversations</span><span>Particles</span><span>Past &amp; future</span><span>Shopping &amp; directions</span><span>Listening practice</span><span>Core vocabulary</span></div></details>
            <details><summary>Level 3 · Intermediate Foundation</summary><div className="curriculum-body"><span>Expanded grammar</span><span>Longer conversations</span><span>Reading comprehension</span><span>Writing practice</span><span>Honorific foundations</span><span>TOPIK preparation</span></div></details>
            <details><summary>Level 4 · Intermediate Korean</summary><div className="curriculum-body"><span>Complex grammar</span><span>Opinion &amp; discussion</span><span>News &amp; media</span><span>Workplace vocabulary</span><span>Extended writing</span><span>TOPIK II skills</span></div></details>
            <details><summary>Level 5 · Advanced Korean</summary><div className="curriculum-body"><span>Advanced grammar</span><span>Formal communication</span><span>Business Korean</span><span>Critical reading</span><span>Presentation skills</span><span>Advanced vocabulary</span></div></details>
            <details><summary>Level 6 · Advanced Proficiency</summary><div className="curriculum-body"><span>Nuanced expression</span><span>Professional communication</span><span>Advanced writing</span><span>Debate &amp; discussion</span><span>Media analysis</span><span>High-level exam preparation</span></div></details>
          </div>
        </div>
      </section>

      {/* TEACHING METHODOLOGY */}
      <section id="methodology">
        <div className="wrap">
          <div className="sec-head"><h2>How you learn Korean at Langma International.</h2><p>Language learning works when you actively use the language, not when you simply memorise it.</p></div>
          <div className="method-grid">
            <div className="method-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.05V17h6v-.25c0-.85.4-1.55 1-2.05A7 7 0 0 0 12 2z"/></svg></div><h3>01 · Learn</h3><p>Build vocabulary, grammar, Hangul and sentence patterns with structured trainer-led lessons.</p></div>
            <div className="method-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><h3>02 · Speak</h3><p>Use role plays, conversation drills and real-life scenarios to turn lessons into usable Korean.</p></div>
            <div className="method-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg></div><h3>03 · Practise</h3><p>Strengthen reading, writing, listening and speaking through guided exercises and repetition.</p></div>
            <div className="method-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></div><h3>04 · Apply</h3><p>Explore workplace, travel and everyday Korean so you can communicate beyond the classroom.</p></div>
            <div className="method-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 3v2h6V3M9 12l2 2 4-4"/></svg></div><h3>05 · Assess</h3><p>Use progress checks and mock-test practice to understand where you stand and what to improve.</p></div>
            <div className="method-card"><div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></div><h3>06 · Progress</h3><p>Move confidently to the next level or toward your chosen exam, study or Korea career pathway.</p></div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="modes">
        <div className="wrap">
          <div className="sec-head"><h2>What you get with your Korean course.</h2><p>A structured learning experience designed around your goal.</p></div>
          <div className="include-grid">
            <div className="include-card"><h3>Live Classes</h3><p>Instructor-led learning with opportunities to practise Korean rather than only watch lessons.</p></div>
            <div className="include-card"><h3>Structured Curriculum</h3><p>A progressive Level 1–6 pathway with clear milestones from beginner to advanced.</p></div>
            <div className="include-card"><h3>Exam Preparation</h3><p>Focused preparation for relevant Korean proficiency and pathway examinations.</p></div>
            <div className="include-card"><h3>Speaking Practice</h3><p>Conversation drills, role plays and practical situations designed to build confidence.</p></div>
            <div className="include-card"><h3>Cultural Learning</h3><p>Understand Korean etiquette, communication styles and cultural context alongside the language.</p></div>
            <div className="include-card"><h3>Pathway Guidance</h3><p>Course and career guidance for learners considering study or work opportunities in Korea.</p></div>
          </div>
        </div>
      </section>

      {/* JLPT-STYLE COMPARISON: TOPIK VS EPS-TOPIK */}
      <section id="exams">
        <div className="wrap">
          <div className="sec-head"><h2>TOPIK or EPS-TOPIK: which one is right for you?</h2><p>The right exam depends on your objective. Our counsellors can help you identify the appropriate preparation route.</p></div>
          <div className="compare-wrap">
            <table className="compare-table"><thead><tr><th> </th><th>TOPIK</th><th>EPS-TOPIK</th></tr></thead><tbody>
              <tr><td>Primary purpose</td><td>General Korean proficiency</td><td>Korean proficiency for EPS-related employment pathway</td></tr>
              <tr><td>Levels / format</td><td>TOPIK I and TOPIK II</td><td>Employment-focused assessment</td></tr>
              <tr><td>Useful for</td><td>Study, employment and proficiency proof</td><td>EPS / E-9 related route</td></tr>
              <tr><td>Focus</td><td>Reading, listening and writing depending on test level</td><td>Practical Korean relevant to the employment route</td></tr>
            </tbody></table>
          </div>
        </div>
      </section>

      {/* CAREER OPPORTUNITIES */}
      <section id="careers">
        <div className="wrap">
          <div className="sec-head"><h2>Where can Korean take you?</h2><p>Language skills can support opportunities both in Korea and with Korean organisations in India.</p></div>
          <div className="career-grid">
            <div className="career-card">
              <h3>Career &amp; Work in Korea</h3>
              <div className="career-tags">
                <span className="career-tag">EPS / E-9 Visa</span>
                <span className="career-tag">E-7 Specialist</span>
                <span className="career-tag">IT &amp; Engineering</span>
                <span className="career-tag">Manufacturing</span>
                <span className="career-tag">Hospitality &amp; Service</span>
                <span className="career-tag">Semiconductors</span>
              </div>
            </div>
            <div className="career-card">
              <h3>Study &amp; Professional Opportunities</h3>
              <div className="career-tags">
                <span className="career-tag">Study in Korea</span>
                <span className="career-tag">Korean Universities</span>
                <span className="career-tag">TOPIK Preparation</span>
                <span className="career-tag">Korean MNCs</span>
                <span className="career-tag">Translation</span>
                <span className="career-tag">Business Korean</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING BATCHES */}
      <section className="modes" id="batches">
        <div className="wrap">
          <div className="sec-head"><h2>Choose the learning format that fits your schedule.</h2><p>Current timings, start dates, availability and fees are shared by our counselling team.</p></div>
          <div className="batch-grid">
            <div className="batch-card"><span className="batch-tag">Most Popular</span><h3>Live Online</h3><p>Interactive instructor-led classes from anywhere. Ask for the next available beginner or level-specific batch.</p></div>
            <div className="batch-card"><span className="batch-tag">In Person</span><h3>South Delhi Classroom</h3><p>Face-to-face learning at our South Extension I centre with live speaking practice.</p></div>
            <div className="batch-card"><span className="batch-tag">Flexible</span><h3>Hybrid</h3><p>Combine online and classroom learning where available. Ask our team for current options.</p></div>
          </div>
          <div className="detail-cta"><div><h3>Get your course fee + batch details.</h3><p>No price is displayed here because fees and schedules can vary by level and format.</p></div><a href="#contact" className="btn btn-gold">Get Course Details →</a></div>
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
              <h3>Learn from expert trainers</h3>
              <p>Certified, experienced trainers fluent in Korean ensure you get the highest quality instruction, not a script.</p>
            </div>
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg></div>
              <div className="fnum">02 / IMMERSION</div>
              <h3>Cultural integration</h3>
              <p>Experience Korean etiquette, workplace culture and daily life through real-life scenarios that prepare you for actually living in Korea.</p>
            </div>
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
              <div className="fnum">03 / CAREERS</div>
              <h3>Placement &amp; visa assistance</h3>
              <p>Exclusive support for the E-9 (EPS) worker visa, E-7 Specialist roles, and in-demand IT and manufacturing jobs in Korea, right after your course.</p>
            </div>
            <div className="feature">
              <div className="box-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 22l5-3 5 3-1.5-9.5"/></svg></div>
              <div className="fnum">04 / CERTIFICATION</div>
              <h3>Exam-ready, if you need it</h3>
              <p>For learners who need a certificate, we prepare you for TOPIK, EPS-TOPIK and BKT, targeting the exact score your visa or employer requires.</p>
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
            <p>Every format runs the same rigorous, expert-taught curriculum. Choose the one that fits your life.</p>
          </div>
          <img className="modes-photo" src={PHOTOS.gyeongbokgung} alt="Gyeongbokgung Palace in Seoul, representing where your Korean course can take you" loading="lazy" />
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

      {/* EPS / E-7 / STUDY PATHWAYS */}
      <section className="pathways" id="pathways">
        <div className="wrap">
          <div className="sec-head">
            <h2>EPS visas. Specialist roles. University routes.</h2>
            <p>Langma's counsellors don't stop at fluency. These are the three routes we actively guide candidates through, once your Korean is at the level each one needs.</p>
          </div>
          <div className="path-grid">
            <div className="path-card">
              <div className="path-photo"><img src={PHOTOS.epsWorker} alt="Factory workers on a production line, representing the EPS worker visa route" loading="lazy" /></div>
              <div className="path-body">
                <div className="path-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <span className="path-tag">Skilled Worker Route</span>
                <h3>E-9 (EPS) Worker Visa</h3>
                <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>A fast-growing route into Korea's manufacturing, agriculture, fishery and construction sectors. Most fields ask for the EPS-TOPIK, plus a sector-specific skills test.</p>
                <ul>
                  <li>Korean coaching timed to your target sector's test date</li>
                  <li>Sector-specific vocabulary and skills-test preparation</li>
                  <li>Employer and job-matching support</li>
                  <li>Visa paperwork and pre-departure briefing</li>
                </ul>
              </div>
            </div>

            <div className="path-card">
              <div className="path-photo"><img src={PHOTOS.seoulBusiness} alt="Seoul business district skyline, representing white-collar specialist roles" loading="lazy" /></div>
              <div className="path-body">
                <div className="path-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                </div>
                <span className="path-tag">White-Collar Work Visa</span>
                <h3>E-7 Specialist Roles</h3>
                <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>Korea's most common professional work visa for IT, engineering, marketing and international-business roles. TOPIK Level 3–4 is typically required by many employers for this category.</p>
                <ul>
                  <li>Business Korean coaching aimed at TOPIK II and BKT</li>
                  <li>Résumé and interview preparation for Korean employers</li>
                  <li>Degree-to-role matching guidance</li>
                  <li>Visa documentation and renewal support</li>
                </ul>
              </div>
            </div>

            <div className="path-card">
              <div className="path-photo"><img src={PHOTOS.koreanCampus} alt="Korean university campus building, representing the study-in-Korea route" loading="lazy" /></div>
              <div className="path-body">
                <div className="path-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>
                </div>
                <span className="path-tag">Language School &amp; University</span>
                <h3>Study in Korea</h3>
                <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>From short-term language schools to full degree programmes. Korean universities require TOPIK Level 3+ for undergraduate admission and Level 4+ for graduate programmes.</p>
                <ul>
                  <li>TOPIK I and II focused exam coaching</li>
                  <li>University and language-school shortlisting</li>
                  <li>Application and statement-of-purpose support</li>
                  <li>D-2/D-4 student-visa paperwork and pre-departure briefing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="sec-head">
            <h2>Common questions about learning Korean.</h2>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Do I need any prior knowledge of Korean to join?</summary>
              <p className="faq-a">No, most of our learners start at Level 1 with zero Korean. Classes are structured so complete beginners build confidence, and Hangul, from the very first session.</p>
            </details>
            <details className="faq-item">
              <summary>Do I really need to learn Hangul before speaking?</summary>
              <p className="faq-a">Yes, but the good news is Hangul is famously logical and most learners read it comfortably within a week or two. You'll speak and read from the very first classes, so nothing feels like a wall.</p>
            </details>
            <details className="faq-item">
              <summary>How long does it take to become conversational?</summary>
              <p className="faq-a">Most learners feel comfortable with everyday conversation by the end of Level 2–3, usually within a few months of consistent classes, depending on how many hours a week you can commit.</p>
            </details>
            <details className="faq-item">
              <summary>Can I also prepare for TOPIK, EPS-TOPIK or BKT?</summary>
              <p className="faq-a">Yes, once you're at the right level, we offer focused certificate preparation for TOPIK, EPS-TOPIK, KLAT, KLPT and BKT alongside the regular course, for anyone who needs a specific score for a visa, job or university application.</p>
            </details>
            <details className="faq-item">
              <summary>What's the difference between online, offline, and hybrid batches?</summary>
              <p className="faq-a">All three follow the same curriculum and expert trainers. Online is fully remote, offline meets in person at our South Delhi centre, and hybrid lets you mix the two around your week.</p>
            </details>
            <details className="faq-item">
              <summary>How big are the batches?</summary>
              <p className="faq-a">We keep batches small so everyone gets real speaking practice and individual feedback, rather than sitting through a one-way lecture.</p>
            </details>
          </div>
        </div>
      </section>

      {/* FAQ ADDITIONS */}
      <section>
        <div className="wrap">
          <div className="sec-head"><h2>More questions before you start?</h2></div>
          <div className="faq-list">
            <details className="faq-item"><summary>Can I start Korean from zero?</summary><p className="faq-a">Yes. Beginners can start with Level 1 and build from Hangul and basic communication step by step.</p></details>
            <details className="faq-item"><summary>How do I know which level I should join?</summary><p className="faq-a">If you already know Korean, our team can help assess your current level and recommend the appropriate batch.</p></details>
            <details className="faq-item"><summary>Do you provide online and offline classes?</summary><p className="faq-a">Yes. Langma International offers online, classroom and hybrid learning formats, subject to current batch availability.</p></details>
            <details className="faq-item"><summary>How much does the Korean course cost?</summary><p className="faq-a">We do not display a fixed price on this landing page. Fees can vary by level, format and programme. Contact us for the current course fee and batch options.</p></details>
            <details className="faq-item"><summary>Can I get the current batch timings before enrolling?</summary><p className="faq-a">Yes. Tell us your preferred format, level and schedule and our team can share the current available options.</p></details>
            <details className="faq-item"><summary>Can Korean help me work or study in Korea?</summary><p className="faq-a">Korean proficiency can support different study and employment pathways, but specific eligibility depends on the programme, employer, visa category and current requirements.</p></details>
          </div>
        </div>
      </section>

      {/* ACTIVITIES & CULTURE */}
      <section className="activities" id="activities">
        <div className="wrap">
          <div className="sec-head">
            <div style={{fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '.14em', color: 'var(--gold-soft)', textTransform: 'uppercase', marginBottom: '10px'}}>Activities &amp; Korean Experience</div>
            <h2>Learn. Experience. Connect.</h2>
            <p>Learning Korean at Langma goes beyond classroom lessons. Build confidence through cultural experiences, food, tradition and real Korean conversation practice.</p>
          </div>

          <div
            className="activity-slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="activity-viewport"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="activity-track"
                style={{ transform: `translateX(-${slideIndex * slideWidthPct}%)` }}
              >
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
                {Array.from({ length: dotCount }).map((_, i) => (
                  <button
                    key={i}
                    className={`activity-dot${i === slideIndex ? ' active' : ''}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to activity slide ${i + 1}`}
                    aria-current={i === slideIndex}
                  />
                ))}
              </div>
              <div className="activity-arrows">
                <button className="activity-arrow" onClick={prevSlide} aria-label="Previous activities">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="activity-arrow" onClick={nextSlide} aria-label="Next activities">
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
          <span className="kicker">Your Korean journey starts here</span>
          <h2>Don't just learn Korean. Learn where it can take you.</h2>
          <p>Get the current course fee, batch timings, learning mode and recommended level, without committing to a course first.</p>
          <div className="final-cta-actions">
            <a className="btn btn-wa" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20Korean%20course%20fee%20and%20batch%20details." target="_blank" rel="noopener">Get Course Details on WhatsApp →</a>
            <a className="btn btn-ghost" href="tel:+919810117094">Talk to a Korean Counsellor</a>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a3 3 0 0 0-2.1-2.1C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.5.4a3 3 0 0 0-2.1 2.1C2 8.8 2 12 2 12s0 3.2.4 4.7a3 3 0 0 0 2.1 2.1c1.6.4 7.5.4 7.5.4s5.9 0 7.5-.4a3 3 0 0 0 2.1-2.1c.4-1.5.4-4.7.4-4.7z"/><path d="M10 15l5.2-3-5.2-3z" fill="#111"/></svg>
                </a>
              </div>
            </div>

            <div className="enroll-card">
              <h3>Ask a query</h3>
              <p>Tell us your current level (or none at all), and a counsellor calls you back the same day.</p>
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
                    placeholder={phoneError ? "Enter a valid 10-digit number" : "10-digit mobile number"}
                    pattern="[0-9]{10}"
                    required
                    aria-invalid={phoneError}
                    onChange={() => setPhoneError(false)}
                    style={phoneError ? { outline: '2px solid #E4574C' } : undefined}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="femail">Email</label>
                  <input type="email" id="femail" name="email" autoComplete="email" placeholder="you@example.com" required />
                </div>
                <input type="hidden" name="language" value="Korean" />
                <input type="hidden" name="message" value="Korean Language Course enquiry" />
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Submitting..." : "Request a Call Back"}
                </button>
                {formMessage && (
                  <div className={`form-msg ${formSubmitted ? "success" : "error"}`} role="status">
                    {formSubmitted ? `✓ ${formMessage}` : formMessage}
                  </div>
                )}
              </form>
              <div className="form-alt">
                <span style={{fontSize: '13px', color: 'rgba(255,255,255,.7)'}}>Prefer to skip the form?</span>
                <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20enroll%20for%20the%20Korean%20course." target="_blank" rel="noopener" style={{fontSize: '13px', fontWeight: '600', color: 'var(--gold-soft)', textDecoration: 'underline'}}>Message us on WhatsApp →</a>
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
      <footer className="kr-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="https://www.langmainternational.com/images/ftrnlg.png" alt="Langma International" className="footer-logo" />
              <div className="kr-motto">Learn Korean. Understand Korea. Build Your Future.</div>
              <p>Learn Korean with structured Level 1–6 learning, practical communication, cultural activities and Korea-focused counselling.</p>
            </div>
            <div className="footer-col">
              <h4>Learn</h4>
              <a href="#course-details">Korean Course</a>
              <a href="#skills">What You Learn</a>
              <a href="#methodology">Teaching Method</a>
              <a href="#batches">Batches</a>
            </div>
            <div className="footer-col">
              <h4>Korea</h4>
              <a href="#activities">Cultural Activities</a>
              <a href="#pathways">Korea Pathways</a>
              <a href="#exams">TOPIK / EPS-TOPIK</a>
              <a href="#faq">FAQ</a>
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
            <span>KOREAN LANGUAGE · NEW DELHI</span>
          </div>
        </div>
      </footer>

      {/* FLOATING CALL */}
      <a href="tel:+919810117094" className="call-float" id="callFloat" aria-label="Call Langma">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
      <div className="call-tip" id="callTip">Call us: +91-98101-17094</div>

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20know%20more%20about%20the%20Korean%20course." target="_blank" rel="noopener" className="wa-float" id="waFloat" aria-label="Get Course Details on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
      </a>
      <div className={`wa-tip${showWaTip ? ' show' : ''}`} id="waTip">Chat with us, usually replies in minutes</div>
    </div>
  );
}