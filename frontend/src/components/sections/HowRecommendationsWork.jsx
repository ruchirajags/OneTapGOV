"use client";

import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import FadeUp from "../ui/FadeUp";
import { FLOW_NODES } from "../../lib/constants/schemes";

const ICONS = {
  info: "👤",
  rules: "🛡",
  database: "🗄",
  engine: "⚙️",
  matches: "✅",
};

export default function HowRecommendationsWork() {
  return (
    <section id="how-recommendations-work" style={{ padding: "96px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <SectionLabel>How Recommendations Work</SectionLabel>
            <SectionHeading>Transparent. Verified. Reliable.</SectionHeading>
          </div>
        </FadeUp>

        {/* Flow */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0",
          position: "relative",
        }}>
          {FLOW_NODES.map((node, i) => (
            <div key={node.id} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
              {/* Node */}
              <FadeUp delay={i * 120} style={{ flex: 1 }}>
                <div style={{ textAlign: "center" }}>
                  {/* Icon circle */}
                  <div style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: i === FLOW_NODES.length - 1 ? "#EFF6FF" : "var(--surface)",
                    border: `1px solid ${i === FLOW_NODES.length - 1 ? "#BFDBFE" : "var(--border)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: "24px",
                  }}>
                    {ICONS[node.id]}
                  </div>

                  <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--navy)", marginBottom: "6px" }}>
                    {node.label}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5", padding: "0 8px" }}>
                    {node.description}
                  </p>
                </div>
              </FadeUp>

              {/* Arrow between nodes */}
              {i < FLOW_NODES.length - 1 && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "20px",
                  color: "var(--border-mid)",
                  fontSize: "18px",
                  flexShrink: 0,
                  padding: "20px 4px 0",
                }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <FadeUp delay={600}>
          <div style={{
            marginTop: "56px",
            padding: "20px 28px",
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: "10px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "15px", color: "#166534", fontWeight: "500" }}>
              🛡 Every recommendation includes an explanation of why you qualify.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}