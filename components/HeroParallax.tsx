"use client";

import Image from "next/image";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";

export type Project = {
  title: string;
  subtitle: string;
  link: string;
  /** Optional screenshot (path in /public or full URL). Falls back to a branded card. */
  image?: string;
  gradient: string;
};

export function HeroParallax({ projects }: { projects: Project[] }) {
  // Row 1: the projects in order. Row 2: the SAME projects, rotated by one so
  // each lines up at a different point ("different times") as the rows drift.
  const firstRow = projects;
  // Bottom row: staggered against row 1, with AirCalibre (projects[0]) bottom-left.
  const secondRow = [projects[0], ...projects.slice(2), ...projects.slice(1, 2)];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, -40]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden pb-16 pt-24 antialiased lg:h-[200vh] lg:pt-40 lg:[perspective:1000px] lg:[transform-style:preserve-3d]"
    >
      <Header />

      {/* Desktop: 3D parallax rows */}
      <motion.div
        className="hidden lg:block"
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        <motion.div className="mb-12 flex flex-row-reverse space-x-12 space-x-reverse">
          {firstRow.map((p) => (
            <ProjectCard project={p} translate={translateX} key={`r1-${p.title}`} />
          ))}
        </motion.div>
        {/* Offset the bottom row by ~half a card so it staggers (brick layout). */}
        <motion.div className="flex translate-x-[28rem] flex-row space-x-12">
          {secondRow.map((p, i) => (
            <ProjectCard
              project={p}
              translate={translateXReverse}
              key={`r2-${i}-${p.title}`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Mobile / tablet: simple tappable stack */}
      <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 px-6 lg:hidden">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer noopener"
            className="group block overflow-hidden rounded-2xl border border-black/10 shadow-lg transition active:scale-[0.99] dark:border-white/10"
          >
            {p.image ? (
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <div
                className={`flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br ${p.gradient}`}
              >
                <span className="px-8 text-center text-2xl font-bold text-white/90">
                  {p.title}
                </span>
              </div>
            )}
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500/70">
                {p.subtitle}
              </p>
              <h3 className="mt-1 text-lg font-bold tracking-tight">{p.title}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-500">
                Visit site →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-6 py-20 md:py-40">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500">
        Our work
      </p>
      <h1 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
        AI that ships — <br />{" "}
        <span className="font-serif font-normal italic">and</span> pays off.
      </h1>
      <p className="mt-8 max-w-2xl text-base opacity-70 md:text-xl">
        A selection of projects where ViramTech put production AI to work. Hover
        a screen and click through to see it live.
      </p>
    </div>
  );
}

function ProjectCard({
  project,
  translate,
}: {
  project: Project;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/card relative h-[30rem] w-[52rem] shrink-0"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer noopener"
        className="block h-full w-full"
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-black/10 shadow-2xl dark:border-white/10">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              draggable={false}
              fill
              sizes="(min-width: 768px) 40vw, 80vw"
              className="object-cover object-left-top"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.gradient}`}
            >
              <span className="px-10 text-center text-3xl font-bold text-white/90">
                {project.title}
              </span>
            </div>
          )}

          {/* hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-7 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {project.subtitle}
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">
              {project.title}
            </h3>
            <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-neutral-900">
              Visit site →
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default HeroParallax;
