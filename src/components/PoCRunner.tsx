import { useEffect, useMemo, useState } from "react";

interface Props {
  title: string;
  files: {
    os: string;
    browser: string;
    font: string;
  };
  onResult: (data: any) => void;
}

export default function PoCRunner({ title, files, onResult }: Props) {
  // 모든 iframe이 공유할 sessionId
  const sessionId = useMemo(() => Math.random().toString(16).slice(2), []);

  // 3개 결과 저장
  const [fp, setFp] = useState({
    os: null as string | null,
    browser: null as string | null,
    font: null as string | null,
    installed: null as boolean | null,
  });

  const SERVER = "https://2025f-skku-cascading-spy-sheets-pro.vercel.app";

  // 메시지 핸들링
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type !== "poc-result") return;

      const res = event.data.result;
      res.id = sessionId;

      console.log(`[${title}] Fragment Received →`, res);

      onResult(res);

      setFp((prev) => ({ ...prev, ...res }));
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onResult, title, sessionId]);

  // 모든 값이 모이면 딱 1번 서버 전송
  useEffect(() => {
    const { os, browser, font, installed } = fp;

    if (!os || !browser || !font || installed === null) return;

    const url =
      `${SERVER}/image` +
      `?id=${encodeURIComponent(sessionId)}` +
      `&os=${encodeURIComponent(os)}` +
      `&client=${encodeURIComponent(browser)}` +
      `&font=${encodeURIComponent(font)}` +
      `&isFontInstalled=${installed}`;

    console.log("🔥 FINAL Tracking Sent →", url);

    new Image().src = url;
  }, [fp, sessionId]);

  return (
    <div>
      <h2>{title}</h2>

      {/* OS test */}
      <iframe
        src={`${files.os}?id=${sessionId}`}
        sandbox="allow-scripts allow-same-origin"
        style={{ width: "1px", height: "1px", border: "none" }}
      />

      {/* Browser test */}
      <iframe
        src={`${files.browser}?id=${sessionId}`}
        sandbox="allow-scripts allow-same-origin"
        style={{ width: "1px", height: "1px", border: "none" }}
      />

      {/* Font test */}
      <iframe
        src={`${files.font}?id=${sessionId}`}
        sandbox="allow-scripts allow-same-origin"
        style={{ width: "1px", height: "1px", border: "none" }}
      />
    </div>
  );
}
