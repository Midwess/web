import { useCallback, useEffect, useRef, useState } from "react";

import {
  Code2,
  LoaderCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Wind,
} from "lucide-react";
import type { WorldantEffect } from "@midwess/worldant/react";

import { Editor } from "./Editor";
import { FileExplorer } from "./FileExplorer";
import { ToastViewport, type PlaygroundToast } from "./ToastViewport";
import { WorldantRuntime } from "./WorldantRuntime";
import {
  derivePins,
  ENTRY,
  newFileTemplate,
  PACKAGE_JSON,
  SEED_FILES,
  SOURCE_EXT,
} from "./seed";
import "./playground.css";

type RuntimeState = "booting" | "running" | "ready" | "error";

const sourcePaths = (files: Record<string, string>) =>
  Object.keys(files).filter((path) => SOURCE_EXT.test(path));

export default function WorldantPlayground() {
  const [files, setFiles] = useState<Record<string, string>>({ ...SEED_FILES });
  const [committed, setCommitted] = useState<Record<string, string>>({
    ...SEED_FILES,
  });
  const [active, setActive] = useState(ENTRY);
  const [pins, setPins] = useState(() => derivePins(SEED_FILES));
  const [runtimeRevision, setRuntimeRevision] = useState(0);
  const [runtimeState, setRuntimeState] = useState<RuntimeState>("booting");
  const [status, setStatus] = useState("Booting browser compiler…");
  const [toasts, setToasts] = useState<PlaygroundToast[]>([]);
  const snapshot = useRef<Record<string, string>>({ ...SEED_FILES });
  const toastId = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (kind: PlaygroundToast["kind"], title: string, message?: string) => {
      const id = ++toastId.current;
      setToasts((current) => [
        ...current.slice(-3),
        { id, kind, title, message },
      ]);
      window.setTimeout(
        () => dismissToast(id),
        kind === "error" ? 8_000 : 4_000,
      );
    },
    [dismissToast],
  );

  useEffect(() => {
    const supported =
      "serviceWorker" in navigator &&
      "storage" in navigator &&
      typeof navigator.storage.getDirectory === "function" &&
      typeof Worker !== "undefined" &&
      Boolean(globalThis.crypto?.subtle);
    if (supported) return;
    setRuntimeState("error");
    setStatus("This browser is missing OPFS or Service Worker support");
    pushToast(
      "error",
      "Browser unsupported",
      "Use a current browser over HTTPS (localhost also works).",
    );
  }, [pushToast]);

  const handleEffect = useCallback(
    (effects: WorldantEffect[]) => {
      const diagnostics = effects.flatMap((effect) =>
        "Diagnostics" in effect ? effect.Diagnostics.errors : [],
      );
      const errors = diagnostics.filter(
        (diagnostic) => diagnostic.severity === "Error",
      );
      if (errors.length > 0) {
        setRuntimeState("error");
        setStatus(
          `${errors.length} compile ${errors.length === 1 ? "error" : "errors"}`,
        );
        errors.slice(0, 4).forEach((error) => {
          const line = error.span?.start.line;
          pushToast(
            "error",
            `${error.file}${line ? `:${line}` : ""}`,
            error.message,
          );
        });
        return;
      }

      if (
        effects.some((effect) => "Emit" in effect && effect.Emit.path === ENTRY)
      ) {
        setRuntimeState("ready");
        setStatus("Rendered ✓");
      }
    },
    [pushToast],
  );

  const handleRuntimeError = useCallback(
    (error: Error) => {
      setRuntimeState("error");
      setStatus("Run failed");
      pushToast("error", "Runtime error", error.message);
    },
    [pushToast],
  );

  const run = useCallback(() => {
    if (runtimeState === "running") return;

    const manifestChanged =
      files[PACKAGE_JSON] !== snapshot.current[PACKAGE_JSON];
    const nextSources = sourcePaths(files);
    const previousSources = sourcePaths(snapshot.current);
    const sourcesChanged =
      nextSources.length !== previousSources.length ||
      nextSources.some((path) => files[path] !== snapshot.current[path]);

    if (!manifestChanged && !sourcesChanged) {
      pushToast("info", "No changes since the last run");
      return;
    }

    let nextPins: Record<string, string>;
    try {
      nextPins = derivePins(files);
    } catch (cause) {
      handleRuntimeError(
        cause instanceof Error ? cause : new Error(String(cause)),
      );
      return;
    }

    setRuntimeState("running");
    setStatus(
      manifestChanged ? "Applying dependency pins…" : "Compiling changes…",
    );
    setCommitted({ ...files });
    snapshot.current = { ...files };
    if (manifestChanged) {
      setPins(nextPins);
      setRuntimeRevision((revision) => revision + 1);
    }
  }, [files, handleRuntimeError, pushToast, runtimeState]);

  const reset = useCallback(() => {
    setFiles({ ...SEED_FILES });
    setCommitted({ ...SEED_FILES });
    setActive(ENTRY);
    setPins(derivePins(SEED_FILES));
    setRuntimeRevision((revision) => revision + 1);
    setRuntimeState("running");
    setStatus("Resetting workspace…");
    snapshot.current = { ...SEED_FILES };
    pushToast("success", "Workspace reset");
  }, [pushToast]);

  const createFile = (name: string): string | null => {
    if (!name) return "Name required";
    if (name.includes("/")) return "Subfolders are not supported here";
    if (!SOURCE_EXT.test(name)) return "Use .tsx, .ts, .jsx, or .js";
    if (files[name]) return "File already exists";
    setFiles((current) => ({ ...current, [name]: newFileTemplate(name) }));
    setActive(name);
    return null;
  };

  const deleteFile = (path: string) => {
    setFiles((current) => {
      const next = { ...current };
      delete next[path];
      return next;
    });
    if (active === path) setActive(ENTRY);
  };

  const canRun = runtimeState !== "running" && runtimeState !== "booting";

  return (
    <section
      className="worldant-playground"
      aria-label="Interactive React playground"
    >
      <header className="wp-toolbar">
        <div className="wp-brand">
          <span className="wp-brand-mark" aria-hidden="true">
            <Code2 size={17} />
          </span>
          <span>React Playground</span>
          <span className="wp-package-chip">@midwess/worldant</span>
          <span
            className="wp-tailwind-flag"
            title="Tailwind CSS class generation is enabled"
          >
            <Wind aria-hidden="true" size={12} />
            Tailwind supported
          </span>
        </div>
        <div className={`wp-status is-${runtimeState}`} role="status">
          {runtimeState === "running" || runtimeState === "booting" ? (
            <LoaderCircle className="wp-spin" aria-hidden="true" size={13} />
          ) : runtimeState === "ready" ? (
            <ShieldCheck aria-hidden="true" size={13} />
          ) : null}
          {status}
        </div>
        <div className="wp-toolbar-actions">
          <span className="wp-entry-chip">entry: {ENTRY}</span>
          <button
            type="button"
            className="wp-button"
            onClick={reset}
            disabled={runtimeState === "running"}
          >
            <RotateCcw aria-hidden="true" size={14} />
            Reset
          </button>
          <button
            type="button"
            className="wp-button is-primary"
            onClick={run}
            disabled={!canRun}
          >
            {runtimeState === "running" ? (
              <LoaderCircle className="wp-spin" aria-hidden="true" size={14} />
            ) : (
              <Play aria-hidden="true" size={14} fill="currentColor" />
            )}
            {runtimeState === "running" ? "Running…" : "Run"}
          </button>
        </div>
      </header>

      <div className="wp-panes">
        <aside className="wp-pane wp-sidebar" aria-label="Project files">
          <FileExplorer
            files={Object.keys(files)}
            active={active}
            onSelect={setActive}
            onCreate={createFile}
            onDelete={deleteFile}
          />
        </aside>

        <section
          className="wp-pane wp-editor-pane"
          aria-label={`Editing ${active}`}
        >
          <div className="wp-pane-tab">
            <span>{active}</span>
            <kbd>⌘/Ctrl + Enter</kbd>
          </div>
          <Editor
            path={active}
            value={files[active] ?? ""}
            onChange={(text) =>
              setFiles((current) => ({ ...current, [active]: text }))
            }
            onRun={run}
          />
        </section>

        <section className="wp-pane wp-preview-pane" aria-label="Live preview">
          <div className="wp-pane-tab">
            <span>Preview</span>
            <span className="wp-runtime-chip">compiler only · no UNB node</span>
          </div>
          <div className="wp-preview">
            <WorldantRuntime
              key={runtimeRevision}
              files={committed}
              pins={pins}
              onEffect={handleEffect}
              onReady={() => {
                setRuntimeState("ready");
                setStatus("Rendered ✓");
              }}
              onError={handleRuntimeError}
            />
          </div>
        </section>
      </div>

      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </section>
  );
}
