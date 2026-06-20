import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Shipping } from "./Shipping";
import vision from "@/content/vision.json";

describe("Shipping (vision)", () => {
  it("renders the single global vision statement from vision.json", () => {
    render(<Shipping />);
    expect(screen.getByText(vision.vision)).toBeInTheDocument();
  });

  it("frames the section as Vision", () => {
    render(<Shipping />);
    expect(screen.getByText("Vision")).toBeInTheDocument();
  });
});
