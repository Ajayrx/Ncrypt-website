
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 noise"></div>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              Secure • Offline • Verifiable
            </span>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 text-balance">
              NFC Vote Guardian
            </h1>
            
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              A fully offline, secure voting system using NFC cards and fingerprint verification. 
              Protect democracy with tamper-proof, transparent, and private elections.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-slide-up animate-stagger-1">
            <Link to="/authentication">
              <Button className="relative overflow-hidden group px-8 py-6 text-base">
                <span className="relative z-10">Start Voting Process</span>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button variant="outline" className="relative overflow-hidden group px-8 py-6 text-base">
                <span className="relative z-10">Admin Dashboard</span>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto animate-slide-up animate-stagger-2">
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 11C12 8.17157 12 6.75736 12.8787 5.87868C13.7574 5 15.1716 5 18 5C20.8284 5 22.2426 5 23.1213 5.87868C24 6.75736 24 8.17157 24 11V13C24 15.8284 24 17.2426 23.1213 18.1213C22.2426 19 20.8284 19 18 19C15.1716 19 13.7574 19 12.8787 18.1213C12 17.2426 12 15.8284 12 13V11Z" />
                <path d="M7 11C7 8.17157 7 6.75736 7.87868 5.87868C8.75736 5 10.1716 5 13 5" />
                <path d="M7 11V13C7 15.8284 7 17.2426 7.87868 18.1213C8.75736 19 10.1716 19 13 19" />
                <path d="M16 9H20M16 12H20M16 15H20" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-1">Biometric Verification</h3>
            <p className="text-sm text-muted-foreground text-center">
              Secure voter identity with fingerprint matching technology
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M2 8.82257C2 6.3225 2 5.0724 2.67308 4.03493C3.24177 3.16522 4.16522 2.24177 5.03493 1.67308C6.0724 1 7.3225 1 9.82257 1H14.1774C16.6775 1 17.9276 1 18.9651 1.67308C19.8348 2.24177 20.7582 3.16522 21.3269 4.03493C22 5.0724 22 6.3225 22 8.82257V15.1774C22 17.6775 22 18.9276 21.3269 19.9651C20.7582 20.8348 19.8348 21.7582 18.9651 22.3269C17.9276 23 16.6775 23 14.1774 23H9.82257C7.3225 23 6.0724 23 5.03493 22.3269C4.16522 21.7582 3.24177 20.8348 2.67308 19.9651C2 18.9276 2 17.6775 2 15.1774V8.82257Z" />
                <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" />
                <path d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-1">NFC Authentication</h3>
            <p className="text-sm text-muted-foreground text-center">
              Contactless voter ID verification using secure NFC technology
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-1">Fully Offline</h3>
            <p className="text-sm text-muted-foreground text-center">
              No internet required, resistant to network-based attacks
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-1">Tamper-Proof</h3>
            <p className="text-sm text-muted-foreground text-center">
              End-to-end encryption with secure local storage
            </p>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border/40 mt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2023 NFC Vote Guardian. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Security
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
