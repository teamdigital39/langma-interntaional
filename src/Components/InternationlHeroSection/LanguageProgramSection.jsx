import React from "react";

const LanguageProgramSection = () => {
  return (
    <section className="w-full bg-[#E9F7F6] py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166]">
            International Language <br /> Programs
          </h2>

          <h3 className="text-[20px] lg:text-[25px] font-semibold text-[#0E2A46] mt-2">
            Learn, Connect, and Explore the World Through Language
          </h3>

          <p className="text-[#0E2A46] text-[18px] mt-3 leading-relaxed">
            Languages open doors to global opportunities whether for study,
            work, or travel. At Langma International, we help you master
            international languages with courses designed to build confidence,
            fluency, and real-world communication skills.
          </p>
        </div>

        {/* RIGHT IMAGE CLUSTER */}
        <div className="relative flex items-center justify-center">
          {/* TOP LEFT IMAGE */}
          <img src="/images/Group 4445.png" className="   " />
        </div>
      </div>
    </section>
  );
};

export default LanguageProgramSection;
