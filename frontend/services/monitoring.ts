const BACKEND_URL = "http://localhost:8000";

export type Monitoring = {
  cluster_status: string;
  pending_pods: number;
  unhealthy_deployments: number;
  total_deployments: number;
};

export async function getMonitoring(): Promise<Monitoring> {

  const response = await fetch(
    `${BACKEND_URL}/monitoring`
  );

  return response.json();
}