import {generateText} from "ai";
import {groq} from "@ai-sdk/groq";

export  async function POST(req : Request){
    const {prompt} = await req.json();
    try{
    const {text} = await generateText({
        model: groq("llama-3.1-8b-instant"),
        prompt
    });
    return Response.json({text});
}catch(error){
    console.log(error)
return Response.json({error : "internal error"},{status:500});
}
}