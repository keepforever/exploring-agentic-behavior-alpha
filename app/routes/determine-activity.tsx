import type { Route } from "./+types/determine-activity";
import { Form } from "react-router";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { logToConsoleTool } from "~/utils/tools/log-to-console";
import {
  brianPreferencesTool,
  stevePreferencesTool,
  sallyPreferencesTool,
} from "~/utils/tools/friends-activity-preferences";

export async function action({ context, params, request }: Route.ActionArgs) {
  const model = openai("gpt-4-turbo");

  const determineCommonActivity = async (prompt: string) => {
    // const { steps } = await generateText({
    const { text, steps } = await generateText({
      model,
      prompt,
      system: `Your only role in life is to suggest an activity that Sally, Brian, and Steve might enjoy to do together. Use the tools provided to determine the preferences of Brian, Steve, and Sally.`,
      tools: {
        brianPreferencesTool,
        stevePreferencesTool,
        sallyPreferencesTool,
      },
      maxSteps: 5,
    });

    console.dir(steps, { depth: null });

    return { text };
  };

  const { text } = await determineCommonActivity(
    "Please suggest an activity that Sally, Brian, and Steve might enjoy to do together."
  );

  return { ok: true, text };
}

export default function ToolCallingAlpha({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="bg-white p-8 rounded shadow-md max-w-2xl">
      <Form method="post">
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Call Multi-Step Tool
        </button>
      </Form>
      <div className="mt-4 text-center">
        <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap break-words">
          {JSON.stringify(actionData, null, 2) || "nothing to preview"}
        </pre>
      </div>
    </div>
  );
}
