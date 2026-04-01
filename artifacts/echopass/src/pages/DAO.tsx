import { useState } from "react";

const proposals = [
  {
    id: 1,
    title: "Next Album Cover — Visual Direction",
    description: "Vote on the aesthetic direction for Nova Pulse's upcoming album 'Liminal Space'. Three concepts have been submitted by community artists.",
    status: "Active",
    endDate: "Apr 12, 2026",
    totalVotes: 3248,
    options: [
      {
        id: "a",
        label: "Concept A — Abstract Digital",
        description: "Glitchy, hyper-digital aesthetic with fragmented geometry and neon accents on deep black.",
        votes: 1382,
        image: "from-purple-600 to-blue-800",
      },
      {
        id: "b",
        label: "Concept B — Organic Minimalism",
        description: "Soft gradients and natural forms. Inspired by aerial photography and earth textures.",
        votes: 1104,
        image: "from-emerald-600 to-teal-800",
      },
      {
        id: "c",
        label: "Concept C — Retro Analog",
        description: "VHS-style grain and warm analog tones. Nostalgic 80s synth-pop energy meets modern production.",
        votes: 762,
        image: "from-orange-600 to-rose-800",
      },
    ],
  },
];

const pastProposals = [
  { title: "Merchandise line color palette", result: "Electric Purple won · 89% participation", ended: "Mar 20, 2026" },
  { title: "Tour setlist priority vote", result: "Fan-favorite classics won · 76% participation", ended: "Feb 28, 2026" },
  { title: "Charity partner selection Q1", result: "Music education fund won · 94% participation", ended: "Jan 15, 2026" },
];

export default function DAO() {
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const proposal = proposals[0];
  const userVote = votes[String(proposal.id)];
  const hasSubmitted = submitted[String(proposal.id)];
  const totalVotes = hasSubmitted ? proposal.totalVotes + 1 : proposal.totalVotes;

  const getVoteCount = (optionId: string) => {
    if (hasSubmitted && userVote === optionId) {
      return proposal.options.find((o) => o.id === optionId)!.votes + 1;
    }
    return proposal.options.find((o) => o.id === optionId)!.votes;
  };

  const getPercent = (optionId: string) => {
    return Math.round((getVoteCount(optionId) / totalVotes) * 100);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">DAO</h1>
          <p className="text-gray-400">Use your NFTs to shape the future of music</p>
        </div>
        <div className="glass rounded-2xl px-4 py-3 text-center">
          <p className="text-2xl font-bold gradient-text">248</p>
          <p className="text-xs text-gray-500">Voting Power</p>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-purple-600/20 mb-8">
        <div className="flex items-start justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Active
          </span>
          <span className="text-sm text-gray-500">Ends {proposal.endDate}</span>
        </div>

        <h2 className="text-2xl font-bold text-white mt-3 mb-2">{proposal.title}</h2>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">{proposal.description}</p>

        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {totalVotes.toLocaleString()} votes cast
          </span>
          <span>·</span>
          <span>NFT holders only</span>
        </div>

        <div className="space-y-4">
          {proposal.options.map((option) => (
            <div
              key={option.id}
              onClick={() => !hasSubmitted && setVotes((v) => ({ ...v, [String(proposal.id)]: option.id }))}
              className={`rounded-2xl border transition-all cursor-pointer ${
                hasSubmitted
                  ? "cursor-default"
                  : "cursor-pointer hover:border-purple-500/50"
              } ${
                userVote === option.id
                  ? "border-purple-500/60 bg-purple-600/10"
                  : "border-white/10 glass"
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.image} shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white">{option.label}</h3>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        userVote === option.id
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-600"
                      }`}>
                        {userVote === option.id && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{option.description}</p>
                  </div>
                </div>

                {hasSubmitted && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>{getVoteCount(option.id).toLocaleString()} votes</span>
                      <span>{getPercent(option.id)}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full rounded-full transition-all duration-700"
                        style={{ width: `${getPercent(option.id)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {!hasSubmitted ? (
            <button
              disabled={!userVote}
              onClick={() => setSubmitted((s) => ({ ...s, [String(proposal.id)]: true }))}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
                userVote
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              }`}
            >
              {userVote ? "Submit Vote" : "Select an option to vote"}
            </button>
          ) : (
            <div className="w-full py-4 rounded-2xl font-semibold text-center bg-green-500/20 border border-green-500/30 text-green-400">
              Vote Submitted · Thank you for participating
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Past Proposals</h3>
        <div className="space-y-3">
          {pastProposals.map((p) => (
            <div key={p.title} className="glass rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white text-sm">{p.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.result}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-xs text-gray-600">{p.ended}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-500">Closed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
