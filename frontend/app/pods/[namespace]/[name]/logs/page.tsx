"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";

import PageHeader from "@/components/shared/PageHeader";

import {
  getPodLogs,
  PodLogsResponse,
} from "@/services/podLogs";

import {
  PodLogsToolbar,
  PodLogsViewer,
  PodLogsStats,
  PodLogsActions,
} from "@/components/podLogs";

export default function PodLogsPage() {

  const params = useParams();

  const namespace = params.namespace as string;

  const pod = params.name as string;

  const [logs, setLogs] =
    useState<PodLogsResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");
  const [lastUpdated, setLastUpdated] =
    useState("");
  const refreshLogs = useCallback(
    async () => {
 
    try {

      setLoading(true);

      const data =
        await getPodLogs(
          namespace,
          pod
        );

      setLogs(data);
      setLastUpdated(
       new Date().toLocaleTimeString()
      );
    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  
  },
  [namespace, pod]
);

useEffect(() => {

  refreshLogs();

}, [refreshLogs]);


  const allLines =
    logs?.logs
        .split("\n")
        .filter(Boolean) ?? [];

  const filteredLines =
    allLines.filter((line) =>
        line
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {
    return (

      <div className="space-y-8">

        <PageHeader
          title="Pod Logs"
          subtitle="Loading logs..."
        />

        <div className="border rounded-xl p-8 text-center">

          Loading...

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <PageHeader
        title={pod}
        subtitle={`Logs for ${namespace}/${pod}`}
      />

      <PodLogsToolbar
        search={search}
        setSearch={setSearch}
        refresh={refreshLogs}
      />

      <div className="border rounded-xl p-6">

        <h2 className="text-xl font-bold">

          Pod Logs

        </h2>

        <p className="text-gray-500 mt-2">

          Showing the latest logs from the Kubernetes pod.

        </p>

      </div>

        <PodLogsStats
        totalLines={allLines.length}
        filteredLines={filteredLines.length}
        lastUpdated={lastUpdated}
        />

        <PodLogsViewer
        logs={filteredLines.join("\n")}
        />

        <PodLogsActions
        logs={logs?.logs ?? ""}
        podName={pod}
        />

    </div>

  );

}