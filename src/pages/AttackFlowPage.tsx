// src/pages/AttackFlowPage.tsx
import { useState } from "react";
import PoCRunner from "../components/PoCRunner";
import NetworkExfilPanel from "../components/NetworkExfilPanel";
import AttackerDashboard from "../components/AttackerDashboard";

export default function AttackFlowPage() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<any>(null);

  return (
    <div style={{ padding: "10px" }}>
      <h1>공격 시나리오 흐름 (Attack Flow Simulation)</h1>

      <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setStep(n)}
            style={{
              padding: "10px 10px",
              borderRadius: "6px",
              border: step === n ? "2px solid #1976d2" : "1px solid #ccc",
              background: step === n ? "#e3f2fd" : "#fff",
              cursor: "pointer",
            }}
          >
            Step {n}
          </button>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2>STEP 1 — 브라우저 Fingerprinting 수행</h2>
          <p>피해자의 브라우저 환경(OS, Layout 계산 정보 등)을 추출합니다.</p>

          <div style={{ height: "70vh" }}>
            <PoCRunner
              pocId="chrome_calc"
              url="/pocs/browser/poc_chrome.html"
              onResult={(data) => setResult(data.result)}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>STEP 2 — Exfiltration Payload 생성</h2>
          <p>아래 패널에서 Fingerprinting 결과 기반 이미지 요청 payload를 생성합니다.</p>

          <NetworkExfilPanel />
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>STEP 3 — Attacker Dashboard 모니터링</h2>
          <p>피해자가 payload를 열면 실제 image request가 들어옵니다.</p>

          <div style={{ height: "75vh" }}>
            <AttackerDashboard />
          </div>
        </div>
      )}
    </div>
  );
}
