import PageHeader from "@/components/shared/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

export default function SettingsPage() {

  return (

    <div className="space-y-8">

      <PageHeader

        title="Settings"

        subtitle="Manage platform settings"

      />

      <EmptyState

        title="Coming Soon 🚀"

        description="Settings will be added in future sprints."

      />

    </div>

  );

}