const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL!;

export type PodLogsResponse = {
  logs: string;
};

export async function getPodLogs(
  namespace: string,
  pod: string
): Promise<PodLogsResponse> {

  const response = await fetch(
    `${BACKEND_URL}/pods/${namespace}/${pod}/logs`
  );

  if (!response.ok) {
    throw new Error("Failed to load pod logs");
  }

  return response.json();
}