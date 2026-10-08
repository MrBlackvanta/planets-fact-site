import { SITE_NAME } from "@/data";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SiteHeader from "./site-header";

describe("SiteHeader", () => {
  it("names the site once, outside the heading outline", () => {
    render(<SiteHeader current="earth" />);

    expect(screen.getByText(SITE_NAME).tagName).toBe("P");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("exposes a single planet navigation landmark", () => {
    render(<SiteHeader current="earth" />);

    const nav = screen.getByRole("navigation", { name: "Planets" });

    expect(within(nav).getAllByRole("list")).toHaveLength(2);
    expect(
      within(nav).getByRole("button", { name: "Menu" }),
    ).toBeInTheDocument();
  });

  it("marks the current planet in both the bar and the menu", () => {
    render(<SiteHeader current="uranus" />);

    const marked = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("aria-current") === "page");

    expect(marked).toHaveLength(2);
    expect(marked.every((link) => link.textContent === "Uranus")).toBe(true);
  });
});
