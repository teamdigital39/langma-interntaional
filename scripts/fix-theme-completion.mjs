import fs from "fs";
import path from "path";

const root = path.resolve("src/Pages/HomePages");

const studyFiles = [
  "StudyInCyprus.jsx", "Studynew.jsx", "StudyInNetherlands.jsx", "StudyInSouthKorea.jsx",
  "StudyInMalta.jsx", "StudyInMauritius.jsx", "StudyInSingapore.jsx", "StudyInGeorgia.jsx",
  "StudyPolandPage.jsx",
];

const prFiles = [
  "CyprusPRPage.jsx", "AndorraPR.jsx", "AustriaPR.jsx", "SwitzerlandPR.jsx",
  "MaltaGlobalResidenceProgrammePage.jsx", "MaltaResidencyProgram.jsx", "MaltaNomad.jsx",
  "Portugal_D7.jsx", "Portugal_D8.jsx", "PortugalStartup.jsx", "PortugalGlobalTalent.jsx",
  "SpainNLVPage.jsx", "SpainDNV.jsx", "ItalyDNV.jsx",
  "HungaryWhiteCard.jsx", "HungaryBusiness.jsx", "EB5USA.jsx",
  "IndonesiaSecondHomeVisa.jsx", "ThilandEliteVisa.jsx",
];

const studyImport =
  'import { STUDY_ABROAD_COLORS as C, STUDY_ABROAD_FONTS_URL, STUDY_ABROAD_BODY_FONT } from "../../theme/brandTheme";\n\n';
const studyCBlock = /const C = \{[\s\S]*?\};\n\n/;

