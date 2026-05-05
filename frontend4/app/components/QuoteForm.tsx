"use client";

import { useRef, useState, type FormEvent } from "react";

const formFields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Phone", name: "phone", type: "tel", required: false },
  { label: "Location", name: "location", type: "text", required: false },
] as const;

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm({ formId = "quote-upload", formClassName }: { formId?: string; formClassName?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError(null);

    const data = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      setStatus("sent");
      setFileName(null);
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className={`space-y-5 ${formClassName ?? "mt-10"}`} noValidate>
      {formFields.map((f) => (
        <div key={f.name}>
          <label
            htmlFor={`qf-${f.name}`}
            className="mb-2 block type-micro text-foreground/70"
          >
            {f.label} {f.required && <span className="text-brand">*</span>}
          </label>
          <input
            id={`qf-${f.name}`}
            name={f.name}
            type={f.type}
            required={f.required}
            disabled={status === "sending"}
            className="w-full border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted focus:border-brand focus:outline-none disabled:opacity-60 md:text-sm"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="qf-message"
          className="mb-2 block type-micro text-foreground/70"
        >
          Message
        </label>
        <textarea
          id="qf-message"
          name="message"
          rows={4}
          disabled={status === "sending"}
          className="w-full border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted focus:border-brand focus:outline-none disabled:opacity-60 md:text-sm"
        />
      </div>

      <div>
        <label className="mb-2 block type-micro text-foreground/70">
          Upload
        </label>
        <label
          htmlFor={formId}
          className="flex w-full cursor-pointer items-center justify-center gap-3 border border-accent bg-accent/10 px-6 py-4 type-micro text-accent transition-colors hover:bg-accent hover:text-background"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {fileName ?? "Upload File"}
        </label>
        <input
          id={formId}
          name="file"
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          disabled={status === "sending"}
          onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name ?? null)}
          className="sr-only"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-3 block w-full bg-brand px-10 py-4 type-micro text-on-brand hover:bg-brand-light disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry →"}
      </button>

      {status === "sent" && (
        <p
          role="status"
          className="type-caption text-accent"
        >
          Thanks — we&apos;ve got your inquiry and will be in touch within two business days.
        </p>
      )}
      {status === "error" && error && (
        <p role="alert" className="type-caption text-brand">
          {error}
        </p>
      )}
    </form>
  );
}
