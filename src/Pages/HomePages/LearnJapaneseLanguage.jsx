import { useState, useRef, useEffect } from "react";
import API_BASE from "../../config";
const calligraphyImage = "/images/calligraphy.jpg";
const chopsticksCandyImage = "/images/chopsticks-candy.jpg";
const cultureKimonoImage = "/images/culture-kimono.jpg";
const littleJapanImage = "/images/little-japan.jpg";
const oneBigFamilyImage = "/images/one-big-family.jpg";
const studentStageImage = "/images/student-stage.jpg";
const origamiImage = "/images/origami.jpg";
const kintsugiCupsImage = "/images/kintsugi-cups.jpg";
const kintsugiIntroImage = "/images/kintsugi-intro.jpg";
const kintsugiFixingImage = "/images/kintsugi-fixing.jpg";
const kintsugiLessonImage = "/images/kintsugi-lesson.jpg";

const ACTIVITIES = [
  {
    title: "Japanese Calligraphy",
    jp: "書道体験",
    tag: "Calligraphy",
    text: "Students explored the beauty of Japanese writing through patience, precision and art — turning every stroke into a story.",
    icon: "書",
    image: calligraphyImage,
    alt: "Students practising Japanese calligraphy at Langma"
  },
  {
    title: "Chopsticks & Candy Challenge",
    jp: "箸ゲーム",
    tag: "Fun Activity",
    text: "A lively Japanese-inspired game that builds focus, coordination and friendly competition while students enjoy the experience together.",
    icon: "箸",
    image: chopsticksCandyImage,
    alt: "Students playing a chopsticks and candy activity at Langma"
  },
  {
    title: "Dressing the Culture",
    jp: "着物体験",
    tag: "Culture",
    text: "Students wore traditional kimonos and experienced Japanese culture in a fun, memorable way — not just through textbooks.",
    icon: "和",
    image: cultureKimonoImage,
    alt: "Students wearing traditional Japanese kimonos at Langma"
  },
  {
    title: "A Little Japan at Langma",
    jp: "子供の日",
    tag: "Celebration",
    text: "Classrooms turned into a little Japan for Children's Day — decorations, flags, friends and festive energy everywhere.",
    icon: "祝",
    image: littleJapanImage,
    alt: "Students celebrating Children's Day with Japanese decorations at Langma"
  },
  {
    title: "One Big Family",
    jp: "集合写真",
    tag: "Community",
    text: "Ending the day with a group photo full of happiness, culture and togetherness — one big Langma family.",
    icon: "絆",
    image: oneBigFamilyImage,
    alt: "Group photo of Langma students after the Japanese culture day"
  },
  {
    title: "Students Take the Stage",
    jp: "ステージ発表",
    tag: "Performance",
    text: "Singing, dancing, confidence and pure passion — when students take the stage, magic happens.",
    icon: "歌",
    image: studentStageImage,
    alt: "Students singing, dancing and playing guitar on stage at Langma"
  },
  {
    title: "Origami Creativity",
    jp: "折り紙",
    tag: "Craft",
    text: "Simple paper, endless creativity — origami turned into smiles, focus and tiny masterpieces.",
    icon: "折",
    image: origamiImage,
    alt: "Students making colourful origami at Langma"
  },
  {
    title: "Kintsugi: Beauty in Imperfection",
    jp: "金継ぎ",
    tag: "Workshop",
    text: "A meaningful Japanese activity where students learned that every broken piece can find its place again.",
    icon: "金",
    image: kintsugiIntroImage,
    alt: "Students experiencing the Japanese Kintsugi activity at Langma"
  },
  {
    title: "Piece by Piece",
    jp: "修復体験",
    tag: "Workshop",
    text: "With patience, effort and the right mindset, students carefully started fixing what was broken.",
    icon: "修",
    image: kintsugiFixingImage,
    alt: "Students carefully repairing broken pottery piece by piece"
  },
  {
    title: "The Kintsugi Lesson",
    jp: "心の学び",
    tag: "Mindset",
    text: "Your mistakes don't define you — they shape you, strengthen you and make you unique. If something breaks, you can always fix it.",
    icon: "心",
    image: kintsugiLessonImage,
    alt: "Finished Kintsugi cups and bowls repaired with gold at Langma"
  },
  {
    title: "Golden Repairs",
    jp: "金の継ぎ目",
    tag: "Mindset",
    text: "Broken cups and bowls became reminders that cracks can turn into gold — a lesson students carry beyond the classroom.",
    icon: "輝",
    image: kintsugiCupsImage,
    alt: "Students proudly showing their Kintsugi-repaired cups at Langma"
  },

];

// Japanese language certification exam badges shown in the hero exam strip
const EXAM_BADGES = [
  { code: "JLPT", subtitle: "N5–N1, Worldwide", ring: "#BC002D", accent: "#0A2422", letter: "N" },
  { code: "JFT-Basic", subtitle: "SSW Visa Japanese", ring: "#0d9488", accent: "#BC002D", letter: "F" },
  { code: "NAT-TEST", subtitle: "N5–N1, 6x Yearly", ring: "#1a1a2e", accent: "#0d9488", letter: "T" },
  { code: "J.TEST", subtitle: "Practical & Business", ring: "#C8963E", accent: "#0A2422", letter: "J" },
  { code: "BJT", subtitle: "J5–J1+ Business", ring: "#003A70", accent: "#BC002D", letter: "B" },
  { code: "EJU", subtitle: "University Admission", ring: "#6B2D5C", accent: "#0A2422", letter: "E" },
];

