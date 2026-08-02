#!/usr/bin/env node
import { access, cp, rm } from "node:fs/promises";

const source = new URL("../vendor/orbit-ui/docs-dist/", import.meta.url);
const target = new URL("../dist/ui/", import.meta.url);

try {
  await access(source);
} catch {
  console.error("[copy-ui] Orbit documentation output is missing. Run the submodule build first.");
  process.exit(1);
}

await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
console.log("[copy-ui] copied Orbit documentation to dist/ui/");
