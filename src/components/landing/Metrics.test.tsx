import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stat } from "./Metrics";

describe("Metrics Stat", () => {
  it("shows an em-dash placeholder when the count is unavailable — never a fabricated number", () => {
    render(<Stat count={null} label="GitHub stars" />);
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.getByText("GitHub stars")).toBeInTheDocument();
  });

  it("renders a real count, abbreviating thousands", () => {
    render(<Stat count={1500} label="crates.io downloads" />);
    expect(screen.getByText("1.5k")).toBeInTheDocument();
  });

  it("renders small counts verbatim", () => {
    render(<Stat count={4} label="Open-source projects" />);
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
