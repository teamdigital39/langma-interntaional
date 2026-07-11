const BADGE = "Since 2012 · 50+ Languages";
const CTA = "Book Free Assessment";
const TRUST_DEFAULT = ["Certified Trainers", "Live Interactive Classes"];

function parseTitleLine1(line) {
  const match = line?.match(/^(Master|Learn)\s+(.+)\.$/i);
  if (!match) return { prefix: "Learn", suffix: "." };
  return { prefix: match[1], suffix: "." };
}

function buildEntry(languageName, titleLine1, titleLine2, description, trustPoint3) {
  const { prefix, suffix } = parseTitleLine1(titleLine1);
  return {
    languageName,
    titlePrefix: prefix,
    titleSuffix: suffix,
    titleLine2,
    description,
    trustPoints: [...TRUST_DEFAULT, trustPoint3],
  };
}

export const LANGUAGE_HERO_CONTENT = {
  arabic: buildEntry(
    "Arabic",
    "Master Arabic.",
    "Speak the Language of Global Business.",
    "Arabic opens doors across trade, diplomacy, and media spanning the Gulf to North Africa. Certified trainers guide professionals and students toward real fluency for business, embassy pathways, and everyday confidence — blending Modern Standard Arabic with practical spoken dialects.",
    "CEFR Pathway"
  ),
  armenian: buildEntry(
    "Armenian",
    "Learn Armenian.",
    "Carry a 1,600-Year-Old Alphabet Forward.",
    "Armenian carries one of the world's oldest living alphabets and a culture rich in literature, faith, and craftsmanship. Diaspora families, heritage learners, and travelers build genuine fluency — connecting generations and opening pathways to community and business.",
    "CEFR Pathway"
  ),
  "balkan languages": buildEntry(
    "Balkan Languages",
    "Learn Balkan Languages.",
    "One Region, Many Voices.",
    "From Belgrade to Sarajevo to Skopje, the Balkans hold a mosaic of closely related languages and cultures. Practical fluency for professionals, migrants, and travelers — supporting business ties, family connection, and confident everyday communication.",
    "CEFR Pathway"
  ),
  "baltic languages": buildEntry(
    "Baltic Languages",
    "Learn Baltic Languages.",
    "Some of Europe's Oldest Living Tongues.",
    "Lithuanian and Latvian preserve linguistic roots older than most living European languages, alongside fast-growing tech economies. Fluency for careers, relocation, and genuine connection to Baltic heritage.",
    "CEFR Pathway"
  ),
  burmese: buildEntry(
    "Burmese",
    "Learn Burmese.",
    "Understand Myanmar, Beyond the Headlines.",
    "Burmese carries a distinct script and a culture shaped by tradition, trade, and community. Real conversational fluency for humanitarian work, regional business, and deeper cultural understanding.",
    "CEFR Pathway"
  ),
  "dari & pashto": buildEntry(
    "Dari & Pashto",
    "Learn Dari & Pashto.",
    "Two Languages, One Cultural Bridge.",
    "Dari and Pashto together shape daily life, business, and diplomacy across Afghanistan and its diaspora. Practical fluency for humanitarian work, migration, and meaningful cross-cultural communication.",
    "CEFR Pathway"
  ),
  english: buildEntry(
    "English",
    "Master English.",
    "The Language That Opens Every Room.",
    "English remains the working language of global business, higher education, and international diplomacy. Confident, fluent communicators — from IELTS and career-track professionals to migrants and students.",
    "IELTS Pathway"
  ),
  french: buildEntry(
    "French",
    "Master French.",
    "Where Elegance Meets Ambition.",
    "French shapes fashion houses, diplomatic tables, and boardrooms across five continents. Fluency for study in France or Canada, careers in luxury and business, and genuine cultural confidence.",
    "DELF/DALF Pathway"
  ),
  german: buildEntry(
    "German",
    "Master German.",
    "Build Your Future in Europe's Engine Room.",
    "German drives Europe's largest economy, its engineering excellence, and its universities. Study visas, Ausbildung pathways, and corporate careers — CEFR-aligned training builds precision and workplace-ready fluency.",
    "Goethe-Zertifikat Pathway"
  ),
  hebrew: buildEntry(
    "Hebrew",
    "Learn Hebrew.",
    "A Revived Language, A Living Nation.",
    "Hebrew's revival from ancient text to daily spoken language is one of history's most remarkable linguistic stories. Real fluency for relocation, faith study, business, and confident daily life in Israel.",
    "CEFR Pathway"
  ),
  hindi: buildEntry(
    "Hindi",
    "Learn Hindi.",
    "Connect With a Billion Conversations.",
    "Hindi links business, cinema, and everyday life across one of the world's largest economies. Genuine spoken fluency for careers, family connection, travel, and confident participation in India's culture.",
    "CEFR Pathway"
  ),
  "indian regional languages": buildEntry(
    "Indian Regional Languages",
    "Learn Indian Regional Languages.",
    "Twenty-Two Voices, One Invitation.",
    "From Tamil to Bengali, Marathi to Telugu, India's regional languages carry distinct literatures and business cultures. Fluency in the specific regional language you need — for careers, relationships, and local belonging.",
    "CEFR Pathway"
  ),
  indonesian: buildEntry(
    "Indonesian",
    "Learn Indonesian.",
    "Speak the Language of Southeast Asia's Giant.",
    "Bahasa Indonesia connects one of the world's largest economies and most populous nations. Practical fluency for corporate relocation, trade partnerships, and everyday confidence across Indonesia's islands.",
    "CEFR Pathway"
  ),
  italian: buildEntry(
    "Italian",
    "Master Italian.",
    "Design, Cuisine, and Conversation.",
    "Italian shapes design studios, kitchens, and boardrooms with equal elegance. Real fluency for study in Italy, careers in design and culinary arts, and speaking a beautifully expressive language.",
    "CILS Pathway"
  ),
  japanese: buildEntry(
    "Japanese",
    "Master Japanese.",
    "Think Beyond Translation.",
    "Japanese opens careers in engineering, technology, and precision manufacturing alongside a culture of deep craftsmanship. Structured training in speaking, reading, and writing — supporting JLPT preparation and corporate assignments.",
    "JLPT Pathway"
  ),
  korean: buildEntry(
    "Korean",
    "Learn Korean.",
    "Experience Modern Korea, Fluently.",
    "Korean powers a fast-growing world of technology, entertainment, and global business. Conversational and professional fluency — from TOPIK preparation to corporate assignments.",
    "TOPIK Pathway"
  ),
  mandarin: buildEntry(
    "Mandarin",
    "Master Mandarin.",
    "The Language Powering Global Business.",
    "Mandarin connects the world's most spoken native language to unmatched business and manufacturing influence. Real fluency in speaking, tones, and characters — supporting HSK preparation and corporate roles.",
    "HSK Pathway"
  ),
  mongolian: buildEntry(
    "Mongolian",
    "Learn Mongolian.",
    "Language of the Open Steppe.",
    "Mongolian carries a nomadic heritage alongside a growing mining, trade, and diplomatic presence in Asia. Genuine fluency for business ties, academic exchange, and authentic cultural connection.",
    "CEFR Pathway"
  ),
  "nordic languages": buildEntry(
    "Nordic Languages",
    "Learn Nordic Languages.",
    "Clarity, Design, and Quiet Confidence.",
    "Swedish, Norwegian, and Danish open doors across some of the world's most innovative economies. Fluency for careers, integration, and daily life — training rooted in clarity and genuine cultural understanding.",
    "CEFR Pathway"
  ),
  persian: buildEntry(
    "Persian",
    "Learn Persian.",
    "Poetry, Trade, and a Living Empire's Legacy.",
    "Persian carries centuries of poetry, scholarship, and regional influence across Iran and Central Asia. Genuine fluency connecting family roots, literary tradition, and modern opportunities in trade and academia.",
    "CEFR Pathway"
  ),
  polish: buildEntry(
    "Polish",
    "Learn Polish.",
    "Resilience, Industry, and Opportunity.",
    "Polish anchors one of Central Europe's fastest-growing economies and a proud cultural heritage. Fluency for work permits, higher education, and daily life — with practical, CEFR-aligned training.",
    "CEFR Pathway"
  ),
  portuguese: buildEntry(
    "Portuguese",
    "Learn Portuguese.",
    "From Lisbon's Coast to Sao Paulo's Skyline.",
    "Portuguese connects Europe, South America, and Africa through business, culture, and coastline. Fluency for careers, relocation, and study across Portugal and Brazil.",
    "CEFR Pathway"
  ),
  russian: buildEntry(
    "Russian",
    "Master Russian.",
    "Science, Literature, and Global Reach.",
    "Russian carries a legacy of scientific achievement, classical literature, and business influence. Genuine fluency for careers, academic exchange, and confident cultural engagement.",
    "TORFL Pathway"
  ),
  sanskrit: buildEntry(
    "Sanskrit",
    "Learn Sanskrit.",
    "The Root Language of Thought and Text.",
    "Sanskrit underlies centuries of Indian philosophy, science, and spiritual literature. Reading and recitation fluency for academic study, spiritual practice, and cultural preservation.",
    "CEFR Pathway"
  ),
  sinhala: buildEntry(
    "Sinhala",
    "Learn Sinhala.",
    "Connect With the Heart of Sri Lanka.",
    "Sinhala carries Sri Lanka's culture, commerce, and daily rhythm across a distinctive script. Practical fluency for business, family connection, and confident everyday life across the island.",
    "CEFR Pathway"
  ),
  spanish: buildEntry(
    "Spanish",
    "Master Spanish.",
    "Speak Across Two Continents.",
    "Spanish connects business, travel, and culture from Madrid to Mexico City to Buenos Aires. Real conversational fluency for careers, migration, education, and speaking one of the world's most widely spoken languages.",
    "DELE Pathway"
  ),
  swahili: buildEntry(
    "Swahili",
    "Learn Swahili.",
    "The Voice of East Africa's Future.",
    "Swahili unites trade, tourism, and diplomacy across East and Central Africa as a true lingua franca. Practical fluency for careers, cross-border business, and authentic connection.",
    "CEFR Pathway"
  ),
  thai: buildEntry(
    "Thai",
    "Learn Thai.",
    "Hospitality, Business, and Everyday Warmth.",
    "Thai carries a culture of warmth, craftsmanship, and a thriving hospitality and business economy. Real conversational fluency for careers in tourism and trade, relocation, and everyday connection.",
    "CEFR Pathway"
  ),
  urdu: buildEntry(
    "Urdu",
    "Learn Urdu.",
    "Poetry, Precision, and Everyday Grace.",
    "Urdu carries centuries of poetry and refined expression alongside daily life across Pakistan and South Asian communities worldwide. Genuine fluency for family connection, migration, and appreciating a literary language.",
    "CEFR Pathway"
  ),
  vietnamese: buildEntry(
    "Vietnamese",
    "Learn Vietnamese.",
    "Speak the Language of a Rising Economy.",
    "Vietnamese connects one of Asia's fastest-growing economies with a culture of resilience and craftsmanship. Practical fluency for careers in manufacturing and trade, relocation, and confident communication.",
    "CEFR Pathway"
  ),
  dutch: buildEntry(
    "Dutch",
    "Master Dutch.",
    "Connect with the Netherlands.",
    "Learn Dutch through immersive, CEFR-aligned training delivered by experienced language professionals. Whether you're preparing for career opportunities, higher education, business communication, migration, or everyday conversations, Langma International helps you build practical fluency with confidence.",
    "CEFR A1–C2 Pathway"
  ),
};

