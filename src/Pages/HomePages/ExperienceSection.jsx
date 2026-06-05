import React from "react";
import PopupForm from "../../Components/PopupForm";
import { useState } from "react";
const ExperienceSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-full py-8 sm:py-14 flex justify-center px-4">
      <div className="w-full max-w-6xl bg-gradient-to-r from-[#9EE7F5] to-[#BFFCF9] rounded-3xl py-8 sm:py-12 px-4 sm:px-6 text-center">
        <h2 className="text-[28px] lg:text-[32px] font-bold text-[#15224C]">
          Experience Life with{" "}
          <span className="text-[#0A6B64]">Langma Style</span>
        </h2>

        <p className="text-gray-600 mt-2 text-[20px]">
          Beyond the classroom Curated journeys that nurture your mind, body and
          global perspective.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
          {/* Card 1 */}
          <div className="rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-start w-full max-w-[550px] min-h-[190px] bg-gradient-to-r from-[#ffffff] to-[#FFFFE4]">
            <div className="w-full sm:w-36 h-40 sm:h-32 rounded-xl overflow-hidden">
              <img
                src="/images/Rectangle 703 (1).png"
                alt="Wellness"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left">
              <h3 className="text-[#296166] text-[25px] font-semibold">
                Wellness
              </h3>
              <p className="text-[#296166] text-[16px] font-semibold">
                Recharge & Reconnect
              </p>
              <p className="text-[#212529] text-[16px] mt-1">
                Refresh your mind and body in peaceful settings holistic
                retreats designed for your wellbeing.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-start w-full max-w-[550px] min-h-[190px] bg-gradient-to-r from-[#ffffff] to-[#E9FFE5]">
            <div className="w-full sm:w-36 h-40 sm:h-32 rounded-xl overflow-hidden">
              <img
                src="/images/experiencelife.png"
                alt="experiencelife"
                className="w-full h-full"
              />
            </div>

            <div className="text-left">
              <h3 className="text-[#296166] text-[25px] font-semibold">
                Cultural Holidays
              </h3>
              <p className="text-[#296166] text-[16px] font-semibold">
                Authentic Journey
              </p>
              <p className="text-[#212529] text-[16px] mt-1">
                Explore vibrant traditions and heritage genuine cultural
                journeys that inspire and connect.
              </p>
            </div>
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="mt-10 bg-[#0A6B64] text-white px-8 py-3 rounded-full font-medium text-[15px] lg:text-[20px] hover:bg-[#064d48] transition">
          Book Your Next Adventure
        </button>
      </div>
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default ExperienceSection;
