import React, { useState } from "react";
// import StatsCards from "../../../Pages/HomePages/StatsCards";
// import WorkAbroadSection from "./WorkAbroadSection";
// import WhyLangmaSection from "./WhyLangmaSection";
// import WhatWeHelpYouWith from "./WhatWeHelpYouWith";
// import OurPromise from "./OurPromise";
// import JobsWeAssistWith from "./JobsWeAssistWith";

import CTASection from "../CTASection";
import BlogSection from "../../../Pages/HomePages/BlogSection";
import LangmaSection from "../../../Pages/HomePages/LangmaSection";
import FAQ from "../../../Pages/HomePages/FAQ";
// import ContactForm from "../../../Pages/HomePages/ContactForm";

import ConnectedSection from "../../../Pages/HomePages/ConnectedSection";
import GoldenVisaSection from "./GoldenVisaSection";
import EligibilityBenefits from "./EligibilityBenefits";
import GlobalPR from "../GracePages/GlobalPR";
import PopupForm from "../../PopupForm";

const Canada = () => {

  const [activeTab, setActiveTab] = useState(null);
 const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/Canadabanner.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button onClick={() => setOpen(!open)} className="cursor-pointer inline-flex items-center gap-2 bg-[#006064] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>


        <ConnectedSection />
  

      {/* TAB SECTION */}
      <GoldenVisaSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* INVESTMENT SECTIONS */}
      {(activeTab === null || activeTab === "investment") && (
        <EligibilityBenefits />
      )}

      {(activeTab === null || activeTab === "investment") && (
        <CTASection
          title="Start Your Journey"
          desc="We help you move abroad with guidance and support."
          buttonText="Book Your Free Consultation Now"
        />
      )}

      {(activeTab === null || activeTab === "investment") && (
        <GlobalPR />
      )}

      {(activeTab === null || activeTab === "investment") && (
        <FAQ />
      )}
   <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Canada;