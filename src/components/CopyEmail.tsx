"use client";

import { useEffect, useState } from "react";
import { links } from "@/lib/links";

// Email pill with the copy button from Figma; copies the address and briefly shows a check.
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
    } catch {
      window.location.href = links.emailHref;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy ${links.email}`}
      className="group flex w-full min-w-px cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-full border border-white bg-[#fafafa] py-2 pr-2 pl-4 shadow-[0px_3px_6px_-1px_rgba(0,0,0,0.04),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_0.5px_0.5px_0px_rgba(0,0,0,0.06),0px_1px_2px_-2px_rgba(38,45,58,0.08),0px_0px_0px_1px_rgba(0,0,0,0.05)] tab:w-auto"
    >
      <span className="text-[16px] leading-none font-medium tracking-[0.32px] whitespace-nowrap text-[#3b82f6]">{links.email}</span>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white p-2 shadow-[0px_1.778px_1.778px_0px_rgba(38,45,58,0.08),0px_1.778px_1.778px_-1.5px_rgba(38,45,58,0.08),0px_0px_0px_1px_rgba(0,0,0,0.05)] transition-transform duration-200 ease-out group-active:scale-95">
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M18.5 11c0-.83-.67-1.5-1.5-1.5h-6c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5v-6Zm2 6a3.5 3.5 0 0 1-3.5 3.5h-6A3.5 3.5 0 0 1 7.5 17v-6A3.5 3.5 0 0 1 11 7.5h6a3.5 3.5 0 0 1 3.5 3.5v6Z"
              fill="#676D6D"
            />
            <path
              d="M14.5 5.5v-.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v7.5c0 .41.34.75.75.75v2H6a1 1 0 0 1-.39-.08 2.75 2.75 0 0 1-2.11-2.67v-7.5A2.75 2.75 0 0 1 6.25 2.5h7.5a2.75 2.75 0 0 1 2.75 2.75v.25a1 1 0 1 1-2 0Z"
              fill="#676D6D"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
