"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import {
  getPrometheus,
  PrometheusResponse,
} from "@/services/prometheus";

export default function PrometheusPage() {

  const [metrics, setMetrics] =
    useState<PrometheusResponse>({

      nodes: 0,

      cpu_usage: 0,

      memory_usage: 0,

    });

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getPrometheus();

        setMetrics(data);

      } catch (error) {

        console.error(error);

      }

    }

    load();

  }, []);

  return (

    <div className="space-y-8">

      <PageHeader
        title="Prometheus"
        subtitle="Cluster Metrics"
      />

      <div className="grid grid-cols-3 gap-6">

        <div className="border rounded-xl p-6">

          <h2>CPU Usage</h2>

          <p className="text-3xl font-bold">

            {metrics.cpu_usage}%

          </p>

        </div>

        <div className="border rounded-xl p-6">

          <h2>Memory Usage</h2>

          <p className="text-3xl font-bold">

            {metrics.memory_usage}%

          </p>

        </div>

        <div className="border rounded-xl p-6">

          <h2>Nodes</h2>

          <p className="text-3xl font-bold">

            {metrics.nodes}

          </p>

        </div>

      </div>

    </div>

  );
}