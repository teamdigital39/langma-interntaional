import { useState, useRef, useEffect } from "react";
import API_BASE from "../../config";

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

// Cloudinary can return a frame from each video as a JPG poster without another upload.
const TESTIMONIALS = [
  {
    video: "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957543/002_german_review_tjz8x2.mp4"
  },
  {
    video: "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957543/001german_review_xyvpqv.mp4"
  },
  {
    video: "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957536/WhatsApp_Video_2026-09-09_at_17.54.01_emt6bt.mp4"
  },
  {
    video: "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957535/WhatsApp_Video_2026-09-09_at_17.53.25_wfvwxx.mp4"
  },
  {
    video: "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957535/WhatsApp_Video_2026-09-09_at_17.53.32_pysfnr.mp4"
  },
    {
    video: "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957534/WhatsApp_Video_2026-09-09_at_17.54.02_vskbwy.mp4"
  },
      {
    video: "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957967/Lalit_student_German_feedback_video_mypxlx.mp4"
  },
];

function getVideoPoster(videoUrl) {
  return videoUrl
    .replace("/video/upload/", "/video/upload/so_1/")
    .replace(/\.mp4(?:\?.*)?$/, ".jpg");
}

// German language certification exam badges shown in the hero exam strip
const EXAM_BADGES = [
  { code: "Goethe-Zertifikat", subtitle: "A1–C2, Worldwide", ring: "#DD0000", accent: "#1A1A1A", letter: "G" },
  { code: "telc Deutsch", subtitle: "A1–C2, Everyday & Work", ring: "#1A1A1A", accent: "#DD0000", letter: "T" },
  { code: "TestDaF", subtitle: "University German", ring: "#D4AF37", accent: "#1A1A1A", letter: "D" },
  { code: "DSH", subtitle: "University Admission", ring: "#DD0000", accent: "#1A1A1A", letter: "S" },
  { code: "WiDaF", subtitle: "Business German", ring: "#1A1A1A", accent: "#DD0000", letter: "W" },
  { code: "TestAS", subtitle: "Study Aptitude", ring: "#D4AF37", accent: "#1A1A1A", letter: "A" }
];

const LOCATION_PROFILES = {
  delhi: { city: "New Delhi", area: "South Extension I", centre: "South Delhi" },
  mumbai: { city: "Mumbai", area: "Central Mumbai", centre: "Mumbai" },
  bangalore: { city: "Bengaluru", area: "Indiranagar", centre: "Bengaluru" },
  hyderabad: { city: "Hyderabad", area: "Banjara Hills", centre: "Hyderabad" },
  pune: { city: "Pune", area: "Koregaon Park", centre: "Pune" },
};

const HERO_FORM_FIELDS = [
  { id: "hname", name: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "Your name" },
  { id: "hphone", name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "10-digit number", pattern: "[0-9]{10}" },
  { id: "hemail", name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "Your email" },
];

const GERMAN_FORM_CONFIG = {
  language: "German",
  destinationCode: "DEU",
  destinationLabel: "Your Future, Germany",
  message: "German Language Course enquiry",
  type: "German Landing",
  service: "Language Training - German",
};

function getLocationProfile() {
  if (typeof window === "undefined") return LOCATION_PROFILES.delhi;
  const requestedLocation = new URLSearchParams(window.location.search).get("city") || new URLSearchParams(window.location.search).get("location");
  const locationKey = requestedLocation?.toLowerCase().replace(/[^a-z]/g, "");
  return LOCATION_PROFILES[locationKey] || LOCATION_PROFILES.delhi;
}

