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
import { Helmet } from "react-helmet-async";

const MANN_KI_BAAT_SLUGS = ["online-japanese-language-course", "online-german-language-course", "online-spanish-language-courses"];

const ONGC_VIDESH_SLUGS = ["online-spanish-language-courses", "online-russian-language-course"];

const COAST_GUARD_SLUGS = [
  "online-japanese-language-course",
  "arabic-language-online-course",
  "online-korean-language-courses",
  "vietnamese-language-courses",
];

const MANN_KI_BAAT_IMAGES = {
  "online-japanese-language-course": {
    primary: {
      src: "/images/german/recognition-prasar-bharati-mann-ki-baat.png",
      alt: "Letter of appreciation from Prasar Bharati All India Radio for Langma Mann Ki Baat translations into Japanese, German, and Spanish",
    },
    secondary: [],
  },
  "online-german-language-course": {
    primary: {
      src: "/images/german/recognition-prasar-bharati-mann-ki-baat.png",
      alt: "Letter of appreciation from Prasar Bharati All India Radio for Langma Mann Ki Baat translations into Japanese, German, and Spanish",
    },
    secondary: [],
  },
  "online-spanish-language-courses": {
    primary: {
      src: "/images/german/recognition-prasar-bharati-mann-ki-baat.png",
      alt: "Letter of appreciation from Prasar Bharati All India Radio for Langma Mann Ki Baat translations into Japanese, German, and Spanish",
    },
    secondary: [],
  },
};

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
    <Helmet>
        <title>{languageData?.seo_title}</title>

        <meta name="description" content={languageData?.seo_description} />

        <meta name="keywords" content={languageData?.seo_keyword} />
      </Helmet>
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
     {/* <div className="max-w-7xl mx-auto my-8 px-4 relative">

  
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

        
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/40
                to-transparent
              "
            ></div>
          </div>

          <div className="p-6 flex flex-col items-start">

            
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
</div> */}

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

      {slug === "online-english-language-course" && (
        <>
          <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/ielts-british-council-partner.png"
                      alt="British Council IELTS Partnership Programme certificate for Langma School of Languages"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Trusted British Council IELTS Registration Partner
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    At Langma International, excellence is backed by recognition. As an
                    authorized IELTS Registration Centre and an accredited member of the
                    British Council IELTS Partnership Programme (2019–2020), we have
                    demonstrated our commitment to delivering trusted guidance, ethical
                    practices, and internationally aligned student support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/English12.jpg"
                      alt="Trinity College London GESE & ISE and QAI GETS exam centre accreditation"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Accredited Centre for Trinity College London GESE & ISE Qualifications
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    Langma International is an accredited GESE (Graded Examinations in Spoken English)
                    and ISE (Integrated Skills in English) Examination Centre of Trinity College London.
                    Through this accreditation, learners gain access to internationally recognized English
                    language qualifications that assess speaking, listening, reading, and writing competencies
                    against globally benchmarked standards. Widely valued across academic, professional, and
                    international mobility pathways, these qualifications reflect Langma International&apos;s
                    commitment to excellence in language education, assessment integrity, and globally
                    recognized certification.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/English13.jpg"
                      alt="Cambridge Assessment English qualifications preparation centre certificate"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Preparing Global Achievers Through Cambridge Excellence
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed mb-4">
                    Recognition by Cambridge Assessment English reflects Langma International&apos;s
                    unwavering commitment to delivering English language education that meets
                    internationally respected standards. Through structured preparation aligned with
                    the Cambridge assessment framework, we help learners build the confidence,
                    proficiency, and communication skills required to thrive in academic, professional,
                    and international environments.
                  </p>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    This distinction reinforces our position as a trusted destination for students
                    seeking globally recognized English language qualifications and world-class
                    learning experiences.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Delivering English Language Training for the British High Commission
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    Langma International was entrusted with conducting an English language training programme
                    for members of the junior staff at the British High Commission, New Delhi. Delivered over
                    a six-month period, the programme supported the development of essential communication
                    skills and received positive recognition for its relevance, effectiveness, and learner-focused
                    delivery.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/english/testimonial-british-high-commission-english.png"
                      alt="Certification from British High Commission New Delhi for Langma Basic English Language Course"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/english/testimonial-embassy-benin-english.png"
                      alt="Testimonial from Embassy of the Republic of Benin, New Delhi, for Langma English language training"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left order-1 lg:order-2">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Advancing English Language Learning at the Embassy of the Republic of Benin
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    The Embassy of the Republic of Benin, New Delhi, acknowledged Langma International for its
                    contribution to English language learning and capacity development. This recognition highlights
                    the effectiveness of our instructional methodology, the dedication of our faculty, and our
                    commitment to delivering meaningful educational outcomes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      English Language Excellence Acknowledged by the Embassy of the Republic of Iraq
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    The Embassy of the Republic of Iraq, New Delhi, expressed its appreciation for Langma
                    International&apos;s contribution to English language development. The testimonial reflects
                    the professionalism of our faculty, the strength of our instructional approach, and our
                    commitment to delivering a rewarding learning experience for diplomatic personnel.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/english/testimonial-embassy-iraq-english.png"
                      alt="Testimonial from Embassy of the Republic of Iraq, New Delhi, for Langma English language training"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/english/testimonial-embassy-congo-english.png"
                      alt="Testimonial from Embassy of the Republic of Congo, New Delhi, for Langma English language training"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left order-1 lg:order-2">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Advancing English Language Proficiency within the Embassy of the Republic of Congo
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    The Embassy of the Republic of Congo, New Delhi, acknowledged Langma International for its
                    contribution to English language learning through structured instruction, personalized guidance,
                    and an engaging classroom experience. The testimonial reflects the value placed on our commitment
                    to academic quality and learner success.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Elevating English Language Proficiency at Kusum Healthcare Pvt. Ltd.
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    Entrusted with delivering an English Language Programme for Kusum Healthcare Pvt. Ltd.,
                    Langma International conducted a professionally structured training programme recognised
                    for its quality of instruction, experienced faculty, and dedicated learner support. The
                    appreciation reflects our expertise in delivering impactful corporate language training
                    tailored to organisational learning and communication goals.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/english/testimonial-kusum-healthcare-english.png"
                      alt="Letter of appreciation from Kusum Healthcare Pvt. Ltd. for Langma English language programme"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {slug === "arabic-language-online-course" && (
        <>
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/Arabic12.jpg"
                    alt="Arabic Language Proficiency Test (ALPT) accreditation — Arab Academy"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    ALPT Accreditation for Arabic Language Excellence
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed mb-4">
                  Langma International utilizes the Arabic Language Proficiency Test (ALPT)
                  as an internationally recognized assessment framework for Arabic language
                  learning and placement. Aligned with ACTFL and AERO standards, ALPT supports
                  accurate proficiency evaluation while reflecting our commitment to globally
                  benchmarked language education and student success.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Arabic Language Training for the Defence Wing, Embassy of India, Abu Dhabi
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Selected to deliver Arabic language training for personnel of the Defence Wing,
                  Embassy of India, Abu Dhabi, Langma International conducted a programme designed to
                  strengthen practical communication skills and cultural understanding. The engagement
                  was formally acknowledged for the dedication of the trainer, the effectiveness of the
                  learning experience, and the value it delivered to participants.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/arabic/testimonial-embassy-india-abu-dhabi-arabic.png"
                    alt="Letter of appreciation from Defence Wing, Embassy of India Abu Dhabi, for Langma Arabic language training"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/arabic/testimonial-czech-embassy-arabic.png"
                    alt="Testimonial from Embassy of the Czech Republic, New Delhi, for Langma Arabic language courses"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Arabic Language Instruction for Czech Diplomatic Personnel
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Chosen by a senior representative of the Embassy of the Czech Republic, New Delhi, Langma
                  International provided specialized Arabic language instruction designed to refresh and strengthen
                  existing language capabilities. The experience was appreciated for the instructor&apos;s
                  professionalism, enthusiasm, and ability to foster meaningful progress through personalized
                  guidance.
                </p>
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {slug === "online-chinese-language-course" && (
        <>
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/chinese13.jpg"
                    alt="Langma International — TOCFL Chinese Test Center accreditation"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Achieve Global Recognition in Chinese with{" "}
                  <span className="text-[#296166]">
                    TOCFL at Langma International
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International is proud to be a recognized TOCFL Test Center in New Delhi.
                  TOCFL is an internationally accepted benchmark for assessing Traditional Chinese
                  language proficiency and is administered by Taiwan&apos;s authorized testing framework.
                  This recognition enables Langma International to support learners seeking globally
                  recognized certification for academic, professional, and immigration-related purposes
                  while upholding the highest standards of language assessment and educational excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Personalized Chinese Language Learning for the International Labour Organization
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  As part of its specialized language education initiatives, Langma International delivered a
                  customized Chinese language programme associated with the International Labour Organization
                  (ILO). The engagement was recognized for its attentive guidance, learner-focused methodology,
                  and the high standard of instruction maintained throughout the programme.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/chinese/testimonial-ilo-chinese-language.png"
                    alt="Testimonial from International Labour Organization for Langma Chinese language classes"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {slug === "online-korean-language-courses" && (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/Korean12.jpg"
                    alt="Certificate of Official KLAT Center — Korea Educational Testing Service"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Recognized by Korea Educational Testing Service for KLAT Administration
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  At Langma International, excellence is strengthened through international recognition.
                  As an Official KLAT Center accredited by the Korea Educational Testing Service (KETS),
                  we are authorized to conduct Korean language proficiency assessments in accordance with
                  established international standards. This recognition supports our mission to provide
                  learners with credible certification pathways for academic, professional, and global
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "online-spanish-language-courses" && (
        <>
          <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/Spanish1.jpg"
                      alt="Diploma Internacional de Español (D.I.E.) — FIDESCU accredited centre certificate"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Accredited Centre for Diploma Internacional de Español (D.I.E.)
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    At Langma International, excellence in language education is reinforced through
                    internationally recognized accreditations. As an accredited examination centre for
                    the Diploma Internacional de Español (D.I.E.), authorized by FIDESCU (Centre Code:
                    30005) since 2018, we provide learners with access to a globally recognized benchmark
                    of Spanish language proficiency. This accreditation reflects our commitment to
                    maintaining international standards in language assessment and certification.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/Spanish2.jpg"
                      alt="Authorized SIELE Center certificate — Langma School of Languages"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Trusted Authorized SIELE Examination Centre
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    Recognition by SIELE (Servicio Internacional de Evaluación de la Lengua Española)
                    underscores Langma International&apos;s dedication to delivering world-class language
                    education and assessment services. This accreditation enables learners to obtain
                    internationally accepted Spanish language certification aligned with global academic
                    and professional standards.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/Spanish3.jpg"
                      alt="UNIR examination centre certificate — Langma School of Languages"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Official UNIR Examination Centre for Spanish Language Academic Excellence
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    Langma International is an officially recognized examination centre for UNIR
                    (Universidad Internacional de La Rioja), supporting Spanish language academic
                    programmes and facilitating the evaluation and defence of Final Degree and
                    Master&apos;s research projects. This prestigious accreditation reflects our
                    commitment to delivering internationally benchmarked academic assessment standards,
                    fostering Spanish language academic advancement, and enabling learners to achieve
                    globally recognized university qualifications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 lg:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                    Langma International:{" "}
                    <span className="text-[#296166]">
                      Spanish Language Learning Solutions for Yamaha Motor Solutions India
                    </span>
                  </h2>
                  <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                    Langma International delivered a specialized Spanish language learning programme for
                    professionals at Yamaha Motor Solutions India. The engagement was recognized for its
                    well-designed curriculum, interactive learning environment, and the dedication of our faculty
                    in helping participants develop confidence and competence in Spanish for professional
                    communication.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                    <img
                      src="/images/spanish/testimonial-yamaha-spanish-training.png"
                      alt="Testimonial from Yamaha Motor Solutions India for Langma Spanish language training programme"
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {slug === "online-russian-language-course" && (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/Russian12.jpg"
                    alt="TORFL accreditation certificate — Herzen State Pedagogical University of Russia"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Trusted TORFL Examination Partner
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International proudly serves as an authorized TORFL (Test of Russian as a
                  Foreign Language) Examination Centre under the academic supervision of Herzen State
                  Pedagogical University of Russia. This accreditation allows candidates to demonstrate
                  certified Russian language proficiency through internationally recognized assessments
                  aligned with global academic and professional standards.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "online-italian-language-course" && (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/Italian12.jpg"
                    alt="CILS authorized certification centre certificate — Università per Stranieri di Siena"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Official CILS Certification Centre for Italian Language Excellence
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International is proud to be an officially authorized CILS (Certificazione di
                  Italiano come Lingua Straniera) Examination Centre, accredited by the prestigious
                  Università per Stranieri di Siena, Italy. This distinguished recognition enables
                  candidates to earn internationally respected Italian language certification, widely
                  accepted for higher education, professional advancement, citizenship applications, and
                  integration into Italian-speaking academic and professional environments.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "dutch-language-course" && (
        <>
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/Dutch12.jpg"
                    alt="CNaVT authorized test centre accreditation — Certificaat Nederlands als Vreemde Taal"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Accredited CNaVT Examination Centre for Dutch Language Certification
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  As an accredited CNaVT (Certificaat Nederlands als Vreemde Taal) Examination Centre,
                  Langma International provides access to internationally recognized Dutch language
                  qualifications that assess proficiency against globally established standards. Widely
                  valued by educational institutions, employers, and professional organizations, CNaVT
                  certification supports academic progression, career development, and international
                  opportunities across Dutch-speaking regions. This accreditation reflects Langma
                  International&apos;s commitment to excellence in language education, assessment integrity,
                  and globally recognized certification.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Delivering French &amp; Dutch Translation Excellence for the Central Bureau of Investigation
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International was recognised by the Central Bureau of Investigation (CBI), Mumbai for
                  successfully delivering large-scale translation services in French and Dutch. The assignment
                  involved translating more than 1,50,000 words for a sensitive investigation, completed within a
                  demanding timeline while maintaining exceptional accuracy and professionalism. This appreciation
                  reflects our capability to handle complex, high-volume multilingual projects with precision,
                  confidentiality, and dependable execution.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/shared/recognition-cbi-french-dutch-translation.png"
                    alt="Certificate of appreciation from CBI Bank Securities Fraud Branch Mumbai for Langma French and Dutch translation services"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {slug === "online-french-language-course" && (
        <>
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Delivering French &amp; Dutch Translation Excellence for the Central Bureau of Investigation
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International was recognised by the Central Bureau of Investigation (CBI), Mumbai for
                  successfully delivering large-scale translation services in French and Dutch. The assignment
                  involved translating more than 1,50,000 words for a sensitive investigation, completed within a
                  demanding timeline while maintaining exceptional accuracy and professionalism. This appreciation
                  reflects our capability to handle complex, high-volume multilingual projects with precision,
                  confidentiality, and dependable execution.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/shared/recognition-cbi-french-dutch-translation.png"
                    alt="Certificate of appreciation from CBI Bank Securities Fraud Branch Mumbai for Langma French and Dutch translation services"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/french/testimonial-hemant-godse-mp-french.png"
                    alt="Letter of appreciation from Hemant Tukaram Godse, Member of Parliament, for Langma French language training"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Executive French Language Training for Parliamentary Leadership
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  As part of its bespoke language training initiatives, Langma International delivered a tailored
                  French language programme for Shri Hemant Tukaram Godse, Member of Parliament (Lok Sabha). The
                  engagement was recognized through a formal Letter of Appreciation, underscoring the value of a
                  results-oriented learning experience and the lasting impact of personalized language instruction.
                </p>
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {slug === "online-japanese-language-course" && (
        <>
        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/japanese/recognition-aryabhatta-japanese-programme.png"
                    alt="Letter of appreciation from Aryabhatta College, University of Delhi, for Langma 80-hour Japanese Language Programme"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Advancing Japanese Language Education at Aryabhatta College, University of Delhi
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Recognised by Aryabhatta College, University of Delhi, Langma International successfully
                  delivered an 80-hour Japanese Language Programme under the college&apos;s Add-On Courses
                  Curriculum. Designed to enhance linguistic proficiency, cultural understanding, and global
                  employability, the programme reflects our expertise in delivering transformative language
                  education through trusted academic partnerships and excellence-driven instruction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Advancing Japanese Language Proficiency for Army War College, Mhow
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International was entrusted with delivering specialized Japanese language training for
                  an officer of the Army War College, Mhow. The programme was recognized through a Certificate
                  of Appreciation, highlighting the dedication of our instructor, the depth of linguistic
                  instruction, and the academic rigor that characterized the learning experience.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/japanese/testimonial-army-war-college-mhow.png"
                    alt="Certificate of appreciation from Army War College, Mhow, for Langma Japanese language training"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/japanese/testimonial-uae-embassy-japanese.png"
                    alt="Testimonial from Embassy of the United Arab Emirates, New Delhi, for Langma Japanese language training"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Japanese Language Training for UAE Diplomatic Personnel
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International delivered a customized Japanese language programme for a diplomat from
                  the Embassy of the United Arab Emirates, New Delhi. The engagement was recognized for its
                  quality of instruction, effective teaching methodology, and the personalized support provided
                  throughout the learning experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {slug === "vietnamese-language-courses" && (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Vietnamese Language Solutions for Boyd Precision Engineering &amp; Manufacturing India Pvt. Ltd.
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Selected to provide Vietnamese interpretation and translation services, Langma International
                  supported Boyd Precision Engineering &amp; Manufacturing India Pvt. Ltd. with professional language
                  solutions tailored to its operational requirements. Recognised for the quality of our services and
                  responsive support, the engagement reflects our expertise in enabling effective multilingual
                  communication for global enterprises.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/vietnamese/testimonial-boyd-precision-vietnamese.png"
                    alt="Testimonial from Boyd Precision Engineering and Manufacturing India for Langma Vietnamese interpretation services"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "hindi-language-classes" && (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Corporate Hindi Language Training for Samsung Electronics
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Entrusted by Samsung Electronics to deliver Hindi language training, Langma International
                  provided a structured learning experience tailored to the needs of international professionals.
                  The engagement earned appreciation for its supportive faculty, effective instruction, and the
                  measurable progress achieved throughout the programme.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/hindi/testimonial-samsung-hindi-training.png"
                    alt="Testimonial from Samsung Electronics for Langma Hindi language training programme"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "online-portuguese-classes" && (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Portuguese Language Solutions for Andrade Gutierrez
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International was entrusted with delivering Portuguese language training for professionals
                  at Andrade Gutierrez. Through a focused and results-driven learning experience, the programme
                  enabled participants to refine their communication skills while building greater confidence in
                  the language. The engagement earned appreciation for the quality of instruction, academic rigour,
                  and the professionalism of our training team.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/portuguese/testimonial-andrade-gutierrez-portuguese.png"
                    alt="Testimonial from Construtora Andrade Gutierrez for Langma Portuguese corporate training programme"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "indonesian-language-course" && (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Endorsed by the Embassy of the Republic of Indonesia
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Acknowledged by the Embassy of the Republic of Indonesia, New Delhi, Langma International
                  was recognized for advancing Indonesian language education through innovative pedagogy and
                  meaningful learner outcomes. The appreciation underscores our commitment to empowering
                  individuals with the linguistic and cultural competencies needed to thrive in an increasingly
                  interconnected world.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/indonesian/testimonial-embassy-indonesia.png"
                    alt="Letter of appreciation from Embassy of the Republic of Indonesia, New Delhi, for Langma Indonesian language education"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "thai-language-courses" && (
        <>
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Indian Navy Appreciation for Thai Language Training Excellence
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  As part of its specialized language training initiatives, Langma International successfully
                  delivered a Thai Language Training Programme for personnel of the Headquarters, Ministry of
                  Defence (Navy). The engagement was acknowledged through a Letter of Appreciation, highlighting
                  the expertise of our trainers, the professionalism of our team, and the exceptional learning
                  experience delivered throughout the programme.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/thai/testimonial-indian-navy-thai-training.png"
                    alt="Letter of appreciation from Indian Navy for Langma Thai language training programme"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/thai/testimonial-indian-army-northern-command-thai.png"
                    alt="Letter of appreciation from Headquarters Northern Command, Indian Army, for Langma Thai language training"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Delivering Thai Language Training for the Indian Army
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Entrusted with conducting a Thai language programme for officers of the Headquarters Northern
                  Command, Indian Army, Langma International delivered a structured and outcome-driven learning
                  experience. The engagement was recognised through a formal letter of appreciation, underscoring
                  the professionalism, dedication, and instructional quality that defined the programme.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Thai Language Solutions for International Tractors Limited (Sonalika)
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  To support its international business engagement initiatives, International Tractors Limited
                  (Sonalika) entrusted Langma International with the delivery of Thai language instruction. The
                  engagement was distinguished by the professionalism of our trainers, the dedication of our
                  academic team, and a learning experience that earned the organization&apos;s appreciation and
                  recommendation.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/thai/testimonial-sonalika-thai-training.png"
                    alt="Testimonial from International Tractors Limited Sonalika for Langma Thai language course"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/thai/recognition-cbse-thai-evaluation.png"
                    alt="Appreciation certificate from CBSE Regional Office Dehradun for Langma Thai language board examination evaluation"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    CBSE Recognition for Thai Language Evaluation
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International was recognised by the Central Board of Secondary Education (CBSE), Regional
                  Office, Dehradun, for its contribution to the evaluation of Thai language board examination answer
                  scripts. The recognition highlights our academic capability, linguistic expertise, and role in
                  supporting quality assurance within India&apos;s national education framework.
                </p>
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {slug === "online-burmese-language-course" && (
        <>
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Professional Burmese Interpretation for NCGG&apos;s International Training Programmes
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International was entrusted with providing Burmese interpretation services for the
                  National Centre for Good Governance (NCGG) during its Mid-Career Training Programmes for
                  Township and District Administrators from Myanmar. Appreciated for the quality of interpretation
                  by programme participants, this engagement reflects our expertise in facilitating seamless
                  multilingual communication for high-level government initiatives.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/burmese/recognition-ncgg-burmese-interpreter.png"
                    alt="Certificate of appreciation from National Centre for Good Governance for Langma Burmese interpretation services"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/burmese/testimonial-indian-army-burmese-training.png"
                    alt="Certificate of appreciation from Indian Army Headquarters for Langma Burmese language training"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Burmese Language Training Recognized by Indian Army Headquarters
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  As part of its commitment to delivering specialized language solutions, Langma International
                  provided Burmese language training to representatives of the Headquarters of the Ministry of
                  Defence (Army). The programme earned a Certificate of Appreciation, recognizing the
                  professionalism of our faculty, their deep command of the Burmese language and script, and
                  their contribution to creating an enriching learning experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {COAST_GUARD_SLUGS.includes(slug) && (
        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Foreign Language Training for Indian Coast Guard Personnel
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Selected to deliver Arabic, Japanese, Korean, and Vietnamese language training, Langma
                  International collaborated with the Directorate of Training, Indian Coast Guard Headquarters
                  to conduct a specialised programme for its personnel. The appreciation recognises the expertise
                  of our faculty, innovative teaching methodology, and the depth of linguistic knowledge
                  demonstrated throughout the programme.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/shared/testimonial-indian-coast-guard-languages.png"
                    alt="Certificate of appreciation from Indian Coast Guard for Langma Arabic, Japanese, Korean, and Vietnamese language training"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {ONGC_VIDESH_SLUGS.includes(slug) && (
        <section className="w-full py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Advancing Corporate Language Learning at ONGC Videsh Limited
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Through its collaboration with ONGC Videsh Limited, Langma International conducted
                  specialised Spanish and Russian language training for its employees. The programme was
                  recognised for its professional delivery, knowledgeable instructors, and innovative
                  teaching methodology, reflecting our commitment to excellence in corporate language
                  education.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/shared/testimonial-ongc-videsh-spanish-russian.png"
                    alt="Certificate of appreciation from ONGC Videsh Limited for Langma Spanish and Russian language training"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "online-german-language-course" && (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Academic Partnership in German Language Education with Shaheed Rajguru College, University of Delhi
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Langma International delivered a Basic German Language Certification Programme for Shaheed Rajguru
                  College of Applied Sciences for Women, University of Delhi, as part of the institution&apos;s academic
                  enrichment curriculum. Designed to complement technical education with globally relevant language skills,
                  the programme enhanced students&apos; career readiness through structured learning, interactive instruction,
                  and practical German language proficiency. The college recognised Langma International for delivering an
                  academically enriching programme that contributed to students&apos; professional growth and international
                  outlook.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src="/images/german/recognition-rajguru-college-german-programme.png"
                    alt="Letter of appreciation from Shaheed Rajguru College of Applied Sciences for Women for Langma Basic German Language Certification Programme"
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {MANN_KI_BAAT_SLUGS.includes(slug) && (() => {
        const recognitionImages = MANN_KI_BAAT_IMAGES[slug];
        return (
        <section className="w-full py-12 lg:py-16 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900 leading-snug mb-5">
                  Langma International:{" "}
                  <span className="text-[#296166]">
                    Officially Recognised for Translating Prime Minister&apos;s Mann Ki Baat
                  </span>
                </h2>
                <p className="text-gray-600 text-[16px] lg:text-[18px] leading-relaxed">
                  Official recognition from Prasar Bharati – External Services Division, All India Radio celebrates
                  Langma International&apos;s successful translation of Prime Minister Shri Narendra Modi&apos;s Mann Ki Baat
                  into Japanese, German, and Spanish. Delivered under strict broadcast timelines with exceptional
                  linguistic precision, this achievement underscores our expertise in handling high-profile government
                  communication where accuracy, consistency, and excellence are paramount.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="group relative w-full max-w-[420px] p-3 cursor-pointer">
                  <img
                    src={recognitionImages.primary.src}
                    alt={recognitionImages.primary.alt}
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              </div>
            </div>

            {recognitionImages.secondary.length > 0 && (
            <div className={`mt-12 gap-8 max-w-4xl mx-auto ${recognitionImages.secondary.length > 1 ? "grid grid-cols-1 sm:grid-cols-2" : "flex justify-center"}`}>
              {recognitionImages.secondary.map((img) => (
                <div key={img.src} className="group relative p-3 cursor-pointer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full rounded-xl border border-gray-200 shadow-md object-contain bg-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 relative"
                  />
                </div>
              ))}
            </div>
            )}
          </div>
        </section>
        );
      })()}
{/*
      <CTASection
        title={` ${languageData.title} journey with Langma today!`}
        desc=""
        buttonText="Start Your Journey Today"
      /> */}
      
      <CTASection
        title={`Begin Your Global Education Journey With Us`}
        desc=""
        buttonText="Start Your Journey Today"
      />
    
      <FAQ />
      <ConnectedSection />
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Arabic;