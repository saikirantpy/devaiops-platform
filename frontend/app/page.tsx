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

      } catch (error) {

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

      } catch (error) {

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

      } catch (error) {

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

      } catch (error) {

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

      } catch (error) {

        console.error(error);

      }

    }

    loadHealth();

    loadDocker();

    loadKubernetes();

    loadMonitoring();

    loadDiagnostics();

  }, []);

  return (

    <div className="space-y-8">

      <PageHeader

        title="Dashboard"

        subtitle="Unified AI Powered DevOps Control Center"

      />

      <div className="grid grid-cols-4 gap-6">

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

      <DiagnosticsCard

        diagnostics={diagnostics}

      />

    </div>

  );

}