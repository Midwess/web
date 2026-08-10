import { useEffect, useMemo, useRef, useState } from "react";

import {
  createBrowserCompiler,
  Presentation,
  type ExternalPresentation,
  type WorldantEffect,
  type WorldantHandle,
} from "@midwess/worldant/react";

import { createPlaygroundPackageProvider } from "./browserPackageProvider";
import { ENTRY, SOURCE_EXT } from "./seed";

type WorldantRuntimeProps = {
  files: Record<string, string>;
  pins: Record<string, string>;
  onEffect: (effects: WorldantEffect[]) => void;
  onReady: () => void;
  onError: (error: Error) => void;
};

type TailwindResponse = {
  css: string;
  error?: string;
};

const DEFAULT_CSS_ENTRY = '@import "tailwindcss";';
const TAILWIND_STYLE_ID = "worldant-playground-tailwind";

const NODELESS_APPLICATION: ExternalPresentation["application"] = {
  application: "react-playground",
  world: "react-playground",
  get node(): never {
    throw new Error("This playground does not create or expose a UNB node.");
  },
};

const sourceEntries = (files: Record<string, string>) =>
  Object.entries(files)
    .filter(([path]) => SOURCE_EXT.test(path))
    .sort(([left], [right]) => left.localeCompare(right));

function usePlaygroundTailwind(
  handle: WorldantHandle | null,
  onError: (error: Error) => void,
) {
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    if (!handle || typeof Worker === "undefined") return;

    const worker = new Worker(
      new URL("./worldant-tailwind.worker.ts", import.meta.url),
      { type: "module" },
    );
    let active = true;
    let candidates = new Set<string>();
    let delta = new Set<string>();
    let cssEntry = DEFAULT_CSS_ENTRY;
    let needsReset = false;
    let dirty = false;
    let scheduled = false;

    worker.onmessage = (event: MessageEvent<TailwindResponse>) => {
      if (!active) return;
      if (event.data.error) {
        onErrorRef.current(new Error(event.data.error));
        return;
      }

      let style = document.getElementById(TAILWIND_STYLE_ID);
      if (!style) {
        style = document.createElement("style");
        style.id = TAILWIND_STYLE_ID;
        document.head.appendChild(style);
      }
      style.textContent = event.data.css;
    };

    const flush = () => {
      scheduled = false;
      if (!active || !dirty) return;
      dirty = false;
      const reset = needsReset;
      needsReset = false;
      const payload = reset ? [...candidates] : [...delta];
      delta = new Set();
      worker.postMessage({ cssEntry, candidates: payload, reset });
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(flush);
    };

    const apply = (effects: WorldantEffect[]) => {
      for (const effect of effects) {
        if ("CandidatesAdded" in effect) {
          for (const candidate of effect.CandidatesAdded.added) {
            if (candidates.has(candidate)) continue;
            candidates.add(candidate);
            delta.add(candidate);
          }
          dirty = true;
        } else if ("CandidatesReset" in effect) {
          candidates = new Set(effect.CandidatesReset.all);
          delta = new Set();
          needsReset = true;
          dirty = true;
        } else if ("Css" in effect) {
          cssEntry = effect.Css.css || DEFAULT_CSS_ENTRY;
          needsReset = true;
          dirty = true;
        }
      }
      if (dirty) schedule();
    };

    const unsubscribe = handle.onEffects(apply);
    return () => {
      active = false;
      unsubscribe();
      worker.terminate();
      document.getElementById(TAILWIND_STYLE_ID)?.remove();
    };
  }, [handle]);
}

export function WorldantRuntime({
  files,
  pins,
  onEffect,
  onReady,
  onError,
}: WorldantRuntimeProps) {
  const [handle, setHandle] = useState<WorldantHandle | null>(null);
  const initialFiles = useRef(files);
  const snapshot = useRef<Record<string, string>>({});
  const reconcileQueue = useRef(Promise.resolve());
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  usePlaygroundTailwind(handle, onError);

  useEffect(() => {
    let active = true;
    let compiler: WorldantHandle | null = null;

    void (async () => {
      compiler = await createBrowserCompiler({
        pins,
        packageProvider: createPlaygroundPackageProvider(),
        swUrl: "/worldant-sw.js",
        worldId: "react-playground",
      });

      const nextSnapshot: Record<string, string> = {};
      for (const [path, source] of sourceEntries(initialFiles.current)) {
        await compiler.writeSource(path, source);
        nextSnapshot[path] = source;
      }

      if (!active) {
        compiler.dispose();
        return;
      }
      snapshot.current = nextSnapshot;
      setHandle(compiler);
    })().catch((cause) => {
      compiler?.dispose();
      if (active) {
        onErrorRef.current(
          cause instanceof Error ? cause : new Error(String(cause)),
        );
      }
    });

    return () => {
      active = false;
      compiler?.dispose();
    };
  }, [pins]);

  useEffect(() => {
    if (!handle) return;
    let active = true;

    const reconcile = reconcileQueue.current
      .catch(() => undefined)
      .then(async () => {
        if (!active) return;
        const desired = Object.fromEntries(sourceEntries(files));
        let changed = false;

        for (const path of Object.keys(snapshot.current)) {
          if (path in desired) continue;
          await handle.tools.deleteFile(path);
          if (!active) return;
          delete snapshot.current[path];
          changed = true;
        }

        for (const [path, source] of Object.entries(desired)) {
          if (snapshot.current[path] === source) continue;
          await handle.writeSource(path, source);
          if (!active) return;
          snapshot.current[path] = source;
          changed = true;
        }

        if (changed) await handle.rebuild();
      });

    reconcileQueue.current = reconcile.then(() => undefined);
    void reconcile.catch((cause) => {
      if (active) {
        onErrorRef.current(
          cause instanceof Error ? cause : new Error(String(cause)),
        );
      }
    });

    return () => {
      active = false;
    };
  }, [files, handle]);

  const external = useMemo<ExternalPresentation | null>(
    () =>
      handle
        ? {
            application: NODELESS_APPLICATION,
            effects: handle,
            beforePromote: async () => undefined,
            reject: async () => undefined,
          }
        : null,
    [handle],
  );

  if (!external) {
    return (
      <div className="wp-preview-empty" role="status">
        <span className="wp-spinner" aria-hidden="true" />
        Starting the browser compiler…
      </div>
    );
  }

  return (
    <Presentation
      entry={ENTRY}
      external={external}
      className="wp-worldant-output"
      placeholder={
        <div className="wp-preview-empty" role="status">
          <span className="wp-spinner" aria-hidden="true" />
          Compiling the first render…
        </div>
      }
      onEffect={onEffect}
      onReady={onReady}
      onError={onError}
    />
  );
}
