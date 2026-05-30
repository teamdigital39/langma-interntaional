import React from "react";

const PersianProgramSection = () => {
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
    src="/images/Persian1.jpg"
    alt="Persian Class"
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
    src="/images/Persian2.jpg"
    alt="Persian Study"
    className="w-full h-full object-cover rounded-full"
  />
</div>

        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

          <h2 className="text-[#2f6668] text-[26px] lg:text-[34px] font-semibold leading-snug mb-4">
         Discover Persian with Langma’s Online <br />
Persian Language Program
          </h2>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-4">
   Persian (also known as Farsi) is a rich and historic language spoken by
millions across Iran, Afghanistan, Tajikistan, and Persian-influenced
regions of Central and South Asia. It is deeply connected to poetry, art,
culture, and history, and learning Persian opens doors to global
communication, travel, cultural understanding, and professional
opportunities.
          </p>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-4">
          
Langma’s Online Persian Language Course is designed for learners of all
levels — from beginners to advanced speakers. Our program builds strong
reading, writing, speaking, and listening skills with a balanced focus on
real-world communication, vocabulary, and correct pronunciation. You’ll
also explore the cultural richness and traditions of Persian-speaking
communities to make your learning meaningful and context-driven.
          </p>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-8">
          With structured online lessons, live interaction with expert instructors, and
guidance tailored to your goals — whether for study, work, travel, or cultural
enrichment — Langma helps you turn your language learning into real-world
success.
          </p>

          <button className="bg-[#33c39a] hover:bg-[#2db18c] transition text-white px-8 py-3 rounded-full text-[16px] font-medium">
            Connect Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersianProgramSection;
