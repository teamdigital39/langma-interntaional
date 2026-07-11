import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, "../src/Pages/HomePages");

const studyFiles = [
  "StudyInCyprus.jsx",
  "StudyInMalta.jsx",
  "StudyInDubai.jsx",
  "Studynew.jsx",
  "StudyInGeorgia.jsx",
  "StudyInMauritius.jsx",
  "StudyInNetherlands.jsx",
  "StudyInSingapore.jsx",
  "StudyInSouthKorea.jsx",
  "StudyPolandPage.jsx",
];

const SECTION_HEAD_OLD = `function SectionHead({ style, tag, title, sub, light, center }) {
  return (
    <Reveal>
      <div
        style={{
          marginBottom: 52,
          maxWidth: 760,
          margin: center ? "0 auto 52px" : "0 0 52px 0",
          textAlign: center ? "center" : "left",
          ...style,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            padding: "6px 14px 6px 8px",
            background: light ? "rgba(240,192,64,0.12)" : C.goldTint,
            border: \`1px solid \${light ? "rgba(240,192,64,0.25)" : C.goldSoft}\`,
            borderRadius: 999,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              background: C.navy,
              borderRadius: "50%",
              boxShadow: \`0 0 0 4px \${light ? "rgba(240,192,64,0.18)" : "rgba(26,46,90,0.12)"}\`,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#FFFFFF",
            }}
          >
            {tag}
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 3.6vw, 46px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.6px",
            color: light ? C.white : C.ink,
            margin: 0,
            marginBottom: sub ? 16 : 0,
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "#FFFFFF",
              margin: 0,
              maxWidth: 640,
              marginLeft: center ? "auto" : 0,
              marginRight: center ? "auto" : 0,
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  );
}`;

const SECTION_HEAD_NEW = `function SectionHead({ style, tag, title, sub, light, center }) {
  return (
    <Reveal>
      <div
        style={{
          marginBottom: 52,
          maxWidth: 760,
          margin: center ? "0 auto 52px" : "0 0 52px 0",
          textAlign: center ? "center" : "left",
          ...style,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            padding: "6px 14px 6px 8px",
            background: C.goldSoft,
            border: "1px solid rgba(47,199,161,0.22)",
            borderRadius: 999,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              background: C.gold,
              borderRadius: "50%",
              boxShadow: "0 0 0 4px rgba(47,199,161,0.15)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: C.navy,
            }}
          >
            {tag}
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 3.6vw, 46px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.6px",
            color: C.ink,
            margin: 0,
            marginBottom: sub ? 16 : 0,
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: C.slate,
              margin: 0,
              maxWidth: 640,
              marginLeft: center ? "auto" : 0,
              marginRight: center ? "auto" : 0,
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  );
}`;

function themeStudyFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  if (content.includes(SECTION_HEAD_OLD)) {
    content = content.replace(SECTION_HEAD_OLD, SECTION_HEAD_NEW);
  }

  const pairs = [
    // BoardingStat — light stats strip
    ['borderRight: `1px solid rgba(255,255,255,0.08)`', 'borderRight: `1px solid ${C.border}`'],
    ['color: "rgba(255,255,255,0.85)"', 'color: C.slate'],
    ['color: "rgba(255,255,255,0.45)"', 'color: C.muted'],
    // Hero stats container
    ['background: C.navyDark,\n                border: "1px solid rgba(240,192,64,0.18)"', 'background: C.white,\n                border: `1px solid ${C.border}`,\n                boxShadow: "0 10px 30px -15px rgba(6,40,37,0.1)"'],
    // Marquee
    ['background: C.navyDark,\n        color: "#FFFFFF"', 'background: C.cream2,\n        color: C.navy'],
    ['borderTop: `1px solid rgba(240,192,64,0.15)`,\n        borderBottom: `1px solid rgba(240,192,64,0.15)`', 'borderTop: `1px solid ${C.border}`,\n        borderBottom: `1px solid ${C.border}`'],
    // Strip CTA
    ['background: `linear-gradient(90deg, ${C.navy}, ${C.navyL})`', 'background: C.goldSoft'],
    ['<p style={{ color: C.white, fontSize: 15.5', '<p style={{ color: C.ink, fontSize: 15.5'],
    // Dark section backgrounds → light
    ['background: `linear-gradient(135deg, ${C.navyDark}, ${C.navyD})`', 'background: C.cream2'],
    ['background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD} 60%, ${C.navy})`', 'background: C.white'],
    ['background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD})`', 'background: C.cream2'],
    // FactRow
    ['background: h ? "rgba(240,192,64,0.08)" : "transparent"', 'background: h ? C.goldSoft : "transparent"'],
    ['borderBottom: "1px solid rgba(255,255,255,0.06)"', 'borderBottom: `1px solid ${C.border}`'],
    ['color: "rgb(255, 255, 255)"', 'color: C.slate'],
    ['color: "white",\n          textAlign: "right"', 'color: C.ink,\n          textAlign: "right"'],
    // Fact / lang cards
    ['background: "rgba(255,255,255,0.03)"', 'background: C.white'],
    ['border: "1px solid rgba(240,192,64,0.15)"', 'border: `1px solid ${C.border}`'],
    ['background: "rgba(255,255,255,0.04)"', 'background: C.white'],
    ['border: "1px solid rgba(240,192,64,0.18)"', 'border: `1px solid ${C.border}`'],
    // DocsBox
    ['background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyD})`,\n          padding: 34', 'background: C.white,\n          border: `1px solid ${C.border}`,\n          boxShadow: "0 10px 30px -15px rgba(6,40,37,0.08)",\n          padding: 34'],
    ['color: C.white,\n            marginBottom: 20,\n            display: "flex"', 'color: C.ink,\n            marginBottom: 20,\n            display: "flex"'],
    ['color: "rgba(255,255,255,0.75)"', 'color: C.slate'],
    ['color: "rgba(255,255,255,0.7)"', 'color: C.slate'],
    ['color: "rgba(255,255,255,0.65)"', 'color: C.slate'],
    ['color: "rgba(255,255,255,0.55)"', 'color: C.slate'],
    ['color: "rgba(255,255,255,0.82)"', 'color: C.ink'],
    ['<strong style={{ color: "#FFFFFF" }}>', '<strong style={{ color: C.navy }}>'],
  ];

  for (const [from, to] of pairs) {
    content = content.split(from).join(to);
  }

  // SupportCard — white cards
  content = content.replace(
    /background: h \? "rgba\(240,192,64,0\.1\)" : "rgba\(255,255,255,0\.03\)"/g,
    'background: h ? C.goldSoft : C.white'
  );
  content = content.replace(
    /border: `1px solid \$\{h \? "rgba\(240,192,64,0\.35\)" : "rgba\(255,255,255,0\.06\)"\}`/g,
    'border: `1px solid ${h ? C.gold : C.border}`'
  );
  content = content.replace(
    /<h4 style=\{\{ fontSize: 15, fontWeight: 700, color: C\.white, marginBottom: 8 \}\}>/g,
    '<h4 style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 8 }}>'
  );

  // Language / career section headings on cards
  content = content.replace(
    /color: C\.white,\n                      marginBottom: 20,\n                      paddingBottom: 14,\n                      borderBottom: `2px solid \$\{C\.gold\}`/g,
    'color: C.ink,\n                      marginBottom: 20,\n                      paddingBottom: 14,\n                      borderBottom: `2px solid ${C.gold}`'
  );

  // Career tags
  content = content.replace(
    /background: "rgba\(255,255,255,0\.07\)",\n                    border: "1px solid rgba\(255,255,255,0\.14\)",\n                    color: "rgba\(255,255,255,0\.85\)"/g,
    'background: C.white,\n                    border: `1px solid ${C.border}`,\n                    color: C.ink'
  );

  // CostCard highlight — mint tint instead of navy block
  content = content.replace(
    /background: highlight \? C\.navy : h \? C\.goldTint : C\.white/g,
    'background: highlight ? C.goldSoft : h ? C.goldSoft : C.white'
  );
  content = content.replace(
    /border: `1px solid \$\{highlight \? C\.navy : C\.border\}`/g,
    'border: `1px solid ${highlight ? C.gold : C.border}`'
  );
  content = content.replace(
    /color: highlight \? "rgba\(255,255,255,0\.7\)" : C\.slate/g,
    'color: C.slate'
  );
  content = content.replace(
    /color: highlight \? C\.white : C\.ink/g,
    'color: C.ink'
  );
  content = content.replace(
    /color: highlight \? "rgba\(255,255,255,0\.55\)" : C\.muted/g,
    'color: C.muted'
  );

  // NavyButton default → homepage dark CTA
  content = content.replace(
    /background: h \? C\.navyL : C\.navy,/g,
    'background: h ? C.dark : C.navy,'
  );

  // Strip CTA button
  content = content.replace(
    /background: C\.white,\n            color: C\.navy,/g,
    'background: C.dark,\n            color: C.white,'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log("Themed:", path.basename(filePath));
    return true;
  }
  return false;
}

let count = 0;
for (const file of studyFiles) {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath) && themeStudyFile(filePath)) count++;
}

