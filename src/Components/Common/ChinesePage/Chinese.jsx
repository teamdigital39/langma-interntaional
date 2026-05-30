import API_BASE from "../../../config.js";
import React, { useEffect, useState } from "react";

import CTASection from "../CTASection";
import FAQ from "../../../Pages/HomePages/FAQ";
import ConnectedSection from "../../../Pages/HomePages/ConnectedSection";
import ArabicProgramSection from "./ArabicProgramSection";
import ArabicCoursesSlider from "./ArabicCoursesSlider";

const Chinese = () => {
  const [languageData, setLanguageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cleanHTML = (html = "") => {
    return html
      .replace(/class="[^"]*"/g, "")
      .replace(/style="[^"]*"/g, "");
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/language-page/chinese-language-online-course`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.page) {
          setLanguageData(data.page);
        } else {
          setLanguageData(null);
        }
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        setLanguageData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!languageData) {
    return <p className="text-center py-10">No Data Found</p>;
  }

  return (
    <>
      {/* ================= BANNER (UNCHANGED) ================= */}
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/chinesebanner.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button className="inline-flex items-center gap-2 bg-[#006064] text-white px-3 py-1 md:px-8 md:py-3 rounded-full text-sm font-medium hover:bg-[#17a398] transition shadow-lg">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>

      <ConnectedSection />

      {/* ================= PROGRAM SECTION ================= */}
      <section className="w-full bg-[#f4fbfb] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT IMAGE */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            <img
              src={languageData?.image || "/images/Logo.png"}
              alt="Chinese Language"
              className="w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] object-cover rounded-full"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:w-1/2 text-left mt-20 lg:mt-0">

            <h2 className="text-3xl font-bold mb-5">
              {languageData?.title}
            </h2>

            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: cleanHTML(languageData?.content),
              }}
            />
          </div>
        </div>
      </section>

      {/* SAME COMPONENT */}
      {/* <ArabicProgramSection data={languageData} /> */}
      <ArabicCoursesSlider />

      <CTASection
        title={`Start your ${languageData?.title} journey with Langma today!`}
        desc=""
        buttonText="Start Your Journey Today."
      />

      <FAQ />
    </>
  );
};

export default Chinese;