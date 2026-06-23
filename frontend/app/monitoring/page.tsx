import PageHeader from "@/components/shared/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

export default function MonitoringPage() {

  return (

    <div className="space-y-8">

      <PageHeader

        title="Monitoring"

        subtitle="Cluster monitoring overview"

      />

      <EmptyState

        title="Coming Soon 🚀"

        description="Detailed monitoring dashboards will be added in future sprints."

      />

    </div>

  );

}