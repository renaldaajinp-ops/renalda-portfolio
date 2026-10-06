/* eslint-disable @next/next/no-img-element */
import { links } from "@/lib/links";
import { Reveal } from "./Reveal";

const COLUMNS = [
  {
    heading: "Services",
    items: [
      ["Website", links.services],
      ["Web App & Dashboard", links.services],
      ["Mobile Apps", links.services],
      ["Motion Design", links.services],
      ["Graphic Design", links.services],
      ["Marketing", links.services],
      ["Pitch Deck Design", links.services],
      ["No Code Development", links.services],
    ],
  },
  {
    heading: "Studio",
    items: [
      ["About", links.about],
      ["Process", links.process],
      ["Testimonials", links.testimonials],
      ["FAQs", links.faq],
      ["Start a project", links.contact],
      ["Book a discovery call", links.contact],
    ],
  },
  {
    heading: "Legal",
    items: [
      ["Privacy policy", links.legal.privacy],
      ["Terms of service", links.legal.terms],
      ["Cookie policy", links.legal.cookies],
    ],
  },
] as const;

const SOCIAL = [
  { icon: "x", label: "X", href: links.social.x },
  { icon: "dribbble", label: "Dribbble", href: links.social.dribbble },
  { icon: "instagram", label: "Instagram", href: links.social.instagram },
  { icon: "behance", label: "Behance", href: links.social.behance },
  { icon: "linkedin", label: "LinkedIn", href: links.social.linkedin },
];

function Ornament() {
  return (
    <div aria-hidden className="flex w-full items-center gap-4">
      <span className="h-px min-w-px flex-[1_0_0] bg-[#eceff3]" />
      <span className="size-1 shrink-0 rounded-full bg-[#d3dae4]" />
      <span className="h-px min-w-px flex-[1_0_0] bg-[#eceff3]" />
      <img src="/svg/cloud-ornament.svg" alt="" width={96} height={20} className="h-5 w-24 shrink-0" />
      <span className="h-px min-w-px flex-[1_0_0] bg-[#eceff3]" />
      <span className="size-1 shrink-0 rounded-full bg-[#d3dae4]" />
      <span className="h-px min-w-px flex-[1_0_0] bg-[#eceff3]" />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative flex flex-col items-center bg-white pt-16 tab:pt-20 desk:pt-24">
      <Reveal className="flex w-full flex-col items-start gap-9 px-5 pb-14 tab:gap-10 tab:px-10 lap:px-12 desk:w-[1152px] desk:gap-12 desk:px-0">
        <div className="flex w-full flex-col items-start gap-4 desk:flex-row desk:items-center desk:justify-between">
          <div className="flex flex-col items-start gap-3 tab:flex-row tab:items-center tab:gap-5">
            <a href={links.home} className="flex items-center gap-3">
              <span className="relative block size-10 shrink-0">
                <img
                  src="/svg/footer-logo.svg"
                  alt=""
                  width={74}
                  height={74}
                  className="absolute top-[-9px] left-[-17px] block size-[74px] max-w-none"
                />
              </span>
              <span className="text-[24px] leading-normal font-medium whitespace-nowrap text-[#0a0a0a]">Dekstive Studio</span>
            </a>
            <span className="hidden h-6 w-px shrink-0 bg-[#e5e7eb] tab:block" />
            <p className="text-[16px] leading-[22px] whitespace-nowrap text-[#4f5051]">Independent design studio © 2026</p>
          </div>
          <p className="text-[16px] leading-[22px] font-medium text-[#0a0a0a] desk:whitespace-nowrap">
            Product, web, and motion design from first concept to launch.
          </p>
        </div>

        <Ornament />

        <div className="flex w-full flex-col items-start gap-9 tab:gap-10 desk:flex-row desk:gap-12">
          <div className="flex w-full flex-col items-start gap-6 desk:min-w-px desk:flex-[1_0_0] desk:justify-between desk:self-stretch">
            <a
              href={links.emailHref}
              className="group flex items-center gap-2.5 rounded-full border border-[#e5e7eb] bg-white px-3.5 py-2.5 drop-shadow-[0px_4px_5px_rgba(15,15,41,0.04)] transition-[border-color,scale] duration-200 ease-out-soft hover:border-[#d4d8de] active:scale-[0.98]"
            >
              <img src="/svg/mail.svg" alt="" width={20} height={20} className="size-5 shrink-0" />
              <span className="text-[16px] leading-[22px] font-medium whitespace-nowrap text-[#0a0a0a]">{links.email}</span>
              <img
                src="/svg/chevron.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </a>
            <div className="flex items-center gap-5">
              {SOCIAL.map((s, i) => (
                <span key={s.icon} className="flex items-center gap-5">
                  {i > 0 && <span className="h-6 w-px bg-[#e5e7eb]" />}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="opacity-100 transition-[opacity,translate,scale] duration-200 ease-out-soft hover:opacity-70 motion-safe:hover:-translate-y-0.5 active:scale-95"
                  >
                    <img src={`/svg/${s.icon}.svg`} alt="" width={24} height={24} className="size-6" />
                  </a>
                </span>
              ))}
            </div>
          </div>
          <nav
            aria-label="Footer"
            className="grid w-full grid-cols-2 gap-x-6 gap-y-8 text-[16px] leading-[22px] tab:flex tab:w-auto tab:items-start tab:gap-10"
          >
            {COLUMNS.map((col) => (
              <div key={col.heading} className="flex min-w-0 flex-col items-start gap-5 tab:w-[208px]">
                <p className="font-medium text-[#0a0a0a]">{col.heading}</p>
                <ul className="flex flex-col items-start gap-3.5 text-[#4f5051]">
                  {col.items.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="whitespace-nowrap transition-colors duration-200 hover:text-[#0a0a0a]">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Ornament />

        <p className="w-full text-[14px] leading-[22px] text-[#8a8a90]">
          Dekstive Studio is the independent design practice of Renalda Aji, based in Indonesia (GMT+7). Client names, logos, and
          trademarks shown on this site belong to their respective owners and appear for portfolio purposes only.
        </p>
      </Reveal>

      {/* Footer Sky */}
      <div
        aria-hidden
        className="relative h-[200px] w-full overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(180deg, #fff 0%, rgb(243,247,253) 30%, rgb(217,230,248) 70%, rgb(188,210,241) 100%)",
        }}
      >
        {/* Cloud banks keep their natural size (Figma frames use the same pixels at every width). */}
        <img src="/hero/distant-bank.webp" alt="" width={906} height={85} className="absolute bottom-[7px] left-1/2 h-[85px] w-[906px] max-w-none -translate-x-1/2 opacity-90" />
        <img src="/footer/left-bank.webp" alt="" width={322} height={165} className="absolute bottom-[-43px] left-[-36px] h-[165px] w-[322px] max-w-none" />
        <img src="/footer/right-bank.webp" alt="" width={300} height={148} className="absolute right-[-30px] bottom-[-32px] h-[148px] w-[300px] max-w-none" />
        <img src="/footer/low-centre.webp" alt="" width={486} height={74} className="absolute bottom-[-12px] left-1/2 h-[74px] w-[486px] max-w-none -translate-x-1/2" />
        <div className="absolute right-0 bottom-0 left-0 h-[70px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.85)]" />
      </div>
    </footer>
  );
}
