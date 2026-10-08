import { rootPlanet } from "@/data";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlanetFacts from "./planet-facts";

describe("PlanetFacts", () => {
  it("pairs every measurement with its label", () => {
    const { container } = render(<PlanetFacts planet={rootPlanet} />);

    const terms = [...container.querySelectorAll("dt")].map(
      (term) => term.textContent,
    );
    expect(terms).toEqual([
      "Rotation Time",
      "Revolution Time",
      "Radius",
      "Average Temp.",
    ]);

    const values = [...container.querySelectorAll("dd")].map(
      (value) => value.textContent,
    );
    expect(values).toEqual([
      rootPlanet.rotation,
      rootPlanet.revolution,
      rootPlanet.radius,
      rootPlanet.temperature,
    ]);
  });
});
