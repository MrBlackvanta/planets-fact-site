import type { SVGProps } from "react";

export default function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="6"
      height="8"
      viewBox="0 0 6 8"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M1 0l4 4-4 4" />
    </svg>
  );
}
