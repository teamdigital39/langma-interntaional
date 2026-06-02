import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import StatsCards from "./StatsCards";
import GlobalOpportunity from "./GlobalOpportunity";
import StudyAbroad from "./StudyAbroad";
import PopupForm from "./PopupForm";
import StudyDestinations from "./StudyDestinations";
import LangmaSection from "./LangmaSection";
import PopularCourses from "./PopularCourses";
import ContactForm from "./ContactForm";
import { Link } from "react-router-dom";
import WorkAbroadSlider from "./WorkAbroadSlider";

/* ── Countries for the flag slider (used in Language & Work sections) */
const destinations = [
  { name: "Kingdom of Saudi Arabia", flag: "https://flagcdn.com/w320/sa.png", link: "/" },
  { name: "Israel",                  flag: "https://flagcdn.com/w320/il.png", link: "/" },
  { name: "Qatar",                   flag: "/images/qt1.jpg",                 link: "/" },
  { name: "Australia",               flag: "/images/ast.jpg",                 link: "/" },
  { name: "Germany",                 flag: "https://flagcdn.com/w320/de.png", link: "/" },
  { name: "Japan",                   flag: "https://flagcdn.com/w320/jp.png", link: "/" },
  { name: "Mauritius",               flag: "https://flagcdn.com/w320/mu.png", link: "/" },
  { name: "Austria",                 flag: "https://flagcdn.com/w320/at.png", link: "/" },
  { name: "United Arab Emirates",    flag: "/images/ua.jpg",                  link: "/" },
  { name: "Bahrain",                 flag: "https://flagcdn.com/w320/bh.png", link: "/" },
  { name: "United Kingdom",          flag: "/images/amm.jpg",                 link: "/" },
  { name: "Oman",                    flag: "/images/omn.jpg",                 link: "/" },
  { name: "Kuwait",                  flag: "/images/kw.jpg",                  link: "/" },
  { name: "France",                  flag: "https://flagcdn.com/w320/fr.png", link: "/" },
  { name: "Italy",                   flag: "https://flagcdn.com/w320/it.png", link: "/" },
  { name: "Jordan",                  flag: "/images/jd.jpg",                  link: "/" },
  { name: "Portugal",                flag: "https://flagcdn.com/w320/pt.png", link: "/" },
  { name: "Taiwan",                  flag: "https://flagcdn.com/w320/tw.png", link: "/" },
  { name: "Poland",                  flag: "https://flagcdn.com/w320/pl.png", link: "/poland" },
];

/* ── Reusable flag-strip slider ──────────────────────────────────── */
const FlagSlider = ({ title }) => (
  <div className="py-8 bg-gray-50">
    {title && (
      <h2 className="text-center text-[20px] sm:text-[24px] lg:text-[28px] font-semibold text-[#296166] mb-6 px-4">
        {title}
      </h2>
    )}
    <div className="px-2">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={8}
        slidesPerView={2}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640:  { slidesPerView: 3,  spaceBetween: 10 },
          768:  { slidesPerView: 4,  spaceBetween: 10 },
          1024: { slidesPerView: 9,  spaceBetween: 10 },
        }}
      >
        {destinations.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center">
              <div className="w-full flex items-center justify-center">
                <Link to={item.link}>
                  <img
                    src={item.flag}
                    alt={item.name}
                    className="w-24 h-16 sm:w-28 sm:h-20 lg:w-32 lg:h-24 object-contain mx-auto hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
              <p className="text-xs sm:text-sm font-medium mt-2 px-1 leading-tight">
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
        const res  = await fetch("/api/home");
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
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="w-full bg-white py-6 sm:py-10 relative overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-8 lg:grid-cols-2 items-center">

          {/* LEFT */}
          <div className="text-center lg:text-left z-10">
            <span className="inline-block bg-[#E6F8F3] text-[#2FC7A1] px-3 py-1 rounded-sm text-[11px]">
              Learn & Get Certificates
            </span>
            <h1 className="mt-4 font-bold text-[#15224C] leading-tight text-[22px] xs:text-[26px] sm:text-[32px] lg:text-[42px] xl:text-[48px]">
              Langma International {" "}
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
              <span className="text-[#4FA3D1]">Careers, Cultures, and Continents.</span>
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
          </div>

          {/* RIGHT VIDEO */}
          <div className="relative mt-10 sm:mt-14 lg:mt-0">
            <div className="relative border-2 border-[#333931] rounded-[26px] p-2">
              <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[333px] rounded-2xl overflow-hidden bg-black mx-auto">
                <video
                  className="w-full h-full object-cover"
                  autoPlay muted={muted} loop playsInline controls={false}
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
                <span className="font-semibold text-[#704FE6] text-[14px] sm:text-[18px]">200k+</span>
                <span className="text-[#17254E] text-[14px] sm:text-[18px]">Student</span>
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/40?img=1" alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white" />
                  <img src="https://i.pravatar.cc/40?img=2" alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white" />
                  <img src="https://i.pravatar.cc/40?img=3" alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border-2 border-white" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-3 sm:-right-5 bg-white shadow-md px-3 py-1.5 rounded-[30px] text-center">
                <span className="text-[#2FC7A1] font-bold block text-[15px] sm:text-[19px]">5.8k</span>
                <span className="text-[#333931] block text-[11px] sm:text-sm">Success Courses</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <RevealSection>
        <StatsCards />
      </RevealSection>

      {/* ── 2. LANGUAGES SLIDER ─────────────────────────────────────
          Order inside this block:
            a) "Speak a language fearlessly" heading  ← already IN PopularCourses
            b) Language course cards (PopularCourses)
            c) Flag/countries slider BELOW the cards
         {/* ── 3. GLOBAL OPPORTUNITY SLIDER ────────────────────────── */}
      <RevealSection>
        <GlobalOpportunity />
      </RevealSection>
      <RevealSection>
        {/*
          PopularCourses already renders its own
          "Top Popular Course / Speak a language fearlessly" heading
          + the language card swiper — so we just mount it directly.
        */}
        <PopularCourses data={apiData?.languages} />

      {/* ── 4. STUDY ABROAD SLIDER ──────────────────────────────── */}
      <RevealSection>
        <StudyAbroad />
                <FlagSlider title="Explore your study Destination" />

        <StudyDestinations data={apiData?.study_destinations} />
      </RevealSection>

        {/* Countries flag slider — comes AFTER the language cards */}
      </RevealSection>

     

      {/* ── 5. WORK ABROAD SLIDER ───────────────────────────────── */}
      <RevealSection>
        <WorkAbroadSlider />
      </RevealSection>

      {/* ── 6. WHY YOU SHOULD JOIN LANGMA ───────────────────────── */}
      <RevealSection>
        <LangmaSection />
      </RevealSection>

      {/* ── Contact Form ────────────────────────────────────────── */}
      <RevealSection>
        <ContactForm />
      </RevealSection>

      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HeroSection;
