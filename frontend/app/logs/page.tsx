"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import { getLogs, LogItem } from "@/services/logs";

export default function LogsPage() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await getLogs();
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Logs"
        subtitle="Container logs from the DevAIOps platform"
      />

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        logs.map((item) => (
          <div
            key={item.name}
            className="border rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">
              {item.name}
            </h2>

            <pre className="bg-black text-green-400 rounded-lg p-4 overflow-auto text-sm whitespace-pre-wrap">
              {item.logs}
            </pre>
          </div>
        ))
      )}
    </div>
  );
}