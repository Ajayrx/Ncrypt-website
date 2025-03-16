
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Ballot from '@/components/Ballot';
import { useVoting } from '@/context/VotingContext';

const Voting = () => {
  const { isAuthenticated, currentStep } = useVoting();
  
  // If not authenticated, redirect to authentication page
  if (!isAuthenticated) {
    return <Navigate to="/authentication" />;
  }
  
  // If already completed voting, redirect to confirmation
  if (currentStep === 'confirmation') {
    return <Navigate to="/confirmation" />;
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 noise"></div>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">Cast Your Vote</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select your preferred candidates for each position. Your vote is secure, 
            private, and will be stored with end-to-end encryption.
          </p>
        </div>
        
        <div className="w-full max-w-2xl mx-auto animate-scale-in">
          <Ballot />
        </div>
        
        <div className="mt-16 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 max-w-2xl mx-auto animate-fade-in animate-stagger-2">
          <h3 className="font-medium mb-3">Privacy & Security Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Your vote is stored locally with strong encryption
            </li>
            <li className="flex items-start">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              No personally identifiable information is linked to your vote
            </li>
            <li className="flex items-start">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Tamper-proof mechanisms ensure vote integrity
            </li>
            <li className="flex items-start">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Offline operation prevents network-based attacks
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Voting;
