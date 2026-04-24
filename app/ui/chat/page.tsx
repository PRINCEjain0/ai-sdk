"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage} = useChat();
  const handleSubmit = (e : React.FormEvent) =>{
    e.preventDefault();
    sendMessage({text:input})
    setInput("")
  }
  return (
    <>

    {
  messages.map((message) => (
    <div key={message.id}>
      <div>
        {message.role === "user" ? "You" : "AI"}
      </div>

      {message.parts?.map((part, index) => {
        switch (part.type) {
          case "text":
            return (
              <div key={`${message.id}-${index}`}>
                {part.text}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  ))
}
      <form onSubmit={handleSubmit}>
        <div className="fixed flex bottom-0 space-x-2 ">
          <input
            placeholder="ask me anything"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">send</button>
        </div>
      </form>
    </>
  );
}
