
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import NFCReader from '@/components/NFCReader';
import FingerprintScanner from '@/components/FingerprintScanner';
import { Button } from '@/components/ui/button';
import { useVoting } from '@/context/VotingContext';
import { toast } from 'sonner';

const Authentication = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, currentStep, setCurrentStep } = useVoting();
  const [nfcVerified, setNfcVerified] = useState(false);
  
  const handleNfcComplete = (success: boolean) => {
    if (success) {
      setNfcVerified(true);
      setCurrentStep('fingerprint');
      toast.success('NFC card verified successfully');
    } else {
      toast.error('NFC verification failed. Please try again.');
    }
  };
  
  const handleFingerprintComplete = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      toast.success('Identity verified successfully');
      setTimeout(() => {
        navigate('/voting');
      }, 1000);
    } else {
      toast.error('Fingerprint verification failed. Please try again.');
    }
  };
  
  // If already authenticated, redirect to voting page
  if (isAuthenticated) {
    return <Navigate to="/voting" />;
  }
  
  const renderAuthenticationStep = () => {
    switch (currentStep) {
      case 'nfc':
        return <NFCReader onScanComplete={handleNfcComplete} />;
      case 'fingerprint':
        return <FingerprintScanner onScanComplete={handleFingerprintComplete} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 noise"></div>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-slide-down">
          <h1 className="text-3xl font-bold mb-4">Voter Authentication</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Complete the two-factor authentication process to access your ballot.
            Your identity is verified locally and securely.
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto animate-scale-in">
          {renderAuthenticationStep()}
        </div>
        
        <div className="mt-12 flex items-center justify-center">
          {nfcVerified && currentStep === 'fingerprint' && (
            <Button 
              variant="outline"
              onClick={() => {
                setNfcVerified(false);
                setCurrentStep('nfc');
              }}
              className="text-sm"
            >
              &larr; Go back to NFC verification
            </Button>
          )}
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in animate-stagger-2">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="font-medium mb-2 flex items-center">
              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-xs text-primary">1</span>
              NFC Card Verification
            </h3>
            <p className="text-sm text-muted-foreground">
              Place your voter ID card on the NFC reader. The system will verify the card's authenticity and retrieve your encrypted voter information.
            </p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="font-medium mb-2 flex items-center">
              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-xs text-primary">2</span>
              Fingerprint Matching
            </h3>
            <p className="text-sm text-muted-foreground">
              Place your finger on the scanner. The system will match your fingerprint against the encrypted data on your voter ID card to confirm your identity.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Authentication;
