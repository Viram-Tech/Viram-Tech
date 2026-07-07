"use client";

import { useRef, useState, type ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { PhoneField } from "@/components/PhoneField";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-[15px] outline-none transition placeholder:opacity-40 focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/25 dark:border-white/15 dark:bg-white/[0.04]";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form wired to EmailJS (client-side send). Reads the public IDs from
 * NEXT_PUBLIC_EMAILJS_* env vars; each field's `name` maps to a template
 * variable ({{firstName}}, {{email}}, {{message}}, …).
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        "[contact] EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_SERVICE_ID, " +
          "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY to .env.local. " +
          "Submission was:",
        Object.fromEntries(new FormData(e.currentTarget).entries()),
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current!, {
        publicKey,
      });
      formRef.current?.reset();
      setStatus("sent");
    } catch (err) {
      console.error("[contact] EmailJS send failed:", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-8 rounded-2xl border border-brand-sky/25 bg-brand-sky/5 p-10 text-center">
        <span className="material-symbols-outlined text-4xl text-brand-sky">
          check_circle
        </span>
        <p className="mt-3 text-lg font-semibold">
          Thanks — your message is on its way.
        </p>
        <p className="mt-1 opacity-65">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name *" name="firstName" placeholder="Jane" required />
        <Field label="Last name *" name="lastName" placeholder="Doe" required />
      </div>

      <PhoneField />

      <Field
        label="Email *"
        name="email"
        type="email"
        placeholder="you@company.com"
        required
      />
      <Field label="Company" name="company" placeholder="Your organization" />
      <Field
        label="Designation"
        name="designation"
        placeholder="e.g. Head of Operations"
      />

      <div>
        <Label>Message</Label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about your project…"
          className={inputClass}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-gradient-to-r from-brand-royal to-brand-sky px-8 py-3.5 font-semibold text-white shadow-[0_10px_40px_-8px_rgba(51,165,219,0.6)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Sending…" : "Send message →"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            Couldn&apos;t send just now — please try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block font-[family-name:var(--font-jetbrains)] text-[11px] font-medium uppercase tracking-[0.15em] opacity-55">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </div>
  );
}
