"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

export type Step = { title: string; body: string; visual: string };

function StepButton({ step, index, active, onSelect }: { step: Step; index: number; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`flex w-full cursor-pointer flex-col items-start gap-4 text-left transition-opacity duration-300 ease-out ${
        active ? "opacity-100" : "opacity-50 hover:opacity-75"
      }`}
    >
      <img src={`/svg/step-${index + 1}.svg`} alt="" width={32} height={32} className="block size-8 shrink-0" />
      <span className="flex w-full flex-col gap-2">
        <span className="text-[20px] leading-none font-medium text-[#0a090b]">{step.title}</span>
        <span className="text-[16px] leading-[22px] tracking-[-0.18px] text-[#4f4d55]">{step.body}</span>
      </span>
    </button>
  );
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);

  // One grid for every width so the inline SVGs (and their pattern ids) render once.
  // Below 1440 the window sits on top of a 1/2/3-column step grid; at 1440 steps 1–3 and 4–6
  // flank the window.
  const place = [
    "desk:col-start-1 desk:row-start-1",
    "desk:col-start-1 desk:row-start-2",
    "desk:col-start-1 desk:row-start-3",
    "desk:col-start-3 desk:row-start-1",
    "desk:col-start-3 desk:row-start-2",
    "desk:col-start-3 desk:row-start-3",
  ];

  return (
    <div className="relative grid w-full grid-cols-1 gap-y-9 tab:grid-cols-2 tab:gap-x-8 tab:gap-y-12 lap:grid-cols-3 desk:h-[640px] desk:grid-cols-[1fr_544px_1fr] desk:grid-rows-[auto_auto_auto] desk:content-center desk:gap-x-16 desk:gap-y-20 wide:max-w-[1280px]">
      {/* Window is 544×500; the exported SVG adds its drop shadow around it (572×541, window at 13.89, 1.85). */}
      <div className="relative mb-1 aspect-[544/500] w-full justify-self-center tab:col-span-2 tab:mb-2 tab:w-[544px] lap:col-span-3 desk:col-span-1 desk:col-start-2 desk:row-span-3 desk:row-start-1 desk:mb-0 desk:self-center">
        {steps.map((s, i) => (
          <div
            key={s.title}
            aria-hidden={i !== active}
            className={`absolute top-[-0.37%] left-[-2.553%] h-[108.2%] w-[105.147%] transition-opacity duration-500 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            dangerouslySetInnerHTML={{ __html: s.visual }}
          />
        ))}
      </div>
      {steps.map((s, i) => (
        <div key={s.title} className={place[i]}>
          <StepButton step={s} index={i} active={i === active} onSelect={() => setActive(i)} />
        </div>
      ))}
    </div>
  );
}
