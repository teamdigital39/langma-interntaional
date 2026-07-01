const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "../src/Pages/HomePages/SouthKorian.html");
const outPath = path.join(__dirname, "../src/Pages/HomePages/StudyInSouthKorea.jsx");
const html = fs.readFileSync(htmlPath, "utf8");

const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const css = cssMatch ? cssMatch[1] : "";

const start = html.indexOf("<!-- HERO -->");
const part1End = html.indexOf("<!-- FAQ -->");
const part2Start = html.indexOf("<!-- FINAL CTA -->");
const part2End = html.indexOf("<!-- FOOTER -->");

const transform = (chunk) =>
  chunk
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\bclass=/g, "className=")
    .replace(
      /onclick="document\.getElementById\('final-cta'\)\.scrollIntoView\(\{behavior:'smooth'\}\)"/g,
      "onClick={openForm}"
    )
    .replace(
      /onclick="document\.getElementById\('faq'\)\.scrollIntoView\(\{behavior:'smooth'\}\)"/g,
      'onClick={() => scrollTo("faq")}'
    )
    .replace(/<br>/g, "<br />")
    .replace(
      /<button className="cta-btn-gold">/g,
      '<button type="button" className="cta-btn-gold" onClick={openForm}>'
    )
    .replace(/<button className="cta-strip-btn"/g, '<button type="button" className="cta-strip-btn"')
    .replace(/<button className="btn-primary"/g, '<button type="button" className="btn-primary"')
    .replace(/<button className="btn-secondary"/g, '<button type="button" className="btn-secondary"');

const bodyPart1 = transform(html.slice(start, part1End));
const bodyPart2 = transform(html.slice(part2Start, part2End));

const faqItems = [];
const faqRegex =
  /<div class="faq-item[^"]*">[\s\S]*?<div class="faq-q"[\s\S]*?>\s*([\s\S]*?)\s*<span class="arrow">[\s\S]*?<\/div>\s*<div class="faq-a">([\s\S]*?)<\/div>/g;
let fm;
while ((fm = faqRegex.exec(html)) !== null) {
  faqItems.push({
    q: fm[1].replace(/\s+/g, " ").trim(),
    a: fm[2].replace(/\s+/g, " ").trim(),
  });
}

const escapedCss = css.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const bodyMarkup = bodyPart1
  .split("\n")
  .map((line) => "      " + line)
  .join("\n");

const finalCtaMarkup = bodyPart2
  .split("\n")
  .map((line) => "      " + line)
  .join("\n");

const finalComponent = `import React, { useState, useEffect } from "react";
import PopupForm from "./PopupForm";

const FAQ_ITEMS = ${JSON.stringify(faqItems, null, 2)};

export default function StudyInSouthKorea() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [open, setOpen] = useState(false);

  const openForm = () => setOpen(true);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".benefit-card,.cost-card,.course-card,.langma-card,.work-card")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        el.style.transition = "opacity .45s ease, transform .45s ease";
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sk-page" style={{ overflowX: "hidden", maxWidth: "100%" }}>
      <style>{\`${escapedCss}\`}</style>

${bodyMarkup}

      <section className="faq" id="faq">
        <div className="container">
          <div className="faq-wrapper">
            <div className="faq-sidebar">
              <div className="section-label">FAQs</div>
              <h3>Answers to Your Top Questions</h3>
              <p>Still have questions? Our Korea education specialists are available for a free consultation — no sales pressure, just honest answers.</p>
              <button type="button" className="faq-contact-btn" onClick={openForm}>Ask Our Korea Team →</button>
            </div>
            <div className="faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={item.q} className={\`faq-item \${openFAQ === i ? "open" : ""}\`}>
                  <button type="button" className="faq-q" onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}>
                    {item.q}
                    <span className="arrow">▾</span>
                  </button>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

${finalCtaMarkup}

      <PopupForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
`;

fs.writeFileSync(outPath, finalComponent);
console.log("Wrote", outPath, "FAQ items:", faqItems.length);
