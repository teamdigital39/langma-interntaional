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

function staticFallbackHtml(pathname, metadata) {
  if (pathname === "/") {
    return `
      <h1>${escapeHtml(metadata.h1 || metadata.title)}</h1>
      <p>Langma International provides foreign language courses, exam preparation, study abroad guidance, overseas career support, and global mobility services through online, classroom, and corporate programs.</p>
      <p>Learn 50+ international languages with practical training for communication, education, employment, and globally recognized language examinations. Learners can choose flexible online classes, classroom courses in New Delhi, or corporate language training for teams.</p>
      <h2>Foreign language courses and exam preparation</h2>
      <p>Explore beginner to advanced language learning with experienced trainers and structured support for international exams. Course guidance can cover German, Japanese, Korean, Chinese, French, Spanish, Italian, and many other languages according to your goals, level, schedule, and destination.</p>
      <h2>Study abroad and international career guidance</h2>
      <p>Get support with overseas education planning, university applications, student placement, scholarships, visa preparation, and destination decisions. Langma also helps learners prepare for international careers through language training, career guidance, and overseas recruitment support.</p>
      <h2>Global mobility and investment solutions</h2>
      <p>Explore Golden Visa and permanent residency by investment options with guidance on eligibility, documentation, timelines, and professional next steps. Requirements, fees, and approval decisions depend on the relevant country and government authority.</p>
      <h2>Corporate language training and trusted support</h2>
      <p>Organizations can use language training and communication support to prepare teams for international clients, relocation, global recruitment, and cross-border business. Langma also offers translation and multilingual assistance for education, business, and professional communication.</p>
      <p>Every learner and applicant has different goals, documents, timelines, and eligibility requirements. A consultation helps clarify the right course, exam pathway, destination, study plan, career option, or mobility service without promising an outcome that depends on an external institution or government authority. Guidance is designed to make the next step clearer and more practical.</p>
      <p>Visit the <a href="/languages">language courses</a>, <a href="/study-abroad">study abroad</a>, <a href="/work-abroad">work abroad</a>, <a href="/investment">investment and mobility</a>, <a href="/about">about</a>, and <a href="/contact">contact</a> pages to learn more or request a consultation.</p>
    `;
  }

  if (pathname === "/learn-japanese-language") {
    return `
      <h1>${escapeHtml(metadata.h1 || metadata.title)}</h1>
      <p>${escapeHtml(metadata.description)} Japanese language classes cover beginner N5 through advanced N1 learning, speaking practice, writing systems, JLPT preparation, and practical guidance for study or work in Japan.</p>
      <h2>Japanese language courses for JLPT preparation</h2>
      <p>Choose live online Japanese classes, classroom training in New Delhi, or a flexible hybrid batch. The course pathway builds hiragana, katakana, kanji, grammar, listening, reading, and real conversation step by step. Learners can ask about JLPT, JFT-Basic, NAT-TEST, J.TEST, BJT, and EJU preparation.</p>
      <h2>Study and work in Japan guidance</h2>
      <p>Langma provides practical counselling for learners considering language schools, universities, specified skilled worker routes, engineering and specialist roles, and other Japan-focused opportunities. Eligibility, visa decisions, employer requirements, and government fees depend on the applicable authorities and each applicant's circumstances.</p>
      <p>Japanese language training is useful for more than an exam score. Regular listening and speaking practice helps learners communicate in daily life, prepare for interviews, understand workplace expectations, and participate more confidently in Japanese culture. Students can ask for guidance on choosing a level, setting a realistic study schedule, selecting an exam, and comparing online Japanese classes with classroom learning. Course fees, batch timings, trainer availability, admissions requirements, employment outcomes, and visa conditions should be confirmed during a current consultation.</p>
      <p>Before enrolling, learners can discuss their goals with a counsellor, including travel, university admission, employment, relocation, or personal interest. A structured plan makes it easier to practise consistently, track progress, and decide when additional speaking practice or exam coaching is useful.</p>
      <ul>
        <li>Beginner-friendly Japanese classes from N5 through N1</li>
        <li>Online, classroom, and hybrid learning options</li>
        <li>Exam preparation and progress guidance</li>
        <li>Study abroad and Japan career counselling</li>
      </ul>
      <p><strong>Reviewed by:</strong> Langma Japanese Language Training Team · <time dateTime="2026-09-25">Updated September 25, 2026</time></p>
      <p><strong>Visit:</strong> E 73, South Extension Part-1, New Delhi – 110049, India · <a href="/about">About Langma International</a> · <a href="/editorial-policy">Editorial policy</a> · <a href="/contact">Contact</a></p>
    `;
  }
  return `<h1>${escapeHtml(metadata.h1 || metadata.title)}</h1><p>${escapeHtml(metadata.description)}</p>`;
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

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: metadata.h1 || metadata.title,
    url,
    "@graph": graph,
  };
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
    <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs guidance" />
    ${pathname === "/learn-japanese-language" ? `<link rel="preload" as="image" href="${SITE_URL}/images/lngm2.webp" fetchpriority="high" />` : ""}
    ${pathname === "/learn-japanese-language" ? `<meta name="author" content="Langma Japanese Language Training Team" /><meta property="article:published_time" content="2026-01-01" /><meta property="article:modified_time" content="2026-09-25" />` : ""}
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
    <script type="application/ld+json" data-langma-static-schema="true">${schema}</script>
  `;
  const gtmNoscript = isStandaloneLanding
    ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
    : "";
  const fallback = `
    ${gtmNoscript}
    <noscript>
      <main>
        <div class="seo-fallback-content">${staticFallbackHtml(pathname, metadata)}</div>
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
