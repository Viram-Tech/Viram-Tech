"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let phi = 0;
    let width = 0;
    let raf = 0;
    let running = false;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.18, 0.26, 0.5], // slate/royal
      markerColor: [0.2, 0.65, 0.86], // brand sky
      glowColor: [0.22, 0.32, 0.62], // royal glow
      markers: [],
    });

    const render = () => {
      phi += 0.005;
      globe.update({ phi, width: width * 2, height: width * 2 });
      raf = requestAnimationFrame(render);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only run the WebGL render loop while the globe is on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.01 },
    );
    io.observe(container);

    // Fade in once the first frame is painted.
    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      io.disconnect();
      stop();
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        maxWidth: 560,
        aspectRatio: "1",
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 0.8s ease",
        }}
      />
    </div>
  );
}

export default Globe;
