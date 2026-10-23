import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  API_BASE,
  HOMEPAGE_METADATA,
  LAST_UPDATED,
  SITE_URL,
  canonicalPath,
  canonicalUrl,
  fallbackMetadata,
} from "../src/seo.js";
import { getLanguageFaqs, getSectionFaqs } from "../src/languageFaqs.js";
import {
  GTM_ID,
  STANDALONE_LANDING_ROUTES,
} from "../src/standaloneLandingRoutes.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const sitemap = await readFile(path.join(root, "public", "sitemap.xml"), "utf8");

function decodeXml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code) => {
    if (code[0] === "#") {
      const radix = code[1].toLowerCase() === "x" ? 16 : 10;
      return String.fromCodePoint(Number.parseInt(code.slice(radix === 16 ? 2 : 1), radix));
    }
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[code.toLowerCase()];
  });
}

const sitemapUrls = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) =>
  decodeXml(match[1].trim())
);
const ROUTE_ALIASES = {
  "/netherland": "/netherlands",
};
const NON_SITEMAP_ROUTES = ["/thank-you"];

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

function contentText(value = "") {
  return stripTags(value)
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

function fallbackContent(value = "", maxWords = 700) {
  const words = contentText(value).split(/\s+/).filter(Boolean);
  return words.length > maxWords ? `${words.slice(0, maxWords).join(" ")}…` : words.join(" ");
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

function routeLabel(pathname) {
  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment).replace(/[-_]+/g, " ");
      } catch {
        return segment.replace(/[-_]+/g, " ");
      }
    })
    .join(" ");
}

