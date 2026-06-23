import PageHeader from "@/components/shared/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

export default function IntegrationsPage() {

  return (

    <div className="space-y-8">

      <PageHeader

        title="Integrations"

        subtitle="Manage external platform integrations"

      />

      <EmptyState

        title="Coming Soon 🚀"

        description="Integrations will be added in future sprints."

      />

    </div>

  );

}