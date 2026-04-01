import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Discover from "@/pages/Discover";
import Vault from "@/pages/Vault";
import DAO from "@/pages/DAO";

const queryClient = new QueryClient();

type Tab = "home" | "discover" | "vault" | "dao";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "discover":
        return <Discover />;
      case "vault":
        return <Vault />;
      case "dao":
        return <DAO />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
          <main>{renderPage()}</main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
