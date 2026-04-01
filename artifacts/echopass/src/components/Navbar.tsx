import { useState, useEffect, useRef } from "react";

type Tab = "home" | "discover" | "vault" | "dao";

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TAB_IDS: Tab[] = ["home", "discover", "vault", "dao"];

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const idx = TAB_IDS.indexOf(activeTab);
    const btn = tabRefs.current[idx];
    const container = tabContainerRef.current;
    if (btn && container) {
      const containerLeft = container.getBoundingClientRect().left;
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerLeft,
        width: btnRect.width,
      });
    }
  }, [activeTab]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "discover",
      label: "Discover",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      id: "vault",
      label: "My Vault",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      id: "dao",
      label: "DAO",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500">
      <div
        className="max-w-6xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: scrolled
            ? "rgba(10, 10, 18, 0.80)"
            : "rgba(255, 255, 255, 0.04)",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "none",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">EchoPass</span>
        </div>

        <div ref={tabContainerRef} className="hidden md:flex items-center gap-1 relative">
          <div
            className="absolute top-0 bottom-0 rounded-xl bg-purple-600"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 0 12px rgba(139, 92, 246, 0.5)",
            }}
          />

          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[idx] = el; }}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 z-10 ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span
              className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-60"
              style={{ animation: "breath 2.4s ease-in-out infinite" }}
            />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-gray-400">Mainnet</span>
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden mt-2 rounded-2xl px-4 py-3 max-w-6xl mx-auto"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: "rgba(10, 10, 18, 0.80)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { onTabChange(tab.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes breath {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </nav>
  );
}
