export const ONLINE_ENGLISH_LANGUAGE_SLUG = "online-english-language-course";

const LANGUAGE_ALIAS_GROUPS = [
  ["chinese", "mandarin", "mandarin chinese"],
  ["farsi", "persian", "persian farsi"],
  ["russian", "russain"],
  ["dari pashto", "dari", "pashto"],
  ["indonesian", "bahasa indonesia"],
  ["balkan", "balkan languages"],
  ["baltic", "baltic languages"],
  ["nordic", "nordic languages"],
  ["indian regional", "indian regional languages", "regional languages"],
];

const INDIAN_REGIONAL_LANGUAGE_NAMES = [
  "assamese", "bengali", "gujarati", "kashmiri", "konkani", "maithali",
  "malayalam", "marathi", "odia", "oriya", "punjabi", "tamil", "telugu",
];

function normalizeLanguage(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getLanguageVariants(language) {
  const normalized = normalizeLanguage(language);
  return (
    LANGUAGE_ALIAS_GROUPS.find((aliases) =>
      aliases.some((alias) => normalizeLanguage(alias) === normalized)
    ) || [normalized]
  ).map(normalizeLanguage);
}

function containsPhrase(text, phrase) {
  const normalizedText = ` ${normalizeLanguage(text)} `;
  const normalizedPhrase = ` ${normalizeLanguage(phrase)} `;
  return normalizedPhrase.length > 2 && normalizedText.includes(normalizedPhrase);
}

function titleMatchesLanguage(title, language) {
  if (getLanguageVariants(language).some((variant) => containsPhrase(title, variant))) {
    return true;
  }

  if (normalizeLanguage(language) === "indian regional") {
    return INDIAN_REGIONAL_LANGUAGE_NAMES.some((name) => containsPhrase(title, name));
  }

  return false;
}

export function getCourseLanguage(courseFeature, courseTitle = "unknown course") {
  if (!courseFeature) return null;

  let feature;
  if (typeof courseFeature === "string") {
    try {
      feature = JSON.parse(courseFeature);
    } catch (error) {
      console.error(`Unable to parse course metadata for "${courseTitle}".`, error);
      return null;
    }
  } else if (typeof courseFeature === "object") {
    feature = courseFeature;
  }

  return typeof feature?.language === "string" ? feature.language : null;
}

// Only return courses whose declared language matches, or whose title explicitly
// names the language when metadata is absent. Missing metadata never means “all”.
export function filterCoursesByLanguage(courses, language) {
  if (!Array.isArray(courses)) return [];
  const expectedLanguage = normalizeLanguage(language);
  if (!expectedLanguage) return [];

  const expectedVariants = getLanguageVariants(expectedLanguage);
  return courses.filter((course) => {
    const declaredLanguage = getCourseLanguage(course.course_feature, course.title);
    if (declaredLanguage) {
      const normalizedDeclared = normalizeLanguage(declaredLanguage);
      if (expectedLanguage === "indian regional") {
        return INDIAN_REGIONAL_LANGUAGE_NAMES.some((name) =>
          getLanguageVariants(name).includes(normalizedDeclared)
        );
      }
      return expectedVariants.includes(normalizedDeclared);
    }
    return titleMatchesLanguage(course.title, expectedLanguage);
  });
}
