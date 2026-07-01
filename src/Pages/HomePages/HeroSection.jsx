import { ArrowRight, Calendar } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import StatsCards from "./StatsCards";
import GlobalOpportunity from "./GlobalOpportunity";
import StudyAbroad from "./StudyAbroad";
import PopupForm from "./PopupForm";
import BlogSection from "./BlogSection";
import StudyDestinations from "./StudyDestinations";
import LangmaSection from "./LangmaSection";
import PopularCourses from "./PopularCourses";
import ContactForm from "./ContactForm";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AboutSection from "./AboutSection";
import WorkAbroadSlider from "./WorkAbroadSlider";
import API_BASE from "../../config";

/* ── Countries for the flag slider (used in Language & Work sections) */
const destinations = [
//    { name: "Germany", flag: "https://flagcdn.com/w320/de.png", link: "/" },
// { name: "Japan", flag: "https://flagcdn.com/w320/jp.png", link: "/" },
{ name: "Poland", flag: "https://flagcdn.com/w320/pl.png", link: "/poland" },
{ name: "South Korea", flag: "https://flagcdn.com/w320/kr.png", link: "/south-korea" },
{ name: "Mauritius", flag: "https://flagcdn.com/w320/mu.png", link: "/study-in-mauritius" },
{ name: "Cyprus", flag: "https://flagcdn.com/w320/cy.png", link: "/study-in-cyprus" },
{ name: "United Arab Emirates (Dubai)", flag: "https://flagcdn.com/w320/ae.png", link: "/dubai" },
{ name: "Singapore", flag: "https://flagcdn.com/w320/sg.png", link: "/study-in-singapore" },
{ name: "Malta", flag: "https://flagcdn.com/w320/mt.png", link: "/malta" },
{ name: "Netherlands", flag: "https://flagcdn.com/w320/nl.png", link: "/netherland" },
{ name: "Georgia", flag: "https://flagcdn.com/w320/ge.png", link: "/georgia" },
  // { name: "Kingdom of Saudi Arabia", flag: "https://flagcdn.com/w320/sa.png", link: "/" },
  // { name: "Israel",                  flag: "https://flagcdn.com/w320/il.png", link: "/" },
  // { name: "Qatar",                   flag: "/images/qt1.jpg",                 link: "/" },
  // { name: "Australia",               flag: "/images/ast.jpg",                 link: "/" },
  // { name: "Germany",                 flag: "https://flagcdn.com/w320/de.png", link: "/" },
  // { name: "Japan",                   flag: "https://flagcdn.com/w320/jp.png", link: "/" },
  // { name: "Mauritius",               flag: "https://flagcdn.com/w320/mu.png", link: "/" },
  // { name: "Austria",                 flag: "https://flagcdn.com/w320/at.png", link: "/" },
  // { name: "United Arab Emirates",    flag: "/images/ua.jpg",                  link: "/" },
  // { name: "Bahrain",                 flag: "https://flagcdn.com/w320/bh.png", link: "/" },
  // { name: "United Kingdom",          flag: "/images/unkd.jpg",                 link: "/" },
  // { name: "Oman",                    flag: "/images/ommnn.jpg",                 link: "/" },
  // { name: "Kuwait",                  flag: "/images/kuwt.jpg",                  link: "/" },
  // { name: "France",                  flag: "https://flagcdn.com/w320/fr.png", link: "/" },
  // { name: "Italy",                   flag: "https://flagcdn.com/w320/it.png", link: "/" },
  // { name: "Jordan",                  flag: "/images/jrrd.jpg",                  link: "/" },
  // { name: "Portugal",                flag: "https://flagcdn.com/w320/pt.png", link: "/" },
  // { name: "Taiwan",                  flag: "https://flagcdn.com/w320/tw.png", link: "/" },
  // { name: "Poland",                  flag: "https://flagcdn.com/w320/pl.png", link: "/poland" },
];

