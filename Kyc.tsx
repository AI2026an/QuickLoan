import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { useKyc, KycRecord } from "@/context/KycContext";

export default function KycPage() {
  const { role } = useRole();
  const { getKyc, saveKyc } = useKyc();
  const navigate = useNavigate();

  const existing = getKyc(role);

  const [fullName, setFullName] = useState(existing?.fullName || "");
  const [dob, setDob] = useState(existing?.dob || "");
  const [idType, setIdType] = useState(existing?.idType || "Aadhar");
  const [idNumber, setIdNumber] = useState(existing?.idNumber || "");
  const [docPreview, setDocPreview] = useState<string | undefined>(existing?.documentUrl);
  const [status, setStatus] = useState(existing?.status || "not_submitted");

  useEffect(() => {
    setStatus(existing?.status || "not_submitted");
  }, [existing]);

  const onFile = (f?: File) => {
    if (!f) return setDocPreview(undefined);
    const reader = new FileReader();
    reader.onload = () => setDocPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const rec: KycRecord = {
      role,
      fullName,
      dob,
      idType,
      idNumber,
      documentUrl: docPreview,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    saveKyc(rec);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">KYC Verification</h1>
      <p className="mb-4 text-sm text-muted-foreground">Complete KYC for role: <span className="font-semibold capitalize">{role}</span></p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 w-full rounded-xl border px-3 py-2 bg-[color:transparent]" />
        </div>
        <div>
          <label className="text-sm font-medium">Date of birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="mt-1 w-full rounded-xl border px-3 py-2 bg-[color:transparent]" />
        </div>
        <div>
          <label className="text-sm font-medium">ID Type</label>
          <select value={idType} onChange={(e) => setIdType(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 bg-[color:transparent]">
            <option>Aadhar</option>
            <option>PAN</option>
            <option>Passport</option>
            <option>Driver's License</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">ID Number</label>
          <input value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required className="mt-1 w-full rounded-xl border px-3 py-2 bg-[color:transparent]" />
        </div>
        <div>
          <label className="text-sm font-medium">Document (photo of ID)</label>
          <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} className="mt-1 w-full" />
          {docPreview && <img src={docPreview} alt="preview" className="mt-3 h-40 object-contain rounded-lg" />}
        </div>
        <div>
          <button type="submit" className="rounded-xl btn-gradient px-4 py-2 font-medium">Submit for Verification</button>
          <span className="ml-3 text-sm text-muted-foreground">Current status: <strong className="ml-1 capitalize">{status}</strong></span>
        </div>
      </form>
    </div>
  );
}
