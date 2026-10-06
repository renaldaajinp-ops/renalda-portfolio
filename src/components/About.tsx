/* eslint-disable @next/next/no-img-element */
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center gap-14 bg-white px-5 pt-18 pb-22 text-center tab:gap-18 tab:px-10 tab:pt-22 tab:pb-26 desk:gap-20 desk:px-20 desk:pt-24 desk:pb-30 wide:px-56"
    >
      <Reveal className="flex w-full flex-col items-center gap-10 desk:w-[900px]">
        <Eyebrow size={16}>About us</Eyebrow>
        <p className="w-full text-[26px] leading-[1.3] text-[#0a0a0a] tab:text-[32px] lap:text-[36px] desk:text-[40px]">
          Dekstive Studio is my independent design studio,{" "}
          <span className="text-[#939393]">
            providing end-to-end solutions across digital
            <br />
            design, motion, and creative direction.
          </span>
        </p>
      </Reveal>
      {/* Logo card: the SVG includes the card's outer shadows, so it bleeds past the 160/120 box. */}
      <Reveal delay={80} className="relative size-30 shrink-0 tab:size-40">
        <img
          src="/svg/about-logo.svg"
          alt="Dekstive Studio logo"
          width={296}
          height={296}
          className="absolute top-[-22.5%] left-[-42.5%] block size-[185%] max-w-none"
        />
      </Reveal>
      <Reveal
        delay={120}
        className="flex w-full flex-col items-center gap-10 text-[19px] leading-[1.3] text-[#939393] tab:w-[600px] tab:text-[24px] lap:text-[26px] desk:text-[28px] desk:tracking-[-0.03em]"
      >
        <p className="w-full">Our work spans mobile apps, web apps or dashboards, websites, animation, and development.</p>
        <p className="w-full">
          With six years of experience designing SaaS platforms and digital products, I take projects from the first
          concept through to a launched product.
        </p>
      </Reveal>
    </section>
  );
}
