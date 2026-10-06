/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type Testimonial = { avatar: string; name: string; role: string; quote: string; tags: [string, string] };

const ROW_1: Testimonial[] = [
  {
    avatar: "laura-perez",
    name: "Laura Perez",
    role: "COO, Haven Freight",
    quote: "Thousands of shipments now read at a glance. Our ops team made the new dashboard their homepage.",
    tags: ["DASHBOARD", "DATA VIZ"],
  },
  {
    avatar: "sophia-williams",
    name: "Sophia Williams",
    role: "Head of Product, Kinfolk",
    quote: "Our booking app went from confusing to calm. Members now sign up without asking for help.",
    tags: ["MOBILE APP", "UX DESIGN"],
  },
  {
    avatar: "arthur-taylor",
    name: "Arthur Taylor",
    role: "Founder, Tallow & Co.",
    quote: "The new site finally looks like the company we have become, and the inbound leads show it.",
    tags: ["WEBSITE", "BRANDING"],
  },
  {
    avatar: "matthew-johnson",
    name: "Matthew Johnson",
    role: "CEO, Orbitry",
    quote: "Renalda rebuilt our pitch deck in ten days. A complex product suddenly made sense to investors.",
    tags: ["PITCH DECK", "STORY"],
  },
];

const ROW_2: Testimonial[] = [
  {
    avatar: "james-brown",
    name: "James Brown",
    role: "Co-founder, Ledgerly",
    quote: "Renalda turned a messy brief into a clear, shippable dashboard our team actually enjoys using.",
    tags: ["WEB APP", "DASHBOARD"],
  },
  {
    avatar: "emma-wright",
    name: "Emma Wright",
    role: "Marketing Lead, Brightloop",
    quote: "Weekly check-ins, honest feedback, no surprises. Every milestone landed right on time.",
    tags: ["LANDING PAGE", "MOTION"],
  },
  {
    avatar: "juma-omondi",
    name: "Juma Omondi",
    role: "Founder, Mavuno Farms",
    quote: "Our Framer site launched in three weeks, and the team updates it without waiting on a developer.",
    tags: ["WEBSITE", "FRAMER"],
  },
  {
    avatar: "lena-muller",
    name: "Lena Müller",
    role: "Founder, Atelier Nord",
    quote: "Thoughtful, fast, and calm under pressure. It felt like having a senior designer on the team.",
    tags: ["BRAND", "WEBSITE"],
  },
  {
    avatar: "ravi-patel",
    name: "Ravi Patel",
    role: "CTO, Stackwise",
    quote: "The cleanest handoff we have had: every state, spacing rule, and edge case documented for our devs.",
    tags: ["WEB APP", "HANDOFF"],
  },
];

function Card({ t, hidden }: { t: Testimonial; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="flex h-[260px] w-[360px] shrink-0 flex-col gap-5 overflow-hidden rounded-[20px] border border-transparent bg-white px-2 pt-5 pb-2 shadow-[0px_0px_0px_0.5px_rgba(17,22,57,0.12),0px_6px_16px_-4px_rgba(3,7,18,0.08)]"
    >
      <figcaption className="flex w-full items-end gap-3 pr-12 pl-2">
        <img
          src={`/avatars/${t.avatar}.webp`}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-[20px] object-cover"
        />
        <span className="flex min-w-px flex-[1_0_0] flex-col gap-1.5 font-medium">
          <span className="text-[14px] leading-none tracking-[-0.042px] text-[#4f5051]">{t.role}</span>
          <span className="text-[20px] leading-none text-[#0a0a0a]">{t.name}</span>
        </span>
      </figcaption>
      <blockquote className="flex min-h-px w-full flex-[1_0_0] flex-col items-start justify-between overflow-hidden rounded-xl border border-white bg-[#fafafa] p-4 font-medium shadow-[0px_3px_6px_-1px_rgba(0,0,0,0.04),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_0.5px_0.5px_0px_rgba(0,0,0,0.06),0px_1px_2px_-2px_rgba(38,45,58,0.08),0px_0px_0px_1px_rgba(0,0,0,0.05)]">
        <p className="text-[18px] leading-[1.36] text-[#171717]">“{t.quote}”</p>
        <p className="flex items-center gap-2 text-[12px] leading-none whitespace-nowrap">
          <span className="text-[#4f5051]">PROJECT</span>
          <span className="text-[#4f5051]">/</span>
          <span className="text-[#3b82f6]">{t.tags[0]}</span>
          <span className="text-[#4f5051]">/</span>
          <span className="text-[#3b82f6]">{t.tags[1]}</span>
        </p>
      </blockquote>
    </figure>
  );
}

// Each track is rendered twice so the -50% translate loops seamlessly.
function Row({ items, direction, offset, duration }: { items: Testimonial[]; direction: "left" | "right"; offset: number; duration: string }) {
  return (
    <div className="relative h-[260px] w-full shrink-0 overflow-hidden">
      <div className="absolute top-0 flex" style={{ left: offset }}>
        <div
          className={`flex gap-5 ${direction === "left" ? "marquee-left" : "marquee-right"}`}
          style={{ "--marquee-duration": duration } as CSSProperties}
        >
          {[...items, ...items].map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} hidden={i >= items.length} />
          ))}
          {/* trailing gap so both halves are equal width */}
          <span aria-hidden className="w-0 shrink-0" />
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-white">
      <div className="flex w-full items-center overflow-hidden border-y border-[#e5e7eb] tab:px-6 lap:px-8 desk:px-[78px] wide:px-[calc((100%-1284px)/2)]">
        <div className="flex min-w-px flex-[1_0_0] flex-col items-start gap-12 overflow-hidden bg-white pt-16 pb-12 tab:border-x tab:border-[#e5e7eb] lap:gap-16 lap:pt-18 lap:pb-14 desk:gap-20 desk:pt-20 desk:pb-16">
          <Reveal className="flex w-full flex-col items-start gap-5 px-5 tab:px-6 lap:px-8 desk:px-30">
            <Eyebrow size={16}>Testimonial</Eyebrow>
            <h2 className="w-full text-[28px] leading-[1.3] font-medium text-[#0a0a0a] [text-shadow:0px_10px_36px_rgba(5,31,71,0.16)] tab:text-[34px] lap:text-[36px] desk:text-[40px]">
              Trusted by founders to deliver clarity, <br className="hidden desk:block" />
              elevate product quality, and turn vision <br className="hidden desk:block" />
              into impactful digital experiences.
            </h2>
          </Reveal>
          <Reveal
            delay={80}
            className="marquee flex w-full flex-col items-start gap-5 overflow-hidden border-y border-[#e5e7eb] bg-white py-8"
          >
            <Row items={ROW_1} direction="left" offset={-148} duration="48s" />
            <Row items={ROW_2} direction="right" offset={-30} duration="56s" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
