import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/sidebar-layout.tsx", [
    index("routes/home.tsx"),
    route("determine-activity", "routes/determine-activity.tsx"),
    route("ollama-alpha", "routes/ollama-alpha.tsx"),
    // nested layout
    layout("components/foo-layout.tsx", [
      route("tool-calling-alpha", "routes/tool-calling-alpha.tsx"),
    ]),
    ...prefix("resources", [
      route("alpha", "./routes/resources/alpha.ts"),
      route("beta", "./routes/resources/beta.ts"),
      route("ceta", "./routes/resources/ceta.ts"),
    ]),
  ]),
] satisfies RouteConfig;
