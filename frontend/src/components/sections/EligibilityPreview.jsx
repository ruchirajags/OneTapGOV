"use client";
import { useState, useEffect } from "react";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import FadeUp from "../ui/FadeUp";
import Button from "../ui/Button";
import ProfileBuilder from "./eligibility/ProfileBuilder";
import MatchResults from "./eligibility/MatchResults";
import { SCHEME_MATCHES } from "../../lib/constants/schemes";

const DEMO_PROFILES = [
  { role: "Student", income: "₹2,50,001 – ₹5,00,000", percentage: "85% and above", gender: "Female" },
  { role: "Farmer", income: "Below ₹1,00,000", percentage: "Below 50%", gender: "Male" },
  { role: "Woman Entrepreneur", income: "₹5,00,001 – ₹8,00,000", percentage: "60% – 75%", gender: "Female" },
  { role: "Senior Citizen", income: "₹1,00,001 – ₹2,50,000", percentage: "Below 50%", gender: "Male" },
  { role: "Job Seeker", income: "₹2,50,001 – ₹5,00,000", percentage: "75% – 85%", gender: "Male" },
];

export default function EligibilityPreview() {
  const [profile, setProfile] = useState(DEMO_PROFILES[0]);
  const [demoIndex, setDemoIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setDemoIndex(prev => (prev + 1) % DEMO_PROFILES.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    setProfile(DEMO_PROFILES[demoIndex]);
  }, [demoIndex]);

  const handleProfileChange = (newProfile) => {
    setProfile(newProfile);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  const matches = SCHEME_MATCHES[profile.role] || [];

  return (
    <section id="eligibility-preview" style={{ padding: "96px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <SectionLabel>Try It Now</SectionLabel>
            <SectionHeading>See how OneTapGOV works for you</SectionHeading>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", marginTop: "16px" }}>
              Adjust your profile to see matching government schemes instantly.
            </p>
          </div>
        </FadeUp>

        {/* Interactive Panel */}
        <FadeUp delay={100}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
            background: "var(--surface)",
            boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
          }}>
            {/* Left — Profile Builder */}
            <div style={{
              padding: "36px 32px",
              borderRight: "1px solid var(--border)",
              background: "var(--bg)",
            }}>
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "var(--navy)", marginBottom: "4px" }}>
                  Try Eligibility Preview
                </p>
                <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  See how OneTapGOV finds schemes relevant to you.
                </p>
              </div>

              <div style={{
                opacity: fade ? 1 : 0,
                transition: "opacity 300ms ease",
              }}>
                <ProfileBuilder profile={profile} onChange={handleProfileChange} />
              </div>

              <div style={{ marginTop: "28px" }}>
                <Button variant="primary" style={{ width: "100%" }}>
                  Find Schemes
                </Button>
                <div style={{
                  marginTop: "16px",
                  height: "2px",
                  background: "var(--border)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    background: "var(--blue)",
                    animation: paused ? "none" : "progressBar 3s linear infinite",
                    borderRadius: "2px",
                  }} />
                </div>
                <style>{`
                  @keyframes progressBar {
                    from { width: 0%; }
                    to { width: 100%; }
                  }
                `}</style>
              </div>
            </div>

            {/* Right — Match Results */}
            <div style={{ padding: "36px 32px" }}>
              <div style={{
                opacity: fade ? 1 : 0,
                transition: "opacity 300ms ease",
                height: "100%",
              }}>
                <MatchResults matches={matches} />
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

