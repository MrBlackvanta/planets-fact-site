import { setMediaMatches } from "@/test/match-media";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RouteTransitions from "./route-transitions";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/",
}));

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

let claimed = false;

function swallowNavigation(event: MouseEvent) {
  claimed = event.defaultPrevented;
  event.preventDefault();
}

function stubViewTransitions() {
  const start = vi.fn((update: () => unknown) => {
    update();
    return { ready: Promise.resolve(), finished: Promise.resolve() };
  });
  Object.defineProperty(document, "startViewTransition", {
    value: start,
    configurable: true,
  });
  return start;
}

function renderWithLink(href = "/mars") {
  render(
    <>
      <RouteTransitions />
      <a href={href}>Destination</a>
    </>,
  );
  return document.querySelector("a")!;
}

beforeEach(() => {
  claimed = false;
  push.mockClear();
  document.addEventListener("click", swallowNavigation);
});

afterEach(() => {
  document.removeEventListener("click", swallowNavigation);
  Reflect.deleteProperty(document, "startViewTransition");
});

describe("RouteTransitions", () => {
  it("drives the navigation itself through a view transition", async () => {
    const start = stubViewTransitions();
    const link = renderWithLink();

    await userEvent.click(link);

    expect(claimed).toBe(true);
    expect(start).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith("/mars");
  });

  it("leaves the click to the router when motion is reduced", async () => {
    stubViewTransitions();
    setMediaMatches(REDUCED_MOTION, true);
    const link = renderWithLink();

    await userEvent.click(link);

    expect(claimed).toBe(false);
    expect(push).not.toHaveBeenCalled();
  });

  it("leaves the click to the router without view transition support", async () => {
    const link = renderWithLink();

    await userEvent.click(link);

    expect(claimed).toBe(false);
    expect(push).not.toHaveBeenCalled();
  });

  it("leaves a link to the current page alone", async () => {
    stubViewTransitions();
    const link = renderWithLink(location.pathname);

    await userEvent.click(link);

    expect(claimed).toBe(false);
    expect(push).not.toHaveBeenCalled();
  });
});
