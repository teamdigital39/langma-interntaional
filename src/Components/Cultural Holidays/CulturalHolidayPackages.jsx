import React from "react";

const CulturalHolidayPackages = () => {
  const inclusions = [
    "Guided heritage tours and cultural walks",
    "Traditional art, craft & music workshops",
    "Cultural performances & storytelling evenings",
    "Authentic local cuisine experiences",
    "Cultural mentors & local coordinators",
    "Safe accommodations & local assistance",
  ];

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main heading - left aligned */}
        <div className="text-left mb-5">
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#296166] mb-4">
            What's Included in Our Cultural Holiday Packages?
          </h2>
        </div>

        {/* Checkbox list container */}
        <div className="">
          <div className="space-y-6">
            {inclusions.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Checkbox with image */}
                <div className="flex-shrink-0 mt-1 flex items-center justify-center">
                  <img
                    src="/images/check-mark_5290076 1.png"
                    alt="checkmark"
                    className="w-6 h-6"
                  />
                </div>

                {/* Text */}
                <p className="text-[18px] lg:text-[20px] text-[#0E2A46] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalHolidayPackages;
