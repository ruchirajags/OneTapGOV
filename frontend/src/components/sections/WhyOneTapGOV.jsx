"use client";

import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import FadeUp from "../ui/FadeUp";
import { CheckIcon, XIcon } from "../ui/Icons";
import { COMPARISON_ROWS } from "../../lib/constants/schemes";

export default function WhyOneTapGOV() {
  return (
    <section id="why-onetapgov" style={{
      padding: "96px 0",
      background: "var(--bg)",
    }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <SectionLabel>Why OneTapGOV</SectionLabel>
            <SectionHeading>A better way to find what you deserve.</SectionHeading>
          </div>
        </FadeUp>

        {/* Comparison table */}
        <FadeUp delay={100}>
          <div style={{
            borderRadius: "8px",
            background: "#fff",
          }}>
            {/* Column headers */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "var(--navy)",
            }}>
              <div style={{ padding: "20px 32px", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Traditional Process
                </p>
              </div>
              <div style={{ padding: "20px 32px" }}>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--blue-hover)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  OneTapGOV
                </p>
              </div>
            </div>

            {/* Rows */}
            {COMPARISON_ROWS.map((row, i) => (
              <FadeUp key={i} delay={180 + i * 80}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderTop: "1px solid var(--border)",
                  transition: "background 150ms",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFBFC"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div
                      style={{
                        padding: "20px 32px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span style={{ color: "#EF4444", flexShrink: 0 }}>
                        <XIcon size={16} />
                      </span>
                      <span
                        style={{
                          fontSize: "15px",
                          color: "var(--text-muted)",
                        }}
                      >
                        {row.traditional}
                      </span>
                  </div>

                  {/* OneTapGOV */}
                  <div style={{
                    padding: "20px 32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}>
                    <span style={{ color: "#22C55E", flexShrink: 0 }}>
                      <CheckIcon size={16} />
                    </span>
                    <span style={{ fontSize: "15px", color: "var(--navy)", fontWeight: "500" }}>{row.onetap}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

