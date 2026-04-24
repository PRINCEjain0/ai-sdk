import { streamText, UIMessage,convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  const {messages}:{messages: UIMessage[]} = await req.json();

  try {
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      messages : await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "something went wrong" }), {
      status: 500,
    });
  }
}
