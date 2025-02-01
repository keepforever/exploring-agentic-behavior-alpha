import type { Route } from "./+types/foo";
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
  const isLoading = fetcher.state !== "idle";
  const data = fetcher.data;

  return (
    <div className="container mx-auto max-w-2xl">
      <fetcher.Form method="post" action="/resources/ceta">
        {/* submit button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Call Multi-Step Tool
        </button>
      </fetcher.Form>
      {isLoading ? (
        <p>Loading...</p>
      ) : data?.text ? (
        data?.text
      ) : (
        <p>Click the button to call the multi-step tool</p>
      )}
    </div>
  );
}
