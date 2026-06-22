const BACKEND_URL = "http://localhost:8000";

export type KubernetesResponse = {
  pod_count: number;
};

export async function getKubernetes(): Promise<KubernetesResponse> {
  const response = await fetch(
    `${BACKEND_URL}/kubernetes`
  );

  return response.json();
}