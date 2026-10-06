import { readFileSync } from "node:fs";
import path from "node:path";
import { Eyebrow } from "./Eyebrow";
import { ProcessSteps, type Step } from "./ProcessSteps";
import { Reveal } from "./Reveal";

const STEPS: Omit<Step, "visual">[] = [
  {
    title: "Discover & Brief Discussion",
    body: "A kickoff call to map your goals, audience, and constraints, then a written brief we both sign off on.",
  },
  {
    title: "Communication & Feedback",
    body: "Weekly check-ins and async reviews keep you close to the work, with feedback pinned right on the designs.",
  },
  {
    title: "Design Interaction & Motion",
    body: "Hover states, transitions, and motion defined screen by screen, so every tap and swipe feels intentional.",
  },
  { title: "Start Working Project", body: "Scope locked, milestones set, and the first design sprint underway." },
  { title: "Design Prototype", body: "Clickable prototypes let you test real flows before any code is written." },
  { title: "Delivery & Launch", body: "Dev-ready files, a clean handoff, and hands-on support through go-live." },
];

// The six window states are Figma's own Process=01…06 variants, exported as SVG and inlined so
// their text uses the page fonts.
function loadVisual(i: number) {
  const svg = readFileSync(path.join(process.cwd(), "public/process", `proc-${i + 1}.svg`), "utf8");
  return svg.replace('width="572" height="541"', 'width="100%" height="100%" aria-hidden="true"');
}

export function Process() {
  const steps: Step[] = STEPS.map((s, i) => ({ ...s, visual: loadVisual(i) }));
  return (
    <section
      id="process"
      className="relative flex flex-col items-center gap-12 overflow-hidden bg-white px-5 py-18 tab:gap-16 tab:px-10 tab:py-22 lap:px-12 desk:gap-20 desk:px-20 desk:py-24"
    >
      {/* Background pattern: #60A5FA dot grid (2.25px dots, 23.25px pitch) under a radial alpha mask. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 left-1/2 h-[1080px] w-[1440px] -translate-x-1/2"
        style={{
          backgroundImage: "radial-gradient(circle at 1.125px 1.125px, #60a5fa 1.125px, transparent 1.25px)",
          backgroundSize: "23.25px 23.25px",
          maskImage: "radial-gradient(circle 540px at 50% 50%, #000 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 540px at 50% 50%, #000 0%, transparent 100%)",
        }}
      />
      <Reveal className="relative flex w-full flex-col items-center gap-5">
        <Eyebrow size={16}>our PROCESS</Eyebrow>
        <h2 className="w-full text-center text-[28px] leading-[1.32] font-medium text-[#0a0a0a] [text-shadow:0px_10px_36px_rgba(5,31,71,0.16)] tab:text-[34px] lap:text-[36px] desk:w-[800px] desk:text-[40px]">
          Crafting digital products where <br className="hidden tab:block" />
          simplicity meets clarity and purpose
        </h2>
      </Reveal>
      <ProcessSteps steps={steps} />
    </section>
  );
}
