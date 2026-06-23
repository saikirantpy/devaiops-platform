const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

export type DockerResponse = {
  container_count: number;
};

export async function getDocker(): Promise<DockerResponse> {
  const response = await fetch(
    `${BACKEND_URL}/docker`
  );

  return response.json();
}