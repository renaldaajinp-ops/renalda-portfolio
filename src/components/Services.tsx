/* eslint-disable @next/next/no-img-element */
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const SERVICES = [
  { icon: "website", title: "Website", body: "Fast, responsive sites that tell your story and turn visitors into leads." },
  { icon: "webapp", title: "Web App or Dashboard", body: "Dense data and complex workflows shaped into calm, usable interfaces." },
  { icon: "mobile", title: "Mobile Apps", body: "iOS and Android apps that feel native, from first launch to daily use." },
  { icon: "motion", title: "Motion Design", body: "Interface animation and product motion that guide attention with intent." },
  { icon: "graphic", title: "Graphic Design", body: "Brand assets, social graphics, and print pieces in one consistent voice." },
  { icon: "marketing", title: "Marketing", body: "Campaign pages and ad creative built around a single, testable message." },
  { icon: "pitch", title: "Pitch Deck Design", body: "Investor decks with a sharp narrative, clear data, and confident slides." },
  { icon: "nocode", title: "No Code Development", body: "Production-ready Webflow and Framer builds your team can update freely." },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative flex flex-col overflow-hidden bg-[#f5f8fe] p-4 tab:p-6 lap:p-8 desk:p-16"
    >
      <img src="/svg/glow-left.svg" alt="" aria-hidden width={725} height={656} className="pointer-events-none absolute bottom-0 left-0 max-w-none" />
      <img src="/svg/glow-right.svg" alt="" aria-hidden width={420} height={422} className="pointer-events-none absolute top-0 right-0 max-w-none" />

      <div className="relative flex w-full flex-col gap-12 rounded-[32px] border border-[#eff6ff] bg-[rgba(255,255,255,0.7)] px-6 py-12 tab:gap-16 tab:p-11 lap:p-14 desk:gap-20 desk:p-20 wide:mx-auto wide:max-w-[1600px]">
        <Reveal className="flex w-full flex-col items-start gap-5">
          <Eyebrow>Our services</Eyebrow>
          <h2 className="w-full text-[28px] leading-[1.32] font-medium text-[#0a0a0a] [text-shadow:0px_10px_36px_rgba(5,31,71,0.16)] tab:text-[34px] lap:text-[36px] desk:text-[40px]">
            Crafting digital products where
            <br className="hidden tab:block" /> simplicity meets clarity and purpose
          </h2>
        </Reveal>
        <ul className="grid w-full grid-cols-1 gap-y-10 tab:grid-cols-2 tab:gap-x-8 tab:gap-y-12 lap:grid-cols-3 desk:gap-x-12 desk:gap-y-[52px]">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.icon} delay={(i % 3) * 70} className="group flex min-w-0 flex-col items-start gap-8">
              <span className="relative block size-20 shrink-0 transition-[translate] duration-[260ms] ease-out-soft motion-safe:group-hover:-translate-y-1">
                <img
                  src={`/svg/svc-${s.icon}.svg`}
                  alt=""
                  width={100}
                  height={116}
                  className="absolute top-[-9.6px] left-[-9.6px] block h-[116px] w-[100px] max-w-none"
                />
              </span>
              <div className="flex w-full flex-col gap-3">
                <h3 className="text-[20px] leading-none font-medium text-[#0e0f11]">{s.title}</h3>
                <p className="text-[16px] leading-[1.4] text-[#4f5051] tab:text-[18px]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
