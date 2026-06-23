const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

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