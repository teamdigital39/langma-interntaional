import React from "react";
import StatsCards from "../../../Pages/HomePages/StatsCards";
import WorkAbroadSection from "./WorkAbroadSection";
import WhyLangmaSection from "./WhyLangmaSection";
import WhatWeHelpYouWith from "./WhatWeHelpYouWith";
import OurPromise from "./OurPromise";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import StudyDestinations from "../../../Pages/HomePages/StudyDestinations";
import JobsWeAssistWith from "./JobsWeAssistWith";
import CTASection from "../CTASection";
import BlogSection from "../../../Pages/HomePages/BlogSection";
import LangmaSection from "../../../Pages/HomePages/LangmaSection";
import FAQ from "../../../Pages/HomePages/FAQ";
// import ContactForm from "../../../Pages/HomePages/ContactForm";
import ConnectedSection from "../../../Pages/HomePages/ConnectedSection";
import PopupForm from "../../PopupForm";
import { useState } from "react";
import { Link } from "react-router-dom";

const destinations = [
  { name: "Kingdom of Saudi Arabia", flag: "https://flagcdn.com/w320/sa.png", link: "/" },
  { name: "Israel", flag: "https://flagcdn.com/w320/il.png", link: "/" },
  { name: "Qatar", flag: "/images/qt1.jpg", link: "/" },
  { name: "Australia", flag: "/images/ast.jpg", link: "/" },
  { name: "Germany", flag: "https://flagcdn.com/w320/de.png", link: "/" },
  { name: "Japan", flag: "https://flagcdn.com/w320/jp.png", link: "/" },
  { name: "Mauritius", flag: "https://flagcdn.com/w320/mu.png", link: "/" },
  { name: "Austria", flag: "https://flagcdn.com/w320/at.png", link: "/" },
  { name: "United Arab Emirates", flag: "/images/ua.jpg", link: "/" },
  { name: "Bahrain", flag: "https://flagcdn.com/w320/bh.png", link: "/" },
  { name: "United Kingdom", flag: "/images/amm.jpg", link: "/" },
  { name: "Oman", flag: "/images/omn.jpg", link: "/" },
  { name: "Kuwait", flag: "/images/kw.jpg", link: "/" },
  { name: "France", flag: "https://flagcdn.com/w320/fr.png", link: "/" },
  { name: "Italy", flag: "https://flagcdn.com/w320/it.png", link: "/" },
  { name: "Jordan", flag: "/images/jd.jpg", link: "/" },
  { name: "Portugal", flag: "https://flagcdn.com/w320/pt.png", link: "/" },
  { name: "Taiwan", flag: "https://flagcdn.com/w320/tw.png", link: "/" },
  { name: "Poland", flag: "https://flagcdn.com/w320/pl.png", link: "/poland" },
  { name: "Europe", flag: "/images/ep.jpg", link: "/work-abroad1" },
];

const AbrotHeroSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC] mx-auto">
       <div className="w-full  grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
  <div
    className="relative w-full"
    style={{
      backgroundImage: "url('/images/wabb.png')", 
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
      <button onClick={() => setOpen(!open)} className="cursor-pointer inline-flex items-center gap-2 bg-[#006064] text-white px-3 py-1 md:px-8 md:py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
        Let’s Connect →
      </button>
    </div>
  </div>
</div>

      </section>
      {/* <StatsCards /> */}
      <ConnectedSection />
      <WorkAbroadSection />
      <WhyLangmaSection />
      <WhatWeHelpYouWith />
      {/* <StudyDestinations data={apiData?.study_destinations}/> */}
      <JobsWeAssistWith />
      <OurPromise />
      <CTASection
        title="Start Your Journey"
        desc="We help you move abroad with guidance and support."
        buttonText="Book Your Free Consultation Now"
      />

      {/* <BlogSection />
       <div className="py-10 bg-gray-100">
      <h2 className="text-center text-2xl font-semibold text-teal-700 mb-8">
        Explore Your Study Destinations
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 px-6">
  {destinations.map((item, index) => (
    <div key={index} className="text-center">
      
      <div className="w-full h-20 flex items-center justify-center bg-gray-100 rounded">
        <img
          src={item.flag}
          alt={item.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <p className="text-sm font-medium mt-2">
        {item.name}
      </p>
    </div>
  ))}
</div>
    </div> */}
      {/* <LangmaSection /> */}
      <div className="py-10 bg-gray-100">
  <h2 className="text-center text-[32px] font-semibold text-[#296166] mb-8">
    Explore Your Work Destinations
  </h2>

  <div className="px-2"> {/* reduced padding */}
    <Swiper
      modules={[Autoplay]}
      spaceBetween={8}   // 🔥 reduced gap
      slidesPerView={2}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop={true}
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 10 },
        768: { slidesPerView: 4, spaceBetween: 10 },
        1024: { slidesPerView: 9, spaceBetween: 10 },
      }}
    >
      {destinations.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="text-center">
            
            {/* Bigger Image Box */}
            <div className="w-full flex items-center justify-center">
              <Link to={item.link} className="cursor-pointer">
              <img
                src={item.flag}
                alt={item.name}
                className="w-32 h-24 object-contain mx-auto" // 🔥 increased size
              />
              </Link>
            </div>

            <p className="text-sm font-medium mt-2">
              {item.name}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>
      <FAQ />
      {/* <ContactForm /> */}
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AbrotHeroSection;
