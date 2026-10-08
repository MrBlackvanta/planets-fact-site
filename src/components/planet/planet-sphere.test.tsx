import { rootPlanet } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlanetSphere from "./planet-sphere";

describe("PlanetSphere", () => {
  it("stacks the three topic images and leaves them all decorative", () => {
    render(<PlanetSphere planet={rootPlanet} />);

    const images = screen.getAllByRole("presentation");
    expect(images.map((image) => image.getAttribute("src"))).toEqual([
      expect.stringContaining("mercury.svg"),
      expect.stringContaining("mercury-internal.svg"),
      expect.stringContaining("mercury-geology.webp"),
    ]);

    for (const image of images) expect(image).toHaveAttribute("alt", "");
  });

  it("keeps every image out of the lazy queue so a switch never blanks", () => {
    render(<PlanetSphere planet={rootPlanet} />);

    for (const image of screen.getAllByRole("presentation")) {
      expect(image.getAttribute("loading")).not.toBe("lazy");
    }
  });
});
