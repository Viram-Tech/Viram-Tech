"use client";

import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiOpenai,
  SiLangchain,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiNvidia,
  SiApachespark,
  SiFastapi,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiGooglecloud,
  SiRedis,
} from "react-icons/si";
import { LogoLoop, type LogoItem } from "./LogoLoop";

const techLogos: LogoItem[] = [
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org" },
  { node: <SiTensorflow />, title: "TensorFlow", href: "https://www.tensorflow.org" },
  { node: <SiHuggingface />, title: "Hugging Face", href: "https://huggingface.co" },
  { node: <SiOpenai />, title: "OpenAI", href: "https://openai.com" },
  { node: <SiLangchain />, title: "LangChain", href: "https://www.langchain.com" },
  { node: <SiScikitlearn />, title: "scikit-learn", href: "https://scikit-learn.org" },
  { node: <SiPandas />, title: "pandas", href: "https://pandas.pydata.org" },
  { node: <SiNumpy />, title: "NumPy", href: "https://numpy.org" },
  { node: <SiNvidia />, title: "NVIDIA", href: "https://www.nvidia.com" },
  { node: <SiApachespark />, title: "Apache Spark", href: "https://spark.apache.org" },
  { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiKubernetes />, title: "Kubernetes", href: "https://kubernetes.io" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiGooglecloud />, title: "Google Cloud", href: "https://cloud.google.com" },
  { node: <SiRedis />, title: "Redis", href: "https://redis.io" },
];

export function TechMarquee() {
  return (
    <section className="border-y border-black/5 py-12 dark:border-white/10">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] opacity-50">
        Powered by a modern AI &amp; data stack
      </p>
      {/*
        The fade edges read the --logoloop-fadeColor CSS variable, which we set to
        match the page background per theme so the marquee blends seamlessly.
      */}
      <div className="relative h-[75px] w-full opacity-70 [--logoloop-fadeColor:#ffffff] dark:[--logoloop-fadeColor:#0a0a0a]">
        <LogoLoop
          logos={techLogos}
          speed={35}
          direction="left"
          logoHeight={75}
          gap={140}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel="Technologies powering ViramTech"
        />
      </div>
    </section>
  );
}

export default TechMarquee;
