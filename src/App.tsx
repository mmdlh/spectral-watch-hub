import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CyberLayout } from "@/components/cyber/CyberLayout";
import Overview from "./pages/Overview";
import Threats from "./pages/Threats";
import Vulnerabilities from "./pages/Vulnerabilities";
import Traffic from "./pages/Traffic";
import Logs from "./pages/Logs";
import Assets from "./pages/Assets";
import Alerts from "./pages/Alerts";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CyberLayout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/vulnerabilities" element={<Vulnerabilities />} />
            <Route path="/traffic" element={<Traffic />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<SystemSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CyberLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
