import { useState, useRef } from "react";

const artists = [
  {
    id: 1,
    name: "MingChen Liang",
    genre: "Pop",
    tags: ["Pop"],
    avatar: "ML",
    color: "from-purple-600 to-blue-600",
    glowColor: "rgba(139,92,246,0.35)",
    followers: "42.3K",
    nfts: 12,
    bio: "Pop artist crafting heartfelt melodies and cinematic soundscapes. Known for emotionally resonant songwriting that connects across borders.",
    price: "0.08 ETH",
    spotifyArtistId: "6uznhEdfpGu4ZjuKB1p9RV",
    spotifyUrl: "https://open.spotify.com/artist/6uznhEdfpGu4ZjuKB1p9RV?si=2D6y3cpZT1OvZ8qCDYEitA",
  },
  {
    id: 2,
    name: "ZURI",
    genre: "Afrobeats",
    tags: ["Afrobeats"],
    avatar: "ZU",
    color: "from-orange-500 to-pink-600",
    glowColor: "rgba(249,115,22,0.35)",
    followers: "89.1K",
    nfts: 8,
    bio: "Afrobeats artist bringing infectious rhythms and vibrant energy. Known for powerful vocal delivery and genre-defining production.",
    price: "0.12 ETH",
    spotifyArtistId: "3BK5gMsNlUDLm3wgwT0DUF",
    spotifyUrl: "https://open.spotify.com/artist/3BK5gMsNlUDLm3wgwT0DUF?si=KRcI05psSZiSGVS32Nhd4A",
  },
  {
    id: 3,
    name: "Kaleb Reyna",
    genre: "Hip-Hop",
    tags: ["Hip-Hop"],
    avatar: "KR",
    color: "from-cyan-500 to-emerald-600",
    glowColor: "rgba(6,182,212,0.35)",
    followers: "31.8K",
    nfts: 5,
    bio: "Hip-Hop artist with a distinct voice and sharp lyricism. Known for authentic storytelling and hard-hitting production.",
    price: "0.06 ETH",
    spotifyArtistId: "3bpFgOURKBCczDYWtOx55H",
    spotifyUrl: "https://open.spotify.com/artist/3bpFgOURKBCczDYWtOx55H?si=aNydmcrrRP6fdos1p1Zyog",
  },
];

const genres = ["All", "Pop", "Hip-Hop", "Afrobeats"];

const genreToArtistId: Record<string, number> = {
  Pop: 1,
  Afrobeats: 2,
  "Hip-Hop": 3,
};

function SpotifyEmbed({ artistId, height = 152 }: { artistId: string; height?: number }) {
  const src = `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`;
  return (
    <iframe
      src={src}
      width="100%"
      height={height}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      style={{
        borderRadius: "12px",
        display: "block",
      }}
    />
  );
}

interface FloatingPlayerProps {
  artist: (typeof artists)[0];
  onClose: () => void;
}

function FloatingPlayer({ artist, onClose }: FloatingPlayerProps) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-[340px]"
      style={{
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
      }}
    >
      <div
        className="rounded-2xl p-4"
        style={{
          background: "rgba(12,10,22,0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(139,92,246,0.35)",
          boxShadow: "0 8px 40px rgba(139,92,246,0.25), 0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs text-purple-300 font-medium">Now Playing</span>
          </div>
          <button
            onClick={handleClose}
            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Previewing a track by <span className="text-white font-semibold">{artist.name}</span>
        </p>
        <SpotifyEmbed artistId={artist.spotifyArtistId} height={152} />
      </div>
    </div>
  );
}

