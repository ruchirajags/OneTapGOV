"use client";
import { useState } from "react";

export default function SectorRow({ sector, isLast }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isActive = open || hovered;

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        borderBottom: isLast ? "none" : `1px solid ${hovered ? "var(--blue)" : "var(--border)"}`,
        borderLeft: isActive ? "3px solid var(--blue)" : "3px solid transparent",
        background: isActive ? "#F8FAFF" : "transparent",
        transition: "all 200ms ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "24px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          textAlign: "left",
        }}
      >
        {/* Icon */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: isActive ? "#EFF6FF" : "var(--bg)",
          border: `1px solid ${isActive ? "#BFDBFE" : "var(--border)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          flexShrink: 0,
          transition: "all 200ms ease",
        }}>
          {sector.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "17px", fontWeight: "600", color: isActive ? "var(--blue)" : "var(--navy)", transition: "color 200ms ease", marginBottom: "2px" }}>
            {sector.title}
          </p>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", transition: "color 200ms ease" }}>
            {sector.description}
          </p>
        </div>

        {/* Badge + chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
          <span style={{ fontSize: "12px", color: isActive ? "var(--blue)" : "var(--text-muted)", transition: "color 200ms ease" }}>
            {sector.schemes.length} Schemes
          </span>
          <span style={{
            fontSize: "16px",
            color: isActive ? "var(--blue)" : "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 250ms ease, color 200ms ease",
            display: "inline-block",
          }}>
            ⌄
          </span>
        </div>
      </button>

      {/* Expanded schemes */}
      <div style={{
        maxHeight: open ? "300px" : "0",
        overflow: "hidden",
        transition: "max-height 300ms ease",
      }}>
        <div style={{
          paddingBottom: "24px",
          paddingLeft: "88px",
          paddingRight: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          {sector.schemes.map((scheme, i) => (
            <span key={scheme} style={{
              fontSize: "13px",
              padding: "6px 14px",
              borderRadius: "20px",
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              color: "var(--blue)",
              fontWeight: "500",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(6px)",
              transition: `all 200ms ease ${i * 40}ms`,
            }}>
              {scheme}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}