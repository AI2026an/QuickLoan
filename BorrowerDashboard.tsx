import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownLeft, History, Wallet, CheckCircle2, XCircle } from "lucide-react";
import { useKyc } from "@/context/KycContext";
import { useRole } from "@/context/RoleContext";
import KycStatusDisplay from "./BorrowerKycStatus";

interface Loan {
  id: string;
  amount: number;
  duration: string;
  purpose: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

export default function BorrowerDashboard() {
  const [balance, setBalance] = useState(2350.75);
  const [loans, setLoans] = useState<Loan[]>([
    { id: "L-1021", amount: 500, duration: "3 mo", purpose: "Utility Bills", status: "Approved", date: "2025-08-12" },
    { id: "L-1020", amount: 1200, duration: "6 mo", purpose: "Medical", status: "Pending", date: "2025-08-03" },
  ]);

  const [form, setForm] = useState({ amount: "", duration: "3 months", purpose: "" });

  const submitLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0) return;
    setLoans((prev) => [
      {
        id: `L-${1000 + prev.length + 1}`,
        amount: amt,
        duration: form.duration,
        purpose: form.purpose || "General",
        status: "Pending",
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setForm({ amount: "", duration: "3 months", purpose: "" });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border brand-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Wallet Balance</p>
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-3xl font-extrabold">₹{balance.toLocaleString()}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">KYC:</span>
            <KycStatusDisplay />
          </div>
        </div>
        <button className="rounded-2xl border brand-card p-5 shadow-sm text-left hover:shadow transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Request Loan</p>
            <ArrowUpRight className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-xl font-semibold">Get funds fast</p>
        </button>
        <button className="rounded-2xl border brand-card p-5 shadow-sm text-left hover:shadow transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Repay Loan</p>
            <ArrowDownLeft className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-xl font-semibold">Make a payment</p>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={submitLoan} className="rounded-2xl border brand-card p-5 shadow-sm">
          <h2 className="text-lg font-bold">Loan Request</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Amount (₹)</label>
              <input
                required
                inputMode="decimal"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="500"
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Duration</label>
              <select
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              >
                <option>3 months</option>
                <option>6 months</option>
                <option>12 months</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Purpose</label>
              <input
                value={form.purpose}
                onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value }))}
                placeholder="e.g. Medical, Education"
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <button className="mt-4 w-full rounded-xl bg-primary py-2.5 text-primary-foreground font-medium shadow-md shadow-primary/30 hover:shadow-lg transition">
            Submit Request
          </button>
        </form>

        <div className="rounded-2xl border brand-card p-5 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Loan History</h2>
            <button className="inline-flex items-center gap-2 text-sm text-primary hover:underline"><History className="h-4 w-4"/> View All</button>
          </div>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="py-2 font-medium">ID</th>
                <th className="py-2 font-medium">Amount</th>
                <th className="py-2 font-medium">Duration</th>
                <th className="py-2 font-medium">Purpose</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((l) => (
                <tr key={l.id} className="border-t">
                  <td className="py-2">{l.id}</td>
                  <td className="py-2">₹{l.amount.toLocaleString()}</td>
                  <td className="py-2">{l.duration}</td>
                  <td className="py-2">{l.purpose}</td>
                  <td className="py-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                        l.status === "Approved"
                          ? "bg-green-900/20 text-green-300"
                          : l.status === "Rejected"
                          ? "bg-red-900/20 text-red-300"
                          : "bg-amber-900/20 text-amber-300"
                      }`}
                    >
                      {l.status === "Approved" ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : l.status === "Rejected" ? (
                        <XCircle className="h-3.5 w-3.5" />
                      ) : null}
                      {l.status}
                    </span>
                  </td>
                  <td className="py-2">{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
