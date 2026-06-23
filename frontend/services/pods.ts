const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

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