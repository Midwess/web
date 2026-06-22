import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Proof } from "./Proof";

const renderWithRouter = (ui: ReactNode) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("Proof (dogfooding)", () => {
  it("states the verifiable PgPaw → pglite-rs dependency", () => {
    renderWithRouter(<Proof />);
    expect(
      screen.getByText(/PgPaw embeds pglite-rs/i),
    ).toBeInTheDocument();
  });

  it("links to both projects' docs", () => {
    renderWithRouter(<Proof />);
    expect(screen.getByRole("link", { name: /See PgPaw/i })).toHaveAttribute(
      "href",
      "/pgpaw",
    );
    expect(
      screen.getByRole("link", { name: /Built on pglite-rs/i }),
    ).toHaveAttribute("href", "/pglite-rs");
  });
});
