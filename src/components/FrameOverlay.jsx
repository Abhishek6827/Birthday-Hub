"use client";

export default function FrameOverlay({
  frameHeight = 88,
  topThumbs = [],
  bottomThumbs = [],
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 right-0 top-0 z-30"
        style={{ height: frameHeight }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        {topThumbs?.length ? <Strip thumbs={topThumbs} /> : null}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 right-0 bottom-0 z-30"
        style={{ height: frameHeight }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        {bottomThumbs?.length ? <Strip thumbs={bottomThumbs} reverse /> : null}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}

function Strip({ thumbs, reverse = false }) {
  // duplicate list for seamless loop
  const list = [...thumbs, ...thumbs];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full items-center"
        style={{
          width: "200%",
          animation: `marquee ${reverse ? 28 : 24}s linear infinite`,
        }}
      >
        {list.map((src, i) => (
          <img
            key={src + i}
            src={src || "/placeholder.svg"}
            alt=""
            className="mx-2 h-[64px] w-[96px] shrink-0 rounded-xl object-cover ring-1 ring-white/15"
          />
        ))}
      </div>
    </div>
  );
}
