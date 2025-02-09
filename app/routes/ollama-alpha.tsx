// useFetcher with reset: https://gist.github.com/arunmmanoharan/38d313f28dc17637a0e3cfa8c6205bd5
import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";
import { Form, useNavigation } from "react-router";
import { useEffect, useRef } from "react";
import type { Route } from "./+types/ollama-alpha";

export async function action({ context, params, request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const customPrompt = formData.get("prompt")?.toString() || "Write a haiku about playful kittens";

    const model = ollama("dolphin-mixtral:latest");

    const { text } = await generateText({
      model,
      prompt: customPrompt,
      system: `You are a helpful, knowldgeable, and playful instructor.  Respond tersely and accuratly to the prompts.`,
      maxSteps: 2,
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = navigation.state !== "idle";

  useEffect(() => {
    console.log('\n', `hello useEffect `, '\n')
    if (actionData?.ok && formRef.current && textareaRef.current) {
      formRef.current.reset();
      textareaRef.current.focus();
    }
  }, [actionData?.ok, actionData?.text]);

  return (
    <div className="p-8 rounded-xl shadow-lg max-w-lg mx-auto space-y-8 bg-brian-100">
      <Form ref={formRef} method="post" className="space-y-4">
        <div>
          <label 
            htmlFor="prompt" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Custom Prompt
          </label>
          <textarea
            ref={textareaRef}
            id="prompt"
            name="prompt"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent"
            placeholder="Enter your prompt here..."
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          {!isGenerating ? "Generate Response" : "Generating..."}
        </button>
      </Form>

      {/* Response Display */}
      <div className="flex items-center gap-2 flex-wrap font-bold text-gray-700">
        {actionData?.text ?? "No response yet"}
      </div>

      {/* Error Display */}
      {actionData?.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {actionData?.error}
          <br />
          OK: {actionData?.ok ? "true" : "false"}
        </div>
      )}

      
    </div>
  );
}
