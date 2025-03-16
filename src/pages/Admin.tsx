
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { voteStorage } from '@/utils/voteStorage';
import Header from '@/components/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useVoting } from '@/context/VotingContext';
import { toast } from 'sonner';

const Admin = () => {
  const { candidates } = useVoting();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  
  const votes = voteStorage.getVotes();
  const results = voteStorage.getResults();
  
  // Format results for the chart
  const chartData = candidates.map(candidate => ({
    name: candidate.name,
    votes: results[candidate.id] || 0
  }));
  
  const totalVotes = votes.length;
  
  const verifySystem = () => {
    setIsVerifying(true);
    setVerificationStatus('verifying');
    
    // Simulate verification process
    setTimeout(() => {
      const success = voteStorage.verifyVotes();
      setVerificationStatus(success ? 'success' : 'error');
      setIsVerifying(false);
      
      if (success) {
        toast.success('System verification complete. All votes are intact.');
      } else {
        toast.error('Verification failed. Some votes may have been tampered with.');
      }
    }, 2500);
  };
  
  const resetSystem = () => {
    if (window.confirm('Are you sure you want to reset the voting system? This will clear all votes.')) {
      voteStorage.clearVotes();
      toast.success('Voting system has been reset successfully.');
      
      // Force component re-render
      setVerificationStatus('idle');
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 noise"></div>
      
      <Header />
      
      <main className="flex-1 container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-4 animate-slide-down">Admin Dashboard</h1>
            <p className="text-muted-foreground animate-slide-down animate-stagger-1">
              Monitor votes, verify system integrity, and manage the voting process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in animate-stagger-1">
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalVotes}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${
                    verificationStatus === 'success' ? 'bg-green-500' : 
                    verificationStatus === 'error' ? 'bg-red-500' : 
                    verificationStatus === 'verifying' ? 'bg-yellow-500 animate-pulse' : 
                    'bg-blue-500'
                  }`}></div>
                  <span className="font-medium">
                    {verificationStatus === 'success' ? 'Verified' : 
                     verificationStatus === 'error' ? 'Error' : 
                     verificationStatus === 'verifying' ? 'Verifying...' : 
                     'Active'}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Leading Candidate</CardTitle>
              </CardHeader>
              <CardContent>
                {chartData.length > 0 ? (
                  <div className="font-bold">
                    {chartData.sort((a, b) => b.votes - a.votes)[0]?.name || 'No votes yet'}
                  </div>
                ) : (
                  <div className="text-muted-foreground">No votes recorded</div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="results" className="animate-fade-in animate-stagger-2">
            <TabsList className="mb-6">
              <TabsTrigger value="results">Election Results</TabsTrigger>
              <TabsTrigger value="verification">System Verification</TabsTrigger>
              <TabsTrigger value="management">System Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="results" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle>Vote Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 && totalVotes > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderRadius: '0.5rem',
                              border: '1px solid rgba(0, 0, 0, 0.05)',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                          />
                          <Bar dataKey="votes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-80 flex items-center justify-center">
                      <p className="text-muted-foreground">No votes recorded yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle>Results Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chartData.length > 0 ? (
                      chartData.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.votes} vote{item.votes !== 1 ? 's' : ''} ({totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0}%)
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${totalVotes > 0 ? (item.votes / totalVotes) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No votes recorded yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="verification">
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle>Vote Integrity Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Verify the integrity of all votes to ensure no tampering has occurred.
                    This process checks cryptographic signatures and vote data consistency.
                  </p>
                  
                  <Button 
                    onClick={verifySystem} 
                    disabled={isVerifying}
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isVerifying ? 'Verifying...' : 'Verify System Integrity'}
                    </span>
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Button>
                  
                  {verificationStatus === 'success' && (
                    <div className="p-4 rounded-md bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <div className="flex">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <div>
                          <h4 className="font-medium">Verification Successful</h4>
                          <p className="text-sm mt-1">All votes are intact and have not been tampered with.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {verificationStatus === 'error' && (
                    <div className="p-4 rounded-md bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      <div className="flex">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <div>
                          <h4 className="font-medium">Verification Failed</h4>
                          <p className="text-sm mt-1">Some votes may have been tampered with. Review system logs.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="management">
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle>System Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Manage system settings and perform administrative actions.
                    Use these functions with caution.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-md border border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:border-amber-900/50 dark:text-amber-400">
                      <div className="flex">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <div>
                          <h4 className="font-medium">Warning: Destructive Actions</h4>
                          <p className="text-sm mt-1">The actions below will permanently remove data and cannot be undone.</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="destructive" 
                      onClick={resetSystem}
                      className="relative overflow-hidden group"
                    >
                      <span className="relative z-10">Reset Voting System</span>
                      <div className="absolute inset-0 bg-destructive opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
