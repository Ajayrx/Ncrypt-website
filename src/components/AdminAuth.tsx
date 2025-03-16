
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

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
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Admin Authentication</CardTitle>
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
                className={error ? "border-red-500" : ""}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
              {error && (
                <p className="text-sm text-red-500">Incorrect password</p>
              )}
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
