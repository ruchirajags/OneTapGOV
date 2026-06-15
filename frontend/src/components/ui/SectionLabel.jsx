export default function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--teal)",
      marginBottom: "16px",
    }}>
      {children}
    </p>
  );
}