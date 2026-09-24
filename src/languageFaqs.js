const EXAM_PROFILES = {
  german: "Goethe-Zertifikat, telc Deutsch, TestDaF, DSH, and WiDaF where relevant to the learner’s goal.",
  french: "DELF, DALF, TCF, TEF, and DFP where relevant to the learner’s goal.",
  japanese: "JLPT, JFT-Basic, NAT-TEST, J.TEST, and BJT where relevant to the learner’s goal.",
  korean: "TOPIK and KLAT where relevant to the learner’s goal.",
  chinese: "HSK and TOCFL where relevant to the learner’s goal.",
  italian: "CILS, CELI, PLIDA, and other recognised Italian assessments where relevant.",
  spanish: "DELE and SIELE where relevant to the learner’s goal.",
  dutch: "CNaVT, NT2, and other recognised Dutch assessments where relevant.",
};

function languageKey(language) {
  return String(language || "")
    .toLowerCase()
    .replace(/\b(language|course|classes|class)\b/g, "")
    .replace(/[^a-z]+/g, "")
    .trim();
}

export function getLanguageFaqs(language = "Foreign Language") {
  const name = String(language || "Foreign Language").trim();
  const key = languageKey(name);
  const exams = EXAM_PROFILES[key] || "the relevant recognised language assessment or certification where applicable.";

  return [
    {
      question: `Can I start ${name} from zero?`,
      answer: `Yes. Beginner learners can start ${name} without previous knowledge. The recommended starting level depends on your goal, prior exposure, and the current course pathway.`,
    },
    {
      question: `Do you offer online and classroom ${name} classes?`,
      answer: `Yes. ${name} training may be available through live online classes, classroom learning, or a hybrid format, depending on the current batch schedule, level, and location.`,
    },
    {
      question: `What is included in the ${name} language course?`,
      answer: `The course pathway can include pronunciation, vocabulary, grammar, speaking, listening, reading, writing, practical conversation, progress assessment, and goal-based exam preparation.`,
    },
    {
      question: `Which ${name} exams can I prepare for?`,
      answer: `Exam preparation depends on your level and objective. Relevant options may include ${exams} Confirm the current preparation route before enrolling because requirements vary by institution, employer, visa, and destination.`,
    },
    {
      question: `Can learning ${name} help with study abroad or overseas jobs?`,
      answer: `It can support study-abroad applications, international education, overseas jobs, and global career planning when the destination, university, employer, or visa route requires or values ${name} proficiency. Eligibility depends on the specific pathway.`,
    },
    {
      question: `How do I choose the right ${name} course level?`,
      answer: `Share your previous learning, current ability, intended destination, exam or career objective, and preferred timeline. A counsellor can help identify the most suitable starting level and course format.`,
    },
    {
      question: `How can I check ${name} course fees and batch timings?`,
      answer: `Fees, schedules, class size, and availability vary by level, learning mode, and batch. Contact the team for the latest ${name} course options and current batch details.`,
    },
  ];
}

const GENERAL_FAQS = [
  { question: "HOW CAN I ENROL ON A PROGRAMME?", answer: "To enroll in a programme, please ensure that you have filled out our online application form here. Once the form is submitted, we will contact you to confirm the programme and arrange payment" },
  { question: "HOW TO MAKE THE PAYMENT?", answer: "The payment can be made by Cards (Credit/Debit) or Bank transfer to our account. To make a Credit Card/Debit card payment online Click here. If you face any difficulties whilst making a payment, please call us or send an email and we will be happy to help with the process." },
  { question: "WHAT PROGRAMME SHALL I CHOOSE?", answer: "Langma International offers a wide range of programmes. If you face any difficulties whilst choosing a programme, please call us or send an email and we will be happy to offer you brief counseling." },
  { question: "STUDY MATERIALS ARE INCLUDED IN THE PROGRAMME?", answer: "Yes, study materials are included in the programme fees. Once the payment is made, students would receive a course book. If students need some supplementary books, an additional fee would be charged." },
  { question: "DO I RECEIVE A CERTIFICATE AT THE END OF PROGRAMME?", answer: "Students are rewarded with a certificate for their programme after the successful completion of the course." },
  { question: "HOW MANY STUDENTS ARE THERE IN A BATCH?", answer: "The average class size at Langma International is 5 students, and the maximum number of students per class is 9." },
  { question: "WHAT IS THE TIME AND MODE OF STUDY?", answer: "The timetable of programme is designed by our Student Liaison Officer (Morning, Afternoon, or Evening (7.00 am – 9.00 pm). Our programmes are offered online and classroom, tailored to suit the specific needs." },
];