export default function LangmaGermanCourse() {
  const locationProfile = getLocationProfile();
  const sectionFormCta = (
    <div className="section-cta-big section-form-cta">
      <button type="button" className="btn btn-primary btn-large" onClick={() => openRequestPopup("guidance")}>Request Course Guidance</button>
    </div>
  );
  const [phoneError, setPhoneError] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [announceHeight, setAnnounceHeight] = useState(0);
  const announceRef = useRef(null);

  useEffect(() => {
    function measure() {
      setAnnounceHeight(showAnnouncement && announceRef.current ? announceRef.current.offsetHeight : 0);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [showAnnouncement]);

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

  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [requestPopupType, setRequestPopupType] = useState("");
  const [requestFormData, setRequestFormData] = useState({ name: "", phone: "", email: "" });
  const [requestPhoneError, setRequestPhoneError] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestFormMessage, setRequestFormMessage] = useState("");
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const requestPhoneRef = useRef(null);

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

  // ---- Video testimonial slider (independent of the activities slider above) ----
  const [testiIndex, setTestiIndex] = useState(0);
  const [testiPerView, setTestiPerView] = useState(4);
  const [testiPaused, setTestiPaused] = useState(false);
  const testiTouchStartX = useRef(null);
  const testiTouchDeltaX = useRef(0);

  useEffect(() => {
    function updateTestiPerView() {
      const w = window.innerWidth;
      if (w <= 640) setTestiPerView(1);
      else if (w <= 900) setTestiPerView(2);
      else if (w <= 1240) setTestiPerView(3);
      else setTestiPerView(4);
    }
    updateTestiPerView();
    window.addEventListener("resize", updateTestiPerView);
    return () => window.removeEventListener("resize", updateTestiPerView);
  }, []);

  const testiMaxIndex = Math.max(0, TESTIMONIALS.length - testiPerView);

  useEffect(() => {
    setTestiIndex((i) => Math.min(i, testiMaxIndex));
  }, [testiPerView, testiMaxIndex]);

  useEffect(() => {
    if (testiPaused) return;
    const timer = setInterval(() => {
      setTestiIndex((i) => (i >= testiMaxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [testiMaxIndex, testiPaused]);

  function goToTesti(i) {
    setTestiIndex(Math.min(Math.max(i, 0), testiMaxIndex));
  }
  function nextTesti() {
    setTestiIndex((i) => (i >= testiMaxIndex ? 0 : i + 1));
  }
  function prevTesti() {
    setTestiIndex((i) => (i <= 0 ? testiMaxIndex : i - 1));
  }
  function handleTestiTouchStart(e) {
    testiTouchStartX.current = e.touches[0].clientX;
    testiTouchDeltaX.current = 0;
    setTestiPaused(true);
  }
  function handleTestiTouchMove(e) {
    if (testiTouchStartX.current === null) return;
    testiTouchDeltaX.current = e.touches[0].clientX - testiTouchStartX.current;
  }
  function handleTestiTouchEnd() {
    if (Math.abs(testiTouchDeltaX.current) > 45) {
      if (testiTouchDeltaX.current < 0) nextTesti();
      else prevTesti();
    }
    testiTouchStartX.current = null;
    testiTouchDeltaX.current = 0;
    setTestiPaused(false);
  }

  useEffect(() => {
    setShowWaTip(true);
    const timer = setTimeout(() => setShowWaTip(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-reveal: fade/slide sections and card grids up as they enter view.
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal, .reveal-group");
    if (!targets.length) return;
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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
    formData.set("language", GERMAN_FORM_CONFIG.language);
    formData.set("type", GERMAN_FORM_CONFIG.type);
    formData.set("service", GERMAN_FORM_CONFIG.service);
    if (!formData.get("message")) {
      formData.set("message", GERMAN_FORM_CONFIG.message);
    }

    const successText =
      "Thanks! Our counsellor will share the course details shortly. For an instant reply, message us on WhatsApp.";

    try {
      const res = await fetch(`${API_BASE}/apply-submit`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        setMessage(successText);
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
            mobile: phoneValue,
            message: formData.get("message") || GERMAN_FORM_CONFIG.message,
            type: GERMAN_FORM_CONFIG.type,
            service: GERMAN_FORM_CONFIG.service,
          }),
        });
        if (fallback.ok) {
          setSubmitted(true);
          setMessage(successText);
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

  const openRequestPopup = (type) => {
    setRequestPopupType(type);
    setShowRequestPopup(true);
    setRequestFormData({ name: "", phone: "", email: "" });
    setRequestPhoneError(false);
    setRequestSubmitted(false);
    setRequestFormMessage("");
  };

  const closeRequestPopup = () => {
    setShowRequestPopup(false);
    setRequestPopupType("");
  };

  async function handleRequestSubmit(e) {
    e.preventDefault();
    if (!requestFormData.phone || !/^[0-9]{10}$/.test(requestFormData.phone)) {
      setRequestPhoneError(true);
      return;
    }
    if (!requestFormData.name.trim()) {
      setRequestFormMessage("Please enter your name");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestFormData.email)) {
      setRequestFormMessage("Please enter a valid email address");
      return;
    }
    setRequestSubmitting(true);
    setRequestPhoneError(false);
    setRequestFormMessage("");
    const typeMessages = {
      demo: "Interested in Learning German - Request Demo",
      study: "Interested in Study in Germany Program",
      work: "Interested in Work in Germany Pathway",
      ssw: "Interested in EU Blue Card (Skilled Worker) Program",
      travel: "Interested in Travel & Culture Program"
    };
    try {
      const res = await fetch(`${API_BASE}/apply-submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: requestFormData.name,
          email: requestFormData.email,
          mobile: requestFormData.phone,
          message: typeMessages[requestPopupType] || "German Course Inquiry",
          currenturl: window.location.href,
          language: "German",
          type: "German Landing - Request Form",
          service: GERMAN_FORM_CONFIG.service
        }),
      });
      if (res.ok) {
        setRequestSubmitted(true);
        setRequestFormMessage("Thank you! A counsellor will reach out shortly.");
        setTimeout(() => closeRequestPopup(), 2000);
        return;
      }
      throw new Error("Submit failed");
    } catch {
      try {
        const fallback = await fetch(`${API_BASE}/api/contact-lead`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: requestFormData.name,
            email: requestFormData.email,
            mobile: requestFormData.phone,
            message: typeMessages[requestPopupType] || "German Course Inquiry",
            type: "German Landing - Request Form",
            service: "Language Training - German",
          }),
        });
        if (fallback.ok) {
          setRequestSubmitted(true);
          setRequestFormMessage("Thank you! A counsellor will reach out shortly.");
          setTimeout(() => closeRequestPopup(), 2000);
        } else {
          setRequestFormMessage("Error submitting form. Please try WhatsApp or call us.");
        }
      } catch {
        setRequestFormMessage("Connection error. Please try again.");
      }
    } finally {
      setRequestSubmitting(false);
    }
  }

  const slideWidthPct = 100 / slidesPerView;
  const maxIndex = Math.max(0, ACTIVITIES.length - slidesPerView);
  const dotCount = maxIndex + 1;

  const testiWidthPct = 100 / testiPerView;
  const testiDotCount = testiMaxIndex + 1;

  return (
    <div className="langma-page" id="top" style={{ '--announce-h': `${announceHeight}px` }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700;900&display=swap');

  /* ============================================================
     DESIGN TOKENS
     A single, consistent system so every section reads as one
     considered page rather than a stack of separately-built ones.
  ============================================================ */
  :root{
    --header-h:74px;
    --ink:#1b1b1b;
    --ink-soft:#4d4d4d;
    --ink-mute:#6d6d6d;
    --paper:#fafafa;
    --paper-2:#efefec;
    --prussian:#242424;
    --prussian-deep:#111111;
    --gold:#d4af37;
    --gold-soft:#f4e8b2;
    --rust:#dd0000;
    --rust-deep:#a80000;
    --white:#FFFFFF;
    --de-red:#BC002D;
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

    --section-pad: clamp(48px, 6vw, 72px);
    --ease: cubic-bezier(.65,0,.35,1);
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  section[id]{scroll-margin-top:calc(var(--header-h) + var(--announce-h, 0px) + 14px);}
  .langma-page{
    background:var(--paper);
    color:var(--ink);
    font-family:'DM Sans', sans-serif;
    font-size:18px;
    font-weight:500;
    line-height:1.6;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    text-rendering:optimizeLegibility;
    min-height:100vh;
    overflow-x:hidden;
    width:100%;
    max-width:100vw;
  }
  img{max-width:100%; display:block;}
  a{color:inherit;}
  .wrap{max-width:1180px; margin:0 auto; padding:0 32px; width:100%; box-sizing:border-box;}
  h1,h2,h3{font-family:'DM Sans', sans-serif; font-weight:700; letter-spacing:0; color:var(--ink);}
  * { min-width: 0; }
  table, pre, code { min-width: unset; }
  ::selection{background:var(--gold); color:var(--prussian-deep);}
  :focus-visible{outline:2px solid var(--rust); outline-offset:3px; border-radius:2px;}
  @media (prefers-reduced-motion: reduce){*{animation:none !important; transition:none !important;}}

  /* ===== SCROLL REVEAL — fade/slide elements up as they enter the viewport ===== */
  .reveal{opacity:0; transform:translateY(26px); transition:opacity .6s var(--ease), transform .6s var(--ease);}
  .reveal.is-visible{opacity:1; transform:translateY(0);}
  .reveal-group > *{opacity:0; transform:translateY(24px); transition:opacity .55s var(--ease), transform .55s var(--ease);}
  .reveal-group.is-visible > *{opacity:1; transform:translateY(0);}
  .reveal-group.is-visible > *:nth-child(1){transition-delay:.02s;}
  .reveal-group.is-visible > *:nth-child(2){transition-delay:.08s;}
  .reveal-group.is-visible > *:nth-child(3){transition-delay:.14s;}
  .reveal-group.is-visible > *:nth-child(4){transition-delay:.2s;}
  .reveal-group.is-visible > *:nth-child(5){transition-delay:.26s;}
  .reveal-group.is-visible > *:nth-child(6){transition-delay:.32s;}
  .reveal-group.is-visible > *:nth-child(n+7){transition-delay:.36s;}

  /* ===== SEIGAIHA WAVE MOTIF — the page's one recurring signature ===== */
  .bauhaus-grid-dark{position:absolute; inset:0; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='rgb(199,162,79)' stroke-width='1.3' opacity='0.14'%3E%3Cpath d='M -18 20 A 18 18 0 0 1 18 20'/%3E%3Cpath d='M -12 20 A 12 12 0 0 1 12 20'/%3E%3Cpath d='M -6 20 A 6 6 0 0 1 6 20'/%3E%3Cpath d='M 22 20 A 18 18 0 0 1 58 20'/%3E%3Cpath d='M 28 20 A 12 12 0 0 1 52 20'/%3E%3Cpath d='M 34 20 A 6 6 0 0 1 46 20'/%3E%3Cpath d='M 2 40 A 18 18 0 0 1 38 40'/%3E%3Cpath d='M 8 40 A 12 12 0 0 1 32 40'/%3E%3Cpath d='M 14 40 A 6 6 0 0 1 26 40'/%3E%3C/g%3E%3C/svg%3E"); background-size:40px 40px;}
  .bauhaus-grid-dark{background-image:linear-gradient(90deg,rgba(221,0,0,.13) 1px,transparent 1px),linear-gradient(rgba(212,175,55,.12) 1px,transparent 1px); background-size:40px 40px;}
  .hero-grid{position:absolute; inset:0; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='rgb(30,58,84)' stroke-width='1.3' opacity='0.16'%3E%3Cpath d='M -18 20 A 18 18 0 0 1 18 20'/%3E%3Cpath d='M -12 20 A 12 12 0 0 1 12 20'/%3E%3Cpath d='M -6 20 A 6 6 0 0 1 6 20'/%3E%3Cpath d='M 22 20 A 18 18 0 0 1 58 20'/%3E%3Cpath d='M 28 20 A 12 12 0 0 1 52 20'/%3E%3Cpath d='M 2 40 A 18 18 0 0 1 38 40'/%3E%3Cpath d='M 8 40 A 12 12 0 0 1 32 40'/%3E%3Cpath d='M 14 40 A 6 6 0 0 1 26 40'/%3E%3C/g%3E%3C/svg%3E"); background-size:40px 40px; mask-image:linear-gradient(to bottom, black, transparent 85%);}

  /* ===== BUTTONS ===== */
  .btn{font-family:'DM Sans', sans-serif; font-weight:700; font-size:16.5px; padding:15px 26px; border-radius:var(--r-sm); border:1.5px solid transparent; display:inline-flex; align-items:center; gap:9px; cursor:pointer; text-decoration:none; white-space:nowrap; transition:transform .18s var(--ease), box-shadow .18s var(--ease), background .18s var(--ease), border-color .18s var(--ease), filter .18s var(--ease); max-width:100%; position:relative; overflow:hidden;}
  .btn::before{content:''; position:absolute; inset:0; background:linear-gradient(135deg, rgba(255,255,255,.2), rgba(255,255,255,0)); opacity:0; transition:opacity .25s ease;}
  .btn:hover::before{opacity:1;}
  .btn:active{transform:translateY(0) scale(.96);}
  .btn-primary{background:var(--rust); color:#fff; border-color:var(--rust); box-shadow:0 4px 15px rgba(188,0,45,.28), var(--shadow-sm);}
  .btn-primary:hover{transform:translateY(-3px); box-shadow:0 16px 32px rgba(188,0,45,.34), var(--shadow-md); background:var(--rust-deep); filter:brightness(1.04);}
  .btn-primary:active{box-shadow:0 2px 8px rgba(188,0,45,.24); background:var(--rust-deep);}
  .btn-ghost{background:var(--rust); border-color:var(--rust); color:#fff; box-shadow:0 4px 15px rgba(188,0,45,.24);}
  .btn-ghost:hover{background:var(--rust-deep); border-color:var(--rust-deep); color:#fff; transform:translateY(-2px); box-shadow:0 8px 20px rgba(188,0,45,.3);}
  .btn-wa{background:var(--rust); color:#fff; border-color:var(--rust); box-shadow:0 4px 15px rgba(188,0,45,.3);}
  .btn-wa:hover{transform:translateY(-3px); box-shadow:0 16px 32px rgba(188,0,45,.38); background:var(--rust-deep); filter:brightness(1.04);}
  .btn-wa:active{box-shadow:0 2px 8px rgba(188,0,45,.25);}
  .btn-sm{padding:12px 19px; font-size:15px;}

  @media (prefers-reduced-motion: reduce){
    *, *::before, *::after{animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; transition-duration:.01ms !important;}
    .reveal, .reveal-group > *{opacity:1; transform:none;}
  }

  /* ===== TOPBAR ===== */
  .topbar{background:var(--prussian-deep); color:var(--white); font-family:'Roboto', sans-serif; font-size:14px; margin-top:calc(var(--header-h) + var(--announce-h, 0px)); transition:margin-top .25s ease;}
  .topbar .wrap{display:flex; justify-content:center; align-items:center; padding:9px 32px;}
  .topbar-links{display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:8px 26px; width:100%; line-height:1.4;}
  .topbar-links a{display:inline-flex; align-items:center; gap:7px; text-decoration:none; opacity:.88; white-space:nowrap;}
  .topbar-links a:hover{opacity:1; text-decoration:underline;}

  /* ===== HEADER ===== */
  .announcement-bar{position:fixed; top:0; left:0; right:0; z-index:90; background:linear-gradient(90deg, var(--rust), var(--rust-deep)); color:#fff; display:flex; align-items:center; justify-content:center; gap:16px; padding:9px 44px 9px 16px; text-align:center; box-shadow:0 2px 10px rgba(0,0,0,.15);}
  .announcement-inner{display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap;}
  .announcement-text{font-family:'Roboto', sans-serif; font-size:13.5px; font-weight:500;}
  .announcement-link{font-family:'Roboto', sans-serif; font-size:13.5px; font-weight:700; color:#fff; text-decoration:underline; text-underline-offset:2px; white-space:nowrap; transition:opacity .15s ease;}
  .announcement-link:hover{opacity:.82;}
  .announcement-close{position:absolute; right:10px; top:50%; transform:translateY(-50%); width:26px; height:26px; border-radius:50%; border:none; background:rgba(255,255,255,.18); color:#fff; font-size:17px; line-height:1; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .15s ease;}
  .announcement-close:hover{background:rgba(255,255,255,.32);}
  .de-header{background:rgba(250,250,250,.96); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); position:fixed; top:var(--announce-h, 0px); left:0; right:0; width:100%; height:var(--header-h); z-index:80; box-shadow:0 4px 18px rgba(19,39,56,.08); transition:top .25s ease;}
  .de-nav{min-height:74px; display:flex; align-items:center; justify-content:space-between; gap:24px;}
  .de-brand{display:flex; align-items:center; text-decoration:none; transition:opacity .18s ease;}
  .de-brand:hover{opacity:.82;}
  .de-brand-text{display:flex; align-items:center; width:200px; min-width:150px; height:46px;}
  .de-brand-logo{width:100%; height:100%; object-fit:contain; object-position:left center; display:block;}
  .de-brand-fallback{font-family:'Roboto', sans-serif; font-weight:700; font-size:22.5px; color:var(--prussian); white-space:nowrap;}
  .de-menu{display:flex; align-items:center; gap:18px; flex-wrap:wrap;}
  .de-phone{display:flex; align-items:center; gap:9px; font-family:'Roboto', sans-serif; font-weight:700; font-size:16px; color:var(--prussian-deep); text-decoration:none; white-space:nowrap; transition:color .18s ease;}
  .de-phone svg{flex-shrink:0; color:var(--rust);}
  .de-phone:hover{color:var(--rust);}
  .de-menu .de-cta{background:var(--rust); color:#fff; padding:11px 18px; border-radius:var(--r-sm); font-size:14.5px; font-weight:700; text-decoration:none; transition:background .18s ease, transform .18s ease;}
  .de-menu .de-cta:hover{background:var(--rust-deep); transform:translateY(-1px);}

  /* ===== HERO ===== */
  @keyframes fadeUpIn{from{opacity:0; transform:translateY(20px);} to{opacity:1; transform:translateY(0);}}
  .hero{position:relative; overflow:hidden; border-bottom:1px solid var(--line); max-width:100vw; padding:0;}
  .hero-grid{opacity:.35;}
  .hero-photo{position:absolute; inset:0; background-image:linear-gradient(100deg, rgba(250,250,250,.985) 0%, rgba(250,250,250,.96) 48%, rgba(250,250,250,.78) 68%, rgba(250,250,250,.38) 100%), url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?fm=jpg&q=80&w=1800&auto=format&fit=crop'); background-size:cover; background-position:center 65%; opacity:.03;}
  .hero-inner{position:relative; z-index:2; display:grid; grid-template-columns:1.15fr .85fr; gap:56px; padding:40px 32px 48px; max-width:1180px; margin:0 auto; align-items:center;}
  .hero-inner > div{min-width:0;}
  .hero-kicker{display:inline-flex; align-items:center; gap:8px; font-family:'Roboto', sans-serif; font-size:13px; letter-spacing:.1em; text-transform:uppercase; color:var(--rust); background:rgba(190,30,45,.08); border:1px solid rgba(190,30,45,.18); padding:6px 12px; border-radius:var(--r-pill); animation:fadeUpIn .6s var(--ease) both;}
  .hero-title{font-size:clamp(40px, 5.2vw, 72px); line-height:1.06; margin:0 0 22px; word-break:break-word; animation:fadeUpIn .7s var(--ease) .06s both;}
  .hero-title em{font-style:normal; color:var(--prussian); font-weight:700;}
  .hero-sub{font-size:19.5px; max-width:620px; color:var(--ink); font-weight:500; margin-bottom:26px; text-shadow:0 1px 1px rgba(255,255,255,.65); animation:fadeUpIn .7s var(--ease) .14s both;}
  .hero-actions{display:flex; gap:14px; flex-wrap:wrap; margin-bottom:34px; animation:fadeUpIn .7s var(--ease) .22s both;}
  .hero-stats{display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:0; border-top:1px solid var(--line); padding-top:24px; animation:fadeUpIn .7s var(--ease) .3s both;}
  .stat{min-width:0; display:flex; align-items:flex-start; gap:12px; padding:0 18px; border-right:1px solid var(--line); transition:transform .2s ease;}
  .stat:hover{transform:translateY(-2px);}
  .stat:first-child{padding-left:0;}
  .stat:last-child{border-right:none; padding-right:0;}
  .stat-icon{width:36px; height:36px; border-radius:50%; border:1.5px solid var(--rust); color:var(--rust); display:flex; align-items:center; justify-content:center; flex-shrink:0; background:var(--white); transition:background .2s ease, color .2s ease;}
  .stat:hover .stat-icon{background:var(--rust); color:var(--white);}
  .stat-text{display:flex; flex-direction:column; min-width:0;}
  .stat b{font-family:'Roboto', sans-serif; font-size:28px; display:block; color:var(--prussian); font-weight:700; white-space:nowrap;}
  .stat span{font-size:13px; color:var(--ink-mute); font-family:'Roboto', sans-serif; letter-spacing:.03em; line-height:1.3;}

  /* Ticket visual — the hero's signature element: a boarding pass to Germany */
  .ticket{background:var(--prussian); color:var(--white); border-radius:var(--r-md); padding:0; position:relative; box-shadow:var(--shadow-lg); overflow:hidden; width:100%; max-width:100%; animation:fadeUpIn .8s var(--ease) .2s both; transition:box-shadow .3s ease, transform .3s ease;}
  .ticket:hover{box-shadow:0 32px 64px -18px rgba(19,39,56,.5); transform:translateY(-3px);}
  .bundesadler{position:absolute; top:18px; right:18px; width:56px; height:56px; border:2px solid var(--rust); border-radius:8px; color:#fff; background:var(--rust); display:flex; align-items:center; justify-content:center; transform:rotate(-8deg); z-index:3; box-shadow:0 6px 16px rgba(190,30,45,.4); pointer-events:none;}
  .bundesadler span{font-family:'DM Sans', sans-serif; font-weight:700; font-size:21.5px; line-height:1.05; letter-spacing:1px;}
  .ticket::before{content:''; position:absolute; top:0; left:0; right:0; height:6px; background:repeating-linear-gradient(90deg, var(--gold) 0 14px, transparent 14px 24px);}
  .ticket-top{padding:32px 28px 24px; border-bottom:1px dashed rgba(255,255,255,.28); position:relative;}
  .ticket-notch{position:absolute; width:22px; height:22px; background:var(--paper); border-radius:50%; bottom:-11px;}
  .ticket-notch.left{left:-11px;} .ticket-notch.right{right:-11px;}
  .ticket-route{display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:center; margin-bottom:22px; gap:8px;}
  .ticket-route .city{font-family:'Roboto', sans-serif; font-size:26px; font-weight:700;}
  .ticket-route .arrow{font-family:'Roboto', sans-serif; color:var(--gold-soft); font-size:12.5px; text-align:center; letter-spacing:.04em;}
  .ticket-route .sub{font-family:'Roboto', sans-serif; font-size:11px; opacity:.68; letter-spacing:.07em; text-transform:uppercase; margin-top:4px;}
  .ticket-form-head{font-family:'Roboto', sans-serif; font-size:16px; text-transform:uppercase; letter-spacing:.08em; color:var(--gold-soft); margin-bottom:16px;}
  .ticket-form .form-row{margin-bottom:14px;}
  .ticket-form-row{display:grid; grid-template-columns:1fr 1fr; gap:0 12px;}
  .ticket-form-row > .form-row{min-width:0;}
  .ticket-bottom{padding:18px 28px 26px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;}
  .ticket-bottom .barcode{display:flex; gap:2.5px; align-items:flex-end; height:32px;}
  .ticket-bottom .barcode i{display:block; width:2.5px; background:var(--gold-soft); opacity:.85; border-radius:1px;}
  .ticket-rating{font-family:'Roboto', sans-serif; font-size:12.5px; color:var(--gold-soft); letter-spacing:.04em;}

  /* ===== EXAM BADGES STRIP ===== */
  .exam-strip{position:relative; z-index:2; background:linear-gradient(180deg, rgba(30,58,84,.05) 0%, var(--paper) 100%); border-top:1px dashed var(--line); padding:34px 0 44px; max-width:100vw; overflow:hidden;}
  .exam-strip .exam-head{text-align:center; margin-bottom:26px;}
  .exam-strip .exam-head .kicker{font-family:'Roboto', sans-serif; font-size:12.5px; text-transform:uppercase; letter-spacing:.12em; color:var(--rust); margin-bottom:8px; display:block;}
  .exam-strip .exam-head h3{font-family:'Roboto', sans-serif; font-size:clamp(23px, 2.7vw, 30px); color:var(--prussian-deep); font-weight:700; line-height:1.3;}
  .exam-strip .exam-head h3 em{font-style:normal; font-weight:700; color:var(--rust);}
  .exam-row{display:flex; justify-content:center; align-items:flex-start; gap:36px; flex-wrap:wrap; padding:6px 0;}
  .exam-badge{display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none; color:inherit; transition:transform .22s var(--ease);}
  .exam-badge:hover{transform:translateY(-4px);}
  .exam-badge .badge-letter{font-family:'Roboto', sans-serif; font-weight:900; font-size:56px; line-height:1; color:var(--ring, var(--prussian-deep)); transition:transform .22s var(--ease), filter .22s ease;}
  .exam-badge:hover .badge-letter{transform:scale(1.08); filter:drop-shadow(0 6px 14px rgba(0,0,0,.18));}
  .exam-badge .badge-caption{font-family:'Roboto', sans-serif; font-size:12px; letter-spacing:.03em; color:var(--ink-mute); text-align:center; max-width:100px; line-height:1.35;}
  .exam-badge .badge-caption b{color:var(--prussian-deep); font-weight:700; font-family:'Roboto', sans-serif;}

  /* ===== SECTION RHYTHM ===== */
  section{padding:var(--section-pad) 0; max-width:100vw; overflow-x:hidden;}
  .sec-head{max-width:660px; margin-bottom:44px;}
  .sec-head .kicker{display:inline-block; font-family:'Roboto', sans-serif; font-size:12.5px; text-transform:uppercase; letter-spacing:.12em; color:var(--gold-soft); margin-bottom:12px;}
  .sec-head h2{font-size:clamp(32px,3.8vw,48px); line-height:1.12;}
  .sec-head p{color:var(--ink-soft); font-size:18px; margin-top:14px; max-width:580px;}
  .sec-head-row{display:flex; align-items:center; justify-content:flex-start; gap:32px; margin-bottom:44px;}
  .sec-head-row .sec-head{margin-bottom:0;}
  .sec-icon-big{flex-shrink:0; width:112px; height:112px; color:var(--rust); opacity:.9;}
  .sec-icon-big svg{width:100%; height:100%;}
  @media (max-width: 720px){
    :root{--header-h:66px;}
    .sec-head-row{flex-direction:row; align-items:center; justify-content:flex-start; gap:16px;}
    .sec-icon-big{width:64px; height:64px; align-self:center;}
  }

  /* ===== SECTION CTA BIG — large prominent buttons after major sections ===== */
  .section-cta-big{margin:0 auto; padding:28px 32px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:18px; max-width:720px;}
  .section-cta-big .section-cta-heading{font-size:clamp(26px, 3.2vw, 40px); font-weight:700; color:var(--prussian-deep); line-height:1.2; margin:0;}
  .section-cta-big .section-cta-heading.on-dark{color:var(--white);}
  .section-cta-big .section-cta-subtext{font-size:17px; color:var(--ink-soft); max-width:580px; line-height:1.5;}
  .section-cta-big .section-cta-subtext.on-dark{color:rgba(255,255,255,.75);}
  .section-cta-big .btn-large{padding:18px 42px; font-size:18px; border-radius:var(--r-md); display:inline-flex; gap:12px; align-items:center; min-width:280px; justify-content:center;}
  .section-cta-big .btn-large svg{width:20px; height:20px;}
  .section-cta-big .btn-alt{display:inline-flex; font-size:16px; gap:8px; color:var(--rust); text-decoration:none; font-weight:600; transition:transform .2s ease, color .2s ease;}
  .section-cta-big .btn-alt:hover{transform:translateX(6px); color:var(--rust-deep);}
  .section-cta-big .btn-alt.on-dark{color:var(--gold-soft);}
  .section-cta-big .btn-alt.on-dark:hover{color:var(--white);}
  .section-cta-big .btn-alt{display:none;}
  .methodology + .section-cta-big{margin-top:0; padding-top:16px;}

  @media (max-width: 720px){
    .section-cta-big{margin:0 auto; padding:24px 20px;}
    .section-cta-big .btn-large{min-width:100%; padding:16px 24px;}
  }

  /* ===== GENERIC CARD LOOK — used across grids for consistency ===== */
  .skill-stamp, .feature, .mode-card, .curriculum-card, .audience-card, .detail-box, .fact-box, .included-item, .batch-card, .method-step, .career-card{
    background:var(--white);
    transition:transform .24s var(--ease), box-shadow .24s var(--ease);
  }
  .skill-stamp:hover, .feature:hover, .mode-card:hover, .curriculum-card:hover, .detail-box:hover, .fact-box:hover, .included-item:hover, .batch-card:hover, .method-step:hover, .career-card:hover{
    transform:translateY(-5px);
    box-shadow:var(--shadow-md);
    position:relative;
    z-index:2;
  }

  /* ===== WHAT YOU'LL LEARN ===== */
  .skills-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .skill-stamp{padding:32px 26px 28px; position:relative; min-width:0;}
  .skill-stamp .skill-native{width:54px; height:54px; border:2px solid var(--rust); border-radius:var(--r-sm); display:flex; align-items:center; justify-content:center; font-family:'DM Sans', 'Roboto', sans-serif; font-weight:700; font-size:26px; color:var(--rust); margin-bottom:18px;}
  .skill-stamp .skill-en{font-family:'Roboto', sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); margin-bottom:14px; display:block;}
  .skill-stamp p{font-size:15.5px; color:var(--ink-soft);}

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
  .stop-dot{width:46px; height:46px; border-radius:50%; background:var(--prussian-deep); border:3px solid var(--gold); position:relative; z-index:2; margin-bottom:20px; display:flex; align-items:center; justify-content:center; color:var(--gold-soft); font-family:'Roboto', sans-serif; font-weight:700; font-size:15.5px; box-shadow:0 0 0 5px var(--prussian-deep);}
  .stop-dot.final{background:var(--gold); border-color:var(--white); color:var(--prussian-deep);}
  .stop-code{font-family:'Roboto', sans-serif; font-size:14px; color:var(--gold-soft); letter-spacing:.06em;}
  .stop h3{font-family:'Roboto', sans-serif; font-size:23.5px; margin:7px 0 9px; font-weight:700; max-width:190px; color:var(--white);}
  .stop p{font-size:15px; color:rgba(255,255,255,.72); line-height:1.55; max-width:190px;}
  .rail-flag{position:absolute; right:18px; top:-8px; font-family:'Roboto', sans-serif; font-size:12.5px; color:var(--gold-soft); letter-spacing:.08em; text-transform:uppercase;}
  .unlock-tag{display:inline-block; margin-top:13px; font-family:'Roboto', sans-serif; font-size:12px; letter-spacing:.03em; color:var(--prussian-deep); background:var(--gold-soft); padding:6px 10px; border-radius:var(--r-sm); font-weight:500;}

  /* ===== LANGUAGE FACTS ===== */
  .lang-facts{background:var(--paper); border-top:1px solid var(--line);}
  .lang-photo{width:100%; height:450px; object-fit:cover; object-position:center 30%; border-radius:var(--r-md); margin-bottom:24px; border:1px solid var(--line); box-shadow:var(--shadow-sm); will-change:transform; contain:layout style paint;}
  .lang-inner{display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start;}
  .lang-inner > div{min-width:0;}
  .lang-copy p{color:var(--ink-soft); font-size:17.5px; margin-bottom:18px; max-width:480px;}
  .lang-copy p:last-child{margin-bottom:0;}
  .fact-strip{display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden; margin-top:8px;}
  .fact-box{padding:26px 24px; min-width:0;}
  .fact-box b{font-family:'Roboto', sans-serif; font-size:30px; display:block; color:var(--prussian); font-weight:700; line-height:1;}
  .fact-box span{font-size:14px; color:var(--ink-mute); display:block; margin-top:9px; line-height:1.45;}
  .cognates{margin-top:28px; border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden; background:var(--white);}
  .cognates-head{display:grid; grid-template-columns:1fr 1fr 1fr; background:var(--prussian); color:var(--white); font-family:'Roboto', sans-serif; font-size:12.5px; letter-spacing:.06em; text-transform:uppercase;}
  .cognates-head div{padding:11px 16px; min-width:0;}
  .cognate-row{display:grid; grid-template-columns:1fr 1fr 1fr; border-top:1px solid var(--line); font-size:15.5px; transition:background .18s ease;}
  .cognate-row:hover{background:rgba(199,162,79,.09);}
  .cognate-row div{padding:12px 16px; min-width:0; overflow-wrap:break-word;}
  .cognate-row div:first-child{font-weight:700; font-family:'Roboto', sans-serif; font-style:normal;}
  .cognate-row div:last-child{color:var(--ink-mute); font-size:14.5px;}
  .lang-note{margin-top:26px; border:1px solid var(--line); border-radius:var(--r-md); padding:22px 24px; background:var(--white);}
  .lang-note h4{font-family:'Roboto', sans-serif; font-size:13.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); margin-bottom:11px;}
  .lang-note p{font-size:15.5px; color:var(--ink-soft); line-height:1.65;}

  /* ===== COURSE DETAILS / QUICK FACTS ===== */
  .course-details{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .details-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .detail-box{padding:26px 22px; min-width:0;}
  .detail-label{font-family:'Roboto', sans-serif; text-transform:uppercase; letter-spacing:.08em; font-size:12px; color:var(--rust); margin-bottom:8px;}
  .detail-value{font-family:'Roboto', sans-serif; font-size:22.5px; font-weight:700; line-height:1.25;}
  .detail-note{font-size:14px; color:var(--ink-mute); margin-top:7px;}

  /* ===== WHO THIS IS FOR ===== */
  .audience-grid{display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:16px;}
  .audience-card{border:1px solid var(--line); padding:28px 24px; border-radius:var(--r-md); min-width:0; transition:box-shadow .2s ease, transform .2s ease;}
  .audience-card:hover{box-shadow:var(--shadow-md); transform:translateY(-3px);}
  .audience-icon, .feature-icon, .method-icon{width:46px; height:46px; border-radius:50%; border:1.5px solid var(--rust); color:var(--rust); background:var(--white); display:flex; align-items:center; justify-content:center; margin-bottom:18px;}
  .audience-icon svg, .feature-icon svg, .method-icon svg{width:21px; height:21px;}
  .audience-num{font-family:'Roboto', sans-serif; text-transform:uppercase; letter-spacing:.08em; font-size:11px; color:var(--rust); margin-bottom:17px;}
  .audience-card h3{font-size:22.5px; margin-bottom:9px;}
  .audience-card p{font-size:15px; color:var(--ink-soft);}
  .heading-accent{color:var(--rust);}

  /* ===== FEATURES ===== */
  .features-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .feature{padding:38px 32px; min-width:0;}
  .feature-icon{margin-bottom:18px;}
  .feature .fnum{font-family:'Roboto', sans-serif; font-size:13px; color:var(--rust); letter-spacing:.08em; text-transform:uppercase;}
  .feature h3{font-size:23.5px; margin:15px 0 11px; font-weight:700;}
  .feature p{font-size:16px; color:var(--ink-soft);}

  /* ===== MODES ===== */
  .modes{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .modes-photo{width:100%; height:520px; object-fit:cover; border-radius:var(--r-md); margin-bottom:34px; border:1px solid var(--line); box-shadow:var(--shadow-md);}
  .modes-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:20px;}
  .mode-card{border:1px solid var(--line); border-radius:var(--r-md); padding:30px 26px; position:relative; overflow:hidden; min-width:0; border-top:4px solid var(--gold);}
  .mode-card h3{font-size:22.5px; margin-bottom:11px;}
  .mode-card p{font-size:15.5px; color:var(--ink-soft); margin-bottom:16px;}
  .mode-tag{font-family:'Roboto', sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--prussian); background:rgba(30,58,84,.08); padding:5px 10px; border-radius:var(--r-sm); display:inline-block;}

  /* ===== CURRICULUM ===== */
  .curriculum-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
  .curriculum-card{border:1px solid var(--line); border-radius:var(--r-md); padding:26px 24px;}
  .curriculum-level{color:var(--rust); font-family:'Roboto', sans-serif; font-size:12.5px; letter-spacing:.06em; text-transform:uppercase;}
  .curriculum-card h3{font-size:24.5px; margin:8px 0 9px;}
  .curriculum-card p{font-size:15px; color:var(--ink-soft); margin-bottom:16px;}
  .curriculum-card ul{list-style:none; display:grid; gap:9px;}
  .curriculum-card li{font-size:14.5px; color:var(--ink); padding-left:19px; position:relative;}
  .curriculum-card li::before{content:'✓'; position:absolute; left:0; color:var(--prussian); font-weight:700;}

  /* ===== STUDY HOURS ===== */
  .study-hours{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .hours-chart{display:flex; flex-direction:column; gap:20px; max-width:840px;}
  .hours-row{display:grid; grid-template-columns:56px 1fr 92px; align-items:center; gap:18px;}
  .hours-level{font-family:'Roboto', sans-serif; font-weight:700; font-size:21.5px; color:var(--ink);}
  .hours-track{height:14px; background:var(--white); border:1px solid var(--line); border-radius:var(--r-pill); overflow:hidden; position:relative;}
  .hours-bar{height:100%; background:linear-gradient(90deg, var(--rust), var(--gold)); border-radius:var(--r-pill); transition:width .4s ease;}
  .hours-value{font-family:'Roboto', sans-serif; font-size:14px; color:var(--prussian-deep); text-align:right; white-space:nowrap;}
  .hours-note{font-size:14px; color:var(--ink-mute); margin-top:20px; max-width:640px;}

  /* ===== METHODOLOGY ===== */
  .methodology{background:var(--paper);}
  .method-grid{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .method-step{background:var(--white); padding:30px 24px;}
  .method-icon{margin-bottom:18px;}
  .step-no{font-family:'Roboto', sans-serif; font-size:12.5px; color:var(--rust); letter-spacing:.05em;}
  .method-step h3{font-size:21.5px; margin:14px 0 9px;}
  .method-step p{font-size:14.5px; color:var(--ink-soft);}

  /* ===== WHAT'S INCLUDED ===== */
  .included{background:var(--paper-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .included-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:12px;}
  .included-item{border:1px solid var(--line); border-radius:var(--r-sm); padding:17px 19px; display:flex; gap:12px; align-items:flex-start;}
  .included-item .tick{width:22px; height:22px; border-radius:50%; background:var(--gold-soft); color:var(--prussian-deep); display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0; font-size:13.5px;}
  .included-item span:last-child{font-size:15px; color:var(--ink);}

  /* ===== PATHWAYS ===== */
  .pathways{background:var(--prussian-deep); color:var(--white);}
  .pathways .sec-head h2{color:var(--white);}
  .pathways .sec-head p{color:rgba(255,255,255,.68);}
  .path-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:22px;}
  .path-card{background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.14); border-radius:var(--r-lg); padding:30px 26px; position:relative; overflow:hidden; min-width:0; transition:transform .26s var(--ease), background .26s ease, border-color .26s ease, box-shadow .26s var(--ease);}
  .path-card:hover{transform:translateY(-6px); background:rgba(255,255,255,.07); border-color:rgba(199,162,79,.4); box-shadow:0 20px 40px -18px rgba(0,0,0,.5);}
  .path-photo-wrap{width:calc(100% + 52px); height:250px; margin:-30px -26px 22px; overflow:hidden; position:relative; display:block;}
  .path-photo{width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s var(--ease);}
  .path-card:hover .path-photo{transform:scale(1.08);}
  .path-card .path-icon{width:46px; height:46px; border-radius:50%; background:var(--gold); color:var(--prussian-deep); display:flex; align-items:center; justify-content:center; margin-bottom:20px; flex-shrink:0; transition:transform .3s var(--ease);}
  .path-card:hover .path-icon{transform:scale(1.1) rotate(-6deg);}
  .path-card h3{font-size:26px; margin-bottom:7px; color:var(--white);}
  .path-card .path-tag{font-family:'Roboto', sans-serif; font-size:12.5px; color:var(--gold-soft); text-transform:uppercase; letter-spacing:.08em;}
  .path-card ul{margin-top:19px; list-style:none; display:flex; flex-direction:column; gap:12px;}
  .path-card li{display:flex; gap:10px; font-size:15.5px; color:rgba(255,255,255,.82); line-height:1.5;}
  .path-card li::before{content:'◦'; color:var(--gold); flex-shrink:0;}

  /* ===== CAREERS ===== */
  .career-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:18px;}
  .career-card{border:1px solid var(--line); border-radius:var(--r-md); padding:28px 26px;}
  .career-card h3{font-size:23.5px; margin-bottom:14px;}
  .career-tags{display:flex; flex-wrap:wrap; gap:8px;}
  .career-tag{font-family:'Roboto', sans-serif; font-size:12px; color:var(--prussian-deep); background:var(--gold-soft); border:1px solid var(--line); padding:7px 10px; border-radius:var(--r-sm);}

  /* ===== EXAM COMPARE TABLE ===== */
  .exam-compare{background:var(--white); border-top:1px solid var(--line);}
  .compare-wrap{overflow-x:auto; border:1px solid var(--line); border-radius:var(--r-md);}
  .compare-table{width:100%; min-width:720px; border-collapse:collapse;}
  .compare-table th, .compare-table td{padding:17px 20px; border-bottom:1px solid var(--line); text-align:left; font-size:15px; vertical-align:top;}
  .compare-table th{font-family:'Roboto', sans-serif; font-size:12px; text-transform:uppercase; letter-spacing:.07em; color:var(--white); background:var(--prussian-deep);}
  .compare-table tr:last-child td{border-bottom:none;}
  .compare-table td:first-child{font-weight:700;}
  .compare-table tbody tr{transition:background .15s ease;}
  .compare-table tbody tr:hover{background:rgba(30,58,84,.05);}

  /* ===== BATCHES ===== */
  .batches{background:var(--paper);}
  .batch-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
  .batch-card{border:1px solid var(--line); border-radius:var(--r-md); padding:28px 24px; position:relative;}
  .batch-card::before{content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--gold); border-radius:var(--r-md) 0 0 var(--r-md);}
  .batch-tag{font-family:'Roboto', sans-serif; text-transform:uppercase; letter-spacing:.08em; font-size:12px; color:var(--rust);}
  .batch-card h3{font-size:23.5px; margin:9px 0 14px;}
  .batch-meta{display:grid; gap:9px; margin-bottom:20px;}
  .batch-meta div{display:flex; justify-content:space-between; gap:12px; font-size:14.5px; border-bottom:1px dashed var(--line); padding-bottom:8px;}
  .batch-meta span{color:var(--ink-mute); text-align:right;}
  .batch-card .btn{width:100%; justify-content:center;}
  .batch-note{font-size:13.5px; color:var(--ink-mute); margin-top:20px;}
  .trust-badges{display:flex; flex-wrap:wrap; gap:11px 24px; justify-content:center; margin-top:24px; padding-top:22px; border-top:1px dashed var(--line);}
  .trust-badges span{font-family:'Roboto', sans-serif; font-size:13.5px; font-weight:700; color:var(--prussian-deep); display:inline-flex; align-items:center; gap:6px;}

  /* ===== FAQ ===== */
  .faq-list{display:flex; flex-direction:column; gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden;}
  .faq-item{background:var(--white); padding:0; transition:background .18s ease;}
  .faq-item summary{padding:21px 26px; cursor:pointer; font-weight:700; font-size:17.5px; list-style:none; display:flex; justify-content:space-between; align-items:center; gap:12px; transition:background .18s ease;}
  .faq-item summary:hover{background:rgba(199,162,79,.07);}
  .faq-item summary::-webkit-details-marker{display:none;}
  .faq-item summary::after{content:'+'; font-family:'Roboto', sans-serif; font-size:22.5px; color:var(--rust); flex-shrink:0; transition:transform .25s var(--ease);}
  .faq-item[open] summary::after{transform:rotate(45deg);}
  .faq-item .faq-a{padding:0 26px 22px; font-size:16px; color:var(--ink-soft); max-width:720px; animation:faqReveal .35s ease both;}
  @keyframes faqReveal{from{opacity:0; transform:translateY(-6px);} to{opacity:1; transform:translateY(0);}}

  /* ===== GERMAN ACTIVITIES SLIDER ===== */
  .activities{background:var(--ink); color:var(--white); position:relative; overflow:hidden;}
  .activities .wrap{position:relative; z-index:2;}
  .activities .sec-head h2{color:var(--white);}
  .activities .sec-head p{color:rgba(255,255,255,.65);}
  .activity-slider{position:relative;}
  .activity-viewport{overflow:hidden; border-radius:var(--r-lg);}
  .activity-track{display:flex; align-items:stretch; transition:transform .5s var(--ease); touch-action:pan-y;}
  .activity-slide{flex-shrink:0; padding:0 8px; min-width:0; display:flex;}
  .activity-card{background:linear-gradient(145deg,#1C2E42,#142536); border:1px solid var(--line-on-dark); border-radius:var(--r-lg); width:100%; height:100%; display:flex; flex-direction:column; position:relative; overflow:hidden; transition:transform .3s var(--ease), box-shadow .3s var(--ease), border-color .3s ease;}
  .activity-card:hover{transform:translateY(-6px); box-shadow:0 22px 42px -16px rgba(0,0,0,.55); border-color:rgba(199,162,79,.4);}
  .activity-image{width:100%; aspect-ratio:10/0; height:auto; object-fit:cover; object-position:center; display:block; flex-shrink:0; background:#142536; transition:transform .5s var(--ease); will-change:transform; contain:layout style paint;}
  .activity-card:hover .activity-image{transform:scale(1.06);}
  .activity-image-wrap{position:relative; overflow:hidden; background:#142536;}
  .activity-image-wrap::after{content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(10,20,30,0) 45%,rgba(10,20,30,.45) 100%); pointer-events:none;}
  .activity-content{padding:18px 18px 20px; position:relative; z-index:2; flex:1; display:flex; flex-direction:column;}
  .activity-content p{margin-top:auto; padding-top:10px;}
  .activity-card::after{content:''; position:absolute; right:-8px; bottom:-18px; pointer-events:none;}
  .activity-icon{width:36px; height:36px; border:1.5px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--gold-soft); font-family:'Roboto',monospace; font-size:14.5px; font-weight:700; margin-bottom:10px; background:rgba(20,37,54,.92);}
  .activity-tag{font-family:'Roboto',monospace; font-size:11px; letter-spacing:.08em; color:var(--gold-soft); text-transform:uppercase;}
  .activity-card h3{font-size:19px; color:var(--white); margin:6px 0 9px;}
  .activity-card p{font-size:14.5px; color:rgba(255,255,255,.72); line-height:1.55; min-height:4.65em; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;}
  .activity-controls{display:flex; align-items:center; justify-content:space-between; margin-top:28px; gap:20px;}
  .activity-arrows{display:flex; gap:10px;}
  .activity-arrow{width:44px; height:44px; border-radius:50%; border:1.5px solid rgba(255,255,255,.25); background:transparent; color:var(--white); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .18s ease, border-color .18s ease, transform .18s ease;}
  .activity-arrow:hover{background:rgba(255,255,255,.1); border-color:var(--gold-soft); transform:translateY(-1px);}
  .activity-dots{display:flex; gap:8px; flex-wrap:wrap;}
  .activity-dot{width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.25); border:none; cursor:pointer; padding:0; transition:width .2s ease, background .2s ease;}
  .activity-dot.active{background:var(--gold); width:22px; border-radius:var(--r-pill);}

  /* ===== VIDEO TESTIMONIALS ===== */
  .testimonials{background:var(--prussian-deep); color:var(--white); position:relative; overflow:hidden;}
  .testimonials .wrap{position:relative; z-index:2;}
  .testimonials .sec-head h2{color:var(--white);}
  .testimonials .sec-head p{color:rgba(255,255,255,.65);}
  .testi-slider{position:relative;}
  .testi-viewport{overflow:hidden; border-radius:var(--r-lg);}
  .testi-track{display:flex; align-items:stretch; transition:transform .5s var(--ease); touch-action:pan-y;}
  .testi-slide{flex-shrink:0; padding:0 8px; min-width:0; display:flex;}
  .testi-card{position:relative; width:100%; aspect-ratio:9/16; border-radius:var(--r-lg); overflow:hidden; background:#0c1822; box-shadow:0 18px 36px -18px rgba(0,0,0,.55); transition:transform .3s var(--ease), box-shadow .3s var(--ease);}
  .testi-card:hover{transform:translateY(-6px); box-shadow:0 24px 46px -16px rgba(0,0,0,.6);}
  .testi-video-el{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; background:#000;}
  .testi-controls{display:flex; align-items:center; justify-content:space-between; margin-top:28px; gap:20px;}
  .testi-arrows{display:flex; gap:10px;}
  .testi-arrow{width:44px; height:44px; border-radius:50%; border:1.5px solid rgba(255,255,255,.25); background:transparent; color:var(--white); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .18s ease, border-color .18s ease, transform .18s ease;}
  .testi-arrow:hover{background:rgba(255,255,255,.1); border-color:var(--gold-soft); transform:translateY(-1px);}
  .testi-dots{display:flex; gap:8px; flex-wrap:wrap;}
  .testi-dot{width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.25); border:none; cursor:pointer; padding:0; transition:width .2s ease, background .2s ease;}
  .testi-dot.active{background:var(--gold); width:22px; border-radius:var(--r-pill);}

  /* ===== FINAL CTA ===== */
  .final-cta{background:var(--prussian-deep); color:var(--white); text-align:center; position:relative; overflow:hidden;}
  .final-cta .wrap{position:relative; z-index:2;}
  .final-cta .kicker{font-family:'Roboto', sans-serif; font-size:12.5px; text-transform:uppercase; letter-spacing:.12em; color:var(--gold-soft);}
  .final-cta h2{font-size:clamp(34px,4.4vw,54px); margin:14px auto; max-width:760px; color:var(--white);}
  .final-cta p{max-width:650px; margin:0 auto 28px; color:rgba(255,255,255,.7); font-size:18px;}
  .final-cta-actions{display:flex; justify-content:center; gap:12px; flex-wrap:wrap;}
  .final-cta .btn-ghost{border-color:rgba(255,255,255,.45); color:var(--white);}
  .final-cta .btn-ghost:hover{background:var(--white); color:var(--ink);}
  .final-cta .microcopy{font-family:'Roboto', sans-serif; font-size:12px; color:rgba(255,255,255,.5); margin-top:18px;}

  /* ===== CONTACT ===== */
  .contact{background:var(--paper);}
  .contact-grid{display:grid; grid-template-columns:.95fr 1.05fr; gap:60px; align-items:start;}
  .contact-grid > div{min-width:0;}
  .contact-list{display:flex; flex-direction:column; gap:0; border-top:1px solid var(--line);}
  .contact-row{display:flex; gap:18px; padding:23px 0; border-bottom:1px solid var(--line); align-items:flex-start; transition:padding-left .2s ease;}
  .contact-row:hover{padding-left:6px;}
  .contact-icon{width:42px; height:42px; border-radius:50%; background:var(--prussian); color:var(--white); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .2s ease, transform .2s ease;}
  .contact-row:hover .contact-icon{background:var(--rust); transform:scale(1.08);}
  .contact-row > div:last-child{min-width:0;}
  .contact-row h4{font-size:13.5px; font-family:'Roboto', sans-serif; text-transform:uppercase; letter-spacing:.08em; color:var(--ink-mute); margin-bottom:6px;}
  .contact-row a, .contact-row div.val{font-size:18.5px; font-weight:700; text-decoration:none; word-break:break-word;}
  .contact-row a:hover{color:var(--rust);}
  .contact-row .note{font-size:14.5px; color:var(--ink-soft); font-weight:400; margin-top:4px;}
  .social-row{display:flex; gap:12px; margin-top:26px; flex-wrap:wrap;}
  .social-chip{width:38px; height:38px; border-radius:50%; border:1.5px solid var(--ink); display:flex; align-items:center; justify-content:center; text-decoration:none; color:var(--ink); transition:all .2s ease; flex-shrink:0;}
  .social-chip:hover{background:var(--ink); color:var(--paper); transform:translateY(-2px);}

  .enroll-card{background:var(--prussian); color:var(--white); border-radius:var(--r-lg); padding:48px 44px; position:relative; overflow:hidden; box-shadow:var(--shadow-lg); transition:box-shadow .3s ease, transform .3s ease;}
  .enroll-card:hover{box-shadow:0 32px 60px -16px rgba(19,39,56,.55); transform:translateY(-3px);}
  .enroll-card::before{content:''; position:absolute; top:-60px; right:-60px; width:180px; height:180px; border-radius:50%; background:rgba(199,162,79,.22);}
  .enroll-card h3{font-size:32px; margin-bottom:12px; position:relative; color:var(--white);}
  .enroll-card p{font-size:19px; color:rgba(255,255,255,.7); margin-bottom:32px; position:relative;}
  .form-row{margin-bottom:20px; position:relative;}
  .form-row label{display:block; font-family:'Roboto', sans-serif; font-size:16px; text-transform:uppercase; letter-spacing:.08em; margin-bottom:9px; color:var(--gold-soft);}
  .form-row input{width:100%; box-sizing:border-box; padding:16px 16px; border-radius:var(--r-sm); border:1px solid rgba(255,255,255,.25); background:rgba(255,255,255,.06); color:var(--white); font-family:'Roboto', sans-serif; font-size:19px; min-height:56px; line-height:1.3; transition:border-color .2s ease, background .2s ease;}
  .form-row input:hover{border-color:rgba(255,255,255,.42);}
  .form-row input::placeholder{color:rgba(255,255,255,.4);}
  .form-row input:focus{outline:2px solid var(--gold); outline-offset:1px; background:rgba(255,255,255,.1);}
  .field-error{display:block; margin-top:7px; font-size:13.5px; color:#FF8A80; font-family:'Roboto', sans-serif;}
  .submit-btn{width:100%; padding:18px; background:var(--rust); color:var(--white); border:none; border-radius:var(--r-sm); font-weight:700; font-size:20px; cursor:pointer; margin-top:8px; transition:transform .18s ease, background .18s ease, box-shadow .18s ease; font-family:'Roboto', sans-serif;}
  .submit-btn:hover{transform:translateY(-2px); background:var(--rust-deep); box-shadow:0 10px 22px rgba(190,30,45,.35);}
  .submit-btn:active{transform:translateY(0) scale(.97);}
  .submit-btn:disabled{opacity:.7; cursor:not-allowed; transform:none;}
  .form-msg{display:block; font-size:14px; line-height:1.45; margin-top:14px; padding:12px 14px; border-radius:var(--r-sm); font-family:'Roboto', sans-serif; font-weight:500;}
  .form-msg.success{color:#0f3d2e; background:#d9f5e5; border:1px solid #8fd9b4;}
  .form-msg.error{color:#7a1c1c; background:#fde8e8; border:1px solid #f0b4b4;}
  .form-alt{display:flex; align-items:center; gap:10px; margin-top:22px; padding-top:22px; border-top:1px dashed rgba(255,255,255,.2); flex-wrap:wrap;}

  /* ===== MAP STRIP ===== */
  .map-strip{border-top:1px solid var(--line); border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; padding:24px 0; flex-wrap:wrap; gap:16px;}
  .map-strip a{text-decoration:none; font-weight:700; display:inline-flex; align-items:center; gap:8px; color:var(--rust); transition:color .18s ease, transform .18s ease;}
  .map-strip a:hover{color:var(--rust-deep); transform:translateX(4px);}

  /* ===== FOOTER ===== */
  .de-footer{background:var(--prussian-deep); color:#fff; position:relative; overflow:hidden; padding:64px 0 30px;}
  .de-footer .wrap{position:relative; z-index:2;}
  .footer-grid{display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; padding-bottom:40px; border-bottom:1px solid var(--line-on-dark);}
  .footer-brand h2{font-family:'Roboto',serif; font-size:31.5px; margin-bottom:7px; color:var(--white);}
  .footer-brand .de-motto{font-family:'Roboto',sans-serif; font-style:normal; font-weight:500; color:var(--gold-soft); font-size:15.5px; margin-bottom:15px;}
  .footer-brand p{font-size:14.5px; color:rgba(255,255,255,.62); max-width:360px;}
  .footer-col h4{font-family:'Roboto',sans-serif; color:var(--gold-soft); font-size:14.5px; margin-bottom:14px; letter-spacing:.04em; text-transform:uppercase;}
  .footer-col a{display:block; text-decoration:none; color:rgba(255,255,255,.68); font-size:14.5px; margin:9px 0; transition:color .15s ease, padding-left .15s ease;}
  .footer-col a:hover{color:#fff; padding-left:5px;}
  .footer-bottom{display:flex; justify-content:space-between; gap:20px; align-items:center; padding-top:22px; flex-wrap:wrap;}
  .footer-bottom span{font-family:'Roboto',monospace; font-size:12px; color:rgba(255,255,255,.45);}

  /* ===== FLOATING ACTIONS ===== */
  .mobile-cta-bar{display:none; position:fixed; left:14px; right:14px; bottom:18px; z-index:95; align-items:flex-end; justify-content:space-between; pointer-events:none;}
  .mobile-cta-bar-actions{display:flex; flex-direction:column; align-items:center; gap:8px; pointer-events:auto;}
  .mobile-cta-bar-call, .mobile-cta-bar-wa{position:relative; width:58px; height:58px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; text-decoration:none; box-shadow:0 10px 24px rgba(15,25,38,.25); transition:transform .15s ease, box-shadow .15s ease;}
  .mobile-cta-bar-call{background:var(--rust);}
  .mobile-cta-bar-wa{background:#1F9C56;}
  .mobile-cta-bar-call:active, .mobile-cta-bar-wa:active{transform:scale(.96);}
  .mobile-cta-label{font-size:9px; letter-spacing:.12em; text-transform:uppercase; font-weight:700; color:#fff; text-shadow:0 2px 8px rgba(0,0,0,.2);}
  @keyframes floatFadeIn{from{opacity:0;} to{opacity:1;}}
  .wa-float{position:fixed; bottom:26px; right:26px; z-index:100; width:60px; height:60px; border-radius:50%; background:#1F9C56; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 26px rgba(31,156,86,.45); text-decoration:none; animation:wa-pulse 2.6s infinite, floatFadeIn .5s ease .9s both; transition:transform .18s ease;}
  .wa-float:hover{transform:scale(1.06);}
  @keyframes wa-pulse{0%{box-shadow:0 10px 26px rgba(31,156,86,.45), 0 0 0 0 rgba(31,156,86,.5);} 70%{box-shadow:0 10px 26px rgba(31,156,86,.45), 0 0 0 16px rgba(31,156,86,0);} 100%{box-shadow:0 10px 26px rgba(31,156,86,.45), 0 0 0 0 rgba(31,156,86,0);}}
  .wa-tip{position:fixed; bottom:38px; right:96px; z-index:100; background:var(--ink); color:var(--white); padding:9px 14px; border-radius:var(--r-sm); font-size:14.5px; font-weight:500; opacity:0; pointer-events:none; transition:opacity .25s ease; white-space:nowrap;}
  .wa-float:hover + .wa-tip, .wa-tip.show{opacity:1;}
  .call-float{position:fixed; bottom:26px; left:26px; z-index:100; display:flex; align-items:center; justify-content:center; width:60px; height:60px; padding:0; border-radius:999px; background:var(--rust); box-shadow:0 10px 26px rgba(190,30,45,.4); text-decoration:none; animation:floatFadeIn .5s ease 1s both; transition:transform .18s ease, box-shadow .18s ease;}
  .call-float:hover{transform:scale(1.04); box-shadow:0 14px 32px rgba(190,30,45,.5);}
  .call-float-icon{width:34px; height:34px; border-radius:50%; background:rgba(255,255,255,.18); display:flex; align-items:center; justify-content:center; flex-shrink:0;}

  /* ============================================================
     RESPONSIVE
  ============================================================ */
  @media (max-width: 1180px){
    .path-grid{grid-template-columns:1fr 1fr;}
    .wrap{padding:0 24px;}
    .de-phone{display:none;}
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
    section{padding:48px 0;}
    .exam-row{gap:20px;}
    .exam-badge .badge-letter{font-size:44px;}
    .hero-stats{grid-template-columns:repeat(2,minmax(0,1fr)); row-gap:18px;}
    .stat:nth-child(2){border-right:0;}
    .stat:nth-child(3){padding-left:0;}
    .footer-grid{grid-template-columns:1fr 1fr;}
    .footer-brand{grid-column:1/-1;}
  }
  @media (max-width: 720px){
    .method-grid{grid-template-columns:1fr;}
    .modes-photo{height:170px;}
    .lang-photo{height:450px;}
    .path-photo-wrap{height:320px;}
    .details-grid,.audience-grid,.curriculum-grid,.method-grid,.included-grid{grid-template-columns:1fr;}
    .topbar-links{gap:5px 14px; font-size:12px;}
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
    .form-row label{font-size:12px; margin-bottom:6px;}
    .form-row input{padding:12px 13px; font-size:18px;}
    .skills-grid{grid-template-columns:1fr;}
    .path-grid{grid-template-columns:1fr;}
    .contact-row{gap:14px;}
    .activity-arrow{width:40px; height:40px;}
    section{padding:40px 0;}
    .sec-head{margin-bottom:30px;}
    .lang-facts{padding-bottom:26px;}
    #why{padding-top:26px;}
    .exam-row{gap:14px; justify-content:flex-start; overflow-x:auto; flex-wrap:nowrap; padding:6px 4px 12px; -webkit-overflow-scrolling:touch;}
    .exam-badge{flex-shrink:0;}
    .exam-badge .badge-letter{font-size:36px;}
    .exam-badge .badge-caption{font-size:10.5px; max-width:82px;}
    .exam-strip{padding:26px 0 34px;}
    .de-nav{min-height:66px; height:66px; padding-top:8px; padding-bottom:8px;}
    .announcement-bar{padding:8px 38px 8px 12px; gap:8px;}
    .announcement-text, .announcement-link{font-size:12px;}
    .wa-float{display:none;}
    .call-float{display:none;}
    .mobile-cta-bar{display:flex;}
    .langma-page{padding-bottom:74px;}
    /* Hides a separate, site-wide floating WhatsApp/call widget (rendered outside
       this component, e.g. in a shared layout) that duplicates the mobile CTA bar
       above. Matched by its Tailwind utility classes seen in DevTools. If this
       widget is ever restyled, this selector may need updating to match. */
    div[class*="fixed"][class*="right-0"][class*="top-1/2"][class*="z-50"]{display:none !important;}
    .de-brand-text{width:150px; min-width:130px; height:38px;}
    .footer-grid{grid-template-columns:1fr 1fr; gap:28px;}
    .footer-brand{grid-column:1/-1;}
    .activity-content{padding:16px 16px 18px;}
    .bundesadler{top:12px; right:12px; width:48px; height:48px;}
    .bundesadler span{font-size:18px;}
    .ticket-route{padding-right:56px;}
  }
  @media (max-width: 480px){
    .sec-head h2{font-size:clamp(30px,8.5vw,40px); line-height:1.16;}
    .de-nav{gap:12px;}
    .de-brand-text{width:120px; min-width:96px; height:34px;}
    .de-menu .de-cta{padding:9px 13px; font-size:13px;}
    .hero-title{font-size:clamp(32px, 9.5vw, 46px);}
    .hero-sub{font-size:17.5px;}
    .stat b{font-size:22.5px;}
    .ticket-top, .ticket-bottom{padding-left:20px; padding-right:20px;}
    .ticket-top{padding-top:52px;}
    .ticket-route .city{font-size:21.5px;}
    .enroll-card{padding:32px 24px;}
    .path-card{padding:24px 20px;}
    .feature{padding:28px 22px;}
    .skill-stamp{padding:24px 20px;}
    .activity-card p{font-size:14.5px;}
    .activity-slide{padding:0 6px;}
    .testi-slide{padding:0 6px;}
    .btn{padding:12px 17px; font-size:15px;}
    .faq-item summary{padding:16px 18px; font-size:15.5px;}
    .faq-item .faq-a{padding:0 18px 18px; font-size:15px;}
    .fact-strip{grid-template-columns:1fr;}
    .cognates-head div, .cognate-row div{padding:9px 10px; font-size:14px;}
    .contact-row a, .contact-row div.val{font-size:17px;}
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
    .bundesadler{top:14px; right:50%; transform:translateX(50%) rotate(-8deg);}
  }
  @media (max-width: 360px){
    .wrap{padding-left:16px; padding-right:16px;}
    .de-menu .de-cta{padding:8px 10px; font-size:12px;}
    .de-brand-text{width:108px; min-width:88px;}
    .hero-title{font-size:31px;}
    .hero-sub{font-size:16px;}
    .stat{padding-left:8px; padding-right:8px;}
    .stat b{font-size:20px;}
    .stat span{font-size:11px;}
    .btn{width:100%;}
  }
  `}</style>

      {/* URGENCY ANNOUNCEMENT BAR */}
      {showAnnouncement && (
        <div className="announcement-bar" ref={announceRef}>
          <div className="announcement-inner">
            <span className="announcement-text">🇩🇪 New German batch enrolling now — few seats available!</span>
            <a className="announcement-link" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20reserve%20a%20seat%20in%20the%20new%20German%20batch." target="_blank" rel="noopener">Reserve My Seat →</a>
          </div>
          <button className="announcement-close" onClick={() => setShowAnnouncement(false)} aria-label="Dismiss announcement">×</button>
        </div>
      )}

      {/* GERMAN HEADER */}
      <header className="de-header">
        <div className="wrap de-nav">
          <a className="de-brand" href="#top" aria-label="Langma German Course">
            <span className="de-brand-text">
              <img
                src="https://www.langmainternational.com/images/lngm2.png"
                alt="Langma International"
                className="de-brand-logo"
              />
            </span>
          </a>
          <nav className="de-menu" aria-label="German course navigation">
            <a className="de-phone" href="tel:+919810117094" aria-label="Call Langma International at +91-98101-17094">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91-98101-17094
            </a>
            <a className="de-cta" href="#contact">Free Counselling</a>
          </nav>
        </div>
      </header>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="wrap">
          <div className="topbar-links">
            <a href="tel:+919810117094">📞 +91-98101-17094</a>
            <a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">📍 {locationProfile.area}, {locationProfile.city}</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-photo" aria-hidden="true"></div>
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div>
            <span className="hero-kicker">German Language Course · Online &amp; Offline Classes</span>
            <h1 className="hero-title">Your Gateway to Germany. Begins with <span className="heading-accent">German Language</span>.</h1>
            <p className="hero-sub">Langma helps students and professionals master German with expert trainers, small batch learning, Goethe-Zertifikat preparation, and practical support for study in Germany, work in Germany, and visa pathways. Choose flexible online or offline German classes in {locationProfile.city} and build real fluency for your future in Germany.</p>
            <div className="hero-actions">
              <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20a%20free%20German%20demo%20class." target="_blank" rel="noopener" className="btn btn-wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
                Chat on WhatsApp
              </a>
              <a href="tel:+919810117094" className="btn btn-ghost">Talk to a German Counsellor</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
                <div className="stat-text"><b>13+ Yrs</b><span>TEACHING IN {locationProfile.city.toUpperCase()}</span></div>
              </div>
              <div className="stat">
                <div className="stat-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></div>
                <div className="stat-text"><b>A1–C2</b><span>ALL Goethe-Zertifikat LEVELS</span></div>
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
                  <div className="sub">{locationProfile.city}, India</div>
                </div>
                <div className="arrow">✈ ONLINE / OFFLINE ✈</div>
                <div style={{textAlign: 'right'}}>
                  <div className="city">{GERMAN_FORM_CONFIG.destinationCode}</div>
                  <div className="sub">{GERMAN_FORM_CONFIG.destinationLabel}</div>
                </div>
              </div>
              <div className="ticket-form-head">Get Course Details &amp; Batch Options</div>
              <form className="ticket-form" onSubmit={handleHeroSubmit}>
                <div className="ticket-form-row">
                  {HERO_FORM_FIELDS.map((field) => (
                    <div className="form-row" key={field.id}>
                      <label htmlFor={field.id}>{field.label}</label>
                      <input
                        {...field}
                        required
                        ref={field.name === "phone" ? heroPhoneRef : undefined}
                        aria-invalid={field.name === "phone" ? heroPhoneError : undefined}
                        aria-describedby={field.name === "phone" && heroPhoneError ? "hphone-error" : undefined}
                        onChange={field.name === "phone" ? () => setHeroPhoneError(false) : undefined}
                        style={field.name === "phone" && heroPhoneError ? { outline: '2px solid #E4574C' } : undefined}
                      />
                      {field.name === "phone" && heroPhoneError && <span id="hphone-error" className="field-error" role="alert">Enter a valid 10-digit number</span>}
                    </div>
                  ))}
                </div>
                <input type="hidden" name="language" value={GERMAN_FORM_CONFIG.language} />
                <input type="hidden" name="message" value={GERMAN_FORM_CONFIG.message} />
                <input type="hidden" name="type" value={GERMAN_FORM_CONFIG.type} />
                <input type="hidden" name="service" value={GERMAN_FORM_CONFIG.service} />
                <button type="submit" className="submit-btn" disabled={heroSubmitting}>
                  {heroSubmitting ? "Submitting..." : heroSubmitted ? "Details Requested ✓" : "Get Course Details →"}
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
              <div className="ticket-rating">{heroSubmitted ? 'SEAT CONFIRMED ✓' : 'COURSE DETAILS AVAILABLE'}</div>
            </div>
          </div>
        </div>

        {/* ===== GERMAN EXAM CERTIFICATION LOGOS STRIP ===== */}
        <div className="exam-strip">
          <div className="wrap">
            <div className="exam-head">
              <span className="kicker">Goethe-Zertifikat, telc, TestDaF &amp; Career Readiness</span>
              <h3>Prepare for the exam and the life you want in Germany.</h3>
            </div>
            <div className="exam-row reveal-group" role="list" aria-label="German language certification exams we prepare you for">
              {EXAM_BADGES.map((b, i) => {
                return (
                  <div className="exam-badge" role="listitem" key={i}
                       style={{ '--ring': b.ring, '--accent': b.accent }}>
                    <div className="badge-letter">{b.letter}</div>
                    <div className="badge-caption"><b>{b.code}</b><br/>{b.subtitle}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COURSE DETAILS / QUICK FACTS */}
      <section className="course-details" id="course-details"><div className="wrap"><div className="sec-head-row"><div className="sec-head reveal"><h2>Choose Your <span className="heading-accent">German Language</span> Learning Mode.</h2><p>Choose the right level, learning mode and route with expert guidance from {locationProfile.city} for study, work and life in <span className="heading-accent">Germany</span>.</p></div><div className="sec-icon-big" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="14" width="80" height="96" rx="10" stroke="currentColor" strokeWidth="6"/><path d="M45 14h30v10a4 4 0 0 1-4 4H49a4 4 0 0 1-4-4V14z" fill="currentColor"/><path d="M34 46l6 6 12-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 44h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><path d="M34 74l6 6 12-12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 72h26" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/><path d="M34 96h52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".45"/></svg></div></div><div className="details-grid reveal-group"><div className="detail-box"><div className="detail-label">Levels</div><div className="detail-value">A1 → C1</div><div className="detail-note">Beginner to advanced</div></div><div className="detail-box"><div className="detail-label">Learning Modes</div><div className="detail-value">Online / Offline</div><div className="detail-note">Hybrid option available</div></div><div className="detail-box"><div className="detail-label">Location</div><div className="detail-value">{locationProfile.centre}</div><div className="detail-note">{locationProfile.area}, {locationProfile.city}</div></div><div className="detail-box"><div className="detail-label">Course Fee</div><div className="detail-value">Get Fee Details</div><div className="detail-note">Ask a counsellor for current fees &amp; batches</div></div></div></div></section>

      {/* WHO THIS IS FOR */}
      {false && <section id="who">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Choose your German learning options for study, work and life in <span className="heading-accent">Germany</span>.</h2>
            <p>Choose a learning route that matches your goals, whether you want to study abroad, work in Germany, prepare for exams, or build practical German for everyday life.</p>
          </div>
          <div className="audience-grid reveal-group">
            <div className="audience-card">
              <div className="audience-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5v-17z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h7M8 10h5"/></svg></div>
              <div className="audience-num">Language</div>
              <h3>Learn German Language</h3>
              <p>Start from the basics or strengthen your current level with structured lessons in speaking, listening, reading, writing and vocabulary.</p>
              <button className="btn btn-primary btn-sm" onClick={() => openRequestPopup('demo')} style={{marginTop: '14px', width: '100%', justifyContent: 'center', cursor: 'pointer'}}>Request Free Demo</button>
            </div>
            <div className="audience-card">
              <div className="audience-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M6 11.5V16c1.8 1.8 4 2.7 6 2.7s4.2-.9 6-2.7v-4.5"/><path d="M21 9v5"/></svg></div>
              <div className="audience-num">Students</div>
              <h3>Study in Germany</h3>
              <p>Build strong German skills for university admissions, language programs, and long-term academic goals.</p>
              <button className="btn btn-primary btn-sm" onClick={() => openRequestPopup('study')} style={{marginTop: '14px', width: '100%', justifyContent: 'center', cursor: 'pointer'}}>Request Study Guide</button>
            </div>
            <div className="audience-card">
              <div className="audience-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></svg></div>
              <div className="audience-num">Career</div>
              <h3>Work in Germany</h3>
              <p>Prepare for workplace communication, interview confidence, and career pathways in Germany.</p>
              <button className="btn btn-primary btn-sm" onClick={() => openRequestPopup('work')} style={{marginTop: '14px', width: '100%', justifyContent: 'center', cursor: 'pointer'}}>Request Career Path Info</button>
            </div>
            <div className="audience-card">
              <div className="audience-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19h16"/><path d="M6 19V9l6-4 6 4v10"/><path d="M9 19v-5h6v5M9 10h.01M12 10h.01M15 10h.01"/></svg></div>
              <div className="audience-num">EU Blue Card</div>
              <h3>Skilled Employment</h3>
              <p>Build the German language foundation needed for sector-specific work, test preparation, and skilled migration pathways.</p>
              <button className="btn btn-primary btn-sm" onClick={() => openRequestPopup('ssw')} style={{marginTop: '14px', width: '100%', justifyContent: 'center', cursor: 'pointer'}}>Request EU Blue Card Program Info</button>
            </div>
            <div className="audience-card">
              <div className="audience-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2l-1.9 3.7-3.7 1.9 1.9-3.7 3.7-1.9zM12 3.5v1.5M20.5 12H19M12 19v1.5M5 12H3.5"/></svg></div>
              <div className="audience-num">Personal</div>
              <h3>Travel &amp; Culture</h3>
              <p>Learn practical German for travel, conversation, German media and cultural understanding.</p>
              <button className="btn btn-primary btn-sm" onClick={() => openRequestPopup('travel')} style={{marginTop: '14px', width: '100%', justifyContent: 'center', cursor: 'pointer'}}>Request Travel Guide</button>
            </div>
          </div>
          <div className="section-cta-big">
            <h3 className="section-cta-heading">Discover which path suits your goals</h3>
            <p className="section-cta-subtext">Study in Germany, work in Germany, or build practical skills for everyday life.</p>
            <a className="btn btn-primary btn-large" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20help%20choosing%20the%20right%20German%20learning%20path." target="_blank" rel="noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
              Find Your Best Mode
            </a>
            <a className="btn-alt" href="tel:+919810117094">Speak to a counsellor</a>
          </div>
        </div>
      </section>}

      {sectionFormCta}

      {/* WHAT YOU'LL LEARN */}
      <section id="skills">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Build real <span className="heading-accent">German</span> skills for everyday life and work.</h2>
            <p>Our German curriculum develops speaking, listening, reading, and writing together so you can communicate confidently in real situations, not just in a classroom.</p>
          </div>
          <div className="skills-grid reveal-group">
            <div className="skill-stamp">
              <div className="skill-native">S</div>
              <span className="skill-en">Sprechen · Speaking</span>
              <p>Guided conversation practice from day one, so you're comfortable speaking long before you've memorised every vocabulary.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">H</div>
              <span className="skill-en">Hören · Listening</span>
              <p>Native-accent audio and dialogues that train your ear for natural spoken German, not textbook German.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">L</div>
              <span className="skill-en">Lesen · Reading</span>
              <p>From the German alphabet to everyday vocabulary, building comprehension script by script, level by level.</p>
            </div>
            <div className="skill-stamp">
              <div className="skill-native">S</div>
              <span className="skill-en">Schreiben · Writing</span>
              <p>Stroke order, sentence structure, and the shift from casual to formal register, corrected and improved as you go.</p>
            </div>
          </div>
          <div className="section-cta-big">
            <h3 className="section-cta-heading">Build all four skills together</h3>
            <p className="section-cta-subtext">Speaking, listening, reading & writing—master German comprehensively with expert guidance.</p>
            <a className="btn btn-wa btn-large" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20book%20a%20free%20German%20demo%20class." target="_blank" rel="noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
              Book Your Free Demo
            </a>
            <a className="btn-alt" href="tel:+919810117094">Or call our counsellor</a>
          </div>
        </div>
      </section>

      {/* JOURNEY / LEVELS */}
      <section className="journey" id="journey">
        <div className="bauhaus-grid-dark" aria-hidden="true"></div>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Six Steps to <span className="heading-accent">German Language</span> Fluency.</h2>
            <p>Every learner boards at A1 and rides the same line through to C1, and one stop beyond, each stage building the grammar, conversation and confidence you need for the next.</p>
          </div>

          <div className="rail-wrap">
            <div className="rail reveal-group">
              <div className="stop">
                <div className="stop-dot" aria-hidden="true">01</div>
                <div className="stop-code">STOP 01 · A1</div>
                <h3>Foundations</h3>
                <p>German pronunciation, basic grammar and greetings: everyday phrases you'll actually use from week one.</p>
                <span className="unlock-tag">Unlocks: travel & basic greetings</span>
              </div>
              <div className="stop">
                <div className="stop-dot" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                <div className="stop-code">STOP 02 · A2</div>
                <h3>Everyday German</h3>
                <p>Basic vocabulary and slower daily conversation, read and understood with growing confidence.</p>
                <span className="unlock-tag">Unlocks: EU Blue Card visa eligibility (telc Deutsch/A2)</span>
              </div>
              <div className="stop">
                <div className="stop-dot" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
                <div className="stop-code">STOP 03 · B1</div>
                <h3>Bridging Level</h3>
                <p>The bridge between basic and advanced: workplace vocabulary and longer, more natural conversation.</p>
                <span className="unlock-tag">Unlocks: sector skills-test readiness</span>
              </div>
              <div className="stop">
                <div className="stop-dot" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-6h4v6"/></svg></div>
                <div className="stop-code">STOP 04 · B2</div>
                <h3>Business-Level</h3>
                <p>German used in a broad range of everyday and workplace scenes: news, meetings, real conversation.</p>
                <span className="unlock-tag">Unlocks: Engineer/Specialist visa readiness</span>
              </div>
              <div className="stop">
                <div className="stop-dot" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg></div>
                <div className="stop-code">STOP 05 · C1</div>
                <h3>Near-Native Mastery</h3>
                <p>Highly complex, formal and abstract German: read, listened to and understood the way educated native speakers do.</p>
                <span className="unlock-tag">Unlocks: graduate study & elite corporate roles</span>
              </div>
              <div className="stop">
                <div className="stop-dot final" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.6h7.6z"/></svg></div>
                <div className="stop-code">STOP 06 · BEYOND C1</div>
                <h3>Business &amp; formal register</h3>
                <p>Honorific speech, boardroom German and the etiquette Goethe-Zertifikat alone doesn't test: full executive fluency.</p>
                <span className="unlock-tag">Unlocks: teaching, translation, executive roles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sectionFormCta}

      {/* STUDY HOURS INFOGRAPHIC */}
      <section className="study-hours" id="study-hours">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>How much runway each level takes.</h2>
            <p>Approximate cumulative self-study hours to reach each Goethe-Zertifikat level from zero. Your actual pace depends on prior exposure, study method and hours committed per week.</p>
          </div>
          <div className="hours-chart">
            <div className="hours-row">
              <div className="hours-level">A1</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '17%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
            <div className="hours-row">
              <div className="hours-level">A2</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '33%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
            <div className="hours-row">
              <div className="hours-level">B1</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '50%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
            <div className="hours-row">
              <div className="hours-level">B2</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '67%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
            <div className="hours-row">
              <div className="hours-level">C1</div>
              <div className="hours-track"><div className="hours-bar" style={{width: '100%'}}></div></div>
              <div className="hours-value">~100 hrs</div>
            </div>
          </div>
          <p className="hours-note">Figures are commonly cited estimates, not a guarantee. Structured classes, native-speaker practice and consistent weekly hours are what actually move learners along this line faster.</p>
        </div>
      </section>

      {sectionFormCta}

      {/* COURSE CURRICULUM */}
      <section id="curriculum"><div className="wrap"><div className="sec-head reveal"><h2>From Learning German to Living Your Germany Dream.</h2><p>The learning journey develops grammar, vocabulary, scripts, comprehension and communication together as you progress from A1 towards advanced German.</p></div><div className="curriculum-grid reveal-group"><div className="curriculum-card"><div className="curriculum-level">Level 01 · A1</div><h3>Foundations</h3><p>Build the base you need to start understanding and using German.</p><ul><li>German alphabet &amp; pronunciation</li><li>Basic grammar &amp; sentence patterns</li><li>Greetings &amp; introductions</li><li>Everyday vocabulary</li><li>Basic vocabulary &amp; listening</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Level 02 · A2</div><h3>Everyday German</h3><p>Move from basic phrases into more independent everyday communication.</p><ul><li>Expanded grammar &amp; vocabulary</li><li>Daily-life conversations</li><li>vocabulary &amp; reading practice</li><li>Listening comprehension</li><li>Goethe-Zertifikat / telc Deutsch preparation</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Level 03 · B1</div><h3>Intermediate Bridge</h3><p>Develop longer conversations and wider real-world German.</p><ul><li>Intermediate grammar</li><li>Workplace vocabulary</li><li>Longer reading passages</li><li>Natural conversation practice</li><li>Exam-focused mock practice</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Level 04 · B2</div><h3>Business-Level German</h3><p>Build stronger comprehension and communication for professional environments.</p><ul><li>Advanced grammar &amp; vocabulary</li><li>News &amp; workplace German</li><li>Meetings &amp; professional scenarios</li><li>Formal communication</li><li>Goethe-Zertifikat B2 preparation</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Level 05 · C1</div><h3>Advanced Mastery</h3><p>Handle complex written and spoken German with greater accuracy.</p><ul><li>Complex grammar structures</li><li>Advanced vocabulary &amp; vocabulary</li><li>Abstract &amp; formal German</li><li>High-level reading &amp; listening</li><li>Goethe-Zertifikat C1 preparation</li></ul></div><div className="curriculum-card"><div className="curriculum-level">Beyond C1</div><h3>Business &amp; formal register</h3><p>Go beyond exam German into professional and high-context communication.</p><ul><li>formal register &amp; honorific speech</li><li>Business etiquette</li><li>Professional conversations</li><li>Presentation &amp; meeting language</li><li>Executive communication practice</li></ul></div></div></div></section>


      {sectionFormCta}

      {/* ABOUT THE LANGUAGE */}
      {false && <section className="lang-facts" id="language">
        <div className="wrap">
          <div className="lang-inner">
            <div>
              <h2 style={{fontSize: 'clamp(30px,3.4vw,44px)', margin: '0 0 20px', lineHeight: '1.16'}}>German: more useful than most people expect.</h2>
              <div className="lang-copy">
                <p>German is spoken by more than 100 million people across Europe, one of the few major world languages where nearly every speaker lives and is one of the most widely used languages in Europe.</p>
                <p>It belongs to the West Germanic language family, closely related to English and Dutch, so learning German usually means different study habits than learning German or Spanish. There aren't many cognates to lean on. Instead, once German sentence structure clicks (verb at the end, particles doing the work English uses word order for), vocabulary starts building itself.</p>
                <p>Germany is Europe's largest economy and a global leader in manufacturing, electronics and technology, which means learning German isn't just a classroom exercise, it's a career move, opening doors in engineering, IT, automotive and skilled-trade roles across the country.</p>
              </div>
              <div className="cognates">
                <div className="cognates-head"><div>German</div><div>Sounds like</div><div>English</div></div>
                <div className="cognate-row"><div>Haus</div><div>hows</div><div>House</div></div>
                <div className="cognate-row"><div>Wasser</div><div>vah-ser</div><div>Water</div></div>
                <div className="cognate-row"><div>Hand</div><div>hant</div><div>Hand</div></div>
                <div className="cognate-row"><div>Apfel</div><div>ap-fel</div><div>Apple</div></div>
              </div>
            </div>
            <div>
              <img className="lang-photo" src="/images/german-lettering-feature.jpg" alt="German lettering practice" loading="lazy" />
              <div className="fact-strip reveal-group">
                <div className="fact-box"><b>100M+</b><span>native speakers worldwide</span></div>
                <div className="fact-box"><b>EU</b><span>one of Europe's most widely spoken languages</span></div>
                <div className="fact-box"><b>Ä Ö Ü ß</b><span>distinctive letters and sounds</span></div>
                <div className="fact-box"><b>Germanic</b><span>closely related to English and Dutch</span></div>
              </div>
              <div className="lang-note">
                <h4>Good to know</h4>
                <p>German word order can feel new at first, especially in longer sentences, but its familiar roots make progress rewarding. <em style={{fontFamily: "'Roboto', sans-serif", fontStyle: 'normal', fontWeight: 700}}>Compound words</em> become easier to understand as your vocabulary expands.</p>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* WHY CHOOSE US */}
      {false && <section id="why">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Language is the passport.<br />We help you use it.</h2>
            <p>A structured curriculum is only half the journey. The rest is culture, confidence, and what happens after you're fluent.</p>
          </div>
        </div>
        <div className="wrap">
          <div className="features-grid reveal-group">
            <div className="feature">
              <div className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3.5 20c.3-3.2 2.1-5 5.5-5s5.2 1.8 5.5 5M16 11a2.5 2.5 0 1 0-1.8-4.3M16 15c2.7.1 4.2 1.7 4.5 5"/></svg></div>
              <div className="fnum">Trainers</div>
              <h3>Learn from expert instructors</h3>
              <p>Experienced, well-trained instructors fluent in German ensure you get the highest quality instruction, not a script.</p>
            </div>
            <div className="feature">
              <div className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-5 9 5-9 5-9-5z"/><path d="M6 12.5V16c1.5 1.5 3.5 2.3 6 2.3s4.5-.8 6-2.3v-3.5"/><path d="M21 10v5"/></svg></div>
              <div className="fnum">Immersion</div>
              <h3>Cultural integration</h3>
              <p>Experience German etiquette, workplace culture and daily life through real-life scenarios that prepare you for actually living in Germany.</p>
            </div>
            <div className="feature">
              <div className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16v13H4z"/><path d="M8 7V4h8v3M8 12h8M8 16h5"/></svg></div>
              <div className="fnum">Careers</div>
              <h3>Placement &amp; visa assistance</h3>
              <p>Exclusive support for the Skilled Employment visa, Engineer/Specialist roles, and in-demand IT and manufacturing jobs in Germany, right after your course.</p>
            </div>
            <div className="feature">
              <div className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5"/><path d="M10 8l1.3 1.3L14.5 6"/></svg></div>
              <div className="fnum">Certification</div>
              <h3>Exam-ready, if you need it</h3>
              <p>For learners who need a certificate, we prepare you for Goethe-Zertifikat, telc Deutsch and WiDaF, targeting the exact score your visa or employer requires.</p>
            </div>
            <div className="feature">
              <div className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h7M8 10h7"/></svg></div>
              <div className="fnum">Curriculum</div>
              <h3>Built for your goal</h3>
              <p>Learning for travel, study, work or personal growth, beginner to advanced, the curriculum adapts to why you're learning.</p>
            </div>
            <div className="feature">
              <div className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/></svg></div>
              <div className="fnum">Schedule</div>
              <h3>Learn on your terms</h3>
              <p>Online, offline, or hybrid classes at a pace that fits your week, from anywhere in the world.</p>
            </div>
          </div>
        </div>
      </section>}

      {/* MODES */}
      <section className="modes" id="modes">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Choose your course: online or offline.</h2>
            <p>Every format runs the same rigorous, expert-taught curriculum pick the one that fits your life.</p>
          </div>
          <img className="modes-photo" src="https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789021785/hybrid_d5cm9s.png" alt="Students in a German language course classroom listening to their instructor" loading="lazy" />
          <div className="modes-grid reveal-group">
            <div className="mode-card">
              <span className="mode-tag">Most Popular</span>
              <h3 style={{marginTop: '14px'}}>Live Online</h3>
              <p>Interactive, instructor-led classes from any internet-enabled phone or computer, anywhere in the world.</p>
            </div>
            <div className="mode-card">
              <span className="mode-tag">In Person</span>
              <h3 style={{marginTop: '14px'}}>Classroom, {locationProfile.centre}</h3>
                            <p>Face-to-face batches at our {locationProfile.area} centre, with peer conversation practice built in.</p>
            </div>
            <div className="mode-card">
              <span className="mode-tag">Flexible</span>
              <h3 style={{marginTop: '14px'}}>Hybrid</h3>
              <p>Mix classroom and online sessions to match a schedule that shifts week to week.</p>
            </div>
          </div>
        </div>
      </section>

      {sectionFormCta}

      {/* VIDEO TESTIMONIALS & SOCIAL PROOF */}
      <section className="testimonials" id="testimonials">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>See what our students say.</h2>
            <p>Real stories from learners who have made their move to Germany. Watch how Langma transformed their German journey.</p>
          </div>
          <div className="testi-slider" onMouseEnter={() => setTestiPaused(true)} onMouseLeave={() => setTestiPaused(false)}>
            <div className="testi-viewport" onTouchStart={handleTestiTouchStart} onTouchMove={handleTestiTouchMove} onTouchEnd={handleTestiTouchEnd}>
              <div className="testi-track" style={{ transform: `translateX(-${testiIndex * testiWidthPct}%)` }}>
                {TESTIMONIALS.map((t, i) => (
                  <div className="testi-slide" key={i} style={{ width: `${testiWidthPct}%` }}>
                    <div className="testi-card">
                      <video className="testi-video-el" src={t.video} poster={getVideoPoster(t.video)} controls playsInline preload="none" aria-label="Langma German course student testimonial" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="testi-controls">
              <div className="testi-dots" role="tablist" aria-label="Student testimonial slides">
                {Array.from({ length: testiDotCount }).map((_, i) => (
                  <button key={i} className={`testi-dot${i === testiIndex ? ' active' : ''}`} onClick={() => goToTesti(i)} aria-label={`Go to testimonial ${i + 1}`} aria-current={i === testiIndex} />
                ))}
              </div>
              <div className="testi-arrows">
                <button className="testi-arrow" onClick={prevTesti} aria-label="Previous testimonials"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
                <button className="testi-arrow" onClick={nextTesti} aria-label="Next testimonials"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sectionFormCta}

      {/* TEACHING METHODOLOGY */}
      <section className="methodology" id="methodology"><div className="wrap"><div className="sec-head reveal"><h2>Not just lessons. A system for learning German.</h2><p>Our approach combines structured instruction with active practice, assessment and real-world application.</p></div><div className="method-grid reveal-group"><div className="method-step"><div className="method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h7M8 10h7"/></svg></div><div className="step-no">01 / LEARN</div><h3>Understand</h3><p>Learn grammar, vocabulary, scripts and pronunciation through structured lessons.</p></div><div className="method-step"><div className="method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h5M8 16h6"/></svg></div><div className="step-no">02 / PRACTISE</div><h3>Use it</h3><p>Apply new language through drills, exercises, dialogues and guided activities.</p></div><div className="method-step"><div className="method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8.5c1.2-2 3.4-3 7-3s5.8 1 7 3"/><path d="M6 10c1.5 1.6 3.5 2.4 6 2.4s4.5-.8 6-2.4"/><path d="M8 15.5c1.1 1 2.4 1.5 4 1.5s2.9-.5 4-1.5"/></svg></div><div className="step-no">03 / SPEAK</div><h3>Communicate</h3><p>Build confidence through conversation, role plays and real-life German scenarios.</p></div><div className="method-step"><div className="method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-5 9 5-9 5-9-5z"/><path d="M6 12.5V16c1.5 1.5 3.5 2.3 6 2.3s4.5-.8 6-2.3v-3.5"/><path d="M21 10v5"/></svg></div><div className="step-no">04 / CULTURE</div><h3>Experience Germany</h3><p>Learn German etiquette, traditions, festivals, food culture and workplace customs through cultural activities.</p></div><div className="method-step"><div className="method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h17"/><path d="M7 15l4-4 3 2 5-6"/><path d="M15 7h4v4"/></svg></div><div className="step-no">05 / ASSESS</div><h3>Measure</h3><p>Use tests and feedback to identify gaps and keep your learning on track.</p></div><div className="method-step"><div className="method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M7 10l5-5 5 5"/><path d="M5 19h14"/></svg></div><div className="step-no">06 / PROGRESS</div><h3>Advance</h3><p>Move towards your next level, exam, study route or career objective.</p></div></div></div></section>

      <div className="section-cta-big">
        <h3 className="section-cta-heading">See this teaching method in action.</h3>
        <p className="section-cta-subtext">Request a free trial class and experience the Langma approach for yourself.</p>
        <button type="button" className="btn btn-primary btn-large" onClick={() => openRequestPopup('demo')}>Request a Free Trial Class</button>
      </div>

      {/* WHAT YOU GET */}
      <section className="included" id="included"><div className="wrap"><div className="sec-head reveal"><h2>Everything included in your German course.</h2><p>Support is designed around both language development and the goal behind your German learning journey.</p></div><div className="included-grid reveal-group"><div className="included-item"><span className="tick">✓</span><span>Live instructor-led German classes</span></div><div className="included-item"><span className="tick">✓</span><span>A1–C2 structured learning pathway</span></div><div className="included-item"><span className="tick">✓</span><span>Speaking, listening, reading &amp; writing practice</span></div><div className="included-item"><span className="tick">✓</span><span>vocabulary and vocabulary development</span></div><div className="included-item"><span className="tick">✓</span><span>German exam preparation</span></div><div className="included-item"><span className="tick">✓</span><span>Mock tests &amp; progress assessment</span></div><div className="included-item"><span className="tick">✓</span><span>Cultural &amp; real-life communication practice</span></div><div className="included-item"><span className="tick">✓</span><span>Online, offline &amp; hybrid learning options</span></div><div className="included-item"><span className="tick">✓</span><span>Goal-based counselling for Germany pathways</span></div></div></div></section>

      {sectionFormCta}

      {/* AUSBILDUNG / HEALTHCARE / CHANCENKARTE PATHWAYS */}
      <section className="pathways" id="pathways">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Ausbildung. Healthcare jobs. Chancenkarte.</h2>
            <p>Langma's counsellors don't stop at fluency. These are the three routes we actively place candidates on, once your German is at the level each one needs.</p>
          </div>
          <div className="path-grid reveal-group">
            <div className="path-card">
              <div className="path-photo-wrap"><img className="path-photo" src="https://res.cloudinary.com/dzv9zcrlz/image/upload/v1788958111/Ausbildung_yahij9.png?fm=jpg&q=80&w=1200&auto=format&fit=crop" alt="Apprentices working together on a metalworking project during hands-on vocational training" loading="lazy" /></div>
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <span className="path-tag">Vocational Training</span>
              <h3>Ausbildung</h3>
              <p style={{fontSize: '15.5px', color: 'rgba(255,255,255,.7)'}}>Paid, dual vocational training: classroom study plus on-the-job pay, usually needing a B1-level German course completed to apply.</p>
              <ul>
                <li>German coaching timed to your Ausbildung application deadline</li>
                <li>Employer and training-company shortlisting by trade</li>
                <li>Application, contract review, and interview preparation</li>
                <li>Visa paperwork and pre-departure briefing</li>
              </ul>
            </div>

            <div className="path-card">
              <div className="path-photo-wrap"><img className="path-photo" src="https://res.cloudinary.com/dzv9zcrlz/image/upload/v1788958108/healthcare_zek1pj.jpg" alt="Healthcare worker in scrubs walking through a hospital corridor, representing nursing and caregiving roles" loading="lazy" /></div>
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <span className="path-tag">Skilled Worker Route</span>
              <h3>Healthcare Jobs</h3>
              <p style={{fontSize: '15.5px', color: 'rgba(255,255,255,.7)'}}>Germany's hospitals and care homes are actively hiring nurses and caregivers from abroad. Most listings ask for conversational B1 or B2 German, with medical vocabulary on top.</p>
              <ul>
                <li>Healthcare-specific German coaching (ward vocabulary, patient conversations)</li>
                <li>Qualification recognition guidance for nursing and caregiving degrees</li>
                <li>Direct placement support with hospitals and care-home employers</li>
                <li>Relocation, contract, and work-visa paperwork</li>
              </ul>
            </div>

            <div className="path-card">
              <div className="path-photo-wrap"><img className="path-photo" src="https://res.cloudinary.com/dzv9zcrlz/image/upload/v1788958108/Chancenkarte_b8bnlt.jpg?fm=jpg&q=80&w=1200&auto=format&fit=crop" alt="Person using a laptop to search and apply for jobs, representing the Chancenkarte job-hunt visa" loading="lazy" /></div>
              <div className="path-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>
              </div>
              <span className="path-tag">Opportunity Card</span>
              <h3>Chancenkarte</h3>
              <p style={{fontSize: '15.5px', color: 'rgba(255,255,255,.7)'}}>A points-based 1-year visa to job-hunt in Germany, working up to 20 hrs/week while you look. Stronger German earns you more points.</p>
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

      {sectionFormCta}

      {/* CAREER OPPORTUNITIES */}
      <section id="careers"><div className="wrap"><div className="sec-head reveal"><h2>Where can German take you?</h2><p>German can support multiple academic, professional and international pathways, depending on your qualifications, experience and target route.</p></div><div className="career-grid reveal-group"><div className="career-card"><h3>Career &amp; Work in Germany</h3><div className="career-tags"><span className="career-tag">Skilled Employment</span><span className="career-tag">IT &amp; Engineering</span><span className="career-tag">Manufacturing</span><span className="career-tag">Hospitality</span><span className="career-tag">Caregiving</span><span className="career-tag">International Business</span></div></div><div className="career-card"><h3>Study &amp; Professional Opportunities</h3><div className="career-tags"><span className="career-tag">Language Schools</span><span className="career-tag">Universities</span><span className="career-tag">TestAS Preparation</span><span className="career-tag">German MNCs</span><span className="career-tag">Translation</span><span className="career-tag">Business German</span></div></div></div></div></section>

      {sectionFormCta}

      {/* GOETHE-ZERTIFIKAT VS TELC DEUTSCH */}
      <section className="exam-compare" id="exam-guide"><div className="wrap"><div className="sec-head reveal"><h2>Goethe-Zertifikat or telc Deutsch: which one is right for you?</h2><p>The right assessment depends on your objective. A counsellor can help you identify the appropriate preparation route.</p></div><div className="compare-wrap"><table className="compare-table"><thead><tr><th>Exam</th><th>Best known for</th><th>Levels / format</th><th>Useful for</th></tr></thead><tbody><tr><td>Goethe-Zertifikat</td><td>General German proficiency</td><td>A1–C2</td><td>Language proficiency, study and employment requirements where accepted</td></tr><tr><td>telc Deutsch</td><td>Practical German communication</td><td>Basic-level assessment</td><td>Skilled Employment-related German requirements where applicable</td></tr><tr><td>WiDaF</td><td>Business German</td><td>Business communication assessment</td><td>Professional and corporate German contexts</td></tr><tr><td>TestAS</td><td>University admissions</td><td>Admission examination</td><td>International students applying to German higher-education programmes where required</td></tr></tbody></table></div></div></section>

      {sectionFormCta}

        {/* UPCOMING BATCHES */}
      <section className="batches" id="batches"><div className="wrap"><div className="sec-head reveal"><h2>Find a batch that fits your schedule.</h2><p>We offer online, classroom and hybrid options. Ask us for the latest batch start dates, timings and course fee details.</p></div><div className="batch-grid reveal-group"><div className="batch-card"><div className="batch-tag">Online</div><h3>Live Online Batch</h3><div className="batch-meta"><div><b>Level</b><span>A1 / A2 / B1 / B2 / C1 / C2</span></div><div><b>Format</b><span>Instructor-led</span></div><div><b>Timings</b><span>Ask for current schedule</span></div></div><a className="btn btn-primary" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20latest%20German%20online%20batch%20details." target="_blank" rel="noopener">Get Online Batch Details →</a></div><div className="batch-card"><div className="batch-tag">{locationProfile.centre}</div><h3>Classroom Batch</h3><div className="batch-meta"><div><b>Location</b><span>{locationProfile.area}</span></div><div><b>Format</b><span>Face-to-face</span></div><div><b>Timings</b><span>Ask for current schedule</span></div></div><a className="btn btn-primary" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20latest%20German%20classroom%20batch%20details." target="_blank" rel="noopener">Get Classroom Details →</a></div><div className="batch-card"><div className="batch-tag">Flexible</div><h3>Hybrid Batch</h3><div className="batch-meta"><div><b>Format</b><span>Online + classroom</span></div><div><b>Level</b><span>Based on availability</span></div><div><b>Timings</b><span>Ask for current schedule</span></div></div><a className="btn btn-primary" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20latest%20German%20hybrid%20batch%20details." target="_blank" rel="noopener">Get Hybrid Details →</a></div></div><p className="batch-note">Course fees, schedules and batch availability may vary. Contact Langma International for the latest.rent course options.</p><div className="trust-badges"><span>✓ Free demo before you enrol</span><span>✓ Flexible batch switching</span><span>✓ Certified native-level trainers</span><span>✓ Visa &amp; placement support included</span></div></div></section>

      {sectionFormCta}

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Common questions about our German language course.</h2>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Do I need any prior knowledge of German to join?</summary>
              <p className="faq-a">No, most of our learners start at A1 with zero German. Classes are structured so complete beginners build confidence, and the German alphabet, from the very first session.</p>
            </details>
            <details className="faq-item">
              <summary>Do I really need to learn all three writing systems?</summary>
              <p className="faq-a">Yes, eventually, but not all at once. You'll be comfortable in the German alphabet within the first few weeks; vocabulary is introduced gradually and cumulatively from A1 through C1, so it never feels like a wall.</p>
            </details>
            <details className="faq-item">
              <summary>How long does it take to become conversational?</summary>
              <p className="faq-a">Most learners feel comfortable with everyday conversation by the end of A2–B1, usually within a few months of consistent classes, depending on how many hours a week you can commit.</p>
            </details>
            <details className="faq-item">
              <summary>Can I also prepare for Goethe-Zertifikat, telc Deutsch or WiDaF?</summary>
              <p className="faq-a">Yes, once you're at the right level, we offer focused certificate preparation for Goethe-Zertifikat, telc Deutsch, TestDaF, DSH and WiDaF alongside the regular course, for anyone who needs a specific score for a visa, job or university application.</p>
            </details>
            <details className="faq-item">
              <summary>What's the difference between online, offline, and hybrid batches?</summary>
              <p className="faq-a">All three follow the same curriculum and expert trainers. Online is fully remote, offline meets in person at our {locationProfile.centre} centre, and hybrid lets you mix the two around your week.</p>
            </details>
            <details className="faq-item">
              <summary>How big are the batches?</summary>
              <p className="faq-a">We keep batches small so everyone gets real speaking practice and individual feedback, rather than sitting through a one-way lecture.</p>
            </details>
            <details className="faq-item"><summary>Can I start German from zero?</summary><p className="faq-a">Yes. The pathway begins at A1, and the programme is structured for learners with no prior German knowledge as well as learners joining at a higher level.</p></details>
            <details className="faq-item"><summary>How do I know which level I should join?</summary><p className="faq-a">A counsellor can help identify the appropriate starting point based on your previous German study, current ability and objective.</p></details>
            <details className="faq-item"><summary>Do you offer a free demo class?</summary><p className="faq-a">You can request a German demo or speak with a counsellor to understand the teaching format, level and current batch options.</p></details>
            <details className="faq-item"><summary>Can you help me choose a German exam?</summary><p className="faq-a">Yes. Counselling can help you identify whether Goethe-Zertifikat, telc Deutsch, WiDaF, TestAS or another assessment is relevant to your intended study or career pathway.</p></details>
            <details className="faq-item"><summary>Do you provide Germany career or visa guidance?</summary><p className="faq-a">Germany pathway support is available for the routes described on this page, including EU Blue Card, Engineer/Specialist and Study in Germany pathways. Exact eligibility and immigration decisions depend on the applicable requirements.</p></details>

          </div>
        </div>
      </section>

      {sectionFormCta}

      {/* STUDENT ACTIVITIES / GERMANY CONNECTIONS */}
      <section className="activities" id="activities">
        <div className="bauhaus-grid-dark" aria-hidden="true"></div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="activity-eyebrow" style={{fontFamily: "'Roboto', sans-serif", fontSize: '11px', letterSpacing: '.14em', color: 'var(--gold-soft)', textTransform: 'uppercase', marginBottom: '10px'}}>Activities &amp; Germany Experience</div>
            <h2>Learn. Experience. Connect.</h2>
            <p>Learning German at Langma goes beyond classroom lessons. Build confidence through interactive activities, cultural experiences and real-life German practice.</p>
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

      {sectionFormCta}

      {/* FINAL CTA */}
      <section className="final-cta" id="start"><div className="bauhaus-grid-dark" aria-hidden="true"></div><div className="wrap"><span className="kicker">Your German journey starts here</span><h2>Don't just learn German. Learn where it can take you.</h2><p>Get the current course fee, batch timings, learning mode and recommended level, without committing to a course first.</p><div className="final-cta-actions"><a className="btn btn-wa" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20the%20German%20course%20fee%20and%20batch%20details." target="_blank" rel="noopener">Get Course Details on WhatsApp →</a><a className="btn btn-ghost" href="tel:+919810117094">Talk to a German Counsellor</a></div><div className="microcopy">No price displayed here. Ask us for the current course options, fees &amp; batch availability.</div></div></section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Board the next batch.</h2>
            <p>Call, WhatsApp, or drop by our {locationProfile.centre} centre. A counsellor will help you pick the right starting level.</p>
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4>Visit Us</h4>
                    <a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">{locationProfile.area}, {locationProfile.city}</a>
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
                  <input type="email" id="femail" name="email" autoComplete="email" placeholder="Your email" required />
                </div>
                <input type="hidden" name="language" value="German" />
                <input type="hidden" name="message" value="German Language Course enquiry" />
                <input type="hidden" name="type" value={GERMAN_FORM_CONFIG.type} />
                <input type="hidden" name="service" value={GERMAN_FORM_CONFIG.service} />
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Submitting..." : "Get Course Details →"}
                </button>
                {formMessage && (
                  <div className={`form-msg ${formSubmitted ? "success" : "error"}`} role="status">
                    {formSubmitted ? `✓ ${formMessage}` : formMessage}
                  </div>
                )}
              </form>
              <div className="form-alt">
                <span style={{fontSize: '14.5px', color: 'rgba(255,255,255,.7)'}}>Prefer to skip the form?</span>
                <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20enroll%20for%20the%20German%20course." target="_blank" rel="noopener" style={{fontSize: '14.5px', fontWeight: '600', color: 'var(--gold-soft)', textDecoration: 'underline'}}>Message us on WhatsApp →</a>
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

      {/* GERMAN FOOTER */}
        <footer className="de-footer">
        <div className="bauhaus-grid-dark" aria-hidden="true"></div>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand"><img src="https://www.langmainternational.com/images/ftrnlg.png" alt="Langma International" className="footer-logo" />
            <br /><div className="de-motto">Learn German. Understand Germany. Build Your Future.</div><p>Learn German with structured A1–C2 learning, practical communication, cultural activities and Germany-focused counselling.</p></div>
            <div className="footer-col"><h4>Learn</h4><a href="#course-details">German Course</a><a href="#skills">What You Learn</a><a href="#methodology">Teaching Method</a><a href="#batches">Batches</a></div>
            <div className="footer-col"><h4>Germany</h4><a href="#activities">Student Activities</a><a href="#pathways">Germany Pathways</a><a href="#careers">Career Opportunities</a><a href="#exam-guide">Goethe-Zertifikat / telc / WiDaF</a></div>
            <div className="footer-col"><h4>Contact</h4><a href="tel:+919810117094">+91-98101-17094</a><a href="https://maps.app.goo.gl/NoVexf8RiHPrtW6D7" target="_blank" rel="noopener">{locationProfile.area}, {locationProfile.city}</a><a href="#contact">Free Counselling</a></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Langma International Pvt. Ltd.</span><span>German LANGUAGE · {locationProfile.city.toUpperCase()}</span></div>
        </div>
      </footer>
      {/* FLOATING CALL */}
      <a href="tel:+919810117094" className="call-float" id="callFloat" aria-label="Call Langma at +91-98101-17094">
        <span className="call-float-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </span>
      </a>

      {/* REQUEST POPUP MODAL */}
      {showRequestPopup && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}} onClick={closeRequestPopup}>
          <div style={{background: '#fbf8f1', borderRadius: '16px', padding: '40px 32px', maxWidth: '420px', width: '90%', boxShadow: '0 28px 60px rgba(0,0,0,0.2)', animation: 'slideUp 0.3s ease'}} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeRequestPopup} style={{position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#201b18'}}>×</button>
            <h2 style={{fontSize: '28px', fontWeight: 700, color: '#263f4d', marginBottom: '8px'}}>Tell us more about you</h2>
            <p style={{fontSize: '14px', color: '#514840', marginBottom: '24px'}}>We'll match you with the perfect German learning path</p>
            <form onSubmit={handleRequestSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div>
                <label htmlFor="req-name" style={{fontSize: '13px', fontWeight: 600, color: '#201b18', display: 'block', marginBottom: '6px'}}>Your Name</label>
                <input type="text" id="req-name" name="name" autoComplete="name" placeholder="Enter your name" value={requestFormData.name} onChange={(e) => setRequestFormData(prev => ({...prev, name: e.target.value}))} required style={{width: '100%', padding: '12px 14px', border: '1px solid #d4cfc8', borderRadius: '8px', fontSize: '14px'}} />
              </div>
              <div>
                <label htmlFor="req-phone" style={{fontSize: '13px', fontWeight: 600, color: '#201b18', display: 'block', marginBottom: '6px'}}>Phone Number</label>
                <input type="tel" id="req-phone" name="phone" autoComplete="tel" ref={requestPhoneRef} placeholder="10-digit number" pattern="[0-9]{10}" value={requestFormData.phone} onChange={(e) => {setRequestFormData(prev => ({...prev, phone: e.target.value})); setRequestPhoneError(false);}} required style={{width: '100%', padding: '12px 14px', border: requestPhoneError ? '2px solid #E4574C' : '1px solid #d4cfc8', borderRadius: '8px', fontSize: '14px'}} />
                {requestPhoneError && <span style={{fontSize: '12px', color: '#E4574C', display: 'block', marginTop: '4px'}}>Enter a valid 10-digit number</span>}
              </div>
              <div>
                <label htmlFor="req-email" style={{fontSize: '13px', fontWeight: 600, color: '#201b18', display: 'block', marginBottom: '6px'}}>Email</label>
                <input type="email" id="req-email" name="email" autoComplete="email" placeholder="Your email" value={requestFormData.email} onChange={(e) => setRequestFormData(prev => ({...prev, email: e.target.value}))} required style={{width: '100%', padding: '12px 14px', border: '1px solid #d4cfc8', borderRadius: '8px', fontSize: '14px'}} />
              </div>
              <button type="submit" disabled={requestSubmitting} style={{padding: '14px', background: '#bc002d', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', marginTop: '8px'}}>
                {requestSubmitting ? 'Submitting...' : requestSubmitted ? 'Request Sent ✓' : 'Send Request'}
              </button>
              {requestFormMessage && <div style={{fontSize: '13px', color: requestSubmitted ? '#0a7d3e' : '#E4574C', textAlign: 'center', padding: '8px', background: requestSubmitted ? '#e6f5f0' : '#fef0f0', borderRadius: '6px', marginTop: '8px'}}>{requestFormMessage}</div>}
              <div style={{fontSize: '12px', color: '#514840', textAlign: 'center', marginTop: '8px'}}>
                Or reach us via <a href="tel:+919810117094" style={{color: '#bc002d', fontWeight: 600, textDecoration: 'none'}}>call</a> / <a href="https://wa.me/919810117094" target="_blank" rel="noopener" style={{color: '#bc002d', fontWeight: 600, textDecoration: 'none'}}>WhatsApp</a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20know%20more%20about%20the%20German%20course." target="_blank" rel="noopener" className="wa-float" id="waFloat" aria-label="Chat on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
      </a>
      <div className={`wa-tip${showWaTip ? ' show' : ''}`} id="waTip">Chat with us, usually replies in minutes</div>

      {/* STICKY MOBILE CTA BAR (floating call/WhatsApp buttons, no white strip) */}
      <div className="mobile-cta-bar" aria-label="Quick contact buttons">
        <div className="mobile-cta-bar-actions">
          <a className="mobile-cta-bar-call" href="tel:+919810117094" aria-label="Call Langma at +91-98101-17094">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          <span className="mobile-cta-label">Demo</span>
        </div>
        <div className="mobile-cta-bar-actions">
          <a className="mobile-cta-bar-wa" href="https://wa.me/919810117094?text=Hi%20Langma%2C%20I%27d%20like%20to%20know%20more%20about%20the%20German%20course." target="_blank" rel="noopener" aria-label="Chat with Langma on WhatsApp">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.86 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.35 1.45.3.15.47.12.65-.07.18-.19.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/></svg>
          </a>
          <span className="mobile-cta-label">Chat</span>
        </div>
      </div>

    </div>
  );
}
