"use client";

export default function MatchResults({ matches }) {
  if (!matches || matches.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--text-muted)" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</div>
        <p style={{ fontSize: "14px" }}>Adjust your profile to see matching schemes.</p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
        Your Potential Matches
      </p>
      <p style={{ fontSize: "12px", color: "var(--text-light)", marginBottom: "20px" }}>
        Based on the information provided
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {matches.map((scheme, i) => (
          <div key={scheme.name} style={{
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
          }}>
            {/* Header row */}
            <div style={{
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: i === 0 ? "#F8FAFF" : "var(--surface)",
            }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--navy)" }}>
                {scheme.name}
              </span>
              <span style={{
                fontSize: "11px",
                fontWeight: "700",
                padding: "3px 10px",
                borderRadius: "20px",
                background: scheme.strength === "High" ? "#DCFCE7" : "#FEF9C3",
                color: scheme.strength === "High" ? "#166534" : "#854D0E",
              }}>
                {scheme.strength} Match
              </span>
            </div>

            {/* Documents */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
              <p style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Required Documents
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {scheme.documents.map(doc => (
                  <span key={doc} style={{
                    fontSize: "11px",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}>
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "11px", color: "var(--text-light)", marginTop: "16px", textAlign: "center" }}>
        Results are for preview only. Final eligibility is subject to official verification.
      </p>
    </div>
  );
}

