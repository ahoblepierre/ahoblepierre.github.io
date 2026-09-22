"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/content";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full border border-line bg-panel-2 px-[18px] text-[15px] text-fg caret-accent-ink outline-none transition-colors focus:border-accent-ink";

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
      transition={{ duration: 0.9, ease: [0.16, 0.84, 0.26, 1], delay: 0.1 }}
      className="flex flex-col gap-5 rounded-[clamp(20px,2.4vw,30px)] bg-ink p-[clamp(24px,3.4vw,44px)]"
    >
      <h3 className="m-0 font-display text-[22px] font-semibold tracking-[-.02em]">{t.title}</h3>

      {/* Honeypot for bots — Web3Forms rejects submissions where it is checked. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label htmlFor="cf-name" className="label-mono mb-[9px] block">
          {t.name}
        </label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" className={`${inputClass} min-h-[50px] rounded-full py-3`} />
      </div>
      <div>
        <label htmlFor="cf-email" className="label-mono mb-[9px] block">
          {t.email}
        </label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={`${inputClass} min-h-[50px] rounded-full py-3`} />
      </div>
      <div>
        <label htmlFor="cf-msg" className="label-mono mb-[9px] block">
          {t.message}
        </label>
        <textarea id="cf-msg" name="message" rows={4} required className={`${inputClass} min-h-[120px] resize-y rounded-[22px] py-3.5`} />
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        className="min-h-[52px] w-full cursor-pointer rounded-full border-0 bg-accent font-body text-[15.5px] font-semibold text-on-accent transition-colors hover:bg-accent-deep disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? t.sending : t.submit}
      </motion.button>

      <p aria-live="polite" className="m-0 min-h-[18px] font-mono text-[11.5px] tracking-[.04em] text-accent-ink">
        <AnimatePresence mode="wait">
          {note && (
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`block ${status === "error" ? "text-fg-2" : ""}`}
            >
              {note}
              {status === "error" && (
                <>
                  {" "}
                  <a href={`mailto:${email}`} className="text-accent-ink">
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
