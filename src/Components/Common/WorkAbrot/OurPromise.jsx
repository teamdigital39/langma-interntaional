import React from "react";

const OurPromise = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#E6F7F6] to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT IMAGE AREA */}
          <div className="relative flex justify-center lg:justify-start">
            <div
              className="
                relative 
                
                -ml-4 lg:-ml-16
                transition duration-500 hover:scale-105
              "
            >
              <img
                src="/images/Group 4361.png"
                alt="Our Promise"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 text-[#296166]">
            
            {/* Small Badge */}
            <span className="inline-block bg-[#80CBC4] text-white text-sm px-4 py-1 rounded-full mb-4">
              Our Commitment
            </span>

            <h3 className="text-[30px] md:text-[34px] font-bold mb-3 text-[#0E2A46]">
              Our Promise
            </h3>

            <h2 className="text-[22px] md:text-[26px] font-semibold mb-5 text-[#296166] leading-snug">
              We believe trust is more important than business.
            </h2>

            <p className="text-[16px] md:text-[18px] leading-relaxed text-[#0E2A46]">
              At Langma International, we keep everything transparent — from
              your chances of selection to the real process timeline. 
              If something is not possible, we tell you honestly.
            </p>

            {/* Decorative Line */}
            <div className="mt-6 w-20 h-1 bg-[#80CBC4] rounded-full"></div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPromise;