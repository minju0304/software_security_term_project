import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "PleaseJ0ngG@ngRightNow";
const SERVER_URL =
  "https://2025f-skku-cascading-spy-sheets-pro.vercel.app/admin/tracking-logs";

interface Props {
  ids: string[];   // 👉 step1에서 받은 id 배열
}

export default function TrackingResultPage({ ids }: Props) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    if (!ids || ids.length === 0) return;

    try {
      setLoading(true);

      // 서버는 ID 하나씩 받되, 우리는 병렬 조회
      const requests = ids.map((id) =>
        axios.get(SERVER_URL, {
          headers: { "x-api-key": API_KEY },
          params: { id },
        })
      );

      const responses = await Promise.all(requests);

      // 결과 합치기
      const allLogs = responses.flatMap((res) => res.data.results ?? []);

      setLogs(allLogs);
    } catch (err) {
      console.error("❌ Error fetching logs:", err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Step 2 열릴 때 자동 조회
  useEffect(() => {
    fetchLogs();
  }, [ids]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📊 Fingerprinting Tracking Log Viewer</h1>
      <p style={{ color: "#666" }}>Step 1에서 발생한 모든 ID의 서버 기록을 조회합니다.</p>

      <div style={{ marginTop: "20px" }}>
        {loading && <p>🔄 조회 중...</p>}

        {!loading && logs.length === 0 && (
          <p style={{ color: "#999" }}>📭 조회된 로그가 없습니다.</p>
        )}

        {logs.length > 0 && (
          <table
            style={{
              marginTop: "16px",
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ background: "#eee" }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>OS</th>
                <th style={thStyle}>Client</th>
                <th style={thStyle}>Font</th>
                <th style={thStyle}>Installed?</th>
                <th style={thStyle}>Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={tdStyle}>{log.id}</td>
                  <td style={tdStyle}>{log.os ?? "-"}</td>
                  <td style={tdStyle}>{log.client ?? "-"}</td>
                  <td style={tdStyle}>{log.font ?? "-"}</td>
                  <td style={tdStyle}>
                    {log.isFontInstalled !== undefined
                      ? log.isFontInstalled.toString()
                      : "-"}
                  </td>
                  <td style={tdStyle}>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ccc",
};

const tdStyle: React.CSSProperties = {
  padding: "8px",
  fontSize: "14px",
};
