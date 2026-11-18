const overseasWorkArticle = Object.freeze({
  slug: "overseas-jobs-vs-remote-work-career-guidance-in-delhi",
  apiSlug: "overseas-jobs-or-remote-work:-which-fits-your-career-in-delhi?",
  title: "Overseas jobs or remote work: which fits your career in Delhi?",
  description:
    "Compare overseas jobs with India-based remote work. Langma International in Delhi helps you assess career fit, language preparation and work-visa readiness.",
  image:
    "https://api.langmainternational.com/public/normal_images/1794989066.jpg",
  contentUrl:
    "/blog-content/overseas-jobs-vs-remote-work-career-guidance-in-delhi.html",
});

const FALLBACKS_BY_SLUG = Object.freeze({
  [overseasWorkArticle.slug]: overseasWorkArticle,
  [overseasWorkArticle.apiSlug]: overseasWorkArticle,
  [overseasWorkArticle.apiSlug.slice(0, -1)]: overseasWorkArticle,
  "overseas-jobs-or-remote-work-which-fits-your-career-in-delhi":
    overseasWorkArticle,
});

export function getLocalBlogFallback(slug = "") {
  const value = String(slug || "").replace(/^\/+|\/+$/g, "");
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Keep the raw slug when a legacy URL contains malformed encoding.
  }
  return FALLBACKS_BY_SLUG[decoded] || FALLBACKS_BY_SLUG[value] || null;
}

export function getBlogPublicSlug(slug = "") {
  const value = String(slug || "");
  const localFallback = getLocalBlogFallback(value);
  if (localFallback) return localFallback.slug;
  try {
    const decoded = decodeURIComponent(value);
    if (
      decoded === "jlpt-vs-nat-test:-differences,-exam-pattern,-passing-scores-and-registration-in-india"
    ) {
      return "jlpt-vs-nat-test-differences-exam-pattern-passing-scores-registration-india";
    }
  } catch {
    // Keep the current slug when a legacy URL cannot be decoded.
  }
  return value;
}

export function getBlogArticlePath(slug = "") {
  return `/blog/${getBlogPublicSlug(slug)}/`;
}
