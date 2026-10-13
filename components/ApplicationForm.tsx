"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LuUpload, LuFileText, LuX } from "react-icons/lu";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-[15px] outline-none transition placeholder:opacity-40 focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/25 dark:border-white/15 dark:bg-white/[0.04]";

type Status = "idle" | "sending" | "sent" | "error";

// Résumé upload rules, enforced here and again by app/api/careers.
const MAX_RESUME_MB = 4;
const RESUME_TYPES = [".pdf", ".doc", ".docx"];
// Client-side courtesy cooldown; the real rate limit lives in app/api/careers.
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "careers:lastSubmit";

function resumeError(file: File): string | null {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!RESUME_TYPES.includes(ext)) return "Please upload a PDF, DOC or DOCX file.";
  if (file.size > MAX_RESUME_MB * 1024 * 1024)
    return `File is too large — the limit is ${MAX_RESUME_MB} MB.`;
  return null;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * POSTs the application to app/api/careers, which saves it to Notion.
 * XHR (not fetch) for upload progress.
 */
function postApplication(
  body: FormData,
  onProgress: (pct: number) => void,
): Promise<{ ok: boolean; error?: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/careers");
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => {
      try {
        resolve(JSON.parse(xhr.responseText));
      } catch {
        reject(new Error(`unexpected response (HTTP ${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error("network error"));
    xhr.send(body);
  });
}

function readCooldown(): number {
  try {
    return Number(localStorage.getItem(COOLDOWN_KEY) || 0);
  } catch {
    return 0;
  }
}

export function ApplicationForm({ role }: { role: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeErr, setResumeErr] = useState<string | null>(null);

  // Time-to-submit check: bots submit within milliseconds of page load.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!resume) {
      setResumeErr("Please attach your résumé.");
      return;
    }
    const body = new FormData(e.currentTarget);

    // Honeypot filled → a bot. Pretend it worked and send nothing.
    if (body.get("website")) {
      setStatus("sent");
      return;
    }
    if (Date.now() - readCooldown() < COOLDOWN_MS) {
      setError("You just sent an application — please wait a minute before sending another.");
      setStatus("error");
      return;
    }

    body.set("role", role);
    body.set("elapsedMs", String(Date.now() - startedAt.current));
    body.set("resume", resume);

    setStatus("sending");
    setError(null);
    setProgress(0);
    try {
      const res = await postApplication(body, setProgress);
      if (!res.ok) {
        setError(res.error ?? "Couldn't send just now — please try again in a moment.");
        setStatus("error");
        return;
      }
      try {
        localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      } catch {
        // storage unavailable (private mode) — the server-side limit still applies
      }
      formRef.current?.reset();
      setResume(null);
      setStatus("sent");
    } catch (err) {
      console.error("[careers] submit failed:", err);
      setError("Couldn't send just now — please check your connection and try again.");
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
          Thanks — your application is in.
        </p>
        <p className="mt-1 opacity-65">
          We&apos;ll review it and get back to you soon.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="relative space-y-5">
      {/* Honeypot: invisible to people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name *" name="firstName" placeholder="Jane" required />
        <Field label="Last name *" name="lastName" placeholder="Doe" required />
      </div>

      <Field label="Email *" name="email" type="email" placeholder="you@example.com" required />

      <ResumeUpload
        file={resume}
        error={resumeErr}
        onChange={(file, err) => {
          setResume(file);
          setResumeErr(err);
        }}
      />
      <Field
        label="LinkedIn / portfolio *"
        name="linkedin"
        type="url"
        placeholder="https://linkedin.com/in/…"
        required
      />

      <div>
        <Label>Why ViramTech?</Label>
        <textarea
          name="note"
          rows={5}
          placeholder="A few lines about you and what you'd like to work on…"
          className={inputClass}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand-royal dark:accent-brand-sky"
        />
        <span className="opacity-75">
          I agree to ViramTech storing my application and résumé for
          recruitment purposes. *
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-gradient-to-r from-brand-royal to-brand-sky px-8 py-3.5 font-semibold text-white shadow-[0_10px_40px_-8px_rgba(51,165,219,0.6)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {sending ? (progress < 100 ? `Uploading… ${progress}%` : "Saving…") : "Submit application →"}
        </button>
        {status === "error" && error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
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

/** Drag-and-drop / click-to-browse résumé picker with type and size checks. */
function ResumeUpload({
  file,
  error,
  onChange,
}: {
  file: File | null;
  error: string | null;
  onChange: (file: File | null, error: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function pick(f: File | undefined) {
    if (!f) return;
    const err = resumeError(f);
    onChange(err ? null : f, err);
  }

  function clear() {
    if (inputRef.current) inputRef.current.value = "";
    onChange(null, null);
  }

  return (
    <div>
      <Label>Résumé *</Label>
      <input
        ref={inputRef}
        type="file"
        accept={RESUME_TYPES.join(",")}
        className="sr-only"
        id="resume-upload"
        onChange={(e) => pick(e.target.files?.[0])}
      />

      {file ? (
        <div className="flex items-center gap-4 rounded-xl border border-brand-sky/40 bg-brand-sky/5 px-4 py-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-royal/10 text-brand-royal dark:bg-brand-sky/15 dark:text-brand-sky">
            <LuFileText size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-semibold">{file.name}</span>
            <span className="block text-xs opacity-55">{formatSize(file.size)}</span>
          </span>
          <button
            type="button"
            onClick={clear}
            aria-label="Remove file"
            className="flex h-8 w-8 items-center justify-center rounded-full opacity-60 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
          >
            <LuX size={18} />
          </button>
        </div>
      ) : (
        <label
          htmlFor="resume-upload"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition ${
            dragging
              ? "border-brand-sky bg-brand-sky/10"
              : error
                ? "border-red-500/60 bg-red-500/5"
                : "border-black/15 bg-white/70 hover:border-brand-sky dark:border-white/20 dark:bg-white/[0.04]"
          }`}
        >
          <LuUpload size={22} className="text-brand-royal dark:text-brand-sky" />
          <span className="text-[15px]">
            <span className="font-semibold text-brand-royal dark:text-brand-sky">
              Click to upload
            </span>{" "}
            or drag and drop
          </span>
          <span className="text-xs opacity-55">
            PDF, DOC or DOCX · max {MAX_RESUME_MB} MB
          </span>
        </label>
      )}

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
