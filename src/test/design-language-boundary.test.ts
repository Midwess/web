import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { documentationPaths } from "@midwess/orbit-ui/docs";

describe("design-language boundary", () => {
  it("keeps reusable UI exclusively in the Orbit submodule", () => {
    const repositoryRoot = process.cwd();

    const localUiDirectory = resolve(repositoryRoot, "src/components/ui");
    const localUiFiles = existsSync(localUiDirectory)
      ? readdirSync(localUiDirectory)
      : [];

    expect(localUiFiles).toHaveLength(0);
    expect(existsSync(resolve(repositoryRoot, "components.json"))).toBe(false);
    expect(existsSync(resolve(repositoryRoot, "ui/registry.json"))).toBe(true);
    expect(documentationPaths).toContain("/components/alert");
  });
});
