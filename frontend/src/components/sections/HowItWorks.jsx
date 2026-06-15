"use client";

import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import FadeUp from "../ui/FadeUp";
import StepCard from "../landing/StepCard";
import { HOW_IT_WORKS_STEPS } from "../../lib/constants/schemes";

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "96px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>A simple 3-step journey</SectionHeading>
            <div style={{
              width: "60px",
              height: "3px",
              background: "var(--blue)",
              margin: "20px auto 0",
              borderRadius: "2px",
            }} />
          </div>
        </FadeUp>

        {/* Thin horizontal divider below header */}
        <div style={{
          height: "1px",
          background: "var(--border)",
          marginBottom: "40px",
        }} />

        {/* Steps — 3 column grid, no vertical dividers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <FadeUp key={step.number} delay={i * 120}>
              <StepCard step={step} />
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Mobile responsive: expand all cards on small screens */}
      <style>{`
        @media (max-width: 768px) {
          #how-it-works > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
          #how-it-works > div > div:last-of-type > div > div {
            max-height: 400px !important;
            border-left: 3px solid var(--blue) !important;
            background: var(--surface, #fff) !important;
          }
          #how-it-works > div > div:last-of-type > div > div div,
          #how-it-works > div > div:last-of-type > div > div li {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
