import React from "react";
import PopupForm from "../../Components/PopupForm";
import { useState } from "react";

const StudyAbroad = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-full bg-[#F4FEFF]">
      <div className="max-w-6xl mx-auto px-4">
        {/* 👇 gap ko balanced rakha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT IMAGE AREA */}
          <div className="relative flex justify-center lg:justify-end pr-6">
            {/* Decorative Shape */}

            {/* Image */}
            <div className="relative w-full max-w-[300px] h-[280px] sm:h-[340px] flex items-center justify-center">
              <img
                src="/images/abrotegirl.png"
                alt="Study Abroad"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="max-w-xl px-0 sm:pl-6 text-[#296166]">
            <h3 className="text-[28px] lg:text-[32px] font-semibold  mb-0">Study Abroad</h3>

            <h2 className="text-[28px] md:text-2xl font-bold  mb-4">
              Launchpad to Global Success
            </h2>

            <p className="text-[18px] leading-relaxed mb-6">
              Step beyond borders to gain education that opens global
              opportunities, builds cultural confidence, shapes future leaders
              and prepares you for worldwide academic success.
            </p>

            <button onClick={() => setOpen(!open)} className="bg-[#296166] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#174C4A] transition shadow-md">
              Contact Our Expert Today
            </button>
          </div>
        </div>
      </div>
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default StudyAbroad;
