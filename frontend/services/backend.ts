const BACKEND_URL = "http://127.0.0.1:8000";

export async function getHealth() {
  const response = await fetch(
    `${BACKEND_URL}/health`
  );

  return response.json();
}