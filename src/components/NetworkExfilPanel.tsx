import { useState } from "react";

export default function NetworkExfilPanel() {
  

  const [status, setStatus] = useState("아직 테스트 안함");

  const sendImageRequest = () => {
    const img = new Image();

    img.onload = () => {
      setStatus("✔ 이미지 정상 수신됨 (1×1 tracking pixel)");
    };

    img.onerror = () => {
      setStatus("❌ 이미지 요청 실패");
    };

    img.src =
      "https://2025f-skku-cascading-spy-sheets-pro.vercel.app/image?id=test123";
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Tracking Pixel Test</h2>
      <button
        onClick={sendImageRequest}
        style={{
          padding: "10px 14px",
          background: "#1976d2",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        이미지 요청 보내기
      </button>

      <div
        style={{
          marginTop: "16px",
          padding: "10px",
          background: "#f3f3f3",
          borderRadius: "6px",
        }}
      >
        {status}
      </div>
    </div>
  );
}
