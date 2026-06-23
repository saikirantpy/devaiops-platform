const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

export type KubernetesResponse = {
  pod_count: number;
};

export async function getKubernetes(): Promise<KubernetesResponse> {
  const response = await fetch(
    `${BACKEND_URL}/kubernetes`
  );

  return response.json();
}