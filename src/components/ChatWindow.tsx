/* eslint-disable @next/next/no-img-element */

// CTA "Chat Window": a 572×497 crop of the glass stage (glow, textured glass panel, chat card).
// Below 834 Figma scales the whole window down (310px wide at 390), so it is scaled as one unit.
function Message({
  avatar,
  name,
  meta,
  children,
}: {
  avatar: "client" | "dekstive";
  name: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-[15px] rounded-xl p-3">
      {avatar === "client" ? (
        <img src="/avatars/client.jpg" alt="" width={32} height={32} className="size-8 shrink-0 rounded-full object-cover" />
      ) : (
        <img src="/svg/dek-avatar-32.svg" alt="" width={32} height={32} className="size-8 shrink-0" />
      )}
      <div className="flex min-w-px flex-[1_0_0] flex-col items-start gap-1">
        <p className="flex items-center gap-1.5 leading-5 whitespace-nowrap">
          <span className="text-[14px] font-medium text-[#0e0f11]">{name}</span>
          <span className="text-[12px] text-[#8a8a90]">{meta}</span>
        </p>
        {children}
      </div>
    </div>
  );
}

export function ChatWindow() {
  return (
    <div aria-hidden className="relative h-[269.4px] w-[310px] shrink-0 tab:h-[497px] tab:w-[572px]">
      <div className="absolute top-0 left-0 h-[497px] w-[572px] origin-top-left scale-[0.54196] overflow-hidden tab:scale-100">
        {/* The stage glow sits below this crop (y 752 of the 872px stage), so it is not drawn here. */}
        {/* Glass panel (872 tall; the window shows its top 497px). */}
        <div className="absolute top-0 left-0 h-[872px] w-[572px] rounded-[32px] border-[1.43px] border-[rgba(255,255,255,0.2)] bg-[linear-gradient(151.24deg,rgba(143,180,255,0.2)_2.357%,rgba(143,180,255,0)_100.6%)]" />
        <img
          src="/textures/panel.webp"
          alt=""
          width={572}
          height={496}
          className="absolute top-[1.43px] left-0 block h-[496px] w-[572px] max-w-none rounded-t-[32px] opacity-[0.12]"
        />

        <div className="absolute top-4 left-4 flex h-[840px] w-[540px] flex-col overflow-hidden rounded-2xl border border-[#e1e4ea] bg-[rgba(255,255,255,0.9)] backdrop-blur-[2px]">
          <div className="flex w-full items-center gap-3 border-b-2 border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.35)] px-5 py-4">
            <img src="/svg/dek-avatar-28.svg" alt="" width={28} height={28} className="size-7 shrink-0" />
            <div className="flex flex-col items-start">
              <p className="text-[16px] leading-[22px] font-medium whitespace-nowrap text-[#0e0f11]">Dekstive</p>
              <p className="flex items-center gap-1.5">
                <img src="/svg/status-dot.svg" alt="" width={6} height={6} className="size-1.5" />
                <span className="text-[12px] leading-4 whitespace-nowrap text-[#8a8a90]">Usually replies within a day</span>
              </p>
            </div>
            <span className="h-1 min-w-px flex-[1_0_0]" />
            <span className="rounded-[5.6px] bg-[#eff6ff] px-1.5 py-0.5 font-chivo text-[12px] leading-4 whitespace-nowrap text-[#1d4ed8]">
              new project
            </span>
          </div>

          <div className="flex w-full flex-col items-start gap-1 px-2 pt-2 pb-6">
            <Message avatar="client" name="Wei Chen" meta="Kinetic Club · 9:41">
              <p className="text-[14px] leading-[21px] text-[#323335]">
                Hi Renalda! We&apos;re building a booking app for boutique gyms and need product design plus a marketing site.
              </p>
            </Message>
            <Message avatar="dekstive" name="Renalda" meta="Dekstive Studio · 9:52">
              <p className="text-[14px] leading-[21px] text-[#323335]">
                Sounds exciting! Tell me what you&apos;re building, who it&apos;s for, and your timeline. October is still open.
              </p>
            </Message>
            <Message avatar="client" name="Wei Chen" meta="9:58">
              <p className="text-[14px] leading-[21px] text-[#323335]">Perfect, sending the brief over now.</p>
              <div className="flex items-center gap-2.5 rounded-[10px] border border-[#e5e7eb] bg-white py-2 pr-3 pl-2.5">
                <img src="/svg/file.svg" alt="" width={28} height={28} className="size-7 shrink-0" />
                <div className="flex flex-col items-start whitespace-nowrap">
                  <p className="text-[13px] leading-[18px] font-medium text-[#0e0f11]">Kinetic-Club-brief.pdf</p>
                  <p className="text-[12px] leading-4 text-[#8a8a90]">PDF · 2.4 MB</p>
                </div>
              </div>
            </Message>
            <div className="flex w-full items-center gap-2.5 rounded-xl bg-[#f5f8fe] px-3.5 py-3">
              <img src="/svg/check.svg" alt="" width={20} height={20} className="size-5 shrink-0" />
              <p className="text-[14px] leading-5 font-medium whitespace-nowrap text-[#0e0f11]">
                Brief received · Kickoff call scheduled for Oct 8
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
