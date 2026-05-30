import API_BASE from "../../../config.js";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import CTASection from "../CTASection";
import FAQ from "../../../Pages/HomePages/FAQ";
import ConnectedSection from "../../../Pages/HomePages/ConnectedSection";
import ArabicProgramSection from "./ArabicProgramSection";
import ArabicCoursesSlider from "./ArabicCoursesSlider";
// import PopularCoursess from "../../../Pages/HomePages/PopularCourse1";
import PopularCourses from "../../../Pages/HomePages/PopularCourses";
import PopupForm from "../../PopupForm";


const Arabic = () => {
   const [open, setOpen] = useState(false);
const { slug } = useParams();
    const prevRef = useRef(null);
    const [details, setDetails] = useState([]);
  const nextRef = useRef(null);

  const [languageData, setLanguageData] = useState(null);
  const [apiData, setApiData] = useState(null);
   const [languages, setLanguages] = useState([]);

  const [homeLoading, setHomeLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const [expanded, setExpanded] = useState(false);

  // ================= HOME API =================

useEffect(() => {
  fetch(`${API_BASE}/api/languages`)
    .then((res) => res.json())
    .then((data) => {
      const filtered = (data.languages || []).filter(
        (item) => item.url !== slug
      );

      setLanguages(filtered);
    })
    .catch((err) => console.error(err));
}, [slug]);
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/home`);
        const data = await res.json();
        setApiData(data);
      } catch (error) {
        console.log("Home API Error:", error);
      } finally {
        setHomeLoading(false);
      }
    };

    fetchHome();
  }, []);

 useEffect(() => {
  if (!slug) return;

  const fetchLanguage = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/language-page/${slug}`
      );

      const data = await res.json();

      console.log(data);

      if (data.status) {
        setLanguageData(data.page);

        // ADD THIS
        setDetails(data.details || []);
      } else {
        setLanguageData(null);
      }
    } catch (error) {
      console.log("Language API Error:", error);
      setLanguageData(null);
    } finally {
      setPageLoading(false);
    }
  };

  fetchLanguage();
}, [slug]);

  if (homeLoading || pageLoading) {
    return <h2 className="text-center py-10">Loading...</h2>;
  }

  if (!apiData || !apiData.status) {
    return <h2 className="text-center py-10">API Failed</h2>;
  }

  if (!languageData) {
    return <h2 className="text-center py-10">No Data Found</h2>;
  }

  // ================= FILTER COURSES =================
 
  // ================= CONTENT CLEAN =================
  // const content = languageData?.content || "";
  // const textContent = content.replace(/<[^>]+>/g, "");

  // const LIMIT = 300;
  // const isLongContent = textContent.length > LIMIT;
  // const shortContent = textContent.slice(0, LIMIT);

  const contentHtml = languageData?.content || "";
  

 

 

  return (
    <>
      {/* ================= BANNER ================= */}
      <section className="relative w-full min-h-[500px] overflow-hidden flex items-center py-12 px-6 lg:px-20">

        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

          <div className="w-full lg:w-1/2 space-y-6 z-10">
            <h1 className="text-[28px] lg:text-[60px] font-bold text-[#1D1B4B] leading-tight">
              Learn <span> {languageData?.title} </span> <br /> With Langma
            </h1>

            <p className="text-[17px] text-[#4A4A4A] font-medium">
              All Levels • Live Classes • Expert
            </p>

            <button onClick={() => setOpen(!open)} className="cursor-pointer flex items-center gap-2 bg-[#134E4A] text-white px-8 py-3 rounded-full hover:bg-[#0F3F3C] transition-all font-semibold">
              Join the Hub

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="relative flex justify-end items-center">

              <div className="relative  overflow-hidden w-full max-w-[500px] h-[400px] md:h-[500px]">
                <img
                  src={languageData?.banner}
                  alt="Students learning"
                  className="w-full h-full rounded-[10px]  lg:rounded-l-[220px] lg:rounded-br-[244px]  object-cover"
                />
              </div>

              <div className="absolute bottom-10 left-34 rounded-xl   ">
               
                <img src="/images/lpl.png" alt="" />

              </div>

              {/* <div className="absolute right-0 top-0 h-full w-12 md:w-20 bg-[#134E4A] rounded-l-3xl -z-10 translate-x-1/2"></div> */}

            </div>
          </div>

        </div>

        {/* ✅ FIXED STYLE (ONLY CHANGE) */}
        {/* <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #FFB7C5 1px, transparent 1px)",
            backgroundSize: "8.33% 100%",
          }}
        ></div> */}

      </section>

      <ConnectedSection />

      <section className="w-full bg-[#f4fbfb] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start mt-20">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block">
            <img
              src="/images/arabic-decor.png"
              alt="Decoration"
              className="w-[300px] lg:w-[400px] opacity-60"
            />
          </div>

          <div className="relative z-10 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] lg:w-[260px] lg:h-[260px] bottom-[20px] sm:bottom-[40px] md:bottom-[60px] lg:bottom-[70px] left-[20px] sm:left-[60px] md:left-[140px] lg:left-[220px] rounded-full">
            <img
              src={languageData?.image}
              alt="Arabic Class"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="absolute z-20 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] bottom-[-10px] sm:bottom-[-20px] md:bottom-[-30px] lg:bottom-[-40px] left-[10px] sm:left-[40px] md:left-[80px] lg:left-[120px] rounded-full">
            <img
              src={languageData?.banner}
              alt="Arabic Study"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

        </div>

        {/* RIGHT TEXT */}
        <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

          <h2 className="text-[28px] lg:text-[32px] font-bold mb-5">
            {languageData?.title}
          </h2>

          {/* CONTENT (ONLY ONCE) */}
          <div
            className={`
              text-gray-700 leading-relaxed
              [&_table]:w-full
              [&_table]:border-collapse
              [&_table]:border
              [&_table]:border-gray-300

              [&_th]:border
              [&_th]:border-gray-300
              [&_th]:bg-gray-100
              [&_th]:px-4
              [&_th]:py-3
              [&_th]:text-left
              [&_th]:font-semibold

              [&_td]:border
              [&_td]:border-gray-300
              [&_td]:px-4
              [&_td]:py-3

              [&_tr:nth-child(even)]:bg-gray-50

              [&_img]:rounded-xl
              [&_img]:my-4

              ${!expanded ? "line-clamp-8" : ""}
            `}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row mt-4">

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[#006064] font-semibold hover:underline"
            >
              {expanded ? "Read Less" : "Read More.."}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer ml-0 mt-3 md:mt-0 md:ml-6 bg-[#33c39a] hover:bg-[#2db18c] transition text-white px-8 py-3 rounded-full text-[16px] font-medium"
            >
              Connect Us
            </button>

          </div>

        </div>
      </div>
    </section>
      {/* <ArabicCoursesSlider /> */}
      {/* <PopularCourses data={apiData?.languages} /> */}
     <div className="max-w-7xl mx-auto my-8 px-4 relative">

  {/* LEFT ARROW */}
  <button
    ref={prevRef}
    className="
      absolute
      left-0 md:-left-5
      top-1/2
      -translate-y-1/2
      z-20
      bg-white
      shadow-xl
      border border-gray-200
      w-12 h-12
      rounded-full
      flex items-center justify-center
      hover:bg-gray-100
      hover:scale-110
      transition-all duration-300
    "
  >
    <ChevronLeft size={22} />
  </button>

  {/* RIGHT ARROW */}
  <button
    ref={nextRef}
    className="
      absolute
      right-0 md:-right-5
      top-1/2
      -translate-y-1/2
      z-20
      bg-white
      shadow-xl
      border border-gray-200
      w-12 h-12
      rounded-full
      flex items-center justify-center
      hover:bg-gray-100
      hover:scale-110
      transition-all duration-300
    "
  >
    <ChevronRight size={22} />
  </button>

  {/* SWIPER */}
  <Swiper
    slidesPerView={1}
    spaceBetween={28}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    }}
    navigation={{
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    }}
    onBeforeInit={(swiper) => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }}
    modules={[Autoplay, Navigation]}
    className="pt-5 pb-20"
  >
    {languages.map((item, index) => (
      <SwiperSlide key={index} className="py-4">

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-3xl
            overflow-hidden
            border border-gray-100

            shadow-[0_12px_35px_rgba(0,0,0,0.12)]
            hover:shadow-[0_22px_50px_rgba(0,0,0,0.18)]

            transition-all
            duration-500

            hover:-translate-y-3

            h-full
            group
          "
        >

          {/* IMAGE */}
          <div className="overflow-hidden relative">
            <img
              src={item.image || "/placeholder.png"}
              alt={item.title}
              className="
                w-full
                h-56
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/40
                to-transparent
              "
            ></div>
          </div>

          {/* CONTENT */}
          <div className="p-6 flex flex-col items-start">

            {/* TITLE */}
            <h3
              className="
                text-xl
                font-bold
                text-gray-800
                mb-4
                line-clamp-2
              "
            >
              {item.title}
            </h3>

            {/* BUTTON */}
            <Link
              to={`/${item.url}`}
              className="
                inline-flex
                items-center
                justify-center
                gap-2

                bg-[#134E4A]
                hover:bg-[#0f3d3a]

                text-white
                font-medium

                px-6
                py-3

                rounded-full

                shadow-md
                hover:shadow-xl

                transition-all
                duration-300
              "
            >
              Learn More

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>

          </div>
        </div>

      </SwiperSlide>
    ))}
  </Swiper>
</div>

      <CTASection
        title={`Start your ${languageData.title} journey with Langma today!`}
        desc=""
        buttonText="Start Your Journey Today"
      />
     <div className="max-w-7xl mx-auto py-10 px-4">
  <Swiper
    slidesPerView={1}
    spaceBetween={20}
    loop={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    navigation={true}
    breakpoints={{
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }}
    modules={[Autoplay, Navigation, Pagination]}
    className="pb-20"   // ✅ FIX: gives space for bottom shadow
  >
    {details.map((item, index) => (
      <SwiperSlide key={index} className="py-4"> {/* ✅ FIX: spacing for shadow */}

        {/* WHOLE CARD LINK */}
        <Link to={`/course-details/${slug}/${item.slug}`}>

          <div
            className="
              bg-white
              rounded-2xl
              shadow-[0_12px_35px_rgba(0,0,0,0.15)]
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)]
              overflow-hidden
              transition-all
              duration-300
              cursor-pointer h-[400px]
            "
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[250px] object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {item.slug}
              </p>

            </div>

          </div>

        </Link>

      </SwiperSlide>
    ))}
  </Swiper>
</div>
      <FAQ />
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Arabic;