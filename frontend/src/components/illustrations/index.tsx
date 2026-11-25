import * as React from "react";

type IllustrationProps = React.SVGProps<SVGSVGElement>;

const paper = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "aria-hidden": "true",
  focusable: "false",
} as const;

const mark = {
  ...paper,
  preserveAspectRatio: "none",
  overflow: "visible",
} as const;

const markerInk = {
  fill: "none",
  stroke: "var(--accent, currentColor)",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

export function MarkCircle(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 200 120" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={5}
        d="M153 19C119 3 69 8 38 24C13 37 2 54 6 73C11 99 51 114 98 113C148 112 188 91 194 64C200 39 177 18 145 12C129 9 117 8 108 10"
      />
    </svg>
  );
}

export function MarkUnderline(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 200 20" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={5}
        d="M5 10C52 5 110 11 170 6.5C184 5.5 194 5.5 195 7C196 9.5 162 10.5 139 12C97 14.5 52 12.5 16 16"
      />
    </svg>
  );
}

export function MarkArrow(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 120 80" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={4}
        d="M6 8C33 7 47 16 60 34S88 60 108 69Q102 55 100 45Q104 60 110 71Q94 71 79 68"
      />
    </svg>
  );
}

export function MarkHeart(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 100 90" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={5}
        d="M44 76C28 64 8 46 7 30C6 17 14 9 25 9C36 9 44 17 49 27C54 13 65 5 77 8C89 10 96 22 92 35C88 51 69 69 50 82Q44 77 38 72"
      />
    </svg>
  );
}

export function MarkCross(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 60 60" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={5}
        d="M7 6C20 18 37 38 53 53Q40 38 30 30Q43 16 53 7C40 20 21 39 7 53"
      />
    </svg>
  );
}

// Half a pitch on either side keeps the binding centered when cropped.
const punches = Array.from({ length: 12 }, (_, index) => 25 + index * 50);

export function BindingRings(props: IllustrationProps) {
  return (
    <svg {...paper} viewBox="0 0 600 40" preserveAspectRatio="xMidYMid slice" {...props}>
      {punches.map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <circle cx={0} cy={31} r={5.5} fill="currentColor" />
          <path
            d="M0 31a5 5 0 0 1-5-5V10a5 5 0 0 1 10 0v16a5 5 0 0 1-5 5Z"
            transform="rotate(10 0 31)"
            stroke="currentColor"
            strokeWidth={3}
            fill="none"
          />
        </g>
      ))}
    </svg>
  );
}

export function Perforation(props: IllustrationProps) {
  return (
    <svg {...paper} viewBox="0 0 600 8" preserveAspectRatio="none" {...props}>
      <path d="M1 4H599" stroke="currentColor" strokeWidth={2} strokeDasharray="6 10" strokeLinecap="round" />
    </svg>
  );
}

export function TornEdge(props: IllustrationProps) {
  return (
    <svg {...paper} viewBox="0 0 600 24" preserveAspectRatio="none" {...props}>
      <path
        fill="currentColor"
        d="M0 0H600V14L592 16 586 13 579 14 566 10 559 12 556 9 548 12
           537 13 532 17 523 15 519 18 507 17 499 21 492 19 488 21 479 15
           471 16 465 12 453 13 449 10 440 12 433 9 425 11 422 8 414 10
           402 10 396 14 387 12 382 15 370 14 363 18 354 17 347 21 342 18
           333 20 329 16 318 15 311 12 298 14 292 11 286 13 279 9 269 11
           262 10 250 14 246 12 239 16 228 15 220 19 217 16 207 18 198 13
           189 14 184 10 172 12 167 9 156 11 150 8 144 11 132 10 126 14
           114 15 110 18 103 16 94 20 87 19 83 22 74 17 63 16 58 12
           49 14 45 11 36 13 27 10 21 14 13 12 8 16 0 14Z"
      />
    </svg>
  );
}

export function MonogramJC(props: IllustrationProps) {
  return (
    <svg {...paper} viewBox="0 0 120 120" {...props}>
      <rect x={6} y={6} width={108} height={108} stroke="currentColor" strokeWidth={4} />
      <g stroke="currentColor" strokeWidth={8} strokeLinecap="square" strokeLinejoin="miter">
        <path d="M24 38h18v33a11 11 0 0 1-22 0" />
        <path d="M100 38H89a14 14 0 0 0-14 14v16a14 14 0 0 0 14 14h11" />
      </g>
      <path fill="currentColor" d="m59 66-6.5-6.5a4 4 0 0 1 5.7-5.6l.8.8.8-.8a4 4 0 0 1 5.7 5.6Z" />
    </svg>
  );
}

export function StampNine(props: IllustrationProps) {
  const trackId = `stamp-nine-${React.useId()}`;

  return (
    <svg {...paper} viewBox="0 0 200 200" {...props}>
      <defs>
        <path id={trackId} d="M38.4 53.8a77 77 0 1 1 123.2 92.4a77 77 0 1 1-123.2-92.4Z" />
      </defs>
      <circle cx={100} cy={100} r={94} stroke="currentColor" strokeWidth={4} />
      <circle cx={100} cy={100} r={69} stroke="currentColor" strokeWidth={2} />
      <path
        d="M125 82a25 25 0 1 1-50 0a25 25 0 1 1 50 0ZM125 82v18c0 23-14 39-37 44"
        stroke="currentColor"
        strokeWidth={14}
      />
      <text fontFamily="inherit" fontSize={15} fontWeight={700} letterSpacing={2} fill="currentColor" stroke="none">
        <textPath href={`#${trackId}`} startOffset={4} textLength={474} lengthAdjust="spacing">
          NUEVE AÑOS · 25 NOV 2017 — 25 NOV 2026 ·
        </textPath>
      </text>
    </svg>
  );
}
