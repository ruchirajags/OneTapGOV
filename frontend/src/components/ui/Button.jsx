"use client";

export default function Button({ children, variant = "primary", onClick, href, className = "" }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "var(--font)",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 150ms ease, color 150ms ease, border-color 150ms ease",
    border: "1px solid transparent",
    lineHeight: "1",
  };

  const styles = {
    primary: {
      ...base,
      background: "var(--blue)",
      color: "#fff",
      border: "1px solid var(--blue)",
    },
    secondary: {
      ...base,
      background: "var(--surface)",
      color: "var(--navy)",
      border: "1px solid var(--border)",
    },
  };

  const handleMouseEnter = (e) => {
    if (variant === "primary") e.currentTarget.style.background = "var(--blue-hover)";
    else e.currentTarget.style.borderColor = "var(--border-mid)";
  };

  const handleMouseLeave = (e) => {
    if (variant === "primary") e.currentTarget.style.background = "var(--blue)";
    else e.currentTarget.style.borderColor = "var(--border)";
  };

  if (href) {
    return (
      <a
        href={href}
        style={styles[variant]}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={styles[variant]}
      onClick={onClick}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}