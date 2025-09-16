import { useRole } from "@/context/RoleContext";

export default function Profile() {
  const { role } = useRole();
  // end of sequence - no auto advance
  return (
    <div className="rounded-2xl border brand-card p-5 shadow-sm max-w-2xl">
      <h1 className="text-lg font-bold">Profile</h1>
      <form className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Full Name</label>
          <input className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-primary outline-none" placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-primary outline-none" placeholder="you@example.com" />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-primary outline-none" placeholder="+1 555 000 0000" />
        </div>
        <div>
          <label className="text-sm font-medium">Role</label>
          <input value={role} readOnly className="mt-1 w-full rounded-xl border px-3 py-2 bg-secondary/50" />
        </div>
        <div className="sm:col-span-2">
          <button className="w-full rounded-xl bg-primary py-2.5 text-primary-foreground font-medium shadow-md shadow-primary/30 hover:shadow-lg transition">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
