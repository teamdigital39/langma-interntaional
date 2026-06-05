import React from "react";

const WorkAbroadSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#F4FEFF] to-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-[28px] md:text-[32px] font-bold text-[#296166] mb-3">
              Work Abroad with Langma International
            </h3>

            <h2 className="text-[20px] md:text-[26px] font-semibold text-[#0E2A46] mb-5 leading-snug">
              Your Dream Job Overseas Starts With the Right Guidance
            </h2>

            <p className="text-[#0E2A46] text-[16px] md:text-[18px] mb-4 leading-relaxed">
              Many people want to work abroad but don’t know where to start.
              Confusing visa rules, fake job offers, rejected applications —
              these fears stop thousands from taking the first step.
            </p>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              At Langma International, we make your overseas job journey simple,
              honest, and clear. From finding the right job to helping you apply
              for your work visa, we stay with you at every stage.
            </p>

            <div className="mt-6 w-24 h-1 bg-[#80CBC4] rounded-full"></div>
          </div>

             <div className="relative flex justify-center items-center gap-6">
          
          {/* LARGE IMAGE */}
          <div className="w-full lg:w-[220px]  rounded-md overflow-hidden ">
            <img
              src="/images/wab.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[180px] lg:mt-18 rounded-md overflow-hidden  ">
            <img
              src="/images/wab1.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-[20px] right-0 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
            <span className="text-[12px] font-semibold">
              <span className="text-[#FF9E0E]">
              Placed 
              </span>
              <br />
              Professional
            </span>

            <div className="flex -space-x-2">
  <img
    src="https://randomuser.me/api/portraits/men/32.jpg"
    className="w-6 h-6 rounded-full border-2 border-white"
    alt=""
  />
  <img
    src="https://randomuser.me/api/portraits/women/44.jpg"
    className="w-6 h-6 rounded-full border-2 border-white"
    alt=""
  />
  <img
    src="https://randomuser.me/api/portraits/men/76.jpg"
    className="w-6 h-6 rounded-full border-2 border-white"
    alt=""
  />
</div>
          </div>

        </div>
          {/* RIGHT IMAGE AREA */}
          {/* <div className="lg:w-1/2 relative mt-12 lg:mt-0 flex flex-col items-center">
            
            
            <div className="mb-8 bg-white shadow-lg rounded-full px-6 py-2 border">
              <span className="text-sm text-gray-600 font-medium">
                500+ Placed Professionals
              </span>
            </div>

           
            <div className="
              flex 
              flex-col 
              lg:flex-row 
              items-center 
              gap-8
              relative
            ">
              
             
              <div className="w-[240px] h-[340px] md:w-[280px] md:h-[400px] 
                              rounded-[40px] shadow-2xl overflow-hidden 
                              transition duration-500 hover:scale-105 z-10">
                <img
                  src="/images/agency 1.png"
                  alt="Agency"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              
              <div className="
                  w-[200px] h-[280px] md:w-[230px] md:h-[320px] 
                  rounded-[40px] shadow-2xl overflow-hidden 
                  transition duration-500 hover:scale-105
                  
                  lg:-ml-10   
                ">
                <img
                  src="/images/young-pleased-pretty-caucasian-schoolgirl-with-headphones-neck-wearing-glasses-back-bag-holds-plane-globe-looking-up-pink-with-copy-space 1.png"
                  alt="Student"
                  className="w-full h-full object-cover object-top"
                />
              </div>

            </div>
          </div> */}

        </div>
      </div>
    </section>
  );
};

export default WorkAbroadSection;