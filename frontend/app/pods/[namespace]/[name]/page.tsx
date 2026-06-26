"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import PageHeader from "@/components/shared/PageHeader";

import Link from "next/link";

import {
  getPodDetails,
  PodDetails,
} from "@/services/pod";

export default function PodDetailsPage() {

  const params = useParams();

  const namespace = params.namespace as string;

  const pod = params.name as string;

  const [details, setDetails] =
    useState<PodDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getPodDetails(
            namespace,
            pod
          );

        setDetails(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, [namespace, pod]);

  if (loading) {

    return (

      <div className="space-y-8">

        <PageHeader
          title="Pod Details"
          subtitle="Loading pod information..."
        />

        <div className="border rounded-xl p-8 text-center">

          Loading Pod Details...

        </div>

      </div>

    );

  }

  if (!details) {

    return (

      <div className="space-y-8">

        <PageHeader
          title="Pod Details"
          subtitle="Unable to load pod"
        />

        <div className="border rounded-xl p-8 text-center text-red-600">

          Unable to load pod details.

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <PageHeader

        title={details.name}

        subtitle="Kubernetes Pod Details"

      />

      <div className="border rounded-xl p-6">

        <h2 className="text-xl font-bold">

          Overview

        </h2>

        <p className="text-gray-500 mt-2">

          Basic information about the selected Kubernetes pod.

        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <InfoCard
          title="Namespace"
          value={details.namespace}
        />

        <InfoCard
          title="Status"
          value={details.status}
        />

        <InfoCard
          title="Node"
          value={details.node}
        />

        <InfoCard
          title="Pod IP"
          value={details.pod_ip}
        />

        <InfoCard
          title="Host IP"
          value={details.host_ip}
        />

        <InfoCard
          title="Container"
          value={details.container}
        />

        <InfoCard
          title="Image"
          value={details.image}
        />

        <InfoCard
          title="Restart Count"
          value={String(details.restart_count)}
        />

      </div>
    <div className="border rounded-xl p-6">

    <h2 className="text-xl font-bold">

        Operations

    </h2>

    <p className="text-gray-500 mt-2">

        Common Kubernetes operations for this pod.

    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

<Link
  href={`/pods/${details.namespace}/${details.name}/logs`}
  className="
    border
    rounded-xl
    p-4
    hover:bg-gray-50
    transition
    block
    text-center
  "
>
  <div className="text-3xl">
    📋
  </div>

  <div className="font-semibold mt-2">
    View Logs
  </div>
</Link>

        <button
        className="
            border
            rounded-xl
            p-4
            hover:bg-gray-50
            transition
        "
        >
        📅
        <div className="font-semibold mt-2">
            Events
        </div>
        </button>

        <button
        className="
            border
            rounded-xl
            p-4
            hover:bg-gray-50
            transition
        "
        >
        📄
        <div className="font-semibold mt-2">
            YAML
        </div>
        </button>

        <button
        className="
            border
            rounded-xl
            p-4
            hover:bg-gray-50
            transition
        "
        >
        🤖
        <div className="font-semibold mt-2">
            AI Diagnose
        </div>
        </button>

    </div>

    </div>
    </div>

  );

}


function InfoCard({

  title,

  value,

}: {

  title: string;

  value: string;

}) {

  return (

    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <p className="text-sm text-gray-500">

        {title}

      </p>

      <h2 className="text-lg font-semibold mt-2 break-all">

        {value}

      </h2>

    </div>

  );

}