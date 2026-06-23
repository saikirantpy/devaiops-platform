const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

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