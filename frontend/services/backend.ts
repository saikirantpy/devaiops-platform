const BACKEND_URL = "http://localhost:8000";

export type HealthResponse = {
  status: string;
  environment: string;
  frontend: string;
  backend: string;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(
    `${BACKEND_URL}/health`
  );

  return response.json();
}