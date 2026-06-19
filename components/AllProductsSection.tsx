'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { registerGSAP, gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 'dune-light',
    name: 'Dune Light',
    tagline: 'Desert warmth meets precision engineering.',
    description:
      'The warm-toned variant of the DUNE 75. Burnt-orange accents on a brushed aluminum shell — built for those who type with intent.',
    image: '/orange.png',
    badge: 'SIGNATURE',
    badgeColor: '#c8704a',
    specs: [
      { label: 'Layout', value: '75%' },
      { label: 'Color', value: 'Burnt Orange' },
      { label: 'Frame', value: 'Aluminum' },
      { label: 'Mount', value: 'Gasket' },
    ],
    accentColor: '#c8704a',
    glowColor: 'rgba(200, 112, 74, 0.12)',
    borderHover: 'rgba(200, 112, 74, 0.4)',
    price: '$289',
  },
  {
    id: 'dune-theme',
    name: 'Dune theme',
    tagline: 'Pure dark. Zero distraction.',
    description:
      'The stealth colorway. Space-grey aluminum with cold-blue legend backlight — engineered for late-night sessions and clean desk setups.',
    image: '/grey.png',
    badge: 'STEALTH',
    badgeColor: '#88c8e8',
    specs: [
      { label: 'Layout', value: '75%' },
      { label: 'Color', value: 'Space Grey' },
      { label: 'Frame', value: 'Aluminum' },
      { label: 'Mount', value: 'Gasket' },
    ],
    accentColor: '#88c8e8',
    glowColor: 'rgba(136, 200, 232, 0.08)',
    borderHover: 'rgba(136, 200, 232, 0.4)',
    price: '$269',
  },
];

export default function AllProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.products-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#080810] overflow-hidden"
      aria-labelledby="all-products-heading"
    >
      {/* Ambient dual glow */}
      <div
        className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,112,74,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(136,200,232,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="products-heading mb-16 md:mb-20">
          <span className="section-eyebrow">01 / Products</span>
          <h2
            id="all-products-heading"
            className="section-heading mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Choose your instrument.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '18px',
              color: '#7a7a8a',
              lineHeight: 1.75,
              maxWidth: '520px',
            }}
          >
            Two colorways. One standard. Both handcrafted from aerospace-grade aluminum with identical internals.
          </p>
        </div>

        {/* Product cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <div
                className="group relative rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(200,169,110,0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${product.borderHover}`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 32px 80px ${product.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(200,169,110,0.1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Badge */}
                <div className="absolute top-5 left-5 z-20">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] tracking-[3px] uppercase font-semibold"
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      background: `${product.accentColor}22`,
                      border: `1px solid ${product.accentColor}55`,
                      color: product.accentColor,
                    }}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Product image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ background: 'rgba(8,8,16,0.6)' }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(ellipse at center, ${product.glowColor} 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${product.image}`}
                    alt={`${product.name} keyboard colorway`}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Card body */}
                <div className="p-7 md:p-8">
                  {/* Name + price row */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className="text-[#f0ede6] font-bold mb-1"
                        style={{
                          fontFamily: 'var(--font-orbitron), sans-serif',
                          fontSize: 'clamp(22px, 2.5vw, 28px)',
                        }}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--font-jetbrains-mono), monospace',
                          color: product.accentColor,
                          letterSpacing: '1px',
                        }}
                      >
                        {product.tagline}
                      </p>
                    </div>
                    <span
                      className="text-2xl font-bold shrink-0 ml-4"
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        color: product.accentColor,
                      }}
                    >
                      {product.price}
                    </span>
                  </div>

                  <p
                    className="mb-6"
                    style={{
                      fontFamily: 'var(--font-space-grotesk), sans-serif',
                      fontSize: '15px',
                      color: '#7a7a8a',
                      lineHeight: 1.75,
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Specs row */}
                  <div className="grid grid-cols-4 gap-3 mb-7">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-xl p-3 text-center"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(200,169,110,0.08)',
                        }}
                      >
                        <p
                          className="text-[9px] tracking-[2px] uppercase mb-1"
                          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#7a7a8a' }}
                        >
                          {spec.label}
                        </p>
                        <p
                          className="text-xs font-semibold"
                          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', color: '#f0ede6' }}
                        >
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      className="flex-1 h-11 rounded-lg font-semibold text-sm transition-all duration-200"
                      style={{
                        background: product.accentColor,
                        color: '#080810',
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                        border: `1px solid ${product.accentColor}`,
                      }}
                      onClick={() => {
                        document.querySelector('#configure')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = '0.85';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = '1';
                      }}
                    >
                      Configure →
                    </button>
                    <button
                      className="h-11 px-5 rounded-lg text-sm transition-all duration-200"
                      style={{
                        background: 'transparent',
                        color: product.accentColor,
                        border: `1px solid ${product.accentColor}33`,
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${product.accentColor}88`;
                        (e.currentTarget as HTMLElement).style.background = `${product.accentColor}11`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${product.accentColor}33`;
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom compare strip */}
        <div
          className="mt-12 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(200,169,110,0.08)',
          }}
        >
          <div>
            <p
              className="text-[#f0ede6] font-semibold mb-1"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              Can't decide? Both models ship with free returns within 30 days.
            </p>
            <p
              className="text-[#7a7a8a] text-sm"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              Same internals. Different soul. Same lifetime warranty.
            </p>
          </div>
          <button
            className="shrink-0 h-10 px-6 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap"
            style={{
              background: 'transparent',
              color: '#c8a96e',
              border: '1px solid rgba(200,169,110,0.3)',
              fontFamily: 'var(--font-space-grotesk), sans-serif',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(200,169,110,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.3)';
            }}
          >
            Compare models
          </button>
        </div>
      </div>
    </section>
  );
}
