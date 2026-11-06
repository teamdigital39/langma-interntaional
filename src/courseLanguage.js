export const ONLINE_ENGLISH_LANGUAGE_SLUG = "online-english-language-course";

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
  const expectedLanguage = language?.trim().toLowerCase();
  if (!expectedLanguage) return courses;

  const coursesWithLanguages = courses.map((course) => ({
    course,
    language: getCourseLanguage(course.course_feature, course.title)?.trim().toLowerCase(),
  }));
  const hasMatchingLanguage = coursesWithLanguages.some(
    ({ language: courseLanguage }) => courseLanguage === expectedLanguage
  );
  const hasOtherLanguage = coursesWithLanguages.some(
    ({ language: courseLanguage }) =>
      courseLanguage && courseLanguage !== expectedLanguage
  );

  if (!hasMatchingLanguage || !hasOtherLanguage) return courses;

  return coursesWithLanguages
    .filter(({ language: courseLanguage }) => courseLanguage === expectedLanguage)
    .map(({ course }) => course);
}
