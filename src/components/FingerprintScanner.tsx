
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FingerprintScannerProps {
  onScanComplete: (success: boolean) => void;
}

const FingerprintScanner: React.FC<FingerprintScannerProps> = ({ onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [scanStage, setScanStage] = useState<'initial' | 'scanning' | 'processing' | 'complete'>('initial');
  
  // Simulate fingerprint scanning process
  useEffect(() => {
    if (scanning) {
      setScanStage('scanning');
      
      const scanTimer = setTimeout(() => {
        setScanStage('processing');
        
        const processTimer = setTimeout(() => {
          setScanStage('complete');
          setScanning(false);
          onScanComplete(true); // Simulate successful verification
        }, 1500);
        
        return () => clearTimeout(processTimer);
      }, 2500);
      
      return () => clearTimeout(scanTimer);
    }
  }, [scanning, onScanComplete]);
  
  const startScan = () => {
    setScanning(true);
    setScanStage('initial');
  };
  
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-background/50 backdrop-blur-lg border border-border/50">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium">Fingerprint Verification</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Place your finger on the scanner for identity verification
          </p>
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-3 py-1 rounded-full inline-flex items-center">
            <span>Press Button to Pass the test — real Fingerprint work's in hardware prototype</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center w-full">
          <div className={`w-48 h-64 rounded-2xl border-2 ${scanStage !== 'initial' ? 'border-primary fingerprint-scan' : 'border-muted-foreground/30'} flex items-center justify-center mb-6 overflow-hidden`}>
            <div className="relative w-40 h-56 rounded-xl bg-muted/30 flex items-center justify-center overflow-hidden">
              {scanStage === 'initial' ? (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/70">
                  <path d="M12 11C12 8.17157 12 6.75736 12.8787 5.87868C13.7574 5 15.1716 5 18 5C20.8284 5 22.2426 5 23.1213 5.87868C24 6.75736 24 8.17157 24 11V13C24 15.8284 24 17.2426 23.1213 18.1213C22.2426 19 20.8284 19 18 19C15.1716 19 13.7574 19 12.8787 18.1213C12 17.2426 12 15.8284 12 13V11Z" />
                  <path d="M7 11C7 8.17157 7 6.75736 7.87868 5.87868C8.75736 5 10.1716 5 13 5" />
                  <path d="M7 11V13C7 15.8284 7 17.2426 7.87868 18.1213C8.75736 19 10.1716 19 13 19" />
                  <path d="M16 9H20M16 12H20M16 15H20" />
                </svg>
              ) : scanStage === 'scanning' ? (
                <div className="relative animate-pulse">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M19.0002 13.5C19.0002 14.1394 18.8767 14.7712 18.6386 15.3615C18.4005 15.9518 18.0528 16.4914 17.6146 16.9502C17.1764 17.409 16.6535 17.7713 16.0747 18.0195C15.4958 18.2677 14.8696 18.4 14.236 18.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9.95029 18.4C8.66729 18.4 7.43729 17.896 6.50029 16.9966C5.56329 16.0972 5.04129 14.8813 5.02729 13.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5.04 10.2855C5.16867 8.99846 5.87309 7.81148 6.96613 7.02759C8.05917 6.2437 9.43574 5.93409 10.7867 6.17291C12.1376 6.41173 13.3298 7.17581 14.0852 8.30042C14.8405 9.42504 15.0926 10.7975 14.78 12.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8.5 13.5C8.5 14.0483 8.72357 14.5745 9.12127 14.9644C9.51897 15.3542 10.0567 15.5749 10.6147 15.5854C11.1728 15.5959 11.7177 15.3953 12.1299 15.02C12.542 14.6447 12.7847 14.1266 12.804 13.5736" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12.76 10.24C12.5894 9.71618 12.2302 9.27116 11.7473 8.99234C11.2644 8.71352 10.6937 8.61902 10.1469 8.72732C9.60022 8.83562 9.11926 9.13857 8.81168 9.57654C8.5041 10.0145 8.39492 10.5543 8.5 11.08" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              ) : scanStage === 'processing' ? (
                <div className="flex flex-col items-center space-y-2">
                  <svg className="animate-spin-slow h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-xs text-muted-foreground">Analyzing...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm font-medium text-primary mt-2">Verified</span>
                </div>
              )}
              
              {/* Animated scan effect */}
              {scanStage === 'scanning' && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-full w-full" style={{
                  animation: 'scan 2.5s linear infinite',
                  backgroundSize: '100% 10px',
                }}></div>
              )}
            </div>
          </div>
          
          {scanStage === 'initial' && (
            <Button onClick={startScan} className="mt-2 relative overflow-hidden group">
              <span className="relative z-10">Start Fingerprint Scan</span>
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          )}
          
          {scanStage === 'scanning' && (
            <p className="text-sm text-center mt-2 text-muted-foreground">
              Hold your finger steady<span className="loading-dots"></span>
            </p>
          )}
          
          {scanStage === 'processing' && (
            <p className="text-sm text-center mt-2 text-muted-foreground">
              Processing fingerprint data<span className="loading-dots"></span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FingerprintScanner;
