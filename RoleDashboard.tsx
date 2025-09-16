import { useRole } from "@/context/RoleContext";
import BorrowerDashboard from "./BorrowerDashboard";
import LenderDashboard from "./LenderDashboard";
import AdminDashboard from "./AdminDashboard";


export default function RoleDashboard() {
  const { role } = useRole();
  if (role === "admin") return <AdminDashboard />;
  if (role === "lender") return <LenderDashboard />;
  return <BorrowerDashboard />;
}
