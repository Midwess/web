import { useEffect, useState, type ComponentType } from "react";

import { CloudOff, Code2, Cpu, Github, ShieldCheck } from "lucide-react";

import { SeoHead, SITE, organizationLd, webSiteLd } from "@/lib/seo";

const playgroundLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Worldant React Playground",
  description:
    "A private, browser-only React and TypeScript playground powered by the published @midwess/worldant package.",
  url: `${SITE.url}/`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any modern web browser",
  browserRequirements:
    "Requires JavaScript, Web Workers, Service Workers, and OPFS",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Multi-file React and TypeScript editing",
    "Browser-only compilation",
    "Live Tailwind CSS generation",
    "TypeScript diagnostics",
    "Safe last-good-render promotion",
    "No source-code uploads",
  ],
  publisher: {
    "@type": "Organization",
    name: "Midwess",
    url: SITE.url,
  },
};

const assurances = [
  {
    icon: CloudOff,
    title: "No uploads",
    body: "Your source is never sent to an application server. Package assets are fetched only when your project imports them.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Source files and generated modules stay in browser-managed storage on your device.",
  },
  {
    icon: Cpu,
    title: "Entirely in-browser",
    body: "React, TypeScript checking, compilation, Tailwind generation, and rendering all happen locally.",
  },
];

function BrowserPlayground() {
  const [Playground, setPlayground] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void import("@/components/react-playground/WorldantPlayground")
      .then((module) => {
        if (active) setPlayground(() => module.default);
      })
      .catch((cause) => {
        if (active)
          setError(cause instanceof Error ? cause.message : String(cause));
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <div className="grid h-[100dvh] min-h-[680px] place-items-center bg-red-950/20 p-8 text-center">
        <div>
          <p className="font-display text-xl text-red-200">
            The playground could not start.
          </p>
          <p className="mt-2 max-w-lg text-sm text-red-300/70">{error}</p>
        </div>
      </div>
    );
  }

  if (!Playground) {
    return (
      <div
        className="grid h-[100dvh] min-h-[680px] place-items-center bg-olive-950"
        aria-busy="true"
        aria-label="Loading the interactive playground"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="size-7 animate-spin rounded-full border-2 border-olive-700 border-t-orange-400" />
          <p className="text-sm text-olive-400">
            Loading the browser compiler…
          </p>
        </div>
      </div>
    );
  }

  return <Playground />;
}

const ReactPlayground = () => (
  <>
    <SeoHead
      title="Private React & TypeScript Playground"
      description="Write, type-check, compile, and render React with TypeScript and Tailwind CSS entirely in your browser. Your source stays on your device and is never uploaded."
      path="/"
      jsonLd={[playgroundLd, webSiteLd(), organizationLd()]}
    />

    <main className="bg-olive-950">
      <section id="playground" aria-labelledby="playground-title">
        <h1 id="playground-title" className="sr-only">
          Worldant React and TypeScript browser playground
        </h1>
        <BrowserPlayground />
        <noscript>
          <p className="border-t border-olive-800 bg-olive-900 p-4 text-center text-sm text-olive-300">
            This interactive compiler requires JavaScript. No source is uploaded
            when it runs.
          </p>
        </noscript>
      </section>

      <section
        aria-labelledby="browser-only-title"
        className="border-t border-olive-800 bg-olive-950 px-5 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-800/70 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                <ShieldCheck aria-hidden="true" className="size-3.5" />
                100% browser runtime
              </p>
              <h2
                id="browser-only-title"
                className="mt-6 max-w-xl font-display text-4xl font-medium tracking-tight text-olive-50 md:text-5xl"
              >
                Your code stays on your machine.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-olive-400">
                This is a live demonstration of{" "}
                <code className="rounded bg-olive-900 px-1.5 py-0.5 text-olive-200">
                  @midwess/worldant
                </code>
                . It renders React with TypeScript and Tailwind CSS entirely in
                your browser—without uploading your project to us.
              </p>
              <a
                href="https://github.com/Midwess/worldant"
                className="mt-8 inline-flex items-center gap-2 rounded-lg border border-olive-700 bg-olive-900 px-4 py-2.5 text-sm font-semibold text-olive-100 transition hover:border-olive-500 hover:bg-olive-800"
              >
                <Github aria-hidden="true" className="size-4" />
                View Worldant on GitHub
              </a>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-olive-800 bg-olive-800">
              {assurances.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="grid gap-4 bg-olive-950 p-6 sm:grid-cols-[auto_1fr] sm:items-start"
                >
                  <span className="grid size-10 place-items-center rounded-xl border border-olive-700 bg-olive-900 text-orange-400">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-olive-100">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-olive-500">
                      {body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-4 border-t border-olive-800 pt-7 text-sm text-olive-500 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2">
              <Code2 aria-hidden="true" className="size-4 text-orange-400" />
              React + TypeScript + Tailwind, rendered locally.
            </span>
            <span>© {new Date().getFullYear()} Midwess · MIT licensed</span>
          </div>
        </div>
      </section>
    </main>
  </>
);

export default ReactPlayground;
