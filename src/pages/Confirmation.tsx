
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/card';
import { useVoting } from '@/context/VotingContext';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import StatusIndicator from '@/components/StatusIndicator';

const Confirmation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, selectedCandidate, candidates, resetVoting } = useVoting();
  
  // If not authenticated, redirect to authentication page
  if (!isAuthenticated) {
    return <Navigate to="/authentication" />;
  }
  
  // Find the selected candidate
  const candidate = candidates.find(c => c.id === selectedCandidate);
  
  // Effect to show toast on component mount
  useEffect(() => {
    toast.success('Vote cast successfully!');
  }, []);
  
  const handleFinish = () => {
    resetVoting();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 noise"></div>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-16 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 animate-slide-up">Thank You for Voting</h1>
          <p className="text-muted-foreground mb-8 animate-slide-up animate-stagger-1">
            Your vote has been securely recorded. Your participation helps ensure a fair and transparent democratic process.
          </p>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 mb-8 animate-scale-in animate-stagger-2">
            <h3 className="font-medium mb-3">Vote Receipt</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your vote has been anonymously recorded with the following details:
            </p>
            
            <div className="flex justify-between items-center py-2 border-t border-border/40">
              <span className="text-sm text-muted-foreground">Vote ID:</span>
              <span className="text-sm font-mono">{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-t border-border/40">
              <span className="text-sm text-muted-foreground">Position:</span>
              <span className="text-sm">{candidate?.position}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-t border-border/40">
              <span className="text-sm text-muted-foreground">Selected Candidate:</span>
              <span className="text-sm font-medium">{candidate?.name}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-t border-b border-border/40">
              <span className="text-sm text-muted-foreground">Timestamp:</span>
              <span className="text-sm">{new Date().toLocaleString()}</span>
            </div>
            
            <div className="mt-4 flex justify-center">
              <StatusIndicator status="success" message="Vote Verified" />
            </div>
          </div>
          
          <Button 
            onClick={handleFinish}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2 rounded-md animate-slide-up animate-stagger-3"
          >
            Finish
          </Button>
        </div>
      </main>
      
      <footer className="py-6 mt-auto border-t border-border/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-center text-muted-foreground">
            This receipt does not contain any personally identifiable information. 
            Your vote remains anonymous and secure.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Confirmation;
