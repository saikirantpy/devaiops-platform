type Props = {
  clusterStatus: string;
  pendingPods: number;
  unhealthyDeployments: number;
  totalDeployments: number;
};

export default function MonitoringCard({
  clusterStatus,
  pendingPods,
  unhealthyDeployments,
  totalDeployments,
}: Props) {

  return (

    <div className="border rounded-xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">

        Platform Monitoring

      </h2>

      <div className="space-y-3">

        <p>

          Cluster:

          {" "}

          {clusterStatus === "Healthy"

            ? "🟢 Healthy"

            : "🔴 Unhealthy"}

        </p>

        <p>

          Pending Pods:

          {" "}

          {pendingPods}

        </p>

        <p>

          Unhealthy Deployments:

          {" "}

          {unhealthyDeployments}

        </p>

        <p>

          Total Deployments:

          {" "}

          {totalDeployments}

        </p>

      </div>

    </div>

  );
}