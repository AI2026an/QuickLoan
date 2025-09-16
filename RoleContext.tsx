import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "borrower" | "lender" | "admin";

type RoleContextValue = {
  role: Role;
  setRole: (r: Role) => void;
  logout: () => void;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("borrower");

  useEffect(() => {
    const saved = localStorage.getItem("quickloan.role") as Role | null;
    if (saved) setRoleState(saved);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    localStorage.setItem("quickloan.role", r);
  };

  const logout = () => {
    localStorage.removeItem("quickloan.role");
  };

  const value = useMemo(() => ({ role, setRole, logout }), [role]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
