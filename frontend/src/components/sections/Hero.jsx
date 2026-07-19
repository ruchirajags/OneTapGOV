"use client";
import { useState, useEffect } from "react";
import FadeUp from "../ui/FadeUp";
import { CheckIcon } from "../ui/Icons";
import { SCHEME_MATCHES } from "../../lib/constants/schemes";

const roles = ["Student", "Farmer", "Woman Entrepreneur", "Senior Citizen", "Business Owner", "Job Seeker"];

function EligibilityPreviewPanel() {
  const [activeRole, setActiveRole] = useState("Student");
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);
  const [cardAnim, setCardAnim] = useState("cardEntry 700ms ease forwards");

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveRole(prev => {
          const idx = roles.indexOf(prev);
          return roles[(idx + 1) % roles.length];
        });
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [paused]);

  const matches = SCHEME_MATCHES[activeRole] || [];
  const documents = matches[0]?.documents || [];

  return (
    <>
      <style>{`
        @keyframes cardEntry {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div
        className="hero-preview-panel"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 52px rgba(15,23,42,0.12)",
          fontSize: "14px",
          animation: cardAnim,
          width: "100%",
        }}
        onAnimationEnd={() => {
          if (cardAnim.includes("cardEntry")) {
            setCardAnim("cardFloat 4s ease-in-out infinite");
          }
        }}
      >
        {/* Panel header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontWeight: "900", color: "var(--navy)", marginBottom: "2px" }}>Who are you?</p>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Tell us about yourself to get started</p>
        </div>

        <div className="hero-preview-panel__body" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", minHeight: "390px" }}>
          {/* Left: role selector */}
          <div style={{ padding: "28px 30px", borderRight: "1px solid var(--border)" }}>
            {roles.map((role) => (
              <label
                key={role}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  marginBottom: "4px",
                  background: activeRole === role ? "#EFF6FF" : "transparent",
                  border: activeRole === role ? "1px solid #BFDBFE" : "1px solid transparent",
                  cursor: "auto",
                  transition: "all 200ms ease",
                }}
              >
                <input
                  type="radio"
                  checked={activeRole === role}
                  readOnly
                  tabIndex={-1}
                  style={{
                    accentColor: "var(--blue)",
                    pointerEvents: "none",
                  }}
                />
                <span style={{
                  fontWeight: activeRole === role ? "600" : "400",
                  color: activeRole === role ? "var(--blue)" : "var(--text-primary)",
                  fontSize: "13px",
                }}>
                  {role}
                </span>
              </label>
            ))}
          </div>

          {/* Right: matches */}
          <div style={{ padding: "28px 30px", opacity: fade ? 1 : 0, transition: "opacity 300ms ease" }}>
            <p style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>
              Potential Matches
            </p>

            {matches.map((scheme, i) => (
              <div key={scheme.name} style={{
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                animation: `slideInRight 300ms ease ${i * 80}ms both`,
              }}>
                <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--navy)" }}>{scheme.name}</span>
                <span style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  background: scheme.strength === "High" ? "#DCFCE7" : "#FEF9C3",
                  color: scheme.strength === "High" ? "#166534" : "#854D0E",
                }}>
                  {scheme.strength}
                </span>
              </div>
            ))}

            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                Required Documents
              </p>
              {documents.map((doc) => (
                <div key={doc} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <span style={{ color: "var(--teal)" }}>
                    <CheckIcon size={12} />
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Hero() {
  return (
    <section className="landing-hero" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      paddingTop: "96px",
      paddingBottom: "80px",
      background: "linear-gradient(180deg, #F8FAFC 0%, #EEF6FF 52%, #F8FAFC 100%)",
    }}>
      <div className="landing-container" style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div className="landing-hero__grid" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "34px",
          textAlign: "center",
        }}>

          {/* Center laptop preview */}
          <FadeUp delay={100} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div className="hero-laptop" style={{
              width: "min(1080px, 100%)",
              margin: "0 auto",
            }}>
              <div style={{
                padding: "18px 18px 22px",
                borderRadius: "28px",
                background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 55%, #1488A6 100%)",
                boxShadow: "0 34px 80px rgba(15,23,42,0.22)",
                border: "1px solid rgba(255,255,255,0.22)",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  height: "28px",
                  padding: "0 4px 10px",
                }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#F87171" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FBBF24" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#34D399" }} />
                </div>
                <EligibilityPreviewPanel />
              </div>
              <div style={{
                width: "72%",
                height: "18px",
                margin: "0 auto",
                borderRadius: "0 0 28px 28px",
                background: "linear-gradient(180deg, #CBD5E1 0%, #94A3B8 100%)",
                boxShadow: "0 18px 42px rgba(15,23,42,0.18)",
              }} />
              <div style={{
                width: "42%",
                height: "10px",
                margin: "0 auto",
                borderRadius: "0 0 18px 18px",
                background: "#E2E8F0",
              }} />
            </div>
          </FadeUp>

          {/* Center headline */}
          <div style={{ maxWidth: "940px", margin: "0 auto" }}>
            <FadeUp delay={100}>
              <h1 style={{
                fontSize: "clamp(40px, 3vw, 25px)",
                fontWeight: "650",
                color: "var(--navy)",
                lineHeight: "1.1",
                letterSpacing: "0.02em",
                marginBottom: "0",
                textTransform: "uppercase",
              }}>
                Find government schemes without the confusion and hassle.
              </h1>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