const SLUG_TO_HERO_KEY = {
  "arabic-language-online-course": "arabic",
  "armenia-language-program": "armenian",
  "online-balkan-languages": "balkan languages",
  "online-baltic-languages-course": "baltic languages",
  "online-burmese-language-course": "burmese",
  "dari-pashto-language-online-course": "dari & pashto",
  "dutch-language-course": "dutch",
  "online-english-language-course": "english",
  "online-french-language-course": "french",
  "online-german-language-course": "german",
  "hebrew-language-course": "hebrew",
  "hindi-language-classes": "hindi",
  "best-institute-for-regional-languages": "indian regional languages",
  "indonesian-language-course": "indonesian",
  "online-italian-language-course": "italian",
  "online-japanese-language-course": "japanese",
  "online-korean-language-courses": "korean",
  "online-chinese-language-course": "mandarin",
  "online-mongolian-classes": "mongolian",
  "best-nordic-languages-course": "nordic languages",
  "online-persian-language-course": "persian",
  "polish-language-course": "polish",
  "online-portuguese-classes": "portuguese",
  "online-russian-language-course": "russian",
  "best-sanskrit-language-institute": "sanskrit",
  "sinhala-language-course": "sinhala",
  "online-spanish-language-courses": "spanish",
  "swahili-language-courses": "swahili",
  "thai-language-courses": "thai",
  "online-urdu-language-course": "urdu",
  "vietnamese-language-courses": "vietnamese",
};

