/* eslint-disable @next/next/no-img-element */

// Desk keyboard from the Figma "Game Controls" frame (944×340). Space, ↑ and → are the
// highlighted game keys and dip slightly while the matching key is held.
type K =
  | { t: "pair"; top: string; bottom: string; w?: number }
  | { t: "letter"; label: string }
  | { t: "word"; label: string; w: number; align: "left" | "right"; dot?: boolean }
  | { t: "mod"; label: string; symbol: string; w: number }
  | { t: "fn" };

const pair = (top: string, bottom: string): K => ({ t: "pair", top, bottom });
const letters = (s: string): K[] => s.split("").map((label) => ({ t: "letter", label }));

const ROWS: K[][] = [
  [
    pair("~", "`"),
    pair("!", "1"),
    pair("@", "2"),
    pair("#", "3"),
    pair("$", "4"),
    pair("%", "5"),
    pair("^", "6"),
    pair("&", "7"),
    pair("*", "8"),
    pair("(", "9"),
    pair(")", "0"),
    pair("‒", "-"),
    pair("+", "="),
    { t: "word", label: "delete", w: 98, align: "right" },
  ],
  [{ t: "word", label: "tab", w: 98, align: "left" }, ...letters("QWERTYUIOP"), pair("{", "["), pair("}", "]"), pair("|", "\\")],
  [
    { t: "word", label: "capslock", w: 114, align: "left", dot: true },
    ...letters("ASDFGHJKL"),
    pair(":", ";"),
    pair("“", "‘"),
    { t: "word", label: "return", w: 98, align: "right" },
  ],
  [
    { t: "word", label: "shift", w: 137, align: "left" },
    ...letters("ZXCVBNM"),
    pair("<", ","),
    pair(">", "."),
    pair("?", "/"),
    { t: "word", label: "shift", w: 137, align: "right" },
  ],
];

const KEY =
  "relative h-[52px] shrink-0 overflow-hidden rounded-[10px] border border-[#d1d8e6] bg-[#f2f4f8] text-[#3d3d3d] font-keycap shadow-[0px_-3px_3px_0px_rgba(242,244,248,0.6),inset_0px_-3.355px_3.355px_0px_rgba(255,255,255,0.12),inset_0px_0px_4px_2px_rgba(209,216,230,0.42)]";
const BLUE =
  "relative shrink-0 overflow-hidden border border-[#2563eb] bg-[#3b82f6] shadow-[0px_-3px_3px_0px_rgba(242,244,248,0.6),inset_0px_-3.355px_3.355px_0px_rgba(255,255,255,0.12),inset_0px_0px_4px_2px_rgba(209,216,230,0.42)] transition-transform duration-100";

function Key({ k }: { k: K }) {
  switch (k.t) {
    case "pair":
      return (
        <span className={`${KEY} w-[52px]`}>
          <span className="absolute top-[6px] left-1/2 -translate-x-1/2 text-[14px] leading-none">{k.top}</span>
          <span className="absolute top-[28px] left-1/2 -translate-x-1/2 text-[14px] leading-none">{k.bottom}</span>
        </span>
      );
    case "letter":
      return (
        <span className={`${KEY} flex w-[52px] items-center justify-center`}>
          <span className="text-[16px] leading-none">{k.label}</span>
        </span>
      );
    case "word":
      return (
        <span className={KEY} style={{ width: k.w }}>
          {k.dot && <span className="absolute top-2 left-2 size-[5px] rounded-full bg-[#c9d0dc]" />}
          <span className={`absolute top-[30px] text-[14px] leading-none ${k.align === "left" ? "left-2" : "right-2"}`}>{k.label}</span>
        </span>
      );
    case "mod":
      return (
        <span className={KEY} style={{ width: k.w }}>
          <span className="absolute top-2 right-2 text-[14px] leading-none">{k.symbol}</span>
          <span className="absolute top-[30px] left-1/2 -translate-x-1/2 text-[14px] leading-none">{k.label}</span>
        </span>
      );
    case "fn":
      return (
        <span className={`${KEY} w-[52px]`}>
          <span className="absolute top-[30px] left-2 text-[14px] leading-none">fn</span>
        </span>
      );
  }
}

export function Keyboard({ pressed }: { pressed: string | null }) {
  const down = (key: string) => (pressed === key ? "translate-y-px" : "");
  return (
    <div aria-hidden className="relative h-[340px] w-[944px] overflow-hidden rounded-2xl border border-[rgba(92,114,255,0.12)] bg-[#d7ddea] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.05),0px_1px_4px_0px_rgba(0,0,0,0.08)]">
      <img
        src="/textures/keyboard.webp"
        alt=""
        width={944}
        height={340}
        className="absolute top-[-1px] left-[-1px] h-[340px] w-[944px] max-w-none opacity-70 mix-blend-color-dodge"
      />
      <div className="absolute top-[11px] left-1/2 flex -translate-x-1/2 flex-col items-start justify-center gap-2.5 rounded-xl border border-[#d1d8e6] bg-white p-2">
        {ROWS.map((row, r) => (
          <div key={r} className="flex items-center gap-2.5">
            {row.map((k, i) => (
              <Key key={i} k={k} />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-2.5">
          <Key k={{ t: "fn" }} />
          <Key k={{ t: "mod", label: "control", symbol: "⌃", w: 54 }} />
          <Key k={{ t: "mod", label: "option", symbol: "⌥", w: 55 }} />
          <Key k={{ t: "mod", label: "command", symbol: "⌘", w: 75 }} />
          <span className={`${BLUE} h-[52px] w-[292px] rounded-[10px] ${down(" ")}`}>
            <span className="absolute top-6 left-3 text-[13px] leading-normal font-medium text-white">jump</span>
          </span>
          <Key k={{ t: "mod", label: "command", symbol: "⌘", w: 75 }} />
          <Key k={{ t: "mod", label: "option", symbol: "⌥", w: 55 }} />
          <span className={`${KEY} flex w-[52px] items-center justify-center`}>
            <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
              <path d="M8 0V7L0 3.5L8 0Z" fill="#3D3D3D" />
            </svg>
          </span>
          <span className="flex h-[52px] w-[52px] shrink-0 flex-col items-start justify-center gap-2">
            <span className={`${BLUE} flex w-[52px] flex-[1_0_0] items-center justify-center rounded-[5px] ${down("ArrowUp")}`}>
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                <path d="M7 8H0L3.5 0L7 8Z" fill="white" />
              </svg>
            </span>
            <span className={`${KEY} flex !h-auto w-[52px] flex-[1_0_0] items-center justify-center !rounded-[5px]`}>
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                <path d="M0 0H7L3.5 8L0 0Z" fill="#3D3D3D" />
              </svg>
            </span>
          </span>
          <span className={`relative size-[52px] shrink-0 transition-transform duration-100 ${down("ArrowRight")}`}>
            <img src="/svg/key-right.svg" alt="" width={60} height={60} className="absolute top-[-7px] left-[-4px] max-w-none" />
          </span>
        </div>
      </div>
    </div>
  );
}
