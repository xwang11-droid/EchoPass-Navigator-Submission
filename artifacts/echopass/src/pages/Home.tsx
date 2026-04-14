import { createThirdwebClient } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { ConnectButton, darkTheme } from "thirdweb/react";

const client = createThirdwebClient({
  clientId: "9212d5bcee1b22fc5540a552e53aeba9",
});

const echoTheme = darkTheme({
  colors: {
    accentText: "#a855f7",
    accentButtonBg: "#9333ea",
    accentButtonText: "#ffffff",
    primaryButtonBg: "#9333ea",
    primaryButtonText: "#ffffff",
    modalBg: "#0d0d18",
    modalOverlayBg: "rgba(0,0,0,0.75)",
    borderColor: "rgba(255,255,255,0.08)",
    separatorLine: "rgba(255,255,255,0.06)",
    secondaryText: "#9ca3af",
    primaryText: "#f9fafb",
    inputAutofillBg: "#0d0d18",
    tooltipBg: "#1a1a2e",
    tooltipText: "#f9fafb",
    selectedTextBg: "#9333ea",
    connectedButtonBg: "rgba(255,255,255,0.04)",
    connectedButtonBgHover: "rgba(255,255,255,0.08)",
  },
});

const rewards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "The Tribe",
    color: "from-purple-500 to-violet-600",
    glow: "rgba(139,92,246,0.3)",
    description:
      "Access private Discord channels with Berklee's top producers. Get direct feedback, session invites, and first access to unreleased projects — reserved for Genesis Pass holders only.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    label: "The Hunt",
    color: "from-pink-500 to-rose-600",
    glow: "rgba(236,72,153,0.3)",
    description:
      "A rare chance to discover unreleased stems and demo 'leaks' before they hit the world. Every Pass unlocks a different vault — you never know what you'll find.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    label: "The Self",
    color: "from-amber-400 to-orange-500",
    glow: "rgba(251,191,36,0.3)",
    description:
      "A digital badge of honor proving you were a Day 1 supporter before they went global. Your wallet becomes proof-of-belief — the ultimate flex for music insiders.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Hero ── */}
      <div className="relative flex flex-col items-center justify-center min-h-screen hero-gradient">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Berklee College of Music · Web3 Music Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">EchoPass:</span>
            <br />
            <span className="text-white">Own the Genesis of</span>
            <br />
            <span className="gradient-text">Berklee Legends.</span>
          </h1>

          <p className="text-xl text-gray-300 mb-2 max-w-2xl mx-auto leading-relaxed font-medium">
            The track is a moment; the Pass is the journey.
          </p>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't just stream — become a founding stakeholder in your classmate's career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="connect-wallet-wrapper">
              <ConnectButton
                client={client}
                chain={polygon}
                theme={echoTheme}
                connectButton={{
                  label: "Connect Wallet",
                  style: {
                    background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    padding: "1rem 2rem",
                    borderRadius: "9999px",
                    border: "none",
                    boxShadow: "0 0 20px rgba(139,92,246,0.35)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  },
                }}
                detailsButton={{
                  style: {
                    background: "rgba(255,255,255,0.04)",
                    color: "#f9fafb",
                    fontWeight: "600",
                    fontSize: "1rem",
                    padding: "0.875rem 1.75rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 12px rgba(139,92,246,0.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </div>

            <button className="px-8 py-4 rounded-full font-semibold text-lg text-gray-300 glass hover:bg-white/10 transition-all duration-300">
              Explore Artists
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { label: "Berklee Originals", value: "240+" },
              { label: "NFTs Minted", value: "18K+" },
              { label: "Stems Released", value: "5.2K" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-sm">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </div>

      {/* ── About / Variable Rewards Section ── */}
      <div className="relative px-6 py-24 max-w-6xl mx-auto w-full">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-600/5 blur-3xl" />
        </div>

        <div className="relative z-10 text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-purple-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            The Hooked Model — Why Genesis Pass Holders Keep Coming Back
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Variable Rewards That{" "}
            <span className="gradient-text">Keep You In.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            EchoPass is engineered around the psychology of belonging. Every Pass unlocks
            three layers of reward — social, experiential, and identity-driven.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewards.map((r) => (
            <div
              key={r.label}
              className="rounded-3xl p-7 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 0 0 0 transparent",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 48px ${r.glow}`;
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 0 transparent";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white shrink-0`}
                style={{ boxShadow: `0 4px 16px ${r.glow}` }}
              >
                {r.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{r.label}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{r.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Passes are limited. Once an artist's vault closes, it's gone forever.
          </p>
        </div>
      </div>
    </div>
  );
}
