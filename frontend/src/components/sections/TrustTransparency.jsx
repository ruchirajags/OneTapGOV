"use client";

import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import FadeUp from "../ui/FadeUp";
import { TRUST_PILLARS } from "../../lib/constants/schemes";

export default function TrustTransparency() {
  return (
    <section id="trust" style={{ padding: "96px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <FadeUp>
          <div style={{ marginBottom: "64px" }}>
            <SectionLabel>Trust & Transparency</SectionLabel>
            <SectionHeading>Built On Verified Information.</SectionHeading>
          </div>
        </FadeUp>

        {/* Three pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0" }}>
          {TRUST_PILLARS.map((pillar, i) => (
            <FadeUp key={pillar.number} delay={i * 100}>
              <div style={{
                padding: "40px 40px 40px 0",
                borderRight: i < TRUST_PILLARS.length - 1 ? "1px solid var(--border)" : "none",
                paddingRight: i < TRUST_PILLARS.length - 1 ? "40px" : "0",
                paddingLeft: i > 0 ? "40px" : "0",
              }}>
                <span style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "var(--teal)",
                  letterSpacing: "0.08em",
                  marginBottom: "16px",
                }}>
                  {pillar.number}
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "var(--navy)", marginBottom: "12px" }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: "1.7" }}>
                  {pillar.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Disclaimer note */}
        <FadeUp delay={300}>
          <div style={{
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border)",
          }}>
            <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6", maxWidth: "600px" }}>
              OneTapGOV helps users discover and prepare. Final applications are submitted through official government channels.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}