
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/authentication', label: 'Authenticate' },
    { path: '/voting', label: 'Vote' },
    { path: '/admin', label: 'Admin' }
  ];
  
  const renderNavItems = (mobile = false) => (
    navItems.map(item => (
      <li key={item.path} className={mobile ? 'py-3' : ''}>
        <Link 
          to={item.path} 
          onClick={() => mobile && setIsOpen(false)}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
          } ${mobile ? 'text-lg block' : ''}`}
        >
          {item.label}
        </Link>
      </li>
    ))
  );
  
  return (
    <header className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-background glass-dark fixed top-0 z-50 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
            NFC
          </div>
          <span className="font-semibold text-lg">Vote Guardian</span>
        </Link>
        
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-background/95 backdrop-blur-lg">
              <nav className="flex flex-col h-full py-6">
                <ul className="flex flex-col space-y-1">
                  {renderNavItems(true)}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center">
            <ul className="flex space-x-8">
              {renderNavItems()}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
