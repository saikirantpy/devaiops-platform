const BACKEND_URL =
  "http://localhost:8000";

export async function askCopilot(

  question: string

) {

  const response =

    await fetch(

      `${BACKEND_URL}/copilot?question=${encodeURIComponent(question)}`

    );

  return response.json();

}