export const ONLINE_ENGLISH_LANGUAGE_SLUG = "online-english-language-course";

const LANGUAGE_ALIAS_GROUPS = [
  ["chinese", "mandarin", "mandarin chinese"],
  ["farsi", "persian", "persian farsi"],
  ["russian", "russain"],
];

function normalizeLanguage(value) {
  return value?.trim().toLowerCase().replace(/[\s_-]+/g, " ");
}

function getLanguageVariants(language) {
  const normalized = normalizeLanguage(language);
  return (
    LANGUAGE_ALIAS_GROUPS.find((aliases) => aliases.includes(normalized)) || [
      normalized,
    ]
  );
}

function titleMatchesLanguage(title, language) {
  const titleWords = normalizeLanguage(title)?.split(/[^a-z0-9]+/).filter(Boolean);

  if (!titleWords) return false;

  return getLanguageVariants(language).some((variant) => {
    const languageWords = variant.split(/[^a-z0-9]+/).filter(Boolean);
    return titleWords.some((_, index) =>
      languageWords.every(
        (word, wordIndex) => titleWords[index + wordIndex] === word
      )
    );
  });
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

export function filterCoursesByLanguage(courses, language) {
  const expectedLanguage = normalizeLanguage(language);
  if (!expectedLanguage) return courses;

  const coursesWithLanguages = courses.map((course) => ({
    course,
    language: normalizeLanguage(
      getCourseLanguage(course.course_feature, course.title)
    ),
  }));
  const hasOtherLanguage = coursesWithLanguages.some(
    ({ language: courseLanguage }) =>
      courseLanguage &&
      !getLanguageVariants(expectedLanguage).includes(courseLanguage)
  );

  if (!hasOtherLanguage) return courses;

  return coursesWithLanguages
    .filter(({ course, language: courseLanguage }) => {
      if (courseLanguage) {
        return getLanguageVariants(expectedLanguage).includes(courseLanguage);
      }

      return titleMatchesLanguage(course.title, expectedLanguage);
    })
    .map(({ course }) => course);
}
