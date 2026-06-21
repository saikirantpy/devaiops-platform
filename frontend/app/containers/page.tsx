import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";

export default function ContainersPage() {
  return (
    <div>

      <PageHeader
        title="Containers"
        subtitle="Manage Docker containers"
      />

      <EmptyState
        title="No Containers"
        description="Docker integration will appear here."
      />

    </div>
  );
}