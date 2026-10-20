"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Phone, Pin } from "./Icons";
import { SITUATION_EVENT } from "./Situations";
import styles from "./Contact.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ content, contact }) {
  const { form } = content;
  const [situation, setSituation] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [highlight, setHighlight] = useState(false);
  const formRef = useRef(null);

  // The situation picker can pre-fill this form.
  useEffect(() => {
    const onPick = (event) => {
      const option = form.situationOptions[event.detail];
      if (!option) return;
      setSituation(option);
      setErrors((e) => ({ ...e, situation: undefined }));
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1600);
    };
    window.addEventListener(SITUATION_EVENT, onPick);
    return () => window.removeEventListener(SITUATION_EVENT, onPick);
  }, [form.situationOptions]);

  const validate = (data) => {
    const next = {};
    if (!data.get("name")?.trim()) next.name = form.errors.name;
    if (!EMAIL_RE.test(data.get("email")?.trim() || "")) next.email = form.errors.email;
    if (!data.get("situation")) next.situation = form.errors.situation;
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current.elements[firstInvalid]?.focus();
      return;
    }
    setStatus("sending");
    // TODO: connect to the real lead destination (CRM, email service or API route).
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("sent");
  };

  const fieldProps = (name) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-error` : undefined,
  });

  const renderError = (name) =>
    errors[name] ? (
      <span id={`f-${name}-error`} className={styles.error}>
        {errors[name]}
      </span>
    ) : null;

  return (
    <section id={content.id} className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`} data-reveal>
            {content.eyebrow}
          </p>
          <h2 id="contact-title" className="h2" data-reveal>
            {content.title}
          </h2>
          <p className={styles.body} data-reveal>
            {content.body}
          </p>

          <div className={styles.direct} data-reveal>
            <a href={contact.phoneHref} className={styles.phone}>
              <span className={styles.directIcon}>
                <Phone size={20} />
              </span>
              <span>
                <span className={styles.directLabel}>{content.callLabel}</span>
                <span className={styles.phoneNumber}>{contact.phoneDisplay}</span>
              </span>
            </a>
            <a href={contact.mapHref} className={styles.address} target="_blank" rel="noopener noreferrer">
              <span className={styles.directIcon}>
                <Pin size={20} />
              </span>
              <span>
                <span className={styles.directLabel}>{content.visitLabel}</span>
                {contact.addressLines.map((line) => (
                  <span key={line} className={styles.addressLine}>
                    {line}
                  </span>
                ))}
              </span>
            </a>
          </div>
        </div>

        <div className={styles.card} data-reveal>
          {status === "sent" ? (
            <div className={styles.success} role="status">
              <span className={styles.successIcon}>
                <Check size={28} />
              </span>
              <h3 className={styles.successTitle}>{form.successTitle}</h3>
              <p>{form.successBody}</p>
              <a href={contact.phoneHref} className="btn btn--ghost">
                <Phone size={16} />
                {contact.phoneDisplay}
              </a>
            </div>
          ) : (
            <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="f-name">{form.nameLabel}</label>
                  <input {...fieldProps("name")} type="text" autoComplete="name" required />
                  {renderError("name")}
                </div>
                <div className={styles.field}>
                  <label htmlFor="f-email">{form.emailLabel}</label>
                  <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required />
                  {renderError("email")}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="f-phone">{form.phoneLabel}</label>
                  <input {...fieldProps("phone")} type="tel" autoComplete="tel" inputMode="tel" />
                </div>
                <div className={`${styles.field} ${highlight ? styles.flash : ""}`}>
                  <label htmlFor="f-situation">{form.situationLabel}</label>
                  <select
                    {...fieldProps("situation")}
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      {form.situationPlaceholder}
                    </option>
                    {form.situationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {renderError("situation")}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="f-message">{form.messageLabel}</label>
                <textarea {...fieldProps("message")} rows={4} />
              </div>

              <button type="submit" className={`btn ${styles.submit}`} disabled={status === "sending"}>
                {status === "sending" ? form.sending : form.submit}
                <span className="btn-icon">
                  <ArrowRight size={14} />
                </span>
              </button>
              <p className={styles.privacy}>{form.privacyNote}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
