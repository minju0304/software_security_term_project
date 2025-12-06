// src/pages/PoCPage.tsx
import { useState } from "react";
import PoCRunner from "../components/PoCRunner";

const pocList = [
  {
    id: "chrome_calc",
    name: "Chrome Calc 기반 Fingerprinting",
    path: "/pocs/browser/poc_chrome.html",
  },
  {
    id: "chrome_width",
    name: "Chrome Width 기반 Fingerprinting",
    path: "/pocs/browser/poc_chrome.html",
  },
  {
    id: "firefox_os",
    name: "Firefox OS Fingerprinting",
    path: "/pocs/browser/poc_firefox.html",
  },
];

export default function PoCPage() {
  const [selected, setSelected] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* LEFT PANEL - PoC List */}
      <div
        style={{
          flex: "0 0 220px",
          background: "#f0f0f0",
          padding: "16px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <h2>PoC 목록</h2>
        {pocList.map((poc) => (
          <div
            key={poc.id}
            onClick={() => setSelected(poc)}
            style={{
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "6px",
              cursor: "pointer",
              border:
                selected?.id === poc.id ? "1px solid #1976d2" : "1px solid #ccc",
              background: selected?.id === poc.id ? "#1976d2" : "#fff",
              color: selected?.id === poc.id ? "#fff" : "#000",
            }}
          >
            <b>{poc.name}</b>
          </div>
        ))}
      </div>

      {/* CENTER PANEL - PoC Runner */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selected ? (
          <PoCRunner
            pocId={selected.id}
            url={selected.path}
            onResult={(data) => setLogs((prev) => [data, ...prev])}
          />
        ) : (
          <div style={{ color: "#777", marginTop: "40px" }}>
            왼쪽에서 PoC를 선택하세요.
          </div>
        )}
      </div>

      {/* RIGHT PANEL - Logs */}
      <div
        style={{
          flex: "0 0 300px",
          background: "#fafafa",
          padding: "16px",
          borderLeft: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <h3>로그</h3>

        {logs.map((log, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "12px",
              background: "white",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          >
            <b>{log.pocId}</b>  
            <span style={{ fontSize: "12px", color: "#777" }}>
              {" "}
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            <pre
              style={{
                background: "#f3f3f3",
                padding: "8px",
                marginTop: "6px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {JSON.stringify(log.result, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
