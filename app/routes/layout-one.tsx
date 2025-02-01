import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div className="container bg-green-800 p-4">
      Hey, welcome to the dashboard page!
      <div className="flex flex-col items-center gap-2">
        <Outlet />
      </div>
    </div>
  );
}
