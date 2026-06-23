const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

export type Diagnostic = {

  namespace: string;

  name: string;

  message: string;

  suggestion: string;

};

export async function getDiagnostics():

Promise<Diagnostic[]> {

  const response = await fetch(

    `${BACKEND_URL}/diagnostics`

  );

  return response.json();

}