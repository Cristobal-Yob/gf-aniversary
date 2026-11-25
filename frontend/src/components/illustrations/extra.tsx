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

const hardware = {
  ...paper,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
} as const;

const accent = "var(--accent, currentColor)";
const markerInk = {
  fill: "none",
  stroke: accent,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

export function MarkStar(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 100 100" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={5}
        d="M18 85Q32 44 49 8Q65 47 84 86Q47 61 7 35Q48 37 93 32Q59 60 15 89"
      />
    </svg>
  );
}

export function MarkSpiral(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 100 100" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={5}
        d="M95 44C96 70 77 93 51 94C24 95 7 76 7 54C7 31 26 12 48 12
           C70 12 85 28 84 48C83 68 68 80 50 80C34 80 21 69 21 54
           C20 39 33 26 48 26C62 25 72 36 71 49C70 61 62 68 51 68C41 68 35 62 35 54"
      />
    </svg>
  );
}

export function MarkCheck(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 80 60" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={5}
        d="M5 30Q14 37 24 51C39 32 54 14 76 5"
      />
    </svg>
  );
}

export function MarkZigzag(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 200 24" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={4}
        d="M3 18L18 5 26 19 46 4 53 18 73 6 81 19 101 4 110 17 129 5 137 18 156 3 165 17 184 5 197 16"
      />
    </svg>
  );
}

export function MarkBracket(props: IllustrationProps) {
  return (
    <svg {...mark} viewBox="0 0 30 120" {...props}>
      <path
        {...markerInk}
        className="mark-path"
        pathLength={1}
        strokeWidth={4}
        d="M26 4C11 4 17 24 16 40C16 51 12 56 4 59C13 61 16 66 16 79C16 95 10 114 26 116"
      />
    </svg>
  );
}

const grooveRadii = [42, 48, 56, 62, 71, 77, 85, 91];
const holeInk = "var(--hole, #F4F5F1)";

export function Vinyl(props: IllustrationProps) {
  return (
    <svg {...hardware} viewBox="0 0 200 200" {...props}>
      <circle cx={100} cy={100} r={96} fill="currentColor" />
      <g stroke="var(--groove, rgba(255,255,255,0.22))" strokeWidth={1}>
        {grooveRadii.map((r) => <circle key={r} cx={100} cy={100} r={r} />)}
      </g>
      <circle cx={100} cy={100} r={34} fill={accent} />
      <circle cx={100} cy={100} r={4} fill={holeInk} />
      <line x1={112} y1={84} x2={118} y2={76} stroke={holeInk} strokeWidth={3} />
    </svg>
  );
}

const toothAngles = [0, 60, 120, 180, 240, 300];

export function Cassette(props: IllustrationProps) {
  return (
    <svg {...hardware} viewBox="0 0 240 150" {...props}>
      <path d="M14 6H226L235 15V135L226 144H14L5 135V15Z" stroke="currentColor" strokeWidth={4} />
      <g stroke="currentColor">
        <path d="M30 22H210L217 29V85L210 92H30L23 85V29Z" strokeWidth={3} />
        <path d="M33 34H207" strokeWidth={2} />
        <rect x={99} y={53} width={42} height={14} strokeWidth={2} />
        <path d="M47 136L60 105H180L193 136Z" strokeWidth={3} />
      </g>
      {[66, 174].map((x) => (
        <g key={x} transform={`translate(${x} 61)`}>
          <g className="cassette-reel" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <circle cx={0} cy={0} r={19} stroke="currentColor" strokeWidth={3} />
            {toothAngles.map((angle) => (
              <rect key={angle} x={-2.5} y={-19} width={5} height={8} fill="currentColor" transform={`rotate(${angle})`} />
            ))}
            <circle cx={0} cy={0} r={5} stroke="currentColor" strokeWidth={2} />
          </g>
        </g>
      ))}
      <g fill="currentColor">
        <circle cx={16} cy={17} r={2} /><circle cx={224} cy={17} r={2} />
        <circle cx={16} cy={133} r={2} /><circle cx={224} cy={133} r={2} />
        <circle cx={70} cy={125} r={3.5} /><circle cx={170} cy={125} r={3.5} />
      </g>
    </svg>
  );
}

const barHeights = [16, 28, 36, 21, 12];

export function EqualizerBars(props: IllustrationProps) {
  return (
    <svg {...paper} viewBox="0 0 60 40" {...props}>
      {barHeights.map((height, index) => (
        <rect
          key={index}
          className="eq-bar"
          x={2 + index * 12}
          y={38 - height}
          width={8}
          height={height}
          fill="currentColor"
          style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
        />
      ))}
    </svg>
  );
}

