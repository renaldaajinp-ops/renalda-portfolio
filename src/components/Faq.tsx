"use client";

import { useId, useState } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "What kind of projects do you work on?",
    a: "SaaS platforms, web apps, dashboards, websites, mobile apps, company profiles, and motion, from early concepts and MVPs to redesigns of products already in use.",
  },
  {
    q: "How does a typical project work?",
    a: "We start with a discovery call and a written brief, then move through wireframes, visual design, and a clickable prototype, with weekly check-ins until handoff.",
  },
  {
    q: "How long does a project usually take?",
    a: "Most websites take 3 to 5 weeks, and web apps or dashboards 6 to 12 weeks. You get a timeline with clear milestones before we begin.",
  },
  {
    q: "How much does a project cost?",
    a: "Every project is quoted after the discovery call, based on scope and timeline. Pricing is fixed per milestone, so you always know what you are paying for.",
  },
  {
    q: "Do you also handle development?",
    a: "Yes. I build marketing sites in Framer or Webflow, and for products I deliver dev-ready Figma files and specs, then support your engineers through launch.",
  },
  {
    q: "Can we work together from a different time zone?",
    a: "Of course. I am based in Indonesia (GMT+7) and work with teams worldwide through async updates and one weekly call scheduled at a time that suits you.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes 30 days of post-launch support for fixes and small tweaks. After that, many clients keep working with me on a monthly retainer.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white shadow-[0px_0px_0px_0.5px_rgba(17,22,57,0.12),0px_6px_16px_-4px_rgba(3,7,18,0.08)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="group flex w-full cursor-pointer items-center gap-4 py-6 pr-4 pl-5 text-left tab:gap-14 tab:p-6"
      >
        <span className="flex min-w-px flex-[1_0_0] flex-col">
          <span className="text-[18px] leading-none font-medium text-[#0a090b] tab:text-[20px]">{q}</span>
          <span
            id={id}
            className={`grid transition-[grid-template-rows,opacity] duration-[360ms] ease-out-soft ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <span className="overflow-hidden">
              <span
                className={`block pt-2 text-[16px] leading-[22px] tracking-[-0.18px] text-[#4f5051] transition-[translate] duration-[360ms] ease-out-soft ${
                  open ? "translate-y-0" : "motion-safe:-translate-y-1"
                }`}
              >
                {a}
              </span>
            </span>
          </span>
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 transition-[scale] duration-200 ease-out-soft group-active:scale-95 shadow-[0px_2.222px_2.222px_0px_rgba(38,45,58,0.08),0px_2.222px_2.222px_-1.667px_rgba(38,45,58,0.08),0px_0px_0px_1.111px_rgba(0,0,0,0.05)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 11H6a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2Z" fill="#676D6D" />
            <path
              d="M13 6a1 1 0 1 0-2 0v12a1 1 0 1 0 2 0V6Z"
              fill="#676D6D"
              className={`origin-center transition-transform duration-[360ms] ease-out-soft ${open ? "scale-y-0" : "scale-y-100"}`}
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export function Faq() {
  // Figma shows the first question open by default.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-12 tab:py-16 desk:py-20">
      <div className="flex w-full flex-col overflow-hidden border-y border-[#e5e7eb] bg-white tab:px-6 lap:px-8 desk:px-[78px] wide:px-[calc((100%-1284px)/2)]">
        <div className="w-full border-[#e5e7eb] bg-white tab:border-x">
          <div className="relative flex w-full flex-col items-center gap-12 overflow-hidden px-5 py-16 tab:gap-16 tab:px-8 tab:py-18 desk:gap-20 desk:px-0 desk:py-20">
            {/* Dot grid: 2px round dots on a 20px pitch at 12% of #11100F. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 10px 10px, rgba(17,16,15,0.12) 1px, transparent 1.25px)",
                backgroundSize: "20px 20px",
                backgroundPosition: "-10px -22px",
              }}
            />
            <Reveal className="relative flex w-full flex-col items-center gap-5 desk:w-[800px]">
              <Eyebrow size={16}>FAQs</Eyebrow>
              <h2 className="w-full text-center text-[28px] leading-none font-medium text-[#0a0a0a] [text-shadow:0px_10px_36px_rgba(5,31,71,0.16)] tab:text-[34px] lap:text-[36px] desk:text-[40px]">
                Frequently asked questions.
              </h2>
            </Reveal>
            <div className="relative flex w-full flex-col items-center gap-[52px] lap:w-[800px]">
              <div className="flex w-full flex-col items-start gap-4">
                {FAQS.map((f, i) => (
                  <Reveal key={f.q} delay={Math.min(i, 4) * 50} className="w-full">
                    <FaqItem q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
                  </Reveal>
                ))}
              </div>
              <p className="w-full text-center text-[20px] leading-[1.3] text-[#878787] tab:w-[600px]">
                Our work spans mobile apps, web apps or dashboards, websites, animation, and development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
