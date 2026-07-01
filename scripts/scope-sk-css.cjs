const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/Pages/HomePages/StudyInSouthKorea.jsx");
let content = fs.readFileSync(filePath, "utf8");
const markerStart = "<style>{`";
const markerEnd = "`}</style>";
const startIdx = content.indexOf(markerStart);
const endIdx = content.indexOf(markerEnd, startIdx);
if (startIdx === -1 || endIdx === -1) {
  console.error("Style block not found");
  process.exit(1);
}

let css = content.slice(startIdx + markerStart.length, endIdx);
css = css.replace(/^\s*\/\/.*$/gm, "");
css = css.replace(/:root\s*\{/, ".sk-page-base {");
css = css.replace(/^body\s*\{/m, ".sk-page-base {");
css = css.replace(
  /^h1,h2,h3,h4\s*\{/m,
  ".sk-page h1, .sk-page h2, .sk-page h3, .sk-page h4 {"
);
css = css.replace(/^section\s*\{/m, ".sk-page section {");
css = css.replace(/^footer\s/m, ".sk-page footer ");
css = css.replace(/@media\(prefers-reduced-motion:reduce\)\{\s*\*/g, "@media(prefers-reduced-motion:reduce){.sk-page *");

function scopeSelectors(block) {
  return block.replace(/(^|\n)([^{}@/\n][^{]*)\{/g, (full, before, sel) => {
    const trimmed = sel.trim();
    if (!trimmed || trimmed.startsWith("@") || trimmed.startsWith(".sk-page")) {
      return full;
    }
    if (trimmed === "*") {
      return `${before}.sk-page * {`;
    }
    const scoped = trimmed
      .split(",")
      .map((s) => {
        s = s.trim();
        if (!s || s.startsWith(".sk-page")) return s;
        return `.sk-page ${s}`;
      })
      .join(", ");
    return `${before}${scoped} {`;
  });
}

let out = "";
let i = 0;
while (i < css.length) {
  const mediaIdx = css.indexOf("@media", i);
  if (mediaIdx === -1) {
    out += scopeSelectors(css.slice(i));
    break;
  }
  out += scopeSelectors(css.slice(i, mediaIdx));
  const braceStart = css.indexOf("{", mediaIdx);
  let depth = 0;
  let j = braceStart;
  for (; j < css.length; j++) {
    if (css[j] === "{") depth++;
    else if (css[j] === "}") {
      depth--;
      if (depth === 0) {
        j++;
        break;
      }
    }
  }
  const mediaRule = css.slice(mediaIdx, j);
  const headEnd = mediaRule.indexOf("{") + 1;
  const mediaHead = mediaRule.slice(0, headEnd);
  const mediaBody = mediaRule.slice(headEnd, -1);
  out += mediaHead + scopeSelectors(mediaBody) + "}";
  i = j;
}

out = out.replace(/\.sk-page-base \{/g, ".sk-page {");

const newContent =
  content.slice(0, startIdx + markerStart.length) + out + content.slice(endIdx);
fs.writeFileSync(filePath, newContent);
console.log("Scoped CSS successfully");
