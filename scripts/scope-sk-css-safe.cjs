const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/Pages/HomePages/StudyInSouthKorea.jsx");
let content = fs.readFileSync(filePath, "utf8");
const markerStart = "<style>{`";
const markerEnd = "`}</style>";
const startIdx = content.indexOf(markerStart);
const endIdx = content.indexOf(markerEnd, startIdx);
let css = content.slice(startIdx + markerStart.length, endIdx);

css = css
  .replace(/^\s*\/\/.*$/gm, "")
  .replace(/^:root\s*\{/m, ".sk-page {")
  .replace(/^body\s*\{/m, ".sk-page {")
  .replace(
    /^h1,h2,h3,h4\s*\{/m,
    ".sk-page h1, .sk-page h2, .sk-page h3, .sk-page h4 {"
  )
  .replace(/^section\s*\{/m, ".sk-page section {")
  .replace(/^footer\s/m, ".sk-page footer ")
  .replace(
    /@media\(prefers-reduced-motion:reduce\)\{\s*\{/g,
    "@media(prefers-reduced-motion:reduce){.sk-page *{"
  )
  .replace(
    /@media\(prefers-reduced-motion:reduce\)\{\s*\*/g,
    "@media(prefers-reduced-motion:reduce){.sk-page *"
  );

const lines = css.split("\n");
const out = [];
let skipNavBlock = false;

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) {
    out.push(line);
    continue;
  }
  if (trimmed.startsWith("/*") && trimmed.includes("NAV")) {
    skipNavBlock = true;
    continue;
  }
  if (skipNavBlock) {
    if (trimmed.startsWith("/* HERO")) skipNavBlock = false;
    else continue;
  }
  if (trimmed.startsWith("@")) {
    out.push(line);
    continue;
  }
  if (trimmed === "}" || trimmed.startsWith("/*")) {
    out.push(line);
    continue;
  }

  const selectorMatch = line.match(/^(\s*)([^{]+)\{\s*(.*)$/);
  if (!selectorMatch) {
    out.push(line);
    continue;
  }

  let selector = selectorMatch[2].trim();
  const rest = selectorMatch[3];

  if (selector.startsWith(".sk-page")) {
    out.push(line);
    continue;
  }

  if (selector === "*") {
    out.push(`${selectorMatch[1]}.sk-page * {${rest}`);
    continue;
  }

  if (selector === "nav" || selector.startsWith(".nav-")) {
    continue;
  }

  const scoped = selector
    .split(",")
    .map((s) => {
      s = s.trim();
      if (!s || s.startsWith(".sk-page")) return s;
      return `.sk-page ${s}`;
    })
    .join(", ");

  out.push(`${selectorMatch[1]}${scoped} {${rest}`);
}

let scopedCss = out.join("\n");
scopedCss = scopedCss.replace(
  /\.sk-page \{\s*\n\.sk-page --/,
  ".sk-page {\n  --"
);
scopedCss = scopedCss.replace(
  /(\.sk-page \{[^}]*\})\s*\.sk-page \{font-family/g,
  "$1\n.sk-page {font-family"
);

const newContent =
  content.slice(0, startIdx + markerStart.length) +
  scopedCss +
  content.slice(endIdx);
fs.writeFileSync(filePath, newContent);
console.log("Safe scoped CSS applied");
