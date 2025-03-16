
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-6 bg-background glass-dark fixed top-0 z-50 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
            NFC
          </div>
          <span className="font-semibold text-lg">Vote Guardian</span>
        </Link>
        
        <nav className="flex items-center">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/authentication" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/authentication' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Authenticate
              </Link>
            </li>
            <li>
              <Link 
                to="/voting" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/voting' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Vote
              </Link>
            </li>
            <li>
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/admin' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
