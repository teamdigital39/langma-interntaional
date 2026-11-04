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
