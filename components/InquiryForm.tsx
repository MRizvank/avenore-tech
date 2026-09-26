"use client";

import { useState } from "react";
import CalButton from "@/components/CalButton";
import { AUTO_REPLY, CONTACT_EMAIL, CONTACT_ENDPOINT } from "@/lib/contact";

const C = {
  surfaceLow: "#1b1b20",
  surfaceContainerHighest: "#353439",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#8b5cf6",
  tertiary: "#5edf81",
  error: "#ffb4ab",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

type Step =
  | { q: string; options: string[] }
  | { q: string; text: true; placeholder: string }
  | { q: string; fields: true };

const STEPS: Step[] = [
  {
    q: "What is the primary goal of your mobile product?",
    options: [
      "Validate a new product idea with a rapid MVP",
      "Rebuild an existing application for superior performance",
      "Enterprise-grade product design & architecture scaling",
      "General ongoing design-engineering retainer",
    ],
  },
  {
    q: "Which platforms should the product live on?",
    options: [
      "iOS only",
      "Android only",
      "iOS & Android (Flutter cross-platform)",
      "Mobile + Web platform",
    ],
  },
  {
    q: "Tell us about your app idea and requirements.",
    text: true,
    placeholder:
      "What should the app do, who is it for, and any must-have features or integrations.",
  },
  {
    q: "When do you need to launch?",
    options: [
      "As soon as possible (under 3 months)",
      "3 – 6 months",
      "6 – 12 months",
      "Flexible / exploring",
    ],
  },
  { q: "Where should we send the proposal?", fields: true },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelStyle = {
  display: "block",
  color: C.outline,
  fontSize: "10px",
  fontFamily: "monospace",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "6px",
} as const;

const inputStyle = (invalid = false) =>
  ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    backgroundColor: C.surfaceLow,
    border: `1px solid ${invalid ? C.error : "rgba(73,68,84,0.35)"}`,
    color: C.onSurface,
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
  }) as const;

const pad = (n: number) => String(n).padStart(2, "0");

