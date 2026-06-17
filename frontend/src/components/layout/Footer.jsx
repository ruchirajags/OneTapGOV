"use client";

const FOOTER_COLS = [
  {
    heading: "Platform",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Sectors", href: "#sectors" },
    ],
  },
  {
    heading: "Government Resources",
    links: [
      { label: "India.gov.in", href: "https://india.gov.in" },
      { label: "MyGov", href: "https://mygov.in" },
      { label: "UIDAI", href: "https://uidai.gov.in" },
      { label: "DigiLocker", href: "https://digilocker.gov.in" },
      { label: "National Scholarship Portal", href: "https://scholarships.gov.in" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "#fff" }}>
      <div style={{
        maxWidth: "var(--container)",
        margin: "0 auto",
        padding: "64px 24px 40px",
      }}>
        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1.4fr",
          gap: "48px",
          paddingBottom: "48px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>
              <span style={{ color: "#fff" }}>OneTap</span>
              <span style={{ color: "var(--blue-hover)" }}>GOV</span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--border-mid)", lineHeight: "1.6", maxWidth: "240px" }}>
              Your trusted guide to government schemes and benefits.
            </p>
          </div>

          {/* Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "#fff", marginBottom: "16px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {col.heading}
              </p>
              <ul style={{ listStyle: "none" }}>
                {col.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: "10px" }}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      style={{
                        fontSize: "14px",
                        color: "var(--border-mid)",
                        textDecoration: "none",
                        transition: "color 150ms"
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--border-mid)"}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <p style={{ fontSize: "13px", color: "var(--text-light)" }}>
            © 2026 OneTapGOV. All rights reserved.
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-light)", maxWidth: "480px", textAlign: "right" }}>
            OneTapGOV provides guidance and eligibility recommendations. Applications are completed through official government portals.
          </p>
        </div>
      </div>
    </footer>
  );
}