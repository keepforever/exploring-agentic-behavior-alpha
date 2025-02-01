import type { Route } from "./+types/alpha";
import { openai } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";
import { z } from "zod";

export async function action({ context }: Route.ActionArgs) {
  const { text } = await generateText({
    model: openai("gpt-4-turbo"),
    prompt: "Write a haiku about pizza.",
  });

  const { object } = await generateObject({
    model: openai("gpt-4-turbo"),
    schema: z.object({
      accountNumber: z.string(),
      balance: z.string(),
    }),
    system: `Get account information from the text.`,
    prompt: `
      Account Number: 123456
      Balance: $100.00
    `,
  });

  const { accountNumber, balance } = object;

  return Response.json({ text, accountNumber, balance });
}
