import { useEffect } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import policyMarkdown from "./privacy-policy.md?raw";
import "./PrivacyPolicy.css";

const DESCRIPTION =
  "Learn how Veyns LLC collects, processes, uses, and protects personal information, including laboratory reports, biomarkers, and health data.";

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

const sections = Array.from(
  policyMarkdown.matchAll(/^## \*\*(.+?)\*\*$/gm),
  ([, title]) => ({ title: headingText(title), id: slugify(title) }),
);

function renderPolicyMarkdown(markdown: string) {
  const output: string[] = [];
  let currentSection = false;
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const closeSection = () => {
    if (currentSection) {
      output.push("</section>");
      currentSection = false;
    }
  };
  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems.length) {
      const items = listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("");
      output.push(`<ul>${items}</ul>`);
      listItems = [];
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

    const item = line.match(/^\s*-\s+(.+)$/);
    if (item) {
      flushParagraph();
      listItems.push(item[1]);
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

const policyHtml = renderPolicyMarkdown(policyMarkdown);

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

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Veyns";
    setMeta("description", DESCRIPTION);
    setPropertyMeta("og:title", "Privacy Policy | Veyns");
    setPropertyMeta("og:description", DESCRIPTION);
    setPropertyMeta("og:url", "https://veyns.com/privacy-policy");
    setMeta("twitter:title", "Privacy Policy | Veyns");
    setMeta("twitter:description", DESCRIPTION);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = "https://veyns.com/privacy-policy";
  }, []);

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
              <span aria-current="page">Privacy Policy</span>
            </nav>
            <h1 className="text-4xl text-veyns-charcoal sm:text-5xl">Privacy Policy</h1>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside className="min-w-0">
            <nav
              aria-label="Privacy Policy table of contents"
              className="top-28 max-h-64 overflow-y-auto rounded-xl border border-veyns-royal/10 bg-white p-5 lg:sticky lg:max-h-[calc(100vh-8rem)]"
            >
              <h2 className="mb-3 text-base font-semibold text-veyns-charcoal">
                On this page
              </h2>
              <ol className="space-y-1.5">
                {sections.map(({ title, id }) => (
                  <li key={id}>
                    <a
                      className="block rounded px-2 py-1 text-sm leading-5 text-veyns-charcoal/65 transition-colors hover:bg-veyns-sky-soft/60 hover:text-veyns-royal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-veyns-royal"
                      href={`#${id}`}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0" aria-label="Privacy Policy">
            <a className="policy-skip-link" href="#policy-content">
              Skip to policy text
            </a>
            <div
              id="policy-content"
              className="privacy-policy-content"
              dangerouslySetInnerHTML={{ __html: policyHtml }}
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
