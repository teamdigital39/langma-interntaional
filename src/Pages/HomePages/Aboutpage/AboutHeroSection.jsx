import React from "react";
import StatsCards from "../StatsCards";
import CounselingSection from "./CounselingSection";
import ConnectedSection from "../ConnectedSection";

const AboutHeroSection = () => {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">

        <div className="w-full  grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/Background (2).png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button className="inline-flex items-center gap-2 bg-[#006064] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>
      <ConnectedSection />

      {/* <StatsCards /> */}
      <CounselingSection />
    </>
  );
};

export default AboutHeroSection;
