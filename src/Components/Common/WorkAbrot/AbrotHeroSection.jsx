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
import WorkAbroadFAQ from "./WorkAbroadFAQ";
// import ContactForm from "../../../Pages/HomePages/ContactForm";
import ConnectedSection from "../../../Pages/HomePages/ConnectedSection";
import PopupForm from "../../PopupForm";
import { useState } from "react";
import { Link } from "react-router-dom";

// const destinations = [
//   { name: "Kingdom of Saudi Arabia", flag: "https://flagcdn.com/w320/sa.png", link: "/" },
//   { name: "Israel", flag: "https://flagcdn.com/w320/il.png", link: "/" },
//   { name: "Qatar", flag: "/images/qt1.jpg", link: "/" },
//   { name: "Australia", flag: "/images/ast.jpg", link: "/" },
//   { name: "Germany", flag: "https://flagcdn.com/w320/de.png", link: "/" },
//   { name: "Japan", flag: "https://flagcdn.com/w320/jp.png", link: "/" },
//   { name: "Mauritius", flag: "https://flagcdn.com/w320/mu.png", link: "/" },
//   { name: "Austria", flag: "https://flagcdn.com/w320/at.png", link: "/" },
//   { name: "United Arab Emirates", flag: "/images/ua.jpg", link: "/" },
//   { name: "Bahrain", flag: "https://flagcdn.com/w320/bh.png", link: "/" },
//   { name: "United Kingdom", flag: "/images/amm.jpg", link: "/" },
//   { name: "Oman", flag: "/images/omn.jpg", link: "/" },
//   { name: "Kuwait", flag: "/images/kw.jpg", link: "/" },
//   { name: "France", flag: "https://flagcdn.com/w320/fr.png", link: "/" },
//   { name: "Italy", flag: "https://flagcdn.com/w320/it.png", link: "/" },
//   { name: "Jordan", flag: "/images/jd.jpg", link: "/" },
//   { name: "Portugal", flag: "https://flagcdn.com/w320/pt.png", link: "/" },
//   { name: "Taiwan", flag: "https://flagcdn.com/w320/tw.png", link: "/" },
//   { name: "Poland", flag: "https://flagcdn.com/w320/pl.png", link: "/poland" },
//   { name: "Europe", flag: "/images/ep.jpg", link: "/work-abroad1" },
// ];

const destinations = [
  { name: "Israel", flag: "https://flagcdn.com/w320/il.png", link: "/" },
  { name: "Qatar", flag: "https://flagcdn.com/w320/qa.png", link: "/" },
  { name: "Germany", flag: "https://flagcdn.com/w320/de.png", link: "/" },
  { name: "Japan", flag: "https://flagcdn.com/w320/jp.png", link: "/" },
  { name: "Mauritius", flag: "https://flagcdn.com/w320/mu.png", link: "/" },
  { name: "Poland", flag: "https://flagcdn.com/w320/pl.png", link: "/" },
  { name: "Serbia", flag: "https://flagcdn.com/w320/rs.png", link: "/" },
  { name: "Czech Republic", flag: "https://flagcdn.com/w320/cz.png", link: "/" },
  { name: "Bulgaria", flag: "https://flagcdn.com/w320/bg.png", link: "/" },
  { name: "Libya", flag: "https://flagcdn.com/w320/ly.png", link: "/" },
  { name: "Montenegro", flag: "https://flagcdn.com/w320/me.png", link: "/" },
  { name: "Russia", flag: "https://flagcdn.com/w320/ru.png", link: "/" },
  { name: "Bosnia and Herzegovina", flag: "https://flagcdn.com/w320/ba.png", link: "/" },
  { name: "United Arab Emirates (Dubai)", flag: "https://flagcdn.com/w320/ae.png", link: "/" },
];

const AbrotHeroSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="relative min-h-[540px] bg-white lg:min-h-[650px]">
          <div className="absolute inset-y-12 right-0 w-2/5 rounded-l-full bg-gradient-to-l from-[#E6F7F6] to-transparent opacity-80" aria-hidden="true" />
          <div className="relative mx-auto flex min-h-[540px] max-w-7xl flex-col items-center justify-between gap-12 px-4 py-16 sm:px-6 lg:min-h-[650px] lg:flex-row lg:px-10 lg:py-20">
            <div className="w-full max-w-3xl text-[#1B2B28] lg:w-[58%]">
              <p className="mb-5 inline-flex rounded-full border border-[#2FC7A1]/40 bg-[#E9F1EE] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#296166]">
                Work Abroad · Langma International
              </p>
              <h1 className="langma-display-title max-w-3xl text-[#296166]">
                Build your international career with confidence.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#4C5C58] sm:text-lg">
                Get practical language, career, application, and destination guidance for your overseas job journey — with support designed for both online and offline learners.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center rounded-full bg-[#1A2540] px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-[#243160]"
                >
                  Start your journey <span className="ml-2">→</span>
                </button>
                <a
                  href="#work-abroad-overview"
                  className="inline-flex items-center rounded-full border-2 border-[#2FC7A1] px-7 py-3.5 font-semibold text-[#1A2540] transition hover:bg-[#E6F8F3]"
                >
                  Explore the process
                </a>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ["01", "Prepare", "Language and interview readiness"],
                  ["02", "Plan", "Clear route and destination guidance"],
                  ["03", "Move", "Support from application to arrival"],
                ].map(([number, title, text]) => (
                  <div key={number} className="rounded-2xl border border-[#2FC7A1]/20 bg-[#F5F8F6] p-4 shadow-sm">
                    <span className="text-xs font-bold text-[#296166]">{number}</span>
                    <h2 className="mt-2 text-base font-bold text-[#296166]">{title}</h2>
                    <p className="mt-1 text-xs leading-5 text-[#4C5C58]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-2 w-full max-w-[430px] lg:mt-0 lg:w-[36%]">
              <div className="absolute -inset-4 rounded-[2rem] border border-[#2FC7A1]/25" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-[#2FC7A1]/20 bg-[#F5F8F6] p-3 shadow-[0_30px_70px_-30px_rgba(6,40,37,0.35)]">
                <img
                  src="/images/Global Careers.png"
                  alt="Professionals exploring global career opportunities"
                  className="h-[300px] w-full rounded-[1.4rem] object-cover lg:h-[390px]"
                  loading="eager"
                />
                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-[#1A2540]/90 px-4 py-3 text-white shadow-lg">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#A8F2D8]">Global career support</p>
                  <p className="mt-1 text-sm font-semibold">Prepare with a clearer route forward.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <StatsCards /> */}
      
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
      <div className="pt-8 pb-14 md:pb-20 lg:pb-24 bg-white">
        <h2 className="text-center text-[22px] sm:text-[28px] lg:text-[32px] font-semibold text-[#296166] mb-6 px-4">
          Explore Your Work Destinations
        </h2>
        <div className="px-2">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={2}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640:  { slidesPerView: 3, spaceBetween: 14 },
              768:  { slidesPerView: 4, spaceBetween: 14 },
              1024: { slidesPerView: 9, spaceBetween: 16 },
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
      <WorkAbroadFAQ />
      <ConnectedSection />
      {/* <ContactForm /> */}
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AbrotHeroSection;
