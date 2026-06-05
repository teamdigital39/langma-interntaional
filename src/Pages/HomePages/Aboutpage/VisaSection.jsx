import React from "react";
import BlogSection from "../BlogSection";
import LangmaSection from "../LangmaSection";
import FAQ from "../FAQ";
import ContactForm from "../ContactForm";

const VisaSection = () => {
  return (
    <>
      <section className="w-full bg-[#F4FEFF] py-10">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* LEFT IMAGE */}
            <div className="relative">
              <div className="w-full   overflow-hidden">
                <img
                  src="/images/Group 4364.png"
                  alt="Group4362"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="max-w-xl">
              <h3 className="text-[#0C5F5C] text-[32px] font-semibold mb-3">
                Visa
              </h3>

              <p className="text-gray-600 text-[25px] leading-relaxed mb-8">
                Trusted visa solutions from a top overseas immigration
                consultancy{" "}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 text-[20px]">
                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Study visa
                </button>

                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Work visa{" "}
                </button>

                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Investor visa
                </button>

                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Business visa{" "}
                </button>
                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Visit/tourist visa
                </button>
                <button className="px-5 py-2 rounded-full border border-[#6FD6CF] text-[#0C5F5C]  hover:bg-[#1FB6AA] hover:text-white transition">
                  Dependent visa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BlogSection />
      <LangmaSection />
      <FAQ />
      {/* <ContactForm /> */}
    </>
  );
};

export default VisaSection;
