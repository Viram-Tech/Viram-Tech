import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { urlForImage } from "@/sanity/lib/image";

/* eslint-disable @typescript-eslint/no-explicit-any */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed opacity-80">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-extrabold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-bold tracking-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-indigo-500/40 pl-5 text-lg italic opacity-80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 opacity-80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 opacity-80">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold opacity-100">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-indigo-500 underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: any }) => {
      const url = urlForImage(value);
      if (!url) return null;
      // urlForImage pins every asset to 1200x675, so the box is known up front
      // and the image reserves its space instead of shifting layout on load.
      return (
        <Image
          src={url}
          alt={value?.alt ?? ""}
          width={1200}
          height={675}
          sizes="(min-width: 768px) 768px, 100vw"
          className="mt-8 h-auto w-full rounded-2xl border border-black/5 dark:border-white/10"
        />
      );
    },
  },
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export function PortableBody({ value }: { value: unknown[] }) {
  return (
    <div className="mt-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} components={components} />
    </div>
  );
}
