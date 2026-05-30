import React from "react";

const WhoProgramsFor = () => {
  return (
    <section className="w-full bg-[#EAF8FF] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="flex-1">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#296166] mb-6">
            Who Are These Programs For?
          </h2>

          <p className="text-[#0E2A46] mb-6 text-[25px] font-semibold">
            Our Cultural Infusion Programs are perfect for:
          </p>

          <ul className="space-y-3 mb-6 text-[#0E2A46] text-[20px]">
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png" // Your custom check image
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>Students & Young Explorers</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>Professionals & Working Adults</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>Creatives & Cultural Enthusiasts</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>Lifelong Learners & Global Citizens</span>
            </li>
            <li className="flex items-start gap-3">
              <img
                src="/images/check-mark_5290076 1.png"
                alt="check"
                className="w-5 h-5 mt-1"
              />
              <span>Families & Groups</span>
            </li>
          </ul>

          <p className="text-gray-700 text-[20px] text-[#0E2A46]">
            Whether you’re seeking personal growth, expanding your worldview, or
            preparing for global careers or education, our experiences are
            curated to match your aspirations.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/images/Group 4359 (2).png" // Replace with your image path
            alt="Application Form"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoProgramsFor;
