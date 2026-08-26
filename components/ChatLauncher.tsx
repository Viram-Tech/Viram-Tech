"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Loaded only in the browser, and only once the page is idle — the widget must
// not compete with the LCP work done for Core Web Vitals.
const ChatWidget = dynamic(
  () => import("./ChatWidget").then((m) => m.ChatWidget),
  { ssr: false },
);

export function ChatLauncher() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(() => setReady(true));
    } else {
      const t = setTimeout(() => setReady(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  return ready ? <ChatWidget /> : null;
}
