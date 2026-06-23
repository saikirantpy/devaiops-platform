const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL!;

export async function askCopilot(

  question: string

) {

  const response =

    await fetch(

      `${BACKEND_URL}/copilot?question=${encodeURIComponent(question)}`

    );

  return response.json();

}