function uniqueMetadata(metadata, pathname, usedTitles, usedDescriptions) {
  const label = routeLabel(pathname) || "Langma International";
  const descriptionLabel = label.slice(0, 75);
  let title = metadata.title;
  let titleSuffix = label;
  let index = 2;
  while (usedTitles.has(title)) {
    title = `${metadata.title} | ${titleSuffix}`;
    titleSuffix = `${label} ${index++}`;
  }
  usedTitles.add(title);

  let description = metadata.description;
  let descriptionSuffix = `Learn more about ${descriptionLabel} from Langma International.`;
  index = 2;
  while (usedDescriptions.has(description)) {
    description = `${truncate(metadata.description, 159 - descriptionSuffix.length)} ${descriptionSuffix}`;
    descriptionSuffix = `Learn more about ${descriptionLabel} (${index++}) from Langma International.`;
  }
  usedDescriptions.add(description);

  return { ...metadata, title, description };
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
if (!languageList?.status || !Array.isArray(languageList.languages)) {
  throw new Error("Could not generate language course routes: the language list is unavailable.");
}
const languageSlugs = new Set(
  (languageList?.languages || []).map((item) => item.url).filter(Boolean)
);
const languageNames = new Map(
  languageList.languages.filter((item) => item.url && item.title).map((item) => [item.url, item.title])
);
const languagePages = new Map();
const courseDetailUrls = (
  await Promise.all(
    [...languageSlugs].map(async (languageSlug) => {
      const data = await fetchJson(
        `${API_BASE}/api/language-page/${encodeURIComponent(languageSlug)}`
      );

      if (!data?.status || !Array.isArray(data.details)) {
        throw new Error(
          `Could not generate course routes for "${languageSlug}": language course details are unavailable.`
        );
      }

      return data.details
        .filter((course) => course.slug)
        .map(
          (course) =>
            `${SITE_URL}/course-details/${encodeURIComponent(languageSlug)}/${encodeURIComponent(course.slug)}/`
        );
    })
  )
).flat();
function normalizedUrl(value) {
  const url = new URL(value);
  const pathname = url.pathname
    .split("/")
    .map((segment) => decodeURIComponent(segment))
    .join("/");
  return `${url.origin}${canonicalPath(pathname)}`;
}

const routeUrls = [
  ...sitemapUrls,
  ...courseDetailUrls,
  ...STANDALONE_LANDING_ROUTES.map((route) => `${SITE_URL}${route}`),
  ...Object.keys(ROUTE_ALIASES).map((route) => `${SITE_URL}${route}`),
  ...NON_SITEMAP_ROUTES.map((route) => `${SITE_URL}${route}`),
];
const urls = [...new Map(routeUrls.map((url) => [normalizedUrl(url), url])).values()];
const existingSitemapUrls = new Set(sitemapUrls.map(normalizedUrl));
const additionalSitemapEntries = [...new Set(courseDetailUrls)]
  .filter((url) => !existingSitemapUrls.has(normalizedUrl(url)))
  .map(
    (url) => `  <url>
    <loc>${escapeHtml(url)}</loc>
    <lastmod>${LAST_UPDATED}</lastmod>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n");
const generatedSitemap = sitemap.replace(
  /<\/urlset>\s*$/,
  `${additionalSitemapEntries ? `\n${additionalSitemapEntries}\n` : ""}</urlset>\n`
);

if (generatedSitemap === sitemap && additionalSitemapEntries) {
  throw new Error("Could not add API detail URLs to the generated sitemap.");
}

async function metadataFor(pathname) {
  const normalized = canonicalPath(pathname);
  if (normalized === "/") return HOMEPAGE_METADATA;
  if (STANDALONE_LANDING_ROUTES.includes(normalized)) return staticRoute(normalized);

  if (normalized === "/blog") {
    return fallbackMetadata(normalized);
  }

  if (normalized.startsWith("/blog-detail/")) {
    let slug = normalized.split("/").at(-1);
    try {
      slug = decodeURIComponent(slug);
    } catch {
      throw new Error(`Could not decode blog route slug "${slug}".`);
    }
    const result = await fetchJson(
      `${API_BASE}/api/blog-detail/${encodeURIComponent(slug)}`
    );
    const blog = result?.data;
    const recentBlogs = result?.recentBlog || [];
    if (blog?.title) {
      return {
        title: `${blog.title} | Langma International`,
        description: truncate(
          blog.description || blog.excerpt || contentText(blog.content) ||
          `Read ${blog.title} for practical insights from Langma International.`
        ),
        h1: blog.title,
        image: absoluteImage(blog.image),
        contentText: fallbackContent(
          [
            blog.content,
            recentBlogs.length
              ? `Related articles: ${recentBlogs.map((item) => item.title).filter(Boolean).join(". ")}`
              : "",
          ]
            .filter(Boolean)
            .join(" ")
        ),
      };
    }
    return staticRoute(normalized);
  }

  if (normalized.startsWith("/course-details/")) {
    const [, , languageSlug, courseSlug] = normalized.split("/");
    if (languageSlug && courseSlug) {
      const data = await fetchJson(
        `${API_BASE}/api/language-page/${encodeURIComponent(languageSlug)}`
      );
      const course = data?.details?.find((item) => item.slug === courseSlug);
      if (course) {
        const languageName = languageNames.get(languageSlug) || languageSlug.replaceAll("-", " ");
        return {
          title: `${course.title} ${languageName} Course | Langma International`,
          description: truncate(
            `Explore ${course.title} in ${languageName} with structured language training and practical guidance from Langma International.`,
            160
          ),
          h1: course.title,
          image: absoluteImage(course.banner || course.image),
          courseName: `${course.title} ${languageName}`,
          contentText: fallbackContent(
            [
              course.content,
              course.course_feature,
              course.important_info,
              data.details
                .filter((item) => item.slug !== course.slug)
                .map(
                  (item) =>
                    `${item.title}. ${fallbackContent(item.content, 60)}`
                )
                .join(" "),
            ]
              .filter(Boolean)
              .join(" ")
          ),
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
        contentText: fallbackContent(
          [
            data.page.content,
            data.page.content_2,
            (data.details || [])
              .map((course) => `${course.title}. ${fallbackContent(course.content, 60)}`)
              .join(" "),
          ]
            .filter(Boolean)
            .join(" ")
        ),
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

function faqsForRoute(path, metadata) {
  const languageName = languageNameFor(path, metadata);
  if (languageName) return getLanguageFaqs(languageName);
  const sectionName = SECTION_FAQ_ROUTES[path];
  if (sectionName) return getSectionFaqs(sectionName);
  return [];
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
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Langma International",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
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
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: metadata.title,
      description: metadata.description,
      url,
      dateModified: LAST_UPDATED,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
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
const usedTitles = new Set();
const usedDescriptions = new Set();
for (const rawUrl of urls) {
  const url = new URL(rawUrl);
  const routePath = canonicalPath(url.pathname);
  const pathname = ROUTE_ALIASES[routePath] || routePath;
  const metadata = uniqueMetadata(
    await metadataFor(pathname),
    pathname,
    usedTitles,
    usedDescriptions
  );
  const canonical = canonicalUrl(pathname);
  const image = absoluteImage(metadata.image);
  const isStandaloneLanding = STANDALONE_LANDING_ROUTES.includes(pathname);
  const isNoIndex = NON_SITEMAP_ROUTES.includes(pathname);
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
  `
    : "";
  const seoHead = `
    ${gtmHead}
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="robots" content="${isNoIndex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="${metadata.courseName ? "article" : "website"}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:site_name" content="Langma International" />
    <meta property="article:modified_time" content="${LAST_UPDATED}" />
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
  const routeFaqs = faqsForRoute(pathname, metadata);
  const faqFallback = routeFaqs.length
    ? `
        <section aria-labelledby="seo-faq-heading">
          <h2 id="seo-faq-heading">Frequently Asked Questions</h2>
          ${routeFaqs
            .map(
              (faq) => `
                <article>
                  <h3>${escapeHtml(faq.question)}</h3>
                  <p>${escapeHtml(faq.answer)}</p>
                </article>`
            )
            .join("")}
        </section>`
    : "";
  const fallback = `
    ${gtmNoscript}
    <noscript>
      <main>
        <h1 class="seo-fallback-heading">${escapeHtml(metadata.h1 || metadata.title)}</h1>
        <p>${escapeHtml(metadata.description)}</p>
        ${metadata.contentText ? `<p>${escapeHtml(metadata.contentText)}</p>` : ""}
        <p>Last updated: ${LAST_UPDATED}</p>
        ${faqFallback}
      </main>
    </noscript>
  `;
  const html = template
    .replace("<!-- SEO_ROUTE_HEAD -->", `${seoHead}\n    <!-- SEO_ROUTE_HEAD -->`)
    .replace('<div id="root"></div>', `${fallback}\n    <div id="root"></div>`);

  const segments = routePath.split("/").filter(Boolean).map(decodeURIComponent);
  const target = segments.length
    ? path.join(dist, ...segments, "index.html")
    : path.join(dist, "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  generated += 1;
}

await writeFile(path.join(dist, "sitemap.xml"), generatedSitemap, "utf8");
console.log(`Generated ${generated} route HTML files in ${dist}`);
