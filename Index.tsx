import React from "react";
import useAutoAdvance from "@/hooks/useAutoAdvance";

export default function Index() {
  useAutoAdvance("/signup", 3000);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="flex items-center justify-center" style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0d0d22, #2424db)" }}>
        <div className="quickloan-logo w-full max-w-lg mx-auto p-8" style={{ borderRadius: '1rem' }}>
          <div className="logo-circle mx-auto mb-6" style={{ width: '30vw', maxWidth: 120, aspectRatio: '1 / 1', backgroundColor: '#ffb84d', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div className="tick" style={{ width: '40%', height: '20%', borderLeft: '4px solid black', borderBottom: '4px solid black', transform: 'rotate(-45deg)', position: 'absolute' }} />
          </div>

          <div className="text-center">
            <div className="app-name" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 700, color: '#66e0ff', marginBottom: '1rem' }}>QuickLoan</div>
            <div className="tagline" style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)', color: '#d17be0' }}>
              Let’s Get <span style={{ fontWeight: 700, color: '#ff4dd2' }}>Started!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
