import React from "react";
import StatsCards from "../../Pages/HomePages/StatsCards";
import GlobalPlacementSection from "./GlobalPlacementSection";
import WhatIsGlobalPlacement from "./WhatIsGlobalPlacement";
import SupportBoxes from "../Common/StudyAbortSection/SupportBoxes";
import Supportbox2 from "./Supportbox2";
import HowWeHelpYouSucceed from "../InternationlHeroSection/HowWeHelpYouSucceed";
import CTASection from "../Common/CTASection";
import BlogSection from "../../Pages/HomePages/BlogSection";
import LangmaSection from "../../Pages/HomePages/LangmaSection";
import FAQ from "../../Pages/HomePages/FAQ";
import ContactForm from "../../Pages/HomePages/ContactForm";
import ConnectedSection from "../../Pages/HomePages/ConnectedSection";
import { useState } from 'react';
import PopupForm from "../PopupForm";

const GlobleHeroSection = () => {
    const [open, setOpen] = useState(false);
  return (
    <>
      <section onClick={() => setOpen(!open)} className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/Gp.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button className="inline-flex items-center gap-2 bg-[#006064] text-white px-3 py-1 md:px-8 md:py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div> */}
          </div>
        </div>
      </section>
      {/* <StatsCards /> */}
      <ConnectedSection />
      <GlobalPlacementSection />
      <WhatIsGlobalPlacement />
      <Supportbox2 />
      <HowWeHelpYouSucceed />

      {/* <CTASection
        title="Begin Your Global Education Story"
        desc=""
        buttonText="Start Your Journey Today."
      /> */}
      {/* <BlogSection />
      <LangmaSection /> */}
      <FAQ />
      {/* <ContactForm /> */}
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default GlobleHeroSection;
