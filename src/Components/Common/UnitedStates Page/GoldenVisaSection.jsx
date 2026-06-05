import React from "react";
import PopupForm from "../../PopupForm";
import { useState } from "react";

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

      {(activeTab === null || activeTab === "about") && (
        <section className="w-full bg-[#2f6668] py-20 mt-10 px-6">
          <div className="max-w-7xl mx-auto relative">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

              <div className="text-white md:-mt-20">
                <h3 className="text-[26px] md:text-[32px] font-semibold mb-2">
                  United States – EB-5 Investor Program
                </h3>

                <h4 className="text-[20px] md:text-[25px] font-semibold mb-3">
                  Program Overview
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
                  Applicants invest in government-approved projects that
                  create employment opportunities in the U.S.
                </p>

                <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#3cc9a7] hover:bg-[#2fb997] transition px-6 py-3 rounded-xl text-white text-sm font-semibold">
                  Connect Us
                </button>
              </div>

              <div className="relative hidden md:flex justify-center md:-mt-24">
                <div className="relative z-10">
                  <img
                    src="/images/unitedrectangle.png"
                    alt="unitedrectangle"
                    className="w-[350px] h-[400px] object-cover"
                  />
                </div>
              </div>

              <div className="text-white md:-ml-5 mt-10 md:mt-0">
                <h4 className="text-[20px] md:text-[25px] font-semibold mb-4">
                  About United States
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed">
                  The United States is a leading global economy with diverse
                  geography ranging from deserts and mountains to coastlines
                  and fertile plains. It is home to more than 335 million
                  people. The country is internationally recognised for
                  innovation, higher education, global trade, and business
                  leadership, offering investors and residents access to
                  unmatched professional opportunities.
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