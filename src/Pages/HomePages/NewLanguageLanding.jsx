import "./NewLanguageLanding.css";
import API_BASE from "../../config.js";
import { useEffect, useRef, useState } from "react";

const BROCHURE_URLS = {
  French: "",
  German: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1791530457/GERMAN_u3yf7i.pdf",
  Japanese: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1791530455/JAPANESE_apo3cq.pdf",
  Korean: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1791530456/KOREAN_vql6fj.pdf",
  Chinese: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1791530466/MANDARIN_lxbwoa.pdf",
};

const CAREER_GUIDE_URLS = {
  French: "",
  German: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1791530457/GERMAN_u3yf7i.pdf",
  Japanese: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1791530455/JAPANESE_apo3cq.pdf",
  Korean: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1791530456/KOREAN_vql6fj.pdf",
  Chinese: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1791530466/MANDARIN_lxbwoa.pdf",
};

function getBrochureDownloadUrl(url) {
  if (!url) return "";

  let brochureUrl;
  try {
    brochureUrl = new URL(url);
  } catch {
    return "";
  }

  if (brochureUrl.protocol !== "https:" || !brochureUrl.hostname.endsWith(".cloudinary.com")) return "";

  const uploadPath = "/upload/";
  const uploadIndex = brochureUrl.pathname.indexOf(uploadPath);
  if (uploadIndex === -1) return "";

  const transformations = brochureUrl.pathname.slice(uploadIndex + uploadPath.length).split("/");
  if (!transformations.some((transformation) => transformation.startsWith("fl_attachment"))) {
    brochureUrl.pathname = brochureUrl.pathname.replace(uploadPath, `${uploadPath}fl_attachment/`);
  }

  return brochureUrl.toString();
}

// ---- Announcement bar + "Why choose us" numbers -------------------------------
// Default numbers shown on ALL language pages (taken from the PDF brief).
// To show different numbers on one language, add a `stats: { ... }` object to
// that language in LANGUAGE_PAGES (only the keys you set are overridden), e.g.
//   German: { ..., stats: { trained: "2,000+", careerBenefit: "90%" } }
// Set any value to "" to hide that stat.
const STATS = {
  trained: "2,00,000+",
  reviews: "1,357",
  liveClasses: "1,000+",
  corporate: "",
  college: "",
  careerBenefit: "",
};

const STAT_ITEMS = [
  { key: "trained", label: "Trained" },
  { key: "reviews", label: "Google Reviews" },
  { key: "liveClasses", label: "Live Classes Every Month" },
  { key: "corporate", label: "Corporate Partners" },
  { key: "college", label: "College Partners" },
  { key: "careerBenefit", label: "Reported Career Benefits" },
];

const GERMAN_CAREERS = {
  cards: [
    {
      icon: "briefcase",
      title: "Work in Germany, Austria or Switzerland",
      text: "B1 is the usual minimum for a skilled-worker route or an Ausbildung apprenticeship; B2 is what most employers prefer. German-speaking roles turn up across BMW, Bosch, Volkswagen, Daimler, Siemens, SAP, Deutsche Bank, Allianz, BASF and Lufthansa.",
      points: ["Ausbildung apprenticeship routes", "EU skilled-worker job tracks"],
    },
    {
      icon: "building",
      title: "Work in India, for German employers",
      text: "Translator and interpreter roles open up at MNCs, embassies, government bodies and NGOs across engineering, IT, automotive, healthcare, financial services, media, tourism and hospitality. Language skills also work freelance, not just full-time.",
      points: ["No relocation required", "Translation & client-facing desks"],
    },
    {
      icon: "cap",
      title: "Study in Germany",
      text: "Most German universities are public, so tuition is typically a nominal administration fee rather than a bill. German-language proficiency strengthens your application, unlocks scholarship options and makes daily life workable once you arrive.",
      points: ["DSH / TestDaF admission routes", "Scholarship eligibility"],
    },
    {
      icon: "home",
      title: "Settle long-term in Germany",
      text: "German proficiency counts toward the EU Blue Card, permanent residency and naturalisation. B1 is the usual benchmark for settlement and citizenship. It is what turns a work visa into a life you can actually build there.",
      points: ["EU Blue Card & PR pathways", "Naturalisation-ready B1"],
    },
  ],
  note: "Reported earnings for German-language professionals in India run roughly ₹4.4L–₹10L a year, with the higher band concentrated in EU and German-employer roles.",
};

