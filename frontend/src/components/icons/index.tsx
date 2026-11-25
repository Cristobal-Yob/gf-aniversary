import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const plate = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": "true",
  focusable: "false",
} as const;

const transportInk = { fill: "currentColor", stroke: "none" } as const;
const speaker = "M3 9h4l5-4v14l-5-4H3Z";

export function IconMenu(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M5 19 18.5 5.5M7 5h12v12" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M4.5 8.5 12 16l7.5-7.5" />
    </svg>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path {...transportInk} d="M7 3.5 21 12 7 20.5Z" />
    </svg>
  );
}

export function IconPause(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path {...transportInk} d="M5 4h5v16H5ZM14 4h5v16h-5Z" />
    </svg>
  );
}

export function IconSkipNext(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path {...transportInk} d="M4 4.5 15.5 12 4 19.5ZM17 4.5h3v15h-3Z" />
    </svg>
  );
}

export function IconSkipPrev(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path {...transportInk} d="M20 4.5 8.5 12 20 19.5ZM4 4.5h3v15H4Z" />
    </svg>
  );
}

export function IconVolume(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d={speaker} />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18 5.5a9.25 9.25 0 0 1 0 13" />
    </svg>
  );
}

export function IconVolumeMute(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d={speaker} />
      <path d="m16 9.5 4.5 5m0-5-4.5 5" />
    </svg>
  );
}

export function IconCamera(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M3 7.5h4l2-3h6l2 3h4V20H3Z" />
      <circle cx={12} cy={13.5} r={3.75} />
    </svg>
  );
}

export function IconMusicNote(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M9 17.5V6l11-2v11.5M9 9.5l11-2" />
      <circle cx={6.25} cy={17.5} r={2.75} />
      <circle cx={17.25} cy={15.5} r={2.75} />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M3 4.5h5.5l3.5 2 3.5-2H21v14h-5l-4 2-4-2H3ZM12 6.5v14" />
    </svg>
  );
}

export function IconHeart(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="m12 20-7.4-7.4a4.81 4.81 0 0 1 6.8-6.8l.6.6.6-.6a4.81 4.81 0 0 1 6.8 6.8Z" />
    </svg>
  );
}

export function IconRing(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <circle cx={12} cy={14.75} r={6.25} />
      <path d="m8 5.5 2-2.25h4l2 2.25-4 3Z" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <rect x={4.5} y={10.5} width={15} height={10.5} />
      <path d="M7.5 10.5V7.75a4.5 4.5 0 0 1 9 0v2.75M12 14.5V17" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M6 5.5H3V21h18V5.5h-3M9 5.5h6M3 10h18" />
      <path d="M6 7V4.5a1.5 1.5 0 0 1 3 0V7M15 7V4.5a1.5 1.5 0 0 1 3 0V7" />
      <circle cx={15.5} cy={15.5} r={2.25} />
    </svg>
  );
}

export function IconInfinity(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="m9.4 9.4 5.2 5.2a3.7 3.7 0 1 0 0-5.2l-5.2 5.2a3.7 3.7 0 1 1 0-5.2Z" />
    </svg>
  );
}

export function IconExpand(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
    </svg>
  );
}

export function IconGamepad(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M7.25 6h9.5c1.6 0 2.6 1 2.9 2.7l1.1 7.4c.4 2.7-1.8 4.1-3.6 2.4L14.5 16h-5l-2.65 2.5c-1.8 1.7-4 .3-3.6-2.4l1.1-7.4C4.65 7 5.65 6 7.25 6Z" />
      <path d="M6.5 11.25h4m-2-2v4" />
      <circle cx={16.25} cy={11.25} r={1.75} />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M3 4h18v13H11l-5 3v-3H3ZM7 9h10M7 13h6" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <path d="M12 4H4v16h8M10 12h10M16 8l4 4-4 4" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...plate} {...props}>
      <circle cx={12} cy={7} r={4} />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1Z" />
    </svg>
  );
}
