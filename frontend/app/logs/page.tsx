"use client";

import { useEffect, useMemo, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import {
  getLogs,
  LogItem,
} from "@/services/logs";

export default function LogsPage() {

  const [logs, setLogs] = useState<LogItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [autoRefresh, setAutoRefresh] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState("");

  async function loadLogs() {

    try {

      setLoading(true);

      const data = await getLogs();

      setLogs(data);

      setLastUpdated(
        new Date().toLocaleTimeString()
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadLogs();

  }, []);

  useEffect(() => {

    if (!autoRefresh) return;

    const timer = setInterval(() => {

      loadLogs();

    }, 5000);

    return () => clearInterval(timer);

  }, [autoRefresh]);

  const filteredLogs = useMemo(() => {

    return logs.filter((item) => {

      const query = search.toLowerCase();

      return (

        item.name.toLowerCase().includes(query) ||

        item.logs.toLowerCase().includes(query)

      );

    });

  }, [logs, search]);

  const totalLogLines = useMemo(() => {

    return filteredLogs.reduce(

      (count, item) =>

        count +

        item.logs.split("\n").filter(Boolean).length,

      0

    );

  }, [filteredLogs]);

  function copyLogs(logs: string) {

    navigator.clipboard.writeText(logs);

    alert("Logs copied.");

  }

  function downloadLogs(
    name: string,
    logs: string
  ) {

    const blob = new Blob(

      [logs],

      { type: "text/plain" }

    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = `${name}.log`;

    a.click();

    URL.revokeObjectURL(url);

  }

  function getIcon(name: string) {

    if (
      name.includes("backend")
    )
      return "🐳";

    if (
      name.includes("frontend")
    )
      return "🌐";

    if (
      name.includes("minikube")
    )
      return "☸️";

    if (
      name.includes("grafana")
    )
      return "📊";

    if (
      name.includes("prometheus")
    )
      return "📈";

    return "📦";

  }

  function highlightLine(
    line: string
  ) {

    if (
      line.includes("ERROR")
    ) {

      return (
        <span className="text-red-400">
          {line}
        </span>
      );

    }

    if (
      line.includes("WARN")
    ) {

      return (
        <span className="text-yellow-400">
          {line}
        </span>
      );

    }

    if (
      line.includes("INFO")
    ) {

      return (
        <span className="text-green-400">
          {line}
        </span>
      );

    }

    return (
      <span>{line}</span>
    );

  }

  return (

    <div className="space-y-8">

      <PageHeader

        title="Logs"

        subtitle="Live container logs"

      />

      {/* Toolbar */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <input

          type="text"

          value={search}

          placeholder="🔍 Search container or log..."

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="border rounded-lg px-4 py-2 w-full lg:w-96"

        />

        <div className="flex items-center gap-3">

          <button

            onClick={loadLogs}

            className="border rounded-lg px-4 py-2 hover:bg-gray-100"

          >

            🔄 Refresh

          </button>

          <label className="flex items-center gap-2">

            <input

              type="checkbox"

              checked={autoRefresh}

              onChange={(e) =>
                setAutoRefresh(
                  e.target.checked
                )
              }

            />

            Auto Refresh

          </label>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-5">

          <h3 className="text-gray-500">

            Containers

          </h3>

          <p className="text-3xl font-bold">

            {filteredLogs.length}

          </p>

        </div>

        <div className="border rounded-xl p-5">

          <h3 className="text-gray-500">

            Log Lines

          </h3>

          <p className="text-3xl font-bold">

            {totalLogLines}

          </p>

        </div>

        <div className="border rounded-xl p-5">

          <h3 className="text-gray-500">

            Last Updated

          </h3>

          <p className="text-xl font-semibold">

            {lastUpdated}

          </p>

        </div>

      </div>

      {loading && (

        <div className="text-center">

          Loading logs...

        </div>

      )}

      {!loading && (        <>
          {filteredLogs.length === 0 && (
            <div className="border rounded-xl p-10 text-center text-gray-500">
              No logs found.
            </div>
          )}

          {filteredLogs.map((item) => (
            <div
              key={item.name}
              className="border rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Header */}

              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-6 py-4">

                <div className="flex items-center gap-3">

                  <span className="text-2xl">
                    {getIcon(item.name)}
                  </span>

                  <div>

                    <h2 className="font-bold text-lg">
                      {item.name}
                    </h2>

                    <p className="text-xs text-green-600">
                      ● LIVE
                    </p>

                  </div>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      copyLogs(item.logs)
                    }
                    className="border rounded-lg px-3 py-2 hover:bg-gray-200 transition"
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={() =>
                      downloadLogs(
                        item.name,
                        item.logs
                      )
                    }
                    className="border rounded-lg px-3 py-2 hover:bg-gray-200 transition"
                  >
                    📥 Download
                  </button>

                </div>

              </div>

              {/* Terminal */}

              <div className="bg-gray-950 text-green-400 font-mono text-sm overflow-auto max-h-[500px]">

                {item.logs
                  .split("\n")
                  .filter(Boolean)
                  .map((line, index) => (

                    <div
                      key={index}
                      className="flex border-b border-gray-800"
                    >

                      <div
                        className="
                        w-16
                        text-right
                        pr-4
                        py-1
                        text-gray-500
                        select-none
                        "
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 py-1 pr-4 whitespace-pre-wrap">

                        {highlightLine(line)}

                      </div>

                    </div>

                  ))}

              </div>

            </div>

          ))}

        </>
      )}

    </div>

  );

}
