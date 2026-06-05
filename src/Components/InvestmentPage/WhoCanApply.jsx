import React from "react";

const WhoCanApply = () => {
  return (
    <section className="w-full bg-[#EAF8FF] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="flex-1">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166] mb-6">
            Who Can Apply?
          </h2>

          <p className="text-[#0E2A46] mb-6 text-[25px] font-semibold">
            Our PR by Investment solutions are ideal for:
          </p>

          <ul className="space-y-3 mb-6 text-[#0E2A46] text-[20px]">
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png" // Your custom check image
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>Successful entrepreneurs and business owners</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>High-net-worth individuals</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>Families seeking global stability</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>Investors seeking diversified global exposure</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>
                Professionals aiming to secure international opportunities
              </span>
            </li>
          </ul>

          <p className="text-gray-700 text-[20px] text-[#0E2A46]">
            Each program has specific financial and legal criteria. Langma
            International guides you step-by-step to meet all requirements with
            confidence.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/images/application-form-document-page-concept 1.png" // Replace with your image path
            alt="Application Form"
            className="max-w-xs lg:max-w-sm rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoCanApply;
