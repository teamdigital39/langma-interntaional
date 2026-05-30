import React from "react";

const Supportbox2 = () => {
  const data = [
    {
      img: "/images/performance-appraisal_12773555 1.png",
      title: "Career Assessment",
      desc: "We begin by understanding your background, strengths, and career goals to create a clear placement roadmap.",
    },
    {
      img: "/images/collaboration_11921252 1.png",
      title: "Job Matching",
      desc: "Your profile is matched with suitable overseas roles in sectors such as healthcare, hospitality, technical trades, IT, logistics, and service industries.",
    },
    {
      img: "/images/employer.png",
      title: "Employer Coordination",
      desc: "We connect you with genuine employers and help coordinate interviews, documentation, and selection steps.",
    },
    {
      img: "/images/resume.png",
      title: "Resume & Interview Support",
      desc: "From refining your resume to preparing you for employer interviews, we help you present yourself with confidence.",
    },
    {
      img: "/images/visa.png",
      title: "Visa & Documentation Guidance",
      desc: "Our team assists you with work visa documentation and compliance to ensure a smooth and transparent process.",
    },
    {
      img: "/images/Vector (3).png",
      title: "After-Placement Support",
      desc: "Even after you receive your job offer, we stay with you—guiding you through travel preparation and settlement tips.",
    },
  ];

  return (
    <section className="w-full py-5 flex justify-center bg-[#E9F8FF]">
      <div className="max-w-5xl w-full">
        {/* Heading */}
        <h2 className="text-[28px] lg:text-[32px] font-bold text-center text-[#296166] mb-10">
          How We Support You
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8
              flex flex-col gap-4 relative overflow-hidden h-[420px] mx-5"
            >
              {/* Top Right Corner Stroke */}
              <span className="absolute top-0 right-0 w-28 h-10 border-t-4 border-r-4 border-[#296166] rounded-tr-2xl"></span>

              {/* Bottom Left Corner Stroke */}
              <span className="absolute bottom-0 left-0 w-28 h-10 border-b-4 border-l-4 border-[#296166] rounded-bl-2xl"></span>

              {/* ICON */}
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />

              {/* TITLE */}
              <h3 className="text-[25px] font-semibold text-[#296166]">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[18px] text-[#0E2A46] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Supportbox2;
