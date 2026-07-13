import fs from "fs";
import path from "path";

const ROOT = path.resolve("src/Pages/HomePages");

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith(".jsx"));

const heroPaddingReplacements = [
  [/padding:96px 0 70px/g, "padding:72px 0 48px"],
  [/padding-top:110px;\s*padding-bottom:70px/g, "padding-top:0;padding-bottom:0"],
  [/padding-top:110px;padding-bottom:70px/g, "padding-top:0;padding-bottom:0"],
  [/padding-top:100px;\s*padding-bottom:70px/g, "padding-top:0;padding-bottom:0"],
  [/padding-top:100px;padding-bottom:70px/g, "padding-top:0;padding-bottom:0"],
  [/padding-top:120px;\s*padding-bottom:70px/g, "padding-top:0;padding-bottom:0"],
  [/padding-top:120px;padding-bottom:70px/g, "padding-top:0;padding-bottom:0"],
  [/padding-top:120px;\s*padding-bottom:60px/g, "padding-top:0;padding-bottom:32px"],
  [/padding-top:120px;padding-bottom:60px/g, "padding-top:0;padding-bottom:32px"],
  [/padding-top:130px;padding-bottom:60px/g, "padding-top:0;padding-bottom:32px"],
  [/padding-top:110px;padding-bottom:50px/g, "padding-top:0;padding-bottom:24px"],
  [/padding-top:100px;padding-bottom:50px/g, "padding-top:0;padding-bottom:24px"],
  [/padding-top:120px;/g, "padding-top:0;"],
];

const HERO_RESPONSIVE_BLOCK = `
  /* PR hero — account for site TopBar + Navbar only (no double top padding) */
  @media(max-width:980px){
    .__PREFIX__ .hero{padding:64px 0 40px;}
    .__PREFIX__ .hero-split{grid-template-columns:1fr !important;gap:36px !important;padding-top:0 !important;}
    .__PREFIX__ .hero-visual{order:-1;max-width:560px;margin:0 auto;width:100%;}
    .__PREFIX__ .hero-visual::before{display:none;}
    .__PREFIX__ .hero-img-frame,.__PREFIX__ .hero-img-card{max-width:100%;}
    .__PREFIX__ .hero-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;}
  }
  @media(max-width:640px){
    .__PREFIX__ .hero{padding:56px 0 32px;}
    .__PREFIX__ .hero-split{gap:28px !important;padding-bottom:16px !important;}
    .__PREFIX__ .hero h1{font-size:clamp(30px,8vw,42px);}
    .__PREFIX__ .hero-badges{grid-template-columns:1fr;}
    .__PREFIX__ .hero-cta,.__PREFIX__ .hero-ctas{flex-direction:column;}
    .__PREFIX__ .hero-cta .btn,.__PREFIX__ .hero-ctas .btn{width:100%;justify-content:center;}
    .__PREFIX__ .container{padding:0 20px;}
  }
`;

function detectPrefix(content) {
  const m = content.match(/className="([a-z]{2,3}-page)"/);
  if (m) return m[1];
  const m2 = content.match(/\.([a-z]{2,3}-page)\s*\{/);
  if (m2) return m2[1];
  return null;
}

let changed = 0;

for (const file of files) {
  const filePath = path.join(ROOT, file);
  let content = fs.readFileSync(filePath, "utf8");
  if (!content.includes("hero-split") && !content.includes("hero-split")) continue;
  if (!content.includes("padding-top:11") && !content.includes("padding:96px 0 70px") && !content.includes("hero-split")) continue;

  const prefix = detectPrefix(content);
  if (!prefix) continue;

  const original = content;

  for (const [re, rep] of heroPaddingReplacements) {
    content = content.replace(re, rep);
  }

  // Fix unscoped hero-split rules in media queries
  content = content.replace(
    /@media\(max-width:980px\)\{\s*\.hero-split/g,
    `@media(max-width:980px){.${prefix} .hero-split`
  );
  content = content.replace(
    /@media\(max-width:980px\)\{\s*\n\s*\.hero-split/g,
    `@media(max-width:980px){\n    .${prefix} .hero-split`
  );

  const marker = "/* PR hero responsive fix */";
  if (!content.includes(marker)) {
    const block = HERO_RESPONSIVE_BLOCK.replaceAll("__PREFIX__", prefix);
    const insertAt = content.lastIndexOf("`}</style>");
    if (insertAt !== -1) {
      content =
        content.slice(0, insertAt) +
        marker +
        block +
        content.slice(insertAt);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    changed++;
    console.log("Updated:", file);
  }
}

console.log(`Done. ${changed} file(s) updated.`);
