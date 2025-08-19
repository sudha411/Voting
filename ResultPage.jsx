import React from "react";
import PageShell from "../components/PageShell";
import { useVotes } from "../context/VoteContext";

export default function ResultsPage() {
  const { candidates, totalVotes, leaderText } = useVotes();

  return (
    <PageShell title="Results & Leaderboard">
      <div className="overflow-hidden rounded-2xl bg-white border shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 text-sm">
            <tr>
              <th className="px-4 py-3">Candidate</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Votes</th>
              <th className="px-4 py-3">Share</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => {
              const share = totalVotes
                ? Math.round((c.votes / totalVotes) * 100)
                : 0;
              return (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.id}</td>
                  <td className="px-4 py-3 tabular-nums">{c.votes}</td>
                  <td className="px-4 py-3 tabular-nums">{share}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl bg-white border p-5 shadow-sm">
        <div className="text-sm text-slate-500">Leading Candidate</div>
        <div className="text-xl md:text-2xl font-semibold mt-1">
          {leaderText}
        </div>
        <div className="mt-2 text-sm text-slate-600">
          Total votes:{" "}
          <span className="font-semibold tabular-nums">{totalVotes}</span>
        </div>
      </div>
    </PageShell>
  );
}
