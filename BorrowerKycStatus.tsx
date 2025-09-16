import { Link } from "react-router-dom";
import { useKyc } from "@/context/KycContext";
import { useRole } from "@/context/RoleContext";

export default function KycStatusDisplay() {
  const { getKyc } = useKyc();
  const { role } = useRole();
  const rec = getKyc(role);
  if (!rec || rec.status === "not_submitted") {
    return (
      <Link to="/kyc" className="rounded-lg px-3 py-1 bg-secondary text-secondary-foreground font-medium">Start KYC</Link>
    );
  }
  if (rec.status === "pending") {
    return <span className="text-amber-300">Pending review</span>;
  }
  if (rec.status === "verified") {
    return <span className="text-green-300">Verified</span>;
  }
  return <span className="text-red-300">Rejected</span>;
}
