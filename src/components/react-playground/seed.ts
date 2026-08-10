export const ENTRY = "App.tsx";

export const PACKAGE_JSON = "package.json";

export const SOURCE_EXT = /\.(tsx|ts|jsx|js)$/;

export const DEFAULT_PINS: Record<string, string> = {
  react: "19",
  "react-dom": "19",
};

export const SEED_FILES: Record<string, string> = {
  "App.tsx": `import { useState } from "react";
import { Counter } from "./Counter";

export default function App() {
  const [name, setName] = useState("world");

  return (
    <main className="min-h-full bg-slate-50 p-8 text-slate-950">
      <div className="mx-auto flex max-w-md flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Compiled in your browser
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Hello, {name} 👋</h1>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Your name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </label>
        <Counter />
        <p className="text-sm leading-6 text-slate-500">
          Edit either file, then press Run or ⌘/Ctrl + Enter. Try a new Tailwind class too.
        </p>
      </div>
    </main>
  );
}
`,
  "Counter.tsx": `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount((current) => current + 1)}
      className="w-fit rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white transition hover:bg-violet-500"
    >
      Clicked {count} {count === 1 ? "time" : "times"}
    </button>
  );
}
`,
  "package.json": `{
  "name": "worldant-playground-app",
  "private": true,
  "dependencies": {
    "react": "19",
    "react-dom": "19"
  }
}
`,
};

export function derivePins(
  files: Record<string, string>,
): Record<string, string> {
  const manifest = JSON.parse(files[PACKAGE_JSON] ?? "{}");
  if (
    manifest.dependencies !== undefined &&
    (manifest.dependencies === null ||
      typeof manifest.dependencies !== "object" ||
      Array.isArray(manifest.dependencies))
  ) {
    throw new Error("package.json dependencies must be an object.");
  }

  const pins = { ...DEFAULT_PINS };
  const dependencies = Object.entries(manifest.dependencies ?? {});
  for (const [name, version] of dependencies) {
    if (typeof version !== "string" || version.trim() === "") {
      throw new Error(`Dependency ${name} must have a version string.`);
    }
    pins[name] = version;
  }

  return pins;
}

export function newFileTemplate(path: string): string {
  const base =
    path.replace(SOURCE_EXT, "").replace(/[^a-zA-Z0-9]/g, "") || "Component";
  const name = base[0].toUpperCase() + base.slice(1);
  return `export function ${name}() {
  return <div>${name}</div>;
}
`;
}
