import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRole } from "@/context/RoleContext";


export default function Login() {
  const { setRole } = useRole();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoleLocal] = useState<"borrower" | "lender" | "admin">("borrower");
  const navigate = useNavigate();


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid place-items-center brand-hero px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border brand-card p-6 shadow-xl">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">Login to your QuickLoan account</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-3 rounded-xl border p-1 bg-secondary">
            {(["borrower", "lender", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleLocal(r)}
                className={`rounded-lg px-3 py-2 text-sm capitalize transition ${
                  role === r ? "brand-card shadow" : "text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium">Email or Phone</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border bg-[color:transparent] px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border bg-[color:transparent] px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button type="submit" className="w-full rounded-xl bg-primary py-2.5 text-primary-foreground font-medium shadow-md shadow-primary/30 hover:shadow-lg transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          New here? <Link to="/signup" className="text-primary underline-offset-4 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
