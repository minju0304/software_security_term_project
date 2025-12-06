// src/pages/DashboardPage.tsx
import AttackerDashboard from "../components/AttackerDashboard";
import NetworkExfilPanel from "../components/NetworkExfilPanel";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* LEFT — Attacker Dashboard */}
      <div
        style={{
          flex: 1,
          borderRight: "1px solid #ddd",
          overflow: "hidden",
        }}
      >
        <AttackerDashboard />
      </div>

      {/* RIGHT — Exfiltration Payload Generator */}
      <div
        style={{
          flex: "0 0 380px",
          background: "#f7f7f7",
          overflowY: "auto",
          padding: "16px",
        }}
      >
        <NetworkExfilPanel />
      </div>

    </div>
  );
}
