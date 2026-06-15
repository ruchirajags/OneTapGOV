export default function SectionHeading({ children, style = {} }) {
  return (
    <h2 style={{
      fontSize: "clamp(28px, 4vw, 40px)",
      fontWeight: "700",
      color: "var(--navy)",
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      ...style,
    }}>
      {children}
    </h2>
  );
}