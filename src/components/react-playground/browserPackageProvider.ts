import {
  createBrowserPackageProvider,
  type BrowserPackageProvider,
  type PlatformPackageGraph,
} from "@midwess/worldant/react";

const ESM_SH = "https://esm.sh";
const LODASH_PACKAGE = "lodash";
const LODASH_PIN =
  /^(?:4|4\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)$/;
const LODASH_COMMON_TYPES = [
  "common",
  "array",
  "collection",
  "date",
  "function",
  "lang",
  "math",
  "number",
  "object",
  "seq",
  "string",
  "util",
] as const;

const graphCache = new Map<string, Promise<PlatformPackageGraph>>();

async function sourceFor(url: URL, label: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${label} returned HTTP ${response.status}`);
  }
  return response.text();
}

async function loadLodashGraph(pin: string): Promise<PlatformPackageGraph> {
  if (!LODASH_PIN.test(pin)) {
    throw new Error(
      `lodash must use an exact 4.x version (for example 4.17.21) or the major pin "4"; received ${pin}.`,
    );
  }

  const metadataUrl = new URL(
    `/lodash@${encodeURIComponent(pin)}?standalone&target=es2022`,
    ESM_SH,
  );
  const metadata = await fetch(metadataUrl);
  if (!metadata.ok) {
    throw new Error(`lodash metadata returned HTTP ${metadata.status}`);
  }

  const runtimePath = metadata.headers.get("x-esm-path");
  const typesEntry = metadata.headers.get("x-typescript-types");
  const version = runtimePath?.match(/^\/lodash@([^/]+)\//)?.[1];
  if (!runtimePath || !typesEntry || !version) {
    throw new Error("esm.sh did not return lodash runtime and type metadata.");
  }

  const runtimeUrl = new URL(runtimePath, ESM_SH);
  const typesUrl = new URL(typesEntry, ESM_SH);
  const declarationUrls = [
    typesUrl,
    ...LODASH_COMMON_TYPES.map(
      (name) => new URL(`./common/${name}.d.ts`, typesUrl),
    ),
  ];
  const [runtimeSource, ...declarationSources] = await Promise.all([
    sourceFor(runtimeUrl, "lodash runtime"),
    ...declarationUrls.map((url) => sourceFor(url, "lodash declarations")),
  ]);

  const commonPaths = LODASH_COMMON_TYPES.map(
    (name) => `lodash/common/${name}.d.ts`,
  );
  const declarations: PlatformPackageGraph["declarations"] = [
    {
      path: "lodash/index.d.ts",
      source: declarationSources[0],
      mediaType: "text/typescript",
      dependencies: commonPaths,
    },
    ...LODASH_COMMON_TYPES.map((name, index) => ({
      path: `lodash/common/${name}.d.ts`,
      source: declarationSources[index + 1],
      mediaType: "text/typescript",
      dependencies:
        name === "common"
          ? ["lodash/index.d.ts"]
          : ["lodash/index.d.ts", "lodash/common/common.d.ts"],
    })),
  ];

  return {
    package: LODASH_PACKAGE,
    version,
    entries: { lodash: "lodash/index.js" },
    assets: [
      {
        path: "lodash/index.js",
        source: runtimeSource,
        mediaType: "text/javascript",
        dependencies: [],
      },
    ],
    types: { lodash: "lodash/index.d.ts" },
    declarations,
  };
}

function lodashGraph(pin: string) {
  let pending = graphCache.get(pin);
  if (!pending) {
    pending = loadLodashGraph(pin);
    graphCache.set(pin, pending);
    void pending.catch(() => graphCache.delete(pin));
  }
  return pending;
}

export function createPlaygroundPackageProvider(): BrowserPackageProvider {
  const builtIns = createBrowserPackageProvider();

  return {
    async prepare(plan, context) {
      const lodashRequests = [
        ...plan.requests,
        ...(plan.type_requests ?? []),
      ].filter((request) => request.package === LODASH_PACKAGE);
      if (lodashRequests.length === 0) {
        return builtIns.prepare(plan, context);
      }

      const unsupported = lodashRequests.find(
        (request) => request.specifier !== LODASH_PACKAGE,
      );
      if (unsupported) {
        throw new Error(
          `The playground currently supports the root "lodash" import, not "${unsupported.specifier}".`,
        );
      }

      const pin =
        context.locks.get(LODASH_PACKAGE) ?? context.pins[LODASH_PACKAGE];
      if (!pin) throw new Error("Add lodash to package.json dependencies.");

      const graph = await lodashGraph(pin);
      return createBrowserPackageProvider({ platform: [graph] }).prepare(
        plan,
        context,
      );
    },
  };
}
