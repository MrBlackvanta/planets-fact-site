import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PlanetTopics from "./planet-topics";

function renderTopics() {
  render(
    <PlanetTopics
      name="Earth"
      sphere={<span data-testid="sphere" />}
      panels={{
        overview: <p>Overview copy</p>,
        structure: <p>Structure copy</p>,
        geology: <p>Geology copy</p>,
      }}
    />,
  );

  return screen.getAllByRole("tab");
}

describe("PlanetTopics", () => {
  it("opens on the first topic and shows only its panel", () => {
    const tabs = renderTopics();

    expect(tabs.map((tab) => tab.getAttribute("aria-selected"))).toEqual([
      "true",
      "false",
      "false",
    ]);

    const panels = screen.getAllByRole("tabpanel");
    expect(panels).toHaveLength(1);
    expect(panels[0]).toHaveTextContent("Overview copy");
  });

  it("wires every tab to the panel it controls", () => {
    const tabs = renderTopics();

    for (const tab of tabs) {
      const panel = document.getElementById(tab.getAttribute("aria-controls")!);
      expect(panel).toHaveAttribute("aria-labelledby", tab.id);
    }
  });

  it("swaps the panel when another topic is chosen", async () => {
    const user = userEvent.setup();
    const tabs = renderTopics();

    await user.click(tabs[2]);

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Geology copy");
    expect(screen.queryByText("Overview copy")).not.toBeVisible();
  });

  it("walks the tabs with the arrow keys and wraps at both ends", async () => {
    const user = userEvent.setup();
    const tabs = renderTopics();

    tabs[0].focus();
    await user.keyboard("{ArrowRight}");
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(tabs[2]).toHaveFocus();

    await user.keyboard("{Home}");
    expect(tabs[0]).toHaveFocus();

    await user.keyboard("{End}");
    expect(tabs[2]).toHaveFocus();
  });

  it("keeps a single tab stop in the tablist", async () => {
    const user = userEvent.setup();
    const tabs = renderTopics();

    expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);

    await user.click(tabs[1]);
    expect(tabs.map((tab) => tab.tabIndex)).toEqual([-1, 0, -1]);
  });

  it("tells the sphere which topic is showing", async () => {
    const user = userEvent.setup();
    const tabs = renderTopics();
    const figure = screen.getByTestId("sphere").parentElement;

    expect(figure).toHaveAttribute("data-topic", "overview");

    await user.click(tabs[1]);
    expect(figure).toHaveAttribute("data-topic", "structure");
  });

  it("names the page after the planet", () => {
    renderTopics();

    expect(
      screen.getByRole("heading", { level: 1, name: "Earth" }),
    ).toBeInTheDocument();
  });
});
