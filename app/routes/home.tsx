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

  console.log("\n", `fetcher.data = `, fetcher.data, "\n");
  return (
    <div className="flex flex-col items-center gap-2 pt-8 justify-center">
      Hello Home
      <fetcher.Form method="post" action="/resources/alpha">
        {/* submit button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Generate Text
        </button>
      </fetcher.Form>
      {/* loading state */}
      {fetcher.state !== "idle" ? (
        <p>Loading...</p>
      ) : fetcher?.data?.text ? (
        fetcher?.data?.text
      ) : (
        <p>Click the button to generate text</p>
      )}
      <pre>{JSON.stringify(fetcher.data, null, 2) || "nothing to preview"}</pre>
      <betaFetcher.Form method="post" action="/resources/beta">
        {/* submit button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Call Tool
        </button>
      </betaFetcher.Form>
    </div>
  );
}
