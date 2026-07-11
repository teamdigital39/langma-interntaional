import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, "../src/Pages/HomePages");

const LIGHT_GHOST = `background:transparent;color:#1A2540;border:2px solid #2FC7A1`;

const studyFiles = [
  "StudyInMalta.jsx",
  "StudyInCyprus.jsx",
  "StudyInDubai.jsx",
  "StudyInGeorgia.jsx",
  "StudyInMauritius.jsx",
  "StudyInNetherlands.jsx",
  "StudyInSingapore.jsx",
  "StudyInSouthKorea.jsx",
  "StudyPolandPage.jsx",
];

function fixStudyFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  content = content.replace(
    /background: `linear-gradient\(135deg, \$\{C\.navyDark\} 0%, \$\{C\.navy\} 60%, \$\{C\.navyL\} 100%\)`,\s*backgroundSize: "200% 200%",\s*animation: "lm-bg-shift 14s ease infinite",/g,
    `background: C.cream,\n          borderTop: \`1px solid \${C.border}\`,`
  );

  content = content.replace(
    /(\{\/\* -+ FOOTER INFO -+ \*\/\}\s*<div[\s\S]*?style=\{\{\s*)background: C\.navyDark,/g,
    `$1background: C.cream2,`
  );
  content = content.replace(
    /borderTop: `1px solid rgba\(240,192,64,0\.1\)`/g,
    `borderTop: \`1px solid \${C.border}\``
  );

  content = content.replace(/C\.mintTint/g, "C.goldSoft");

  content = content.replace(
    /color: C\.white,\s*\n\s*fontSize: "clamp\(32px, 4\.5vw, 56px\)"/g,
    `color: C.ink,\n                fontSize: "clamp(32px, 4.5vw, 56px)"`
  );
  content = content.replace(/color: "rgba\(255,255,255,0\.78\)"/g, `color: C.slate`);

  if (!content.includes("color: dark ? C.ink")) {
    content = content.replace(
      /color: "#ffffff",\s*\n\s*\.\.\.style,/g,
      `color: dark ? C.ink : "#ffffff",
        border: dark ? \`2px solid \${C.gold}\` : \`1px solid rgba(255,255,255,0.25)\`,
        background: dark ? (h ? C.goldSoft : C.white) : "rgba(240,192,64,0.1)",
        ...style,`
    );
    content = content.replace(
      /background: dark \? C\.goldTint : "rgba\(240,192,64,0\.1\)",\s*\n\s*border: `1px solid \$\{dark \? "rgba\(14,26,46,0\.2\)" : "rgba\(255,255,255,0\.25\)"\}`,\s*\n\s*padding:/g,
      `padding:`
    );
  }

  const lines = content.split("\n");
  let inFinalCta = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("FINAL CTA")) inFinalCta = true;
    if (inFinalCta && lines[i].includes("FOOTER INFO")) inFinalCta = false;
    if (inFinalCta && lines[i].includes("<GhostButton") && !lines[i].includes("dark")) {
      lines[i] = lines[i].replace("<GhostButton", "<GhostButton dark");
    }
  }
  content = lines.join("\n");

  content = content.replace(
    /style=\{\{ color: "#ffffff", textDecoration: "none" \}\}/g,
    `style={{ color: C.navy, textDecoration: "none" }}`
  );
  content = content.replace(
    /<span style=\{\{ fontSize: 13, color: "#ffffff", display: "block" \}\}>/g,
    `<span style={{ fontSize: 13, color: C.slate, display: "block" }}>`
  );
  content = content.replace(
    /<NavyButton onClick=\{\(\) => setOpen\(true\)\} style=\{\{ background: C\.forest, padding: "16px 36px" \}\}>/g,
    `<NavyButton onClick={() => setOpen(true)} style={{ background: C.dark, padding: "16px 36px" }}>`
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log("Study fixed:", path.basename(filePath));
  }
}

for (const file of studyFiles) {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) fixStudyFile(filePath);
}

console.log("Study abroad pre-footer theme update complete.");
