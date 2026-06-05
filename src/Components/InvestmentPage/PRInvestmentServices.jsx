import React from "react";

const services = [
  {
    title: "Country Selection & Strategy",
    desc: "We help you choose the most suitable investment destination based on lifestyle, financial goals, and long-term plans.",
  },
  {
    title: "Family Inclusion Support",
    desc: "We help ensure your entire family can benefit together: spouse, children, and other dependents where eligible.",
  },
  {
    title: "Investment Advisory",
    desc: "Receive expert help in selecting the right avenue: real estate, business, funds, bonds, or other approved pathways.",
  },
  {
    title: "Post-Approval Support",
    desc: "After approval, we assist with banking, accommodation, compliance updates, and residency activation.",
  },
  {
    title: "Application & Documentation Support",
    desc: "From initial eligibility assessment to final submission and compliance, we manage every document meticulously.",
  },
];

const PRInvestmentServices = () => {
  return (
    <section className="w-full bg-white py-5 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-[#296166] text-[24px] md:text-[32px] font-bold">
          Our PR by Investment Services
        </h2>

        <p className="mt-3 text-[#296166] text-[18px] max-w-3xl">
          At Langma International, we offer end-to-end guidance tailored to your
          goals:
        </p>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {services.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              {/* IMAGE ICON */}
              <div className="mt-1 flex-shrink-0">
                <img
                  src="/images/check-mark_5290076 1.png"
                  alt="check"
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h4 className="text-[#296166] font-semibold text-[22px]">
                  {item.title}
                </h4>

                <p className="mt-1 text-[#212529]/80 text-[16px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PRInvestmentServices;
