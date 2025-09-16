import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type KycStatus = "not_submitted" | "pending" | "verified" | "rejected";

export type KycRecord = {
  role: "borrower" | "lender" | "admin";
  fullName: string;
  dob?: string;
  idType?: string;
  idNumber?: string;
  documentUrl?: string; // data URL preview
  status: KycStatus;
  submittedAt?: string;
  reviewedAt?: string;
  reviewer?: string;
};

type KycContextValue = {
  getKyc: (role: KycRecord["role"]) => KycRecord | null;
  saveKyc: (rec: KycRecord) => void;
  listAll: () => KycRecord[];
  updateStatus: (role: KycRecord["role"], status: KycStatus, reviewer?: string) => void;
};

const KYC_KEY = "quickloan.kyc.records";
const KycContext = createContext<KycContextValue | undefined>(undefined);

function readStorage(): KycRecord[] {
  try {
    const raw = localStorage.getItem(KYC_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as KycRecord[];
  } catch (e) {
    return [];
  }
}

function writeStorage(records: KycRecord[]) {
  localStorage.setItem(KYC_KEY, JSON.stringify(records));
}

export function KycProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<KycRecord[]>(() => readStorage());

  useEffect(() => {
    writeStorage(records);
  }, [records]);

  const getKyc = (role: KycRecord["role"]) => records.find((r) => r.role === role) ?? null;

  const saveKyc = (rec: KycRecord) => {
    setRecords((prev) => {
      const others = prev.filter((r) => r.role !== rec.role);
      return [...others, rec];
    });
  };

  const listAll = () => records;

  const updateStatus = (role: KycRecord["role"], status: KycStatus, reviewer?: string) => {
    setRecords((prev) => prev.map((r) => (r.role === role ? { ...r, status, reviewedAt: new Date().toISOString(), reviewer } : r)));
  };

  const value = useMemo(() => ({ getKyc, saveKyc, listAll, updateStatus }), [records]);

  return <KycContext.Provider value={value}>{children}</KycContext.Provider>;
}

export function useKyc() {
  const ctx = useContext(KycContext);
  if (!ctx) throw new Error("useKyc must be used within KycProvider");
  return ctx;
}
