import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const vendor = join(root, "src/content/vendor/worldant");
const meta = join(vendor, "docs/worldant/meta.json");

if (!existsSync(meta)) {
  throw new Error(
    `Worldant docs are missing: ${meta}. Initialize submodules on source branches or build from deploy-production.`,
  );
}
