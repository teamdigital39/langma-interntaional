import fs from "fs";
import path from "path";

const root = path.resolve("src/Pages/HomePages");
const studyFiles = [
  "StudyInCyprus.jsx", "Studynew.jsx", "StudyInNetherlands.jsx", "StudyInSouthKorea.jsx",
  "StudyInMalta.jsx", "StudyInMauritius.jsx", "StudyInSingapore.jsx", "StudyInGeorgia.jsx",
  "StudyPolandPage.jsx",
];

const studyImport =
  'import { STUDY_ABROAD_COLORS as C, STUDY_ABROAD_FONTS_URL, STUDY_ABROAD_BODY_FONT } from "../../theme/brandTheme";\n';

for (const name of studyFiles) {
  const file = path.join(root, name);
  let content = fs.readFileSync(file, "utf8");
  if (content.includes("brandTheme")) {
    console.log("already ok:", name);
    continue;
  }
  const idx = content.indexOf("const C = {");
  if (idx === -1) {
    console.warn("no C block:", name);
    continue;
  }
  const end = content.indexOf("};", idx);
  if (end === -1) {
    console.warn("no C end:", name);
    continue;
  }
  const after = content.slice(end + 2).replace(/^\s+/, "");
  const before = content.slice(0, idx).trimEnd() + "\n";
  content = before + studyImport + "\n" + after;
  content = content.replace(
    /fontFamily:\s*["']STUDY_ABROAD_BODY_FONT["']/g,
    "fontFamily: STUDY_ABROAD_BODY_FONT"
  );
  fs.writeFileSync(file, content);
  console.log("imported:", name);
}
