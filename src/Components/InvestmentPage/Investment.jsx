import React from "react";
import ContactForm from "../../Pages/HomePages/ContactForm";
import StatsCards from "../../Pages/HomePages/StatsCards";
import PRByInvestment from "./PRByInvestment";
import WhyChoosePR from "./WhyChoosePR";
import WhoCanApply from "./WhoCanApply";
import PRInvestmentServices from "./PRInvestmentServices";
import BlogSection from "../../Pages/HomePages/BlogSection";
import LangmaSection from "../../Pages/HomePages/LangmaSection";
import FAQ from "../../Pages/HomePages/FAQ";
import CTASection from "../Common/CTASection";
import ConnectedSection from "../../Pages/HomePages/ConnectedSection";
import InvestmentOption from "./InvestmentOption";
import { useState } from 'react';
import PopupForm from "../PopupForm";

const Investment = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section onClick={() => setOpen(!open)} className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/Ga.jpeg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              {/* <button className="inline-flex items-center gap-2 bg-[#006064] text-white px-3 py-1 md:px-8 md:py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button> */}
            </div>
          </div>
        </div>
      </section>
      <ConnectedSection />
      <PRByInvestment />
      <WhyChoosePR />
      <PRInvestmentServices />
      <WhoCanApply />
      {/* <CTASection
        title="Begin Your Global Education Story"
        desc=""
        buttonText="Start Your Journey Today."
      /> */}
      {/* <BlogSection />
      <LangmaSection /> */}
      <InvestmentOption/>
      <FAQ />
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Investment;
