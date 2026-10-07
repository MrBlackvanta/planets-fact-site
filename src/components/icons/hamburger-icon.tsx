import type { SVGProps } from "react";

export default function HamburgerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="17"
      viewBox="0 0 24 17"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M0 0h24v3H0zM0 7h24v3H0zM0 14h24v3H0z" />
    </svg>
  );
}