const FRENCH_CAREERS = {
  cards: [
    {
      icon: "briefcase",
      title: "Work in France and French-speaking countries",
      text: "French is used across France, Canada, Belgium, Switzerland, Luxembourg and parts of Africa. Roles in hospitality, aviation, luxury, retail, banking and international organisations often prefer candidates with working French.",
      points: ["Francophone job markets", "Hospitality & aviation roles"],
    },
    {
      icon: "building",
      title: "Work in India, with French",
      text: "Multinationals, language-support desks, translation agencies, tourism and hospitality businesses and embassies look for French speakers. Language skills also work freelance, not just full-time.",
      points: ["No relocation required", "Translation & language-support desks"],
    },
    {
      icon: "cap",
      title: "Study in France or Canada",
      text: "Many French-taught programmes ask for a DELF or TCF result. Proficiency strengthens your application, opens scholarship options and makes daily life easier once you arrive.",
      points: ["DELF / TCF admission routes", "Scholarship eligibility"],
    },
    {
      icon: "home",
      title: "Build a long-term life abroad",
      text: "French can add points in Canada's Express Entry system and is central to Quebec's immigration programmes. Higher levels also support residency and citizenship in French-speaking countries.",
      points: ["Canada immigration points", "Long-term settlement routes"],
    },
  ],
  note: "Salary, visa and eligibility rules vary by employer, country and year. Your counsellor can walk you through current routes and the level you need.",
};

const JAPANESE_CAREERS = {
  cards: [
    {
      icon: "briefcase",
      title: "Work in Japan",
      text: "JLPT N2 is a common benchmark for professional roles, and lower levels can support certain skilled-worker routes. Japanese skills are valued in engineering, IT, manufacturing, hospitality and healthcare.",
      points: ["Skilled-worker visa routes", "Engineering & IT roles"],
    },
    {
      icon: "building",
      title: "Work in India, for Japanese companies",
      text: "Many Japanese companies operate in India across automotive, manufacturing, IT and trading. Interpreter, coordinator and bridge roles reward people who can communicate in both languages.",
      points: ["No relocation required", "Interpreter & coordinator roles"],
    },
    {
      icon: "cap",
      title: "Study in Japan",
      text: "Japanese-taught programmes ask for JLPT or EJU results, and language ability strengthens scholarship applications such as MEXT. It also makes campus and daily life far easier.",
      points: ["JLPT / EJU admission routes", "MEXT & university scholarships"],
    },
    {
      icon: "home",
      title: "Build a long-term life in Japan",
      text: "Japanese ability can add points under Japan's Highly Skilled Professional system, and higher JLPT levels support long-term visas and career growth in Japanese workplaces.",
      points: ["Long-term visa pathways", "Career growth in Japan"],
    },
  ],
  note: "Salary, visa and eligibility rules vary by employer, country and year. Your counsellor can walk you through current routes and the level you need.",
};

const KOREAN_CAREERS = {
  cards: [
    {
      icon: "briefcase",
      title: "Work in South Korea",
      text: "Many employers look for TOPIK level 3 or above. Korean skills help in corporate roles, tourism, hospitality, education and technology.",
      points: ["Corporate roles in Korea", "Tourism & hospitality"],
    },
    {
      icon: "building",
      title: "Work in India, for Korean companies",
      text: "Korean brands such as Samsung, Hyundai, Kia and LG have a large presence in India. Interpreter, coordinator and client-facing roles need people who can speak Korean.",
      points: ["No relocation required", "Interpreter & coordinator roles"],
    },
    {
      icon: "cap",
      title: "Study in South Korea",
      text: "Korean-taught programmes ask for a TOPIK result, and language skills strengthen applications for scholarships such as the Global Korea Scholarship (GKS).",
      points: ["TOPIK admission routes", "GKS & university scholarships"],
    },
    {
      icon: "home",
      title: "Careers in Korean culture & content",
      text: "From K-drama and K-pop to beauty and gaming, Korean opens up subtitling, localisation, content creation and community roles that go beyond a standard desk job.",
      points: ["Subtitling & localisation", "Content & community roles"],
    },
  ],
  note: "Salary, visa and eligibility rules vary by employer, country and year. Your counsellor can walk you through current routes and the level you need.",
};

