import { cn as _cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={_cn("flex items-center gap-2 select-none", className)}>
      <div
        className="h-9 w-9 rounded-full grid place-items-center shadow-md"
        style={{ background: "hsl(var(--secondary))" }}
      >
        <div
          style={{
            width: "42%",
            height: "22%",
            borderLeft: "3px solid rgba(0,0,0,0.9)",
            borderBottom: "3px solid rgba(0,0,0,0.9)",
            transform: "rotate(-45deg)",
          }}
        />
      </div>
      <div className="leading-tight">
        <p className="font-extrabold text-xl tracking-tight text-primary">QuickLoan</p>
        <p className="text-xs text-muted-foreground -mt-0.5">Fast • Secure • Simple</p>
      </div>
    </div>
  );
}
