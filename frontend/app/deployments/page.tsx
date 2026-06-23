"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

import SearchBox from "@/components/shared/SearchBox";

import DeploymentsTable from "@/components/tables/DeploymentsTable";

import {
  getDeployments,
  Deployment,
} from "@/services/deployments";

export default function DeploymentsPage() {

  const [deployments, setDeployments] =
    useState<Deployment[]>([]);

  const [search, setSearch] =
    useState("");

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

  const filteredDeployments =

    deployments.filter(

      (deployment) =>

        deployment.name

          .toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );

  return (

    <div className="space-y-8">

      <PageHeader

        title="Deployments"

        subtitle="Kubernetes Deployment Inventory"

      />

      <SearchBox

        value={search}

        onChange={setSearch}

      />

{

  filteredDeployments.length === 0

  ? (

    <EmptyState

      title="No Deployments Found"

      description="Try another search keyword."

    />

  )

  : (

    <DeploymentsTable

      deployments={filteredDeployments}

    />

  )

}

    </div>

  );

}