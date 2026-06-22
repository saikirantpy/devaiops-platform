const BACKEND_URL = "http://localhost:8000";

export type Pod = {
  namespace: string;
  name: string;
  status: string;
  node: string;
};

export async function getPods(): Promise<Pod[]> {

  const response = await fetch(
    `${BACKEND_URL}/pods`
  );

  return response.json();
}