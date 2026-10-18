import { useEffect } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import "./LegalDocument.css";

type LegalDocumentProps = {
  title: string;
  description: string;
  canonicalPath: string;
  markdown: string;
  articleLabel: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(
      /\[([^\]]+)\]\(((?:https?:\/\/|\/(?!\/))[^)\s]+)\)/g,
      '<a href="$2">$1</a>',
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(
      /\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi,
      '<a href="mailto:$1">$1</a>',
    );
}

function headingText(value: string) {
  return value.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

function slugify(value: string) {
  return headingText(value)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function renderLegalMarkdown(markdown: string) {
  const output: string[] = [];
  let currentSection = false;
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listType: "ol" | "ul" | null = null;

  const closeSection = () => {
    if (currentSection) {
      output.push("</section>");
      currentSection = false;
    }
  };
  const flushParagraph = () => {
    if (paragraph.length) {
      const isDisclaimer =
        paragraph[0].startsWith("**VEYNS IS NOT A MEDICAL PROVIDER") ||
        paragraph[0].startsWith("**THIS SECTION CONTAINS IMPORTANT");
      const content = renderInlineMarkdown(paragraph.join(" "));
      output.push(
        isDisclaimer
          ? `<p class="legal-disclaimer">${content}</p>`
          : `<p>${content}</p>`,
      );
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems.length && listType) {
      const items = listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("");
      output.push(`<${listType}>${items}</${listType}>`);
      listItems = [];
      listType = null;
    }
  };
  const flushBlock = () => {
    flushParagraph();
    flushList();
  };

  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushBlock();
      const level = heading[1].length;
      const title = heading[2];

      if (level === 1) {
        continue;
      }

      if (level === 2) {
        closeSection();
        const id = slugify(title);
        output.push(`<section aria-labelledby="${id}">`);
        currentSection = true;
        output.push(`<h2 id="${id}">${renderInlineMarkdown(headingText(title))}</h2>`);
      } else {
        output.push(`<h3>${renderInlineMarkdown(headingText(title))}</h3>`);
      }
      continue;
    }

    const unorderedItem = line.match(/^\s*-\s+(.+)$/);
    const orderedItem = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unorderedItem || orderedItem) {
      flushParagraph();
      const nextListType = unorderedItem ? "ul" : "ol";
      if (listType && listType !== nextListType) {
        flushList();
      }
      listType = nextListType;
      const item = unorderedItem?.[1] ?? orderedItem?.[1];
      if (item) {
        listItems.push(item);
      }
      continue;
    }

    if (!line.trim()) {
      flushBlock();
      continue;
    }

    paragraph.push(line.trim());
  }

  flushBlock();
  closeSection();
  return output.join("");
}

function setMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.append(element);
  }
  element.content = content;
}

function setPropertyMeta(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.append(element);
  }
  element.content = content;
}

export function LegalDocument({
  title,
  description,
  canonicalPath,
  markdown,
  articleLabel,
}: LegalDocumentProps) {
  useEffect(() => {
    const pageTitle = `${title} | Veyns`;
    const canonicalUrl = `https://veyns.com${canonicalPath}`;
    document.title = pageTitle;
    setMeta("description", description);
    setPropertyMeta("og:title", pageTitle);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonicalUrl);
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }, [canonicalPath, description, title]);

  const sections = Array.from(
    markdown.matchAll(/^## \*\*(.+?)\*\*$/gm),
    ([, sectionTitle]) => ({
      title: headingText(sectionTitle),
      id: slugify(sectionTitle),
    }),
  );
  const content = renderLegalMarkdown(markdown);

  return (
    <div id="top" className="min-h-screen w-full overflow-x-clip bg-white text-veyns-charcoal">
      <SiteNav />
      <main>
        <div className="border-b border-veyns-royal/10 bg-veyns-sky-soft/30">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-veyns-charcoal/55">
              <a className="transition-colors hover:text-veyns-royal" href="/#top">
                Home
              </a>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">{title}</span>
            </nav>
            <h1 className="text-4xl text-veyns-charcoal sm:text-5xl">{title}</h1>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside className="min-w-0">
            <nav
              aria-label={`${title} table of contents`}
              className="top-28 max-h-64 overflow-y-auto rounded-xl border border-veyns-royal/10 bg-white p-5 lg:sticky lg:max-h-[calc(100vh-8rem)]"
            >
              <h2 className="mb-3 text-base font-semibold text-veyns-charcoal">
                On this page
              </h2>
              <ol className="space-y-1.5">
                {sections.map(({ title: sectionTitle, id }) => (
                  <li key={id}>
                    <a
                      className="block rounded px-2 py-1 text-sm leading-5 text-veyns-charcoal/65 transition-colors hover:bg-veyns-sky-soft/60 hover:text-veyns-royal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-veyns-royal"
                      href={`#${id}`}
                    >
                      {sectionTitle}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0" aria-label={articleLabel}>
            <a className="legal-document-skip-link" href="#legal-document-content">
              Skip to {title.toLowerCase()} text
            </a>
            <div
              id="legal-document-content"
              className="legal-document-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
