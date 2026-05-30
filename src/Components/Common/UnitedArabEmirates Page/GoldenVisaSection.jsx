import React from "react";
import PopupForm from "../../PopupForm";
import { useState } from "react";

const GoldenVisaSection = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* TABS */}
      <div className="w-full relative mb-10">
        <ul className="mb-[105px] px-15 flex items-center bg-[#f7f7f7] whitespace-nowrap overflow-x-auto h-[60px] list-none m-0 p-0">
          <li
            onClick={() => setActiveTab("about")}
            className={`px-8 py-3 cursor-pointer font-medium 
              ${activeTab === "about"
                ? "text-gray-700 border-b-4 border-blue-600 bg-white"
                : "text-gray-500"}`}
          >
            About
          </li>

          <li
            onClick={() => setActiveTab("investment")}
            className={`px-8 py-3 cursor-pointer font-medium 
              ${activeTab === "investment"
                ? "text-gray-700 border-b-4 border-blue-600 bg-white"
                : "text-gray-500"}`}
          >
            PR By Investment
          </li>
        </ul>
      </div>

      {/* ABOUT SECTION */}
      {(activeTab === null || activeTab === "about") && (
        <section className="w-full bg-[#2f6668] py-36 mt-10 px-6">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              
              {/* LEFT CONTENT */}
              <div className="text-white md:-mt-20">
                <h3 className="text-[26px] md:text-[32px] font-semibold mb-2">
                  United Arab Emirates – Golden Visa
                </h3>

                <h4 className="text-[20px] md:text-[25px] font-semibold mb-3">
                  Program Overview
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
                  Long-term residency is granted to property and business investors.
                </p>

                <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#3cc9a7] hover:bg-[#2fb997] transition px-6 py-3 rounded-xl text-white text-sm font-semibold">
                  Connect Us
                </button>
              </div>

              {/* CENTER IMAGE */}
              <div className="relative hidden md:flex justify-center -mt-70">
                <img
                  src="/images/unitedtarabrectangle.png"
                  alt="UAE Golden Visa"
                  className="w-[350px] h-[400px]"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="text-white md:-ml-5 mt-10 md:mt-0">
                <h4 className="text-[20px] md:text-[25px] font-semibold mb-4">
                  About United Arab Emirates
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed">
                  The UAE is a federation of seven emirates with a population exceeding 10.5 million. It is recognised
                  for modern infrastructure, trade leadership, and investor-friendly regulations. Dubai and Abu Dhabi
                  serve as major global business centres with tax-efficient residency frameworks.
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