import fs from "fs";

const file = "src/Pages/HomePages/Aboutus.jsx";
let content = fs.readFileSync(file, "utf8");

const startMarker = "<style>{`";
const endMarker = "`}</style>";
const start = content.indexOf(startMarker);
const end = content.indexOf(endMarker, start);
if (start === -1 || end === -1) throw new Error("style block not found");

let css = content.slice(start + startMarker.length, end);

css = css.replace(/:root\s*\{/, ".langma-about-vars {\n");

const lines = css.split("\n");
const out = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (
    trimmed.startsWith("@") ||
    trimmed.startsWith("/*") ||
    trimmed === "" ||
    trimmed.startsWith(".langma-about") ||
    trimmed.startsWith("@keyframes")
  ) {
    out.push(line);
    continue;
  }
  if (/^\./.test(trimmed)) {
    out.push(line.replace(/^(\s*)\./, "$1.langma-about ."));
    continue;
  }
  out.push(line);
}

css = out.join("\n");
css = css.replace(/\.langma-about \.langma-about/g, ".langma-about");
css = css.replace(/\.langma-about-vars \{/g, ".langma-about {");

content = content.slice(0, start + startMarker.length) + css + content.slice(end);
fs.writeFileSync(file, content);
console.log("scoped About page CSS");
