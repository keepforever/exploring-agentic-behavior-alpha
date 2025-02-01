import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div className="container bg-blue-800 p-4">
      Layout Two
      <div className="flex flex-col items-center gap-2">
        <Outlet />
      </div>
    </div>
  );
}
