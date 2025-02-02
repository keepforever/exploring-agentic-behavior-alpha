import { Outlet } from "react-router";

export default function FooLayout() {
  return (
    <>
      Wrapped in FooLayout
      <Outlet />
    </>
  );
}
