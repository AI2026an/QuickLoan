import { useMemo, useState } from "react";
import { ShieldAlert, Users, BarChart3, CheckCircle2 } from "lucide-react";
import KycPending from "./AdminKycPending";

interface UserRow { id: string; name: string; role: "borrower" | "lender"; status: "active" | "pending" | "flagged" }

export default function AdminDashboard() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserRow[]>([
    { id: "U-1", name: "Alice Johnson", role: "borrower", status: "active" },
    { id: "U-2", name: "Mark Lee", role: "lender", status: "pending" },
    { id: "U-3", name: "Priya Singh", role: "borrower", status: "flagged" },
    { id: "U-4", name: "Diego Martinez", role: "lender", status: "active" },
  ]);

  const filtered = useMemo(() => users.filter(u => u.name.toLowerCase().includes(query.toLowerCase())), [users, query]);

  const approveLender = (id: string) => setUsers((arr) => arr.map(u => u.id === id ? { ...u, status: "active" } : u));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border brand-card p-5 shadow-sm">
          <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Total Loans</p><BarChart3 className="h-5 w-5 text-primary"/></div>
          <p className="mt-3 text-3xl font-extrabold">2,431</p>
        </div>
        <div className="rounded-2xl border brand-card p-5 shadow-sm">
          <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Active Loans</p><BarChart3 className="h-5 w-5 text-primary"/></div>
          <p className="mt-3 text-3xl font-extrabold">412</p>
        </div>
        <div className="rounded-2xl border brand-card p-5 shadow-sm">
          <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Repayments</p><BarChart3 className="h-5 w-5 text-primary"/></div>
          <p className="mt-3 text-3xl font-extrabold">₹128k</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border brand-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">User Management</h2>
            <Users className="h-5 w-5 text-primary"/>
          </div>
          <input
            placeholder="Search users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-4 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
          />
          <div className="mt-3 divide-y rounded-xl border">
            {filtered.map(u => (
              <div key={u.id} className="flex items-center justify-between gap-3 p-3">
                <div>
                  <p className="font-medium">{u.name} <span className="text-xs text-muted-foreground uppercase">{u.role}</span></p>
                  <p className="text-xs text-muted-foreground">Status: {u.status}</p>
                </div>
                {u.role === "lender" && u.status !== "active" && (
                  <button onClick={() => approveLender(u.id)} className="rounded-lg bg-primary px-3 py-2 text-primary-foreground text-sm font-medium shadow hover:opacity-95">Approve</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border brand-card p-5 shadow-sm mt-4">
          <div className="flex items-center justify-between"><h2 className="text-lg font-bold">KYC Applications</h2></div>
          <KycPending />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border brand-card p-5 shadow-sm">
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Fraud Alerts</h2><ShieldAlert className="h-5 w-5 text-red-400"/></div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="rounded-xl border p-3">Unusual transaction on U-3 flagged for review</li>
              <li className="rounded-xl border p-3">Multiple failed login attempts from new device</li>
            </ul>
          </div>
          <div className="rounded-2xl border brand-card p-5 shadow-sm">
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Control Panel</h2><CheckCircle2 className="h-5 w-5 text-primary"/></div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button className="rounded-xl border px-3 py-2 text-left hover:shadow">Export Reports</button>
              <button className="rounded-xl border px-3 py-2 text-left hover:shadow">Configure KYC</button>
              <button className="rounded-xl border px-3 py-2 text-left hover:shadow">Manage Roles</button>
              <button className="rounded-xl border px-3 py-2 text-left hover:shadow">System Status</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
