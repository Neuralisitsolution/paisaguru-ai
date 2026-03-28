'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

const calculatorLinks = [
  { name: 'SIP Calculator', href: '/calculators/sip' },
  { name: 'EMI Calculator', href: '/calculators/emi' },
  { name: 'FD Calculator', href: '/calculators/fd' },
  { name: 'PPF Calculator', href: '/calculators/ppf' },
  { name: 'Income Tax Calculator', href: '/calculators/income-tax' },
  { name: 'HRA Calculator', href: '/calculators/hra' },
  { name: 'Gratuity Calculator', href: '/calculators/gratuity' },
  { name: 'NPS Calculator', href: '/calculators/nps' },
];

const articleCategories = [
  { name: 'Mutual Funds', href: '/articles/category/mutual-funds' },
  { name: 'Stock Market', href: '/articles/category/stock-market' },
  { name: 'Tax Planning', href: '/articles/category/tax-planning' },
  { name: 'Insurance', href: '/articles/category/insurance' },
  { name: 'Personal Finance', href: '/articles/category/personal-finance' },
  { name: 'Banking', href: '/articles/category/banking' },
  { name: 'Real Estate', href: '/articles/category/real-estate' },
  { name: 'Retirement Planning', href: '/articles/category/retirement-planning' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const [mobileCalculatorsOpen, setMobileCalculatorsOpen] = useState(false);
  const [mobileArticlesOpen, setMobileArticlesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const calculatorsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calculatorsRef.current && !calculatorsRef.current.contains(e.target as Node)) {
        setCalculatorsOpen(false);
      }
      if (articlesRef.current && !articlesRef.current.contains(e.target as Node)) {
        setArticlesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
          scrolled ? 'shadow-lg' : 'shadow-sm'
        } bg-white border-b border-gray-100`}
      >
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1 shrink-0"
              aria-label="PaisaGuru AI Home"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-600 text-white font-heading font-bold text-lg">
                &#8377;
              </span>
              <span className="font-heading font-bold text-xl text-gray-900">
                Paisa<span className="text-primary-600">Guru</span>
              </span>
              <span className="ml-1 rounded bg-secondary-600 px-1.5 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wide">
                AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                Home
              </Link>

              {/* Calculators Dropdown */}
              <div ref={calculatorsRef} className="relative">
                <button
                  onClick={() => {
                    setCalculatorsOpen(!calculatorsOpen);
                    setArticlesOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  aria-expanded={calculatorsOpen}
                  aria-haspopup="true"
                >
                  Calculators
                  <svg
                    className={`w-4 h-4 transition-transform ${calculatorsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {calculatorsOpen && (
                  <div className="absolute left-0 top-full mt-1 w-56 rounded-lg bg-white shadow-xl border border-gray-100 py-2 z-50">
                    {calculatorLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setCalculatorsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/calculators"
                        className="block px-4 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                        onClick={() => setCalculatorsOpen(false)}
                      >
                        View All Calculators &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Articles Dropdown */}
              <div ref={articlesRef} className="relative">
                <button
                  onClick={() => {
                    setArticlesOpen(!articlesOpen);
                    setCalculatorsOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  aria-expanded={articlesOpen}
                  aria-haspopup="true"
                >
                  Articles
                  <svg
                    className={`w-4 h-4 transition-transform ${articlesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {articlesOpen && (
                  <div className="absolute left-0 top-full mt-1 w-56 rounded-lg bg-white shadow-xl border border-gray-100 py-2 z-50">
                    {articleCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setArticlesOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/articles"
                        className="block px-4 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                        onClick={() => setArticlesOpen(false)}
                      >
                        View All Articles &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/quiz"
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                Quiz
              </Link>

              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                aria-label="Open search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <Link
                href="/calculators"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Free Tools
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 z-40 bg-white overflow-y-auto">
            <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Calculators */}
              <div>
                <button
                  onClick={() => setMobileCalculatorsOpen(!mobileCalculatorsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  aria-expanded={mobileCalculatorsOpen}
                >
                  Calculators
                  <svg
                    className={`w-5 h-5 transition-transform ${mobileCalculatorsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileCalculatorsOpen && (
                  <div className="ml-4 space-y-1 mt-1">
                    {calculatorLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Articles */}
              <div>
                <button
                  onClick={() => setMobileArticlesOpen(!mobileArticlesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  aria-expanded={mobileArticlesOpen}
                >
                  Articles
                  <svg
                    className={`w-5 h-5 transition-transform ${mobileArticlesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileArticlesOpen && (
                  <div className="ml-4 space-y-1 mt-1">
                    {articleCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/quiz"
                className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quiz
              </Link>

              <Link
                href="/about"
                className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <div className="pt-4 px-4">
                <Link
                  href="/calculators"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-600 text-white text-base font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Free Tools
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </>
  );
}
