import PageHeader from "@/components/shared/PageHeader";

import EmptyState from "@/components/shared/EmptyState";

export default function NotificationsPage() {

  return (

    <div className="space-y-8">

      <PageHeader

        title="Notifications"

        subtitle="Alert and notification center"

      />

      <EmptyState

        title="Coming Soon 🚀"

        description="Notifications will be added in future sprints."

      />

    </div>

  );

}