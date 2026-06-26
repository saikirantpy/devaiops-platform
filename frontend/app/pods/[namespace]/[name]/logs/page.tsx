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

import PodLogsViewer from "@/components/podLogs/PodLogsViewer";
import PodLogsToolbar from "@/components/podLogs/PodLogsToolbar";

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

      <PodLogsViewer
        logs={
          logs?.logs
            .split("\n")
            .filter((line) =>
              line
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .join("\n") ?? ""
        }
      />

    </div>

  );

}