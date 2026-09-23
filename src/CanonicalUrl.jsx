import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  API_BASE,
  SITE_URL,
  canonicalPath,
  canonicalUrl,
  fallbackMetadata,
  languagePath,
  setRouteJsonLd,
  upsertLink,
  upsertMeta,
} from "./seo";

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

export default function CanonicalUrl() {
  const { pathname } = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const path = canonicalPath(pathname);
    const baseMetadata = fallbackMetadata(path);

    applyMetadata(baseMetadata, path);

    async function loadRouteMetadata() {
      try {
        if (path.startsWith("/course-details/")) {
          const [, , languageSlug, courseSlug] = path.split("/");
          if (!languageSlug || !courseSlug) return;
          const response = await fetch(
            `${API_BASE}/api/language-page/${encodeURIComponent(languageSlug)}`,
            { signal: controller.signal }
          );
          const data = await response.json();
          const course = data?.details?.find((item) => item.slug === courseSlug);
          if (course) {
            applyMetadata(
              {
                title: `${course.title} | Langma International`,
                description: `Explore ${course.title.toLowerCase()} with practical language training and expert guidance from Langma International.`,
                h1: course.title,
                courseName: course.title,
                image: course.banner || course.image,
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
          applyMetadata(
            {
              title: data.page.seo_title || `${data.page.title} Language Course | Langma`,
              description:
                data.page.seo_description ||
                `Learn ${data.page.title} with live online and classroom courses from Langma International.`,
              h1: `Learn ${data.page.title} with Langma`,
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
