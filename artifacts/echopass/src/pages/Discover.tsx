import { useState, useRef, useEffect } from "react";

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
    tracks: [
      { title: "Echoes in Void", duration: "4:22", plays: "18.2K" },
      { title: "Synthetic Drift", duration: "3:55", plays: "12.7K" },
      { title: "Neural Bloom", duration: "5:10", plays: "9.4K" },
    ],
    bio: "Pop artist crafting heartfelt melodies and cinematic soundscapes. Known for emotionally resonant songwriting that connects across borders.",
    price: "0.08 ETH",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    spotifyUrl: "https://open.spotify.com/artist/6uznhEdfpGu4ZjuKB1p9RV?si=2D6y3cpZT1OvZ8qCDYEitA",
  },
  {
    id: 2,
    name: "Solara",
    genre: "Afrobeats · Neo-Soul",
    tags: ["Afrobeats"],
    avatar: "SL",
    color: "from-orange-500 to-pink-600",
    glowColor: "rgba(249,115,22,0.35)",
    followers: "89.1K",
    nfts: 8,
    tracks: [
      { title: "Golden Hour", duration: "3:48", plays: "41.5K" },
      { title: "Lagos Dreams", duration: "4:02", plays: "28.3K" },
      { title: "Sundown Ritual", duration: "3:30", plays: "22.1K" },
    ],
    bio: "Afrobeats visionary fusing traditional rhythms with contemporary neo-soul production. Multiple Grammy nominations for genre-defying work.",
    price: "0.12 ETH",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
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
    tracks: [
      { title: "Static Mind", duration: "2:58", plays: "15.9K" },
      { title: "Glitch Era", duration: "3:22", plays: "11.2K" },
      { title: "Binary Bars", duration: "2:44", plays: "8.7K" },
    ],
    bio: "Hip-Hop artist with a distinct voice and sharp lyricism. Known for authentic storytelling and hard-hitting production.",
    price: "0.06 ETH",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    spotifyUrl: "https://open.spotify.com/artist/3bpFgOURKBCczDYWtOx55H?si=aNydmcrrRP6fdos1p1Zyog",
  },
];

const genres = ["All", "Pop", "Hip-Hop", "Afrobeats"];

const genreToArtistId: Record<string, number> = {
  Pop: 1,
  Afrobeats: 2,
  "Hip-Hop": 3,
};

interface FloatingPlayerProps {
  artist: (typeof artists)[0];
  onClose: () => void;
}

