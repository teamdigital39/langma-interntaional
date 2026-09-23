import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { API_BASE, SITE_URL } from "../src/seo.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const sitemapPath = path.join(root, "public", "sitemap.xml");

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

const errors = [];
const files = await htmlFiles(dist);
for (const file of files) {
  const html = await readFile(file, "utf8");
  const canonicals = matches(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi);
  const ogUrls = matches(html, /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/gi);

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
}

const sitemap = await readFile(sitemapPath, "utf8");
for (const url of matches(sitemap, /<loc>\s*([^<]+?)\s*<\/loc>/g)) {
  if (url.includes(API_BASE) || !url.startsWith(SITE_URL)) {
    errors.push(`${sitemapPath}: non-primary sitemap URL: ${url}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`SEO host validation passed for ${files.length} generated route files.`);
