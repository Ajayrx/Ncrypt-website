
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const handleLogin = () => {
    // Default password is 0000
    if (password === '0000') {
      toast.success('Admin access granted');
      onAuthenticated();
    } else {
      setError(true);
      toast.error('Incorrect password');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
        <CardHeader className="pb-2">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl text-center">Admin Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Enter admin password
              </label>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`${error ? "border-red-500" : ""} transition-all duration-300`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
                placeholder="Enter password"
              />
              {error && (
                <p className="text-sm text-red-500 animate-fade-in">Incorrect password</p>
              )}
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full relative overflow-hidden btn-hover-effect"
            >
              Login
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Default password: 0000 
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
