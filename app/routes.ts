import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("resources", [route("alpha", "./routes/resources/alpha.ts")]),
] satisfies RouteConfig;
