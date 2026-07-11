import fs from "fs";
import path from "path";

const root = path.resolve("src/Pages/HomePages");

const prFiles = [
  "CyprusPRPage.jsx", "AndorraPR.jsx", "AustriaPR.jsx", "SwitzerlandPR.jsx",
  "MaltaGlobalResidenceProgrammePage.jsx", "MaltaResidencyProgram.jsx", "MaltaNomad.jsx",
  "Portugal_D7.jsx", "Portugal_D8.jsx", "PortugalStartup.jsx", "PortugalGlobalTalent.jsx",
  "SpainNLVPage.jsx", "SpainDNV.jsx", "ItalyDNV.jsx",
  "HungaryWhiteCard.jsx", "HungaryBusiness.jsx", "EB5USA.jsx",
  "IndonesiaSecondHomeVisa.jsx", "ThilandEliteVisa.jsx", "PRAssessment.jsx",
];

const studyFiles = [
  "StudyInCyprus.jsx", "Studynew.jsx", "StudyInNetherlands.jsx", "StudyInSouthKorea.jsx",
  "StudyInMalta.jsx", "StudyInMauritius.jsx", "StudyInSingapore.jsx", "StudyInGeorgia.jsx",
  "StudyPolandPage.jsx",
];

const studyCImport =
  'import { STUDY_ABROAD_COLORS as C, STUDY_ABROAD_FONTS_URL, STUDY_ABROAD_BODY_FONT } from "../../theme/brandTheme";\n\n';

const studyCBlock = /const C = \{[\s\S]*?\};\n\n/;

const prReplacements = [
  ["linear-gradient(135deg,#0E1F3D 0%,#0E2A46 55%,#006064 100%)", "linear-gradient(135deg,#1A2540 0%,#296166 55%,#174C4A 100%)"],
  ["background-color:#0E1F3D", "background-color:#1A2540"],
  ["background:#0E1F3D", "background:#1A2540"],
  ["background:#0E2A46", "background:#1A2540"],
  ["--navy-deep:#0E1F3D", "--navy-deep:#1A2540"],
  ["--navy:#0E2A46", "--navy:#1A2540"],
  ["--navy-soft:#0E2A46", "--navy-soft:#296166"],
  ["--navy-mid:#006064", "--navy-mid:#296166"],
  ["--charcoal:#0E2A46", "--charcoal:#1B2B28"],
  ["--ink:#0E2A46", "--ink:#1B2B28"],
  ["--royal:#17a398", "--royal:#2FC7A1"],
  ["--royal-deep:#006064", "--royal-deep:#296166"],
  ["--gold-soft:#4EC7B8", "--gold-soft:#6FE0C6"],
  ["--gold-deep:#17a398", "--gold-deep:#2FC7A1"],
  ["#006064", "#296166"],
  ["#4EC7B8", "#6FE0C6"],
  ["#17a398", "#2FC7A1"],
  ["#0E1F3D", "#296166"],
  ["#0E2A46", "#1B2B28"],
  ["#F7FAFC", "#F5F8F6"],
  ["#E8F4F2", "#E9F1EE"],
  ["#E9F7F6", "#E6F8F3"],
  ["#EEF7F7", "#F5F8F6"],
  ["#2E7D7B", "#296166"],
  ["#4FBDBA", "#2FC7A1"],
  ["#2F6E73", "#296166"],
  ["#0C5F5F", "#1A2540"],
  ["rgba(14,96,100,", "rgba(41,97,102,"],
  ["rgba(14,31,61,", "rgba(26,37,64,"],
  ["rgba(79,189,186,", "rgba(47,199,161,"],
];

const studyReplacements = [
  ["#429198", "#296166"],
  ["#4197a2", "#296166"],
  ["#1ab7ac", "#2FC7A1"],
  ["#1AB7AC", "#296166"],
  ["#006C70", "#1A2540"],
  ["#00575a", "#243160"],
  ["#15224C", "#1B2B28"],
  ["#2C6D73", "#296166"],
  ["#C7E8E5", "#E6F8F3"],
  ["#f5f5f5", "#F5F8F6"],
  ["#FDF3C8", "#E6F8F3"],
  ["#FFFAE8", "#E9F1EE"],
  ["#F5F7FA", "#F5F8F6"],
  ["#E8EDF5", "#E9F1EE"],
  ["'DM Sans', sans-serif", "STUDY_ABROAD_BODY_FONT"],
  ["@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');", "@import url('${STUDY_ABROAD_FONTS_URL}');"],
];

function applyReplacements(content, pairs) {
  for (const [from, to] of pairs) content = content.split(from).join(to);
  return content;
}

function fixPrDarkPanels(content) {
  return content
    .replace(/background:#1B2B28/g, "background:#1A2540")
    .replace(/background-color:#1B2B28/g, "background-color:#1A2540")
    .replace(/\.btn-dark \{ background:#296166/g, ".btn-dark { background:#1A2540")
    .replace(/\.stats-bar \{ background:#296166/g, ".stats-bar { background:#1A2540")
    .replace(/\.langma \{ background:#296166/g, ".langma { background:#1A2540")
    .replace(/\.foot \{ background:#296166/g, ".foot { background:#1A2540")
    .replace(/\.prog \{ background:#296166/g, ".prog { background:#1A2540")
    .replace(/\.inv-row\.head \{ background:#296166/g, ".inv-row.head { background:#1A2540")
    .replace(/background:#296166; border-radius/g, "background:#1A2540; border-radius")
    .replace(/background:#296166; color:#F5F8F6; position:relative/g, "background:#1A2540; color:#F5F8F6; position:relative")
    .replace(/\.tl-item \.dot[^}]*background:#1B2B28/g, (m) => m.replace("#1B2B28", "#1A2540"))
    .replace(/background:#296166; color:#F5F8F6/g, "background:#1A2540; color:#F5F8F6")
    .replace(/\.process \{ background:#1B2B28/g, ".process { background:#1A2540")
    .replace(/\.lead-sec \{ background:#1B2B28/g, ".lead-sec { background:#1A2540");
}

for (const name of prFiles) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) { console.warn("skip", name); continue; }
  let content = fs.readFileSync(file, "utf8");
  content = applyReplacements(content, prReplacements);
  content = fixPrDarkPanels(content);
  fs.writeFileSync(file, content);
  console.log("PR:", name);
}

for (const name of studyFiles) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) { console.warn("skip", name); continue; }
  let content = fs.readFileSync(file, "utf8");
  if (studyCBlock.test(content) && !content.includes("brandTheme")) {
    content = content.replace(studyCBlock, studyCImport);
  }
  content = applyReplacements(content, studyReplacements);
  if (name === "StudyPolandPage.jsx") {
    content = content.replace('background :"#296166"', 'background :"#296166"');
    content = content.replace('background :"#1AB7AC"', 'background :"#296166"');
  }
  fs.writeFileSync(file, content);
  console.log("Study:", name);
}
