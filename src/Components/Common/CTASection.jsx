import React from "react";
import PopupForm from "../../Components/PopupForm";
import { useState } from "react";

const CTASection = ({
  title,
  desc,
  buttonText,

  containerClass = "",
  contentClass = "",
  titleClass = "",
  descClass = "",
  buttonClass = "",
}) => {
  const [open, setOpen] = useState(false);
  return (

    <section className={`w-full bg-[#2E6466] py-6 ${containerClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${contentClass}`}>

          {/* LEFT TEXT */}
          <div className="text-white text-center md:text-left">
            <h2 className={`text-[28px] lg:text-[32px] font-semibold -mb-2 ${titleClass}`}>
              {title}
            </h2>

            <p className={`text-[20px] text-[#E0F2F2] ${descClass}`}>
              {desc}
            </p>
          </div>

          {/* BUTTON */}
          <button onClick={() => setOpen(!open)}
            className={`
              bg-white text-[#296166]
              px-3 py-1 md:px-6 md:py-3
              rounded-full
              font-semibold
              shadow-md
              text-[15px] md:text-[25px]
              transition
              whitespace-nowrap
              cursor-pointer
              ${buttonClass}
            `}
          >
            {buttonText}
          </button>

        </div>
      </div>
      <PopupForm open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default CTASection;
