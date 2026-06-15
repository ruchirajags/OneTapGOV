"use client";

import FadeUp from "../ui/FadeUp";
import Button from "../ui/Button";

export default function FinalCTA() {
  return (
    <section style={{
      padding: "120px 0",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "0 24px",
        textAlign: "center",
      }}>
        <FadeUp>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: "800",
            color: "var(--navy)",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            marginBottom: "20px",
          }}>
            Stop Searching.<br />
            <span style={{ color: "var(--blue)" }}>Start Discovering.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={100}>
          <p style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "40px" }}>
            Find the schemes you may qualify for and prepare with confidence.
          </p>
        </FadeUp>

        <FadeUp delay={200}>
          <Button variant="primary" href="/signup">
            Get Started
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}