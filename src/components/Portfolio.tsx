"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { links } from "@/lib/links";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const TABS = ["All", "Website", "Dashboard", "Mobile App", "Graphic Design", "Social Media", "Motion"] as const;

const PROJECTS = [
  { slug: "orbit", name: "ORBIT", mark: "#3b82f6", category: "Website" },
  { slug: "nasa-mission-control", name: "NASA Mission Control", mark: "#0a0a0a", category: "Dashboard" },
  { slug: "sales-crm", name: "Sales CRM", mark: "#2563eb", category: "Mobile App" },
  { slug: "drafta-identity", name: "Drafta Identity", mark: "#111827", category: "Graphic Design" },
  { slug: "drafta-after-dark", name: "Drafta After Dark", mark: "#1e3a8a", category: "Social Media" },
  { slug: "relivo-pos-film", name: "Relivo POS Film", mark: "#4d7c0f", category: "Motion" },
  { slug: "surreal-studio", name: "SURRÉAL Studio", mark: "#6b4a35", category: "Website" },
  { slug: "weft", name: "Weft", mark: "#f2603f", category: "Dashboard" },
  { slug: "orbital", name: "ORBITAL", mark: "#27272a", category: "Website" },
];

const YEAR = "2026";

function Card({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <a href={links.project(project.slug)} className="group flex min-w-0 flex-col items-start gap-4">
      <div className="relative aspect-[368/276] w-full shrink-0 overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)] bg-[#f4f4f5]">
        <img
          src={`/portfolio/${project.slug}.webp`}
          alt={project.name}
          width={368}
          height={276}
          loading="lazy"
          className="absolute inset-0 block size-full object-cover"
        />
        {/* State=Hover: gradient overlay with category, name and open button (smart animate, 200ms ease-out). */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_35%,rgba(0,0,0,0.62)_100%)] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="absolute bottom-6 left-6 flex flex-col gap-1 text-white">
            <span className="text-[12px] leading-4 font-medium tracking-[0.04em] uppercase opacity-80">{project.category}</span>
            <span className="text-[20px] leading-[26px] font-medium">{project.name}</span>
          </div>
          <span className="absolute right-6 bottom-6 flex size-10 items-center justify-center rounded-full bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.18)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M6 12L12 6M6.5 6H12V11.5" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-2.5">
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] leading-4 font-medium text-white"
            style={{ backgroundColor: project.mark }}
          >
            {project.name[0]}
          </span>
          <span className="text-[18px] leading-6 font-medium tracking-[-0.01em] whitespace-nowrap text-[#0a0a0a]">{project.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-[rgba(59,130,246,0.45)] px-[7px] py-[3px] text-[11px] leading-[14px] font-medium tracking-[0.22px] whitespace-nowrap text-[#3b82f6] uppercase">
            {project.category}
          </span>
          <span className="rounded-md border border-[#d4d4d8] px-[7px] py-[3px] text-[11px] leading-[14px] font-medium tracking-[0.22px] text-[#71717a]">
            {YEAR}
          </span>
        </div>
      </div>
    </a>
  );
}

export function Portfolio() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const shown = tab === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === tab);

  return (
    <section id="portfolio" className="relative bg-white">
      <div className="flex w-full border-t border-[#e5e7eb] tab:px-6 lap:px-8 desk:px-[78px] wide:px-[calc((100%-1284px)/2)]">
        <div className="flex min-w-px flex-[1_0_0] flex-col items-center gap-8 bg-white px-5 py-18 tab:gap-10 tab:border-x tab:border-[#e5e7eb] tab:px-6 tab:py-22 lap:px-8 desk:gap-12 desk:px-[66px] desk:py-24">
          <Reveal className="flex w-full flex-col items-center gap-5">
            <Eyebrow size={16}>Our portfolio</Eyebrow>
            <h2 className="w-full text-center text-[28px] leading-[1.3] font-medium text-[#0a0a0a] [text-shadow:0px_10px_36px_rgba(5,31,71,0.16)] tab:text-[34px] lap:text-[36px] desk:w-[640px] desk:text-[40px]">
              Selected work, from first sketch to shipped product.
            </h2>
          </Reveal>

          <div className="no-scrollbar w-full overflow-x-auto tab:flex tab:justify-center tab:overflow-visible">
            <div role="tablist" aria-label="Filter projects" className="flex w-max items-center gap-0.5 rounded-full bg-[#f4f4f5] p-1">
              {TABS.map((t) => {
                const active = t === tab;
                return (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-[15px] leading-5 font-medium whitespace-nowrap transition-[background-color,color,filter] duration-200 ease-out ${
                      active
                        ? "bg-white text-[#0a0a0a] drop-shadow-[0px_2px_3px_rgba(15,15,41,0.06)]"
                        : "text-[#6b6b70] hover:text-[#0a0a0a]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 tab:grid-cols-2 tab:gap-y-10 lap:grid-cols-3">
            {shown.map((p) => (
              <Card key={p.slug} project={p} />
            ))}
          </div>

          <div className="flex w-full justify-center">
            <a
              href={links.seeMoreWork}
              className="relative flex h-12 items-center justify-center overflow-hidden rounded-3xl border border-[#94bdff] bg-[#121212] px-6 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] transition-[box-shadow,filter] duration-200 ease-out hover:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2),0px_8px_24px_0px_rgba(11,36,71,0.14)] hover:brightness-125 active:brightness-100"
            >
              <span className="relative text-[16px] leading-none font-medium whitespace-nowrap text-white">See more</span>
              <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-4px_4px_0px_rgba(148,189,255,0.8)]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
