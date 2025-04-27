'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">J</span>
          </div>
          <span className="text-2xl font-semibold text-blue-600">JobHuntly</span>
        </Link>

        <button
          className="md:hidden text-blue-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-700 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 shadow-lg md:shadow-none z-10`}
        >
          <Link href="/jobs" className="text-lg font-medium hover:text-blue-600 transition-colors">
            Find Jobs
          </Link>
          <Link href="/companies" className="text-lg font-medium hover:text-blue-600 transition-colors">
            Add Jobs
          </Link>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/login" className="text-lg font-medium text-blue-600 hover:underline">
              Login
            </Link>
            <Link
              href="/register"
              className="btn text-center"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}