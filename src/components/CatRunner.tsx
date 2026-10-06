"use client";

/* eslint-disable @next/next/no-img-element */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

/*
 * Cat Runner follows Figma's prototype (component set "Cat Runner", 2113:4015) step for step:
 * Start → Ready 1 → (jump) Rise 1 → Land 1 → Ready 2 … Land 7 → Level Clear → Start.
 * Each step stores the frame's positions; the screen tweens between them with the
 * prototype's smart-animate durations and easings. Ready / Start / Level Clear wait for
 * Space, ↑, → or a click; Rise and Land advance on their own.
 */

type Pose = "a" | "b" | "jump";
type Step = {
  name: string;
  world: number; // World group x
  clouds: number; // Parallax Clouds x
  bank: number; // Parallax Far Bank x
  bug: number; // walking bug x (screen space)
  catY: number;
  pose: Pose;
  score: string;
  coins: number;
  time: number;
  /** Transition INTO the next step. */
  next: { ms: number; ease: string; auto: boolean };
};

const LINEAR = "linear";
const RISE = "cubic-bezier(0.2, 0.6, 0.35, 1)";
const FALL = "cubic-bezier(0.55, 0, 0.8, 0.45)";

const jump = { ms: 340, ease: RISE, auto: false };
const fall = { ms: 300, ease: FALL, auto: true };
const run = (ms: number) => ({ ms, ease: LINEAR, auto: true });

const STEPS: Step[] = [
  { name: "Start", world: 0, clouds: 0, bank: 0, bug: 3240, catY: 414, pose: "a", score: "000000", coins: 0, time: 300, next: { ms: 670, ease: LINEAR, auto: false } },
  { name: "Ready 1", world: -350, clouds: -87, bank: -175, bug: 2890, catY: 414, pose: "a", score: "000000", coins: 0, time: 294, next: jump },
  { name: "Rise 1", world: -496, clouds: -124, bank: -248, bug: 2744, catY: 230, pose: "jump", score: "000000", coins: 1, time: 294, next: fall },
  { name: "Land 1", world: -612, clouds: -153, bank: -306, bug: 2628, catY: 414, pose: "a", score: "000300", coins: 1, time: 292, next: run(570) },
  { name: "Ready 2", world: -910, clouds: -227, bank: -455, bug: 2330, catY: 414, pose: "b", score: "000300", coins: 1, time: 286, next: jump },
  { name: "Rise 2", world: -1080, clouds: -270, bank: -540, bug: 2160, catY: 230, pose: "jump", score: "000300", coins: 1, time: 286, next: fall },
  { name: "Land 2", world: -1220, clouds: -305, bank: -610, bug: 2020, catY: 414, pose: "a", score: "000500", coins: 1, time: 284, next: run(480) },
  { name: "Ready 3", world: -1470, clouds: -367, bank: -735, bug: 1770, catY: 414, pose: "a", score: "000500", coins: 1, time: 278, next: jump },
  { name: "Rise 3", world: -1608, clouds: -402, bank: -804, bug: 1632, catY: 230, pose: "jump", score: "000500", coins: 2, time: 278, next: fall },
  { name: "Land 3", world: -1716, clouds: -429, bank: -858, bug: 1524, catY: 414, pose: "a", score: "000800", coins: 2, time: 276, next: run(600) },
  { name: "Ready 4", world: -2030, clouds: -507, bank: -1015, bug: 1210, catY: 414, pose: "b", score: "000800", coins: 2, time: 270, next: jump },
  { name: "Rise 4", world: -2176, clouds: -544, bank: -1088, bug: 1064, catY: 230, pose: "jump", score: "000800", coins: 3, time: 270, next: fall },
  { name: "Land 4", world: -2292, clouds: -573, bank: -1146, bug: 948, catY: 414, pose: "a", score: "001100", coins: 3, time: 268, next: run(570) },
  { name: "Ready 5", world: -2590, clouds: -647, bank: -1295, bug: 350, catY: 414, pose: "a", score: "001100", coins: 3, time: 262, next: jump },
  { name: "Rise 5", world: -2732, clouds: -683, bank: -1366, bug: 168, catY: 230, pose: "jump", score: "001100", coins: 3, time: 262, next: fall },
  { name: "Land 5", world: -2844, clouds: -711, bank: -1422, bug: 16, catY: 414, pose: "a", score: "001300", coins: 3, time: 260, next: run(590) },
  { name: "Ready 6", world: -3150, clouds: -787, bank: -1575, bug: -510, catY: 414, pose: "b", score: "001300", coins: 3, time: 254, next: jump },
  { name: "Rise 6", world: -3288, clouds: -822, bank: -1644, bug: -648, catY: 230, pose: "jump", score: "001300", coins: 4, time: 254, next: fall },
  { name: "Land 6", world: -3396, clouds: -849, bank: -1698, bug: -756, catY: 414, pose: "a", score: "001600", coins: 4, time: 252, next: run(600) },
  { name: "Ready 7", world: -3710, clouds: -927, bank: -1855, bug: -1070, catY: 414, pose: "a", score: "001600", coins: 4, time: 246, next: jump },
  { name: "Rise 7", world: -3890, clouds: -972, bank: -1945, bug: -1250, catY: 230, pose: "jump", score: "001600", coins: 4, time: 246, next: fall },
  { name: "Land 7", world: -4040, clouds: -1010, bank: -2020, bug: -1400, catY: 414, pose: "a", score: "001800", coins: 4, time: 244, next: run(630) },
  { name: "Level Clear", world: -4369, clouds: -1092, bank: -2184, bug: -1729, catY: 414, pose: "a", score: "002800", coins: 4, time: 240, next: { ms: 350, ease: "ease-out", auto: false } },
];

