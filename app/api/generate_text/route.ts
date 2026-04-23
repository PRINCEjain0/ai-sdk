import {generateText} from "ai";
import {groq} from "@ai-sdk/groq";

export  async function POST(){
    const {text} = await generateText({
        model: groq("llama-3.1-8b-instant"),
        prompt: "What is the capital of France?"
    });
    return Response.json({text});
}