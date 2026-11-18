const JLPT_BLOG_SLUG =
  "jlpt-vs-nat-test-differences-exam-pattern-passing-scores-registration-india";

export const JLPT_NAT_TEST_BLOG_SLUG = JLPT_BLOG_SLUG;

const PAGE_FOOTER =
  /^JLPT\s*&\s*NAT-TEST\s+Bilingual FAQ\s*\|\s*India\s*•\s*2026\s+Page\s+\d+$/i;

function replaceParagraph(paragraph, tagName, className, label, text) {
  const replacement = paragraph.ownerDocument.createElement(tagName);
  replacement.className = className;

  if (label) {
    const marker = paragraph.ownerDocument.createElement("span");
    marker.className = "blog-exam-marker";
    marker.textContent = label;
    replacement.append(marker, paragraph.ownerDocument.createTextNode(" "));
  }

  replacement.append(paragraph.ownerDocument.createTextNode(text));
  paragraph.replaceWith(replacement);
}

export function formatJpExamBlogContent(html = "") {
  if (typeof DOMParser === "undefined" || !html) return html;

  const document = new DOMParser().parseFromString(String(html), "text/html");
  const imported =
    document.querySelector('span[id^="docs-internal-guid"]') || document.body;
  const root = document.createElement("div");

  while (imported.firstChild) root.append(imported.firstChild);

  root.querySelectorAll("script, style, iframe, object, embed, form").forEach((node) =>
    node.remove()
  );

  root.querySelectorAll("*").forEach((element) => {
    [...element.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const allowed = ["href", "src", "alt", "title", "colspan", "rowspan", "scope"];
      if (!allowed.includes(name) || name.startsWith("on")) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  root.querySelectorAll("span").forEach((span) =>
    span.replaceWith(...Array.from(span.childNodes))
  );

  root.querySelectorAll("p").forEach((paragraph) => {
    const text = (paragraph.textContent || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    if (!text || PAGE_FOOTER.test(text)) {
      paragraph.remove();
      return;
    }

    const section = text.match(/^(\d+)\.\s+(.+)$/);
    if (section) {
      replaceParagraph(
        paragraph,
        "h2",
        "blog-exam-section-heading",
        section[1],
        section[2]
      );
      return;
    }

    const question = text.match(/^Q\.\s*(.+)$/i);
    if (question) {
      replaceParagraph(
        paragraph,
        "h3",
        "blog-exam-question",
        "Q.",
        question[1]
      );
      return;
    }

    if (/^Answer\s*:/i.test(text)) {
      paragraph.classList.add("blog-exam-answer");
      const answerText = text.replace(/^Answer\s*:\s*/i, "");
      const label = document.createElement("strong");
      label.className = "blog-exam-answer-label";
      label.textContent = "Answer";
      paragraph.replaceChildren(label, document.createTextNode(` ${answerText}`));
      return;
    }

    if (/^質問\s*[:：]/.test(text)) {
      paragraph.classList.add("blog-exam-japanese-question");
    } else if (/^答え\s*[:：]/.test(text)) {
      paragraph.classList.add("blog-exam-japanese-answer");
    }
  });

  root.querySelectorAll("div").forEach((element) => {
    if (element.querySelector(":scope > table")) {
      element.classList.add("blog-exam-table-wrap");
    }
  });

  root.querySelectorAll("table").forEach((table) => {
    table.classList.add("blog-exam-table");
    if (!table.parentElement?.classList.contains("blog-exam-table-wrap")) {
      const wrapper = document.createElement("div");
      wrapper.className = "blog-exam-table-wrap";
      table.replaceWith(wrapper);
      wrapper.append(table);
    }
  });

  root.querySelectorAll("br").forEach((lineBreak) => lineBreak.remove());
  return root.innerHTML;
}
