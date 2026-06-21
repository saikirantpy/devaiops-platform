import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";

export default function KubernetesPage() {
  return (
    <div>

      <PageHeader
        title="Kubernetes"
        subtitle="Manage Kubernetes resources"
      />

      <EmptyState
        title="No Cluster Connected"
        description="Kubernetes integration will appear here."
      />

    </div>
  );
}