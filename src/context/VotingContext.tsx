
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Candidate = {
  id: string;
  name: string;
  position: string;
};

type Vote = {
  candidateId: string;
  timestamp: number;
};

interface VotingContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  currentStep: 'nfc' | 'fingerprint' | 'vote' | 'confirmation';
  setCurrentStep: (step: 'nfc' | 'fingerprint' | 'vote' | 'confirmation') => void;
  candidates: Candidate[];
  selectedCandidate: string | null;
  setSelectedCandidate: (id: string | null) => void;
  castVote: () => void;
  votes: Vote[];
  resetVoting: () => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const useVoting = (): VotingContextType => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};

export const VotingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState<'nfc' | 'fingerprint' | 'vote' | 'confirmation'>('nfc');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);

  // Sample candidates data
  const candidates: Candidate[] = [
    { id: '1', name: 'Jane Smith', position: 'President' },
    { id: '2', name: 'John Doe', position: 'President' },
    { id: '3', name: 'Alex Johnson', position: 'President' }
  ];

  const castVote = () => {
    if (selectedCandidate) {
      const newVote: Vote = {
        candidateId: selectedCandidate,
        timestamp: Date.now()
      };
      setVotes([...votes, newVote]);
      setCurrentStep('confirmation');
    }
  };

  const resetVoting = () => {
    setIsAuthenticated(false);
    setCurrentStep('nfc');
    setSelectedCandidate(null);
  };

  return (
    <VotingContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentStep,
        setCurrentStep,
        candidates,
        selectedCandidate,
        setSelectedCandidate,
        castVote,
        votes,
        resetVoting
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
