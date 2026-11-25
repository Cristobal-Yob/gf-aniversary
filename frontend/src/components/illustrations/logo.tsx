import type { SVGProps } from "react";

const ink = "var(--logo-ink, #0F1115)";

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Cristóbal y Josefa"
      {...props}
    >
      <g fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round">
        <rect x="19.5" y="4.5" width="7" height="13" rx="3.5" />
        <rect x="36.5" y="4.5" width="7" height="13" rx="3.5" />
      </g>
      <g stroke={ink} strokeWidth="3" strokeLinejoin="miter">
        <rect x="9.5" y="11.5" width="45" height="47" fill="var(--logo-paper, #F4F5F1)" />
        <rect x="9.5" y="11.5" width="45" height="13" fill="var(--logo-field, #1FC4D4)" />
      </g>
      <g fill={ink}>
        <path d="M24.5 11.5h4v5a2 2 0 0 1-4 0Z M41.5 11.5h4v5a2 2 0 0 1-4 0Z" />
        <path
          d="M14.5 37V36
             C14.5 31.5 17.5 28.5 22.5 28.5S30.5 31.5 30.5 35.5
             C30.5 39 29 41 25.5 44.5L21 48.5H30.5V53H14.5V48.5L22 40.5
             C24.5 38 25.5 37 25.5 35.5S24.5 33 22.5 33
             S19.5 34.5 19.5 36.5V37Z"
        />
        <path
          d="M34 29H47.5V33.5H38.5L38 37.5
             C39 37 40 36.5 41.5 36.5C45.5 36.5 48 39.5 48 44.5
             C48 50 45.5 53.5 40.5 53.5S33 50.5 33 46H38
             C38 48 39 49 40.5 49C42.5 49 43.5 47.5 43.5 45
             S42.5 41 40.5 41C39 41 38 41.5 37.5 42.5H33.5Z"
        />
      </g>
      <path
        d="M54 62L48.5 56.5C47.5 55.5 47 54.5 47 53.5
           C47 51.5 48.5 50 50.5 50C52 50 53 51 54 52.5
           C55 51 56 50 57.5 50C59.5 50 61 51.5 61 53.5
           C61 54.5 60.5 55.5 59.5 56.5Z"
        transform="rotate(12 54 55.5)"
        fill="var(--logo-accent, #FFD60A)"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
