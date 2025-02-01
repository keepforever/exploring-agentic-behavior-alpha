import type { Route } from "./+types/alpha";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function action({ context }: Route.ActionArgs) {
  const { text } = await generateText({
    model: openai("gpt-4-turbo"),
    prompt: "Write a haiku about pizza.",
  });

  return Response.json({ text });
}
