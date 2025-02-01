import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const testAPIKey = process.env.OPENAI_API_KEY;
  console.log("testAPIKey:", testAPIKey);

  const { text } = await generateText({
    model: openai("gpt-4-turbo"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  return { message: context.VALUE_FROM_VERCEL, generatedText: text };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Welcome message={loaderData.message}>{loaderData.generatedText}</Welcome>
  );
}
