"use client";

import { useState } from "react";

export default function GenerateText() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("please write something");
      return;
    }
    setIsloading(true);
    setReply("");
    setError(null);

    try {
      const response = await fetch("/api/generate_text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setReply(data.text);
    } catch (error) {
      setError(error instanceof Error ? error.message : "something went worng");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <div>
        {isloading ? <div>loading...</div> : reply ? <div>{reply}</div> : null}
        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="How can I help u"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button type="submit">send</button>
        </form>
      </div>
    </>
  );
}
