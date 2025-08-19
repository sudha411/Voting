import React, { createContext, useContext, useMemo, useState } from "react";

const VoteContext = createContext();

const initialCandidates = [
  { id: "A", name: "Candidate A", votes: 0 },
  { id: "B", name: "Candidate B", votes: 0 },
  { id: "C", name: "Candidate C", votes: 0 },
];

export function VoteProvider({ children }) {
  const [candidates, setCandidates] = useState(initialCandidates);

  const vote = (id) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c))
    );
  };

  const totalVotes = useMemo(
    () => candidates.reduce((sum, c) => sum + c.votes, 0),
    [candidates]
  );

  const leaderText = useMemo(() => {
    const max = Math.max(...candidates.map((c) => c.votes));
    if (max === 0) return "No votes yet";
    const leaders = candidates.filter((c) => c.votes === max);
    return leaders.length > 1
      ? `Tie between ${leaders.map((l) => l.name).join(" & ")}`
      : leaders[0].name;
  }, [candidates]);

  const value = { candidates, vote, totalVotes, leaderText };
  return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
}

export function useVotes() {
  const ctx = useContext(VoteContext);
  if (!ctx) throw new Error("useVotes must be used within VoteProvider");
  return ctx;
}