export function ToneArm(props: IllustrationProps) {
  return (
    <svg {...hardware} viewBox="0 0 120 160" {...props}>
      <g stroke="currentColor" strokeWidth={5}>
        <circle cx={94} cy={26} r={19} />
        <circle cx={94} cy={26} r={9} fill="currentColor" />
        <path d="M84 42 40 112" />
        <g transform="translate(40 112) rotate(32)">
          <path d="M-7 0H4L8 6V27H-7Z" />
          <path d="M0 27v7" />
        </g>
      </g>
    </svg>
  );
}

export function CalendarSheet(props: IllustrationProps) {
  return (
    <svg {...paper} viewBox="0 0 200 240" preserveAspectRatio="none" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 0H200V229L192 232 184 229 178 233 167 232 162 237 154 235 149 238
           138 232 132 234 124 230 119 232 108 228 99 232 92 231 84 236 79 234
           71 239 62 235 56 237 45 230 39 232 32 228 23 232 17 230 9 234 0 231Z
           M43 19a7 7 0 1 0 14 0a7 7 0 1 0-14 0Z
           M143 19a7 7 0 1 0 14 0a7 7 0 1 0-14 0Z"
      />
    </svg>
  );
}

export function TapeStrip(props: IllustrationProps) {
  return (
    <svg {...paper} viewBox="0 0 120 36" {...props}>
      <path
        fill={accent}
        fillOpacity={0.85}
        d="M3 8L114 2 111 7 117 10 113 15 118 18 114 23 118 27 7 34 10 29 4 26 8 21 2 18 6 13Z"
      />
    </svg>
  );
}

export function PushPin(props: IllustrationProps) {
  return (
    <svg {...hardware} viewBox="0 0 40 56" {...props}>
      <g transform="translate(25 16) rotate(26)">
        <g stroke="currentColor">
          <path d="M0 16V39" strokeWidth={2.5} />
          <path d="M0 5V16" strokeWidth={7} />
          <path d="M-6 16H6" strokeWidth={4} />
        </g>
        <circle cx={0} cy={0} r={10} fill={accent} />
      </g>
    </svg>
  );
}

export function TicketStub(props: IllustrationProps) {
  return (
    <svg {...hardware} viewBox="0 0 240 100" preserveAspectRatio="none" {...props}>
      <g stroke="currentColor" strokeWidth={3}>
        <path d="M4 5H236V39a11 11 0 0 0 0 22V95H4V61a11 11 0 0 0 0-22Z" />
        <path d="M180 9V91" strokeDasharray="5 7" />
      </g>
    </svg>
  );
}

const rayAngles = Array.from({ length: 24 }, (_, index) => index * 15);

export function Sunburst(props: IllustrationProps) {
  return (
    <svg {...hardware} viewBox="0 0 200 200" {...props}>
      <g stroke={accent} strokeWidth={4}>
        {rayAngles.map((angle, index) => (
          <line key={angle} x1={100} y1={52} x2={100} y2={index % 2 === 0 ? 6 : 21} transform={`rotate(${angle} 100 100)`} />
        ))}
      </g>
    </svg>
  );
}

// The missing arc breaks one crossing; a half-turn puts the other gap at the opposite crossing.
const band = "M11.2 38.4A40 40 0 1 1 32 24";

export function RingsPair(props: IllustrationProps) {
  return (
    <svg {...hardware} viewBox="0 0 200 120" {...props}>
      <g stroke="currentColor" strokeWidth={8}>
        <path d={band} transform="translate(77 68)" />
        <path d={band} transform="translate(123 68) rotate(180)" />
      </g>
      <path fill={accent} d="M65 16L71 9H83L89 16 77 29Z" />
    </svg>
  );
}

export function KeyIllustration(props: IllustrationProps) {
  return (
    <svg {...hardware} viewBox="0 0 200 80" {...props}>
      <g stroke="currentColor" strokeWidth={6}>
        <path d="M66 40H189M80 34V46M153 40V55H162M177 40V59H187" />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M68 40a29 29 0 1 1-58 0a29 29 0 1 1 58 0Z
             M39 58C33 52 18 43 18 33C18 22 32 19 39 29C46 19 60 22 60 33C60 43 45 53 39 58Z"
        />
      </g>
    </svg>
  );
}

export function YearTab(props: IllustrationProps) {
  return (
    <svg {...paper} viewBox="0 0 120 48" preserveAspectRatio="none" {...props}>
      <path fill="currentColor" d="M0 48V12L12 0H108L120 12V48Z" />
    </svg>
  );
}
