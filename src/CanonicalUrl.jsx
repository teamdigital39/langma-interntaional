import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.langmainternational.com";

export default function CanonicalUrl() {
  const location = useLocation();

  useEffect(() => {
    // Remove the basename from the pathname if necessary
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    let pathname = location.pathname;

    if (baseUrl && baseUrl !== "/" && pathname.startsWith(baseUrl)) {
      pathname = pathname.slice(baseUrl.length);
    }

    if (pathname !== "/") {
      pathname = pathname.replace(/\/+$/, "");
    }

    const canonicalUrl = `${SITE_URL}${pathname || "/"}`;

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [location.pathname]);

  return null;
}
