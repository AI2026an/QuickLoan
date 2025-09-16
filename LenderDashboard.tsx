import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, PiggyBank, TrendingUp } from "lucide-react";
import { useKyc } from "@/context/KycContext";
import { useRole } from "@/context/RoleContext";
import KycStatusDisplay from "./BorrowerKycStatus";

interface RequestItem {
  id: string;
  borrower: string;
  amount: number;
  purpose: string;
  duration: string;
}

export default function LenderDashboard() {
  const [funds, setFunds] = useState(15000);
  const [earnings] = useState(1240.5);
  const [requests, setRequests] = useState<RequestItem[]>([
    { id: "R-9001", borrower: "Alice Johnson", amount: 800, purpose: "Education", duration: "6 mo" },
    { id: "R-9002", borrower: "Mark Lee", amount: 450, purpose: "Medical", duration: "3 mo" },
  ]);

  const approve = (id: string) => setRequests((r) => r.filter((x) => x.id !== id));
  const reject = (id: string) => setRequests((r) => r.filter((x) => x.id !== id));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border brand-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Available Funds</p>
            <PiggyBank className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-3xl font-extrabold">₹{funds.toLocaleString()}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">KYC:</span>
            <KycStatusDisplay />
          </div>
        </div>
        <div className="rounded-2xl border brand-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Earnings</p>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-3xl font-extrabold">₹{earnings.toLocaleString()}</p>
        </div>
      </div>

      <div className="rounded-2xl border brand-card p-5 shadow-sm">
        <h2 className="text-lg font-bold">Loan Requests</h2>
        <div className="mt-4 grid gap-3">
          {requests.map((r) => (
            <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border rounded-xl p-3">
              <div>
                <p className="font-medium">{r.borrower} • <span className="text-muted-foreground">{r.duration}</span></p>
                <p className="text-sm text-muted-foreground">Purpose: {r.purpose}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold">₹{r.amount}</span>
                <button onClick={() => approve(r.id)} className="inline-flex items-center gap-1 rounded-lg bg-green-700 px-3 py-2 text-white shadow hover:opacity-95"><Check className="h-4 w-4"/> Approve</button>
                <button onClick={() => reject(r.id)} className="inline-flex items-center gap-1 rounded-lg bg-red-700 px-3 py-2 text-white shadow hover:opacity-95"><X className="h-4 w-4"/> Reject</button>
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <p className="text-sm text-muted-foreground">No pending requests. Check back later.</p>
          )}
        </div>
      </div>
    </div>
  );
}
