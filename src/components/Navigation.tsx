import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isDappRoute = location.pathname === '/dapp';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            GreenToken<span className="text-green-400">Hub</span>
          </Link>

          {!isDappRoute && (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <NavLinks />
                <Link
                  to="/dapp"
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                >
                  Launch App
                </Link>
              </div>

              <button
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}
        </div>

        {!isDappRoute && isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <NavLinks />
              <Link
                to="/dapp"
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors text-center"
              >
                Launch App
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks: React.FC = () => (
  <>
    <Link to="/" className="text-gray-300 hover:text-white transition-colors">
      Home
    </Link>
    <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
      How It Works
    </a>
    <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">
      Benefits
    </a>
  </>
);

export default Navigation;