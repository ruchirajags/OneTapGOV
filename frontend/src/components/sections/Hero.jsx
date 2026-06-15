"use client";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import FadeUp from "../ui/FadeUp";
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

  const handleManualSelect = (role) => {
    setActiveRole(role);
    setPaused(true);
    setTimeout(() => setPaused(false), 5000);
  };

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
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
          fontSize: "14px",
          animation: cardAnim,
        }}
        onAnimationEnd={() => {
          if (cardAnim.includes("cardEntry")) {
            setCardAnim("cardFloat 4s ease-in-out infinite");
          }
        }}
      >
        {/* Panel header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontWeight: "600", color: "var(--navy)", marginBottom: "2px" }}>Who are you?</p>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Tell us about yourself to get started</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "320px" }}>
          {/* Left: role selector */}
          <div style={{ padding: "20px 24px", borderRight: "1px solid var(--border)" }}>
            {roles.map((role) => (
              <label
                key={role}
                onClick={() => handleManualSelect(role)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  marginBottom: "4px",
                  background: activeRole === role ? "#EFF6FF" : "transparent",
                  border: activeRole === role ? "1px solid #BFDBFE" : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 200ms ease",
                }}
              >
                <input
                  type="radio"
                  name="hero-role"
                  checked={activeRole === role}
                  onChange={() => handleManualSelect(role)}
                  style={{ accentColor: "var(--blue)" }}
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
          <div style={{ padding: "20px 24px", opacity: fade ? 1 : 0, transition: "opacity 300ms ease" }}>
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
                  <span style={{ color: "var(--teal)", fontSize: "12px" }}>✓</span>
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
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      paddingTop: "96px",
      paddingBottom: "80px",
      background: "var(--bg)",
    }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "80px", alignItems: "center" }}>

          {/* Left */}
          <div>
            <FadeUp delay={0}>
              <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--teal)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
                Discover. Understand. Apply.
              </p>
            </FadeUp>

            <FadeUp delay={100}>
              <h1 style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: "800",
                color: "var(--navy)",
                lineHeight: "1.1",
                letterSpacing: "-0.03em",
                marginBottom: "24px",
              }}>
                Find Government{" "}
                <span style={{ color: "var(--blue)" }}>Schemes</span>{" "}
                Without the Confusion.
              </h1>
            </FadeUp>

            <FadeUp delay={200}>
              <p style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "40px", maxWidth: "480px" }}>
                Discover benefits you may qualify for, understand eligibility requirements, and prepare applications through one guided experience.
              </p>
            </FadeUp>

            <FadeUp delay={300}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                <Button variant="primary" href="/signup">Get Started</Button>
                <Button variant="secondary" href="#how-it-works">Learn How It Works →</Button>
              </div>
            </FadeUp>

            <FadeUp delay={400}>
              <p style={{ fontSize: "13px", color: "var(--text-light)", marginTop: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--teal)" }}>🛡</span>
                Trusted by citizens. Built on official data.
              </p>
            </FadeUp>
          </div>

          {/* Right */}
          <FadeUp delay={200} style={{ width: "100%" }}>
            <EligibilityPreviewPanel />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}