export default function LangmaJapaneseCourse() {
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
    formData.set("language", "Japanese");
    if (!formData.get("message")) {
      formData.set("message", "Japanese Language Course enquiry");
    }

    try {
      const res = await fetch(`${API_BASE}/apply-submit`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        setMessage("Thank you! We will contact you soon.");
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
            message: formData.get("message") || "Japanese Language Course enquiry",
            type: "Japanese Landing",
            service: "Language Training - Japanese",
          }),
        });
        if (fallback.ok) {
          setSubmitted(true);
          setMessage("Thank you! We will contact you soon.");
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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;600;700&display=swap');

  /* ============================================================
     DESIGN TOKENS
     A single, consistent system so every section reads as one
     considered page rather than a stack of separately-built ones.
  ============================================================ */
  :root{
    --header-h:74px;
    --ink:#211C16;
    --ink-soft:#4A4238;
    --ink-mute:#6B6255;
    --paper:#FAF5E9;
    --paper-2:#F1E6CD;
    --prussian:#1E3A54;
    --prussian-deep:#132738;
    --gold:#C7A24F;
    --gold-soft:#F4E7C3;
    --rust:#BE1E2D;
    --rust-deep:#8F1620;
    --white:#FFFFFF;
    --jp-red:#BC002D;
    --line: rgba(33,28,22,0.13);
    --line-strong: rgba(33,28,22,0.22);
    --line-on-dark: rgba(255,255,255,0.14);

    /* spacing scale */
    --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:24px;
    --sp-6:32px; --sp-7:48px; --sp-8:64px; --sp-9:96px;

    /* radii */
    --r-sm:4px; --r-md:8px; --r-lg:14px; --r-pill:999px;

    /* shadows — ink-tinted, not generic black, so they sit warm on cream */
    --shadow-sm:0 2px 8px rgba(33,22,10,.08);
    --shadow-md:0 14px 34px -14px rgba(19,39,56,.32);
    --shadow-lg:0 28px 60px -20px rgba(19,39,56,.4);

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
    line-height:1.6;
    -webkit-font-smoothing:antialiased;
    min-height:100vh;
    overflow-x:hidden;
    width:100%;
    max-width:100vw;
  }
  img{max-width:100%; display:block;}
  a{color:inherit;}
  .wrap{max-width:1180px; margin:0 auto; padding:0 32px; width:100%; box-sizing:border-box;}
  h1,h2,h3{font-family:'Shippori Mincho', serif; font-weight:600; letter-spacing:-0.01em; color:var(--ink);}
  * { min-width: 0; }
  table, pre, code { min-width: unset; }
  ::selection{background:var(--gold); color:var(--prussian-deep);}
  :focus-visible{outline:2px solid var(--rust); outline-offset:3px; border-radius:2px;}
  @media (prefers-reduced-motion: reduce){*{animation:none !important; transition:none !important;}}

  /* ===== SEIGAIHA WAVE MOTIF — the page's one recurring signature ===== */
  .seigaiha-dark{position:absolute; inset:0; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='rgb(199,162,79)' stroke-width='1.3' opacity='0.14'%3E%3Cpath d='M -18 20 A 18 18 0 0 1 18 20'/%3E%3Cpath d='M -12 20 A 12 12 0 0 1 12 20'/%3E%3Cpath d='M -6 20 A 6 6 0 0 1 6 20'/%3E%3Cpath d='M 22 20 A 18 18 0 0 1 58 20'/%3E%3Cpath d='M 28 20 A 12 12 0 0 1 52 20'/%3E%3Cpath d='M 34 20 A 6 6 0 0 1 46 20'/%3E%3Cpath d='M 2 40 A 18 18 0 0 1 38 40'/%3E%3Cpath d='M 8 40 A 12 12 0 0 1 32 40'/%3E%3Cpath d='M 14 40 A 6 6 0 0 1 26 40'/%3E%3C/g%3E%3C/svg%3E"); background-size:40px 40px;}
  .hero-grid{position:absolute; inset:0; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='rgb(30,58,84)' stroke-width='1.3' opacity='0.16'%3E%3Cpath d='M -18 20 A 18 18 0 0 1 18 20'/%3E%3Cpath d='M -12 20 A 12 12 0 0 1 12 20'/%3E%3Cpath d='M -6 20 A 6 6 0 0 1 6 20'/%3E%3Cpath d='M 22 20 A 18 18 0 0 1 58 20'/%3E%3Cpath d='M 28 20 A 12 12 0 0 1 52 20'/%3E%3Cpath d='M 2 40 A 18 18 0 0 1 38 40'/%3E%3Cpath d='M 8 40 A 12 12 0 0 1 32 40'/%3E%3Cpath d='M 14 40 A 6 6 0 0 1 26 40'/%3E%3C/g%3E%3C/svg%3E"); background-size:40px 40px; mask-image:linear-gradient(to bottom, black, transparent 85%);}

  /* ===== BUTTONS ===== */
  .btn{font-family:'IBM Plex Sans', sans-serif; font-weight:600; font-size:14.5px; padding:13px 22px; border-radius:var(--r-sm); border:1.5px solid transparent; display:inline-flex; align-items:center; gap:9px; cursor:pointer; text-decoration:none; white-space:nowrap; transition:transform .18s var(--ease), box-shadow .18s var(--ease), background .18s var(--ease); max-width:100%;}
  .btn-primary{background:var(--rust); color:var(--white); box-shadow:var(--shadow-sm);}
  .btn-primary:hover{transform:translateY(-2px); box-shadow:0 10px 22px rgba(190,30,45,.32);}
  .btn-ghost{background:transparent; border-color:var(--line-strong); color:var(--ink);}
  .btn-ghost:hover{background:var(--ink); border-color:var(--ink); color:var(--paper);}
  .btn-wa{background:#1F9C56; color:#fff;}
  .btn-wa:hover{transform:translateY(-2px); box-shadow:0 10px 22px rgba(31,156,86,.35); background:#188047;}
  .btn-sm{padding:10px 16px; font-size:13px;}

  /* ===== TOPBAR ===== */
  .topbar{background:var(--prussian-deep); color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:12.5px; margin-top:var(--header-h);}
  .topbar .wrap{display:flex; justify-content:center; align-items:center; padding:9px 32px;}
  .topbar-links{display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:8px 26px; width:100%; line-height:1.4;}
  .topbar-links a{display:inline-flex; align-items:center; gap:7px; text-decoration:none; opacity:.88; white-space:nowrap;}
  .topbar-links a:hover{opacity:1; text-decoration:underline;}

  /* ===== HEADER ===== */
  .jp-header{background:rgba(250,245,233,.96); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); position:fixed; top:0; left:0; right:0; width:100%; height:var(--header-h); z-index:80; box-shadow:0 4px 18px rgba(19,39,56,.08);}
  .jp-nav{min-height:74px; display:flex; align-items:center; justify-content:space-between; gap:24px;}
  .jp-brand{display:flex; align-items:center; text-decoration:none;}
  .jp-brand-text{display:flex; align-items:center; width:200px; min-width:150px; height:46px;}
  .jp-brand-logo{width:100%; height:100%; object-fit:contain; object-position:left center; display:block;}
  .jp-brand-fallback{font-family:'Shippori Mincho', serif; font-weight:700; font-size:20px; color:var(--prussian); white-space:nowrap;}
  .jp-menu{display:flex; align-items:center; gap:18px; flex-wrap:wrap;}
  .jp-menu .jp-cta{background:var(--rust); color:#fff; padding:11px 18px; border-radius:var(--r-sm); font-size:13px; font-weight:600; text-decoration:none; transition:background .18s ease, transform .18s ease;}
  .jp-menu .jp-cta:hover{background:var(--rust-deep); transform:translateY(-1px);}

  /* ===== HERO ===== */
  .hero{position:relative; overflow:hidden; border-bottom:1px solid var(--line); max-width:100vw; padding:0;}
  .hero-photo{position:absolute; inset:0; background-image:linear-gradient(100deg, rgba(250,245,233,.985) 0%, rgba(250,245,233,.96) 48%, rgba(250,245,233,.78) 68%, rgba(250,245,233,.38) 100%), url('https://images.unsplash.com/photo-1767794000619-09165200be45?fm=jpg&q=70&w=1800&auto=format&fit=crop'); background-size:cover; background-position:center 65%; opacity:.12;}
  .hero-inner{position:relative; z-index:2; display:grid; grid-template-columns:1.15fr .85fr; gap:56px; padding:40px 32px 48px; max-width:1180px; margin:0 auto; align-items:center;}
  .hero-inner > div{min-width:0;}
  .hero-title{font-size:clamp(34px, 4.6vw, 62px); line-height:1.08; margin:0 0 22px; word-break:break-word;}
  .hero-title em{font-style:italic; color:var(--prussian); font-weight:500;}
  .hero-sub{font-size:17.5px; max-width:620px; color:var(--ink); font-weight:500; margin-bottom:26px; text-shadow:0 1px 1px rgba(255,255,255,.65);}
  .hero-kicker{display:inline-flex; align-items:center; gap:8px; font-family:'IBM Plex Mono', monospace; font-size:11.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--rust); background:rgba(190,30,45,.08); border:1px solid rgba(190,30,45,.18); padding:6px 12px; border-radius:var(--r-pill);}
  .hero-actions{display:flex; gap:14px; flex-wrap:wrap; margin-bottom:34px;}
  .hero-stats{display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:0; border-top:1px solid var(--line); padding-top:24px;}
  .stat{min-width:0; display:flex; align-items:flex-start; gap:12px; padding:0 18px; border-right:1px solid var(--line);}
  .stat:first-child{padding-left:0;}
  .stat:last-child{border-right:none; padding-right:0;}
  .stat-icon{width:36px; height:36px; border-radius:50%; border:1.5px solid var(--rust); color:var(--rust); display:flex; align-items:center; justify-content:center; flex-shrink:0; background:var(--white);}
  .stat-text{display:flex; flex-direction:column; min-width:0;}
  .stat b{font-family:'Shippori Mincho', serif; font-size:25px; display:block; color:var(--prussian); font-weight:700; white-space:nowrap;}
  .stat span{font-size:11.5px; color:var(--ink-mute); font-family:'IBM Plex Mono', monospace; letter-spacing:.03em; line-height:1.3;}

  /* Ticket visual — the hero's signature element: a boarding pass to Japan */
  .ticket{background:var(--prussian); color:var(--white); border-radius:var(--r-md); padding:0; position:relative; box-shadow:var(--shadow-lg); overflow:hidden; width:100%; max-width:100%;}
  .hanko{position:absolute; top:18px; right:18px; width:56px; height:56px; border:2px solid var(--rust); border-radius:8px; color:#fff; background:var(--rust); display:flex; align-items:center; justify-content:center; transform:rotate(-8deg); z-index:3; box-shadow:0 6px 16px rgba(190,30,45,.4); pointer-events:none;}
  .hanko span{font-family:'Noto Sans JP', sans-serif; font-weight:700; font-size:19px; line-height:1.05; letter-spacing:1px;}
  .ticket::before{content:''; position:absolute; top:0; left:0; right:0; height:6px; background:repeating-linear-gradient(90deg, var(--gold) 0 14px, transparent 14px 24px);}
  .ticket-top{padding:32px 28px 24px; border-bottom:1px dashed rgba(255,255,255,.28); position:relative;}
  .ticket-notch{position:absolute; width:22px; height:22px; background:var(--paper); border-radius:50%; bottom:-11px;}
  .ticket-notch.left{left:-11px;} .ticket-notch.right{right:-11px;}
  .ticket-route{display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; gap:8px; flex-wrap:wrap;}
  .ticket-route .city{font-family:'Shippori Mincho', serif; font-size:23px; font-weight:700;}
  .ticket-route .arrow{font-family:'IBM Plex Mono', monospace; color:var(--gold-soft); font-size:11px; text-align:center; letter-spacing:.04em;}
  .ticket-route .sub{font-family:'IBM Plex Mono', monospace; font-size:10px; opacity:.68; letter-spacing:.07em; text-transform:uppercase; margin-top:4px;}
  .ticket-form-head{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--gold-soft); margin-bottom:16px;}
  .ticket-form .form-row{margin-bottom:14px;}
  .ticket-form-row{display:grid; grid-template-columns:1fr 1fr; gap:0 12px;}
  .ticket-form-row > .form-row{min-width:0;}
  .ticket-bottom{padding:18px 28px 26px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;}
  .ticket-bottom .barcode{display:flex; gap:2.5px; align-items:flex-end; height:32px;}
  .ticket-bottom .barcode i{display:block; width:2.5px; background:var(--gold-soft); opacity:.85; border-radius:1px;}
  .ticket-rating{font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--gold-soft); letter-spacing:.04em;}

  /* ===== EXAM BADGES STRIP ===== */
  .exam-strip{position:relative; z-index:2; background:linear-gradient(180deg, rgba(30,58,84,.05) 0%, var(--paper) 100%); border-top:1px dashed var(--line); padding:34px 0 44px; max-width:100vw; overflow:hidden;}
  .exam-strip .exam-head{text-align:center; margin-bottom:26px;}
  .exam-strip .exam-head .kicker{font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--rust); margin-bottom:8px; display:block;}
  .exam-strip .exam-head h3{font-family:'Shippori Mincho', serif; font-size:clamp(20px, 2.4vw, 26px); color:var(--prussian-deep); font-weight:600; line-height:1.3;}
  .exam-strip .exam-head h3 em{font-style:italic; color:var(--rust);}
  .exam-row{display:flex; justify-content:center; align-items:flex-start; gap:30px; flex-wrap:wrap; padding:6px 0;}
  .exam-badge{display:flex; flex-direction:column; align-items:center; gap:10px; text-decoration:none; color:inherit; transition:transform .22s var(--ease);}
  .exam-badge:hover{transform:translateY(-4px);}
  .exam-badge .badge-circle{width:76px; height:76px; border-radius:50%; background:var(--white); display:flex; align-items:center; justify-content:center; position:relative; box-shadow:var(--shadow-sm), 0 0 0 1px var(--line); overflow:hidden;}
  .exam-badge .badge-circle::before{content:''; position:absolute; inset:3px; border-radius:50%; border:2px solid var(--ring, var(--prussian)); background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.9), rgba(228,244,242,.6));}
  .exam-badge .badge-inner{position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%;}
  .exam-badge .badge-letter{font-family:'Shippori Mincho', serif; font-weight:700; font-size:23px; color:var(--ring, var(--prussian-deep)); line-height:1;}
  .exam-badge .badge-code{font-family:'IBM Plex Sans', sans-serif; font-size:9px; font-weight:700; letter-spacing:.06em; color:var(--accent, #0A2422); margin-top:4px; text-transform:uppercase;}
  .exam-badge .badge-code.wide{letter-spacing:.02em;}
  .exam-badge .badge-flag{position:absolute; top:7px; left:50%; transform:translateX(-50%); width:14px; height:14px; border-radius:50%; background:#fff; border:1.5px solid var(--jp-red); z-index:3; box-shadow:0 1px 2px rgba(0,0,0,.15);}
  .exam-badge .badge-caption{font-family:'IBM Plex Mono', monospace; font-size:10.5px; letter-spacing:.03em; color:var(--ink-mute); text-align:center; max-width:100px; line-height:1.35;}
  .exam-badge .badge-caption b{color:var(--prussian-deep); font-weight:600; font-family:'IBM Plex Sans', sans-serif;}

  /* ===== SECTION RHYTHM ===== */
  section{padding:var(--section-pad) 0; max-width:100vw; overflow-x:hidden;}
  .sec-head{max-width:660px; margin-bottom:44px;}
  .sec-head .kicker{display:inline-block; font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--gold-soft); margin-bottom:12px;}
  .sec-head h2{font-size:clamp(28px,3.4vw,42px); line-height:1.14;}
  .sec-head p{color:var(--ink-soft); font-size:16px; margin-top:14px; max-width:580px;}
  .sec-head-row{display:flex; align-items:center; justify-content:flex-start; gap:32px; margin-bottom:44px;}
  .sec-head-row .sec-head{margin-bottom:0;}
  .sec-icon-big{flex-shrink:0; width:112px; height:112px; color:var(--rust); opacity:.9;}
  .sec-icon-big svg{width:100%; height:100%;}
  @media (max-width: 720px){
    :root{--header-h:66px;}
    .sec-head-row{flex-direction:row; align-items:center; justify-content:flex-start; gap:16px;}
    .sec-icon-big{width:64px; height:64px; align-self:center;}
  }

  /* ===== GENERIC CARD LOOK — used across grids for consistency ===== */
  .skill-stamp, .feature, .mode-card, .curriculum-card, .audience-card, .detail-box, .fact-box, .included-item, .batch-card{
    background:var(--white);
  }

  /* ===== WHAT YOU'LL LEARN ===== */
  .skills-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .skill-stamp{padding:32px 26px 28px; position:relative; min-width:0;}
  .skill-stamp .skill-native{width:54px; height:54px; border:2px solid var(--rust); border-radius:var(--r-sm); display:flex; align-items:center; justify-content:center; font-family:'Noto Sans JP', 'Shippori Mincho', serif; font-weight:700; font-size:23px; color:var(--rust); margin-bottom:18px;}
  .skill-stamp .skill-en{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); margin-bottom:14px; display:block;}
  .skill-stamp p{font-size:13.8px; color:var(--ink-soft);}

  /* ===== JOURNEY / RAIL LINE ===== */
  .journey{background:var(--prussian-deep); color:var(--white); position:relative; overflow:hidden;}
  .journey .sec-head p{color:rgba(255,255,255,.68);}
  .journey .sec-head h2{color:var(--white);}
  .journey .wrap{position:relative; z-index:2;}
  .rail-wrap{position:relative; padding-top:14px;}
  .rail{display:grid; grid-template-columns:repeat(6, 1fr); gap:0; position:relative; align-items:start;}
  .rail::before{content:''; position:absolute; top:23px; left:0; right:0; height:3px; background:repeating-linear-gradient(90deg, var(--gold) 0 10px, transparent 10px 18px);}
  .stop{padding:0 18px 0 0; position:relative; min-width:0;}
  .stop:last-child{padding-right:0;}
  .stop-dot{width:46px; height:46px; border-radius:50%; background:var(--prussian-deep); border:3px solid var(--gold); position:relative; z-index:2; margin-bottom:20px; display:flex; align-items:center; justify-content:center; color:var(--gold-soft); font-family:'IBM Plex Mono', monospace; font-weight:700; font-size:14px; box-shadow:0 0 0 5px var(--prussian-deep);}
  .stop-dot.final{background:var(--gold); border-color:var(--white); color:var(--prussian-deep);}
  .stop-code{font-family:'IBM Plex Mono', monospace; font-size:12.5px; color:var(--gold-soft); letter-spacing:.06em;}
  .stop h3{font-family:'Shippori Mincho', serif; font-size:21px; margin:7px 0 9px; font-weight:600; max-width:190px; color:var(--white);}
  .stop p{font-size:13.4px; color:rgba(255,255,255,.72); line-height:1.55; max-width:190px;}
  .rail-flag{position:absolute; right:18px; top:-8px; font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--gold-soft); letter-spacing:.08em; text-transform:uppercase;}
  .unlock-tag{display:inline-block; margin-top:13px; font-family:'IBM Plex Mono', monospace; font-size:10.5px; letter-spacing:.03em; color:var(--prussian-deep); background:var(--gold-soft); padding:6px 10px; border-radius:var(--r-sm); font-weight:500;}

  /* ===== LANGUAGE FACTS ===== */
  .lang-facts{background:var(--paper); border-top:1px solid var(--line);}
  .lang-photo{width:100%; height:290px; object-fit:cover; object-position:center 30%; border-radius:var(--r-md); margin-bottom:24px; border:1px solid var(--line); box-shadow:var(--shadow-sm);}
  .lang-inner{display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start;}
  .lang-inner > div{min-width:0;}
  .lang-copy p{color:var(--ink-soft); font-size:15.5px; margin-bottom:18px; max-width:480px;}
  .lang-copy p:last-child{margin-bottom:0;}
  .fact-strip{display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden; margin-top:8px;}
  .fact-box{padding:26px 24px; min-width:0;}
  .fact-box b{font-family:'Shippori Mincho', serif; font-size:27px; display:block; color:var(--prussian); font-weight:700; line-height:1;}
  .fact-box span{font-size:12.5px; color:var(--ink-mute); display:block; margin-top:9px; line-height:1.45;}
  .cognates{margin-top:28px; border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden; background:var(--white);}
  .cognates-head{display:grid; grid-template-columns:1fr 1fr 1fr; background:var(--prussian); color:var(--white); font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:.06em; text-transform:uppercase;}
  .cognates-head div{padding:11px 16px; min-width:0;}
  .cognate-row{display:grid; grid-template-columns:1fr 1fr 1fr; border-top:1px solid var(--line); font-size:14px;}
  .cognate-row div{padding:12px 16px; min-width:0; overflow-wrap:break-word;}
  .cognate-row div:first-child{font-weight:600; font-family:'Shippori Mincho', serif; font-style:italic;}
  .cognate-row div:last-child{color:var(--ink-mute); font-size:13px;}
  .lang-note{margin-top:26px; border:1px solid var(--line); border-radius:var(--r-md); padding:22px 24px; background:var(--white);}
  .lang-note h4{font-family:'IBM Plex Mono', monospace; font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); margin-bottom:11px;}
  .lang-note p{font-size:14px; color:var(--ink-soft); line-height:1.65;}

  /* ===== COURSE DETAILS / QUICK FACTS ===== */
  .course-details{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .details-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .detail-box{padding:26px 22px; min-width:0;}
  .detail-label{font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:.08em; font-size:10.5px; color:var(--rust); margin-bottom:8px;}
  .detail-value{font-family:'Shippori Mincho', serif; font-size:20px; font-weight:600; line-height:1.25;}
  .detail-note{font-size:12.5px; color:var(--ink-mute); margin-top:7px;}

  /* ===== WHO THIS IS FOR ===== */
  .audience-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:16px;}
  .audience-card{border:1px solid var(--line); padding:28px 24px; border-radius:var(--r-md); min-width:0; transition:box-shadow .2s ease, transform .2s ease;}
  .audience-card:hover{box-shadow:var(--shadow-md); transform:translateY(-3px);}
  .audience-num{font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:.08em; font-size:10px; color:var(--rust); margin-bottom:17px;}
  .audience-card h3{font-size:20px; margin-bottom:9px;}
  .audience-card p{font-size:13.5px; color:var(--ink-soft);}

  /* ===== FEATURES ===== */
  .features-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .feature{padding:38px 32px; min-width:0;}
  .feature .fnum{font-family:'IBM Plex Mono', monospace; font-size:11.5px; color:var(--rust); letter-spacing:.08em; text-transform:uppercase;}
  .feature h3{font-size:21px; margin:15px 0 11px; font-weight:600;}
  .feature p{font-size:14.3px; color:var(--ink-soft);}

  /* ===== MODES ===== */
  .modes{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .modes-photo{width:100%; height:450px; object-fit:cover; border-radius:var(--r-md); margin-bottom:34px; border:1px solid var(--line); box-shadow:var(--shadow-md);}
  .modes-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:20px;}
  .mode-card{border:1px solid var(--line); border-radius:var(--r-md); padding:30px 26px; position:relative; overflow:hidden; min-width:0; border-top:4px solid var(--gold);}
  .mode-card h3{font-size:20px; margin-bottom:11px;}
  .mode-card p{font-size:14px; color:var(--ink-soft); margin-bottom:16px;}
  .mode-tag{font-family:'IBM Plex Mono', monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); background:rgba(30,58,84,.08); padding:5px 10px; border-radius:var(--r-sm); display:inline-block;}

  /* ===== CURRICULUM ===== */
  .curriculum-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
  .curriculum-card{border:1px solid var(--line); border-radius:var(--r-md); padding:26px 24px;}
  .curriculum-level{color:var(--rust); font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:.06em; text-transform:uppercase;}
  .curriculum-card h3{font-size:22px; margin:8px 0 9px;}
  .curriculum-card p{font-size:13.5px; color:var(--ink-soft); margin-bottom:16px;}
  .curriculum-card ul{list-style:none; display:grid; gap:9px;}
  .curriculum-card li{font-size:13px; color:var(--ink); padding-left:19px; position:relative;}
  .curriculum-card li::before{content:'✓'; position:absolute; left:0; color:var(--prussian); font-weight:700;}

  /* ===== STUDY HOURS ===== */
  .study-hours{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .hours-chart{display:flex; flex-direction:column; gap:20px; max-width:840px;}
  .hours-row{display:grid; grid-template-columns:56px 1fr 92px; align-items:center; gap:18px;}
  .hours-level{font-family:'Shippori Mincho', serif; font-weight:700; font-size:19px; color:var(--ink);}
  .hours-track{height:14px; background:var(--white); border:1px solid var(--line); border-radius:var(--r-pill); overflow:hidden; position:relative;}
  .hours-bar{height:100%; background:linear-gradient(90deg, var(--rust), var(--gold)); border-radius:var(--r-pill); transition:width .4s ease;}
  .hours-value{font-family:'IBM Plex Mono', monospace; font-size:12.5px; color:var(--prussian-deep); text-align:right; white-space:nowrap;}
  .hours-note{font-size:12.5px; color:var(--ink-mute); margin-top:20px; max-width:640px;}

  /* ===== METHODOLOGY ===== */
  .methodology{background:var(--paper);}
  .method-grid{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .method-step{background:var(--white); padding:30px 24px;}
  .step-no{font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--rust); letter-spacing:.05em;}
  .method-step h3{font-size:19px; margin:14px 0 9px;}
  .method-step p{font-size:13px; color:var(--ink-soft);}

  /* ===== WHAT'S INCLUDED ===== */
  .included{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .included-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:12px;}
  .included-item{border:1px solid var(--line); border-radius:var(--r-sm); padding:17px 19px; display:flex; gap:12px; align-items:flex-start;}
  .included-item .tick{width:22px; height:22px; border-radius:50%; background:var(--gold-soft); color:var(--prussian-deep); display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0; font-size:12px;}
  .included-item span:last-child{font-size:13.5px; color:var(--ink);}

  /* ===== PATHWAYS ===== */
  .pathways{background:var(--prussian-deep); color:var(--white);}
  .pathways .sec-head h2{color:var(--white);}
  .pathways .sec-head p{color:rgba(255,255,255,.68);}
  .path-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:22px;}
  .path-card{background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.14); border-radius:var(--r-lg); padding:30px 26px; position:relative; overflow:hidden; min-width:0;}
  .path-photo-wrap{width:calc(100% + 52px); height:150px; margin:-30px -26px 22px; overflow:hidden; position:relative; display:block;}
  .path-photo{width:100%; height:100%; object-fit:cover; display:block;}
  .path-card .path-icon{width:46px; height:46px; border-radius:50%; background:var(--gold); color:var(--prussian-deep); display:flex; align-items:center; justify-content:center; margin-bottom:20px; flex-shrink:0;}
  .path-card h3{font-size:23px; margin-bottom:7px; color:var(--white);}
  .path-card .path-tag{font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--gold-soft); text-transform:uppercase; letter-spacing:.08em;}
  .path-card ul{margin-top:19px; list-style:none; display:flex; flex-direction:column; gap:12px;}
  .path-card li{display:flex; gap:10px; font-size:14px; color:rgba(255,255,255,.82); line-height:1.5;}
  .path-card li::before{content:'◦'; color:var(--gold); flex-shrink:0;}

  /* ===== CAREERS ===== */
  .career-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:18px;}
  .career-card{border:1px solid var(--line); border-radius:var(--r-md); padding:28px 26px;}
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
  .batch-card{border:1px solid var(--line); border-radius:var(--r-md); padding:28px 24px; position:relative;}
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
  .faq-item summary{padding:21px 26px; cursor:pointer; font-weight:600; font-size:15.5px; list-style:none; display:flex; justify-content:space-between; align-items:center; gap:12px;}
  .faq-item summary::-webkit-details-marker{display:none;}
  .faq-item summary::after{content:'+'; font-family:'IBM Plex Mono', monospace; font-size:20px; color:var(--rust); flex-shrink:0; transition:transform .2s ease;}
  .faq-item[open] summary::after{transform:rotate(45deg);}
  .faq-item .faq-a{padding:0 26px 22px; font-size:14.3px; color:var(--ink-soft); max-width:720px;}

  /* ===== JAPANESE ACTIVITIES SLIDER ===== */
  .activities{background:var(--ink); color:var(--white); position:relative; overflow:hidden;}
  .activities .wrap{position:relative; z-index:2;}
  .activities .sec-head h2{color:var(--white);}
  .activities .sec-head p{color:rgba(255,255,255,.65);}
  .activity-slider{position:relative;}
  .activity-viewport{overflow:hidden; border-radius:var(--r-lg);}
  .activity-track{display:flex; align-items:stretch; transition:transform .5s var(--ease); touch-action:pan-y;}
  .activity-slide{flex-shrink:0; padding:0 8px; min-width:0; display:flex;}
  .activity-card{background:linear-gradient(145deg,#1C2E42,#142536); border:1px solid var(--line-on-dark); border-radius:var(--r-lg); width:100%; height:100%; display:flex; flex-direction:column; position:relative; overflow:hidden;}
  .activity-image{width:100%; aspect-ratio:5/0; height:auto; object-fit:contain; object-position:center; display:block; flex-shrink:0; background:#142536;}
  .activity-image-wrap{position:relative; overflow:hidden; background:#142536;}
  .activity-image-wrap::after{content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(10,20,30,0) 45%,rgba(10,20,30,.45) 100%); pointer-events:none;}
  .activity-content{padding:18px 18px 20px; position:relative; z-index:2; flex:1; display:flex; flex-direction:column;}
  .activity-content p{margin-top:auto; padding-top:10px;}
  .activity-card::after{content:''; position:absolute; right:-8px; bottom:-18px; pointer-events:none;}
  .activity-icon{width:36px; height:36px; border:1.5px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-soft); font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:700; margin-bottom:10px; background:rgba(20,37,54,.92);}
  .activity-tag{font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.08em; color:var(--gold-soft); text-transform:uppercase;}
  .activity-card h3{font-size:17px; color:var(--white); margin:6px 0 9px;}
  .activity-card p{font-size:13px; color:rgba(255,255,255,.72); line-height:1.55; min-height:4.65em; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;}
  .activity-controls{display:flex; align-items:center; justify-content:space-between; margin-top:28px; gap:20px;}
  .activity-arrows{display:flex; gap:10px;}
  .activity-arrow{width:44px; height:44px; border-radius:50%; border:1.5px solid rgba(255,255,255,.25); background:transparent; color:var(--white); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .18s ease, border-color .18s ease, transform .18s ease;}
  .activity-arrow:hover{background:rgba(255,255,255,.1); border-color:var(--gold-soft); transform:translateY(-1px);}
  .activity-dots{display:flex; gap:8px; flex-wrap:wrap;}
  .activity-dot{width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.25); border:none; cursor:pointer; padding:0; transition:width .2s ease, background .2s ease;}
  .activity-dot.active{background:var(--gold); width:22px; border-radius:var(--r-pill);}

  /* ===== FINAL CTA ===== */
  .final-cta{background:var(--prussian-deep); color:var(--white); text-align:center; position:relative; overflow:hidden;}
  .final-cta .wrap{position:relative; z-index:2;}
  .final-cta .kicker{font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.12em; color:var(--gold-soft);}
  .final-cta h2{font-size:clamp(30px,4vw,48px); margin:14px auto; max-width:760px; color:var(--white);}
  .final-cta p{max-width:650px; margin:0 auto 28px; color:rgba(255,255,255,.7); font-size:16px;}
  .final-cta-actions{display:flex; justify-content:center; gap:12px; flex-wrap:wrap;}
  .final-cta .btn-ghost{border-color:rgba(255,255,255,.45); color:var(--white);}
  .final-cta .btn-ghost:hover{background:var(--white); color:var(--ink);}
  .final-cta .microcopy{font-family:'IBM Plex Mono', monospace; font-size:10.5px; color:rgba(255,255,255,.5); margin-top:18px;}

  /* ===== CONTACT ===== */
  .contact{background:var(--paper);}
  .contact-grid{display:grid; grid-template-columns:.95fr 1.05fr; gap:60px; align-items:start;}
  .contact-grid > div{min-width:0;}
  .contact-list{display:flex; flex-direction:column; gap:0; border-top:1px solid var(--line);}
  .contact-row{display:flex; gap:18px; padding:23px 0; border-bottom:1px solid var(--line); align-items:flex-start;}
  .contact-icon{width:42px; height:42px; border-radius:50%; background:var(--prussian); color:var(--white); display:flex; align-items:center; justify-content:center; flex-shrink:0;}
  .contact-row > div:last-child{min-width:0;}
  .contact-row h4{font-size:12px; font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:.08em; color:var(--ink-mute); margin-bottom:6px;}
  .contact-row a, .contact-row div.val{font-size:16.5px; font-weight:600; text-decoration:none; word-break:break-word;}
  .contact-row a:hover{color:var(--rust);}
  .contact-row .note{font-size:13px; color:var(--ink-soft); font-weight:400; margin-top:4px;}
  .social-row{display:flex; gap:12px; margin-top:26px; flex-wrap:wrap;}
  .social-chip{width:38px; height:38px; border-radius:50%; border:1.5px solid var(--ink); display:flex; align-items:center; justify-content:center; text-decoration:none; color:var(--ink); transition:all .2s ease; flex-shrink:0;}
  .social-chip:hover{background:var(--ink); color:var(--paper);}

  .enroll-card{background:var(--prussian); color:var(--white); border-radius:var(--r-lg); padding:40px 36px; position:relative; overflow:hidden; box-shadow:var(--shadow-lg);}
  .enroll-card::before{content:''; position:absolute; top:-60px; right:-60px; width:180px; height:180px; border-radius:50%; background:rgba(199,162,79,.22);}
  .enroll-card h3{font-size:24px; margin-bottom:9px; position:relative; color:var(--white);}
  .enroll-card p{font-size:14px; color:rgba(255,255,255,.7); margin-bottom:28px; position:relative;}
  .form-row{margin-bottom:17px; position:relative;}
  .form-row label{display:block; font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px; color:var(--gold-soft);}
  .form-row input{width:100%; box-sizing:border-box; padding:13px 14px; border-radius:var(--r-sm); border:1px solid rgba(255,255,255,.25); background:rgba(255,255,255,.06); color:var(--white); font-family:'IBM Plex Sans', sans-serif; font-size:14.5px; min-height:48px; line-height:1.3;}
  .form-row input::placeholder{color:rgba(255,255,255,.4);}
  .form-row input:focus{outline:2px solid var(--gold); outline-offset:1px; background:rgba(255,255,255,.1);}
  .field-error{display:block; margin-top:7px; font-size:12px; color:#FF8A80; font-family:'IBM Plex Sans', sans-serif;}
  .submit-btn{width:100%; padding:15px; background:var(--rust); color:var(--white); border:none; border-radius:var(--r-sm); font-weight:600; font-size:15px; cursor:pointer; margin-top:6px; transition:transform .18s ease, background .18s ease; font-family:'IBM Plex Sans', sans-serif;}
  .submit-btn:hover{transform:translateY(-2px); background:var(--rust-deep);}
  .submit-btn:disabled{opacity:.7; cursor:not-allowed; transform:none;}
  .form-msg{font-size:12.5px; margin-top:14px; color:var(--gold-soft); font-family:'IBM Plex Mono', monospace;}
  .form-alt{display:flex; align-items:center; gap:10px; margin-top:22px; padding-top:22px; border-top:1px dashed rgba(255,255,255,.2); flex-wrap:wrap;}

  /* ===== MAP STRIP ===== */
  .map-strip{border-top:1px solid var(--line); border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; padding:24px 0; flex-wrap:wrap; gap:16px;}
  .map-strip a{text-decoration:none; font-weight:600; display:inline-flex; align-items:center; gap:8px; color:var(--rust);}

  /* ===== FOOTER ===== */
  .jp-footer{background:var(--prussian-deep); color:#fff; position:relative; overflow:hidden; padding:64px 0 30px;}
  .jp-footer .wrap{position:relative; z-index:2;}
  .footer-grid{display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; padding-bottom:40px; border-bottom:1px solid var(--line-on-dark);}
  .footer-brand h2{font-family:'Shippori Mincho',serif; font-size:28px; margin-bottom:7px; color:var(--white);}
  .footer-brand .jp-motto{font-family:'IBM Plex Sans',sans-serif; font-style:italic; color:var(--gold-soft); font-size:14px; margin-bottom:15px;}
  .footer-brand p{font-size:13px; color:rgba(255,255,255,.62); max-width:360px;}
  .footer-col h4{font-family:'IBM Plex Sans',sans-serif; color:var(--gold-soft); font-size:13px; margin-bottom:14px; letter-spacing:.04em; text-transform:uppercase;}
  .footer-col a{display:block; text-decoration:none; color:rgba(255,255,255,.68); font-size:13px; margin:9px 0; transition:color .15s ease;}
  .footer-col a:hover{color:#fff;}
  .footer-bottom{display:flex; justify-content:space-between; gap:20px; align-items:center; padding-top:22px; flex-wrap:wrap;}
  .footer-bottom span{font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:rgba(255,255,255,.45);}

  /* ===== FLOATING ACTIONS ===== */
  .wa-float{position:fixed; bottom:26px; right:26px; z-index:100; width:60px; height:60px; border-radius:50%; background:#1F9C56; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 26px rgba(31,156,86,.45); text-decoration:none; animation:wa-pulse 2.6s infinite;}
  .wa-float:hover{transform:scale(1.06);}
  @keyframes wa-pulse{0%{box-shadow:0 10px 26px rgba(31,156,86,.45), 0 0 0 0 rgba(31,156,86,.5);} 70%{box-shadow:0 10px 26px rgba(31,156,86,.45), 0 0 0 16px rgba(31,156,86,0);} 100%{box-shadow:0 10px 26px rgba(31,156,86,.45), 0 0 0 0 rgba(31,156,86,0);}}
  .wa-tip{position:fixed; bottom:38px; right:96px; z-index:100; background:var(--ink); color:var(--white); padding:9px 14px; border-radius:var(--r-sm); font-size:13px; font-weight:500; opacity:0; pointer-events:none; transition:opacity .25s ease; white-space:nowrap;}
  .wa-float:hover + .wa-tip, .wa-tip.show{opacity:1;}
  .call-float{position:fixed; bottom:26px; left:26px; z-index:100; width:60px; height:60px; border-radius:50%; background:var(--rust); display:flex; align-items:center; justify-content:center; box-shadow:0 10px 26px rgba(190,30,45,.4); text-decoration:none;}
  .call-float:hover{transform:scale(1.06);}
  .call-tip{position:fixed; bottom:38px; left:96px; z-index:100; background:var(--ink); color:var(--white); padding:9px 14px; border-radius:var(--r-sm); font-size:13px; font-weight:500; opacity:0; pointer-events:none; transition:opacity .25s ease; white-space:nowrap;}
  .call-float:hover + .call-tip{opacity:1;}

  /* ============================================================
     RESPONSIVE
  ============================================================ */
  @media (max-width: 1180px){
    .path-grid{grid-template-columns:1fr 1fr;}
    .wrap{padding:0 24px;}
  }
  @media (max-width: 980px){
    .details-grid,.audience-grid,.curriculum-grid,.method-grid,.included-grid{grid-template-columns:1fr 1fr;}
    .batch-grid,.career-grid{grid-template-columns:1fr;}
    .hero-inner{grid-template-columns:1fr; padding-top:26px;}
    .ticket{max-width:460px; margin:0 auto;}
    .features-grid{grid-template-columns:1fr 1fr;}
    .modes-grid{grid-template-columns:1fr;}
    .contact-grid{grid-template-columns:1fr;}
    .rail{grid-template-columns:1fr 1fr; row-gap:36px;}
    .rail::before{display:none;}
    .stop h3, .stop p{max-width:none;}
    .lang-inner{grid-template-columns:1fr;}
    .path-grid{grid-template-columns:1fr;}
    .fact-strip{grid-template-columns:1fr 1fr;}
    .skills-grid{grid-template-columns:1fr 1fr;}
    section{padding:52px 0;}
    .exam-row{gap:20px;}
    .exam-badge .badge-circle{width:68px; height:68px;}
    .exam-badge .badge-letter{font-size:21px;}
    .hero-stats{grid-template-columns:repeat(2,minmax(0,1fr)); row-gap:18px;}
    .stat:nth-child(2){border-right:0;}
    .stat:nth-child(3){padding-left:0;}
    .footer-grid{grid-template-columns:1fr 1fr;}
    .footer-brand{grid-column:1/-1;}
  }
  @media (max-width: 720px){
    .method-grid{grid-template-columns:1fr;}
    .modes-photo{height:170px;}
    .lang-photo{height:160px;}
    .path-photo-wrap{height:120px;}
    .details-grid,.audience-grid,.curriculum-grid,.method-grid,.included-grid{grid-template-columns:1fr;}
    .topbar-links{gap:5px 14px; font-size:10.5px;}
    .topbar .wrap{padding:7px 20px;}
    .wrap{padding:0 20px;}
    .features-grid{grid-template-columns:1fr;}
    .btn{white-space:normal; text-align:center; justify-content:center;}
    .hero-inner{padding:14px 20px 28px; gap:22px;}
    .hero-title{margin:0 0 14px;}
    .hero-sub{margin-bottom:18px;}
    .hero-actions{margin-bottom:22px;}
    .hero-stats{padding-top:16px;}
    .stat{padding:0 12px;}
    .rail{grid-template-columns:1fr; row-gap:30px;}
    .ticket-form-row{grid-template-columns:1fr; row-gap:14px;}
    .ticket-form .form-row{margin-bottom:14px;}
    .ticket-form-head{text-align:center;}
    .ticket-top{padding:26px 22px 20px;}
    .form-row label{font-size:10.5px; margin-bottom:6px;}
    .form-row input{padding:12px 13px; font-size:16px;}
    .skills-grid{grid-template-columns:1fr;}
    .path-grid{grid-template-columns:1fr;}
    .contact-row{gap:14px;}
    .activity-arrow{width:40px; height:40px;}
    section{padding:44px 0;}
    .sec-head{margin-bottom:30px;}
    .lang-facts{padding-bottom:26px;}
    #why{padding-top:26px;}
    .exam-row{gap:14px; justify-content:flex-start; overflow-x:auto; flex-wrap:nowrap; padding:6px 4px 12px; -webkit-overflow-scrolling:touch;}
    .exam-badge{flex-shrink:0;}
    .exam-badge .badge-circle{width:60px; height:60px;}
    .exam-badge .badge-letter{font-size:18px;}
    .exam-badge .badge-code{font-size:8px;}
    .exam-badge .badge-caption{font-size:9.5px; max-width:82px;}
    .exam-strip{padding:26px 0 34px;}
    .jp-nav{min-height:66px; height:66px; padding-top:8px; padding-bottom:8px;}
    .jp-brand-text{width:150px; min-width:130px; height:38px;}
    .footer-grid{grid-template-columns:1fr 1fr; gap:28px;}
    .footer-brand{grid-column:1/-1;}
    .activity-content{padding:16px 16px 18px;}
    .hanko{top:12px; right:12px; width:48px; height:48px;}
    .hanko span{font-size:16px;}
    .ticket-route{padding-right:56px;}
  }
  @media (max-width: 480px){
    .sec-head h2{font-size:clamp(26px,8vw,34px); line-height:1.18;}
    .jp-nav{gap:12px;}
    .jp-brand-text{width:120px; min-width:96px; height:34px;}
    .jp-menu .jp-cta{padding:9px 13px; font-size:11.5px;}
    .hero-title{font-size:clamp(28px, 9vw, 40px);}
    .hero-sub{font-size:15.5px;}
    .stat b{font-size:20px;}
    .ticket-top, .ticket-bottom{padding-left:20px; padding-right:20px;}
    .ticket-top{padding-top:52px;}
    .ticket-route .city{font-size:19px;}
    .enroll-card{padding:26px 22px;}
    .path-card{padding:24px 20px;}
    .feature{padding:28px 22px;}
    .skill-stamp{padding:24px 20px;}
    .activity-card p{font-size:13px;}
    .activity-slide{padding:0 6px;}
    .btn{padding:12px 17px; font-size:13.5px;}
    .wa-float{width:52px; height:52px; bottom:16px; right:16px;}
    .wa-tip{right:76px; bottom:26px; font-size:11.5px; padding:7px 11px;}
    .call-float{width:52px; height:52px; bottom:16px; left:16px;}
    .call-tip{left:76px; bottom:26px; font-size:11.5px; padding:7px 11px;}
    .faq-item summary{padding:16px 18px; font-size:14px;}
    .faq-item .faq-a{padding:0 18px 18px; font-size:13.6px;}
    .fact-strip{grid-template-columns:1fr;}
    .cognates-head div, .cognate-row div{padding:9px 10px; font-size:12.5px;}
    .contact-row a, .contact-row div.val{font-size:15px;}
    .hero-actions{flex-direction:column; align-items:stretch;}
    .hero-actions .btn{white-space:normal; justify-content:center; text-align:center;}
    .final-cta-actions{flex-direction:column; align-items:stretch;}
    .ticket-route{justify-content:center; text-align:center; gap:14px; padding-right:0;}
    .ticket-route > div:last-child{text-align:center !important;}
    .hero-stats{grid-template-columns:1fr 1fr;}
    .stat{border-right:1px solid var(--line);}
    .stat:nth-child(even){border-right:0;}
    .stat:nth-child(2), .stat:nth-child(4){padding-left:12px;}
    .footer-grid{grid-template-columns:1fr 1fr; gap:20px;}
    .footer-brand{grid-column:1/-1;}
    .sec-icon-big{width:52px; height:52px;}
    .hanko{top:14px; right:50%; transform:translateX(50%) rotate(-8deg);}
  }
  `}</style>

      {/* JAPANESE HEADER */}
      <header className="jp-header">
        <div className="wrap jp-nav">
          <a className="jp-brand" href="#top" aria-label="Langma Japanese Course">
            <span className="jp-brand-text">
              <img
                src="https://www.langmainternational.com/images/lngm2.png"
                alt="Langma International"
                className="jp-brand-logo"
              />
            </span>
          </a>
          <nav className="jp-menu" aria-label="Japanese course navigation">
            <a className="jp-cta" href="#contact">Free Counselling</a>
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
        <div className="hero-photo" aria-hidden="true"></div>
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div>
            <h1 className="hero-title">Learn Japanese <em>from zero</em><br />to a life in Japan.</h1>
            <p className="hero-sub">Learn Japanese with native-speaking trainers, small live batches and full visa &amp; placement support. Our course covers N5–N1, prepares you for every major Japanese language exam, and takes you from hiragana to career-ready, all from a school that's been teaching languages in Delhi since 2007.</p>
            <div className="hero-actions">
              <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20a%20free%20Japanese%20demo%20class." target="_blank" rel="noopener" className="btn btn-wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
                Chat on WhatsApp
              </a>
              <a href="tel:+919810117094" className="btn btn-ghost">Talk to a Japanese Counsellor</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
                <div className="stat-text"><b>13+ yrs</b><span>TEACHING IN DELHI</span></div>
              </div>
              <div className="stat">
                <div className="stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></div>
                <div className="stat-text"><b>N5–N1</b><span>ALL JLPT LEVELS</span></div>
              </div>
              <div className="stat">
                <div className="stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.7z"/></svg></div>
                <div className="stat-text"><b>4.6★</b><span>GOOGLE RATING</span></div>
              </div>
              <div className="stat">
                <div className="stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                <div className="stat-text"><b>Expert</b><span>TRAINERS</span></div>
              </div>
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
                  <div className="city">JPN</div>
                  <div className="sub">Your Future, Japan</div>
                </div>
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
                <input type="hidden" name="language" value="Japanese" />
                <input type="hidden" name="message" value="Japanese Language Course enquiry" />
                <button type="submit" className="submit-btn" disabled={heroSubmitting}>
                  {heroSubmitting ? "Submitting..." : heroSubmitted ? "Details Requested ✓" : "Get Course Details →"}
                </button>
                {heroFormMessage && (
                  <div className="form-msg" role="status">{heroSubmitted ? `✓ ${heroFormMessage}` : heroFormMessage}</div>
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
              <div className="ticket-rating">{heroSubmitted ? 'SEAT CONFIRMED ✓' : 'COURSE DETAILS AVAILABLE'}</div>
            </div>
          </div>
        </div>

        {/* ===== JAPANESE EXAM CERTIFICATION LOGOS STRIP ===== */}
        <div className="exam-strip">
          <div className="wrap">
            <div className="exam-head">
              <span className="kicker">Official Japanese Language Exam Preparation</span>
              <h3>Learn Japanese &amp; ace every major <em>Japanese Language</em> certification</h3>
            </div>
            <div className="exam-row" role="list" aria-label="Japanese language certification exams we prepare you for">
              {EXAM_BADGES.map((b, i) => {
                const codeClass = b.code.length > 5 ? 'badge-code wide' : 'badge-code';
                return (
                  <div className="exam-badge" role="listitem" key={i}
                       style={{ '--ring': b.ring, '--accent': b.accent }}>
                    <div className="badge-circle">
                      <div className="badge-flag" aria-hidden="true"></div>
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

      {/* COURSE DETAILS / QUICK FACTS */}
      <section className="course-details" id="course-details"><div className="wrap"><div className="sec-head-row"><div className="sec-head"><h2>Know the course before you enrol.</h2><p>Everything you need to choose the right Japanese language learning path, including the current course format and how to get fee details.</p></div><div className="sec-icon-big" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="14" width="80" height="96" rx="10" stroke="currentColor" strokeWidth="6"/><path d="M45 14h30v10a4 4 0 0 1-4 4H49a4 4 0 0 1-4-4V14z" fill="currentColor"/><path d="M34 46l6 6 12-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 44h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><path d="M34 74l6 6 12-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 72h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><path d="M34 96h52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".45"/></svg></div></div><div className="details-grid"><div className="detail-box"><div className="detail-label">Levels</div><div className="detail-value">N5 → N1</div><div className="detail-note">Beginner to advanced</div></div><div className="detail-box"><div className="detail-label">Learning Modes</div><div className="detail-value">Online / Offline</div><div className="detail-note">Hybrid option available</div></div><div className="detail-box"><div className="detail-label">Location</div><div className="detail-value">South Delhi</div><div className="detail-note">South Extension I, New Delhi</div></div><div className="detail-box"><div className="detail-label">Course Fee</div><div className="detail-value">Get Fee Details</div><div className="detail-note">Ask a counsellor for current fees &amp; batches</div></div></div></div></section>

      {/* WHO THIS IS FOR */}
      <section id="who"><div className="wrap"><div className="sec-head"><h2>Japanese for the goal you're working towards.</h2><p>Whether you're starting from zero or already know Japanese, choose a learning route that matches your objective.</p></div><div className="audience-grid"><div className="audience-card"><div className="audience-num">Students</div><h3>Study in Japan</h3><p>Build Japanese proficiency for language-school, university and higher-education pathways.</p></div><div className="audience-card"><div className="audience-num">Career</div><h3>Work in Japan</h3><p>Prepare for Japanese communication, workplace vocabulary, interviews and career pathways.</p></div><div className="audience-card"><div className="audience-num">SSW</div><h3>Specified Skilled Worker</h3><p>Build the Japanese skills needed for relevant JFT-Basic or JLPT N4-level pathways, alongside sector preparation where applicable.</p></div><div className="audience-card"><div className="audience-num">Personal</div><h3>Travel &amp; Culture</h3><p>Learn practical Japanese for travel, conversation, Japanese media and cultural understanding.</p></div></div></div></section>

      {/* WHAT YOU'LL LEARN */}
      <section id="skills">
        <div className="wrap">
          <div className="sec-head">
            <h2>Real Japanese, for real conversations.</h2>
            <p>Our Japanese language curriculum builds all four core skills side by side, so you actually learn Japanese you can use, not just recognise it on a page.</p>
          </div>
          <div className="skills-grid">
            <div className="skill-stamp">
              <div className="skill-native">話す</div>
              <span className="skill-en">Speaking (Hanasu)</span>
              <p>Guided conversation practice from day one, so you're comfortable speaking long before you've memorised every kanji.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">聞く</div>
              <span className="skill-en">Listening (Kiku)</span>
              <p>Native-accent audio and dialogues that train your ear for natural spoken Japanese, not textbook Japanese.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">読む</div>
              <span className="skill-en">Reading (Yomu)</span>
              <p>From hiragana and katakana to everyday kanji, building comprehension script by script, level by level.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">書く</div>
              <span className="skill-en">Writing (Kaku)</span>
              <p>Stroke order, sentence structure, and the shift from casual to keigo, corrected and improved as you go.</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY / LEVELS */}
      <section className="journey" id="journey">
        <div className="seigaiha-dark" aria-hidden="true"></div>
        <div className="wrap">
          <div className="sec-head">
            <h2>Six stops to fluency.</h2>
            <p>Every learner boards at N5 and rides the same line through to N1, and one stop beyond, each stage building the grammar, conversation and confidence you need for the next.</p>
          </div>

          <div className="rail-wrap">
            <div className="rail">
              <div className="stop">
                <div className="stop-dot" aria-hidden="true">01</div>
                <div className="stop-code">STOP 01 · N5</div>
                <h3>Foundations</h3>
                <p>Hiragana, katakana, basic grammar and greetings: everyday phrases you'll actually use from week one.</p>
                <span className="unlock-tag">Unlocks: travel & basic greetings</span>
              </div>
              <div className="stop">
                <div className="stop-dot" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                <div className="stop-code">STOP 02 · N4</div>
                <h3>Everyday Japanese</h3>
                <p>Basic kanji and slower daily conversation, read and understood with growing confidence.</p>
                <span className="unlock-tag">Unlocks: SSW visa eligibility (JFT-Basic/N4)</span>
              </div>
              <div className="stop">
                <div className="stop-dot" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
                <div className="stop-code">STOP 03 · N3</div>
                <h3>Bridging Level</h3>
                <p>The bridge between basic and advanced: workplace vocabulary and longer, more natural conversation.</p>
                <span className="unlock-tag">Unlocks: sector skills-test readiness</span>
              </div>
              <div className="stop">
                <div className="stop-dot" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-6h4v6"/></svg></div>
                <div className="stop-code">STOP 04 · N2</div>
                <h3>Business-Level</h3>
                <p>Japanese used in a broad range of everyday and workplace scenes: news, meetings, real conversation.</p>
                <span className="unlock-tag">Unlocks: Engineer/Specialist visa readiness</span>
              </div>
              <div className="stop">
                <div className="stop-dot" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg></div>
                <div className="stop-code">STOP 05 · N1</div>
                <h3>Near-Native Mastery</h3>
                <p>Highly complex, formal and abstract Japanese: read, listened to and understood the way educated native speakers do.</p>
                <span className="unlock-tag">Unlocks: graduate study & elite corporate roles</span>
              </div>
              <div className="stop">
                <div className="stop-dot final" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.6h7.6z"/></svg></div>
                <div className="stop-code">STOP 06 · BEYOND N1</div>
                <h3>Business &amp; Keigo</h3>
                <p>Honorific speech, boardroom Japanese and the etiquette JLPT alone doesn't test: full executive fluency.</p>
                <span className="unlock-tag">Unlocks: teaching, translation, executive roles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDY HOURS INFOGRAPHIC */}
      <section className="study-hours" id="study-hours">
        <div className="wrap">
          <div className="sec-head">
            <h2>How much runway each level takes.</h2>
            <p>Approximate cumulative self-study hours to reach each JLPT level from zero. Your actual pace depends on prior exposure, study method and hours committed per week.</p>
          </div>
          <div className="hours-chart">
            <div className="hours-row">
              <div className="hours-level">N5</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '17%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
            <div className="hours-row">
              <div className="hours-level">N4</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '33%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
            <div className="hours-row">
              <div className="hours-level">N3</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '50%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
            <div className="hours-row">
              <div className="hours-level">N2</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '67%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
            <div className="hours-row">
              <div className="hours-level">N1</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '100%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
          </div>
          <p className="hours-note">Figures are commonly cited estimates, not a guarantee. Structured classes, native-speaker practice and consistent weekly hours are what actually move learners along this line faster.</p>
        </div>
      </section>

      {/* COURSE CURRICULUM */}
      <section id="curriculum"><div className="wrap"><div className="sec-head"><h2>What you study at every level.</h2><p>The learning journey develops grammar, vocabulary, scripts, comprehension and communication together as you progress from N5 towards advanced Japanese.</p></div><div className="curriculum-grid"><div className="curriculum-card"><div className="curriculum-level">Level 01 · N5</div><h3>Foundations</h3><p>Build the base you need to start understanding and using Japanese.</p><ul><li>Hiragana &amp; Katakana</li><li>Basic grammar &amp; sentence patterns</li><li>Greetings &amp; introductions</li><li>Everyday vocabulary</li><li>Basic Kanji &amp; listening</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Level 02 · N4</div><h3>Everyday Japanese</h3><p>Move from basic phrases into more independent everyday communication.</p><ul><li>Expanded grammar &amp; vocabulary</li><li>Daily-life conversations</li><li>Kanji &amp; reading practice</li><li>Listening comprehension</li><li>JLPT / JFT-Basic preparation</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Level 03 · N3</div><h3>Intermediate Bridge</h3><p>Develop longer conversations and wider real-world Japanese.</p><ul><li>Intermediate grammar</li><li>Workplace vocabulary</li><li>Longer reading passages</li><li>Natural conversation practice</li><li>Exam-focused mock practice</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Level 04 · N2</div><h3>Business-Level Japanese</h3><p>Build stronger comprehension and communication for professional environments.</p><ul><li>Advanced grammar &amp; vocabulary</li><li>News &amp; workplace Japanese</li><li>Meetings &amp; professional scenarios</li><li>Formal communication</li><li>JLPT N2 preparation</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Level 05 · N1</div><h3>Advanced Mastery</h3><p>Handle complex written and spoken Japanese with greater accuracy.</p><ul><li>Complex grammar structures</li><li>Advanced Kanji &amp; vocabulary</li><li>Abstract &amp; formal Japanese</li><li>High-level reading &amp; listening</li><li>JLPT N1 preparation</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Beyond N1</div><h3>Business &amp; Keigo</h3><p>Go beyond exam Japanese into professional and high-context communication.</p><ul><li>Keigo &amp; honorific speech</li><li>Business etiquette</li><li>Professional conversations</li><li>Presentation &amp; meeting language</li><li>Executive communication practice</li></ul></div></div></div></section>

      {/* ABOUT THE LANGUAGE */}
      <section className="lang-facts" id="language">
        <div className="wrap">
          <div className="lang-inner">
            <div>
              <h2 style={{fontSize: 'clamp(26px,3vw,38px)', margin: '0 0 20px', lineHeight: '1.18'}}>Japanese: more useful than most people expect.</h2>
              <div className="lang-copy">
                <p>Japanese is spoken by roughly 125 million people, almost entirely within Japan, one of the few major world languages where nearly every speaker lives in a single country, and still one of the most-spoken languages on Earth.</p>
                <p>It belongs to the Japonic language family, unrelated to English or the Romance and Germanic languages, so learning Japanese usually means different study habits than learning German or Spanish. There aren't many cognates to lean on. Instead, once Japanese sentence structure clicks (verb at the end, particles doing the work English uses word order for), vocabulary starts building itself.</p>
                <p>Japan is the world's fourth-largest economy and a global leader in manufacturing, electronics and technology, which means learning Japanese isn't just a classroom exercise, it's a career move, opening doors in engineering, IT, automotive and skilled-trade roles across the country.</p>
              </div>
              <div className="cognates">
                <div className="cognates-head"><div>Japanese</div><div>Sounds like</div><div>English</div></div>
                <div className="cognate-row"><div>コーヒー</div><div>kōhī</div><div>Coffee</div></div>
                <div className="cognate-row"><div>テレビ</div><div>terebi</div><div>Television</div></div>
                <div className="cognate-row"><div>ホテル</div><div>hoteru</div><div>Hotel</div></div>
                <div className="cognate-row"><div>カメラ</div><div>kamera</div><div>Camera</div></div>
              </div>
            </div>
            <div>
              <img className="lang-photo" src="/images/caligraphy.png" alt="Hand-brushed Japanese kanji calligraphy" loading="lazy" />
              <div className="fact-strip">
                <div className="fact-box"><b>~125M</b><span>native speakers, almost entirely within Japan</span></div>
                <div className="fact-box"><b>#4</b><span>world's fourth-largest economy by nominal GDP</span></div>
                <div className="fact-box"><b>3</b><span>writing systems used together: hiragana, katakana and kanji</span></div>
                <div className="fact-box"><b>Top 15</b><span>among the world's most spoken languages</span></div>
              </div>
              <div className="lang-note">
                <h4>Good to know</h4>
                <p>Japanese verbs go at the end of the sentence, and pitch (not stress) can change a word's meaning entirely, which is the part that trips up most beginners. It's also a language built for compression: <em style={{fontFamily: "'Shippori Mincho', serif"}}>tsundoku</em> (積ん読) simply means buying books and letting them pile up unread. Once the sentence pattern clicks, vocabulary starts building itself.</p>
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
              <div className="fnum">Trainers</div>
              <h3>Learn from expert instructors</h3>
              <p>Experienced, well-trained instructors fluent in Japanese ensure you get the highest quality instruction, not a script.</p>
            </div>
            <div className="feature">
              <div className="fnum">Immersion</div>
              <h3>Cultural integration</h3>
              <p>Experience Japanese etiquette, workplace culture and daily life through real-life scenarios that prepare you for actually living in Japan.</p>
            </div>
            <div className="feature">
              <div className="fnum">Careers</div>
              <h3>Placement &amp; visa assistance</h3>
              <p>Exclusive support for the Specified Skilled Worker visa, Engineer/Specialist roles, and in-demand IT and manufacturing jobs in Japan, right after your course.</p>
            </div>
            <div className="feature">
              <div className="fnum">Certification</div>
              <h3>Exam-ready, if you need it</h3>
              <p>For learners who need a certificate, we prepare you for JLPT, JFT-Basic and BJT, targeting the exact score your visa or employer requires.</p>
            </div>
            <div className="feature">
              <div className="fnum">Curriculum</div>
              <h3>Built for your goal</h3>
              <p>Learning for travel, study, work or personal growth, beginner to advanced, the curriculum adapts to why you're learning.</p>
            </div>
            <div className="feature">
              <div className="fnum">Schedule</div>
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
          <img className="modes-photo" src="/images/platform.png" alt="Students in a Japanese language class listening to their instructor" loading="lazy" />
          <div className="modes-grid">
            <div className="mode-card">
              <span className="mode-tag">Most Popular</span>
              <h3 style={{marginTop: '14px'}}>Live Online</h3>
              <p>Interactive, instructor-led classes from any internet-enabled phone or computer, anywhere in the world.</p>
            </div>
            <div className="mode-card">
              <span className="mode-tag">In Person</span>
              <h3 style={{marginTop: '14px'}}>Classroom, South Delhi</h3>
              <p>Face-to-face batches at our South Extension centre, with peer conversation practice built in.</p>
            </div>
            <div className="mode-card">
              <span className="mode-tag">Flexible</span>
              <h3 style={{marginTop: '14px'}}>Hybrid</h3>
              <p>Mix classroom and online sessions to match a schedule that shifts week to week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHING METHODOLOGY */}
      <section className="methodology" id="methodology"><div className="wrap"><div className="sec-head"><h2>Not just lessons. A system for learning Japanese.</h2><p>Our approach combines structured instruction with active practice, assessment and real-world application.</p></div><div className="method-grid"><div className="method-step"><div className="step-no">01 / LEARN</div><h3>Understand</h3><p>Learn grammar, vocabulary, scripts and pronunciation through structured lessons.</p></div><div className="method-step"><div className="step-no">02 / PRACTISE</div><h3>Use it</h3><p>Apply new language through drills, exercises, dialogues and guided activities.</p></div><div className="method-step"><div className="step-no">03 / SPEAK</div><h3>Communicate</h3><p>Build confidence through conversation, role plays and real-life Japanese scenarios.</p></div><div className="method-step"><div className="step-no">04 / CULTURE</div><h3>Experience Japan</h3><p>Learn Japanese etiquette, traditions, festivals, food culture and workplace customs through cultural activities.</p></div><div className="method-step"><div className="step-no">05 / ASSESS</div><h3>Measure</h3><p>Use tests and feedback to identify gaps and keep your learning on track.</p></div><div className="method-step"><div className="step-no">06 / PROGRESS</div><h3>Advance</h3><p>Move towards your next level, exam, study route or career objective.</p></div></div></div></section>

      {/* WHAT YOU GET */}
      <section className="included" id="included"><div className="wrap"><div className="sec-head"><h2>What your Japanese learning experience can include.</h2><p>Support is designed around both language development and the goal behind your Japanese learning journey.</p></div><div className="included-grid"><div className="included-item"><span className="tick">✓</span><span>Live instructor-led Japanese classes</span></div><div className="included-item"><span className="tick">✓</span><span>N5–N1 structured learning pathway</span></div><div className="included-item"><span className="tick">✓</span><span>Speaking, listening, reading &amp; writing practice</span></div><div className="included-item"><span className="tick">✓</span><span>Kanji and vocabulary development</span></div><div className="included-item"><span className="tick">✓</span><span>Japanese exam preparation</span></div><div className="included-item"><span className="tick">✓</span><span>Mock tests &amp; progress assessment</span></div><div className="included-item"><span className="tick">✓</span><span>Cultural &amp; real-life communication practice</span></div><div className="included-item"><span className="tick">✓</span><span>Online, offline &amp; hybrid learning options</span></div><div className="included-item"><span className="tick">✓</span><span>Goal-based counselling for Japan pathways</span></div></div></div></section>

      {/* SSW / ENGINEER / STUDY PATHWAYS */}
      <section className="pathways" id="pathways">
        <div className="wrap">
          <div className="sec-head">
            <h2>SSW visas. Engineer roles. University routes.</h2>
            <p>Langma's counsellors don't stop at fluency. These are the three routes we actively guide candidates through, once your Japanese is at the level each one needs.</p>
          </div>
          <div className="path-grid">
            <div className="path-card">
              <div className="path-photo-wrap"><img className="path-photo" src="Public/images/ssw.jpeg" alt="Sparks flying as a worker welds metal, representing SSW manufacturing roles" loading="lazy" /></div>
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <span className="path-tag">Skilled Worker Route</span>
              <h3>Specified Skilled Worker</h3>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>A fast-growing route into Japan's manufacturing, hospitality, caregiving and food-service sectors. Most fields ask for the JFT-Basic or JLPT N4, plus a sector-specific skills test.</p>
              <ul>
                <li>Japanese coaching timed to your target sector's test date</li>
                <li>Sector-specific vocabulary and skills-test preparation</li>
                <li>Employer and job-matching support</li>
                <li>Visa paperwork and pre-departure briefing</li>
              </ul>
            </div>

            <div className="path-card">
              <div className="path-photo-wrap"><img className="path-photo" src="/images/Engineers.jpeg" alt="Busy Shibuya crossing at night with neon lights, representing Tokyo's business and tech scene" loading="lazy" /></div>
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <span className="path-tag">White-Collar Work Visa</span>
              <h3>Engineer &amp; Specialist Roles</h3>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>Japan's most common work visa for IT, engineering, marketing and international-business roles. As of April 2026, JLPT N2 is now required by many employers for this category.</p>
              <ul>
                <li>Business Japanese coaching aimed at N2 and BJT</li>
                <li>Résumé and interview preparation for Japanese employers</li>
                <li>Degree-to-role matching guidance</li>
                <li>Visa documentation and renewal support</li>
              </ul>
            </div>

            <div className="path-card">
              <div className="path-photo-wrap"><img className="path-photo" src="Public/images/sj.jpeg" alt="Path through vibrant orange torii gates in Japan" loading="lazy" /></div>
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>
              </div>
              <span className="path-tag">Language School &amp; University</span>
              <h3>Study in Japan</h3>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,.7)'}}>From short-term language schools to full degree programmes. Japanese universities increasingly test the EJU alongside JLPT for international admissions.</p>
              <ul>
                <li>JLPT and EJU-focused exam coaching</li>
                <li>University and language-school shortlisting</li>
                <li>Application and statement-of-purpose support</li>
                <li>Student-visa paperwork and pre-departure briefing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER OPPORTUNITIES */}
      <section id="careers"><div className="wrap"><div className="sec-head"><h2>Where can Japanese take you?</h2><p>Japanese can support multiple academic, professional and international pathways, depending on your qualifications, experience and target route.</p></div><div className="career-grid"><div className="career-card"><h3>Career &amp; Work in Japan</h3><div className="career-tags"><span className="career-tag">Specified Skilled Worker</span><span className="career-tag">IT &amp; Engineering</span><span className="career-tag">Manufacturing</span><span className="career-tag">Hospitality</span><span className="career-tag">Caregiving</span><span className="career-tag">International Business</span></div></div><div className="career-card"><h3>Study &amp; Professional Opportunities</h3><div className="career-tags"><span className="career-tag">Language Schools</span><span className="career-tag">Universities</span><span className="career-tag">EJU Preparation</span><span className="career-tag">Japanese MNCs</span><span className="career-tag">Translation</span><span className="career-tag">Business Japanese</span></div></div></div></div></section>

      {/* JLPT VS JFT-BASIC */}
      <section className="exam-compare" id="exam-guide"><div className="wrap"><div className="sec-head"><h2>JLPT or JFT-Basic: which one is right for you?</h2><p>The right assessment depends on your objective. A counsellor can help you identify the appropriate preparation route.</p></div><div className="compare-wrap"><table className="compare-table"><thead><tr><th>Exam</th><th>Best known for</th><th>Levels / format</th><th>Useful for</th></tr></thead><tbody><tr><td>JLPT</td><td>General Japanese proficiency</td><td>N5–N1</td><td>Language proficiency, study and employment requirements where accepted</td></tr><tr><td>JFT-Basic</td><td>Practical Japanese communication</td><td>Basic-level assessment</td><td>Specified Skilled Worker-related Japanese requirements where applicable</td></tr><tr><td>BJT</td><td>Business Japanese</td><td>Business communication assessment</td><td>Professional and corporate Japanese contexts</td></tr><tr><td>EJU</td><td>University admissions</td><td>Admission examination</td><td>International students applying to Japanese higher-education programmes where required</td></tr></tbody></table></div></div></section>

      {/* UPCOMING BATCHES */}
      <section className="batches" id="batches"><div className="wrap"><div className="sec-head"><h2>Find a batch that fits your schedule.</h2><p>We offer online, classroom and hybrid options. Ask us for the latest batch start dates, timings and course fee details.</p></div><div className="batch-grid"><div className="batch-card"><div className="batch-tag">Online</div><h3>Live Online Batch</h3><div className="batch-meta"><div><b>Level</b><span>N5 / N4 / N3 / N2 / N1</span></div><div><b>Format</b><span>Instructor-led</span></div><div><b>Timings</b><span>Ask for current schedule</span></div></div><a className="btn btn-primary" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20latest%20Japanese%20online%20batch%20details." target="_blank" rel="noopener">Get Online Batch Details →</a></div><div className="batch-card"><div className="batch-tag">South Delhi</div><h3>Classroom Batch</h3><div className="batch-meta"><div><b>Location</b><span>South Extension I</span></div><div><b>Format</b><span>Face-to-face</span></div><div><b>Timings</b><span>Ask for current schedule</span></div></div><a className="btn btn-primary" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20latest%20Japanese%20classroom%20batch%20details." target="_blank" rel="noopener">Get Classroom Details →</a></div><div className="batch-card"><div className="batch-tag">Flexible</div><h3>Hybrid Batch</h3><div className="batch-meta"><div><b>Format</b><span>Online + classroom</span></div><div><b>Level</b><span>Based on availability</span></div><div><b>Timings</b><span>Ask for current schedule</span></div></div><a className="btn btn-primary" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20latest%20Japanese%20hybrid%20batch%20details." target="_blank" rel="noopener">Get Hybrid Details →</a></div></div><p className="batch-note">Course fees, schedules and batch availability may vary. Contact Langma International for the current course options.</p></div></section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="sec-head">
            <h2>Common questions about learning Japanese.</h2>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Do I need any prior knowledge of Japanese to join?</summary>
              <p className="faq-a">No, most of our learners start at N5 with zero Japanese. Classes are structured so complete beginners build confidence, and hiragana/katakana, from the very first session.</p>
            </details>
            <details className="faq-item">
              <summary>Do I really need to learn all three writing systems?</summary>
              <p className="faq-a">Yes, eventually, but not all at once. You'll be comfortable in hiragana and katakana within the first few weeks; kanji is introduced gradually and cumulatively from N5 through N1, so it never feels like a wall.</p>
            </details>
            <details className="faq-item">
              <summary>How long does it take to become conversational?</summary>
              <p className="faq-a">Most learners feel comfortable with everyday conversation by the end of N4–N3, usually within a few months of consistent classes, depending on how many hours a week you can commit.</p>
            </details>
            <details className="faq-item">
              <summary>Can I also prepare for JLPT, JFT-Basic or BJT?</summary>
              <p className="faq-a">Yes, once you're at the right level, we offer focused certificate preparation for JLPT, JFT-Basic, NAT-TEST, J.TEST and BJT alongside the regular course, for anyone who needs a specific score for a visa, job or university application.</p>
            </details>
            <details className="faq-item">
              <summary>What's the difference between online, offline, and hybrid batches?</summary>
              <p className="faq-a">All three follow the same curriculum and expert trainers. Online is fully remote, offline meets in person at our South Delhi centre, and hybrid lets you mix the two around your week.</p>
            </details>
            <details className="faq-item">
              <summary>How big are the batches?</summary>
              <p className="faq-a">We keep batches small so everyone gets real speaking practice and individual feedback, rather than sitting through a one-way lecture.</p>
            </details>
            <details className="faq-item"><summary>Can I start Japanese from zero?</summary><p className="faq-a">Yes. The pathway begins at N5, and the programme is structured for learners with no prior Japanese knowledge as well as learners joining at a higher level.</p></details>
            <details className="faq-item"><summary>How do I know which level I should join?</summary><p className="faq-a">A counsellor can help identify the appropriate starting point based on your previous Japanese study, current ability and objective.</p></details>
            <details className="faq-item"><summary>Do you offer a free demo class?</summary><p className="faq-a">You can request a Japanese demo or speak with a counsellor to understand the teaching format, level and current batch options.</p></details>
            <details className="faq-item"><summary>Can you help me choose a Japanese exam?</summary><p className="faq-a">Yes. Counselling can help you identify whether JLPT, JFT-Basic, BJT, EJU or another assessment is relevant to your intended study or career pathway.</p></details>
            <details className="faq-item"><summary>Do you provide Japan career or visa guidance?</summary><p className="faq-a">Japan pathway support is available for the routes described on this page, including SSW, Engineer/Specialist and Study in Japan pathways. Exact eligibility and immigration decisions depend on the applicable requirements.</p></details>

          </div>
        </div>
      </section>

      {/* STUDENT ACTIVITIES / JAPAN CONNECTIONS */}
      <section className="activities" id="activities">
        <div className="seigaiha-dark" aria-hidden="true"></div>
        <div className="wrap">
          <div className="sec-head">
            <div className="activity-eyebrow" style={{fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '.14em', color: 'var(--gold-soft)', textTransform: 'uppercase', marginBottom: '10px'}}>Activities &amp; Japan Experience</div>
            <h2>Learn. Experience. Connect.</h2>
            <p>Learning Japanese at Langma goes beyond classroom lessons. Build confidence through interactive activities, cultural experiences and real-life Japanese practice.</p>
          </div>
          <div className="activity-slider" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className="activity-viewport" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <div className="activity-track" style={{ transform: `translateX(-${slideIndex * slideWidthPct}%)` }}>
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
              <div className="activity-dots" role="tablist" aria-label="Student activity slides">
                {Array.from({ length: dotCount }).map((_, i) => (
                  <button key={i} className={`activity-dot${i === slideIndex ? ' active' : ''}`} onClick={() => goToSlide(i)} aria-label={`Go to activity slide ${i + 1}`} aria-current={i === slideIndex} />
                ))}
              </div>
              <div className="activity-arrows">
                <button className="activity-arrow" onClick={prevSlide} aria-label="Previous activities"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
                <button className="activity-arrow" onClick={nextSlide} aria-label="Next activities"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="start"><div className="seigaiha-dark" aria-hidden="true"></div><div className="wrap"><span className="kicker">Your Japanese journey starts here</span><h2>Don't just learn Japanese. Learn where it can take you.</h2><p>Get the current course fee, batch timings, learning mode and recommended level, without committing to a course first.</p><div className="final-cta-actions"><a className="btn btn-wa" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20Japanese%20course%20fee%20and%20batch%20details." target="_blank" rel="noopener">Get Course Details on WhatsApp →</a><a className="btn btn-ghost" href="tel:+919810117094">Talk to a Japanese Counsellor</a></div><div className="microcopy">No price displayed here. Ask us for the current course options, fees &amp; batch availability.</div></div></section>

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
              <h3>Get Course Details</h3>
              <p>Tell us your current level (or none at all). We will share the relevant course, fee, batch and learning-mode details with you.</p>
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
                <input type="hidden" name="language" value="Japanese" />
                <input type="hidden" name="message" value="Japanese Language Course enquiry" />
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Submitting..." : "Get Course Details →"}
                </button>
                {formMessage && (
                  <div className="form-msg" role="status">{formSubmitted ? `✓ ${formMessage}` : formMessage}</div>
                )}
              </form>
              <div className="form-alt">
                <span style={{fontSize: '13px', color: 'rgba(255,255,255,.7)'}}>Prefer to skip the form?</span>
                <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20enroll%20for%20the%20Japanese%20course." target="_blank" rel="noopener" style={{fontSize: '13px', fontWeight: '600', color: 'var(--gold-soft)', textDecoration: 'underline'}}>Message us on WhatsApp →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="map-strip">
            <a href="https://maps.app.goo.gl/LTvhZxM9HFnZ2gqp7" target="_blank" rel="noopener">Get Directions →</a>
          </div>
        </div>
      </section>

      {/* JAPANESE FOOTER */}
        <footer className="jp-footer">
        <div className="seigaiha-dark" aria-hidden="true"></div>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand"><img src="https://www.langmainternational.com/images/ftrnlg.png" alt="Langma International" className="footer-logo" />
            <br /><div className="jp-motto">Learn Japanese. Understand Japan. Build Your Future.</div><p>Learn Japanese with structured N5–N1 learning, practical communication, cultural activities and Japan-focused counselling.</p></div>
            <div className="footer-col"><h4>Learn</h4><a href="#course-details">Japanese Course</a><a href="#skills">What You Learn</a><a href="#methodology">Teaching Method</a><a href="#batches">Batches</a></div>
            <div className="footer-col"><h4>Japan</h4><a href="#activities">Student Activities</a><a href="#pathways">Japan Pathways</a><a href="#careers">Career Opportunities</a><a href="#exam-guide">JLPT / JFT / BJT</a></div>
            <div className="footer-col"><h4>Contact</h4><a href="tel:+919810117094">+91-98101-17094</a><a href="mailto:info@langmainternational.com">info@langmainternational.com</a><a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">South Extension I, New Delhi</a><a href="#contact">Free Counselling</a></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Langma International Pvt. Ltd.</span><span>JAPANESE LANGUAGE · NEW DELHI</span></div>
        </div>
      </footer>
      {/* FLOATING CALL */}
      <a href="tel:+919810117094" className="call-float" id="callFloat" aria-label="Call Langma">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
      <div className="call-tip" id="callTip">Call us: +91-98101-17094</div>

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20know%20more%20about%20the%20Japanese%20course." target="_blank" rel="noopener" className="wa-float" id="waFloat" aria-label="Chat on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
      </a>
      <div className={`wa-tip${showWaTip ? ' show' : ''}`} id="waTip">Chat with us, usually replies in minutes</div>
    </div>
  );
}