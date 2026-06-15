"use client";
import { PROFILE_OPTIONS } from "../../../lib/constants/schemes";

export default function ProfileBuilder({ profile, onChange }) {
  const select = (field, value) => onChange({ ...profile, [field]: value });

  const selectStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    background: "var(--surface)",
    color: "var(--navy)",
    fontFamily: "var(--font)",
    cursor: "pointer",
    outline: "none",
  };

  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "20px" }}>
        I am a
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Role */}
        <div>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
            Who are you?
          </label>
          <select
            value={profile.role}
            onChange={e => select("role", e.target.value)}
            style={selectStyle}
          >
            {PROFILE_OPTIONS.roles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Income */}
        <div>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
            Annual Income
          </label>
          <select
            value={profile.income}
            onChange={e => select("income", e.target.value)}
            style={selectStyle}
          >
            {PROFILE_OPTIONS.incomeRanges.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Academic percentage */}
        {profile.role === "Student" && (
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
              Academic Percentage
            </label>
            <select
              value={profile.percentage}
              onChange={e => select("percentage", e.target.value)}
              style={selectStyle}
            >
              {PROFILE_OPTIONS.percentages.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        )}

        {/* Gender */}
        <div>
          <label style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
            Gender
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Male", "Female", "Other"].map(g => (
              <button key={g}
                onClick={() => select("gender", g)}
                style={{
                  flex: 1,
                  padding: "9px",
                  fontSize: "13px",
                  fontWeight: "500",
                  border: "1px solid",
                  borderColor: profile.gender === g ? "var(--blue)" : "var(--border)",
                  borderRadius: "8px",
                  background: profile.gender === g ? "#EFF6FF" : "var(--surface)",
                  color: profile.gender === g ? "var(--blue)" : "var(--text-muted)",
                  cursor: "pointer",
                  fontFamily: "var(--font)",
                  transition: "all 150ms",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

