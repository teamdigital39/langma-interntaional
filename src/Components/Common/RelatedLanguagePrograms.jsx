import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API_BASE from "../../config.js";
import LanguageProgramCarousel from "./LanguageProgramCarousel";

const ROUTE_CONFIG = {
  "/balkan-language": { slug: "online-balkan-languages", language: "Balkan" },
  "/chinese": { slug: "online-chinese-language-course", language: "Mandarin" },
  "/frame": { slug: "online-english-language-course", language: "English" },
  "/french": { slug: "online-french-language-course", language: "French" },
  "/german": { slug: "online-german-language-course", language: "German" },
  "/hind": { slug: "hindi-language-classes", language: "Hindi" },
  "/online-italian-la": { slug: "online-italian-language-course", language: "Italian" },
  "/online-japanese-la": { slug: "online-japanese-language-course", language: "Japanese" },
  "/online-ko": { slug: "online-korean-language-courses", language: "Korean" },
  "/russian": { slug: "online-russian-language-course", language: "Russian" },
  "/persian": { slug: "online-persian-language-course", language: "Persian" },
  "/polish": { slug: "polish-language-course", language: "Polish" },
  "/sanskrit": { slug: "best-sanskrit-language-institute", language: "Sanskrit" },
  "/learn-german-language": { slug: "online-german-language-course", language: "German" },
  "/learn-korean-language": { slug: "online-korean-language-courses", language: "Korean" },
  "/learn-japanese-language": { slug: "online-japanese-language-course", language: "Japanese" },
  "/learn-french-language": { slug: "online-french-language-course", language: "French" },
  "/learn-chinese-language": { slug: "online-chinese-language-course", language: "Mandarin" },
  "/german-language-course": { slug: "online-german-language-course", language: "German" },
  "/korean-language-course": { slug: "online-korean-language-courses", language: "Korean" },
  "/japanese-language-course": { slug: "online-japanese-language-course", language: "Japanese" },
  "/french-language-course": { slug: "online-french-language-course", language: "French" },
  "/chinese-language-course": { slug: "online-chinese-language-course", language: "Mandarin" },
};

const ROUTES_WITH_NATIVE_CAROUSEL = new Set([
  "/balkan-language", "/chinese", "/frame", "/french", "/german", "/hind",
  "/online-italian-la", "/online-japanese-la", "/online-ko", "/russian",
  "/persian", "/polish", "/sanskrit",
]);

const RelatedLanguagePrograms = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/languages`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Languages request failed (${response.status})`);
        return response.json();
      })
      .then((data) => setLanguages(Array.isArray(data.languages) ? data.languages : []))
      .catch((error) => {
        if (error.name !== "AbortError") setLanguages([]);
      });
    return () => controller.abort();
  }, []);

  const isDynamicLanguagePage = languages.some((item) => item.url === path.slice(1));
  const config = ROUTE_CONFIG[path];

  if (
    ROUTES_WITH_NATIVE_CAROUSEL.has(path) ||
    isDynamicLanguagePage ||
    !config ||
    path.startsWith("/course-details/")
  ) return null;
  return <LanguageProgramCarousel language={config.language} apiSlug={config.slug} />;
};

export default RelatedLanguagePrograms;
