'use client';

import { useEffect, useRef, useState } from 'react';
import { registerGSAP, gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = [
  {
    heading: 'Products',
    links: [
      { label: 'Dune Light', href: '#product' },
      { label: 'Dune theme', href: '#dune-theme-detail' },
      { label: 'Switches', href: '#' },
      { label: 'Keycaps', href: '#' },
      { label: 'Accessories', href: '#' },
    ],
  },
  {
    heading: 'Technology',
    links: [
      { label: 'Gasket Mount', href: '#product-detail' },
      { label: 'Hot-Swap', href: '#' },
      { label: 'QMK/VIA', href: '#' },
      { label: 'Wireless', href: '#' },
      { label: 'RGB System', href: '#' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Warranty', href: '#' },
      { label: 'Firmware', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
];

const socialIcons = {
  X: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.732-8.835L1.254 2.25H8.08l4.713 5.88zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  YouTube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you! ${email} has been subscribed.`);
      setEmail('');
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#080810] border-t border-[rgba(200,169,110,0.1)]"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Top row — Logo + Newsletter */}
        <div className="footer-col flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 pb-16 border-b border-[rgba(200,169,110,0.08)]">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#c8a96e] text-xl" aria-hidden="true">◆</span>
              <span
                className="text-[#f0ede6] font-bold text-2xl tracking-wider"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                DUNE
              </span>
            </div>
            <p
              className="text-[#7a7a8a] text-sm max-w-xs"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              Engineered for those who demand silence, precision, and performance.
            </p>
          </div>

          {/* Newsletter */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            aria-label="Newsletter signup"
          >
            <label htmlFor="footer-email" className="sr-only">
              Your email address
            </label>
            <Input
              id="footer-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer-input h-11 min-w-64 text-sm"
              required
            />
            <Button
              type="submit"
              className="btn-gold h-11 px-6 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              Subscribe
            </Button>
          </form>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {footerLinks.map((col) => (
            <div key={col.heading} className="footer-col">
              <h3
                className="text-[#f0ede6] font-semibold mb-4 text-sm"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#7a7a8a] text-sm hover:text-[#c8a96e] transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="footer-col flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 border-t border-[rgba(200,169,110,0.08)]">
          <p
            className="text-[#7a7a8a]"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '11px',
              letterSpacing: '1px',
            }}
          >
            © 2026 DUNE PERIPHERALS. ALL RIGHTS RESERVED.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {Object.entries(socialIcons).map(([name, icon]) => (
              <a
                key={name}
                href="#"
                className="text-[#7a7a8a] hover:text-[#c8a96e] transition-colors duration-200"
                aria-label={`DUNE on ${name}`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
