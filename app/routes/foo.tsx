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
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <fetcher.Form method="post" action="/resources/ceta">
        {/* submit button */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Call Multi-Step Tool
        </button>
      </fetcher.Form>
      <div className="mt-4 text-center">
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : data?.text ? (
          <p className="text-gray-800">{data.text}</p>
        ) : (
          <p className="text-gray-600">
            Click the button to call the multi-step tool
          </p>
        )}
      </div>
    </div>
  );
}
