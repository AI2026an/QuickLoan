export default function Wallet() {
  const balance = 2350.75;
  const txs = [
    { id: "T-1", type: "Credit", amount: 500, date: "2025-08-12" },
    { id: "T-2", type: "Debit", amount: -120, date: "2025-08-10" },
    { id: "T-3", type: "Debit", amount: -60, date: "2025-08-07" },
  ];
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border brand-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Current Balance</p>
        <p className="mt-2 text-3xl font-extrabold">₹{balance.toLocaleString()}</p>
      </div>
      <div className="rounded-2xl border brand-card p-5 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-2 text-left font-medium">ID</th>
              <th className="py-2 text-left font-medium">Type</th>
              <th className="py-2 text-left font-medium">Amount</th>
              <th className="py-2 text-left font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {txs.map(t => (
              <tr key={t.id} className="border-t">
                <td className="py-2">{t.id}</td>
                <td className="py-2">{t.type}</td>
                <td className={`py-2 ${t.amount < 0 ? "text-red-400" : "text-green-400"}`}>₹{Math.abs(t.amount).toLocaleString()}</td>
                <td className="py-2">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
