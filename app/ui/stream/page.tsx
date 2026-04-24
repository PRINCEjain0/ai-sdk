"use client"

import {useCompletion} from "@ai-sdk/react"


export default function StreamText(){

    const {
        completion,
        input,
        handleInputChange,
        handleSubmit,
        error,
        isLoading,
        stop
    } = useCompletion({api :"/api/stream"})
    return <>
    
    <div>
        {completion && <div>{completion}</div>}
       
        {isLoading && <div>loading....</div>}
        {error && <div>{error.message}</div>}

        <form onSubmit = {handleSubmit}>
            <input
            placeholder="ask me anything"
            value = {input}
            onChange={handleInputChange}
            />
           
            {isLoading ? (
            <button
            type="button"
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Send
            </button>
          )}
        </form>
    </div>
    </>
}