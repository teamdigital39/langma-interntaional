import React from "react";

const ItalianLanguageProgramSection = () => {
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
          {/* BIG IMAGE */}
<div
  className="
    relative z-10
    w-[160px] h-[160px]
    sm:w-[200px] sm:h-[200px]
    md:w-[240px] md:h-[240px]
    lg:w-[260px] lg:h-[260px]
    bottom-[20px] sm:bottom-[40px] md:bottom-[60px] lg:bottom-[70px]
    left-[20px] sm:left-[60px] md:left-[140px] lg:left-[220px]
    rounded-full
  "
>
  <img
    src="/images/italian1.jpg"
    alt="Italian Class"
    className="w-full h-full object-cover rounded-full"
  />
</div>

{/* SMALL IMAGE */}
<div
  className="
    absolute z-20
    w-[120px] h-[120px]
    sm:w-[150px] sm:h-[150px]
    md:w-[180px] md:h-[180px]
    lg:w-[200px] lg:h-[200px]
    bottom-[-10px] sm:bottom-[-20px] md:bottom-[-30px] lg:bottom-[-40px]
    left-[10px] sm:left-[40px] md:left-[80px] lg:left-[120px]
    rounded-full
  "
>
  <img
    src="/images/italian2.jpg"
    alt="Italian Study"
    className="w-full h-full object-cover rounded-full"
  />
</div>

        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

          <h2 className="text-[#2f6668] text-[26px] lg:text-[34px] font-semibold leading-snug mb-4">
           Discover Italian with Langma’s Online <br />
Italian Language Course
          </h2>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-4">
            Italian is a globally cherished language, known for its rich cultural
heritage, art, music, cuisine, and international influence. Spoken by
millions across Italy and around the world, Italian opens doors to
exciting opportunities in travel, education, design, hospitality, business,
and creative industries.
          </p>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-4">
            Langma’s Online Italian Language Course is designed for learners of
all levels — from absolute beginners to advanced speakers. Our program
focuses on building strong speaking, listening, reading, and writing skills,
helping you communicate confidently in everyday conversations and
real-world situations.
          </p>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-8">
           With structured lessons delivered online, live interaction with
experienced instructors, and guidance tailored to your goals, Langma
helps you turn language learning into real-world success.
          </p>

          <button className="bg-[#33c39a] hover:bg-[#2db18c] transition text-white px-8 py-3 rounded-full text-[16px] font-medium">
            Connect Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default ItalianLanguageProgramSection;
