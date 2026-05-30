import React from "react";
import WorkpermitSection from "./WorkpermitSection";
// import MigrateSection from "./MigrateSection";

const StudySection = () => {
  return (
    <>
      <section className="w-full bg-[#F4FEFF] py-10">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* LEFT IMAGE */}
            <div className="relative">
              <div className="w-full overflow-hidden">
                <img
                  src="/images/Group 4362.png"
                  alt="Group4362"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="max-w-xl">
              <h3 className="text-[#0C5F5C] text-[32px] font-semibold mb-3">
                Study
              </h3>

              <p className="text-gray-600 text-[25px] leading-relaxed mb-8">
                Explore new career possibilities{" "}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 text-[20px]">
                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Germany
                </button>

                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  France{" "}
                </button>

                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Ireland
                </button>

                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Denmark{" "}
                </button>
                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Estonia
                </button>
                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Finland
                </button>
                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Luxembourg
                </button>
                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Uk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WorkpermitSection />
    </>
  );
};

export default StudySection;
