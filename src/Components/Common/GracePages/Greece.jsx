import React, { useState } from "react";
import ConnectedSection from "../../../Pages/HomePages/ConnectedSection";
import GoldenVisaSection from "./GoldenVisaSection";
import EligibilityBenefits from "./EligibilityBenefits";
import GlobalPR from "./GlobalPR";
import CTASection from "../CTASection";
import FAQ from "../../../Pages/HomePages/FAQ";
import PopupForm from "../../PopupForm";

const Greece = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/greecebanner.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-24 ml-20">
              <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#006064] text-white px-8 py-3 rounded-full">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>

   
        <ConnectedSection />
      <GoldenVisaSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {(activeTab === null || activeTab === "investment") && (
        <EligibilityBenefits />
      )}

      {(activeTab === null || activeTab === "investment") && (
        <GlobalPR />
      )}

      {(activeTab === null || activeTab === "investment") && (
        <CTASection
          title="Start Your Journey"
          desc="We help you move abroad with guidance and support."
          buttonText="Book Your Free Consultation Now"
        />
      )}
      {(activeTab === null || activeTab === "investment") && (
        <FAQ />
      )}
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Greece;