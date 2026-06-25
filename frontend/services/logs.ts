const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

export type LogItem = {
  name: string;
  logs: string;
};

export async function getLogs(): Promise<LogItem[]> {
  const response = await fetch(`${BACKEND_URL}/logs`);

  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }

  return response.json();
}