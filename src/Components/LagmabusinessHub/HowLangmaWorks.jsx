import React from "react";

const steps = [
  {
    title: "Connect with Us",
    desc: "Share your business goals and expansion vision.",
  },
  {
    title: "Strategize",
    desc: "We craft a customized roadmap for your global journey.",
  },
  {
    title: "Collaborate",
    desc: "Get connected with partners, mentors, and institutions.",
  },
  {
    title: "Execute & Scale",
    desc: "Launch, expand, and grow with full-cycle support.",
  },
];

const HowLangmaWorks = () => {
  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-[28px] lg:text-[32px] font-semibold text-[#296166] mb-6">
          How Langma Business Hub Works
        </h2>

        {/* Points */}
        <div className="space-y-4">
          {steps.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* ✔ Image instead of checkbox */}
              <img
                src="/images/check-mark_5290076 1.png" // 👉 apni image ka path yaha do
                alt="check"
                className="w-[18px] h-[18px] mt-2"
              />

              <p className="text-[#4D5756]">
                <span className="font-semibold text-[20px] text-[#296166]">
                  {item.title}
                </span>{" "}
                – <span className="text-[17px]">{item.desc}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowLangmaWorks;
