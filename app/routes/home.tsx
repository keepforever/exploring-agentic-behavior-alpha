import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useFetcher } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_VERCEL };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const betaFetcher = useFetcher();
  const cetaFetcher = useFetcher();

  console.log("\n", `fetcher.data = `, fetcher.data, "\n");
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Home</h1>
      <div className="grid grid-cols-1 gap-8">
        <section className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Generate Text</h2>
          <fetcher.Form
            method="post"
            action="/resources/alpha"
            className="flex flex-col items-center"
          >
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mb-4"
            >
              Generate Text
            </button>
          </fetcher.Form>
          {fetcher.state !== "idle" ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : fetcher?.data?.text ? (
            <p className="text-gray-800">{fetcher.data.text}</p>
          ) : (
            <p className="text-center text-gray-500">
              Click the button to generate text
            </p>
          )}

          <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap break-words">
            {JSON.stringify(fetcher.data, null, 2) || "nothing to preview"}
          </pre>
        </section>

        <section className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Call Tool</h2>
          <betaFetcher.Form
            method="post"
            action="/resources/beta"
            className="flex flex-col items-center"
          >
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
              Call Tool
            </button>
          </betaFetcher.Form>
        </section>

        <section className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Call Multi-Step Tool</h2>
          <cetaFetcher.Form
            method="post"
            action="/resources/ceta"
            className="flex flex-col items-center"
          >
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              Call Multi-Step Tool
            </button>
          </cetaFetcher.Form>
          {cetaFetcher.state !== "idle" ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : cetaFetcher?.data?.text ? (
            <p className="text-gray-800">{cetaFetcher.data.text}</p>
          ) : (
            <p className="text-center text-gray-500">
              Click the button to generate text
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
