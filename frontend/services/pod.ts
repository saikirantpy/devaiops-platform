const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL!;

export type PodDetails = {

  namespace: string;

  name: string;

  status: string;

  node: string;

  pod_ip: string;

  host_ip: string;

  container: string;

  image: string;

  restart_count: number;

};

export async function getPodDetails(

  namespace: string,

  pod: string

): Promise<PodDetails> {

  const response = await fetch(

    `${BACKEND_URL}/pods/${namespace}/${pod}`

  );

  return response.json();

}