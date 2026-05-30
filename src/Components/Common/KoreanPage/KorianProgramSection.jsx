import React from "react";

const KorianProgramSection = () => {
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
              src="/images/korian1.jpg"
              alt="Arabic Class"
              className="w-full h-full object-cover"
            />
          </div>

          {/* SMALL IMAGE */}
          <div className="absolute bottom-[-40px] left-[40px] lg:left-[120px] z-20 w-[200px] h-[200px] rounded-full ">
            <img
              src="/images/korian2.jpg"
              alt="Arabic Study"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

          <h2 className="text-[#2f6668] text-[26px] lg:text-[34px] font-semibold leading-snug mb-4">
          Discover the Korean Language with <br />
Langma’s Online Korean Language Program
          </h2>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-4">
   Korean is the official language of both South Korea and North Korea,
spoken by millions around the world and rapidly gaining global importance
in culture, technology, entertainment, education, and business. Learning
Korean opens doors to exciting opportunities in study, work, travel, cultural
understanding, and international communication
          </p>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-4">
           Langma’s Online Korean Language Courses are designed for learners at
all proficiency levels, from beginners to advanced. Our program focuses
on building strong speaking, listening, reading, and writing skills, starting
with the Korean alphabet (Hangul) and progressing to real-world
communication and practical language use.
          </p>

          <p className="text-[#5f6f73] text-[15px] lg:text-[16px] leading-relaxed mb-8">
           You’ll also gain insight into Korean culture, traditions, and everyday etiquette,
helping you communicate confidently in everyday and professional settings.
With online interactive sessions, experienced instructors, and support for
exam-oriented preparation like TOPIK, Langma helps you turn your language
learning into real-world success.
          </p>

          <button className="bg-[#33c39a] hover:bg-[#2db18c] transition text-white px-8 py-3 rounded-full text-[16px] font-medium">
            Connect Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default KorianProgramSection;
