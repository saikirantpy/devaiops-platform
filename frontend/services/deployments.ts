const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

export type Deployment = {
  namespace: string;
  name: string;
  ready: string;
  replicas: number;
};

export async function getDeployments(): Promise<Deployment[]> {

  const response = await fetch(
    `${BACKEND_URL}/deployments`
  );

  return response.json();
}