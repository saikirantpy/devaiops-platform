"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import SearchBox from "@/components/shared/SearchBox";

import EmptyState from "@/components/shared/EmptyState";

import PodsTable from "@/components/tables/PodsTable";

import {
  getPods,
  Pod,
} from "@/services/pods";

export default function KubernetesPage() {

  const [pods, setPods] =
    useState<Pod[]>([]);

  const [search, setSearch] =
    useState("");

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

  const filteredPods =

    pods.filter(

      (pod) =>

        pod.name

          .toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );

  return (

    <div className="space-y-8">

      <PageHeader

        title="Kubernetes"

        subtitle="Pod Inventory"

      />

      <SearchBox

        value={search}

        onChange={setSearch}

      />

{

  filteredPods.length === 0

  ? (

    <EmptyState

      title="No Pods Found"

      description="Try another search keyword."

    />

  )

  : (

    <PodsTable

      pods={filteredPods}

    />

  )

}

    </div>

  );

}