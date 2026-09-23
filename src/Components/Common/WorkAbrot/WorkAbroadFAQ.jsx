import { useState } from "react";
import { ChevronDown } from "lucide-react";

const WORK_ABROAD_FAQS = [
  {
    question: "What support does Langma provide for working abroad?",
    answer:
      "Langma can support your preparation with language training, career guidance, document readiness, application direction, interview preparation, and destination-focused guidance. The exact support depends on your target country, role, qualifications, and stage of the journey.",
  },
  {
    question: "Can I prepare online or attend classes offline?",
    answer:
      "Yes. Langma provides both online and classroom learning options. You can choose the format that suits your schedule, location, learning goals, and preferred level of support.",
  },
  {
    question: "Can Langma guarantee a job or work visa?",
    answer:
      "No provider can guarantee an employer's hiring decision or an immigration authority's decision. Langma helps you prepare and navigate the process, while the final outcome depends on employers, official requirements, your eligibility, and the documents submitted.",
  },
  {
    question: "Which documents may be needed for a work-abroad application?",
    answer:
      "Requirements vary by country, role, and employer. Common documents can include a passport, academic or professional qualifications, CV, work-experience records, language evidence, police or medical documents, and an employment offer where applicable. We help you identify the relevant checklist for your route.",
  },
  {
    question: "Do I need to know the local language before applying?",
    answer:
      "It depends on the destination, job, employer, and visa route. Some roles may use English, while others require local-language proficiency. A language assessment can help identify the right level and preparation plan.",
  },
  {
    question: "Can corporate teams use Langma for international work preparation?",
    answer:
      "Yes. Corporate learners can use language and communication training to prepare teams for international clients, overseas assignments, relocation, and cross-cultural workplace communication. The programme can be planned around the organisation's goals and schedule.",
  },
  {
    question: "How do I start my work-abroad plan?",
    answer:
      "Start with a consultation. Share your target country, preferred role, qualifications, experience, language level, and timeline. Langma can then help you understand the preparation steps and identify the areas that need attention first.",
  },
];

export default function WorkAbroadFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="work-abroad-faq" className="bg-[#F4FEFF] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#16856F]">
            Clear answers before you move
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[#296166] sm:text-4xl">
            Work Abroad FAQs
          </h2>
          <p className="mt-4 text-base leading-7 text-[#536D70]">
            Understand the preparation journey, learning options, documents, and realistic next steps before you apply.
          </p>
        </div>

        <div className="space-y-3">
          {WORK_ABROAD_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-shadow ${
                  isOpen
                    ? "border-[#8DE8CB] bg-white shadow-[0_14px_35px_rgba(41,97,102,0.10)]"
                    : "border-[#D6E9E4] bg-white/75"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[#173F45]">{faq.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 flex-shrink-0 text-[#16856F] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-6 text-sm leading-7 text-[#536D70] sm:px-7">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
