import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, User, MessageCircle, Settings } from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r bg-sidebar p-4">
      <div className="space-y-1">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              to={to}
              key={to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto text-xs text-muted-foreground px-3">
        © {new Date().getFullYear()} QuickLoan
      </div>
    </aside>
  );
}
