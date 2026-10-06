/* eslint-disable @next/next/no-img-element */
import { links } from "@/lib/links";
import type { CSSProperties } from "react";

/*
 * Hero background is rebuilt from the Figma layer stack (not flattened):
 * Light → Horizon Haze → Clouds Background (wisps, distant bank) → Light Diffusion
 * (sun bloom, cloud glow) → Grain → cloud group (7 soft-light frames) →
 * smoke 5, 6, 1, 3, 4 → Rectangle 2 (fade to white).
 *
 * Positions come from Figma's per-frame bounds. Horizontal anchors are the frame
 * centre (Figma "center" constraint) and vertical anchors the frame bottom, which
 * reproduces every breakpoint from one set of numbers. 1728 scales the smoke 1.2×.
 */

// Cloud group: 2095×803 frame centred on the hero (-0.42px, -34.67px), opacity 0.5.
const CLOUDS = [
  { src: "/hero/cloud-1.webp", x: 615.6, y: 614.9, w: 904.7, h: 400 },
  { src: "/hero/cloud-2.webp", x: 770.9, y: -102.6, w: 1234.2, h: 400 },
  { src: "/hero/cloud-3.webp", x: -57, y: 395.7, w: 1234.2, h: 400 },
  { src: "/hero/cloud-4.webp", x: 1149.1, y: 359.6, w: 1234.2, h: 400 },
  { src: "/hero/cloud-5.webp", x: 1007.6, y: 644, w: 1029.1, h: 300 },
  { src: "/hero/cloud-6.webp", x: 91.3, y: 668, w: 1029.1, h: 300 },
  { src: "/hero/cloud-7.webp", x: 220, y: -83.6, w: 567.5, h: 400 },
];

// Smoke: dx = left edge relative to the hero centre, db = distance from top edge to hero bottom.
// "wide" values are the 1728 frame where the smoke is scaled 1.2×.
const SMOKE = [
  { src: "/hero/smoke-5.webp", base: { dx: -886.5, db: 401.7, w: 861.8, h: 652.8 }, wide: { dx: -1063.8, db: 532.1, w: 1034.2, h: 783.3 } },
  { src: "/hero/smoke-6.webp", base: { dx: -511.3, db: 302.1, w: 861.8, h: 652.8 }, wide: { dx: -613.6, db: 432.6, w: 1034.2, h: 783.3 } },
  { src: "/hero/smoke-1.webp", base: { dx: -1060.3, db: 389.1, w: 861.8, h: 652.8 }, wide: { dx: -1272.3, db: 519.5, w: 1034.2, h: 783.3 } },
  { src: "/hero/smoke-3.webp", base: { dx: -149.2, db: 408.5, w: 903.9, h: 736 }, wide: { dx: -179, db: 555.6, w: 1084.7, h: 883.1 } },
  { src: "/hero/smoke-4.webp", base: { dx: 104.5, db: 522.4, w: 903.9, h: 736 }, wide: { dx: 125.4, db: 669.5, w: 1084.7, h: 883.1 } },
];

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="relative shrink-0 transition-transform duration-200 ease-out group-hover:translate-y-[3px]">
      <path
        d="M7 2H9V4H7V2ZM7 4H9V6H7V4ZM7 6H9V8H7V6ZM3 8H5V10H3V8ZM7 8H9V10H7V8ZM11 8H13V10H11V8ZM5 10H7V12H5V10ZM7 10H9V12H7V10ZM9 10H11V12H9V10ZM7 12H9V14H7V12Z"
        fill="#0B2447"
      />
    </svg>
  );
}

