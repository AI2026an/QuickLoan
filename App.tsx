import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Index";
import NotFound from "./NotFound";
import Login from "./Login";
import Signup from "./Signup";
import AppLayout from "@/components/layout/AppLayout";
import RoleDashboard from "./RoleDashboard";
import Wallet from "./Wallet";
import Chat from "./Chat";
import Profile from "./Profile";
import Settings from "./Settings";
import KycPage from "./Kyc";
import { RoleProvider } from "@/context/RoleContext";
import { KycProvider } from "@/context/KycContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoleProvider>
          <KycProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/" element={<AppLayout />}>
                <Route path="dashboard" element={<RoleDashboard />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="chat" element={<Chat />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="kyc" element={<KycPage />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </KycProvider>
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
