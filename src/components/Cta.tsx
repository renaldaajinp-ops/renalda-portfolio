/* eslint-disable @next/next/no-img-element */
import { links } from "@/lib/links";
import { ChatWindow } from "./ChatWindow";
import { CopyEmail } from "./CopyEmail";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function Cta() {
  return (
    <section id="contact" className="relative flex flex-col overflow-hidden bg-[#f5f8fe] p-4 lap:p-8 desk:p-16">
      <img src="/svg/glow-left.svg" alt="" aria-hidden width={725} height={656} className="pointer-events-none absolute bottom-0 left-0 max-w-none" />
      <img src="/svg/glow-right.svg" alt="" aria-hidden width={420} height={422} className="pointer-events-none absolute top-0 right-0 max-w-none" />

      <div className="relative flex w-full flex-col items-center gap-10 overflow-hidden rounded-[32px] border border-[#eff6ff] bg-[rgba(255,255,255,0.7)] px-6 pt-10 pb-[17px] tab:gap-14 tab:px-12 tab:pt-14 desk:flex-row desk:items-start desk:justify-between desk:px-16 desk:pt-16 wide:mx-auto wide:max-w-[1600px]">
        <Reveal className="flex w-full flex-col items-start gap-10 tab:gap-12 desk:h-[450px] desk:w-auto desk:justify-between desk:gap-0">
          <div className="flex w-full flex-col items-start gap-5 desk:w-[463px]">
            <Eyebrow>Contact</Eyebrow>
            <div className="flex w-full flex-col items-start gap-3">
              <h2 className="w-full text-[28px] leading-[1.32] font-medium text-[#0a0a0a] [text-shadow:0px_10px_36px_rgba(5,31,71,0.16)] tab:text-[34px] lap:text-[36px] desk:text-[40px]">
                Have a product
                <br />
                worth designing?
              </h2>
              <p className="w-full text-[18px] leading-[1.4] text-[#878787] tab:text-[20px] desk:tracking-[-0.035em]">
                Tell me what you’re building, what you need, and where <br className="hidden tab:block desk:hidden" />
                you want to take it. I’d love to hear about the project.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <p className="text-[12px] leading-none font-medium whitespace-nowrap text-[#999]">EMAIL</p>
            <div className="flex w-full flex-col items-start gap-3 tab:w-auto tab:flex-row tab:items-center">
              <CopyEmail />
              <a
                href={links.emailHref}
                className="relative flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-[#94bdff] bg-[#121212] px-6 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] transition-[box-shadow,filter] duration-200 ease-out hover:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2),0px_8px_24px_0px_rgba(11,36,71,0.14)] hover:brightness-125 active:brightness-100"
              >
                <span className="relative text-[16px] leading-none font-medium whitespace-nowrap text-white">Let&apos;s connect</span>
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-4px_4px_0px_rgba(148,189,255,0.8)]" />
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ChatWindow />
        </Reveal>
      </div>
    </section>
  );
}