export default function InquiryForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([
    (STEPS[0] as { options: string[] }).options[1],
  ]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    company: "",
    brief: "",
  });
  const [invalid, setInvalid] = useState({ name: false, email: false });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const setAnswer = (value: string) => {
    setAnswers((a) => {
      const next = [...a];
      next[step] = value;
      return next;
    });
    setError("");
  };

  const submit = async () => {
    const bad = {
      name: !contact.name.trim(),
      email: !EMAIL_RE.test(contact.email.trim()),
    };
    setInvalid(bad);
    if (bad.name || bad.email) {
      setError("Please complete the highlighted fields.");
      return;
    }

    const name = contact.name.trim();
    const email = contact.email.trim();
    // Shape the inquiry as the email FormSubmit will deliver: readable labels in order, plus its control fields.
    const payload = {
      Name: name,
      Email: email,
      Company: contact.company.trim() || "—",
      Goal: answers[0],
      Platforms: answers[1],
      Timeline: answers[3],
      "App idea & requirements": answers[2].trim(),
      "Additional notes": contact.brief.trim() || "—",
      "Sent from": window.location.href,
      _subject: `Project inquiry — ${name}`,
      _replyto: email,
      _template: "table",
      _captcha: "false",
      _honey: "",
      _autoresponse: AUTO_REPLY.replace("{name}", name.split(" ")[0] || name),
    };

    setSending(true);
    setError("");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false") {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      setSent(true);
    } catch (e) {
      let msg = e instanceof Error ? e.message : "";
      if (/activation/i.test(msg)) {
        msg = `This form is not activated for ${window.location.host} yet. An activation link has just been emailed to ${CONTACT_EMAIL}; once it is clicked, inquiries from this site go straight through.`;
      } else if (!msg || /^HTTP /.test(msg)) {
        msg = "Something went wrong sending your inquiry.";
      }
      setError(`${msg} You can also email ${CONTACT_EMAIL} directly.`);
    } finally {
      setSending(false);
    }
  };

  const handleNext = () => {
    if (isLast) {
      submit();
      return;
    }
    const value = answers[step]?.trim();
    const missing = "text" in current ? !value || value.length < 10 : !value;
    if (missing) {
      setError(
        "text" in current
          ? "Tell us a little about your app idea to continue."
          : "Please choose an option to continue."
      );
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setError("");
    setStep(step - 1);
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
      style={{
        borderRadius: "1rem",
        backgroundColor: C.surfaceLowest,
        border: `1px solid rgba(73,68,84,0.35)`,
        padding: "2rem",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
      }}
    >
      {sent ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
            padding: "1rem 0",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              color: C.primary,
              fontSize: "32px",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "rgba(139,92,246,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            check
          </span>
          <h3
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "28px",
              lineHeight: "36px",
              fontWeight: 700,
              color: C.onSurface,
              margin: 0,
            }}
          >
            Thanks. We&apos;ll be in touch.
          </h3>
          <p style={{ color: C.onSurfaceVariant, fontSize: "15px", margin: 0 }}>
            Your inquiry has been sent. Expect a reply within two business
            days.
          </p>
          <CalButton
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              borderRadius: "9999px",
              border: `1px solid rgba(73,68,84,0.4)`,
              backgroundColor: C.surfaceLow,
              color: C.onSurface,
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: C.primary, fontSize: "18px" }}
            >
              calendar_month
            </span>
            Prefer to talk? Book a quick call
          </CalButton>
        </div>
      ) : (
        <>
          {/* Step header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ ...labelStyle, color: C.primary, marginBottom: 0 }}>
              STEP {pad(step + 1)} OF {pad(STEPS.length)}
            </span>
            <span style={{ ...labelStyle, marginBottom: 0 }}>
              PROJECT DISCOVERY & SCOPE
            </span>
          </div>

          {/* Progress */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`,
              gap: "4px",
              marginBottom: "1.5rem",
            }}
          >
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  height: "6px",
                  borderRadius: "9999px",
                  backgroundColor:
                    i <= step ? C.primary : C.surfaceContainerHighest,
                  boxShadow:
                    i <= step ? "0 0 12px rgba(160,120,255,0.6)" : "none",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          {/* Question */}
          <h2
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "28px",
              lineHeight: "36px",
              fontWeight: 700,
              color: C.onSurface,
              margin: "0 0 1.5rem",
            }}
          >
            {current.q}
          </h2>

          {/* Body */}
          <div key={step} style={{ marginBottom: "1.5rem" }}>
            {"options" in current && (
              <div
                role="radiogroup"
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: "0.75rem" }}
              >
                {current.options.map((opt) => {
                  const isActive = answers[step] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setAnswer(opt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        textAlign: "start",
                        cursor: "pointer",
                        borderRadius: "12px",
                        padding: "1rem",
                        border: isActive
                          ? `1px solid rgba(208,188,255,0.3)`
                          : `1px solid rgba(73,68,84,0.25)`,
                        backgroundColor: isActive
                          ? "rgba(208,188,255,0.08)"
                          : C.surfaceLow,
                        boxShadow: isActive
                          ? "0 0 24px -4px rgba(160,120,255,0.2)"
                          : "none",
                        color: C.onSurface,
                        fontSize: "15px",
                        fontWeight: 500,
                        fontFamily: "inherit",
                        transition: "all 0.15s",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          border: `2px solid ${isActive ? C.primary : C.outlineVariant}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isActive && (
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: C.primary,
                            }}
                          />
                        )}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {"text" in current && (
              <>
                <label htmlFor="inq-idea" style={labelStyle}>
                  App idea &amp; requirements
                </label>
                <textarea
                  id="inq-idea"
                  rows={5}
                  placeholder={current.placeholder}
                  value={answers[step] || ""}
                  onChange={(e) => setAnswer(e.target.value)}
                  style={inputStyle()}
                />
              </>
            )}

            {"fields" in current && (
              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: "1rem" }}
              >
                {(
                  [
                    ["name", "Name", "Your full name", "name", "text"],
                    ["email", "Email", "you@company.com", "email", "email"],
                  ] as const
                ).map(([key, label, placeholder, autoComplete, type]) => (
                  <div key={key}>
                    <label htmlFor={`inq-${key}`} style={labelStyle}>
                      {label}
                    </label>
                    <input
                      id={`inq-${key}`}
                      type={type}
                      autoComplete={autoComplete}
                      placeholder={placeholder}
                      value={contact[key]}
                      onChange={(e) => {
                        setContact({ ...contact, [key]: e.target.value });
                        setInvalid({ ...invalid, [key]: false });
                        setError("");
                      }}
                      style={inputStyle(invalid[key])}
                    />
                    {invalid[key] && (
                      <span
                        style={{
                          color: C.error,
                          fontSize: "12px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {key === "name"
                          ? "Please enter your name."
                          : "Please enter a valid email."}
                      </span>
                    )}
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label htmlFor="inq-company" style={labelStyle}>
                    Company <span style={{ opacity: 0.6 }}>(optional)</span>
                  </label>
                  <input
                    id="inq-company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company or product name"
                    value={contact.company}
                    onChange={(e) =>
                      setContact({ ...contact, company: e.target.value })
                    }
                    style={inputStyle()}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="inq-brief" style={labelStyle}>
                    Anything else we should know?{" "}
                    <span style={{ opacity: 0.6 }}>(optional)</span>
                  </label>
                  <textarea
                    id="inq-brief"
                    rows={3}
                    placeholder="Links, references, existing app, team setup, or questions for us."
                    value={contact.brief}
                    onChange={(e) =>
                      setContact({ ...contact, brief: e.target.value })
                    }
                    style={inputStyle()}
                  />
                </div>
              </div>
            )}
          </div>

          {error && (
            <p
              role="alert"
              style={{
                color: C.error,
                fontSize: "13px",
                margin: "0 0 1rem",
              }}
            >
              {error}
            </p>
          )}

          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              paddingTop: "1rem",
              borderTop: `1px solid rgba(73,68,84,0.2)`,
            }}
          >
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "9999px",
                border: `1px solid rgba(73,68,84,0.4)`,
                backgroundColor: "transparent",
                color: C.onSurfaceVariant,
                fontSize: "14px",
                fontFamily: "inherit",
                cursor: step === 0 ? "not-allowed" : "pointer",
                opacity: step === 0 ? 0.4 : 1,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                arrow_back
              </span>
              Back
            </button>
            <button
              type="submit"
              disabled={sending}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 24px",
                borderRadius: "9999px",
                backgroundColor: C.primary,
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                border: "none",
                cursor: sending ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                boxShadow: "0 0 24px rgba(160,120,255,0.4)",
                opacity: sending ? 0.75 : 1,
                transition: "all 0.15s",
              }}
            >
              {sending
                ? "Sending..."
                : isLast
                  ? "Send Inquiry"
                  : `Continue to Step ${step + 2}`}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                north_east
              </span>
            </button>
          </div>

          {/* Footer */}
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: C.outline,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              marginTop: "1rem",
              marginBottom: 0,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: C.tertiary, fontSize: "14px" }}
            >
              lock
            </span>
            Your requirements remain strictly confidential under NDA.
          </p>
        </>
      )}
    </form>
  );
}
