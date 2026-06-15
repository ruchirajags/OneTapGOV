"use client";

import { useState } from "react";

export default function StepCard({ step }) {
  const [hovered, setHovered] = useState(false);
  const icons = { "01": "🔍", "02": "✅", "03": "📋" };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        maxHeight: hovered ? "400px" : "80px",
        overflow: "hidden",
        borderLeft: hovered ? "3px solid var(--blue)" : "3px solid transparent",
        background: hovered ? "var(--surface, #fff)" : "transparent",
        boxShadow: hovered ? "0 8px 32px rgba(37,99,235,0.08)" : "none",
        borderRadius: "12px",
        padding: "24px",
        cursor: "pointer",
        transition: "max-height 400ms ease, box-shadow 300ms ease, background 300ms ease, border-color 300ms ease",
      }}
    >
      {/* Collapsed header row — always visible */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        height: "32px",
      }}>
        <span style={{ fontSize: "28px", lineHeight: "1" }}>{icons[step.number]}</span>
        <span style={{
          fontSize: "12px",
          fontWeight: "700",
          color: "var(--text-light)",
          letterSpacing: "0.08em",
          minWidth: "22px",
        }}>
          {step.number}
        </span>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "var(--navy)",
          margin: 0,
          whiteSpace: "nowrap",
        }}>
          {step.title}
        </h3>
      </div>

      {/* Expanded content — description + capabilities */}
      <div style={{
        marginTop: "18px",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 300ms ease 80ms, transform 300ms ease 80ms",
      }}>
        <p style={{
          fontSize: "14px",
          color: "var(--text-muted)",
          lineHeight: "1.7",
          marginBottom: "16px",
        }}>
          {step.description}
        </p>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {step.capabilities.map((cap, index) => (
            <li key={cap} style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              padding: "6px 0",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 300ms ease ${index * 60}ms, transform 300ms ease ${index * 60}ms`,
            }}>
              <span style={{ color: "var(--teal)", fontSize: "11px" }}>◆</span>
              {cap}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
