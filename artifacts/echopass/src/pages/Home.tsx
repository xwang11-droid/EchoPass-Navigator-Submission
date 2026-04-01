import { useState } from "react";

export default function Home() {
  const [connected, setConnected] = useState(false);

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
          <button
            onClick={() => setConnected(!connected)}
            className={`group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
              connected
                ? "bg-green-500/20 border border-green-500/50 text-green-400"
                : "bg-purple-600 hover:bg-purple-500 text-white pulse-glow"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {connected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  Wallet Connected
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Connect Wallet
                </>
              )}
            </span>
          </button>

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
