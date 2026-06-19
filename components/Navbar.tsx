'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Products', href: '#product' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setActiveLink(label);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConfigure = () => {
    const el = document.querySelector('#configure');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] h-16 flex items-center px-6 md:px-12 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8, 8, 16, 0.92)' : 'rgba(8, 8, 16, 0.7)',
        backdropFilter: scrolled ? 'blur(32px)' : 'blur(16px)',
        WebkitBackdropFilter: scrolled ? 'blur(32px)' : 'blur(16px)',
        borderBottom: '1px solid rgba(200, 169, 110, 0.1)',
        boxShadow: scrolled ? '0 4px 40px rgba(200, 169, 110, 0.04)' : 'none',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 mr-auto group"
        aria-label="DUNE - Home"
      >
        <span className="text-[#c8a96e] text-lg leading-none" aria-hidden="true">◆</span>
        <span
          className="text-[#f0ede6] font-bold tracking-wider"
          style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: '20px' }}
        >
          DUNE
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8 mx-auto" aria-label="Main navigation">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNavClick(link.label, link.href)}
            className={`nav-link font-grotesk ${activeLink === link.label ? 'active' : ''}`}
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* CTA + Mobile hamburger */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="hidden md:flex border-[#c8a96e] text-[#c8a96e] hover:bg-[#c8a96e] hover:text-[#080810] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          onClick={handleConfigure}
        >
          Configure →
        </Button>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-[#f0ede6]"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col pt-16 gap-0">
            <div className="flex items-center gap-2 mb-10">
              <span className="text-[#c8a96e] text-lg">◆</span>
              <span
                className="text-[#f0ede6] font-bold text-xl tracking-wider"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                DUNE
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.label, link.href)}
                  className="text-left px-0 py-4 text-[#f0ede6] border-b border-[rgba(200,169,110,0.08)] text-lg hover:text-[#c8a96e] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="mt-8">
              <Button
                className="w-full btn-gold"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                onClick={handleConfigure}
              >
                Configure Your DUNE →
              </Button>
            </div>

            <p
              className="mt-auto text-[#7a7a8a] text-[10px] tracking-[3px] uppercase"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              © 2026 DUNE PERIPHERALS
            </p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
