import React from "react";
import PopupForm from "../../Components/PopupForm";
import { useState } from "react";
const GlobalPlacement = () => {
    const [open, setOpen] = useState(false);
  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1E4F4F] mb-2">
              Global Placement
            </h2>

            <p className="text-[#3A6F6F] text-base mb-8">
              Turning Ambitions into Global Careers
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 max-w-md">
              <button onClick={() => setOpen(!open)} className="bg-[#6EC6C2] border-4 text-white px-6 py-3 rounded-3xl shadow-md hover:shadow-lg transition cursor-pointer ">
                Talent Sourcing
              </button>

              <button onClick={() => setOpen(!open)} className="bg-[#6EC6C2] border-4 text-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer ">
                Visa & Relocation Support
              </button>

              <button onClick={() => setOpen(!open)} className="bg-[#6EC6C2] border-4 text-white px-6 py-3 rounded-3xl shadow-md hover:shadow-lg transition cursor-pointer ">
                Career Integration
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE PLACEHOLDER */}
          <div className="relative flex justify-center lg:justify-end">
            {/* MAIN IMAGE PLACE */}
            <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] h-[280px] sm:h-[380px] rounded-full flex items-center justify-center mx-auto ">
              <span className="text-sm text-gray-500">
                <img src="/images/Globle.png" alt="Globle.png" />
              </span>
            </div>

            {/* OPTIONAL SMALL DECOR DOTS */}
            <span className="absolute top-6 right-10 w-2 h-2 bg-[#6EC6C2] rounded-full"></span>
            <span className="absolute bottom-10 right-24 w-2 h-2 bg-[#6EC6C2] rounded-full"></span>
          </div>
        </div>
      </div>
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
    
  );
};

export default GlobalPlacement;
