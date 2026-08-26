"use client";

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

/**
 * Sticky hero with a looping video background. The page content below scrolls
 * up over this pinned hero. The video only plays while the hero is on screen
 * (and pauses under reduced-motion) to keep CPU/GPU work off the main thread.
 */
export function CollectiveHero() {
  // Hoisted into <head> by React so the poster starts downloading immediately.
  ReactDOM.preload("/hero-poster.jpg", { as: "image", fetchPriority: "high" });

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) videoRef.current?.pause();

    const io = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting && !reduce) {
          video.play?.().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 },
    );
    io.observe(section);

    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-brand-navy text-white"
    >
      {/* Looping video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-loop.webm" type="video/webm" />
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Overlays for text contrast */}
      <div className="bg-grid-white pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-0 bg-brand-navy/55" />

      {/* Centre content */}
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <h1 className="font-serif text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl">
          Accelerate your business growth with{" "}
          <span className="italic text-brand-sky">strength-driven</span>{" "}
          technology.
        </h1>
      </div>

      {/* Bottom serif line */}
      <p className="absolute bottom-16 left-1/2 z-10 w-full max-w-md -translate-x-1/2 text-balance px-6 text-center font-serif text-base leading-relaxed text-white/85 sm:bottom-20 sm:max-w-2xl sm:text-xl">
        We&apos;re building the human layer for the AI era — helping enterprises
        turn rapid technological progress into systems that actually ship.
      </p>
    </section>
  );
}

export default CollectiveHero;
