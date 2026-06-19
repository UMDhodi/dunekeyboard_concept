'use client';

import { useEffect, useRef } from 'react';
import { registerGSAP, gsap } from '@/lib/gsap';

export default function ThemeBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Parallax effect on background
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Fade-in effect on content
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex items-center justify-center bg-[#080810]"
      style={{ height: '80vh' }}
      aria-label="Limited Edition Theme Banner"
    >
      {/* Background Image Container with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${basePath}/dune_theme_03.png)`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Sleek Dark Vignette Overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(8, 8, 16, 0.85) 0%, rgba(8, 8, 16, 0.4) 40%, rgba(8, 8, 16, 0.4) 60%, rgba(8, 8, 16, 0.9) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Gold side lights */}
      <div
        className="absolute inset-y-0 left-0 w-1/4 z-10 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(to right, rgba(200, 169, 110, 0.15) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6"
      >
        <span
          className="text-[#c8a96e] text-xs tracking-[6px] uppercase font-semibold px-4 py-1.5 rounded-full border border-rgba(200, 169, 110, 0.3) bg-[rgba(200,169,110,0.05)] backdrop-blur-md"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          LIMITED EDITION RELEASE
        </span>

        <h2
          className="font-black text-[#f0ede6] leading-none text-gradient-gold"
          style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
            fontSize: 'clamp(40px, 7vw, 76px)',
          }}
        >
          THE DUNE THEME
        </h2>

        <p
          className="max-w-2xl text-base md:text-lg text-[#a0a0b0]"
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            lineHeight: 1.8,
          }}
        >
          Inspired by the shifting sands of the deep desert. Featuring exclusive sand-anodized keycaps, a copper weighting system, and custom acoustic foam profile. Engineered to sound like wind whistling through the dunes.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span
            className="w-2.5 h-2.5 rounded-full bg-[#c8a96e] animate-ping"
            aria-hidden="true"
          />
          <span
            className="text-xs text-[#7a7a8a] tracking-[2px] uppercase font-medium"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            Only 250 individually numbered units available
          </span>
        </div>
      </div>
    </section>
  );
}
