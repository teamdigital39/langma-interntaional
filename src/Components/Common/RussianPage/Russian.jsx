import React from "react";
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
// import GoldenVisaSection from "./GoldenVisaSection";
// import EligibilityBenefits from "./EligibilityBenefits";
import GlobalPR from "../GracePages/GlobalPR";
import ArabicProgramSection from "./RussianProgramSection";
import ArabicCoursesSlider from "./RussianCoursesSlider";

const Russian = () => {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/Russianbanner.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* BUTTON POSITION WRAPPER */}
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button className="inline-flex items-center gap-2 bg-[#006064] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <StatsCards /> */}
      <ConnectedSection />
      {/* <GoldenVisaSection />
      <EligibilityBenefits /> */}
      <ArabicProgramSection/>
      <ArabicCoursesSlider/>
      {/* <WorkAbroadSection />
      <WhyLangmaSection />
      <WhatWeHelpYouWith />
      <JobsWeAssistWith />
      <OurPromise /> */}
      <CTASection
        title="Start your Korean journey with Langma today!"
        desc=""
        buttonText="Start Your Journey Today."
      />
      {/* <GlobalPR/> */}
      

      {/* <BlogSection />
      <LangmaSection /> */}
      <FAQ />
      {/* <ContactForm /> */}
    </>
  );
};

export default Russian;
