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

import {
  getNamespaces,
  Namespace,
} from "@/services/namespaces";

export default function KubernetesPage() {

  const [pods, setPods] =
    useState<Pod[]>([]);

  const [namespaces, setNamespaces] =
    useState<Namespace[]>([]);

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

    async function loadNamespaces() {

      try {

        const data =
          await getNamespaces();

        setNamespaces(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadPods();

    loadNamespaces();

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

        subtitle="Cluster Inventory"

      />

      <SearchBox

        value={search}

        onChange={setSearch}

      />

      {/* Namespaces */}

      <div className="border rounded-xl p-6 shadow-sm">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-xl font-bold">

            ☸️ Namespaces

          </h2>

          <span className="text-sm text-gray-500">

            {namespaces.length} Total

          </span>

        </div>

        <div className="flex flex-wrap gap-3">

          {namespaces.map((namespace) => (

            <div

              key={namespace.name}

              className={`

                px-4

                py-2

                rounded-full

                text-sm

                font-medium

                transition

                ${

                  namespace.status === "Active"

                    ? "bg-green-100 text-green-700"

                    : "bg-red-100 text-red-700"

                }

              `}

            >

              ☸️ {namespace.name}

            </div>

          ))}

        </div>

      </div>

      {/* Pods */}

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