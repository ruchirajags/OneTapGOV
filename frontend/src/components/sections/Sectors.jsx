"use client";

import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import FadeUp from "../ui/FadeUp";
import SectorRow from "../landing/SectorRow";
import { SECTORS } from "../../lib/constants/schemes";

export default function Sectors() {
  return (
    <section id="sectors" style={{
      padding: "96px 0",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <SectionLabel>Built For Every Citizen</SectionLabel>
            <SectionHeading>Explore opportunities across key sectors</SectionHeading>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", marginTop: "16px" }}>
              Explore opportunities across education, agriculture, and women-focused initiatives.
            </p>
          </div>
        </FadeUp>

        {/* Directory */}
        <div style={{
            marginTop: "48px",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}>
            {SECTORS.map((sector, i) => (
              <FadeUp key={sector.id} delay={120 + i * 120}>
                <SectorRow
                  sector={sector}
                  isLast={i === SECTORS.length - 1}
                />
              </FadeUp>
            ))}
          </div>

        {/* Link */}
        <FadeUp delay={200}>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <a href="#" style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--blue)",
              textDecoration: "none",
            }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
            >
              View all sectors and schemes →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

