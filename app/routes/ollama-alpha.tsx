import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";
import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/ollama-alpha";

export async function action({ context, params, request }: Route.ActionArgs) {
  try {
    const model = ollama("dolphin-mixtral:latest");

    const { text } = await generateText({
      model,
      prompt: "Write a haiku about playful kittens",
      system: `Your role is to write a wholesome haiku about kittens playing, sleeping, or being cute.`,
      maxSteps: 5,
    });

    return { ok: true, text };
  } catch (error) {
    return { ok: false, error: (error as Error)?.message };
  }
}

export default function KittenHaikuGenerator({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isGenerating = navigation.state !== "idle";

  console.log("\n", `actionData = `, actionData, "\n");

  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-lg max-w-lg mx-auto space-y-8">
      <Form method="post">
        <button
          type="submit"
          className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          {!isGenerating ? "Generate Kitten Haiku" : "Crafting poetry..."}
        </button>
      </Form>

      {/* Haiku Display */}
      <div className="flex items-center gap-2 flex-wrap font-bold text-gray-700">
        {actionData?.text}
      </div>

      {/* Error Display  */}

      {actionData?.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {actionData?.error}
          <br />
          OK: {actionData?.ok ? "true" : "false"}
        </div>
      )}

      <div className="mt-6 text-center">
        <pre className="mt-4 p-4 bg-gray-200 text-sm text-gray-900 rounded-lg font-mono whitespace-pre-wrap break-words">
          {JSON.stringify(actionData, null, 2) ||
            "Your kitten haiku will appear here"}
        </pre>
      </div>
    </div>
  );
}