function ThemeSwitch() {
  // Visual only: the site has a single (light) theme.
  return (
    <div aria-hidden className="relative h-9 w-16 shrink-0 rounded-[18px] backdrop-blur-[6px]">
      <img src="/svg/theme-switch.svg" alt="" width={64} height={36} className="absolute inset-0 block size-full" />
    </div>
  );
}

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex h-[860px] flex-col items-center overflow-hidden bg-[#1a5a9f] tab:h-[900px] lap:h-[840px] desk:h-[912px]"
    >
      {/* ---------- Background layers ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Light: three blurred ellipses, anchored to the left edge (centred on wide screens). */}
        <img
          src="/svg/hero-light-wide.svg"
          alt=""
          width={3200}
          height={912}
          className="absolute top-0 block h-[912px] w-[3200px] max-w-none"
          style={{ left: "calc(max(0px, (100% - 1440px) / 2) - 800px)" }}
        />

        {/* Atmospheric Haze */}
        <div
          className="absolute inset-[0_0_12px_0]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(220, 234, 251, 0) 45%, rgba(220, 234, 251, 0.05) 70%, rgba(220, 234, 251, 0.12) 85%, rgba(220, 234, 251, 0.22) 100%)",
          }}
        />

        {/* Clouds Background */}
        <div className="absolute inset-[0_0_12px_0]">
          <img
            src="/hero/wisps.webp"
            alt=""
            width={656}
            height={52}
            className="cloud-drift absolute top-[161px] left-[calc(50%-704px)] h-[52px] w-[656px] max-w-none"
            style={{ "--drift": "18px", "--drift-duration": "22s" } as CSSProperties}
          />
          <img
            src="/hero/distant-bank.webp"
            alt=""
            width={906}
            height={85}
            className="absolute bottom-[105px] left-[calc(50%-409px)] h-[85px] w-[906px] max-w-none"
          />
          <img
            src="/hero/wisps-right.webp"
            alt=""
            width={278}
            height={29}
            className="cloud-drift absolute top-[203px] right-[116px] h-[29px] w-[278px] max-w-none"
            style={{ "--drift": "-14px", "--drift-duration": "26s" } as CSSProperties}
          />
        </div>

        {/* Light Diffusion: Sun Bloom + Cloud Glow */}
        <div className="absolute inset-[0_0_12px_0]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1440 900' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(72 0 0 52.2 1468.8 198)'><stop stop-color='rgba(255,254,250,0.2)' offset='0'/><stop stop-color='rgba(255,255,255,0.06)' offset='0.5'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\")",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1440 900' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(28.8 0 0 27 1339.2 504)'><stop stop-color='rgba(255,252,247,0.12)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\")",
            }}
          />
        </div>

        {/* Grain: duotone noise (white/black 16%) in overlay blend. */}
        <div
          className="absolute inset-[0_0_12px_0] opacity-50 mix-blend-overlay"
          style={{ backgroundImage: NOISE, backgroundSize: "240px 240px" }}
        />

        {/* Cloud group */}
        <div className="absolute top-[calc(50%-436.3px)] left-[calc(50%-1048px)] h-[803.26px] w-[2095.165px]">
          {CLOUDS.map((c) => (
            <img
              key={c.src}
              src={c.src}
              alt=""
              width={Math.round(c.w)}
              height={c.h}
              className="absolute block max-w-none opacity-50 mix-blend-soft-light"
              style={{ left: c.x, top: c.y, width: c.w, height: c.h }}
            />
          ))}
        </div>

        {/* Smoke */}
        {SMOKE.map((s) => (
          <img
            key={s.src}
            src={s.src}
            alt=""
            width={Math.round(s.wide.w)}
            height={Math.round(s.wide.h)}
            className="hero-smoke absolute block max-w-none"
            style={
              {
                "--dx": `${s.base.dx}px`,
                "--db": `${s.base.db}px`,
                "--w": `${s.base.w}px`,
                "--h": `${s.base.h}px`,
                "--dx-wide": `${s.wide.dx}px`,
                "--db-wide": `${s.wide.db}px`,
                "--w-wide": `${s.wide.w}px`,
                "--h-wide": `${s.wide.h}px`,
              } as CSSProperties
            }
          />
        ))}

        {/* Rectangle 2: fade into the white About section */}
        <div className="absolute bottom-[-655px] left-0 h-[874px] w-full bg-gradient-to-b from-[rgba(255,255,255,0)] to-white to-[21.154%]" />
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="relative flex w-full shrink-0 items-center gap-6 px-5 pt-5 tab:px-8 tab:pt-7 desk:px-10">
        <div className="flex min-w-px flex-[1_0_0] items-center gap-3">
          <a href={links.home} className="text-[18px] leading-none font-medium whitespace-nowrap text-white tab:text-[24px]">
            Dekstive Studio
          </a>
          <div className="hidden items-center self-stretch border-l border-[rgba(255,255,255,0.64)] pl-3 tab:flex">
            <p className="text-[14px] leading-none font-medium tracking-[0.28px] whitespace-nowrap text-[rgba(255,255,255,0.8)]">
              create by renalda aji
            </p>
          </div>
        </div>
        <a href={links.home} aria-label="Dekstive Studio" className="relative block size-10 shrink-0 tab:size-14">
          <img
            src="/svg/logo.svg"
            alt=""
            width={99}
            height={99}
            className="absolute top-[-12.52%] left-[-37.56%] block h-[175.13%] w-[175.12%] max-w-none"
          />
        </a>
        <div className="flex min-w-px flex-[1_0_0] items-center justify-end gap-4">
          <p className="hidden text-[14px] leading-none font-medium tracking-[0.28px] whitespace-nowrap text-[rgba(255,255,255,0.78)] lap:block">
            GMT+7 (Indonesia time)
          </p>
          <ThemeSwitch />
          <a
            href={links.contact}
            className="hidden h-9 items-center justify-center rounded-[32px] border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.1)] px-5 backdrop-blur-[6px] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.18)] tab:flex"
          >
            <span className="text-[14px] leading-none font-medium whitespace-nowrap text-white">Contact Us</span>
          </a>
        </div>
      </nav>

      {/* ---------- Content ---------- */}
      <div className="relative flex w-full shrink-0 flex-col items-center justify-center gap-11 px-5 pt-24 pb-30 tab:px-8 tab:py-30">
        <div className="hero-enter flex w-full flex-col items-center gap-6 desk:w-[1100px]">
          <div className="flex items-center gap-2.5 overflow-hidden rounded-[100px] border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.16)] px-4 py-3">
            <span className="size-1.5 shrink-0 bg-[#fff4dc] shadow-[0px_0px_6px_0px_rgba(255,242,214,0.75)]" />
            <p className="text-[13px] leading-none font-medium tracking-[0.26px] whitespace-nowrap text-white uppercase tab:text-[16px] tab:tracking-[0.32px]">
              Available for new project in october
            </p>
          </div>
          <h1 className="w-full text-center font-display text-[38px] leading-[1.16] font-medium tracking-[-0.02em] text-[#faf8f3] [text-shadow:0px_10px_36px_rgba(5,31,71,0.16)] min-[390px]:text-[40px] tab:text-[60px] lap:text-[72px] desk:text-[80px]">
            Crafting digital products where simplicity meets clarity and purpose
          </h1>
        </div>
        <div
          className="hero-enter flex flex-col items-center gap-3 tab:flex-row"
          style={{ animationDelay: "120ms" }}
        >
          <a
            href={links.portfolio}
            className="group relative flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-3xl border border-[#94bdff] bg-[#f7f9fc] pr-5 pl-6 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] transition-[background-color,box-shadow] duration-200 ease-out hover:bg-white hover:shadow-[0px_2px_4px_0px_rgba(11,36,71,0.12),0px_14px_32px_0px_rgba(11,36,71,0.16)] active:bg-[#e9eff7] active:shadow-[0px_1px_1px_0px_rgba(11,36,71,0.1)]"
          >
            <span className="relative text-[16px] leading-none font-medium whitespace-nowrap text-[#0b2447]">See our portfolio</span>
            <ArrowDown />
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-4px_4px_0px_rgba(148,189,255,0.8)]" />
          </a>
          <a
            href={links.contact}
            className="relative flex h-12 items-center justify-center overflow-hidden rounded-3xl border border-[#94bdff] bg-[#121212] px-6 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] transition-[box-shadow,filter] duration-200 ease-out hover:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2),0px_8px_24px_0px_rgba(11,36,71,0.14)] hover:brightness-125 active:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.2)] active:brightness-100"
          >
            <span className="relative text-[16px] leading-none font-medium whitespace-nowrap text-white">Let&apos;s connect</span>
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-4px_4px_0px_rgba(148,189,255,0.8)]" />
          </a>
        </div>
      </div>
    </header>
  );
}
