import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Shipping } from "./Shipping";
import milestones from "@/content/milestones.json";

describe("Shipping (milestone timeline)", () => {
  it("renders an entry from milestones.json in the timeline", () => {
    render(<Shipping />);
    expect(screen.getByText(milestones[0].title)).toBeInTheDocument();
    expect(screen.getByText(milestones[0].body)).toBeInTheDocument();
  });

  it("frames the section as the shipping timeline", () => {
    render(<Shipping />);
    expect(screen.getByText("Recent milestones")).toBeInTheDocument();
  });
});
