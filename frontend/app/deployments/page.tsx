"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import DeploymentsTable from "@/components/tables/DeploymentsTable";

import {
  getDeployments,
  Deployment,
} from "@/services/deployments";

export default function DeploymentsPage() {

  const [deployments, setDeployments] =
    useState<Deployment[]>([]);

  useEffect(() => {

    async function loadDeployments() {

      try {

        const data =
          await getDeployments();

        setDeployments(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadDeployments();

  }, []);

  return (

    <div className="space-y-8">

      <PageHeader
        title="Deployments"
        subtitle="Kubernetes Deployment Inventory"
      />

      <DeploymentsTable
        deployments={deployments}
      />

    </div>

  );
}