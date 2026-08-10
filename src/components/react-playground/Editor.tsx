import { useEffect, useRef } from "react";

import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";

type EditorProps = {
  path: string;
  value: string;
  onChange: (text: string) => void;
  onRun: () => void;
};

export function Editor({ path, value, onChange, onRun }: EditorProps) {
  const host = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);
  onChangeRef.current = onChange;
  onRunRef.current = onRun;

  useEffect(() => {
    if (!host.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        path.endsWith(".json")
          ? javascript()
          : javascript({ jsx: true, typescript: true }),
        oneDark,
        keymap.of([
          indentWithTab,
          {
            key: "Mod-Enter",
            preventDefault: true,
            run: () => {
              onRunRef.current();
              return true;
            },
          },
        ]),
        EditorView.contentAttributes.of({
          "aria-label": `Code editor for ${path}`,
          spellcheck: "false",
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged)
            onChangeRef.current(update.state.doc.toString());
        }),
        EditorView.theme({
          "&": { height: "100%", fontSize: "13px" },
          ".cm-scroller": {
            overflow: "auto",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          },
          ".cm-content": { padding: "14px 0" },
          ".cm-gutters": {
            backgroundColor: "#121713",
            borderRight: "1px solid #273029",
          },
          "&.cm-editor": { backgroundColor: "#121713" },
          "&.cm-editor.cm-focused": { outline: "none" },
        }),
      ],
    });
    const view = new EditorView({ state, parent: host.current });
    viewRef.current = view;
    return () => {
      viewRef.current = null;
      view.destroy();
    };
  }, [path]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || view.state.doc.toString() === value) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  }, [value]);

  return <div className="wp-editor" ref={host} />;
}
