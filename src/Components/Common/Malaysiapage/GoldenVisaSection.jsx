import React from "react";
import { useState } from "react";
import PopupForm from "../../PopupForm";

const GoldenVisaSection = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* TAB BAR */}
      <div className="w-full relative mb-10">
        <ul className="mb-[105px] px-16 flex items-center bg-[#f7f7f7] whitespace-nowrap overflow-x-auto h-[60px] list-none">

          <li
            onClick={() => setActiveTab("about")}
            className={`px-8 py-3 cursor-pointer font-medium
            ${activeTab === "about"
              ? "border-b-4 border-blue-600 bg-white text-gray-700"
              : "text-gray-500"}`}
          >
            About
          </li>

          <li
            onClick={() => setActiveTab("investment")}
            className={`px-8 py-3 cursor-pointer font-medium
            ${activeTab === "investment"
              ? "border-b-4 border-blue-600 bg-white text-gray-700"
              : "text-gray-500"}`}
          >
            PR By Investment
          </li>

        </ul>
      </div>

      {/* ABOUT SECTION */}
      {(activeTab === null || activeTab === "about") && (
        <section className="w-full bg-[#2f6668] py-20 mt-10 px-6">
          <div className="max-w-7xl mx-auto relative">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

              {/* LEFT CONTENT */}
              <div className="text-white md:-mt-20">
                <h3 className="text-[26px] md:text-[32px] font-semibold mb-2">
                  Malaysia – Long-Term Residency
                </h3>

                <h4 className="text-[20px] md:text-[25px] font-semibold mb-3">
                  Program Overview
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
                  Renewable long-term residency is granted based on financial eligibility.
                </p>

                <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#3cc9a7] hover:bg-[#2fb997] transition px-6 py-3 rounded-xl text-white text-sm font-semibold">
                  Connect Us
                </button>
              </div>

              {/* CENTER IMAGE */}
              <div className="relative hidden md:flex justify-center md:-mt-24">
                <div className="relative z-10">
                  <img
                    src="/images/malesiyarectangle.png"
                    alt="malaysiarectangle"
                    className="w-[350px] h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="text-white md:-ml-5 mt-10 md:mt-0">
                <h4 className="text-[20px] md:text-[25px] font-semibold mb-4">
                  About Malaysia
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed">
                  Malaysia is a Southeast Asian nation divided between Peninsular
                  Malaysia and East Malaysia on the island of Borneo. It has a
                  population exceeding 34 million. The country reflects strong
                  Malay, Chinese, and Indian cultural integration. Its tropical
                  climate, modern cities, and expanding economy create an
                  attractive environment for long-term residence.
                </p>
              </div>

            </div>

          </div>
        </section>
      )}
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default GoldenVisaSection;