import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Proof } from "./Proof";
import { WhyRust } from "./WhyRust";

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

describe("WhyRust", () => {
  it("renders the why-Rust positioning and its grounded reasons", () => {
    renderWithRouter(<WhyRust />);
    expect(
      screen.getByText(/Infrastructure that ships inside your app/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/In-process, single binary/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Durable by construction/i)).toBeInTheDocument();
  });
});