function ArtistProfile({ artist, onBack }: { artist: (typeof artists)[0]; onBack: () => void }) {
  const [minted, setMinted] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-all hover:gap-3 mb-8"
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Listen</h3>
          <a
            href={artist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Open on Spotify
          </a>
        </div>
        <SpotifyEmbed artistId={artist.spotifyArtistId} height={352} />
      </div>

      <div className="rounded-3xl p-6 border border-purple-600/30" style={{ background: "rgba(255,255,255,0.03)" }}>
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
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${
            minted ? "bg-green-500/20 border border-green-500/50 text-green-400" : "text-white"
          }`}
          style={!minted ? {
            background: "linear-gradient(135deg, #9333ea, #ec4899)",
            boxShadow: "0 4px 24px rgba(139,92,246,0.35)",
          } : undefined}
        >
          {minted ? "NFT Minted Successfully!" : `Mint NFT · ${artist.price}`}
        </button>
      </div>
    </div>
  );
}

export default function Discover() {
  const [selectedArtist, setSelectedArtist] = useState<(typeof artists)[0] | null>(null);
  const [activeGenre, setActiveGenre] = useState("All");
  const [floatingPlayer, setFloatingPlayer] = useState<(typeof artists)[0] | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleGenreClick = (genre: string) => {
    setActiveGenre(genre);
    const targetId = genreToArtistId[genre];
    if (targetId) {
      const el = cardRefs.current[targetId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.transition = "box-shadow 0.4s ease";
        const artist = artists.find((a) => a.id === targetId)!;
        el.style.boxShadow = `0 0 0 2px rgba(139,92,246,0.7), 0 0 32px ${artist.glowColor}`;
        setTimeout(() => { el.style.boxShadow = ""; }, 1800);
      }
      const artist = artists.find((a) => a.id === targetId);
      if (artist) setFloatingPlayer(artist);
    }
  };

  if (selectedArtist) {
    return (
      <>
        <ArtistProfile artist={selectedArtist} onBack={() => setSelectedArtist(null)} />
        {floatingPlayer && (
          <FloatingPlayer artist={floatingPlayer} onClose={() => setFloatingPlayer(null)} />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Discover</h1>
        <p className="text-gray-400">Explore artists and collect their exclusive music NFTs</p>
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        {genres.map((genre) => {
          const isActive = activeGenre === genre;
          const isPop = genre === "Pop" && activeGenre !== "Pop";
          return (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: isActive ? "linear-gradient(135deg, #9333ea, #7c3aed)" : "rgba(255,255,255,0.05)",
                border: isActive ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(255,255,255,0.1)",
                color: isActive ? "#fff" : "#9ca3af",
                boxShadow: isActive ? "0 0 16px rgba(139,92,246,0.4)" : "none",
                animation: isPop ? "genre-breathe 2s ease-in-out infinite" : "none",
              }}
            >
              {genre}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artists.map((artist) => {
          const isDimmed = activeGenre !== "All" && !artist.tags.includes(activeGenre);
          return (
            <div
              key={artist.id}
              ref={(el) => { cardRefs.current[artist.id] = el; }}
              className="rounded-3xl overflow-hidden flex flex-col"
              style={{
                opacity: isDimmed ? 0.35 : 1,
                transition: "opacity 0.3s ease, box-shadow 0.4s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                if (isDimmed) return;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${artist.glowColor}, 0 0 0 1px rgba(255,255,255,0.10)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div className={`h-36 bg-gradient-to-br ${artist.color} relative shrink-0`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${artist.color} flex items-center justify-center text-lg font-bold text-white border-2 border-white/20`}>
                    {artist.avatar}
                  </div>
                </div>
                <div
                  className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs text-white/90"
                  style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  {artist.nfts} NFTs
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{artist.name}</h3>
                    <p className="text-xs text-gray-400">{artist.genre}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold gradient-text">{artist.price}</p>
                    <p className="text-xs text-gray-500">{artist.followers}</p>
                  </div>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mb-3"
                >
                  <SpotifyEmbed artistId={artist.spotifyArtistId} height={152} />
                </div>

                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    disabled={isDimmed}
                    onClick={() => !isDimmed && setSelectedArtist(artist)}
                    className="text-xs text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    Mint NFT →
                  </button>
                  <a
                    href={artist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Open Spotify
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {floatingPlayer && (
        <FloatingPlayer artist={floatingPlayer} onClose={() => setFloatingPlayer(null)} />
      )}

      <style>{`
        @keyframes genre-breathe {
          0%, 100% { box-shadow: 0 0 0px rgba(139,92,246,0); border-color: rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 14px rgba(139,92,246,0.55), 0 0 0 1px rgba(139,92,246,0.4); border-color: rgba(139,92,246,0.5); }
        }
      `}</style>
    </div>
  );
}
