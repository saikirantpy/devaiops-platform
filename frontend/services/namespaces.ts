const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL!;

export type Namespace = {

  name: string;

  status: string;

};

export async function getNamespaces(): Promise<Namespace[]> {

  const response = await fetch(

    `${BACKEND_URL}/namespaces`

  );

  return response.json();

}