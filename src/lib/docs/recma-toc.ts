/**
 * Recma plugin: expose the TOC collected by `rehypeToc` as a real module export.
 *
 * `rehypeToc` stashes the heading list on `vfile.data.toc` during the rehype
 * stage. MDX compiles remark → rehype → recma over the *same* vfile, so by the
 * time recma runs we can read that data and prepend an
 *   `export const toc = JSON.parse("…")`
 * declaration to the program. The MDX module then re-exports `toc` alongside
 * its default component, which `ProjectDocs` / the sidebar tree consume.
 *
 * Using `JSON.parse(<string literal>)` keeps this dependency-free (no
 * estree-util-value-to-estree) — the payload is plain data.
 */

import type { TocItem } from "./rehype-toc";

// estree nodes are typed loosely to avoid pulling in @types/estree.
type Node = Record<string, unknown>;

export const recmaExportToc = () => {
  // params are unified's estree Program + VFile; typed `any` so the factory
  // satisfies unified's `Pluggable` without importing `unified`/`vfile`.
  return (tree: any, file: any) => {
    const toc = ((file.data?.toc ?? []) as TocItem[]) || [];
    const json = JSON.stringify(toc);

    const exportNode: Node = {
      type: "ExportNamedDeclaration",
      specifiers: [],
      source: null,
      declaration: {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "toc" },
            init: {
              type: "CallExpression",
              optional: false,
              callee: {
                type: "MemberExpression",
                optional: false,
                computed: false,
                object: { type: "Identifier", name: "JSON" },
                property: { type: "Identifier", name: "parse" },
              },
              arguments: [{ type: "Literal", value: json }],
            },
          },
        ],
      },
    };

    const body = (tree.body as Node[] | undefined) ?? [];
    body.unshift(exportNode);
    tree.body = body;
  };
};
