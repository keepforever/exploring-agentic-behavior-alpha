import { generateText, tool } from "ai";
import type { Route } from "./+types/beta";
import { openai } from "@ai-sdk/openai";
import { logToConsoleTool } from "~/utils/tools/log-to-console";

export async function action({ context, params, request }: Route.ActionArgs) {
  const model = openai("gpt-4-turbo");

  const logToConsole = async (prompt: string) => {
    // const { steps } = await generateText({
    await generateText({
      model,
      prompt,
      system:
        `Your only role in life is to log ` +
        `messages to the console. ` +
        `Use the tool provided to log the ` +
        `prompt to the console.`,
      tools: {
        logToConsole: logToConsoleTool,
      },
    });

    // console.dir(steps, { depth: null });
  };

  await logToConsole("Hello world!");

  return Response.json({ ok: true });
}
