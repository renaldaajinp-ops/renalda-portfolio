type EyebrowProps = {
  children: React.ReactNode;
  /** Label size in px; Figma uses 16 for About and 14 for the other sections. */
  size?: 14 | 16;
  className?: string;
};

// Section label pill: blue pixel-arrow badge + uppercase label.
export function Eyebrow({ children, size = 14, className = "" }: EyebrowProps) {
  return (
    <div
      className={`relative flex shrink-0 items-center gap-2 rounded-full border border-white bg-[#fafafa] py-2 pr-3 pl-2 shadow-[0px_3px_6px_-1px_rgba(0,0,0,0.04),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_0.5px_0.5px_0px_rgba(0,0,0,0.06),0px_1px_2px_-2px_rgba(38,45,58,0.08),0px_0px_0px_1px_rgba(0,0,0,0.05)] ${className}`}
    >
      <span className="relative block size-6 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/svg/eyebrow-icon.svg"
          alt=""
          width={33}
          height={33}
          className="absolute top-[-1.5px] left-[-4.5px] block size-[33px] max-w-none"
        />
      </span>
      <span
        className={`leading-none font-medium whitespace-nowrap text-[#3b82f6] uppercase ${
          size === 16 ? "text-[16px] tracking-[0.32px]" : "text-[14px] tracking-[0.28px]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
