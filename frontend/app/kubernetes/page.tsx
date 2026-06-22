"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import PodsTable from "@/components/tables/PodsTable";

import {
  getPods,
  Pod,
} from "@/services/pods";

export default function KubernetesPage() {

  const [pods, setPods] =
    useState<Pod[]>([]);

  useEffect(() => {

    async function loadPods() {

      try {

        const data =
          await getPods();

        setPods(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadPods();

  }, []);

  return (

    <div>

      <PageHeader
        title="Kubernetes"
        subtitle="Pod Inventory"
      />

      <PodsTable
        pods={pods}
      />

    </div>

  );
}