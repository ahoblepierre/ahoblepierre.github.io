"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/content";
import { Button } from "./m3";
import { EASE } from "./motion";

type Status = "idle" | "sending" | "success" | "error";

// M3 outlined text field: the label sits inside, then floats into the border on focus or once filled.
const inputClass =
  "peer w-full rounded-xs border border-outline bg-transparent px-4 type-body-l text-on-surface caret-primary outline-none transition-colors hover:border-on-surface focus:border-2 focus:border-primary focus:px-[15px] user-invalid:border-error";
const labelClass =
  "pointer-events-none absolute left-3 top-4 origin-left bg-surface-container px-1 type-body-l text-on-surface-variant transition-all duration-200 ease-emphasized peer-focus:-translate-y-[26px] peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-[26px] peer-[:not(:placeholder-shown)]:scale-75 peer-user-invalid:text-error";

export function ContactForm({
  t,
  accessKey,
  email,
}: {
  t: Dictionary["contact"]["form"];
  accessKey: string;
  email: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    // No Web3Forms key configured: hand the message to the visitor's mail app instead.
    if (!accessKey) {
      const subject = encodeURIComponent(`${t.subject} — ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} · ${from}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `${t.subject} — ${name}`,
          from_name: "Portfolio",
          name,
          email: from,
          message,
          botcheck: data.get("botcheck") === "on",
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const note = status === "success" ? t.success : status === "error" ? t.error : "";

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      className="flex flex-col gap-5 rounded-2xl bg-surface-container p-5 md:p-8"
    >
      <h3 className="m-0 type-headline-s text-on-surface">{t.title}</h3>

      {/* Honeypot for bots — Web3Forms rejects submissions where it is checked. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="relative">
        <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder=" " className={`${inputClass} h-14`} />
        <label htmlFor="cf-name" className={labelClass}>
          {t.name}
        </label>
      </div>
      <div className="relative">
        <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder=" " className={`${inputClass} h-14`} />
        <label htmlFor="cf-email" className={labelClass}>
          {t.email}
        </label>
      </div>
      <div className="relative">
        <textarea id="cf-msg" name="message" rows={4} required placeholder=" " className={`${inputClass} min-h-[120px] resize-y py-4`} />
        <label htmlFor="cf-msg" className={labelClass}>
          {t.message}
        </label>
      </div>

      <Button type="submit" disabled={status === "sending"} className="h-14 w-full type-title-m disabled:cursor-wait disabled:opacity-70">
        {status === "sending" ? t.sending : t.submit}
      </Button>

      <p aria-live="polite" className="m-0 min-h-5 type-body-m text-primary">
        <AnimatePresence mode="wait">
          {note && (
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`block ${status === "error" ? "text-error" : ""}`}
            >
              {note}
              {status === "error" && (
                <>
                  {" "}
                  <a href={`mailto:${email}`} className="text-primary underline">
                    {email}
                  </a>
                </>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </p>
    </motion.form>
  );
}
