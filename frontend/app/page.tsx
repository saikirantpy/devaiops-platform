import DashboardCard from "@/components/dashboard/DashboardCard";

export default function Home() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">

        Dashboard

      </h1>

      <div className="grid grid-cols-4 gap-6">

        <DashboardCard
          title="Health Score"
          value="98%"
        />

        <DashboardCard
          title="Containers"
          value="0"
        />

        <DashboardCard
          title="Pods"
          value="0"
        />

        <DashboardCard
          title="Alerts"
          value="0"
        />

      </div>

    </div>
  );
}