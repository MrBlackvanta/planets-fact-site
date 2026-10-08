import { planets } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("heads the page and offers a way back", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Lost in space",
    );
    expect(
      screen.getByRole("link", { name: "Back to Mercury" }),
    ).toHaveAttribute("href", "/");
  });

  it("marks no planet as the current page", () => {
    render(<NotFound />);

    const links = screen.getAllByRole("link");
    const planetLinks = links.filter(({ textContent }) =>
      planets.some(({ name }) => name === textContent),
    );

    expect(planetLinks.length).toBeGreaterThan(0);
    for (const link of planetLinks) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });
});
