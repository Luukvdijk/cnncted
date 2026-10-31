"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/content";

/** Concept form: shows the thank-you state, nothing is sent. */
export function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="on-lime rounded-[1.5rem] bg-lime p-8 md:p-12">
        <p className="h2 text-[clamp(2.4rem,5vw,4.5rem)]">
          {t.sent.title}
          <span className="dot" aria-hidden="true" />
        </p>
        <p className="lead mt-5 max-w-md">{t.sent.text}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-10"
    >
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
        <Field label={t.fields.name} name="name" autoComplete="name" required />
        <Field label={t.fields.company} name="company" autoComplete="organization" />
        <Field label={t.fields.email} name="email" type="email" autoComplete="email" required />
        <Field label={t.fields.website} name="website" />
      </div>

      <Choices legend={t.fields.need} name="need" options={t.needs} type="checkbox" />
      <Choices legend={t.fields.budget} name="budget" options={t.budgets} type="radio" />

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="meta text-base">
          {t.fields.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder={t.fields.messagePlaceholder}
          className="resize-none border-b-2 border-ink bg-transparent pb-3 text-[1.3rem] font-medium tracking-[-0.02em] outline-none placeholder:text-grey/60 focus:border-lime-deep"
        />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-ink text-lg">
          <span className="btn-dot" aria-hidden="true" />
          <span>{t.send}</span>
        </button>
        <p className="meta">{t.concept}</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="meta text-base">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="border-b-2 border-ink bg-transparent pb-3 text-[1.3rem] font-medium tracking-[-0.02em] outline-none focus:border-lime-deep"
      />
    </div>
  );
}

function Choices({
  legend,
  name,
  options,
  type,
}: {
  legend: string;
  name: string;
  options: string[];
  type: "checkbox" | "radio";
}) {
  return (
    <fieldset>
      <legend className="meta text-base">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input type={type} name={name} value={option} className="peer sr-only" />
            <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line px-4 py-2.5 text-[0.95rem] font-semibold transition-colors duration-300 peer-checked:border-ink peer-checked:bg-lime peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
