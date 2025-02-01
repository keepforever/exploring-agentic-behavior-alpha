import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout-two.tsx", [
    index("routes/home.tsx"),
    layout("routes/layout-one.tsx", [route("foo", "routes/foo.tsx")]),
    ...prefix("resources", [
      route("alpha", "./routes/resources/alpha.ts"),
      route("beta", "./routes/resources/beta.ts"),
      route("ceta", "./routes/resources/ceta.ts"),
    ]),
  ]),
] satisfies RouteConfig;
