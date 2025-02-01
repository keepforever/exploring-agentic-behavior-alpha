import { Link, Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div className="container bg-blue-800 p-4">
      {/* App Nav */}
      <nav className="flex gap-4">
        <Link to="/">HOME</Link>
        <Link to="/foo">FOO</Link>
      </nav>
      <div className="flex flex-col items-center gap-2">
        <Outlet />
      </div>
    </div>
  );
}
