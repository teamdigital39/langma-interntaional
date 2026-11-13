let languageCoursesRequest;
let languageCoursesExpiresAt = 0;

export async function fetchAllLanguageCourses(apiBase) {
  if (languageCoursesRequest && Date.now() < languageCoursesExpiresAt) {
    return languageCoursesRequest;
  }

  languageCoursesExpiresAt = Date.now() + 5 * 60 * 1000;
  languageCoursesRequest = (async () => {
    const response = await fetch(`${apiBase}/api/languages`);
    if (!response.ok) throw new Error(`Language list request failed (${response.status})`);
    const data = await response.json();
    if (!data.status || !Array.isArray(data.languages)) {
      throw new Error(data.message || 'Language list could not be loaded');
    }

    const pages = data.languages.filter((language) => language.url);
    const coursesById = new Map();
    let failedPages = 0;

    for (let index = 0; index < pages.length; index += 6) {
      const batch = pages.slice(index, index + 6);
      const results = await Promise.allSettled(batch.map(async (language) => {
        const pageResponse = await fetch(
          `${apiBase}/api/language-page/${encodeURIComponent(language.url)}`
        );
        if (!pageResponse.ok) throw new Error(`Course request failed for ${language.url} (${pageResponse.status})`);
        const page = await pageResponse.json();
        if (!page.status || !Array.isArray(page.details)) {
          throw new Error(page.message || `Courses could not be loaded for ${language.url}`);
        }
        return page.details;
      }));

      for (const result of results) {
        if (result.status === 'rejected') {
          failedPages += 1;
          console.error('Language courses could not be loaded', result.reason);
          continue;
        }
        for (const course of result.value) {
          const key = course.id ?? course.slug;
          if (key !== undefined && !coursesById.has(key)) coursesById.set(key, course);
        }
      }
    }

    if (failedPages === pages.length) throw new Error('Courses could not be loaded from any language page');
    return Array.from(coursesById.values());
  })().catch((error) => {
    languageCoursesRequest = undefined;
    languageCoursesExpiresAt = 0;
    throw error;
  });

  return languageCoursesRequest;
}
