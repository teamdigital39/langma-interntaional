import React, { useEffect, useMemo, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { getLanguageFaqs, getSectionFaqs } from "../../languageFaqs";

const SECTION_HEADINGS = {
  general: "Frequently Asked Questions",
  "language-courses": "Language Course FAQs",
  "study-abroad": "Study Abroad FAQs",
  "pr-investment": "PR by Investment FAQs",
  "golden-visa": "Golden Visa FAQs",
  "global-mobility": "Global Mobility FAQs",
};

function writeFaqSchema(faqs) {
  const id = "langma-faq-jsonld";
  let script = document.head.querySelector(`#${id}`);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  return () => script?.remove();
}

export function LanguageFaqSchema({ language = "Foreign Language" }) {
  const faqs = useMemo(() => getLanguageFaqs(language), [language]);
  useEffect(() => writeFaqSchema(faqs), [faqs]);
  return null;
}

const FAQ = ({ language, section = "general" }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = useMemo(
    () => (language ? getLanguageFaqs(language) : getSectionFaqs(section)),
    [language, section]
  );
  const heading = language
    ? `Frequently Asked Questions About ${language} Courses`
    : SECTION_HEADINGS[section] || SECTION_HEADINGS.general;

  useEffect(() => writeFaqSchema(faqs), [faqs]);

  const renderAnswer = (text) => {
    if (text.includes("Click here")) {
      const parts = text.split("Click here");
      return (
        <>
          {parts[0]}
          <Link to="/payment" className="text-blue-600 font-semibold underline hover:text-blue-800">Click here</Link>
          {parts[1]}
        </>
      );
    }

    if (text.includes("form here")) {
      const parts = text.split("here");
      return (
        <>
          {parts[0]}
          <Link to="/contact" className="text-blue-600 font-semibold underline hover:text-blue-800">here</Link>
          {parts[1]}
        </>
      );
    }

    return text;
  };

  return (
    <section className="max-w-4xl mx-auto py-4 pt-10 px-4" id={`${section}-faq`}>
      <h2 className="text-[28px] lg:text-[32px] font-bold text-center mb-5 text-[#4197a2]">{heading}</h2>
      {language && (
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Find answers about {language} classes, course levels, exam preparation, online learning, study abroad, and overseas career goals.
        </p>
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={`${faq.question}-${index}`} className={`bg-[#F6F6F6] shadow-md rounded-xl p-5 transition-all duration-300 ${openIndex === index ? "shadow-xl" : ""}`}>
            <button
              type="button"
              className="w-full flex justify-between items-center gap-3 cursor-pointer text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className="text-[#4D5756] font-semibold text-sm md:text-[17px] flex-1">{faq.question}</span>
              <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border border-gray-400">
                {openIndex === index ? <ChevronUp className="w-4 h-4 text-gray-800" /> : <ChevronDown className="w-4 h-4 text-gray-800" />}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-sm md:text-[13px] leading-relaxed">{renderAnswer(faq.answer)}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
