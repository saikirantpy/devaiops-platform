const BACKEND_URL = "http://localhost:8000";

export type Container = {
  id: string;
  name: string;
  image: string;
  status: string;
};

export async function getContainers(): Promise<Container[]> {
  const response = await fetch(
    `${BACKEND_URL}/containers`
  );

  return response.json();
}