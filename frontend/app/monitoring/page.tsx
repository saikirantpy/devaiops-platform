"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import { getMonitoring }

from "@/services/monitoring";

export default function MonitoringPage() {

  const [

    monitoring,

    setMonitoring

  ] = useState({

    cluster_status: "Loading...",

    pending_pods: 0,

    unhealthy_deployments: 0,

    total_deployments: 0,

  });

  useEffect(() => {

    async function loadMonitoring() {

      try {

        const data =

          await getMonitoring();

        setMonitoring(data);

      }

      catch (error) {

        console.error(error);

      }

    }

    loadMonitoring();

  }, []);

  return (

    <div className="space-y-8">

      <PageHeader

        title="Monitoring"

        subtitle="Cluster monitoring overview"

      />

      <div

        className="grid grid-cols-2 md:grid-cols-4 gap-6"

      >

        <div

          className="border rounded-xl p-6"

        >

          <h3>

            Cluster

          </h3>

          <p

            className="text-3xl font-bold"

          >

            {

              monitoring.cluster_status

            }

          </p>

        </div>

        <div

          className="border rounded-xl p-6"

        >

          <h3>

            Pending Pods

          </h3>

          <p

            className="text-3xl font-bold"

          >

            {

              monitoring.pending_pods

            }

          </p>

        </div>

        <div

          className="border rounded-xl p-6"

        >

          <h3>

            Unhealthy Deployments

          </h3>

          <p

            className="text-3xl font-bold"

          >

            {

              monitoring.unhealthy_deployments

            }

          </p>

        </div>

        <div

          className="border rounded-xl p-6"

        >

          <h3>

            Total Deployments

          </h3>

          <p

            className="text-3xl font-bold"

          >

            {

              monitoring.total_deployments

            }

          </p>

        </div>

      </div>

    </div>

  );

}