const SECTION_FAQS = {
  "language-courses": [
    { question: "Which languages does Langma International teach?", answer: "Langma International offers training in 50+ languages spanning European, Asian, Middle Eastern, South Asian, and African language families — including French, German, Spanish, Japanese, Korean, Mandarin Chinese, Arabic, Russian, Italian, and Portuguese. Both online and on-campus programmes are available." },
    { question: "What learning formats and schedules are available?", answer: "Langma International offers online live classes, on-campus sessions at our New Delhi centre, weekend batches for working professionals, fast-track intensive programmes, and personalised one-to-one training. All formats are instructor-led and can be scheduled around your availability." },
    { question: "What proficiency levels do your programmes cover?", answer: "Our programmes cover all levels from beginner (A1) through advanced (C2), aligned with the Common European Framework of Reference (CEFR) where applicable. We also offer exam-oriented preparation for recognised international language certifications." },
    { question: "Does Langma International offer corporate and diplomatic language training?", answer: "Yes. Langma International designs customised language training programmes for businesses, MNCs, government departments, embassies, and consulates. Training is tailored to your team's industry, communication context, and timeline, and can be delivered on-site or online." },
    { question: "How do I book a free counselling session?", answer: "Langma International offers free language counselling sessions with no obligation — in person at our South Extension, New Delhi office, by phone, or via WhatsApp. Call +91 98101 17094, email info@langmainternational.com, or use the enquiry form on this page." },
  ],
  "study-abroad": [
    { question: "What does study-abroad counselling include?", answer: "Study-abroad counselling can include destination planning, course and university shortlisting, application guidance, document preparation, scholarship information, and student visa support. The exact service depends on your chosen destination and programme." },
    { question: "Which countries can I study in?", answer: "Available study destinations depend on your course, academic profile, budget, language ability, and career goal. Counselling can help you compare suitable destinations and university options." },
    { question: "Can you help with university applications?", answer: "Yes. The team can guide you through course selection, university applications, supporting documents, application timelines, and next steps for the selected study destination." },
    { question: "Do you provide student visa assistance?", answer: "Student visa guidance can include document checklists, application preparation, interview preparation, and process guidance. Visa approval is decided by the relevant immigration authority." },
    { question: "Do I need a language test to study abroad?", answer: "Language-test requirements depend on the university, course, destination, and teaching language. Common requirements may include IELTS, TOEFL, PTE, or a destination-specific language examination." },
    { question: "How much does it cost to study abroad?", answer: "The total cost depends on tuition fees, living expenses, insurance, travel, visa costs, and the destination. A counsellor can help prepare a destination-specific budget estimate." },
  ],
  "pr-investment": [
    { question: "What is PR by investment?", answer: "PR by investment refers to residence pathways that may allow eligible applicants to obtain long-term or permanent residence through a qualifying investment, contribution, business, property, or other approved route, depending on the country." },
    { question: "Which countries offer PR-by-investment options?", answer: "Available programmes and qualifying routes change by country and over time. Eligibility, investment requirements, residence conditions, and family benefits must be checked for the specific destination." },
    { question: "How much investment is required for permanent residence?", answer: "The required amount depends on the destination, programme type, applicant profile, and qualifying investment route. Request a current assessment before making any financial commitment." },
    { question: "Can my family be included in a PR-by-investment application?", answer: "Many residence programmes allow eligible dependants to be included, but the definition of family, age limits, documents, and additional fees vary by destination." },
    { question: "Does permanent residence by investment guarantee citizenship?", answer: "No. Permanent residence and citizenship are different legal statuses. Citizenship eligibility depends on the destination’s residence period, language, integration, character, and other legal requirements." },
    { question: "What documents are required for a PR-by-investment application?", answer: "Documents commonly include identity records, proof of funds, source-of-funds evidence, family documents, police clearances, and investment documentation. The exact checklist depends on the selected programme." },
  ],
  "golden-visa": [
    { question: "What is a Golden Visa?", answer: "A Golden Visa is a residence-by-investment programme offered by certain countries to eligible applicants who meet the required investment and compliance conditions. Programme rules and qualifying options vary by destination." },
    { question: "Which countries offer Golden Visa programmes?", answer: "Golden Visa availability and qualifying investment routes vary by country and may change as regulations are updated. A current assessment is required before choosing a destination." },
    { question: "How much investment is required for a Golden Visa?", answer: "The minimum investment depends on the country and route, such as an approved fund, property, business, or other qualifying option. Confirm the current official requirements before investing." },
    { question: "Can my family be included in a Golden Visa application?", answer: "Many Golden Visa programmes allow eligible family members to be included, subject to the destination’s rules on spouses, children, dependent parents, documents, and fees." },
    { question: "Does a Golden Visa guarantee citizenship or a second passport?", answer: "No. A Golden Visa generally provides residence rights, not an automatic passport. Citizenship may require a separate application and additional residence, language, integration, and legal conditions." },
    { question: "How long does a Golden Visa application take?", answer: "Processing times depend on the destination, programme, document completeness, due diligence, and government processing capacity. Timelines should be confirmed for the selected programme before applying." },
  ],
  "global-mobility": [
    { question: "What global mobility services are available?", answer: "Global mobility support can include language training, study-abroad counselling, overseas career guidance, international recruitment, residence pathways, and destination-specific advisory services." },
    { question: "Can you help me choose between study, work, and residence pathways?", answer: "Yes. The right route depends on your education, work experience, language level, finances, family situation, and long-term objective. A structured assessment can help compare the available options." },
    { question: "Do you provide support for overseas employment?", answer: "Overseas employment support may include profile assessment, language preparation, career guidance, recruitment coordination, and destination information, depending on the role and employer requirements." },
    { question: "Are visa or immigration approvals guaranteed?", answer: "No. Applications are assessed by the relevant university, employer, embassy, or immigration authority. Langma International provides guidance and preparation but cannot guarantee an approval." },
  ],
};

export function getSectionFaqs(section = "general") {
  return SECTION_FAQS[section] || GENERAL_FAQS;
}