function FloatingPlayer({ artist, onClose }: FloatingPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
      audio.play().catch(() => setPlaying(false));
    }
    return () => { audio?.pause(); };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-80"
      style={{
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
      }}
    >
      <audio ref={audioRef} src={artist.previewUrl} loop />
      <div
        className="rounded-2xl p-4"
        style={{
          background: "rgba(12,10,22,0.92)",
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

        <p className="text-xs text-gray-400 mb-3 leading-snug">
          Previewing a track by <span className="text-white font-semibold">{artist.name}</span>
        </p>

        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${artist.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
            {artist.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{artist.tracks[0].title}</p>
            <p className="text-xs text-gray-400">{artist.name}</p>
          </div>
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shrink-0"
            style={{ boxShadow: playing ? "0 0 12px rgba(139,92,246,0.6)" : "none" }}
          >
            {playing ? (
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </button>
        </div>

        {playing && (
          <div className="flex items-center gap-0.5 mt-3 h-5">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full"
                style={{
                  background: "linear-gradient(to top, #a855f7, #ec4899)",
                  animation: `waveform-bounce ${0.8 + (i % 5) * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.04}s`,
                }}
              />
            ))}
          </div>
        )}

        <div
          className="relative h-1 bg-white/10 rounded-full mt-3 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(pct);
            const audio = audioRef.current;
            if (audio && audio.duration) audio.currentTime = (pct / 100) * audio.duration;
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #a855f7, #ec4899)",
              transition: "width 0.5s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function InlineMusicPlayer({ track, artist }: { track: (typeof artists)[0]["tracks"][0]; artist: (typeof artists)[0] }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  return (
    <div className="rounded-2xl p-5 mt-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-white">{track.title}</p>
          <p className="text-sm text-gray-400">{artist.name} · {track.duration}</p>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{ boxShadow: playing ? "0 0 14px rgba(139,92,246,0.6)" : "none" }}
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
        <div className="flex items-center gap-0.5 h-8 mb-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full"
              style={{
                background: "linear-gradient(to top, #a855f7, #ec4899)",
                animation: `waveform-bounce ${0.8 + (i % 5) * 0.15}s ease-in-out infinite`,
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
        <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#a855f7,#ec4899)" }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg" style={{ left: `calc(${progress}% - 6px)` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>1:18</span>
        <span>{track.duration}</span>
      </div>
    </div>
  );
}

function ArtistProfile({ artist, onBack }: { artist: (typeof artists)[0]; onBack: () => void }) {
  const [minted, setMinted] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(artist.tracks[0]);

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
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Tracks</h3>
        <div className="space-y-2">
          {artist.tracks.map((track) => (
            <button
              key={track.title}
              onClick={() => setSelectedTrack(track)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] ${
                selectedTrack.title === track.title
                  ? "bg-purple-600/20 border border-purple-600/40"
                  : "hover:bg-white/10"
              }`}
              style={{
                background: selectedTrack.title === track.title ? undefined : "rgba(255,255,255,0.04)",
                border: selectedTrack.title === track.title ? undefined : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
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
        <InlineMusicPlayer track={selectedTrack} artist={artist} />
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
            minted
              ? "bg-green-500/20 border border-green-500/50 text-green-400"
              : "text-white"
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
      if (artist) {
        setFloatingPlayer(artist);
      }
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

  const filteredArtists = activeGenre === "All"
    ? artists
    : artists.filter((a) => a.tags.includes(activeGenre));

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Discover</h1>
        <p className="text-gray-400">Explore artists and collect their exclusive music NFTs</p>
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        {genres.map((genre) => {
          const isActive = activeGenre === genre;
          const isElectronic = genre === "Pop" && activeGenre !== "Pop";
          return (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #9333ea, #7c3aed)"
                  : "rgba(255,255,255,0.05)",
                border: isActive
                  ? "1px solid rgba(139,92,246,0.6)"
                  : "1px solid rgba(255,255,255,0.1)",
                color: isActive ? "#fff" : "#9ca3af",
                boxShadow: isActive ? "0 0 16px rgba(139,92,246,0.4)" : "none",
                animation: isElectronic ? "genre-breathe 2s ease-in-out infinite" : "none",
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
              style={{
                opacity: isDimmed ? 0.35 : 1,
                transition: "opacity 0.3s ease, box-shadow 0.4s ease",
                borderRadius: "1.5rem",
              }}
            >
              <button
                onClick={() => {
                  if (isDimmed) return;
                  const a = artist as typeof artist & { spotifyUrl?: string };
                  if (a.spotifyUrl) {
                    window.open(a.spotifyUrl, "_blank", "noopener,noreferrer");
                  } else {
                    setSelectedArtist(artist);
                  }
                }}
                disabled={isDimmed}
                className="w-full rounded-3xl overflow-hidden text-left group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                  cursor: isDimmed ? "default" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (isDimmed) return;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-6px) scale(1.02)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 20px 50px ${artist.glowColor}, 0 0 0 1px rgba(255,255,255,0.12)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                <div className={`h-40 bg-gradient-to-br ${artist.color} relative`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${artist.color} flex items-center justify-center text-xl font-bold text-white border-2 border-white/20`}>
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
                    <span className="text-xs text-gray-500">
                      {(artist as typeof artist & { spotifyUrl?: string }).spotifyUrl
                        ? "View on Spotify"
                        : "Click to view profile"}
                    </span>
                    <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {floatingPlayer && (
        <FloatingPlayer artist={floatingPlayer} onClose={() => setFloatingPlayer(null)} />
      )}

      <style>{`
        @keyframes genre-breathe {
          0%, 100% {
            box-shadow: 0 0 0px rgba(139,92,246,0);
            border-color: rgba(255,255,255,0.1);
          }
          50% {
            box-shadow: 0 0 14px rgba(139,92,246,0.55), 0 0 0 1px rgba(139,92,246,0.4);
            border-color: rgba(139,92,246,0.5);
          }
        }
      `}</style>
    </div>
  );
}
