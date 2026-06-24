"use client";

import { useEffect, useState }

from "react";

import PageHeader

from "@/components/shared/PageHeader";

import {

  getPrometheus,

} from "@/services/prometheus";

export default function PrometheusPage() {

  const [

    metrics,

    setMetrics

  ] = useState({

    pods: 0,

    deployments: 0,

    nodes: 0,

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

          <h2>Pods</h2>

          <p className="text-3xl font-bold">

            {metrics.pods}

          </p>

        </div>

        <div className="border rounded-xl p-6">

          <h2>Deployments</h2>

          <p className="text-3xl font-bold">

            {metrics.deployments}

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
