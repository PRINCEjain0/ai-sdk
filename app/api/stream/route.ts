import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log(prompt)
  try {
    
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
    });

    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log(error);
    return new Response("Failed to stream text", { status: 500 });
}

}
