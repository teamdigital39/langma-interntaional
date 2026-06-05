import React from "react";

const jobs = [
  "Healthcare & Caregiving",
  "Hospitality & Hotel Industry",
  "Construction & Skilled Trades",
  "Logistics & Warehouse",
  "Customer Service & Retail",
  "Office & Administrative Roles",
  "IT & Engineering",
];

const JobsWeAssistWith = () => {
  return (
    <section className="bg-[#F4FEFF] py-5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* LEFT CONTENT */}
          <div className="lg:max-w-md">
            <h2 className="text-[#296166] text-[28px] lg:text-[32px] font-semibold mb-4">
              Jobs We Assist With
            </h2>

            <p className="text-[#0E2A46] mb-5">
              We regularly work with opportunities in
            </p>

            <ul className="space-y-3">
              {jobs.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-[#0E2A46]"
                >
                  {/* CHECK IMAGE */}
                  <img
                    src="/images/check-mark_5290076 1.png"
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
            <div className="relative z-10 w-full h-[280px] overflow-hidden">
              <img
                src="/images/Group 4359 (1).png"
                alt="Interview"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsWeAssistWith;
