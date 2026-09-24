import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  API_BASE,
  HOMEPAGE_METADATA,
  SITE_URL,
  canonicalPath,
  fallbackMetadata,
} from "../src/seo.js";
import { getLanguageFaqs, getSectionFaqs } from "../src/languageFaqs.js";
import {
  GOOGLE_ADS_ID,
  GOOGLE_ANALYTICS_ID,
  GTM_ID,
  STANDALONE_LANDING_ROUTES,
} from "../src/standaloneLandingRoutes.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const sitemap = await readFile(path.join(root, "public", "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1].trim());
const urls = [
  ...new Set([
    ...sitemapUrls,
    ...STANDALONE_LANDING_ROUTES.map((route) => `${SITE_URL}${route}`),
  ]),
];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function stripTags(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(value, max = 160) {
  const text = stripTags(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function absoluteImage(value) {
  if (!value) return `${SITE_URL}/images/learnlangma.jpg`;
  try {
    return new URL(value, SITE_URL).href;
  } catch {
    return `${SITE_URL}/assets/hs-image-2.png`;
  }
}

function staticRoute(pathname) {
  const metadata = fallbackMetadata(pathname);
  return { ...metadata, image: metadata.image || `${SITE_URL}/assets/hs-image-2.png` };
}

const jsonCache = new Map();
async function fetchJson(url) {
  if (jsonCache.has(url)) return jsonCache.get(url);
  const promise = fetch(url, { signal: AbortSignal.timeout(10000) })
    .then((response) => (response.ok ? response.json() : null))
    .catch(() => null);
  jsonCache.set(url, promise);
  return promise;
}

const languageList = await fetchJson(`${API_BASE}/api/languages`);
const languageSlugs = new Set(
  (languageList?.languages || []).map((item) => item.url).filter(Boolean)
);
const languagePages = new Map();

async function metadataFor(pathname) {
  const normalized = canonicalPath(pathname);
  if (normalized === "/") return HOMEPAGE_METADATA;
  if (STANDALONE_LANDING_ROUTES.includes(normalized)) return staticRoute(normalized);

  if (normalized.startsWith("/course-details/")) {
    const [, , languageSlug, courseSlug] = normalized.split("/");
    if (languageSlug && courseSlug) {
      const data = await fetchJson(
        `${API_BASE}/api/language-page/${encodeURIComponent(languageSlug)}`
      );
      const course = data?.details?.find((item) => item.slug === courseSlug);
      if (course) {
        return {
          title: `${course.title} | Langma International`,
          description: truncate(
            `Explore ${course.title} with practical language training and expert guidance from Langma International.`,
            160
          ),
          h1: course.title,
          image: absoluteImage(course.banner || course.image),
          courseName: course.title,
        };
      }
    }
    return staticRoute(normalized);
  }

  if (languageSlugs.has(normalized.slice(1))) {
    let data = languagePages.get(normalized);
    if (!data) {
      data = await fetchJson(
        `${API_BASE}/api/language-page/${encodeURIComponent(normalized.slice(1))}`
      );
      languagePages.set(normalized, data);
    }
    if (data?.page) {
      return {
        title: data.page.seo_title || `${data.page.title} Language Course | Langma`,
        description: truncate(
          data.page.seo_description ||
            `Learn ${data.page.title} with live online and classroom courses from Langma International.`,
          160
        ),
        h1: `Learn ${data.page.title} with Langma`,
        image: absoluteImage(data.page.banner || data.page.image),
      };
    }
  }

  return staticRoute(normalized);
}

const STATIC_LANGUAGE_NAMES = {
  "/balkan-language": "Balkan Languages",
  "/chinese": "Chinese",
  "/french": "French",
  "/german": "German",
  "/hind": "Hindi",
  "/online-italian-la": "Italian",
  "/online-japanese-la": "Japanese",
  "/online-ko": "Korean",
  "/russian": "Russian",
  "/persian": "Persian",
  "/polish": "Polish",
  "/sanskrit": "Sanskrit",
  "/learn-german-language": "German",
  "/learn-korean-language": "Korean",
  "/learn-japanese-language": "Japanese",
  "/learn-french-language": "French",
  "/learn-chinese-language": "Chinese",
};

const SECTION_FAQ_ROUTES = {
  "/languages": "language-courses",
  "/study-abroad": "study-abroad",
  "/investment": "pr-investment",
  "/pr-by-investment": "pr-investment",
  "/greece": "golden-visa",
  "/cyprus": "golden-visa",
  "/latvia": "golden-visa",
  "/canada": "golden-visa",
  "/unitedstate": "golden-visa",
  "/costaRica": "golden-visa",
  "/hongkong": "golden-visa",
  "/malasiya": "golden-visa",
  "/singapore": "golden-visa",
  "/thailand": "golden-visa",
  "/unitedarab": "golden-visa",
  "/mauritius": "golden-visa",
  "/australia": "golden-visa",
};

function languageNameFor(path, metadata) {
  if (STATIC_LANGUAGE_NAMES[path]) return STATIC_LANGUAGE_NAMES[path];
  if (languageSlugs.has(path.slice(1))) {
    return metadata.h1?.replace(/^Learn\s+/i, "").replace(/\s+with\s+Langma$/i, "") || null;
  }
  return null;
}

function schemaFor(metadata, url) {
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
      image: `${SITE_URL}/images/lngm2.png`,
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

  const languageName = languageNameFor(path, metadata);
  if (languageName) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#language-faq`,
      mainEntity: getLanguageFaqs(languageName).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  const sectionName = SECTION_FAQ_ROUTES[path];
  if (sectionName && !languageName) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#${sectionName}-faq`,
      mainEntity: getSectionFaqs(sectionName).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  if (metadata.courseName) {
    graph.push({
      "@type": "Course",
      name: metadata.courseName,
      description: metadata.description,
      url,
      provider: {
        "@type": "Organization",
        name: "Langma International",
        url: SITE_URL,
      },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

let generated = 0;
for (const rawUrl of urls) {
  const url = new URL(rawUrl);
  const pathname = canonicalPath(url.pathname);
  const metadata = await metadataFor(pathname);
  const canonical = `${SITE_URL}${pathname}`;
  const image = absoluteImage(metadata.image);
  const isStandaloneLanding = STANDALONE_LANDING_ROUTES.includes(pathname);
  const schema = JSON.stringify(schemaFor(metadata, canonical)).replace(/</g, "\\u003c");
  const gtmHead = isStandaloneLanding
    ? `
    <script>
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}" data-google-ads-id="${GOOGLE_ADS_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_ADS_ID}');
      gtag('config', '${GOOGLE_ANALYTICS_ID}');
      window.__langmaTrackingConfigured = true;
    </script>
  `
    : "";
  const seoHead = `
    ${gtmHead}
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="${metadata.courseName ? "article" : "website"}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:site_name" content="Langma International" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(metadata.h1 || metadata.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${schema}</script>
  `;
  const gtmNoscript = isStandaloneLanding
    ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
    : "";
  const fallback = `
    ${gtmNoscript}
    <noscript>
      <main>
        <p class="seo-fallback-heading" role="heading" aria-level="1">${escapeHtml(metadata.h1 || metadata.title)}</p>
        <p>${escapeHtml(metadata.description)}</p>
      </main>
    </noscript>
  `;
  const html = template
    .replace("<!-- SEO_ROUTE_HEAD -->", `${seoHead}\n    <!-- SEO_ROUTE_HEAD -->`)
    .replace('<div id="root"></div>', `${fallback}\n    <div id="root"></div>`);

  const segments = pathname.split("/").filter(Boolean).map(decodeURIComponent);
  const target = segments.length
    ? path.join(dist, ...segments, "index.html")
    : path.join(dist, "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  generated += 1;
}

console.log(`Generated ${generated} route HTML files in ${dist}`);
