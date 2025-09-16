import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import { useRole } from "@/context/RoleContext";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { role } = useRole();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-3">
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground capitalize shadow-sm">
              Role: {role}
            </span>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 flex">
        <Sidebar />
        <main className="flex-1 py-6 md:pl-6 pb-24 md:pb-6">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
