import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const INFORMATION_PAGES = {
  "refund-policy": {
    title: "Refund Policy",
    description:
      "Learn how to confirm the refund and cancellation terms that apply to your Langma International enrolment or service.",
    intro:
      "Refund eligibility can depend on the programme or service, the terms shared at enrolment, and applicable law. Please confirm the written terms for your specific enrolment before making a payment.",
    sections: [
      {
        title: "Before making a payment",
        paragraphs: [
          "Review the fee, cancellation, and refund terms provided for your selected programme or service. If anything is unclear, contact Langma International and ask for the applicable terms in writing before paying.",
        ],
      },
      {
        title: "Requesting a review",
        paragraphs: [
          "For an existing enrolment, contact our team with your name, programme or service, payment reference, and the reason for your request. We will review it against the terms provided for that enrolment and applicable requirements.",
          "This page is general guidance and does not replace the written terms for a particular enrolment or service.",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    description:
      "Important information about using Langma International's website and education, career, and global-opportunity guidance.",
    intro:
      "The information on this website is provided for general informational purposes. It is not legal, immigration, financial, or other professional advice.",
    sections: [
      {
        title: "Information can change",
        paragraphs: [
          "Course availability, fees, admission requirements, visa rules, and other programme details may change. Confirm current information with Langma International and the relevant institution or official authority before acting on it.",
        ],
      },
      {
        title: "Individual outcomes",
        paragraphs: [
          "Admission, visa, employment, certification, and other outcomes depend on individual circumstances and decisions made by universities, employers, examination bodies, and government authorities. Langma International does not guarantee a particular outcome.",
        ],
      },
      {
        title: "Get guidance for your situation",
        paragraphs: [
          "Contact our team to discuss your goals and the current options that may apply to you. Where a decision requires professional or official advice, consult the appropriate qualified adviser or authority.",
        ],
      },
    ],
  },
  "our-vision": {
    title: "Our Vision",
    description:
      "Learn about Langma International's vision to connect language learning, education, careers, and cultures.",
    intro:
      "Our vision is to build an integrated ecosystem where language opens doors to education, education shapes global careers, and every journey creates opportunities for cultural connection and growth.",
    sections: [
      {
        title: "Connecting people with opportunity",
        paragraphs: [
          "We bring language learning together with study-abroad guidance, international career support, and global mobility services so people can plan their next step with greater confidence.",
        ],
      },
      {
        title: "Learning across cultures",
        paragraphs: [
          "We believe learning a language is also a way to understand people, participate in new communities, and create meaningful connections across borders.",
        ],
      },
    ],
  },
  "what-we-get": {
    title: "What You Get",
    description:
      "Explore the language learning and international opportunity support available through Langma International.",
    intro:
      "Langma International brings language education and global-opportunity guidance together, helping you explore services that fit your learning or international goals.",
    sections: [
      {
        title: "Language learning support",
        paragraphs: [
          "Explore language programmes, course-level guidance, and learning options to help you identify a suitable next step. Course availability, format, and schedule depend on the current programme and batch.",
        ],
      },
      {
        title: "Guidance for international goals",
        paragraphs: [
          "Depending on your needs, our services can include study-abroad guidance, international career support, translation and language services, and global mobility information.",
          "The right service and any eligibility or outcome depend on your individual circumstances and the requirements of the relevant institution, employer, or authority.",
        ],
      },
    ],
  },
};

export default function LegacyInfoPage({ page }) {
  const content = INFORMATION_PAGES[page];
  if (!content) {
    throw new Error(`Unknown information page: ${page}`);
  }

  return (
    <main className="min-h-screen bg-[#f7fafc] text-[#203b3d]">
      <Helmet>
        <title>{content.title} | Langma International</title>
        <meta name="description" content={content.description} />
      </Helmet>

      <header className="bg-[#eaf7f6] px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#168b88]">
            Langma International
          </p>
          <h1 className="text-3xl font-bold text-[#296166] sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#4d6263] sm:text-lg">
            {content.intro}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="space-y-8">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-[#dcebea] bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-xl font-semibold text-[#296166] sm:text-2xl">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-7 text-[#4d6263]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-[#296166] p-6 text-white sm:p-8">
          <h2 className="text-xl font-semibold sm:text-2xl">Have a question?</h2>
          <p className="mt-3 max-w-3xl leading-7 text-white/90">
            Contact Langma International for current programme information or
            guidance about which service may fit your needs.
          </p>
          <Link
            to="/contact/"
            className="mt-5 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-[#296166] transition hover:bg-[#eaf7f6]"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
