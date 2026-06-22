"use client";

import { useEffect, useState } from "react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardStatus from "@/components/dashboard/DashboardStatus";
import PageHeader from "@/components/shared/PageHeader";

import { getHealth } from "@/services/backend";
import { getDocker } from "@/services/docker";

export default function Home() {
  const [health, setHealth] = useState({
    status: "Loading...",
    environment: "Loading...",
    backend: "Loading...",
  });

  const [dockerCount, setDockerCount] = useState("0");

  useEffect(() => {
    async function loadHealth() {
      try {
        const data = await getHealth();

        setHealth({
          status: data.status,
          environment: data.environment,
          backend: data.backend,
        });
      } catch (error) {
        console.error(error);

        setHealth({
          status: "Unavailable",
          environment: "Unknown",
          backend: "Disconnected",
        });
      }
    }

    async function loadDocker() {
      try {
        const data = await getDocker();

        setDockerCount(
          String(data.container_count)
        );
      } catch (error) {
        console.error(error);

        setDockerCount("Error");
      }
    }

    loadHealth();

    loadDocker();
  }, []);

  return (
    <div>

      <PageHeader
        title="Dashboard"
        subtitle="Unified AI Powered DevOps Control Center"
      />

      <div className="grid grid-cols-4 gap-6 mb-8">

        <DashboardCard
          title="Health Score"
          value="98%"
        />

        <DashboardCard
          title="Containers"
          value={dockerCount}
        />

        <DashboardCard
          title="Pods"
          value="0"
        />

        <DashboardCard
          title="Alerts"
          value="0"
        />

      </div>

      <DashboardStatus
        status={health.status}
        backend={health.backend}
        environment={health.environment}
      />

    </div>
  );
}