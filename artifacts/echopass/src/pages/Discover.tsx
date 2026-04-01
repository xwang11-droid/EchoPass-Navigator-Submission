import { useState } from "react";

const artists = [
  {
    id: 1,
    name: "Nova Pulse",
    genre: "Electronic · Ambient",
    avatar: "NP",
    color: "from-purple-600 to-blue-600",
    followers: "42.3K",
    nfts: 12,
    tracks: [
      { title: "Echoes in Void", duration: "4:22", plays: "18.2K" },
      { title: "Synthetic Drift", duration: "3:55", plays: "12.7K" },
      { title: "Neural Bloom", duration: "5:10", plays: "9.4K" },
    ],
    bio: "Electronic producer blending ambient textures with deep bass frequencies. Known for cinematic soundscapes that transcend genres.",
    price: "0.08 ETH",
  },
  {
    id: 2,
    name: "Solara",
    genre: "Afrobeats · Neo-Soul",
    avatar: "SL",
    color: "from-orange-500 to-pink-600",
    followers: "89.1K",
    nfts: 8,
    tracks: [
      { title: "Golden Hour", duration: "3:48", plays: "41.5K" },
      { title: "Lagos Dreams", duration: "4:02", plays: "28.3K" },
      { title: "Sundown Ritual", duration: "3:30", plays: "22.1K" },
    ],
    bio: "Afrobeats visionary fusing traditional rhythms with contemporary neo-soul production. Multiple Grammy nominations for genre-defying work.",
    price: "0.12 ETH",
  },
  {
    id: 3,
    name: "KRSH",
    genre: "Hip-Hop · Experimental",
    avatar: "KR",
    color: "from-cyan-500 to-emerald-600",
    followers: "31.8K",
    nfts: 5,
    tracks: [
      { title: "Static Mind", duration: "2:58", plays: "15.9K" },
      { title: "Glitch Era", duration: "3:22", plays: "11.2K" },
      { title: "Binary Bars", duration: "2:44", plays: "8.7K" },
    ],
    bio: "Underground rapper-producer pushing the limits of experimental hip-hop with glitch aesthetics and hyper-dense lyricism.",
    price: "0.06 ETH",
  },
];

function MusicPlayer({ track, artist }: { track: typeof artists[0]["tracks"][0]; artist: typeof artists[0] }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  return (
    <div className="glass rounded-2xl p-5 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-white">{track.title}</p>
          <p className="text-sm text-gray-400">{artist.name} · {track.duration}</p>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all"
        >
          {playing ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>
      </div>

      {playing && (
        <div className="waveform mb-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="waveform-bar"
              style={{
                height: `${20 + Math.random() * 12}px`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}

      <div
        className="relative h-1.5 bg-white/10 rounded-full cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setProgress(((e.clientX - rect.left) / rect.width) * 100);
        }}
      >
        <div className="progress-bar h-full rounded-full" style={{ width: `${progress}%` }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>1:18</span>
        <span>{track.duration}</span>
      </div>
    </div>
  );
}

function ArtistProfile({ artist, onBack }: { artist: typeof artists[0]; onBack: () => void }) {
  const [minted, setMinted] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(artist.tracks[0]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Discover
      </button>

      <div className={`h-48 rounded-3xl bg-gradient-to-br ${artist.color} mb-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-6 left-6 flex items-end gap-4">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${artist.color} flex items-center justify-center text-2xl font-bold text-white border-4 border-black/30`}>
            {artist.avatar}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{artist.name}</h2>
            <p className="text-white/70 text-sm">{artist.genre}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-3 text-white/80 text-sm">
          <span>{artist.followers} followers</span>
          <span>·</span>
          <span>{artist.nfts} NFTs</span>
        </div>
      </div>

      <p className="text-gray-400 mb-8 leading-relaxed">{artist.bio}</p>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Tracks</h3>
        <div className="space-y-2">
          {artist.tracks.map((track) => (
            <button
              key={track.title}
              onClick={() => setSelectedTrack(track)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                selectedTrack.title === track.title
                  ? "bg-purple-600/20 border border-purple-600/40"
                  : "glass hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedTrack.title === track.title ? "bg-purple-600" : "bg-white/10"
                }`}>
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </div>
                <span className="font-medium text-white">{track.title}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{track.plays} plays</span>
                <span>{track.duration}</span>
              </div>
            </button>
          ))}
        </div>

        <MusicPlayer track={selectedTrack} artist={artist} />
      </div>

      <div className="glass rounded-3xl p-6 border border-purple-600/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Collector's Pass NFT</h3>
            <p className="text-gray-400 text-sm mt-1">Unlock exclusive stems and unreleased tracks</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold gradient-text">{artist.price}</p>
            <p className="text-xs text-gray-500">+ gas fees</p>
          </div>
        </div>
        <ul className="space-y-2 mb-6">
          {["Access to all exclusive stems", "Vote in artist DAO decisions", "Lifetime royalty share", "Direct artist messaging"].map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-gray-300">
              <svg className="w-4 h-4 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {perk}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setMinted(!minted)}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
            minted
              ? "bg-green-500/20 border border-green-500/50 text-green-400"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
          }`}
        >
          {minted ? "NFT Minted Successfully!" : `Mint NFT · ${artist.price}`}
        </button>
      </div>
    </div>
  );
}

export default function Discover() {
  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null);

  if (selectedArtist) {
    return <ArtistProfile artist={selectedArtist} onBack={() => setSelectedArtist(null)} />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Discover</h1>
        <p className="text-gray-400">Explore artists and collect their exclusive music NFTs</p>
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        {["All", "Electronic", "Hip-Hop", "Afrobeats", "Experimental"].map((genre, i) => (
          <button
            key={genre}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              i === 0
                ? "bg-purple-600 text-white"
                : "glass text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <button
            key={artist.id}
            onClick={() => setSelectedArtist(artist)}
            className="glass rounded-3xl overflow-hidden card-hover text-left group"
          >
            <div className={`h-40 bg-gradient-to-br ${artist.color} relative`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all" />
              <div className="absolute bottom-4 left-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${artist.color} flex items-center justify-center text-xl font-bold text-white border-2 border-white/20`}>
                  {artist.avatar}
                </div>
              </div>
              <div className="absolute top-3 right-3 glass rounded-full px-2 py-0.5 text-xs text-white/80">
                {artist.nfts} NFTs
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-1">{artist.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{artist.genre}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{artist.followers} followers</span>
                <span className="text-sm font-semibold gradient-text">{artist.price}</span>
              </div>

              <div className="space-y-2">
                {artist.tracks.slice(0, 2).map((track) => (
                  <div key={track.title} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-gray-400">
                      <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 3l14 9-14 9V3z" />
                      </svg>
                      {track.title}
                    </div>
                    <span className="text-gray-600">{track.plays}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Click to view profile</span>
                <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
