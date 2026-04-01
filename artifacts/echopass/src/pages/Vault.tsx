export default function Vault() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">My Vault</h1>
        <p className="text-gray-400">Your exclusive NFT-gated music collection</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl bg-black/60 backdrop-blur-md border border-white/5">
          <div className="text-center px-6 max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-900/40 flex items-center justify-center border border-purple-500/30 pulse-glow">
              <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">NFT Required</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your Vault is locked. Mint an artist NFT from the Discover page to unlock exclusive stems, unreleased demos, and production files.
            </p>

            <div className="space-y-3 text-sm mb-8">
              {[
                { icon: "🎛️", label: "Multi-track stems & instrumentals" },
                { icon: "🎙️", label: "Unreleased vocal takes & b-sides" },
                { icon: "📁", label: "Production project files (Ableton, Logic)" },
                { icon: "🎧", label: "Artist commentary and session notes" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-gray-300">{item.label}</span>
                  <svg className="w-4 h-4 text-gray-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              ))}
            </div>

            <a href="#discover" className="block w-full py-4 rounded-2xl font-semibold text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all">
              Browse Artists & Mint NFT
            </a>
          </div>
        </div>

        <div className="blur-sm pointer-events-none select-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Nova Pulse — Echoes in Void", "KRSH — Static Mind", "Solara — Lagos Dreams", "Nova Pulse — Neural Bloom"].map((item) => (
              <div key={item} className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600" />
                <div>
                  <p className="font-semibold text-white text-sm">{item.split("—")[0]}</p>
                  <p className="text-gray-500 text-xs">{item.split("—")[1]?.trim()}</p>
                </div>
                <div className="ml-auto">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
