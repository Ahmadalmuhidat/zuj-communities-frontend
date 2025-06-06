import { Link, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/Auth_Context';

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Societies', path: '/societies' },
    { name: 'About', path: '/about' },
  ];
  
  return (
    <header className="bg-white shadow-sm py-4 border-b">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <nav className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`text-sm font-medium ${
                location.pathname === item.path ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-1 focus:outline-none"
          >
            {/* user icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">
              {isAuthenticated ? user?.Name : 'Account'}
            </span>
            {/* dropdown chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                  <Link to="/my-societies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Societies</Link>
                  <Link to="/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support</Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                  <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign up</Link>
                  <Link to="/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