function fixStudyFile(name) {
  const file = path.join(root, name);
  let content = fs.readFileSync(file, "utf8");
  if (!content.includes("brandTheme")) {
    content = content.replace(studyCBlock, studyImport);
  }
  content = content.replace(
    /fontFamily:\s*["']STUDY_ABROAD_BODY_FONT["']/g,
    "fontFamily: STUDY_ABROAD_BODY_FONT"
  );
  fs.writeFileSync(file, content);
  console.log("Study fixed:", name);
}

function lightPrHero(content) {
  // Multi-line hero blocks
  content = content.replace(
    /(\.[a-z0-9-]+-page \.hero \{\s*position:relative;\s*)min-height:100vh([\s\S]*?)color:(?:#F5F8F6|var\(--ivory\))([\s\S]*?)background:linear-gradient\([^;]+;([\s\S]*?\})/g,
    "$1min-height:auto$2color:#1B2B28$3background:#FFFFFF;padding:96px 0 70px;$4"
  );

  // Single-line hero blocks
  content = content.replace(
    /(\.[a-z0-9-]+-page \.hero \{)position:relative;min-height:100vh;display:flex;align-items:center;color:(?:#F5F8F6|var\(--ivory\));overflow:hidden;background:linear-gradient\([^)]+\);(\})/g,
    "$1position:relative;min-height:auto;display:flex;align-items:center;color:#1B2B28;overflow:hidden;background:#FFFFFF;padding:96px 0 70px;$2"
  );
  content = content.replace(
    /(\.[a-z0-9-]+-page \.hero \{)position:relative; min-height:100vh; display:flex; align-items:center; color:(?:#F5F8F6|var\(--ivory\)); overflow:hidden; background:linear-gradient\([^)]+\); \}/g,
    "$1position:relative; min-height:auto; display:flex; align-items:center; color:#1B2B28; overflow:hidden; background:#FFFFFF; padding:96px 0 70px; }"
  );

  // lg-page minified heroes (Malta, EB5, etc.)
  content = content.replace(
    /(\.lg-page \.hero \{)position:relative;min-height:100vh;display:flex;align-items:center;color:var\(--ivory\);overflow:hidden;background:linear-gradient\([^)]+\);(\})/g,
    "$1position:relative;min-height:auto;display:flex;align-items:center;color:#1B2B28;overflow:hidden;background:#FFFFFF;padding:96px 0 70px;$2"
  );
  content = content.replace(
    /(\.lg-page \.hero\{)position:relative;min-height:100vh;display:flex;align-items:center;color:var\(--ivory\);overflow:hidden;background:linear-gradient\([^)]+\);(\})/g,
    "$1position:relative;min-height:auto;display:flex;align-items:center;color:#1B2B28;overflow:hidden;background:#FFFFFF;padding:96px 0 70px;$2"
  );

  // Malta residency / nomad hero blocks
  content = content.replace(
    /(\.mr-page \.hero\{[\s\S]*?)min-height:100vh([\s\S]*?)color:var\(--ivory\)([\s\S]*?)background:linear-gradient\([^;]+;([\s\S]*?\})/g,
    "$1min-height:auto$2color:#1B2B28$3background:#FFFFFF;padding:96px 0 70px;$4"
  );

  const heroText = [
    [/(\.[a-z0-9-]+-page \.hero h1 \{[^}]*?)color:(?:#F5F8F6|var\(--ivory\))/g, "$1color:#1B2B28"],
    [/(\.[a-z0-9-]+-page \.hero h1 em \{[^}]*?)color:(?:#6FE0C6|var\(--gold-soft\))/g, "$1color:#4FA3D1"],
    [/(\.[a-z0-9-]+-page \.hero \.lead \{[^}]*?)color:rgba\(247,250,252,\.82\)/g, "$1color:#4C5C58"],
    [/(\.[a-z0-9-]+-page \.hero-badges \{[^}]*?)border-top:1px solid rgba\(247,250,252,\.18\)/g, "$1border-top:1px solid #D8E0EC"],
    [/(\.[a-z0-9-]+-page \.hero-badge \.num \{[^}]*?)color:(?:#6FE0C6|var\(--gold-soft\))/g, "$1color:#296166"],
    [/(\.[a-z0-9-]+-page \.hero-badge \.lbl \{[^}]*?)color:rgba\(247,250,252,\.68\)/g, "$1color:#7E8C88"],
    [/(\.[a-z0-9-]+-page \.btn-ghost \{[^}]*?)color:#F5F8F6; border:1px solid rgba\(247,250,252,\.45\)/g, "$1color:#1A2540; border:2px solid #2FC7A1"],
    [/(\.[a-z0-9-]+-page \.btn-ghost:hover \{[^}]*?)border-color:#2FC7A1; color:#6FE0C6/g, "$1border-color:#2FC7A1; color:#296166"],
    [/(\.[a-z0-9-]+-page \.scroll-hint \{[^}]*?)color:rgba\(247,250,252,\.40\)/g, "$1color:#7E8C88"],
  ];
  for (const [re, rep] of heroText) content = content.replace(re, rep);

  return content;
}

for (const name of studyFiles) fixStudyFile(name);

for (const name of prFiles) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) {
    console.warn("skip PR:", name);
    continue;
  }
  let content = fs.readFileSync(file, "utf8");
  content = lightPrHero(content);
  fs.writeFileSync(file, content);
  console.log("PR hero:", name);
}

const studyAbroad = path.join(root, "StudyAbrotHeroSection1.jsx");
let sa = fs.readFileSync(studyAbroad, "utf8");
sa = sa.replace(
  `/* ===================== HERO ===================== */
.hero{
  position:relative;overflow:hidden;
  background:
    radial-gradient(ellipse at 18% -10%, rgba(47,199,161,.16), transparent 55%),
    radial-gradient(ellipse at 100% 10%, rgba(79,163,209,.12), transparent 50%),
    linear-gradient(180deg, var(--teal) 0%, var(--teal-deep) 100%);
  color:var(--ivory);
  padding:96px 0 0;
}
.hero__flightpath{position:absolute;inset:0;width:100%;height:100%;opacity:.55;pointer-events:none;}
.hero__inner{position:relative;z-index:2;max-width:var(--container);margin:0 auto;padding:0 28px;display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center;}
.hero__copy{max-width:640px;}
.hero__eyebrow-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:26px;}
.hero h1{font-size:clamp(38px,5.4vw,68px);line-height:1.04;font-weight:600;color:var(--white);}
.hero h1 em{font-style:italic;color:var(--mint-light);font-weight:500;}
.hero__sub{margin-top:24px;font-size:18px;line-height:1.7;color:rgba(248,246,242,.78);max-width:560px;}
.hero__trust{margin-top:18px;font-size:14.5px;color:rgba(248,246,242,.6);max-width:560px;}
.hero__ctas{display:flex;gap:16px;margin-top:36px;flex-wrap:wrap;}
.hero__micro{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px;}
.hero__micro span{font-size:12.5px;color:rgba(248,246,242,.65);display:inline-flex;align-items:center;gap:6px;}
.hero__micro span::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--mint);}

.hero__panel{
  position:relative;background:rgba(255,255,255,.04);border:1px solid rgba(47,199,161,.25);
  border-radius:var(--radius-lg);padding:30px;backdrop-filter:blur(6px);
}
.hero__panel-title{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mint-light);font-weight:600;margin-bottom:18px;}
.hero__flags{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:26px;}
.hero__flags .chip--light{padding:7px 13px;font-size:12px;}
.hero__stats{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
.hero__stat b{display:block;font-family:var(--font-display);font-size:30px;color:var(--white);font-weight:600;}
.hero__stat span{display:block;font-size:12px;color:rgba(248,246,242,.6);margin-top:4px;}`,
  `/* ===================== HERO ===================== */
.hero{
  position:relative;overflow:hidden;
  background:#FFFFFF;
  color:var(--ink);
  padding:80px 0 60px;
}
.hero::before{
  content:"";position:absolute;left:28px;top:80px;bottom:80px;width:3px;border-radius:999px;
  background:linear-gradient(to bottom,transparent,var(--mint),transparent);
  opacity:.85;pointer-events:none;
}
.hero__flightpath{display:none;}
.hero__inner{position:relative;z-index:2;max-width:var(--container);margin:0 auto;padding:0 28px;display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center;}
.hero__copy{max-width:640px;padding-left:18px;}
.hero__eyebrow-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:26px;}
.hero h1{font-size:clamp(38px,5.4vw,68px);line-height:1.04;font-weight:600;color:#111827;}
.hero h1 em{font-style:italic;color:var(--sky);font-weight:500;}
.hero__sub{margin-top:24px;font-size:18px;line-height:1.7;color:var(--ink-soft);max-width:560px;}
.hero__trust{margin-top:18px;font-size:14.5px;color:var(--ink-faint);max-width:560px;}
.hero__ctas{display:flex;gap:16px;margin-top:36px;flex-wrap:wrap;}
.hero__micro{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px;}
.hero__micro span{font-size:12.5px;color:var(--ink-faint);display:inline-flex;align-items:center;gap:6px;}
.hero__micro span::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--mint);}

.hero__panel{
  position:relative;background:var(--ivory);border:1px solid rgba(47,199,161,.22);
  border-radius:var(--radius-lg);padding:30px;
}
.hero__panel-title{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mint);font-weight:600;margin-bottom:18px;}
.hero__flags{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:26px;}
.hero__flags .chip--light{padding:7px 13px;font-size:12px;background:var(--mint-dim);color:var(--teal);border-color:var(--teal-line);}
.hero__stats{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
.hero__stat b{display:block;font-family:var(--font-display);font-size:30px;color:var(--teal);font-weight:600;}
.hero__stat span{display:block;font-size:12px;color:var(--ink-faint);margin-top:4px;}`
);
fs.writeFileSync(studyAbroad, sa);
console.log("Study abroad landing hero updated");