const CHINESE_CAREERS = {
  cards: [
    {
      icon: "briefcase",
      title: "Work with China-linked businesses",
      text: "Trade, manufacturing, sourcing, electronics and e-commerce all rely on people who can communicate with Chinese partners. Mandarin is a clear advantage in business-facing roles.",
      points: ["Import-export & sourcing roles", "Business communication"],
    },
    {
      icon: "building",
      title: "Work in India, with Mandarin",
      text: "Translation, interpreting, technical support, tourism and client-coordination roles open up at companies that work with Chinese teams. Mandarin also works freelance, not just full-time.",
      points: ["No relocation required", "Translation & interpreting"],
    },
    {
      icon: "cap",
      title: "Study in China",
      text: "Chinese-taught programmes ask for an HSK result, and language ability strengthens scholarship applications such as the Chinese Government Scholarship (CSC).",
      points: ["HSK admission routes", "CSC & university scholarships"],
    },
    {
      icon: "home",
      title: "Grow a global career",
      text: "Mandarin is one of the most widely spoken languages in the world. It supports long-term growth in international trade, technology, teaching and content roles.",
      points: ["Teaching & content roles", "Long-term career edge"],
    },
  ],
  note: "Salary, visa and eligibility rules vary by employer, country and year. Your counsellor can walk you through current routes and the level you need.",
};

