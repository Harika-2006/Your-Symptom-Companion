import React, { useState } from 'react';
 import './header.css'; // Ensure this CSS file exists in the same folder

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Your Symptom Companion</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/home" className="text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">About</a>
            <a href="/features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
            <a href="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">Login</a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2">Home</a>
            <a href="#about" className="block text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2">About</a>
            <a href="#features" className="block text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2">Features</a>
            <a href="#contact" className="block text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}