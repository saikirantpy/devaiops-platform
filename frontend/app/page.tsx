"use client";

import { useEffect, useState } from "react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardStatus from "@/components/dashboard/DashboardStatus";
import MonitoringCard from "@/components/dashboard/MonitoringCard";
import DiagnosticsCard from "@/components/dashboard/DiagnosticsCard";

import PageHeader from "@/components/shared/PageHeader";

import { getHealth } from "@/services/backend";
import { getDocker } from "@/services/docker";
import { getKubernetes } from "@/services/kubernetes";
import { getMonitoring } from "@/services/monitoring";
import { getDiagnostics } from "@/services/diagnostics";
import { getPrometheus } from "@/services/prometheus";
import ResourceChart
from "@/components/charts/ResourceChart";
import InfrastructureChart
from "@/components/charts/InfrastructureChart";

type Diagnostic = {
  namespace: string;
  name: string;
  message: string;
  suggestion: string;
};

export default function Home() {

  const [health, setHealth] = useState({

    status: "Loading...",

    environment: "Loading...",

    backend: "Loading...",

  });

  const [dockerCount, setDockerCount] =

    useState("0");

  const [podCount, setPodCount] =

    useState("0");

  const [monitoring, setMonitoring] =

    useState({

      cluster_status: "Loading...",

      pending_pods: 0,

      unhealthy_deployments: 0,

      total_deployments: 0,

    });

  const [diagnostics, setDiagnostics] =

    useState<Diagnostic[]>([]);

  const [

    prometheus,

    setPrometheus

  ] = useState({

    nodes: 0,

    cpu_usage: 0,

    memory_usage: 0,

  });

  useEffect(() => {

    async function loadHealth() {

      try {

        const data =

          await getHealth();

        setHealth({

          status: data.status,

          environment:

            data.environment,

          backend:

            data.backend,

        });

      }

      catch (error) {

        console.error(error);

        setHealth({

          status: "Unavailable",

          environment:

            "Unknown",

          backend:

            "Disconnected",

        });

      }

    }

    async function loadDocker() {

      try {

        const data =

          await getDocker();

        setDockerCount(

          String(

            data.container_count

          )

        );

      }

      catch (error) {

        console.error(error);

        setDockerCount(

          "Error"

        );

      }

    }

    async function loadKubernetes() {

      try {

        const data =

          await getKubernetes();

        setPodCount(

          String(

            data.pod_count

          )

        );

      }

      catch (error) {

        console.error(error);

        setPodCount(

          "Error"

        );

      }

    }

    async function loadMonitoring() {

      try {

        const data =

          await getMonitoring();

        setMonitoring(

          data

        );

      }

      catch (error) {

        console.error(error);

      }

    }

    async function loadDiagnostics() {

      try {

        const data =

          await getDiagnostics();

        setDiagnostics(

          data

        );

      }

      catch (error) {

        console.error(error);

      }

    }

    async function loadPrometheus() {

      try {

        const data =

          await getPrometheus();

        setPrometheus(

          data

        );

      }

      catch (error) {

        console.error(error);

      }

    }

    loadHealth();

    loadDocker();

    loadKubernetes();

    loadMonitoring();

    loadDiagnostics();

    loadPrometheus();

  }, []);

  return (

    <div className="space-y-8">

      <PageHeader

        title="Dashboard"

        subtitle="Unified AI Powered DevOps Control Center"

      />

      <div

        className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-6"

      >

        <DashboardCard

          title="Health"

          value={health.status}

        />

        <DashboardCard

          title="Containers"

          value={dockerCount}

        />

        <DashboardCard

          title="Pods"

          value={podCount}

        />

        <DashboardCard

          title="Alerts"

          value={String(

            monitoring.pending_pods +

            monitoring.unhealthy_deployments

          )}

        />

        <DashboardCard

          title="CPU"

          value={`${

            prometheus.cpu_usage

          }%`}

        />

        <DashboardCard

          title="Memory"

          value={`${

            prometheus.memory_usage

          }%`}

        />

        <DashboardCard

          title="Nodes"

          value={String(

            prometheus.nodes

          )}

        />

      </div>

      <DashboardStatus

        status={health.status}

        backend={health.backend}

        environment={health.environment}

      />

      <MonitoringCard

        clusterStatus={

          monitoring.cluster_status

        }

        pendingPods={

          monitoring.pending_pods

        }

        unhealthyDeployments={

          monitoring.unhealthy_deployments

        }

        totalDeployments={

          monitoring.total_deployments

        }

      />

      <div

 className="grid lg:grid-cols-2 gap-6"

>

 <ResourceChart

  cpu={

   prometheus.cpu_usage

  }

  memory={

   prometheus.memory_usage

  }

/>

 <InfrastructureChart

  nodes={

   prometheus.nodes

  }

  pods={

   Number(

    podCount

   )

  }

  deployments={

   monitoring.total_deployments

  }

/>

</div>

      <DiagnosticsCard

        diagnostics={diagnostics}

      />
      

    </div>

  );

}