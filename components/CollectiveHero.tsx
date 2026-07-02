"use client";

import { useEffect, useRef } from "react";

const MARKS = 12;
const RADIUS = 290; // px, distance of each mark from centre (snug off-corner arc)

/**
 * Sticky hero with a looping ambient background and a ring of brand marks that
 * spins continuously and accelerates with scroll velocity (either direction).
 * The page content below scrolls up over this pinned hero.
 */
export function CollectiveHero() {
  const ringRef = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const ring2 = ring2Ref.current;
    const section = sectionRef.current;
    if (!ring || !section) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) videoRef.current?.pause();

    let angle = 0;
    const base = 0.35; // idle deg/frame — gentle continuous spin
    let velocity = base;
    let last = window.scrollY;
    let raf = 0;
    let running = false;

    const frame = () => {
      const cur = window.scrollY;
      const scrollDelta = cur - last; // + scrolling down, − scrolling up
      last = cur;
      // Idle spins forward; scrolling shifts the target speed AND direction
      // (scroll up → target goes negative → ring reverses).
      let target = base + scrollDelta * 0.02;
      if (target > 1) target = 1;
      if (target < -1) target = -1;
      velocity += (target - velocity) * 0.12; // ease toward target
      angle = (angle + velocity) % 360;
      ring.style.transform = `rotate(${angle}deg)`;
      if (ring2) ring2.style.transform = `rotate(${-angle}deg)`;
      raf = requestAnimationFrame(frame);
    };
    const startSpin = () => {
      if (running || reduce) return;
      running = true;
      last = window.scrollY;
      raf = requestAnimationFrame(frame);
    };
    const stopSpin = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only spin / play the video while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startSpin();
          if (!reduce) videoRef.current?.play?.().catch(() => {});
        } else {
          stopSpin();
          videoRef.current?.pause();
        }
      },
      { threshold: 0.01 },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      stopSpin();
    };
  }, []);

  const marks = Array.from({ length: MARKS }).map((_, i) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={i}
      src="/logo.svg"
      alt=""
      className="absolute left-1/2 top-1/2 -ml-[18px] -mt-[18px] h-9 w-9 opacity-80 [filter:brightness(0)_invert(1)]"
      style={{
        transform: `rotate(${(360 / MARKS) * i}deg) translateY(-${RADIUS}px)`,
      }}
    />
  ));

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-brand-navy text-white"
    >
      {/* Looping video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-loop.webm" type="video/webm" />
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Overlays for text contrast */}
      <div className="bg-grid-white pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-0 bg-brand-navy/55" />

      {/* Two opposite-corner arcs of brand marks (bottom-left + top-right) */}
      <div className="pointer-events-none absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 scale-75 sm:scale-90 lg:scale-100">
        <div ref={ringRef} className="relative h-[580px] w-[580px] will-change-transform">
          {marks}
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 scale-75 sm:scale-90 lg:scale-100">
        <div ref={ring2Ref} className="relative h-[580px] w-[580px] will-change-transform">
          {marks}
        </div>
      </div>

      {/* Centre content */}
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <h1 className="font-serif text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl">
          Accelerate your business growth with{" "}
          <span className="italic text-brand-sky">strength-driven</span>{" "}
          technology.
        </h1>
      </div>

      {/* Bottom serif line */}
      <p className="absolute bottom-14 left-1/2 z-10 max-w-2xl -translate-x-1/2 px-6 text-center font-serif text-lg leading-relaxed text-white/85 sm:text-xl">
        We&apos;re building the human layer for the AI era — helping enterprises
        turn rapid technological progress into systems that actually ship.
      </p>
    </section>
  );
}

export default CollectiveHero;
