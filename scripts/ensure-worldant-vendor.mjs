import { existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const vendor = join(root, "src/content/vendor/worldant");
const meta = join(vendor, "docs/worldant/meta.json");
const repo = process.env.WORLDANT_DOCS_REPO ?? "https://github.com/Midwess/worldant.git";
const ref = process.env.WORLDANT_DOCS_REF ?? "main";

if (!existsSync(meta)) {
  console.log(`[worldant-docs] vendor docs missing; cloning ${repo}#${ref}`);
  rmSync(vendor, { recursive: true, force: true });
  execFileSync("git", ["clone", "--depth", "1", "--branch", ref, repo, vendor], {
    stdio: "inherit",
  });
}

if (!existsSync(meta)) {
  throw new Error(`Worldant docs are missing after vendor sync: ${meta}`);
}
