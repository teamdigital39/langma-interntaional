import React from "react";

const WhoLangmaBusinessHub = () => {
  return (
    <section className="w-full bg-[#EAF8FF] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="flex-1">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166] mb-6">
            Who is the Langma Business Hub For?
          </h2>

          <p className="text-[#0E2A46] mb-6 text-[20px] lg:text-[25px] font-semibold">
            The Hub is designed for:
          </p>

          <ul className="space-y-3 mb-6 text-[#0E2A46] text-[20px]">
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png" // Your custom check image
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Entrepreneurs & Startup Founders</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">SMEs & Growing Enterprises</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Corporate Leaders & CXOs</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Investors & Business Consultants</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span className="text-[16px] lg:text-[18px]">Industry Associations & Institutions</span>
            </li>
          </ul>

          <p className="text-gray-700 text-[20px] text-[#0E2A46]">
            No matter your industry or growth stage the Langma Business Hub is
            built to elevate your business journey.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/images/Group 4359 copy.png" // Replace with your image path
            alt="Application Form"
            className="w-full  rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoLangmaBusinessHub;
