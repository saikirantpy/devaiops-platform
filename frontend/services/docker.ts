const BACKEND_URL = "http://localhost:8000";

export type DockerResponse = {
  container_count: number;
};

export async function getDocker(): Promise<DockerResponse> {
  const response = await fetch(
    `${BACKEND_URL}/docker`
  );

  return response.json();
}