"use client";

import { type ReactNode } from "react";

/**
 * In-page anchor that smoothly scrolls to a target element by id.
 * Honors the target's CSS scroll-margin (e.g. scroll-mt-32) and
 * falls back to an instant jump when reduced motion is requested.
 */
export function SmoothScrollLink({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${targetId}`}
      className={className}
      onClick={(e) => {
        const el = document.getElementById(targetId);
        if (!el) return;
        e.preventDefault();
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
        history.replaceState(null, "", `#${targetId}`);
      }}
    >
      {children}
    </a>
  );
}

export default SmoothScrollLink;
