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

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-purple-300">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Web3 Music Platform · NFT-Gated Content
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Own Your</span>
          <br />
          <span className="text-white">Sound</span>
        </h1>

        <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          EchoPass is the gateway to exclusive artist stems, unreleased tracks,
          and music NFTs. Connect your wallet to unlock a new era of music ownership.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
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
            { label: "Artists", value: "240+" },
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
  );
}
