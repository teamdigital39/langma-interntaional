import fs from "fs";
import path from "path";

const root = path.resolve("src/Pages/HomePages");

const prFiles = [
  "CyprusPRPage.jsx",
  "AndorraPR.jsx",
  "AustriaPR.jsx",
  "SwitzerlandPR.jsx",
  "MaltaGlobalResidenceProgrammePage.jsx",
  "MaltaResidencyProgram.jsx",
  "MaltaNomad.jsx",
  "Portugal_D7.jsx",
  "Portugal_D8.jsx",
  "PortugalStartup.jsx",
  "PortugalGlobalTalent.jsx",
  "SpainNLVPage.jsx",
  "SpainDNV.jsx",
  "ItalyDNV.jsx",
  "HungaryWhiteCard.jsx",
  "HungaryBusiness.jsx",
  "EB5USA.jsx",
  "IndonesiaSecondHomeVisa.jsx",
  "ThilandEliteVisa.jsx",
  "Investment1.jsx",
  "PRByInvestment.jsx",
  "WhyChoosePR.jsx",
  "Form2.jsx",
];

const THEME_TEAL = "#296166";
const THEME_TEAL_HOVER = "#1f4a4e";

function fixPrBackgrounds(content) {
  let c = content;

  // CSS variables: dark navy → theme teal for section backgrounds
  c = c.replace(/--navy-deep:\s*#1A2540/gi, `--navy-deep:${THEME_TEAL}`);
  c = c.replace(/--navy:\s*#1A2540/gi, `--navy:${THEME_TEAL}`);

  // Hardcoded dark section backgrounds
  c = c.replace(/background:\s*#1A2540/gi, `background:${THEME_TEAL}`);
  c = c.replace(/background-color:\s*#1A2540/gi, `background-color:${THEME_TEAL}`);

  // Scrolled header / mobile nav overlays
  c = c.replace(/rgba\(26,\s*37,\s*64,\s*0\.94\)/gi, "rgba(41,97,102,0.94)");
  c = c.replace(/rgba\(26,\s*37,\s*64,\s*0\.92\)/gi, "rgba(41,97,102,0.92)");

  // Tailwind PR hub buttons
  c = c.replace(/bg-\[#1A2540\]/g, `bg-[${THEME_TEAL}]`);
  c = c.replace(/hover:bg-\[#243160\]/g, `hover:bg-[${THEME_TEAL_HOVER}]`);

  return c;
}

for (const name of prFiles) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) {
    console.warn("skip (missing):", name);
    continue;
  }
  const before = fs.readFileSync(file, "utf8");
  const after = fixPrBackgrounds(before);
  if (before !== after) {
    fs.writeFileSync(file, after);
    console.log("updated:", name);
  } else {
    console.log("unchanged:", name);
  }
}
