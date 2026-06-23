const BACKEND_URL = "http://localhost:8000";

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