export default function Settings() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border brand-card p-5 shadow-sm">
        <h2 className="text-lg font-bold">Change Password</h2>
        <form className="mt-4 space-y-3">
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Current password" type="password" />
          <input className="w-full rounded-xl border px-3 py-2" placeholder="New password" type="password" />
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Confirm new password" type="password" />
          <button className="w-full rounded-xl bg-primary py-2.5 text-primary-foreground font-medium shadow">Update Password</button>
        </form>
      </div>
      <div className="rounded-2xl border brand-card p-5 shadow-sm">
        <h2 className="text-lg font-bold">Notifications</h2>
        <div className="mt-4 space-y-3">
          <label className="flex items-center justify-between rounded-xl border p-3">
            <span>Email alerts</span>
            <input type="checkbox" defaultChecked className="h-5 w-5 accent" />
          </label>
          <label className="flex items-center justify-between rounded-xl border p-3">
            <span>SMS alerts</span>
            <input type="checkbox" className="h-5 w-5 accent" />
          </label>
          <label className="flex items-center justify-between rounded-xl border p-3">
            <span>Weekly summaries</span>
            <input type="checkbox" defaultChecked className="h-5 w-5 accent" />
          </label>
        </div>
      </div>
    </div>
  );
}