// Coins in world space; each is collected on the rise that passes it.
const COINS = [
  { x: 722, y: 262, takenAt: 2 },
  { x: 1834, y: 262, takenAt: 8 },
  { x: 2402, y: 240, takenAt: 11 },
  { x: 3514, y: 240, takenAt: 17 },
];

const SKY_CLOUDS = [
  { x: 90, y: 120, big: true },
  { x: 420, y: 70, big: false },
  { x: 700, y: 150, big: true },
  { x: 1020, y: 96, big: false },
  { x: 1330, y: 140, big: true },
  { x: 1650, y: 80, big: false },
  { x: 1960, y: 130, big: true },
  { x: 2250, y: 90, big: false },
];

const QUESTION_BLOCKS = [
  { x: 1020, y: 330 },
  { x: 2700, y: 320 },
  { x: 3880, y: 330 },
];

const OVERLAY_TITLE = "absolute left-[528px] -translate-x-1/2 font-pixel text-[40px] leading-normal whitespace-nowrap text-white [text-shadow:4px_4px_0px_rgba(30,58,138,0.7)]";
const OVERLAY_HINT = "absolute left-[528px] -translate-x-1/2 text-center font-pixel text-[16px] leading-7 whitespace-nowrap text-white [text-shadow:2px_2px_0px_rgba(30,58,138,0.55)]";

export type CatRunnerHandle = { press: () => void };

