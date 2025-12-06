// src/pages/AttackFlowPage.tsx
import { useState } from "react";
import PoCRunner from "./components/PoCRunner";

export default function AttackFlowPage() {
  const [step, setStep] = useState(1);

  // 👉 Fingerprinting 결과 저장
  const [osResult, setOsResult] = useState<any>(null);
  const [browserResult, setBrowserResult] = useState<any>(null);
  const [fontResult, setFontResult] = useState<any>(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🕵️ 공격 시나리오 흐름 (Attack Flow Simulation)</h1>

      {/* STEP 버튼 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {[1, 2].map((n) => (
          <button
            key={n}
            onClick={() => setStep(n)}
            style={{
              padding: "10px 18px",
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

      {/* STEP 1: Fingerprinting */}
      {step === 1 && (
        <div>
          <h2>STEP 1 — 브라우저 Fingerprinting 수행</h2>
          <p>피해자의 브라우저(OS, Layout, Font 등)를 추출합니다.</p>
          {/* 결과 출력 박스 */}
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              background: "#f7f7f7",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <h3>🧪 Fingerprinting 결과</h3>

            <pre>{JSON.stringify({ osResult, browserResult, fontResult }, null, 2)}</pre>
          </div>
          <div style={{ height: "70vh", overflowY: "scroll" }}>
            {/* OS TEST */}
            <PoCRunner
              title="All Fingerprinting"
              files={{
                os: "/src/public/my-os-test.html",
                browser: "/src/public/my-browser-test.html",
                font: "/src/public/font-test.html",
              }}
              onResult={(r) => {
              console.log("RESULT →", r);

              if (r.os) setOsResult(r.os);
              if (r.browser) setBrowserResult(r.browser);
              if (r.font) setFontResult({ font: r.font, installed: r.installed });
            }}
            />

          </div>
        </div>
      )}

    </div>
  );
}
