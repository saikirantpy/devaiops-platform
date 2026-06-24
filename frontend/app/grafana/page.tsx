"use client";

import PageHeader from "@/components/shared/PageHeader";

export default function GrafanaPage() {

  return (

    <div className="space-y-8">

      <PageHeader

        title="Grafana"

        subtitle="Enterprise observability dashboards"

      />

      <div

        className="border rounded-xl p-8"

      >

        <h2

          className="text-2xl font-bold"

        >

          Grafana Connected ✅

        </h2>

        <p

          className="mt-4"

        >

          Open Grafana dashboard.

        </p>

        <button

          onClick={() =>

            window.open(

              "http://localhost:3002",

              "_blank"

            )

          }

          className="mt-6 px-6 py-3 border rounded-lg"

        >

          Open Grafana 🚀

        </button>

      </div>

    </div>

  );

}
