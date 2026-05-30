import API_BASE from "../../config.js";
import React from "react";
import StatsCards from "../../Pages/HomePages/StatsCards";
import LanguageProgramSection from "./LanguageProgramSection";
import WhyChooseSection from "./WhyChooseSection";
import PopularCourses from "../../Pages/HomePages/PopularCourses";
import HowWeHelpYouSucceed from "./HowWeHelpYouSucceed";
import CTASection from "../Common/CTASection";
import BlogSection from "../../Pages/HomePages/BlogSection";
import LangmaSection from "../../Pages/HomePages/LangmaSection";
import FAQ from "../../Pages/HomePages/FAQ";
import ContactForm from "../../Pages/HomePages/ContactForm";
import ConnectedSection from "../../Pages/HomePages/ConnectedSection";
import PopupForm from "../PopupForm";
import { useState, useEffect } from "react";

const InternationalHeroSection = () => {
  const [open, setOpen] = useState(false);
  const [apiData, setApiData] = useState(null);
   useEffect(() => {
      const fetchHome = async () => {
        try {
          const res = await fetch(`${API_BASE}/api/home`);
          const data = await res.json();
          setApiData(data);
        } catch (error) {
          console.log("Home API Error:", error);
        }
      };
  
      fetchHome();
    }, []);
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/Group 4459.png')",
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
      <LanguageProgramSection />
      <WhyChooseSection />
      <PopularCourses data={apiData?.languages} />
      <HowWeHelpYouSucceed />
      <CTASection
        title="Begin Your Global Education Story"
        desc=""
        buttonText="Start Your Journey Today."
      />
      {/* <BlogSection />
      <LangmaSection /> */}
      <FAQ />
      {/* <ContactForm /> */}
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default InternationalHeroSection;
