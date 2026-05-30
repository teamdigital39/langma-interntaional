import React from "react";
import StudySection from "./StudySection";

const MigrateSection = () => {
  return (
    <>
      <section className="w-full bg-white ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-xl">
              <h2 className="text-[#0C5F5C] text-3xl font-semibold mb-4">
                Migrate
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                Move forward with confidence through solutions designed for you.
                Sign up today
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                {["Sweden", "Germany", "Portugal"].map((item) => (
                  <button
                    key={item}
                    className="px-6 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C] hover:bg-[#1FB6AA] hover:text-white transition"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* BOTTOM BUTTONS */}
              <div className="flex flex-wrap gap-4">
                {["Free Assessment", "Why Choose Us?"].map((item) => (
                  <button
                    key={item}
                    className="px-6 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C] hover:bg-[#1FB6AA] hover:text-white transition"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative py-4">
              {/* Aqua Shape */}
              {/* <div className="absolute -bottom-10 -left-12 w-[260px] h-[140px] bg-[#CFF7F4] rounded-[120px] z-0"></div> */}

              {/* Main Image */}
              <div className="relative z-10 w-full  overflow-hidden ">
                <img
                  src="/images/Group 4359.png" // <-- apni image ka path yahan do
                  alt="Migrate"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <StudySection />
    </>
  );
};

export default MigrateSection;
