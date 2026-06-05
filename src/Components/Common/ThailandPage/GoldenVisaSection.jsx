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
        <section className="w-full bg-[#2f6668] py-20 mt-10 px-6 ">
          <div className="max-w-7xl mx-auto relative">
            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              {/* LEFT CONTENT */}
              <div className="text-white md:-mt-20">
                <h3 className="text-[26px] md:text-[32px] font-semibold mb-2">
                  Thailand – Privileged Residency
                </h3>

                <h4 className="text-[20px] md:text-[25px] font-semibold mb-3">
                  Program Overview
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed mb-6 text-white">
                  Long-term residency is offered through exclusive membership programs for investors.
                </p>

                <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#3cc9a7] hover:bg-[#2fb997] transition px-6 py-3 rounded-xl text-white text-sm font-semibold">
                  Connect Us
                </button>
              </div>

              {/* CENTER IMAGE (HIDE ON MOBILE) */}
              <div className="relative hidden md:flex justify-center -mt-50">
                <div className="relative z-10">
                  <img
                    src="/images/thailandrectangle.png"
                    alt="thailandrectangle"
                    className="w-[350px] h-[400px]"
                  />
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="text-white md:-ml-5 mt-10 md:mt-0">
                <h4 className="text-[20px] md:text-[25px] font-semibold mb-4">
                  About Thailand
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed text-white">
                  Thailand is a major Southeast Asian nation with a population of around 71 million. 
                  It is internationally known for tourism, Buddhist heritage, and hospitality culture. 
                  Bangkok remains a key business centre, while the country’s tropical climate, cuisine, 
                  and infrastructure provide a balanced lifestyle for residents.
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