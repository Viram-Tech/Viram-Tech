/**
 * Lightweight orb: gradient sphere with rotating rings and a soft glow.
 * Every animation is a compositor-only transform/opacity (no SVG-internal
 * animation, no animated blur/filter) so it stays off the main thread and
 * doesn't compete with the navbar or marquee. Reduced-motion safe. Size with
 * the `className` prop (e.g. "w-full", "w-72").
 */
export function SvgOrb({ className = "w-72" }: { className?: string }) {
  return (
    <div
      className={`relative flex aspect-square ${className} items-center justify-center [contain:layout_paint]`}
    >
      {/* Glow — radial gradient, opacity-only pulse (no blur filter) */}
      <div
        className="pointer-events-none absolute inset-[6%] rounded-full animate-orb-glow motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, rgba(51,165,219,0.4) 0%, rgba(63,86,164,0.22) 42%, rgba(63,86,164,0) 70%)",
        }}
      />

      {/* Float group — sphere + rings bob together (one transform) */}
      <div className="relative flex h-full w-full animate-float items-center justify-center motion-reduce:animate-none">
        {/* Ring behind */}
        <div className="pointer-events-none absolute inset-0 z-0 animate-spin-slow transform-gpu motion-reduce:animate-none">
          <div className="absolute inset-x-0 top-1/2 h-[38%] -translate-y-1/2 -rotate-[20deg] rounded-[50%] border border-tertiary/30" />
        </div>

        {/* Sphere */}
        <div
          className="relative z-10 aspect-square w-[58%] rounded-full animate-orb-breathe transform-gpu motion-reduce:animate-none"
          style={{
            background:
              "radial-gradient(circle at 36% 30%, #8fc0ff 0%, #4f6fd0 34%, #3f56a4 58%, #14284e 100%)",
            boxShadow:
              "inset -14px -18px 44px rgba(0,0,0,0.5), inset 12px 14px 34px rgba(255,255,255,0.22), 0 16px 40px rgba(20,40,78,0.4)",
          }}
        >
          <div className="absolute left-[18%] top-[13%] h-[28%] w-[36%] rounded-full bg-white/45 blur-[2px]" />
        </div>

        {/* Ring in front */}
        <div className="pointer-events-none absolute inset-0 z-20 animate-spin-reverse transform-gpu motion-reduce:animate-none">
          <div className="absolute inset-x-0 top-1/2 h-[30%] -translate-y-1/2 rotate-[26deg] rounded-[50%] border border-secondary/25" />
        </div>
      </div>
    </div>
  );
}

export default SvgOrb;