export const CatRunner = forwardRef<CatRunnerHandle, { onKeyState?: (key: string | null) => void }>(function CatRunner(
  { onKeyState },
  ref,
) {
  const [i, setI] = useState(0);
  const [moving, setMoving] = useState(false);
  // Which transition is currently playing (the one that led INTO step i).
  const [tween, setTween] = useState({ ms: 0, ease: LINEAR });
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((from: number) => {
    const t = STEPS[from].next;
    const to = from === STEPS.length - 1 ? 0 : from + 1;
    busy.current = true;
    setMoving(true);
    // Level Clear → Start is a dissolve in Figma, so the world snaps back without tweening.
    setTween(to === 0 ? { ms: 0, ease: LINEAR } : { ms: t.ms, ease: t.ease });
    setI(to);
    timer.current = setTimeout(() => {
      busy.current = false;
      setMoving(false);
      if (STEPS[to].next.auto) go(to);
    }, t.ms);
  }, []);

  const press = useCallback(() => {
    if (busy.current) return;
    if (STEPS[i].next.auto) return;
    go(i);
  }, [i, go]);

  useImperativeHandle(ref, () => ({ press }), [press]);
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const s = STEPS[i];
  const transition = `transform ${tween.ms}ms ${tween.ease}, left ${tween.ms}ms ${tween.ease}, top ${tween.ms}ms ${tween.ease}`;
  const showTitle = s.name === "Start";
  const showJumpHint = s.name === "Ready 1";
  const showClear = s.name === "Level Clear";
  // Run cycle: alternate the two run poses while the world scrolls on the ground.
  const pose: Pose = s.pose === "jump" ? "jump" : moving && s.catY === 414 ? (i % 2 ? "b" : "a") : s.pose;

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      onKeyState?.(e.key);
      press();
    }
  }

  return (
    <button
      type="button"
      onClick={press}
      onKeyDown={onKeyDown}
      onKeyUp={() => onKeyState?.(null)}
      onBlur={() => onKeyState?.(null)}
      aria-label={`Cat Runner mini game. ${showClear ? "Level clear." : ""} Score ${s.score}, coins ${s.coins}. Press Space, Up or Right, or click, to ${s.name === "Start" ? "start" : showClear ? "play again" : "jump"}.`}
      className="absolute top-[10px] left-[10px] block h-[594px] w-[1056px] cursor-pointer overflow-hidden rounded-[4px] bg-gradient-to-b from-[#2f74f0] via-[#7db2fa] via-[72%] to-[#bfdbfe] outline-none focus-visible:ring-4 focus-visible:ring-[#94bdff]"
    >
      {/* Parallax Clouds */}
      <div className="absolute top-0 left-0 h-[594px] w-[2400px]" style={{ transform: `translateX(${s.clouds}px)`, transition }}>
        {SKY_CLOUDS.map((c) => (
          <img
            key={c.x}
            src={c.big ? "/game/sky-cloud-1.svg" : "/game/sky-cloud-2.svg"}
            alt=""
            width={c.big ? 84 : 70}
            height={c.big ? 30 : 25}
            className="absolute max-w-none"
            style={{ left: c.x, top: c.y }}
          />
        ))}
      </div>
      {/* Parallax Far Bank */}
      <div className="absolute top-0 left-0 h-[594px] w-[3400px]" style={{ transform: `translateX(${s.bank}px)`, transition }}>
        {[40, 600, 1160, 1720, 2280, 2840].map((x) => (
          <img key={x} src="/game/far-cloud.svg" alt="" width={240} height={32} className="absolute top-[452px] max-w-none" style={{ left: x }} />
        ))}
      </div>
      {/* World */}
      <div className="absolute top-0 left-0 h-[594px] w-[6200px]" style={{ transform: `translateX(${s.world}px)`, transition }}>
        <img src="/game/platform-1.png" alt="" width={1264} height={112} className="absolute top-[476px] left-0 max-w-none" />
        <img src="/game/platform-2.png" alt="" width={2680} height={112} className="absolute top-[476px] left-[1380px] max-w-none" />
        <img src="/game/platform-3.png" alt="" width={1000} height={112} className="absolute top-[476px] left-[4200px] max-w-none" />
        <img src="/game/platform-3-ext.png" alt="" width={1000} height={112} className="absolute top-[476px] left-[5200px] max-w-none" />
        <img src="/game/pipe.svg" alt="" width={72} height={88} className="absolute top-[396px] left-[700px] max-w-none" />
        <img src="/game/crate.svg" alt="" width={56} height={56} className="absolute top-[428px] left-[1820px] max-w-none" />
        <img src="/game/tall-pipe.svg" alt="" width={72} height={136} className="absolute top-[348px] left-[2380px] max-w-none" />
        <img src="/game/crate.svg" alt="" width={56} height={56} className="absolute top-[372px] left-[3500px] max-w-none" />
        <img src="/game/crate.svg" alt="" width={56} height={56} className="absolute top-[428px] left-[3500px] max-w-none" />
        {COINS.map((c) => (
          <img
            key={c.x}
            src="/game/coin.svg"
            alt=""
            width={28}
            height={32}
            className="absolute max-w-none transition-[opacity,translate] duration-300 ease-out"
            style={{
              left: c.x,
              top: c.y,
              opacity: i >= c.takenAt ? 0 : 1,
              translate: i >= c.takenAt ? "0 -16px" : "0 0",
            }}
          />
        ))}
        {QUESTION_BLOCKS.map((b) => (
          <span
            key={b.x}
            className="absolute size-10 overflow-hidden border-3 border-[#1e3a8a] bg-[#3b82f6] shadow-[inset_-3px_-3px_0px_0px_#1d4ed8,inset_3px_3px_0px_0px_#93c5fd]"
            style={{ left: b.x, top: b.y }}
          >
            <span className="absolute top-[9px] left-[9px] font-pixel text-[16px] leading-normal text-white">?</span>
          </span>
        ))}
        <img src="/game/goal-flag.svg" alt="" width={64} height={248} className="absolute top-[236px] left-[4640px] max-w-none" />
      </div>
      {/* Walking bug (moves faster than the world) */}
      <img
        src="/game/bug.svg"
        alt=""
        width={64}
        height={48}
        className="absolute top-[436px] max-w-none"
        style={{ left: s.bug, transition }}
      />
      {/* Cat */}
      <div className="absolute left-[200px] h-[70px] w-[80px]" style={{ top: s.catY, transition }}>
        <img src="/game/cat-run-a.svg" alt="" width={80} height={70} className={`absolute inset-0 ${pose === "a" ? "" : "invisible"}`} />
        <img src="/game/cat-run-b.svg" alt="" width={80} height={70} className={`absolute inset-0 ${pose === "b" ? "" : "invisible"}`} />
        <img src="/game/cat-jump.svg" alt="" width={80} height={70} className={`absolute inset-0 ${pose === "jump" ? "" : "invisible"}`} />
      </div>
      {/* HUD */}
      <div className="absolute top-8 left-9 flex h-10 w-[984px] items-start justify-between overflow-hidden font-pixel text-[12px] leading-normal whitespace-nowrap text-white [text-shadow:2px_2px_0px_rgba(30,58,138,0.55)]">
        {[
          ["SCORE", s.score],
          ["COINS", `x${String(s.coins).padStart(2, "0")}`],
          ["WORLD", "1-1"],
          ["TIME", String(s.time)],
        ].map(([label, value]) => (
          <span key={label} className="flex flex-col items-start gap-2 text-left">
            <span>{label}</span>
            <span>{value}</span>
          </span>
        ))}
      </div>
      {/* Overlays */}
      <span className={`${OVERLAY_TITLE} top-[170px] transition-opacity duration-300 ${showTitle ? "opacity-100" : "opacity-0"}`}>CAT RUNNER</span>
      <span className={`${OVERLAY_HINT} top-[250px] transition-opacity duration-300 ${showTitle ? "opacity-100" : "opacity-0"}`}>PRESS SPACE TO START</span>
      <span className={`${OVERLAY_HINT} top-[200px] transition-opacity duration-300 ${showJumpHint ? "opacity-100" : "opacity-0"}`}>PRESS SPACE TO JUMP</span>
      <span className={`${OVERLAY_TITLE} top-[112px] transition-opacity duration-300 ${showClear ? "opacity-100" : "opacity-0"}`}>LEVEL CLEAR!</span>
      <span className={`${OVERLAY_HINT} top-[176px] transition-opacity duration-300 ${showClear ? "opacity-100" : "opacity-0"}`}>PRESS SPACE TO PLAY AGAIN</span>
    </button>
  );
});
