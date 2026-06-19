/**
 * Rehype plugin: extract TOC + add heading ids.
 *
 * Walks the MDX AST, finds h2/h3 headings (h1 reserved for page title),
 * slugifies text via `github-slugger` (collision-aware), and:
 *   1. attaches the slug as `id` on each heading element
 *   2. collects `{ depth, text, id }[]` onto `vfile.data.toc`
 *
 * The compiled MDX module re-exports `toc` alongside its default component,
 * so the layout can read TOC without re-walking the rendered React tree.
 */

import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import GithubSlugger from "github-slugger";
import type { Plugin } from "unified";
import type { Root, Element } from "hast";
import type { VFile } from "vfile";

export type TocItem = {
  depth: 2 | 3;
  text: string;
  id: string;
  url: string;
};

export const rehypeToc: Plugin<[], Root> = () => {
  return (tree: Root, file: VFile) => {
    const slugger = new GithubSlugger();
    const toc: TocItem[] = [];
    visit(tree, "element", (node: Element) => {
      if (!/^h[1-6]$/.test(node.tagName)) return;
      const depth = Number(node.tagName[1]);
      if (depth < 2 || depth > 3) return;
      const text = toString(node).trim();
      if (!text) return;
      const id = slugger.slug(text);
      // Attach id for in-page anchor links
      const props = (node.properties ??= {});
      props.id = id;
      toc.push({ depth: depth as 2 | 3, text, id, url: `#${id}` });
    });
    file.data.toc = toc;
  };
};
