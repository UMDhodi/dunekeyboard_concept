'use client';

import { useEffect, useRef } from 'react';
import { registerGSAP, gsap } from '@/lib/gsap';
import GlassCard from './GlassCard';

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon
          points="16,2 28,9 28,23 16,30 4,23 4,9"
          stroke="#c8a96e"
          strokeWidth="1.5"
          fill="rgba(200,169,110,0.08)"
        />
        <circle cx="16" cy="16" r="4" fill="#c8a96e" opacity="0.6" />
      </svg>
    ),
    title: 'Sound dampened',
    body: 'Triple-layer silicone foam dampening system eliminates typing noise. Whisper-quiet at 28dB.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="24" height="8" rx="2" stroke="#c8a96e" strokeWidth="1.5" fill="rgba(200,169,110,0.08)" />
        <circle cx="12" cy="16" r="2.5" fill="#c8a96e" opacity="0.8" />
        <circle cx="20" cy="16" r="2.5" stroke="#c8a96e" strokeWidth="1.5" fill="none" />
        <path d="M8 12V8M12 12V6M16 12V9M20 12V7M24 12V10" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Hot-swap ready',
    body: 'Change switches in seconds without soldering. Compatible with all MX-footprint switches.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="10" width="20" height="12" rx="3" stroke="#c8a96e" strokeWidth="1.5" fill="rgba(200,169,110,0.08)" />
        <path d="M10 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="#c8a96e" strokeWidth="1.5" />
        <path d="M10 22v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" stroke="#c8a96e" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2" fill="#c8a96e" opacity="0.6" />
      </svg>
    ),
    title: 'Gasket mounted',
    body: 'Floating PCB design with 10 silicone gaskets absorbs keystroke flex for a premium typing feel.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 8h4v4H8zM14 8h4v4h-4zM20 8h4v4h-4z" fill="rgba(200,169,110,0.08)" stroke="#c8a96e" strokeWidth="1.5" />
        <path d="M6 16h20M6 20h20M6 24h12" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'QMK + VIA',
    body: 'Full programmability with real-time keymap editing. Remap every key, create macros, configure RGB.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4z" stroke="#c8a96e" strokeWidth="1.5" fill="rgba(200,169,110,0.08)" />
        <path d="M4 16h24M16 4a18 18 0 0 1 0 24M16 4a18 18 0 0 0 0 24" stroke="#c8a96e" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Tri-mode wireless',
    body: 'USB-C wired, Bluetooth 5.0 (3 devices), and 2.4GHz dongle. 4000mAh battery, 3 months standby.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 20 Q8 12 12 16 Q16 20 20 10 Q24 4 28 14" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="16" r="2" fill="#c8a96e" opacity="0.8" />
        <circle cx="20" cy="10" r="2" fill="#88c8e8" opacity="0.8" />
        <circle cx="28" cy="14" r="2" fill="#c8a96e" opacity="0.6" />
      </svg>
    ),
    title: 'South-facing RGB',
    body: 'Per-key RGB LEDs positioned to illuminate legends without interference. 16.8M colors.',
  },
];

export default function FeatureGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        '.feature-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.feature-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Staggered card reveal
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#080810] overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c8a96e 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="feature-heading mb-16 md:mb-20">
          <span className="section-eyebrow">04 / Technology</span>
          <h2
            id="features-heading"
            className="section-heading"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          >
            Built different.
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <GlassCard className="p-8 h-full">
                {/* Icon */}
                <div className="mb-6" aria-hidden="true">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  className="mb-3 text-[#f0ede6] font-semibold"
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: '20px',
                  }}
                >
                  {feature.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: '16px',
                    color: '#7a7a8a',
                    lineHeight: 1.75,
                  }}
                >
                  {feature.body}
                </p>

                {/* Gold accent line */}
                <div
                  className="mt-6 h-px bg-gradient-to-r from-[#c8a96e] to-transparent opacity-30"
                  aria-hidden="true"
                />
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
