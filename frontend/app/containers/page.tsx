"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import ContainersTable from "@/components/tables/ContainersTable";

import {
  getContainers,
  Container,
} from "@/services/containers";

export default function ContainersPage() {

  const [containers, setContainers] =
    useState<Container[]>([]);

  useEffect(() => {

    async function loadContainers() {

      try {

        const data =
          await getContainers();

        setContainers(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadContainers();

  }, []);

  return (

    <div>

      <PageHeader
        title="Containers"
        subtitle="Docker Container Inventory"
      />

      <ContainersTable
        containers={containers}
      />

    </div>

  );
}