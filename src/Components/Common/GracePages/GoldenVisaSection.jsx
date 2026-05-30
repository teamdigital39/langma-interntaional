import React from "react";
import PopupForm from "../../PopupForm";
import { useState } from "react";

const GoldenVisaSection = ({ activeTab, setActiveTab }) =>
   {
    const [open, setOpen] = useState(false);
  return (
    
    <>
      <div className="w-full relative mb-10">
        <ul className="mb-[105px] px-15 flex items-center bg-[#f7f7f7] h-[60px]">
          <li
            onClick={() => setActiveTab("about")}
            className={`px-8 py-3 cursor-pointer
            ${activeTab === "about"
              ? "border-b-4 border-blue-600 bg-white"
              : "text-gray-500"}`}
          >
            About
          </li>
          <li
            onClick={() => setActiveTab("investment")}
            className={`px-8 py-3 cursor-pointer
            ${activeTab === "investment"
              ? "border-b-4 border-blue-600 bg-white"
              : "text-gray-500"}`}
          >
            PR by Investment
          </li>
        </ul>
      </div>

      {(activeTab === null || activeTab === "about") && (
        <section className="w-full bg-[#2f6668] py-36 mt-10 px-6">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

              <div className="text-white md:-mt-20">
                <h3 className="text-[26px] md:text-[32px] font-semibold mb-2">
                  Greece – Golden Visa
                </h3>

                <h4 className="text-[20px] md:text-[25px] font-semibold mb-3">
                  Program Overview
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
                  Applicants acquire residential property that meets Golden Visa
                  requirements. A five-year renewable residence permit is issued
                  to the main applicant and eligible family members.
                </p>

                <button onClick={() => setOpen(!open)} className="cursor-pointer bg-[#3cc9a7] hover:bg-[#2fb997] transition px-6 py-3 rounded-xl text-white text-sm font-semibold">
                  Connect Us
                </button>
              </div>

              <div className="relative hidden md:flex justify-center -mt-70">
                <div className="relative z-10">
                  <img
                    src="/images/Group 5326.png"
                    alt="Greece"
                    className="w-[350px] h-[500px]"
                  />
                </div>
              </div>

              <div className="text-white md:-ml-5 mt-10 md:mt-0">
                <h4 className="text-[20px] md:text-[25px] font-semibold mb-4">
                  About Greece
                </h4>

                <p className="text-[16px] md:text-[18px] leading-relaxed">
                  Greece lies in southeastern Europe and features a mountainous
                  mainland with over 3,000 islands spread across the Aegean and
                  Ionian seas.
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