
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Smartphone } from 'lucide-react';

interface NFCReaderProps {
  onScanComplete: (success: boolean) => void;
}

const NFCReader: React.FC<NFCReaderProps> = ({ onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  
  // Simulate NFC scanning process
  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanning(false);
            onScanComplete(true); // Simulate successful scan
            return 100;
          }
          return prev + 5;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [scanning, onScanComplete]);
  
  const startScan = () => {
    setScanning(true);
    setProgress(0);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-background/50 backdrop-blur-lg border border-border/50 shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg font-medium">NFC Authentication</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Please place your voter ID card on the reader
          </p>
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-3 py-1 rounded-full inline-flex items-center">
            <Smartphone size={12} className="mr-1" />
            <span>Using mock cards for demo — real NFC cards work in hardware prototype</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center w-full">
          <div className={`w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 ${scanning ? 'border-primary nfc-pulse' : 'border-muted-foreground/30'} flex items-center justify-center mb-6`}>
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full ${scanning ? 'bg-primary/10' : 'bg-muted/30'} flex items-center justify-center`}>
              <svg width={isMobile ? "48" : "64"} height={isMobile ? "48" : "64"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${scanning ? 'text-primary animate-pulse-slow' : 'text-muted-foreground/70'}`}>
                <path d="M2 8.82257C2 6.3225 2 5.0724 2.67308 4.03493C3.24177 3.16522 4.16522 2.24177 5.03493 1.67308C6.0724 1 7.3225 1 9.82257 1H14.1774C16.6775 1 17.9276 1 18.9651 1.67308C19.8348 2.24177 20.7582 3.16522 21.3269 4.03493C22 5.0724 22 6.3225 22 8.82257V15.1774C22 17.6775 22 18.9276 21.3269 19.9651C20.7582 20.8348 19.8348 21.7582 18.9651 22.3269C17.9276 23 16.6775 23 14.1774 23H9.82257C7.3225 23 6.0724 23 5.03493 22.3269C4.16522 21.7582 3.24177 20.8348 2.67308 19.9651C2 18.9276 2 17.6775 2 15.1774V8.82257Z" />
                <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" />
                <path d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z" />
              </svg>
            </div>
          </div>
          
          {scanning ? (
            <div className="w-full mb-4">
              <div className="h-1 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">Scanning{" "}
                <span className="loading-dots"></span>
              </p>
            </div>
          ) : (
            <Button onClick={startScan} className="mt-2 relative overflow-hidden group">
              <span className="relative z-10">Scan NFC Card</span>
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NFCReader;
