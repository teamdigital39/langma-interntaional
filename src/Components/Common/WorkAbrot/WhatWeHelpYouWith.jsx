import React from "react";

const services = [
  {
    title: "Overseas Job Search",
    // desc: "We connect you with genuine employers and verified overseas job openings that match your skills and experience.",
    img: "/images/Group 4462.png",
  },
  {
    title: "Work Visa Assistance",
    // desc: "Complete support for documentation, filing, and approval for your work visa.",
    img: "/images/work-visa.png",
  },
  {
    title: "Profile Assessment & Resume Support",
    // desc: "We evaluate your profile and build a professional resume that stands out.",
    img: "/images/resume1.png",
  },
  {
    title: "Interview Preparation",
    // desc: "Mock interviews and expert guidance to help you crack overseas interviews.",
    img: "/images/interview.png",
  },
  {
    title: "After-Landing Support",
    // desc: "Assistance with accommodation, local guidance, and settling abroad smoothly.",
    img: "/images/support.png",
  },
];

const WhatWeHelpYouWith = () => {
  return (
    <section className="w-full py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[25px] lg:text-[32px] font-semibold text-[#296166]">
            What We Help You With
          </h2>
          <p className="text-[#0E2A46] mt-2 text-[20px] lg:text-[25px] md:text-base">
            Guiding you through every step of your study abroad journey with
            care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {services.map((item, index) => (
            <div
              key={index}
              className="relative h-[300px] rounded-xl overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Text */}
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="font-semibold text-[18px] md:text-base leading-tight">
                  {item.title}
                </h3>
                <p className="text-[16px] mt-1 leading-relaxed ">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeHelpYouWith;
