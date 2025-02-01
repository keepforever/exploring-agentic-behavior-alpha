import { generateText, tool } from "ai";
import { z } from "zod";
import type { Route } from "./+types/ceta";
import { openai } from "@ai-sdk/openai";

export async function action({ context }: Route.ActionArgs) {
  const model = openai("gpt-4-turbo");

  const logToConsoleTool = tool({
    description: "Log a message to the console",
    parameters: z.object({
      message: z.string().describe("The message to log to the console"),
    }),
    execute: async ({ message }) => {
      console.log(message);
      return `Logged message: ${message}`;
    },
  });

  const logToConsole = async (prompt: string) => {
    const { text /*,  steps */ } = await generateText({
      model,
      prompt,
      system:
        "Your only role in life is to log messages to the console. Use the tool provided to log the prompt to the console.",
      tools: {
        logToConsole: logToConsoleTool,
      },
      maxSteps: 2,
    });

    // console.dir(steps, { depth: null });

    return text;
  };

  const text = await logToConsole("Hello world!");

  return Response.json({ ok: true, text });
}
