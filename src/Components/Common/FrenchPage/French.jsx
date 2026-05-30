import API_BASE from "../../../config.js";
import React, { useEffect, useState } from "react";

import CTASection from "../CTASection";
import FAQ from "../../../Pages/HomePages/FAQ";
import ConnectedSection from "../../../Pages/HomePages/ConnectedSection";
import ArabicCoursesSlider from "./FrenchCoursesSlider";

const French = () => {
  const [languageData, setLanguageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const cleanHTML = (html = "") => {
    return html
      .replace(/class="[^"]*"/g, "")
      .replace(/style="[^"]*"/g, "");
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/language-page/online-french-language-course`)
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

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!languageData) return <p className="text-center py-10">No Data Found</p>;

  // ✅ NOW SAFE (after data is loaded)
  const content = languageData?.content || "";
  const isLongContent = content.length > 1000;
  const shortContent = content.slice(0, 1000);

  return (
    <>
      {/* ================= BANNER ================= */}
      <section className="relative w-full overflow-hidden bg-[#F7FAFC]">
        <div className="w-full grid grid-cols-1 h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/images/frenchbanner.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 md:bottom-8 ml-5 md:ml-20">
              <button className="bg-[#006064] text-white px-6 py-2 rounded-full">
                Let’s Connect →
              </button>
            </div>
          </div>
        </div>
      </section>

      <ConnectedSection />

      {/* ================= PROGRAM ================= */}
      <section className="w-full bg-[#f4fbfb] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={languageData?.image || "/images/Logo.png"}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-5">
              {languageData?.title}
            </h2>

            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: cleanHTML(
                  expanded || !isLongContent ? content : shortContent + "..."
                ),
              }}
            />

            {isLongContent && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 text-[#006064] font-semibold hover:underline"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>
      </section>

      <ArabicCoursesSlider />

      <CTASection
        title={`Start your ${languageData?.title} journey with Langma today!`}
        buttonText="Start Your Journey Today."
      />

      <FAQ />
    </>
  );
};

export default French;