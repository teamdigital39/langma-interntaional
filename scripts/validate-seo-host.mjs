import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { API_BASE, SITE_URL } from "../src/seo.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const sitemapPath = path.join(dist, "sitemap.xml");

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(fullPath)));
    else if (entry.name === "index.html") files.push(fullPath);
  }
  return files;
}

function matches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function decodeXml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code) => {
    if (code[0] === "#") {
      const radix = code[1].toLowerCase() === "x" ? 16 : 10;
      return String.fromCodePoint(Number.parseInt(code.slice(radix === 16 ? 2 : 1), radix));
    }
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[code.toLowerCase()];
  });
}

const errors = [];
const files = await htmlFiles(dist);
const titlesByValue = new Map();
const descriptionsByValue = new Map();
for (const file of files) {
  const html = await readFile(file, "utf8");
  const titles = matches(html, /<title>([\s\S]*?)<\/title>/gi);
  const descriptions = matches(
    html,
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/gi
  );
  const canonicals = matches(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi);
  const ogUrls = matches(html, /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/gi);
  const seoHeadings = matches(
    html,
    /<h1\b[^>]*class=["'][^"']*\bseo-fallback-heading\b[^"']*["'][^>]*>([\s\S]*?)<\/h1>/gi
  );

  if (titles.length === 1) {
    const paths = titlesByValue.get(titles[0]) || [];
    paths.push(file);
    titlesByValue.set(titles[0], paths);
  }
  if (descriptions.length === 1) {
    const paths = descriptionsByValue.get(descriptions[0]) || [];
    paths.push(file);
    descriptionsByValue.set(descriptions[0], paths);
  }

  for (const url of [...canonicals, ...ogUrls]) {
    if (url.includes(API_BASE)) {
      errors.push(`${file}: API host used in canonical/social URL: ${url}`);
    }
    if (!url.startsWith(SITE_URL)) {
      errors.push(`${file}: non-primary host used in canonical/social URL: ${url}`);
    }
  }

  if (canonicals.length !== 1) {
    errors.push(`${file}: expected exactly one canonical URL, found ${canonicals.length}`);
  }
  if (seoHeadings.length !== 1 || !seoHeadings[0].trim()) {
    errors.push(`${file}: expected exactly one non-empty SEO fallback H1`);
  }
}

for (const [title, paths] of titlesByValue) {
  if (paths.length > 1) {
    errors.push(`Duplicate page title "${title}" in: ${paths.join(", ")}`);
  }
}
for (const [description, paths] of descriptionsByValue) {
  if (paths.length > 1) {
    errors.push(`Duplicate meta description "${description}" in: ${paths.join(", ")}`);
  }
}

const sitemap = await readFile(sitemapPath, "utf8");
for (const value of matches(sitemap, /<loc>\s*([^<]+?)\s*<\/loc>/g)) {
  const url = decodeXml(value);
  if (url.includes(API_BASE) || !url.startsWith(SITE_URL)) {
    errors.push(`${sitemapPath}: non-primary sitemap URL: ${url}`);
  }

  const pathname = new URL(url).pathname;
  if (pathname.startsWith("/course-details/") || pathname.startsWith("/blog-detail/")) {
    const segments = pathname.split("/").filter(Boolean).map(decodeURIComponent);
    const routeFile = path.join(dist, ...segments, "index.html");
    if (!files.includes(routeFile)) {
      errors.push(`${sitemapPath}: detail URL has no generated route file: ${url}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`SEO host validation passed for ${files.length} generated route files.`);
