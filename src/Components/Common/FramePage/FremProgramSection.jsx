import React from "react";

const FremProgramSection = () => {
  return (
    <section className="w-full bg-[#f4fbfb] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* ================= LEFT IMAGES ================= */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">

          {/* DECOR IMAGE - BEHIND BOTH IMAGES */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block">
            <img
              src="/images/arabic-decor.png"
              alt="Decoration"
              className="w-[300px] lg:w-[400px] opacity-60"
            />
          </div>

          {/* BIG IMAGE */}
          <div className="relative z-10 w-[260px] h-[260px] bottom-[70px] left-[220px] rounded-full  ">
            <img
              src="/images/frem1.jpg"
              alt="Arabic Class"
              className="w-full h-full object-cover"
            />
          </div>

          {/* SMALL IMAGE */}
          <div className="absolute bottom-[-40px] left-[40px] lg:left-[120px] z-20 w-[200px] h-[200px] rounded-full ">
            <img
              src="/images/frem2.jpg"
              alt="Arabic Study"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

          <h2 className="text-[#2f6668] text-[26px] lg:text-[34px] font-semibold leading-snug mb-4">
            Discover the Arab World with <br />
            Langma’s Arabic Language Program
          </h2>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-4">
            Arabic is one of the world’s most influential languages, spoken by
            over 400 million people across the Middle East and North Africa.
            As an official language of the United Nations, Arabic opens doors
            to global opportunities in business, diplomacy, travel, and academia.
          </p>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-4">
            Langma’s Arabic courses are designed for all proficiency levels,
            focusing on Modern Standard Arabic (MSA). Our program builds
            strong reading, writing, speaking, and listening skills while also
            introducing learners to the rich culture and traditions of
            Arab-speaking countries.
          </p>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-8">
            With exam-oriented training for ALPT and guidance for study, work,
            and travel opportunities, Langma helps you turn language learning
            into real-world success.
          </p>

          <button className="bg-[#33c39a] hover:bg-[#2db18c] transition text-white px-8 py-3 rounded-full text-[16px] font-medium">
            Connect Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FremProgramSection;
