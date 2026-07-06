"use client";

import { useState } from "react";

// Common calling codes — India first (default). Add more as needed.
const countries = [
  { name: "India", flag: "🇮🇳", dial: "+91" },
  { name: "United States", flag: "🇺🇸", dial: "+1" },
  { name: "United Kingdom", flag: "🇬🇧", dial: "+44" },
  { name: "United Arab Emirates", flag: "🇦🇪", dial: "+971" },
  { name: "Singapore", flag: "🇸🇬", dial: "+65" },
  { name: "Australia", flag: "🇦🇺", dial: "+61" },
  { name: "Canada", flag: "🇨🇦", dial: "+1" },
  { name: "Germany", flag: "🇩🇪", dial: "+49" },
  { name: "France", flag: "🇫🇷", dial: "+33" },
  { name: "Netherlands", flag: "🇳🇱", dial: "+31" },
  { name: "Saudi Arabia", flag: "🇸🇦", dial: "+966" },
  { name: "Japan", flag: "🇯🇵", dial: "+81" },
  { name: "China", flag: "🇨🇳", dial: "+86" },
  { name: "Brazil", flag: "🇧🇷", dial: "+55" },
  { name: "South Africa", flag: "🇿🇦", dial: "+27" },
];

export function PhoneField() {
  const [idx, setIdx] = useState(0);
  const country = countries[idx];

  return (
    <div>
      <label className="mb-2 block font-[family-name:var(--font-jetbrains)] text-[11px] font-medium uppercase tracking-[0.15em] opacity-55">
        Phone number *
      </label>
      <div className="flex">
        {/* Country code — native select overlaid on a compact flag + code display */}
        <div className="relative inline-flex items-center gap-1.5 rounded-l-xl border border-r-0 border-black/10 bg-white/70 pl-3 pr-2 text-sm font-medium dark:border-white/15 dark:bg-white/[0.04]">
          <span className="text-base leading-none">{country.flag}</span>
          <span>{country.dial}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          <select
            aria-label="Country calling code"
            name="countryCode"
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {countries.map((c, i) => (
              <option key={c.name} value={i}>
                {c.flag} {c.name} ({c.dial})
              </option>
            ))}
          </select>
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="00000 00000"
          className="w-full rounded-r-xl border border-black/10 bg-white/70 px-4 py-3 text-[15px] outline-none transition placeholder:opacity-40 focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/25 dark:border-white/15 dark:bg-white/[0.04]"
        />
      </div>
    </div>
  );
}

export default PhoneField;
