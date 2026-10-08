import { setMediaMatches } from "@/test/match-media";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MobileMenu from "./mobile-menu";

const WIDE = "(min-width: 48rem)";

function renderMenu() {
  render(
    <MobileMenu>
      <a href="#venus">Venus</a>
    </MobileMenu>,
  );

  return screen.getByRole("button", { name: "Menu" });
}

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("toggles from the menu button", async () => {
    const user = userEvent.setup();
    const button = renderMenu();

    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("points the button at the panel it controls", () => {
    const button = renderMenu();

    expect(document.getElementById("planet-menu")).toContainElement(
      screen.getByRole("link", { name: "Venus" }),
    );
    expect(button).toHaveAttribute("aria-controls", "planet-menu");
  });

  it("closes on Escape and hands focus back to the button", async () => {
    const user = userEvent.setup();
    const button = renderMenu();

    await user.click(button);
    await user.keyboard("{Escape}");

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });

  it("closes once a planet is chosen", async () => {
    const user = userEvent.setup();
    const button = renderMenu();

    await user.click(button);
    await user.click(screen.getByRole("link", { name: "Venus" }));

    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("pins the page behind the panel only while it is open", async () => {
    const user = userEvent.setup();
    const button = renderMenu();

    await user.click(button);
    expect(document.body).toHaveStyle({ position: "fixed" });

    await user.click(button);
    expect(document.body.style.position).toBe("");
  });

  it("closes itself when the viewport grows past the breakpoint", async () => {
    const user = userEvent.setup();
    const button = renderMenu();

    await user.click(button);
    act(() => setMediaMatches(WIDE, true));

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.position).toBe("");
  });
});
