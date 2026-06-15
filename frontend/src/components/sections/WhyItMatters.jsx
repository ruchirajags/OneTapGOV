"use client";
import { useState, useEffect, useRef } from "react";
import SectionLabel from "../ui/SectionLabel";

const TIMELINE_POINTS = [
  { id: "01", text: "Finding schemes across multiple portals." },
  { id: "02", text: "Understanding eligibility requirements." },
  { id: "03", text: "Preparing documents without knowing qualification status." },
  { id: "04", text: "Tracking changing scheme guidelines and updates." },
  { id: "05", text: "Comparing multiple government programs manually." },
  { id: "06", text: "Missing opportunities that match their profile." },
];

const STATS = [
  { value: 100, suffix: "+", label: "Government schemes indexed" },
  { value: 3, suffix: "", label: "Citizen sectors currently supported" },
  { value: 15, suffix: "+", label: "Verified schemes currently available" },
];

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function StatItem({ value, suffix, label }) {
  const { count, ref } = useCountUp(value);
  const [visible, setVisible] = useState(false);
  const visRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (visRef.current) observer.observe(visRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={(el) => { visRef.current = el; }}
      style={{
        paddingTop: "40px",
        paddingBottom: "40px",
        borderBottom: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 600ms ease, transform 600ms ease",
      }}
    >
      <div ref={ref}>
        <p style={{
          fontSize: "clamp(48px, 5vw, 72px)",
          fontWeight: "800",
          color: "var(--navy)",
          letterSpacing: "-0.04em",
          lineHeight: "1",
          marginBottom: "8px",
        }}>
          {count}<span style={{ color: "var(--blue)" }}>{suffix}</span>
        </p>
        <p style={{
          fontSize: "14px",
          color: "var(--text-muted)",
          lineHeight: "1.5",
          maxWidth: "200px",
        }}>
          {label}
        </p>
      </div>
    </div>
  );
}

function Timeline() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineHeight, setLineHeight] = useState(0);
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const interval = setInterval(() => {
            setActiveIndex(i);
            setLineHeight(((i + 1) / TIMELINE_POINTS.length) * 100);
            i++;
            if (i >= TIMELINE_POINTS.length) clearInterval(interval);
          }, 350);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} style={{ position: "relative", paddingLeft: "32px", marginTop: "48px" }}>
      {/* Vertical line track */}
      <div style={{
        position: "absolute",
        left: "0",
        top: "8px",
        bottom: "8px",
        width: "1px",
        background: "var(--border)",
      }} />

      {/* Animated fill line */}
      <div style={{
        position: "absolute",
        left: "0",
        top: "8px",
        width: "1px",
        height: `${lineHeight}%`,
        background: "var(--blue)",
        transition: "height 350ms ease",
      }} />

      {/* Timeline points */}
      {TIMELINE_POINTS.map((point, i) => {
        const isActive = i <= activeIndex;
        return (
          <div
            key={point.id}
            style={{
              paddingBottom: i < TIMELINE_POINTS.length - 1 ? "36px" : "0",
              opacity: isActive ? 1 : 0.35,
              transform: isActive ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 400ms ease, transform 400ms ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
              <span style={{
                fontSize: "11px",
                fontWeight: "700",
                color: isActive ? "var(--blue)" : "var(--text-light)",
                letterSpacing: "0.08em",
                minWidth: "24px",
                transition: "color 400ms ease",
              }}>
                {point.id}
              </span>
              <p style={{
                fontSize: "16px",
                fontWeight: isActive ? "500" : "400",
                color: isActive ? "var(--navy)" : "var(--text-muted)",
                lineHeight: "1.5",
                transition: "color 400ms ease, font-weight 400ms ease",
              }}>
                {point.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function WhyItMatters() {
  return (
    <section
      id="why-it-matters"
      style={{
        padding: "96px 0",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "96px", alignItems: "start" }}>

          {/* Left — headline + timeline */}
          <div>
            <SectionLabel>Why It Matters</SectionLabel>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: "800",
              color: "var(--navy)",
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
            }}>
              Millions of citizens miss out on benefits they qualify for.
            </h2>
            <Timeline />
          </div>

          {/* Right — statistics */}
          <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: "64px" }}>
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}