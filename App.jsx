import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VoteProvider } from "./context/VoteContext";
import VotingPage from "./pages/VotingPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <VoteProvider>
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </VoteProvider>
    </BrowserRouter>
  );
}
