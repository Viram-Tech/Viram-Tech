import Link from "next/link";
import { Eyebrow } from "@/components/ui";
import { MarketInsights } from "@/components/MarketInsights";
import { NextPage } from "@/components/NextPage";

export const metadata = {
  title: "Market Opportunity — ViramTech",
  description: "The enterprise shift to AI-first is already underway.",
};

export default function Market() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-28 pt-32">
      <Link href="/" className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline">
        ← Home
      </Link>
      <Eyebrow>About · Market opportunity</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        The shift to AI-first is already{" "}
        <span className="font-serif font-normal italic text-indigo-500">here</span>.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-70">
        Enterprise AI is moving from experiments to autonomous, production
        systems — and the numbers say the window to lead is now.
      </p>

      <MarketInsights />

      <NextPage current="/about/market" />
    </section>
  );
}
