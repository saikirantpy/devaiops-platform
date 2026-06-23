"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";

import SearchBox from "@/components/shared/SearchBox";

import EmptyState from "@/components/shared/EmptyState";

import ContainersTable from "@/components/tables/ContainersTable";

import {
  getContainers,
  Container,
} from "@/services/containers";

export default function ContainersPage() {

  const [containers, setContainers] =

    useState<Container[]>([]);

  const [search, setSearch] =

    useState("");

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

  const filteredContainers =

    containers.filter(

      (container) =>

        container.name

          .toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );

  return (

    <div className="space-y-8">

      <PageHeader

        title="Containers"

        subtitle="Docker Container Inventory"

      />

      <SearchBox

        value={search}

        onChange={setSearch}

      />

{

  filteredContainers.length === 0

  ? (

    <EmptyState

      title="No Containers Found"

      description="Try another search keyword."

    />

  )

  : (

    <ContainersTable

      containers={filteredContainers}

    />

  )

}

    </div>

  );

}