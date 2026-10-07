import { planetPath, planets, ROOT_PLANET } from "@/data";
import { describe, expect, it } from "vitest";

describe("planets", () => {
  it("covers all eight worlds exactly once", () => {
    expect(planets.map((planet) => planet.slug)).toEqual([
      "mercury",
      "venus",
      "earth",
      "mars",
      "jupiter",
      "saturn",
      "uranus",
      "neptune",
    ]);
  });

  it("derives each slug from its display name", () => {
    for (const planet of planets) {
      expect(planet.slug).toBe(planet.name.toLowerCase());
    }
  });

  it("cites an https source for every topic", () => {
    for (const planet of planets) {
      for (const topic of ["overview", "structure", "geology"] as const) {
        expect(planet[topic].source).toMatch(/^https:\/\//);
        expect(planet[topic].content.length).toBeGreaterThan(0);
      }
    }
  });

  it("ships three images per planet", () => {
    for (const { images } of planets) {
      expect(images.planet.src).toMatch(/\.svg$/);
      expect(images.internal.src).toMatch(/\.svg$/);
      expect(images.geology.src).toMatch(/\.webp$/);
    }
  });
});

describe("planetPath", () => {
  it("serves the root planet from the site root", () => {
    expect(planetPath(ROOT_PLANET)).toBe("/");
  });

  it("gives every other planet its own path", () => {
    expect(planetPath("neptune")).toBe("/neptune");
  });

  it("maps each planet to a unique path", () => {
    const paths = planets.map((planet) => planetPath(planet.slug));
    expect(new Set(paths).size).toBe(planets.length);
  });
});
