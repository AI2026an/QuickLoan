import { useKyc } from "@/context/KycContext";

export default function KycPending() {
  const { listAll, updateStatus } = useKyc();
  const records = listAll().filter((r) => r.status === "pending");

  if (records.length === 0) return <p className="mt-3 text-sm text-muted-foreground">No pending KYC applications.</p>;

  return (
    <div className="mt-3 space-y-3">
      {records.map((r) => (
        <div key={r.role} className="rounded-xl border p-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-medium capitalize">{r.role} — {r.fullName}</p>
            <p className="text-sm text-muted-foreground">ID: {r.idType} • {r.idNumber}</p>
            {r.documentUrl && <img src={r.documentUrl} alt="doc" className="mt-2 h-24 object-contain rounded-md" />}
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => updateStatus(r.role, "verified", "admin")} className="rounded-lg bg-green-700 px-3 py-2 text-white">Verify</button>
            <button onClick={() => updateStatus(r.role, "rejected", "admin")} className="rounded-lg bg-red-700 px-3 py-2 text-white">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
