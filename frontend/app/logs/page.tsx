import PageHeader from "@/components/shared/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

export default function LogsPage() {

  return (

    <div className="space-y-8">

      <PageHeader

        title="Logs"

        subtitle="Centralized application logs"

      />

      <EmptyState

        title="Coming Soon 🚀"

        description="Logs will be added in future sprints."

      />

    </div>

  );

}