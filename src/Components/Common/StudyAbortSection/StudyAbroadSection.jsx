// StudyAbroadSection.jsx
import React from "react";

const StudyAbroadSection = () => {
  return (
    <section className="w-full bg-[#F4FEFF] py-6">
      <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:justify-between gap-8">
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166]">
            Study Abroad with Langma International
          </h2>
          <h3 className="mt-2 text-[20px] lg:text-[25px] font-medium text-[#0E2A46">
            Turn Your Global Education Dreams into Reality
          </h3>
          <p className="mt-4 text-[#0E2A46] text[20px]">
            Studying abroad opens doors to world-class education, cultural
            experiences, and future career success. At Langma International, we
            guide you through every step—from choosing the right country and
            university to preparing your application and supporting your visa
            process.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full   ">
            <img
              src="/images/Group 4412.png" // Replace with your image
              alt="Students"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyAbroadSection;