const LANGUAGE_PAGES = {
  French: {
    country: "France",
    short: "French",
    accent: "#ef4b3f",
    heroImage: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789381673/french-1_jkkdxy.jpg",
    aboutImage: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789381674/french-4_h36dwd.jpg",
    exam: "DELF / TCF",
    levels: "A1 to C2",
    modeNote: "Les deux sont possibles",
    careers: FRENCH_CAREERS,
    intro: "Build practical French skills for study, work, travel and confident everyday communication.",
    about: "Learn pronunciation, conversation, grammar and exam-focused French through structured online or classroom guidance.",
    offer: ["Beginner to advanced French levels", "DELF, TCF and practical exam preparation", "Live online, classroom and flexible support"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789032944/Advice_Mobile_Video_in_Experimental_Type_Style_qmxxzi.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789033823/French_bn7plu.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789033825/Advice_Mobile_Video_in_Experimental_Type_Style_1_v1ecf0.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789033856/Advice_Mobile_Video_in_Experimental_Type_Style_2_oxzvav.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789034571/French_1_rwoxn3.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789035433/French_2_gacqvt.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789035829/French_3_oxei8x.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789373649/Feedback_French_Poonam_bgh9tz.mov",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789373659/fRENCH_QUESTION_WORD_xdbvkb.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789373703/French_Tongue_twister_ejicwi.mp4",
    ],
    testimonialImages: [
      { src: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789381673/french-2_y2pflj.jpg", alt: "French language student receiving a certificate at Langma" },
      { src: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789381674/french-4_h36dwd.jpg", alt: "French language student completing a French language level at Langma" },
    ],
  },
  German: {
    country: "Germany",
    short: "German",
    accent: "#d84b35",
    heroImage: "/images/Germany.webp",
    aboutImage: "/images/3.jpg",
    exam: "Goethe / telc",
    levels: "A1 to C2",
    modeNote: "Beides möglich",
    careers: GERMAN_CAREERS,
    intro: "Build useful German skills for study, work, relocation and everyday life in Germany.",
    about: "Progress from the foundations to advanced communication with structured lessons, speaking practice and exam preparation.",
    offer: ["A1 to C2 German language pathways", "Goethe-Zertifikat and telc preparation", "Online, classroom and hybrid learning"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957543/002_german_review_tjz8x2.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957543/001german_review_xyvpqv.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957536/WhatsApp_Video_2026-09-09_at_17.54.01_emt6bt.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957535/WhatsApp_Video_2026-09-09_at_17.53.25_wfvwxx.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957535/WhatsApp_Video_2026-09-09_at_17.53.32_pysfnr.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957534/WhatsApp_Video_2026-09-09_at_17.54.02_vskbwy.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788957967/Lalit_student_German_feedback_video_mypxlx.mp4",
    ],
    testimonialImages: [
      { src: "/images/1.jpg", alt: "Students and team members celebrating Oktoberfest at Langma" },
      { src: "/images/4.jpg", alt: "Langma students performing during a German cultural celebration" },
    ],
  },
  Japanese: {
    country: "Japan",
    short: "Japanese",
    accent: "#c53d52",
    heroImage: "/images/Japan.webp",
    aboutImage: "/images/calligraphy.jpg",
    exam: "JLPT",
    levels: "N5 to N1",
    modeNote: "どちらも可能",
    careers: JAPANESE_CAREERS,
    intro: "Learn Japanese with a clear path from first phrases to confident communication and JLPT preparation.",
    about: "Combine speaking, listening, reading and writing with practical cultural context and structured level guidance.",
    offer: ["Beginner to advanced Japanese levels", "JLPT-focused reading and listening practice", "Online and classroom course options"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866467/Video-7940_wgu9vv.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866469/Video-4433_f0dqcu.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866469/Video-8173_yo5wdt.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866483/Video-1086_iif9ho.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866488/Video-42967_rh4ntr.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788866470/Video-15072_t2jxxa.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788868150/Video-91513_dintai.mp4",
    ],
    testimonialImages: [
      { src: "/images/one-big-family.jpg", alt: "Group photo of Langma students after a Japanese culture day" },
      { src: "/images/culture-kimono.jpg", alt: "Students wearing traditional Japanese kimonos at Langma" },
    ],
  },
  Korean: {
    country: "South Korea",
    short: "Korean",
    accent: "#3568ae",
    heroImage: "/images/korianbanner.png",
    aboutImage: "/images/KOREANNY1.png",
    exam: "TOPIK",
    levels: "TOPIK I and II",
    modeNote: "둘 다 가능",
    careers: KOREAN_CAREERS,
    intro: "Learn Korean for real-world conversation, study goals, cultural connection and TOPIK preparation.",
    about: "Start with Hangul and build practical speaking, listening, reading and writing skills through guided levels.",
    offer: ["Beginner to advanced Korean levels", "TOPIK-oriented preparation and practice", "Live online and classroom learning"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959740/WhatsApp_Video_2026-09-09_at_17.54.55_bvn4tx.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959739/WhatsApp_Video_2026-09-09_at_17.55.01_jydoha.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959737/WhatsApp_Video_2026-09-09_at_17.56.51_vqcplx.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959736/WhatsApp_Video_2026-09-09_at_17.57.14_py87hm.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959736/WhatsApp_Video_2026-09-09_at_17.57.39_eflvmy.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959735/WhatsApp_Video_2026-09-09_at_17.58.04_yajsbg.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959739/WhatsApp_Video_2026-09-09_at_17.55.18_pk1f6x.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1788959734/WhatsApp_Video_2026-09-09_at_17.59.04_zunh8r.mp4",
    ],
    testimonialImages: [
      { src: "/images/KOREANNY5.png", alt: "Students celebrating Seollal in traditional Korean hanbok" },
      { src: "/images/KOREANNY3.png", alt: "Students performing a K-Pop dance at a Korean cultural celebration" },
    ],
  },
  Chinese: {
    country: "China",
    short: "Chinese",
    accent: "#c7922e",
    heroImage: "/images/chinese-hero-bg.jpg",
    aboutImage: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789468939/IMG_0300_v0kaun.jpg",
    exam: "HSK",
    levels: "HSK 1 to HSK 6",
    modeNote: "线上线下均可",
    careers: CHINESE_CAREERS,
    intro: "Build practical Mandarin skills through a structured path for beginners, professionals and China-focused goals.",
    about: "Learn pinyin, tones, characters, grammar and conversation with HSK-focused guidance and cultural context.",
    offer: ["HSK 1 to HSK 6 learning pathways", "Mandarin speaking, tones and character practice", "Online, classroom and flexible course guidance"],
    videos: [
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789456031/China_Visit_Ep02_mbnqni.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789455864/China_visit_Ep01_ws4haj.mp4",
      "https://res.cloudinary.com/dzv9zcrlz/video/upload/v1789455642/Chinese_Embassy_Event_Instagram_video_kuejsj.mp4",
    ],
    testimonialImages: [
      { src: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789468939/IMG_0300_v0kaun.jpg", alt: "Langma students practising traditional Chinese calligraphy" },
      { src: "https://res.cloudinary.com/dzv9zcrlz/image/upload/v1789469016/IMG_0459_myakgd.jpg", alt: "Langma student showcasing Chinese calligraphy during a cultural activity" },
    ],
  },
};

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1zM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" /></svg>;
}

const CAREER_ICONS = {
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></>,
  cap: <><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></>,
  home: <><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>,
};

function CareerIcon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{CAREER_ICONS[name]}</svg>;
}

function buildFaqs(page) {
  const { short, levels, country, exam } = page;
  return [
    {
      q: `Is it hard to learn ${short}?`,
      a: `${short} feels challenging at first, like any new language, but a structured path makes it manageable. At Langma International you move level by level (${levels}) with regular speaking practice, so our ${short} classes in Delhi build confidence step by step.`,
    },
    {
      q: `How long does it take to learn ${short}?`,
      a: `It depends on the level you start from, your goal and how often you attend. Each level (${levels}) is taught as its own stage, and our counsellors share the current batch duration, timing and fee for your target on request.`,
    },
    {
      q: `Is learning ${short} useful?`,
      a: `Yes. ${short} opens up study, work and relocation options linked to ${country}, and supports careers in translation, client-facing and international roles. Our ${short} language course also prepares you for ${exam}.`,
    },
    {
      q: `Who can join the ${short} language course in Delhi?`,
      a: `Students, working professionals, job seekers and anyone planning to study or work abroad can join. No prior knowledge is needed for the beginner level.`,
    },
    {
      q: `Can a beginner learn ${short} online?`,
      a: `Yes. Our live online ${short} classes start from the very basics. If you prefer in-person learning, you can also choose offline or hybrid ${short} language classes in Delhi NCR.`,
    },
    {
      q: `Where can I learn ${short} in Delhi NCR?`,
      a: `Langma International offers ${short} language classes in Delhi NCR in online, offline and hybrid formats, including a ${short} speaking course for conversation practice. Request a callback and we will confirm current batches and modes.`,
    },
  ];
}

function getModalCopy(intent, short) {
  const copy = {
    brochure: {
      eyebrow: "Download course brochure",
      title: `Get the ${short} course brochure`,
      text: "Fill in your details and your brochure download will start after your request is submitted.",
      submit: "Submit & download brochure",
    },
    eligibility: {
      eyebrow: "Eligibility & fees",
      title: `Check your ${short} course eligibility`,
      text: "Share your details and our counsellor will confirm your starting level, batch options and course fee.",
      submit: "Check my eligibility & get fees",
    },
    demo: {
      eyebrow: "Free demo class",
      title: `Book a free ${short} demo class`,
      text: "Tell us how to reach you and we will schedule your demo class.",
      submit: "Book my free demo",
    },
    callback: {
      eyebrow: "Quick call back",
      title: "Get a quick call back",
      text: "Leave your number and a counsellor will call you back to answer your questions.",
      submit: "Request call back",
    },
    guide: {
      eyebrow: "Career guide",
      title: `Get the ${short} career guide`,
      text: "Fill in your details and your free career guide PDF will download after your request is submitted.",
      submit: "Submit & download career guide",
    },
  };
  return copy[intent] || copy.brochure;
}

const INTENT_MESSAGES = {
  brochure: "the course brochure",
  eligibility: "eligibility and fee details",
  demo: "a free demo class",
  callback: "a call back",
  guide: "the career guide",
};

function LeadForm({ idPrefix, intent, page, brochureUrl, careerGuideUrl, submitLabel, showName = false, onDone }) {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const mobile = String(formData.get("phone") || "").replace(/\D/g, "");

    if (!/^[0-9]{10,15}$/.test(mobile)) {
      setStatus({ type: "error", message: "Please enter a valid phone number." });
      return;
    }

    formData.set("mobile", mobile);
    if (!String(formData.get("name") || "").trim()) formData.set("name", `${page.short} course lead`);
    formData.set("language", page.short);
    formData.set("service", `${page.short} Language Course`);
    formData.set("type", "Language Course Inquiry");
    formData.set("intent", intent);
    formData.set("currenturl", window.location.href);
    formData.set("message", `I would like ${INTENT_MESSAGES[intent] || "details"} for the ${page.short} language course in Delhi.`);
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE}/api/contact-lead`, { method: "POST", body: formData });
      if (!response.ok) throw new Error("Lead submission failed");
      form.reset();

      if (intent === "brochure" || intent === "guide") {
        const downloadUrl = intent === "guide" ? careerGuideUrl : brochureUrl;
        const documentName = intent === "guide" ? "career guide" : "brochure";
        if (!downloadUrl) {
          setStatus({ type: "success", message: `Your request was received, but this ${documentName} is not configured yet. Our team will share it with you shortly.` });
          return;
        }
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "";
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      }

      onDone?.();
      window.setTimeout(() => window.location.assign("/thank-you?programme=language"), 1000);
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="new-lead-form" onSubmit={handleSubmit} noValidate>
      {showName && (
        <>
          <label htmlFor={`${idPrefix}-name`}>Name</label>
          <input id={`${idPrefix}-name`} name="name" type="text" autoComplete="name" placeholder="Your name" minLength="2" required />
        </>
      )}
      <label htmlFor={`${idPrefix}-email`}>Email address</label>
      <input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" placeholder="Enter email here" required />
      <label htmlFor={`${idPrefix}-phone`}>Phone number</label>
      <div className="new-phone-row">
        <select name="countrycode" aria-label="Country code" defaultValue="+91">
          <option value="+91">IN +91</option>
          <option value="+971">AE +971</option>
          <option value="+1">US +1</option>
          <option value="+44">UK +44</option>
          <option value="+65">SG +65</option>
        </select>
        <input id={`${idPrefix}-phone`} name="phone" type="tel" autoComplete="tel-national" placeholder="98XXXXXXXX" inputMode="tel" required />
      </div>
      <button className="new-form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : submitLabel}</button>
      {status.message && <p className={`new-form-status new-form-status-${status.type}`} role="status">{status.message}</p>}
    </form>
  );
}

export default function NewLanguageLanding({ language }) {
  const page = LANGUAGE_PAGES[language] || LANGUAGE_PAGES.French;
  const brochureUrl = getBrochureDownloadUrl(BROCHURE_URLS[language]);
  const careerGuideUrl = getBrochureDownloadUrl(CAREER_GUIDE_URLS[language]);
  const faqs = buildFaqs(page);
  const testimonialItems = [
    ...page.videos.slice(0, 3).map((video) => ({
      type: "video",
      src: video,
      poster: video.replace("/video/upload/", "/video/upload/so_1/").replace(/\.(mp4|mov)(\?.*)?$/, ".jpg"),
    })),
    ...(page.testimonialImages || []).map((image) => ({ type: "image", ...image })),
  ];

  const stats = { ...STATS, ...(page.stats || {}) };
  const visibleStats = STAT_ITEMS.filter((item) => stats[item.key]);
  const announcementRows = [visibleStats.slice(0, 3), visibleStats.slice(3, 6)].filter((row) => row.length);

  const [modalIntent, setModalIntent] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const lastTriggerRef = useRef(null);

  useEffect(() => {
    setTestimonialIndex(0);
  }, [language]);

  // SEO: page title + meta description targeting the Delhi keywords
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${page.short} Language Course | Langma International`;

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    const previousDescription = meta.getAttribute("content");
    meta.setAttribute(
      "content",
      `${page.short} language course at Langma International, online and offline, with ${page.exam} preparation and job assistance.`
    );

    return () => {
      document.title = previousTitle;
      if (createdMeta) meta.remove();
      else if (previousDescription !== null) meta.setAttribute("content", previousDescription);
    };
  }, [page.short, page.exam]);

  useEffect(() => {
    if (!modalIntent) return undefined;

    const trigger = lastTriggerRef.current;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.querySelector(".new-brochure-modal input")?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") setModalIntent(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus?.();
    };
  }, [modalIntent]);

  function openForm(intent) {
    lastTriggerRef.current = document.activeElement;
    setModalIntent(intent);
  }

  const testimonialCount = testimonialItems.length;
  const showPreviousTestimonial = () => setTestimonialIndex((current) => (current - 1 + testimonialCount) % testimonialCount);
  const showNextTestimonial = () => setTestimonialIndex((current) => (current + 1) % testimonialCount);
  const modalCopy = modalIntent ? getModalCopy(modalIntent, page.short) : null;

  return (
    <main className="new-language-page" style={{ "--page-accent": page.accent }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <a className="new-skip-link" href="#new-main">Skip to content</a>

      {/* Announcement bar */}
      <header className="new-landing-header">
        <a href="/" aria-label="Langma International home"><img src="https://www.langmainternational.com/images/lngm2.png" alt="Langma International" /></a>
        {announcementRows.length > 0 && (
          <div className="new-announce-stats">
            {announcementRows.map((row, rowIndex) => (
              <p key={rowIndex}>{row.map((item) => `${stats[item.key]} ${item.label}`).join(" | ")}</p>
            ))}
          </div>
        )}
        <div className="new-header-actions">
          <button type="button" className="new-header-btn" onClick={() => openForm("demo")}>Book Free Demo</button>
          <button type="button" className="new-header-btn" onClick={() => openForm("callback")}>Get Quick Call Back</button>
        </div>
      </header>

      <div id="new-main">
        {/* Hero */}
        <section className="new-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,18,36,.98) 0%, rgba(5,18,36,.95) 52%, rgba(5,18,36,.90) 100%), url(${page.heroImage})` }}>
          <div className="new-container new-hero-grid">
            <div className="new-hero-copy">
              <div className="new-pill">
                <span className="new-pill-dot" aria-hidden="true" />
                <span>Offline &amp; Online</span>
                {page.modeNote && <span className="new-pill-note">{page.modeNote}</span>}
              </div>
              <p className="new-eyebrow">{page.short} language course · hybrid online and offline learning</p>
              <h1>{page.short} Language Course, Job Assistance Program</h1>
              <p className="new-hero-intro">{page.intro} Learn with Langma International through flexible hybrid online and offline classroom options.</p>
              <ul className="new-checklist">
                <li><span aria-hidden="true">✓</span><span>Cover <strong>{page.levels}</strong> with structured {page.short} lessons</span></li>
                <li><span aria-hidden="true">✓</span><span>Ace <strong>{page.exam}</strong> exam preparation</span></li>
                <li><span aria-hidden="true">✓</span><span>Get <strong>live {page.short} speaking practice</strong> with expert trainers</span></li>
              </ul>
              <div className="new-actions">
                <button className="new-button new-button-primary" type="button" onClick={() => openForm("eligibility")}>Check My Eligibility &amp; Get Fees →</button>
              </div>
              <p className="new-microcopy">Ask for the current level plan, batch timing, mode and course fee.</p>
            </div>
            <div className="new-hero-card new-lead-card">
              <div className="new-form-heading">
                <span>{page.short} course brochure</span>
                <strong>Download Course Brochure</strong>
                <p>Enter your details to receive the {page.short} course brochure.</p>
              </div>
              <LeadForm idPrefix="hero" intent="brochure" page={page} brochureUrl={brochureUrl} submitLabel="Send Me Brochure »" />
            </div>
          </div>
        </section>

        {modalIntent && (
          <div
            className="new-brochure-modal-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setModalIntent(null);
            }}
          >
            <section className="new-brochure-modal" role="dialog" aria-modal="true" aria-labelledby="brochure-modal-title">
              <button className="new-brochure-modal-close" type="button" onClick={() => setModalIntent(null)} aria-label="Close form">×</button>
              <div className="new-form-heading">
                <span>{modalCopy.eyebrow}</span>
                <strong id="brochure-modal-title">{modalCopy.title}</strong>
                <p>{modalCopy.text}</p>
              </div>
              <LeadForm
                key={modalIntent}
                idPrefix={`modal-${modalIntent}`}
                intent={modalIntent}
                page={page}
                brochureUrl={brochureUrl}
                careerGuideUrl={careerGuideUrl}
                submitLabel={modalCopy.submit}
                showName
                onDone={() => setModalIntent(null)}
              />
            </section>
          </div>
        )}

        {/* About */}
        <section className="new-section new-about" id="about">
          <div className="new-container new-two-column">
            <div>
              <p className="new-eyebrow">About the course</p>
              <h2>A clear path to useful {page.short}.</h2>
              <p>{page.about}</p>
              <p>Whether you want to learn {page.short} in Delhi for study, work or travel, Langma International offers {page.short} classes in Delhi and a complete {page.short} language course in Delhi NCR. Choose a {page.short} speaking course in Delhi for conversation practice, or {page.short} language classes in Delhi in online, offline and hybrid batches.</p><p>Our {page.short} course in Delhi and {page.short} speaking classes in Delhi are matched to your level, objective and timeline.</p>
            </div>
            <img src={page.aboutImage} alt={`${page.short} classes Delhi and ${page.short} course Delhi at Langma International`} loading="lazy" />
          </div>
        </section>

        {/* Career paths */}
        {page.careers && (
          <section className="new-section new-careers" id="careers">
            <div className="new-container">
              <p className="new-eyebrow">Why learn {page.short}</p>
              <h2>Where {page.short} can take you.</h2>
              <div className="new-career-grid">
                {page.careers.cards.map((card, index) => (
                  <article className={`new-career-card${index === page.careers.cards.length - 1 ? " is-highlight" : ""}`} key={card.title}>
                    <span className="new-career-icon"><CareerIcon name={card.icon} /></span>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <ul>{card.points.map((point) => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul>
                  </article>
                ))}
              </div>
              <p className="new-career-note">{page.careers.note}</p>
              <div className="new-career-cta">
                <button className="new-button new-button-primary" type="button" onClick={() => openForm("guide")}><DownloadIcon /> Get the Full Career Guide (Free PDF)</button>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="new-section new-testimonials" id="testimonials">
          <div className="new-container new-testimonials-grid">
            <div className="new-testimonials-copy">
              <p className="new-eyebrow">Testimonials &amp; course moments</p>
              <h2>See how learners experience the journey.</h2>
              <p>Explore real classroom moments, learner feedback and language-learning experiences from the Langma community.</p>
              <div className="new-testimonial-note"><strong>{page.short} learning in action</strong><span>Watch, browse and find the learning style that feels right for your goal.</span></div>
            </div>
            <div className="new-testimonial-slider" role="region" aria-roledescription="carousel" aria-label={`${page.short} learner testimonials`}>
              <div className="new-slider-viewport">
                <div className="new-slider-track" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
                  {testimonialItems.map((item, index) => (
                    <article className={`new-media-card ${item.type === "image" ? "new-image-card" : "new-video-card"}`} key={item.src} aria-label={`Testimonial ${index + 1} of ${testimonialCount}`}>
                      {item.type === "image" ? <img src={item.src} alt={item.alt} loading="lazy" /> : <video controls preload="metadata" playsInline src={item.src} poster={item.poster} />}
                      <p>{page.short} learning, practice and progress.</p>
                    </article>
                  ))}
                </div>
              </div>
              <div className="new-slider-controls">
                <button type="button" className="new-slider-arrow" onClick={showPreviousTestimonial} disabled={testimonialCount < 2} aria-label="Previous testimonial">←</button>
                <div className="new-slider-dots" aria-label="Choose testimonial">
                  {testimonialItems.map((item, index) => <button type="button" key={item.src} className={`new-slider-dot${testimonialIndex === index ? " is-active" : ""}`} onClick={() => setTestimonialIndex(index)} aria-label={`Show testimonial ${index + 1}`} aria-current={testimonialIndex === index ? "true" : undefined} />)}
                </div>
                <button type="button" className="new-slider-arrow" onClick={showNextTestimonial} disabled={testimonialCount < 2} aria-label="Next testimonial">→</button>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="new-section new-offer" id="offer">
          <div className="new-container"><p className="new-eyebrow">What you get</p><h2>Everything needed to move forward.</h2><div className="new-offer-grid">{page.offer.map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p>Practical guidance, flexible delivery and support for your specific learning goal.</p></article>)}</div></div>
        </section>

        {/* Why choose us */}
        {visibleStats.length > 0 && (
          <section className="new-section new-why" id="why-us">
            <div className="new-container">
              <p className="new-eyebrow new-center">Why choose us</p>
              <h2 className="new-center">Why Langma International for {page.short} classes in Delhi?</h2>
              <p className="new-section-sub">Structured {page.short} language classes in Delhi NCR with live teaching, speaking practice and counselling support.</p>
              <div className="new-stat-grid">
                {visibleStats.map((item) => (
                  <div className="new-stat" key={item.key}>
                    <div className="new-stat-circle">
                      <strong>{stats[item.key]}</strong>
                      <small>{item.label}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="new-section new-faq" id="faq">
          <div className="new-container new-faq-inner">
            <h2 className="new-center">Questions people actually ask</h2>
            <p className="new-section-sub">Straight answers to what learners ask most about {page.short} courses in Delhi. Anything else, ask your counsellor on the callback.</p>
            <div className="new-faq-list">
              {faqs.map((item) => (
                <details className="new-faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Book demo */}
        <section className="new-section new-demo" id="demo">
          <div className="new-container new-demo-grid">
            <div>
              <p className="new-eyebrow">Free demo class</p>
              <h2>Try a live {page.short} class before you enrol.</h2>
              <p>Book a free demo of our {page.short} language classes in Delhi NCR, online or offline, and start your {page.short} journey with a clear idea of how we teach.</p>
            </div>
            <div className="new-demo-card">
              <div className="new-form-heading">
                <strong>Book a Demo Class, Free!</strong>
              </div>
              <LeadForm idPrefix="demo" intent="demo" page={page} brochureUrl={brochureUrl} submitLabel="Submit →" />
            </div>
          </div>
        </section>

        {/* Quick call back strip */}
        <section className="new-callback-strip" id="contact">
          <div className="new-container new-callback-inner">
            <span>Still have questions?</span>
            <button className="new-button new-button-primary" type="button" onClick={() => openForm("callback")}>Get Quick Call Back</button>
            <span>for answers</span>
          </div>
        </section>
      </div>

      <footer className="new-landing-footer">
        <div className="new-container new-footer-grid">
          <div className="new-footer-brand">
            <img src="https://www.langmainternational.com/images/lngm2.png" alt="Langma International" />
            <p>Language learning, global education and mobility guidance for your next step.</p>
          </div>
          <div className="new-footer-links">
            <strong>Explore</strong>
            <a href="#about">About the course</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#offer">Course offer</a>
            <a href="#faq">FAQs</a>
          </div>
          <div className="new-footer-links">
            <strong>Contact</strong>
            <a href="tel:+919810117094">+91 98101 17094</a>
            <a href="mailto:info@langmainternational.com">info@langmainternational.com</a>
            <a href="/contact">Contact us</a>
          </div>
        </div>
        <div className="new-container new-footer-bottom"><span>© {new Date().getFullYear()} Langma International Pvt. Ltd.</span><a href="/privacy-policy">Privacy Policy</a></div>
      </footer>
    </main>
  );
}
