import React from "react";

const benefits = [
  {
    title: "Permanent Residency Status",
    desc: "Live indefinitely in your chosen country with full residency rights.",
  },
  {
    title: "Visa-Free and Global Mobility",
    desc: "Enjoy easier travel access to multiple countries, including regions like the Schengen Area or other visa-friendly destinations.",
  },
  {
    title: "Family Inclusion",
    desc: "Your spouse, dependent children, and sometimes parents can also benefit from the same residency status.",
  },
  {
    title: "Access to World-Class Education & Healthcare",
    desc: "Gain premium educational opportunities and world-leading healthcare systems for your family.",
  },
  {
    title: "Business & Financial Growth",
    desc: "Use residency to explore business expansion, global investments, and enhanced economic benefits.",
  },
  {
    title: "Business & Investment Opportunities",
    desc: "Leverage residency to expand businesses, invest globally, and strengthen financial growth.",
  },
];

const WhyChoosePR = () => {
  return (
    <section className="w-full py-12 bg-white overflow-hidden">

      <div className="relative w-full flex items-center">

        

<div className="ml-auto w-full lg:w-[70%] bg-[#2F6E73] rounded-tl-[40px] rounded-bl-[40px] lg:rounded-tl-[80px] lg:rounded-bl-[80px] px-4 sm:px-8 lg:px-10 py-10 lg:py-16">

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-white text-[28px] lg:text-[32px] font-bold">
              Why Choose PR by Investment?
            </h2>

            <p className="mt-4 text-white/90 text-[18px] leading-relaxed">
              Investing for permanent residency is more than a relocation
              strategy; it’s a long-term life choice that can transform your
              family’s future.
            </p>
            <h3 className="mt-6 text-white text-[28px] lg:text-[32px] font-bold">
              Key Benefits You Gain:
            </h3>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-0 md:-ml-50">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-6 pl-9 shadow-md
                           transition-all duration-300 hover:-translate-y-2 hover:shadow-xl  border-3 border-[#296166]"
              >
                <h4 className="text-[#2F6E73] font-semibold text-[16px]">
                  {item.title}
                </h4>

                <p className="mt-3 text-[#0E2A46] text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChoosePR;
