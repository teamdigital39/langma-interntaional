import React from "react";

const jobs = [
  "Genuine overseas job opportunities",
  "Transparent process with honest guidance",
  "Personalized support at every stage",
  "Long-term career-focused approach",
];

const WeHelpYouSucceed = () => {
  return (
    <section className="bg-[#F4FEFF]">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* LEFT CONTENT */}
          <div className="lg:max-w-md">
            <h2 className="text-[#296166] text-[32px] font-semibold mb-4">
              Why Choose Langma International?
            </h2>

            <p className="text-[#0E2A46] text-[25px] mb-5 font-semibold">
              We offer a wide range of international languages for professional
              and personal growth
            </p>

            <ul className="space-y-3">
              {jobs.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-[#0E2A46]"
                >
                  {/* CHECK IMAGE */}
                  <img
                    src="//images/check-mark_5290076 1.png"
                    alt="check"
                    className="w-5 h-5 mt-1"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center items-center">
            <div className="relative z-10 w-[380px] h-[280px] overflow-hidden">
              <img
                src="//images/Group 4457.png"
                alt="Interview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeHelpYouSucceed;
