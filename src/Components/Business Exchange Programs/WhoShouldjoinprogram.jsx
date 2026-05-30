import React from "react";

const WhoShouldjoinprogram = () => {
  return (
    <section className="w-full bg-[#EAF8FF] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="flex-1">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#296166] mb-6">
            Who Should Join These Programs?
          </h2>

          <p className="text-[#0E2A46] mb-6 text-[20px] lg:text-[25px] font-semibold">
            These programs are ideal for:
          </p>

          <ul className="space-y-3 mb-6 text-[#0E2A46] text-[20px]">
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png" // Your custom check image
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Culture & heritage lovers</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Entrepreneurs & startup founders</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Business students & management professionals</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Corporate leaders & decision-makers</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Investors exploring global markets</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Professionals seeking international exposure</span>
            </li>
          </ul>

          <p className="text-gray-700 text-[20px] lg:text-[25px] text-[#0E2A46]">
            Whether you aim to launch globally, learn best practices, or build
            powerful networks Langma International provides the platform you
            need.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/images/Group 4559.png" // Replace with your image path
            alt="Application Form"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoShouldjoinprogram;
