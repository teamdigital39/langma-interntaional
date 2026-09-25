export const SITE_URL = "https://www.langmainternational.com";
export const API_BASE = "https://api.langmainternational.com";

export const HOMEPAGE_METADATA = {
  title: "Foreign Language Courses, Study Abroad, Overseas Jobs & PR",
  description:
    "Learn 50+ foreign languages online or in Delhi with Langma International. Get expert language training, exam preparation, study abroad guidance, overseas career support, and global mobility solutions.",
  h1: "Foreign Language Courses, Study Abroad & Global Careers",
  image: `${SITE_URL}/images/learnlangma.jpg`,
};

const STANDALONE_LANDING_METADATA = {
  "/learn-german-language": {
    title: "German Language Course in Delhi & Online | A1–C2 | Langma",
    description:
      "Learn German from A1 to C2 in Delhi or online with Langma International. Explore structured courses, exam preparation, and practical language training.",
    h1: "German Language Course in Delhi & Online",
    courseName: "German Language Course",
  },
  "/learn-korean-language": {
    title: "Korean Language Course in Delhi & Online | TOPIK | Langma",
    description:
      "Learn Korean in Delhi or online with structured language courses, TOPIK preparation, and practical training from Langma International.",
    h1: "Korean Language Course in Delhi & Online",
    courseName: "Korean Language Course",
  },
  "/learn-japanese-language": {
    title: "Japanese Language Course in Delhi & Online | JLPT | Langma",
    description:
      "Learn Japanese in Delhi or online with structured courses, JLPT preparation, and practical language training from Langma International.",
    h1: "Japanese Language Course in Delhi & Online",
    courseName: "Japanese Language Course",
  },
  "/translation-services": {
    title: "Translation Services in Delhi & Online | Langma International",
    description:
      "Get professional translation and language support from Langma International for documents, business, education, and multilingual communication.",
    h1: "Translation Services in Delhi & Online",
  },
  "/learn-french-language": {
    title: "French Language Course in Delhi & Online | Langma",
    description:
      "Learn French in Delhi or online with structured courses, exam preparation, and practical language training from Langma International.",
    h1: "French Language Course in Delhi & Online",
    courseName: "French Language Course",
  },
  "/learn-chinese-language": {
    title: "Chinese Language Course in Delhi & Online | HSK | Langma",
    description:
      "Learn Chinese in Delhi or online with structured courses, HSK preparation, and practical language training from Langma International.",
    h1: "Chinese Language Course in Delhi & Online",
    courseName: "Chinese Language Course",
  },
};

const STATIC_METADATA = {
  ...STANDALONE_LANDING_METADATA,
  "/": HOMEPAGE_METADATA,
  "/languages": {
    title: "International Language Courses Online & in Delhi | Langma",
    description:
      "Explore 50+ language courses with live online and classroom training from Langma International.",
    h1: "International Language Courses",
  },
  "/study-abroad": {
    title: "Study Abroad Guidance, Admissions & Visa Support | Langma",
    description:
      "Get expert study-abroad guidance, university admissions support, scholarships, and student visa assistance from Langma International.",
    h1: "Study Abroad with Expert Guidance",
  },
  "/work-abroad": {
    title: "Work Abroad Guidance & International Career Support | Langma",
    description:
      "Explore international career opportunities with practical language, application, destination, and work-abroad guidance from Langma International.",
    h1: "Build Your International Career with Confidence",
  },
  "/editorial-policy": {
    title: "Editorial Policy | Langma International",
    description: "Read Langma International's editorial policy for language learning, study abroad, careers, and global mobility content.",
    h1: "Editorial Policy",
  },
  "/contact": {
    title: "Contact Langma International | Language & Global Opportunity Support",
    description:
      "Contact Langma International for language courses, study-abroad guidance, work-abroad support, and global mobility services.",
    h1: "Let's Get Connected",
  },
  "/blog": {
    title: "Language Learning, Study Abroad & Global Opportunity Blog | Langma",
    description:
      "Read practical insights about language learning, study abroad, careers, culture, and international opportunities from Langma International.",
    h1: "Langma International Blog",
  },
  "/success-stories": {
    title: "What People Say About Langma | Langma International",
    description:
      "Read verified testimonials about language learning, career preparation, and global support from Langma International.",
    h1: "Success Stories",
  },
};

export function canonicalPath(pathname = "/") {
  let path = pathname.split("?")[0].split("#")[0] || "/";
  if (!path.startsWith("/")) path = `/${path}`;
  if (path !== "/") path = path.replace(/\/+$/, "");
  return path || "/";
}

export function canonicalUrl(pathname = "/") {
  return `${SITE_URL}${canonicalPath(pathname)}`;
}

export function readablePath(pathname = "/") {
  const value = decodeURIComponent(canonicalPath(pathname))
    .split("/")
    .filter(Boolean)
    .pop();
  if (!value) return "Langma International";
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function fallbackMetadata(pathname = "/") {
  const path = canonicalPath(pathname);
  if (STATIC_METADATA[path]) return STATIC_METADATA[path];

  const label = readablePath(path);
  const isCourse = path.startsWith("/course-details/");
  return {
    title: isCourse ? `${label} | Language Course | Langma` : `${label} | Langma International`,
    description: isCourse
      ? `Explore the ${label.toLowerCase()} language program with live training and practical guidance from Langma International.`
      : `Explore ${label.toLowerCase()}, expert guidance, and international opportunities with Langma International.`,
    h1: label,
  };
}

export function languagePath(pathname = "/") {
  const path = canonicalPath(pathname);
  if (path.startsWith("/course-details/") || path.startsWith("/blog-detail/")) return null;
  if (STATIC_METADATA[path]) return null;
  return path.slice(1);
}

export function upsertMeta(attribute, name, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export function setRouteJsonLd(metadata, url, isCourse = false) {
  const id = "langma-route-jsonld";
  let script = document.head.querySelector(`#${id}`);
  document.querySelectorAll('script[data-langma-static-schema="true"]').forEach((staticScript) => staticScript.remove());
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  const path = canonicalPath(new URL(url).pathname);
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Langma International",
      url: SITE_URL,
      logo: `${SITE_URL}/images/langma.svg`,
      telephone: "+91-9810117094",
      sameAs: [
        "https://www.facebook.com/officiallangma",
        "https://www.instagram.com/officiallangma",
        "https://www.linkedin.com/school/langma-international",
        "https://x.com/official_langma",
        "https://www.youtube.com/@langmaInternational",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Langma International",
      url: SITE_URL,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      telephone: "+91-9810117094",
      image: `${SITE_URL}/images/lngm2.webp`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "E 73, South Extension Part-1",
        addressLocality: "New Delhi",
        postalCode: "110049",
        addressCountry: "IN",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        ...(path === "/"
          ? []
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: metadata.h1 || metadata.title,
                item: url,
              },
            ]),
      ],
    },
  ];

  if (isCourse) {
    graph.push({
      "@type": "Course",
      name: metadata.courseName || metadata.h1 || metadata.title,
      description: metadata.description,
      url,
      provider: {
        "@type": "Organization",
        name: "Langma International",
        url: SITE_URL,
      },
    });
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: metadata.h1 || metadata.title,
    url,
    "@graph": graph,
  });
}