/* ── Reusable flag-strip slider ──────────────────────────────────── */
const FlagSlider = ({ title }) => (
  <div className="py-8 bg-white">
    {title && (
      <h2 className="text-center text-[22px] sm:text-[28px] lg:text-[32px] font-semibold text-[#296166] mb-6 px-4">
        {title}
      </h2>
    )}
    <div className="px-2">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        slidesPerView={2}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640:  { slidesPerView: 3,  spaceBetween: 14 },
          768:  { slidesPerView: 4,  spaceBetween: 14 },
          1024: { slidesPerView: 9,  spaceBetween: 16 },
        }}
      >
        {destinations.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center px-1">
              <div className="w-full flex items-center justify-center">
                <Link to={item.link} className="block w-full max-w-[132px] sm:max-w-[148px] mx-auto">
                  <div className="aspect-[3/2] w-full rounded-lg overflow-hidden bg-white shadow-[0_4px_16px_rgba(46,100,102,0.2)] ring-1 ring-[#D8E0EC] hover:shadow-[0_8px_28px_rgba(46,100,102,0.28)] hover:-translate-y-0.5 transition-all duration-300">
                    <img
                      src={item.flag.includes("flagcdn.com") ? item.flag.replace("/w320/", "/w640/") : item.flag}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Link>
              </div>
              <p className="text-xs sm:text-sm font-medium mt-3 px-1 leading-tight text-[#296166]">
                {item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);

/* ── Scroll-reveal hook ──────────────────────────────────────────── */
const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const RevealSection = ({ children, className = "" }) => {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal-section ${className}`}>
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const [muted, setMuted]     = useState(true);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res  = await fetch(`${API_BASE}/api/home`);
        const data = await res.json();
        setApiData(data);
      } catch (error) {
        console.log("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <h2 className="text-center py-20 text-gray-500">Loading…</h2>;
  if (!apiData || !apiData.status) return <h2 className="text-center py-20 text-red-500">Failed to load</h2>;

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
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="w-full bg-white pt-12 pb-0 sm:py-10 relative overflow-x-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-8 lg:grid-cols-2 items-center ">

  {/* LEFT CONTENT */}
    <div className="relative rounded-xl px-4 sm:px-10 py-4 md:py-14 overflow-hidden font-sans min-h-[520px] order-2 lg:order-1">

  {/* Left accent bar */}
  <div className="absolute left-0 top-20 bottom-20 w-[3px] rounded-full bg-gradient-to-b from-transparent via-[#2FC7A1] to-transparent" />

  {/* Eyebrow badge */}
  <div className="inline-flex items-center gap-2 border border-[#2FC7A1]/40 rounded-full px-4 py-1.5 mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-[#2FC7A1]" />
    <span className="text-[11px] font-semibold tracking-widest uppercase text-[#2FC7A1]">
      Learn &amp; Earn Globally
    </span>
  </div>

  {/* Brand label */}
  <div className="flex items-center gap-2 mb-5 ">
    <span className="w-7 h-[1.5px] bg-[#296166]" />
    <span className="text-[11px] tracking-[0.12em] uppercase text-[#296166] font-medium">
      Langma International
    </span>
  </div>

  {/* Headline */}
  <h1
    className="text-gray-900 font-bold leading-[1.08] mb-2 max-w-[560px]"
    style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
  >
   <span className="font-bold"> Where Language </span> <br />
    <span className="italic font-bold text-[#4FA3D1]">Transforms</span><br />
    Careers, Cultures,<br />
    and Continents.
  </h1>

  {/* Body text */}
  <p className="text-[18px] leading-[1.7] text-gray-600 max-w-[480px] mt-5 mb-8">
    Langma International is a globally recognised institution dedicated to
    linguistic excellence, cultural understanding, and international growth.
    Through world-class language education and global mobility solutions, we
    empower individuals, professionals, and organisations to communicate
    confidently and succeed in an interconnected world.
  </p>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full max-w-full">
    <button
      onClick={() => setOpen(true)}
      className="w-full sm:w-auto max-sm:bg-gradient-to-r max-sm:from-[#1A2540] max-sm:to-[#2d3a5c] bg-[#1A2540] text-[#F5F2EC] rounded-full px-5 sm:px-6 py-4 sm:py-3 text-sm font-semibold sm:font-medium inline-flex items-center justify-center gap-2 tracking-wide cursor-pointer whitespace-nowrap max-sm:shadow-lg max-sm:shadow-[#1A2540]/30 hover:bg-[#243160] active:scale-[0.98] sm:active:scale-100 transition-all duration-200"
    >
      Let's Connect
      <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
    </button>
    <button
      onClick={() => setOpen(true)}
      className="w-full sm:w-auto bg-white sm:bg-transparent text-[#1A2540] border-2 sm:border border-[#2FC7A1] sm:border-[#C0B09A] rounded-full px-5 sm:px-6 py-4 sm:py-3 text-sm font-semibold sm:font-medium inline-flex items-center justify-center gap-2 tracking-wide cursor-pointer whitespace-nowrap max-sm:shadow-md max-sm:shadow-[#2FC7A1]/20 hover:bg-[#E6F8F3] sm:hover:bg-[#EDE8DF] active:scale-[0.98] sm:active:scale-100 transition-all duration-200"
    >
      <Calendar className="w-4 h-4 shrink-0 text-[#2FC7A1] sm:text-[#1A2540]" aria-hidden="true" />
      <span className="sm:hidden">Book Online Counselling</span>
      <span className="hidden sm:inline">Book Instant Online Counselling</span>
    </button>
  </div>
</div>
  {/* <div className="text-center lg:text-left z-10 order-2 lg:order-1">
    <span className="inline-block bg-[#E6F8F3] text-[#2FC7A1] px-3 py-1 rounded-sm text-[11px]">
      
      Learn & Earn Globally 
    </span>

    <h1 className="mt-4 font-bold text-[#15224C] leading-tight text-[22px] xs:text-[26px] sm:text-[32px] lg:text-[42px] xl:text-[48px]">
      Langma International{" "}
      <span className="relative inline-block mt-1">
        <span className="bg-yellow-300 px-2 rounded-md leading-relaxed">
          Where Language Transforms
        </span>

        <img
          src="/images/Journyicon.png"
          alt=""
          className="absolute -top-5 sm:-top-8 lg:-top-10 left-[78%] sm:left-[80%] w-7 sm:w-9 lg:w-11 pointer-events-none"
        />
      </span>

      <br />

      <span className="text-[#4FA3D1]">
        Careers, Cultures, and Continents.
      </span>

      <br />
    </h1>

    <div className="flex flex-col sm:flex-row gap-3 mt-6 items-center lg:items-start">
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto bg-[#0A6B64] text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium shadow-md cursor-pointer hover:bg-[#064d48] transition-colors duration-300"
      >
        Let's Connect →
      </button>

      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto bg-[#4FA3D1] text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium shadow-md cursor-pointer hover:bg-[#3a8ab8] transition-colors duration-300"
      >
        Book Instant Online Counselling
      </button>
    </div>
  </div> */}



  {/* RIGHT VIDEO */}
  <div className="relative order-1 lg:order-2">
    <div className="relative border-2 border-[#333931] rounded-[26px] p-2">
      <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[333px] rounded-2xl overflow-hidden bg-black mx-auto">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted={muted}
          loop
          playsInline
          controls={false}
        >
          <source
            src="https://res.cloudinary.com/dzv9zcrlz/video/upload/v1779520185/Website_Final_Video_Updated_01_f4npde.mp4"
            type="video/mp4"
          />
        </video>

        {muted && (
          <button
            onClick={() => setMuted(false)}
            className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-2 rounded-full text-sm"
          >
            Tap for Sound
          </button>
        )}
      </div>

      <div className="absolute -top-8 sm:-top-10 left-2 sm:left-0 bg-white shadow-md px-3 py-2 sm:py-4 rounded-[30px] flex items-center gap-2">
        <span className="font-semibold text-[#704FE6] text-[14px] sm:text-[18px]">
          200k+
        </span>

        <span className="text-[#17254E] text-[14px] sm:text-[18px]">
          Student
        </span>

        <div className="flex -space-x-2">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt=""
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white"
          />
          <img
            src="https://i.pravatar.cc/40?img=2"
            alt=""
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white"
          />
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt=""
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>

      <div className="absolute -bottom-4 -right-3 sm:-right-5 bg-white shadow-md px-3 py-1.5 rounded-[30px] text-center">
        <span className="text-[#2FC7A1] font-bold block text-[15px] sm:text-[19px]">
          5.8k
        </span>

        <span className="text-[#333931] block text-[11px] sm:text-sm">
          Success Courses
        </span>
      </div>
    </div>
  </div>

</div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────── */}
    <StatsCards />

<GlobalOpportunity />

<AboutSection />

<PopularCourses data={apiData?.languages} />

<StudyAbroad />

<FlagSlider title="Explore Your Study Destinations" />

<WorkAbroadSlider />

<LangmaSection />

<StudyDestinations data={apiData?.study_destinations} />

<ContactForm />

<PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HeroSection;