// Pass 2 — remaining dark fragments
function pass2(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  content = content.replace(
    /background: light \? "rgba\(240,192,64,0\.12\)" : C\.goldTint,\s*border: `1px solid \$\{light \? "rgba\(240,192,64,0\.25\)" : C\.goldSoft\}`,/g,
    'background: C.goldSoft,\n            border: "1px solid rgba(47,199,161,0.22)",'
  );
  content = content.replace(
    /boxShadow: `0 0 0 4px \$\{light \? "rgba\(240,192,64,0\.18\)" : "rgba\(26,46,90,0\.12\)"\}`/g,
    'boxShadow: "0 0 0 4px rgba(47,199,161,0.15)"'
  );
  content = content.replace(
    /letterSpacing: "2\.5px",\s*textTransform: "uppercase",\s*color: "#FFFFFF",/g,
    'letterSpacing: "2.5px",\n              textTransform: "uppercase",\n              color: C.navy,'
  );
  content = content.replace(
    /lineHeight: 1\.75,\s*color: "#FFFFFF",\s*margin: 0,\s*maxWidth: 640,/g,
    'lineHeight: 1.75,\n              color: C.slate,\n              margin: 0,\n              maxWidth: 640,'
  );
  content = content.replace(/color: light \? C\.white : C\.ink,/g, "color: C.ink,");
  content = content.replace(/background: C\.navyDark,/g, "background: C.white,");
  content = content.replace(
    /color: "#FFFFFF",\s*padding: "14px 0"/g,
    'color: C.navy,\n        padding: "14px 0"'
  );
  content = content.replace(
    'borderTop: `1px solid rgba(240,192,64,0.15)`,\n        borderBottom: `1px solid rgba(240,192,64,0.15)`',
    'borderTop: `1px solid ${C.border}`,\n        borderBottom: `1px solid ${C.border}`'
  );

  // CourseCard — light hover
  content = content.replace(/background: h \? C\.navy : C\.white,/g, "background: h ? C.goldSoft : C.white,");
  content = content.replace(
    /border: `1px solid \$\{h \? C\.navy : C\.border\}`,\s*padding: "28px 24px"/g,
    'border: `1px solid ${h ? C.gold : C.border}`,\n          padding: "28px 24px"'
  );
  content = content.replace(/color: h \? C\.white : C\.ink,\s*marginBottom: 8/g, "color: C.ink,\n            marginBottom: 8");
  content = content.replace(/color: h \? "rgba\(255,255,255,0\.75\)" : C\.slate/g, "color: C.slate");
  content = content.replace(
    /background: h \? "rgba\(255,255,255,0\.15\)" : C\.goldTint,\s*color: h \? "#FFFFFF" : "#296166"/g,
    'background: h ? C.gold : C.goldTint,\n            color: h ? C.white : C.navy'
  );

  // Language requirement cards
  content = content.replace(
    /fontWeight: 600,\s*color: C\.white,\s*marginBottom: 20,\s*paddingBottom: 14,\s*borderBottom: `2px solid \$\{C\.gold\}`/g,
    "fontWeight: 600,\n                      color: C.ink,\n                      marginBottom: 20,\n                      paddingBottom: 14,\n                      borderBottom: `2px solid ${C.gold}`"
  );
  content = content.replace(
    /borderBottom: idx === arr\.length - 1 \? "none" : "1px solid rgba\(255,255,255,0\.06\)"/g,
    'borderBottom: idx === arr.length - 1 ? "none" : `1px solid ${C.border}`'
  );
  content = content.replace(
    /fontWeight: 700,\s*color: "#FFFFFF",\s*padding: "4px 12px",\s*background: "rgba\(240,192,64,0\.12\)"/g,
    'fontWeight: 700,\n                          color: C.navy,\n                          padding: "4px 12px",\n                          background: C.goldSoft'
  );

  // Career tags
  content = content.replace(
    /background: "rgba\(255,255,255,0\.07\)",\s*border: "1px solid rgba\(255,255,255,0\.14\)",\s*color: C\.slate/g,
    "background: C.white,\n                    border: `1px solid ${C.border}`,\n                    color: C.ink"
  );

  // Hero stats box shadow
  content = content.replace(
    /background: C\.white,\n                border: `1px solid \$\{C\.border\}`,\n                borderRadius: 18,\n                overflow: "hidden",\n                marginTop: 56,/g,
    'background: C.white,\n                border: `1px solid ${C.border}`,\n                boxShadow: "0 10px 30px -15px rgba(6,40,37,0.1)",\n                borderRadius: 18,\n                overflow: "hidden",\n                marginTop: 56,'
  );

  // Visa step circle — homepage dark CTA
  content = content.replace(
    /background: `linear-gradient\(135deg, \$\{C\.navy\}, \$\{C\.navyL\}\)`,\s*color: C\.white,/g,
    "background: C.dark,\n            color: C.white,"
  );

  // DocsBox checkmark badge
  content = content.replace(
    /color: "#FFFFFF",\s*borderRadius: "50%",\s*display: "inline-flex",\s*alignItems: "center",\s*justifyContent: "center",\s*fontSize: 11,/g,
    'color: C.navy,\n                borderRadius: "50%",\n                display: "inline-flex",\n                alignItems: "center",\n                justifyContent: "center",\n                fontSize: 11,'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log("Pass 2:", path.basename(filePath));
    return true;
  }
  return false;
}

for (const file of studyFiles) {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) pass2(filePath);
}

console.log(`Done. ${count} study pages updated (pass 1).`);
