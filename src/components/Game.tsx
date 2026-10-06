"use client";

import { useEffect, useRef, useState } from "react";
import { CatRunner } from "./CatRunner";
import { Eyebrow } from "./Eyebrow";
import { Keyboard } from "./Keyboard";
import { Reveal } from "./Reveal";

// Scales a fixed-size Figma frame to the available width (Figma scales the monitor and keyboard as units).
function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / designWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);
  return { ref, scale };
}

export function Game() {
  const { ref: monitorRef, scale: monitorScale } = useFitScale(1112);
  const { ref: keyboardRef, scale: keyboardScale } = useFitScale(944);
  const [key, setKey] = useState<string | null>(null);

  return (
    <section id="game" className="relative flex flex-col items-center gap-10 bg-white px-5 py-18 tab:gap-12 tab:px-10 tab:py-22 lap:px-12 desk:gap-14 desk:px-36 desk:py-24">
      <Reveal className="flex w-full flex-col items-center gap-5 text-center desk:w-[800px]">
        <Eyebrow size={16}>Mini game</Eyebrow>
        <h2 className="w-full text-[28px] leading-none font-medium text-[#0a0a0a] [text-shadow:0px_10px_36px_rgba(5,31,71,0.16)] tab:text-[34px] lap:text-[36px] desk:text-[40px]">
          Take a break, help the cat across.
        </h2>
        <p className="w-full text-[16px] leading-[1.4] text-[#4f5051] tab:w-[560px] tab:text-[18px]">
          A tiny side-scroller between projects. Clear pipes, gaps, crates, and one very persistent bug to reach the flag.
        </p>
      </Reveal>

      {/* Monitor (1112×722 at 1440, scaled as one unit below) */}
      <div ref={monitorRef} className="w-full max-w-[1112px]">
        <div className="relative w-full" style={{ height: 722 * monitorScale }}>
          <div className="absolute top-0 left-0 h-[722px] w-[1112px] origin-top-left" style={{ transform: `scale(${monitorScale})` }}>
            <div
              className="absolute top-0 left-[436px] h-[96px] w-[240px] overflow-hidden rounded-[10px] border border-[#d4d8de]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgb(209,213,219) 0%, rgb(243,244,246) 18%, rgb(255,255,255) 50%, rgb(238,240,243) 82%, rgb(201,206,214) 100%)",
              }}
            >
              <div className="absolute top-[23px] left-[39px] h-[22px] w-[160px] rounded-md bg-gradient-to-r from-[#9ca3af] via-[#d1d5db] to-[#9ca3af]" />
            </div>
            <div className="absolute top-[72px] left-0 h-[650px] w-[1112px] rounded-[26px] border border-[#d8dce2] bg-gradient-to-b from-white via-[#f3f4f6] via-[6%] to-[#e9ecf0] drop-shadow-[0px_2px_3px_rgba(15,23,41,0.06)] [filter:drop-shadow(0px_2px_3px_rgba(15,23,41,0.06))_drop-shadow(0px_28px_28px_rgba(15,23,41,0.14))]">
              <div className="absolute top-[17px] left-[17px] h-[614px] w-[1076px] overflow-hidden rounded-[14px] bg-[#0b0f17]">
                <CatRunner onKeyState={setKey} />
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-[10px] left-[10px] h-[594px] w-[1056px] rounded-[4px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(157.13deg, rgba(255,255,255,0.1) 7.1429%, rgba(255,255,255,0) 39.286%, rgba(255,255,255,0) 78.571%)",
                  }}
                />
              </div>
              <span className="absolute top-[5.5px] left-[552.5px] size-[5px] rounded-full bg-[#2b3240]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-5">
        {/* Desk keyboard: tablet and up only (hidden in the 390/375 frames). */}
        <div ref={keyboardRef} className="hidden w-full max-w-[944px] tab:block">
          <div className="relative w-full" style={{ height: 340 * keyboardScale }}>
            <div className="absolute top-0 left-0 origin-top-left" style={{ transform: `scale(${keyboardScale})` }}>
              <Keyboard pressed={key} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="hidden items-start gap-2.5 tab:flex">
            <span className="rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-[13px] leading-4 font-medium text-[#1d4ed8]">Space</span>
            <span className="flex w-8 items-center justify-center rounded-lg border border-[#bfdbfe] bg-[#eff6ff] p-2 text-[13px] leading-4 font-medium text-[#1d4ed8]">↑</span>
            <span className="flex w-8 items-center justify-center rounded-lg border border-[#bfdbfe] bg-[#eff6ff] p-2 text-[13px] leading-4 font-medium text-[#1d4ed8]">→</span>
          </span>
          <p className="hidden text-[14px] leading-[1.2] whitespace-nowrap text-[#8a8a90] tab:block">to jump · or just click the game</p>
          <p className="text-[14px] leading-[1.2] whitespace-nowrap text-[#8a8a90] tab:hidden">Tap the screen to jump · best played on desktop</p>
        </div>
      </div>
    </section>
  );
}
