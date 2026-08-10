/// <reference lib="webworker" />

import { compile } from "tailwindcss";
import indexCss from "tailwindcss/index.css?raw";
import preflightCss from "tailwindcss/preflight.css?raw";
import themeCss from "tailwindcss/theme.css?raw";
import utilitiesCss from "tailwindcss/utilities.css?raw";

type TailwindRequest = {
  cssEntry: string;
  candidates: string[];
  reset: boolean;
};

const stylesheets: Record<string, string> = {
  tailwindcss: indexCss,
  "tailwindcss/theme": themeCss,
  "tailwindcss/theme.css": themeCss,
  "./theme.css": themeCss,
  "tailwindcss/preflight": preflightCss,
  "tailwindcss/preflight.css": preflightCss,
  "./preflight.css": preflightCss,
  "tailwindcss/utilities": utilitiesCss,
  "tailwindcss/utilities.css": utilitiesCss,
  "./utilities.css": utilitiesCss,
};

const loadStylesheet = async (id: string, base: string) => {
  const content = stylesheets[id];
  if (content === undefined) throw new Error(`Unsupported @import "${id}"`);
  return { path: `virtual:${id}`, base, content };
};

const loadModule = async (): Promise<never> => {
  throw new Error("Tailwind @plugin and @config are not supported here.");
};

const workerScope = self as unknown as DedicatedWorkerGlobalScope;
let compiler: Awaited<ReturnType<typeof compile>> | undefined;
let lastCssEntry = "";
let queue = Promise.resolve();

async function generate(request: TailwindRequest) {
  if (
    compiler === undefined ||
    request.cssEntry !== lastCssEntry ||
    request.reset
  ) {
    compiler = await compile(request.cssEntry, {
      base: "/",
      loadStylesheet,
      loadModule,
    });
    lastCssEntry = request.cssEntry;
  }
  return compiler.build(request.candidates);
}

workerScope.onmessage = (event: MessageEvent<TailwindRequest>) => {
  queue = queue.then(async () => {
    try {
      workerScope.postMessage({ css: await generate(event.data) });
    } catch (cause) {
      workerScope.postMessage({
        css: "",
        error: cause instanceof Error ? cause.message : String(cause),
      });
    }
  });
};
