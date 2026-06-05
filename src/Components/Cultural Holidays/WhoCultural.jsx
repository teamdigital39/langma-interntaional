import React from "react";

const WhoCultural = () => {
  return (
    <section className="w-full bg-[#EAF8FF] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="flex-1">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#296166] mb-6">
            Who Are Cultural Holidays For?
          </h2>

          <p className="text-[#0E2A46] mb-6 text-[25px] font-semibold">
            Our Cultural Holidays are perfect for:
          </p>

          <ul className="space-y-3 mb-6 text-[#0E2A46] text-[20px]">
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png" // Your custom check image
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[18px] lg:text-[20px]">Culture & heritage lovers</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[18px] lg:text-[20px]">Families seeking educational vacations</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[18px] lg:text-[20px]">Solo travelers & explorers</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[18px] lg:text-[20px]">Student & youth groups</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[18px] lg:text-[20px]">Professionals seeking enriching travel</span>
            </li>
          </ul>

          <p className="text-gray-700 text-[20px] lg:text-[25px] text-[#0E2A46]">
            Whether it’s your first international trip or your next cultural
            adventure Langma International ensures every journey feels personal,
            meaningful, and memorable.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/images/Group 4359 (3).png" 
            alt="Application Form"
            className="w-full  rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoCultural;
