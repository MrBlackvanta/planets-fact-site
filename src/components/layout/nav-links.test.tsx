import { planets } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavLinks from "./nav-links";

describe("NavLinks", () => {
  it("links every planet, serving the root planet from /", () => {
    render(<NavLinks variant="bar" current="earth" />);

    expect(screen.getAllByRole("link")).toHaveLength(planets.length);
    expect(screen.getByRole("link", { name: "Mercury" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Neptune" })).toHaveAttribute(
      "href",
      "/neptune",
    );
  });

  it("marks exactly one link as the current page", () => {
    render(<NavLinks variant="bar" current="saturn" />);

    const marked = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("aria-current") === "page");

    expect(marked).toHaveLength(1);
    expect(marked[0]).toHaveAccessibleName("Saturn");
  });

  it("dims every planet but the current one in the bar", () => {
    render(<NavLinks variant="bar" current="mars" />);

    expect(screen.getByRole("link", { name: "Mars" })).toHaveClass("text-ink");
    expect(screen.getByRole("link", { name: "Venus" })).toHaveClass("text-dim");
  });

  it("keeps every menu row at full strength", () => {
    render(<NavLinks variant="menu" current="mars" />);

    expect(screen.getByRole("link", { name: "Venus" })).toHaveClass("text-ink");
  });

  it("gives each menu row a planet-tinted dot and a chevron", () => {
    render(<NavLinks variant="menu" current="mercury" />);

    const row = screen.getByRole("link", { name: "Jupiter" });

    expect(row.closest("li")).toHaveAttribute("data-planet", "jupiter");
    expect(row.querySelector(".bg-sphere")).toBeInTheDocument();
    expect(row.querySelector("svg")).toBeInTheDocument();
  });

  it("leaves the bar rows free of dots and chevrons", () => {
    render(<NavLinks variant="bar" current="mercury" />);

    const row = screen.getByRole("link", { name: "Jupiter" });

    expect(row.querySelector(".bg-sphere")).not.toBeInTheDocument();
    expect(row.querySelector("svg")).not.toBeInTheDocument();
  });
});
