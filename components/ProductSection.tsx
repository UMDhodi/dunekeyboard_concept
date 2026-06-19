'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { registerGSAP, gsap } from '@/lib/gsap';

const SPEC_ITEMS = [
  'ALUMINUM FRAME',
  'PBT DOUBLESHOT KEYCAPS',
  'HOT-SWAP PCB',
  'QMK / VIA COMPATIBLE',
  'USB-C + BLUETOOTH 5.0',
  'PER-KEY RGB',
  'GASKET MOUNTED',
  'SOUTH-FACING LEDs',
];

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const badge4Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        productRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: productRef.current,
            start: 'top 85%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const badges = [badge1Ref, badge2Ref, badge3Ref, badge4Ref];
      const origins = [
        { x: -30, y: -30 },
        { x: 30, y: -30 },
        { x: -30, y: 30 },
        { x: 30, y: 30 },
      ];

      badges.forEach((ref, i) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, x: origins[i].x, y: origins[i].y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: productRef.current,
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
      id="product-detail"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#0f0f1e] overflow-hidden"
      aria-labelledby="product-heading"
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <span className="section-eyebrow">01 / Product</span>
          <h2
            id="product-heading"
            className="section-heading mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            The DUNE 75.
          </h2>
          <p
            className="max-w-xl"
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '18px',
              color: '#7a7a8a',
              lineHeight: 1.75,
            }}
          >
            A 75% layout precision instrument handcrafted from aerospace-grade aluminum.
          </p>
        </div>

        {/* Product image + floating badges */}
        <div
          ref={productRef}
          className="relative flex items-center justify-center"
          style={{ willChange: 'transform' }}
        >
          {/* Spec badges — hidden on mobile */}
          <div className="hidden md:block">
            <div
              ref={badge1Ref}
              className="spec-badge absolute"
              style={{ top: '5%', left: '0%', minWidth: 140 }}
            >
              <p className="text-[#7a7a8a] text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>Material</p>
              <p className="text-[#f0ede6] text-sm font-semibold" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>6061-T6 CNC</p>
            </div>
            <div
              ref={badge2Ref}
              className="spec-badge absolute"
              style={{ top: '5%', right: '0%', minWidth: 140 }}
            >
              <p className="text-[#7a7a8a] text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>Switches</p>
              <p className="text-[#f0ede6] text-sm font-semibold" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Gateron G Pro</p>
            </div>
            <div
              ref={badge3Ref}
              className="spec-badge absolute"
              style={{ bottom: '5%', left: '0%', minWidth: 140 }}
            >
              <p className="text-[#7a7a8a] text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>Weight</p>
              <p className="text-[#f0ede6] text-sm font-semibold" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>1.2 kg</p>
            </div>
            <div
              ref={badge4Ref}
              className="spec-badge absolute"
              style={{ bottom: '5%', right: '0%', minWidth: 140 }}
            >
              <p className="text-[#7a7a8a] text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>Layout</p>
              <p className="text-[#f0ede6] text-sm font-semibold" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>75% TKL</p>
            </div>
          </div>

          {/* Product image */}
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-[#0a0a18] shadow-[0_0_120px_rgba(200,169,110,0.08)]">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/product.png`}
              alt="DUNE 75 mechanical keyboard — flagship model"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Bottom vignette */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(8,8,16,0) 55%, rgba(15,15,30,0.7) 100%)' }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Mobile badges grid */}
        <div className="md:hidden mt-8 grid grid-cols-2 gap-3">
          {[
            { label: 'Material', value: '6061-T6 CNC' },
            { label: 'Switches', value: 'Gateron G Pro' },
            { label: 'Weight', value: '1.2 kg' },
            { label: 'Layout', value: '75% TKL' },
          ].map((b) => (
            <div key={b.label} className="spec-badge">
              <p className="text-[#7a7a8a] text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{b.label}</p>
              <p className="text-[#f0ede6] text-sm font-semibold" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>{b.value}</p>
            </div>
          ))}
        </div>

        {/* Marquee spec bar */}
        <div className="mt-16 border-t border-b border-[rgba(200,169,110,0.1)] py-4 overflow-hidden">
          <div className="marquee-track">
            {[...SPEC_ITEMS, ...SPEC_ITEMS].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 pr-4"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                <span className="text-[#c8a96e] text-xs tracking-[2px] whitespace-nowrap">{item}</span>
                <span className="text-[#c8a96e] text-xs opacity-40">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
