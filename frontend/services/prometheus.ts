const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL!;

export type PrometheusResponse = {

  nodes: number;

  cpu_usage: number;

  memory_usage: number;

};

export async function getPrometheus(): Promise<PrometheusResponse> {

  const response = await fetch(

    `${BACKEND_URL}/prometheus`

  );

  return response.json();

}