const TITLE_ALIASES = {
  arabic: "arabic",
  armenian: "armenian",
  balkan: "balkan languages",
  "balkan language": "balkan languages",
  "balkan languages": "balkan languages",
  baltic: "baltic languages",
  "baltic languages": "baltic languages",
  burmese: "burmese",
  "dari/pashto": "dari & pashto",
  "dari & pashto": "dari & pashto",
  "dari and pashto": "dari & pashto",
  dutch: "dutch",
  english: "english",
  french: "french",
  german: "german",
  hebrew: "hebrew",
  hindi: "hindi",
  "indian regional": "indian regional languages",
  "indian regional languages": "indian regional languages",
  indonesian: "indonesian",
  "bahasa indonesia": "indonesian",
  italian: "italian",
  japanese: "japanese",
  korean: "korean",
  mandarin: "mandarin",
  chinese: "mandarin",
  "chinese (mandarin)": "mandarin",
  "mandarin chinese": "mandarin",
  "chinese language": "mandarin",
  mongolian: "mongolian",
  nordic: "nordic languages",
  "nordic languages": "nordic languages",
  persian: "persian",
  polish: "polish",
  portuguese: "portuguese",
  russian: "russian",
  sanskrit: "sanskrit",
  sinhala: "sinhala",
  spanish: "spanish",
  swahili: "swahili",
  thai: "thai",
  urdu: "urdu",
  vietnamese: "vietnamese",
};

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function applyDynamicTitle(text, sheetLanguageName, dynamicTitle) {
  if (!text) return "";
  const title = dynamicTitle || sheetLanguageName;
  let result = text;
  result = result.replaceAll(sheetLanguageName, title);
  if (sheetLanguageName === "Dari & Pashto") {
    result = result.replaceAll("Dari and Pashto", title);
  }
  if (sheetLanguageName === "Dutch") {
    result = result.replace(/^Learn Dutch\b/, `Learn ${title}`);
  }
  return result;
}

export function getLanguageHeroContent(title, slug) {
  if (slug && SLUG_TO_HERO_KEY[slug]) {
    const entry = LANGUAGE_HERO_CONTENT[SLUG_TO_HERO_KEY[slug]];
    if (entry) return { ...entry, badge: BADGE, cta: CTA };
  }

  const key = normalizeKey(title);
  const resolvedKey = TITLE_ALIASES[key] || key;
  const entry = LANGUAGE_HERO_CONTENT[resolvedKey];
  if (!entry) return null;
  return { ...entry, badge: BADGE, cta: CTA };
}

export function getHeroDescription(entry, dynamicTitle) {
  return applyDynamicTitle(entry.description, entry.languageName, dynamicTitle);
}

export { BADGE, CTA };
