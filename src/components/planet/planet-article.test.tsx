import { rootPlanet } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlanetArticle from "./planet-article";

describe("PlanetArticle", () => {
  it("shows the copy for the topic it was given", () => {
    render(<PlanetArticle planet={rootPlanet} topic="structure" />);

    expect(screen.getByText(rootPlanet.structure.content)).toBeInTheDocument();
    expect(screen.queryByText(rootPlanet.overview.content)).toBeNull();
  });

  it("credits the matching Wikipedia section in a safe new tab", () => {
    render(<PlanetArticle planet={rootPlanet} topic="geology" />);

    const source = screen.getByRole("link");
    expect(source).toHaveAttribute("href", rootPlanet.geology.source);
    expect(source).toHaveAttribute("target", "_blank");
    expect(source).toHaveAttribute("rel", "noopener noreferrer");
    expect(source).toHaveTextContent("Source : Wikipedia");
  });
});
