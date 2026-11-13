import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  API_BASE,
  LAST_UPDATED,
  SITE_URL,
  canonicalPath,
  canonicalUrl,
  fallbackMetadata,
  languagePath,
  setRouteJsonLd,
  upsertLink,
  upsertMeta,
} from "./seo";
import { BLOG_CONTENT_SLUG_ALIASES } from "./legacyRouteRedirects.js";
import { getCourseLanguage } from "./courseLanguage.js";
import { fetchAllLanguageCourses } from "./languageCourses.js";

function applyMetadata(metadata, pathname) {
  const url = canonicalUrl(pathname);
  const isCourse =
    Boolean(metadata.courseName) || canonicalPath(pathname).startsWith("/course-details/");
  const image = metadata.image || `${SITE_URL}/images/learnlangma.jpg`;

  document.title = metadata.title;
  upsertLink("canonical", url);
  upsertMeta("name", "description", metadata.description);
  upsertMeta(
    "name",
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  );
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "article:modified_time", LAST_UPDATED);
  upsertMeta("property", "og:title", metadata.title);
  upsertMeta("property", "og:description", metadata.description);
  upsertMeta("property", "og:type", isCourse ? "article" : "website");
  upsertMeta("property", "og:site_name", "Langma International");
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:image:alt", metadata.h1 || metadata.title);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", metadata.title);
  upsertMeta("name", "twitter:description", metadata.description);
  upsertMeta("name", "twitter:image", image);
  setRouteJsonLd(metadata, url, isCourse);
}

function keepSinglePageH1(root) {
  root.querySelectorAll("h1").forEach((heading, index) => {
    if (index === 0) return;

    const replacement = document.createElement("h2");
    for (const attribute of heading.attributes) {
      replacement.setAttribute(attribute.name, attribute.value);
    }
    replacement.replaceChildren(...heading.childNodes);
    heading.replaceWith(replacement);
  });
}

export default function CanonicalUrl() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return undefined;

    const enforceSingleH1 = () => keepSinglePageH1(root);
    enforceSingleH1();

    const observer = new MutationObserver(enforceSingleH1);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const path = canonicalPath(pathname);
    applyMetadata(fallbackMetadata(path), path);

    async function loadRouteMetadata() {
      try {
        if (path.startsWith("/course-details/")) {
          const [, , languageSlug, courseSlug] = path.split("/");
          if (!languageSlug || !courseSlug) return;
          let data;
          try {
            const response = await fetch(
              `${API_BASE}/api/language-page/${encodeURIComponent(languageSlug)}`,
              { signal: controller.signal }
            );
            if (!response.ok) {
              throw new Error(
                `Language page request failed (${response.status})`
              );
            }
            data = await response.json();
            if (!data?.status) {
              throw new Error(
                data?.message || "Language page data is unavailable"
              );
            }
          } catch (error) {
            if (controller.signal.aborted) return;
            console.error("Language page metadata could not be loaded", error);
          }

          let course = data?.details?.find((item) => item.slug === courseSlug);
          if (!course) {
            const allCourses = await fetchAllLanguageCourses(API_BASE);
            course = allCourses.find((item) => item.slug === courseSlug);
          }
          if (course) {
            const languageName =
              getCourseLanguage(course.course_feature, course.title) ||
              data?.language?.title ||
              data?.page?.title ||
              languageSlug.replaceAll("-", " ");
            applyMetadata(
              {
              title: `${course.title} ${languageName} Course | Langma International`,
              description: `Explore ${course.title} in ${languageName} with structured language training and practical guidance from Langma International.`,
              h1: course.title,
              courseName: `${course.title} ${languageName}`,
              image: course.banner || course.image,
              },
              path
            );
          }
          return;
        }

        if (path.startsWith("/blog/")) {
          const slug = path.split("/").filter(Boolean).at(-1);
          if (!slug) return;
          const contentSlug = BLOG_CONTENT_SLUG_ALIASES[slug] || slug;
          const response = await fetch(
            `${API_BASE}/api/blog-detail/${encodeURIComponent(contentSlug)}`,
            { signal: controller.signal }
          );
          const result = await response.json();
          const blog = result?.data;
          if (blog?.title) {
            applyMetadata(
              {
                title: `${blog.title} | Langma International`,
                description:
                  blog.description ||
                  blog.excerpt ||
                  `Read ${blog.title} for practical insights from Langma International.`,
                h1: blog.title,
                image: blog.image,
              },
              path
            );
          }
          return;
        }

        const slug = languagePath(path);
        if (!slug) return;
        const response = await fetch(
          `${API_BASE}/api/language-page/${encodeURIComponent(slug)}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (data?.status && data.page) {
          const languageName = data.page.title;
          const baseTitle =
            data.page.seo_title || `${languageName} Language Course | Langma`;
          const title = baseTitle.toLowerCase().includes(languageName.toLowerCase())
            ? baseTitle
            : `${baseTitle} | ${languageName}`;
          const baseDescription =
            data.page.seo_description ||
            `Learn ${languageName} with live online and classroom courses from Langma International.`;
          const languageDescription = `Learn ${languageName} with Langma International.`;
          const description =
            baseDescription.toLowerCase().includes(languageName.toLowerCase())
              ? baseDescription
              : `${baseDescription.slice(0, 160 - languageDescription.length - 1).trim()} ${languageDescription}`;
          applyMetadata(
            {
            title,
            description,
            h1: `Learn ${languageName} with Langma`,
            image: data.page.banner || data.page.image,
            },
            path
          );
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.warn("Route SEO metadata could not be loaded", error);
        }
      }
    }

    loadRouteMetadata();
    return () => controller.abort();
  }, [pathname]);

  return null;
}
