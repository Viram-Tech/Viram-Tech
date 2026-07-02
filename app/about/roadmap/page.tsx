import Link from "next/link";
import { Eyebrow } from "@/components/ui";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { NextPage } from "@/components/NextPage";

export const metadata = {
  title: "Our Roadmap — ViramTech",
  description: "From enterprise pilots to scale to market leadership.",
};

export default function Roadmap() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-28 pt-32">
      <Link href="/" className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline">
        ← Home
      </Link>
      <Eyebrow>About · Our roadmap</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        Pilots{" "}
        <span className="font-serif font-normal italic text-indigo-500">to</span>{" "}
        market leadership.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-70">
        A deliberate path from proven pilots to a full product suite and beyond.
      </p>

      <RoadmapTimeline />

      <NextPage current="/about/roadmap" />
    </section>
  );
}
