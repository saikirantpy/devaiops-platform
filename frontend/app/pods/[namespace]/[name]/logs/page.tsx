"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PageHeader from "@/components/shared/PageHeader";

import {
  getPodLogs,
  PodLogsResponse,
} from "@/services/podLogs";

export default function PodLogsPage() {

  const params = useParams();

  const namespace =
    params.namespace as string;

  const pod =
    params.name as string;

  const [logs, setLogs] =
    useState<PodLogsResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadLogs() {

      try {

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

    }

    loadLogs();

  }, [namespace, pod]);

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
        subtitle="Pod Logs"
      />

      <div className="border rounded-xl overflow-hidden">

        <div className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-auto max-h-[700px] whitespace-pre-wrap">

          {logs?.logs}

        </div>

      </div>

    </div>

  );

}