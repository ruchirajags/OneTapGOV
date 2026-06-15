"use client";
import { useState, useEffect } from "react";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Sectors", href: "#sectors" },
  { label: "About Us", href: "#about" },
  { label: "Resources", href: "#trust" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: scrolled ? "rgba(248,250,252,0.95)" : "var(--bg)",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      transition: "all 250ms ease",
    }}>
      <div style={{
        maxWidth: "var(--container)",
        margin: "0 auto",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "2px" }}>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", letterSpacing: "-0.02em" }}>
            OneTap
          </span>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--blue)", letterSpacing: "-0.02em" }}>
            GOV
          </span>
        </a>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 150ms",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--navy)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button variant="secondary" href="/login">Log in</Button>
          <Button variant="primary" href="/signup">Sign up</Button>
        </div>
      </div>
    </nav>
  );
}