'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { registerGSAP, gsap } from '@/lib/gsap';
import { Check } from 'lucide-react';

const COLOR_OPTIONS = [
  {
    id: 'orange',
    label: 'Burnt Orange',
    image: '/orange.png',
    swatch: '#c8704a',
    swatchGlow: 'rgba(200,112,74,0.4)',
    accent: '#c8704a',
    description: 'Desert warmth. Bold presence.',
    badge: 'BESTSELLER',
  },
  {
    id: 'grey',
    label: 'Space Grey',
    image: '/grey.png',
    swatch: '#6b7280',
    swatchGlow: 'rgba(107,114,128,0.4)',
    accent: '#9ca3af',
    description: 'Stealth mode. Zero distraction.',
    badge: 'STEALTH',
  },
  {
    id: 'light_blue',
    label: 'Arctic Blue',
    image: '/light_blue.png',
    swatch: '#88c8e8',
    swatchGlow: 'rgba(136,200,232,0.4)',
    accent: '#88c8e8',
    description: 'Ice-cold precision. Crystal clear.',
    badge: 'NEW',
  },
  {
    id: 'light_pink',
    label: 'Blush Pink',
    image: '/light_pink.png',
    swatch: '#f4a4b8',
    swatchGlow: 'rgba(244,164,184,0.4)',
    accent: '#f4a4b8',
    description: 'Soft focus. Sharp keys.',
    badge: '',
  },
  {
    id: 'light_purple',
    label: 'Dusk Purple',
    image: '/light_purple.png',
    swatch: '#c4b5fd',
    swatchGlow: 'rgba(196,181,253,0.4)',
    accent: '#c4b5fd',
    description: 'Twilight energy. Midnight flow.',
    badge: 'LIMITED',
  },
  {
    id: 'red',
    label: 'Crimson',
    image: '/red.png',
    swatch: '#ef4444',
    swatchGlow: 'rgba(239,68,68,0.4)',
    accent: '#ef4444',
    description: 'Maximum intensity. Pure fire.',
    badge: '',
  },
];

export default function ConfigureSection() {
  const [selected, setSelected] = useState(COLOR_OPTIONS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.configure-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.configure-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.configure-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: '.configure-content',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleColorSelect = (option: typeof COLOR_OPTIONS[0]) => {
    if (option.id === selected.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelected(option);
      setIsTransitioning(false);
    }, 220);
  };

  return (
    <section
      id="configure"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#0f0f1e] overflow-hidden"
      aria-labelledby="configure-heading"
    >
      {/* Animated glow that follows selected color */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 60% 50%, ${selected.swatchGlow.replace('0.4', '0.06')} 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="configure-heading mb-14 md:mb-20">
          <span className="section-eyebrow">03 / Configure</span>
          <h2
            id="configure-heading"
            className="section-heading mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Make it yours.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '18px',
              color: '#7a7a8a',
              lineHeight: 1.75,
              maxWidth: '480px',
            }}
          >
            Six hand-anodized colorways. One keyboard. Your identity.
          </p>
        </div>

        {/* Main configure layout */}
        <div className="configure-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — keyboard preview */}
          <div ref={previewRef} className="relative order-2 lg:order-1">
            {/* Preview frame */}
            <div
              className="relative rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                background: 'rgba(8,8,16,0.8)',
                border: `1px solid ${selected.accent}22`,
                boxShadow: `0 0 80px ${selected.swatchGlow.replace('0.4', '0.12')}`,
              }}
            >
              {/* Image with crossfade */}
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={selected.image}
                      alt={`DUNE 75 in ${selected.label}`}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Color label overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 100%)' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selected.id + '-label'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p
                        className="text-[10px] tracking-[4px] uppercase mb-1"
                        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: selected.accent }}
                      >
                        Selected colorway
                      </p>
                      <p
                        className="text-lg font-bold"
                        style={{ fontFamily: 'var(--font-orbitron), sans-serif', color: '#f0ede6' }}
                      >
                        {selected.label}
                      </p>
                      <p
                        className="text-sm mt-1"
                        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', color: '#7a7a8a' }}
                      >
                        {selected.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Floating price badge */}
            <div
              className="absolute -top-4 -right-4 hidden md:flex flex-col items-center justify-center w-20 h-20 rounded-full"
              style={{
                background: `${selected.accent}15`,
                border: `1px solid ${selected.accent}44`,
                backdropFilter: 'blur(12px)',
                transition: 'all 0.4s ease',
              }}
            >
              <span
                className="text-lg font-bold leading-none"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif', color: selected.accent }}
              >
                $289
              </span>
              <span
                className="text-[9px] tracking-[1px] uppercase mt-0.5"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#7a7a8a' }}
              >
                Base
              </span>
            </div>
          </div>

          {/* RIGHT — color selection + summary */}
          <div className="order-1 lg:order-2 flex flex-col gap-8">

            {/* Circular color swatches */}
            <div>
              <p
                className="text-[11px] tracking-[3px] uppercase mb-8"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#7a7a8a' }}
              >
                Choose color
              </p>

              {/* pt-2 gives room for badges that appear above swatches */}
              <div className="flex flex-wrap gap-6">
                {COLOR_OPTIONS.map((option) => {
                  const isActive = selected.id === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleColorSelect(option)}
                      className="group flex flex-col items-center gap-3 focus:outline-none"
                      style={{ minWidth: '56px' }}
                      aria-label={`Select ${option.label} colorway`}
                      aria-pressed={isActive}
                    >
                      {/* Outer ring — active indicator */}
                      <div
                        className="relative flex items-center justify-center rounded-full transition-all duration-300"
                        style={{
                          width: '52px',
                          height: '52px',
                          padding: '3px',
                          background: isActive ? `${option.swatch}33` : 'transparent',
                          border: isActive
                            ? `2px solid ${option.swatch}`
                            : '2px solid rgba(255,255,255,0.08)',
                          boxShadow: isActive ? `0 0 20px ${option.swatchGlow}` : 'none',
                          transform: isActive ? 'scale(1.12)' : 'scale(1)',
                        }}
                      >
                        {/* Inner color circle */}
                        <div
                          className="w-full h-full rounded-full flex items-center justify-center transition-all duration-200"
                          style={{ background: option.swatch }}
                        >
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2, type: 'spring', stiffness: 400 }}
                            >
                              <Check size={14} color="#fff" strokeWidth={3} />
                            </motion.div>
                          )}
                        </div>

                        {/* Hover ring pulse */}
                        <div
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ boxShadow: `0 0 16px ${option.swatchGlow}` }}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Label */}
                      <span
                        className="text-[10px] tracking-[1px] text-center transition-colors duration-200 leading-tight"
                        style={{
                          fontFamily: 'var(--font-jetbrains-mono), monospace',
                          color: isActive ? option.swatch : '#7a7a8a',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {option.label.split(' ')[0]}
                      </span>

                      {/* Badge below label — no absolute positioning, no overflow */}
                      {option.badge ? (
                        <span
                          className="text-[8px] tracking-[2px] uppercase font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{
                            fontFamily: 'var(--font-jetbrains-mono), monospace',
                            background: `${option.swatch}20`,
                            border: `1px solid ${option.swatch}55`,
                            color: option.swatch,
                          }}
                        >
                          {option.badge}
                        </span>
                      ) : (
                        /* Empty placeholder to keep all swatches vertically aligned */
                        <span className="h-[18px] block" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ background: 'linear-gradient(to right, rgba(200,169,110,0.2), transparent)' }}
            />

            {/* Config summary */}
            <div className="space-y-4">
              <p
                className="text-[11px] tracking-[3px] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#7a7a8a' }}
              >
                Your configuration
              </p>

              {[
                { label: 'Model', value: 'DUNE 75' },
                { label: 'Colorway', value: selected.label },
                { label: 'Switches', value: 'Gateron G Pro (Linear)' },
                { label: 'Keycaps', value: 'PBT Doubleshot' },
                { label: 'Mount', value: 'Gasket / Silicone Gaskets' },
                { label: 'Connectivity', value: 'USB-C · BT 5.0 · 2.4GHz' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: '1px solid rgba(200,169,110,0.06)' }}
                >
                  <span
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', color: '#7a7a8a' }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: 'var(--font-space-grotesk), sans-serif',
                      color: row.label === 'Colorway' ? selected.accent : '#f0ede6',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected.accent}22`,
                transition: 'border-color 0.4s ease',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p
                    className="text-[10px] tracking-[3px] uppercase mb-1"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#7a7a8a' }}
                  >
                    Total price
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif', color: '#f0ede6' }}
                  >
                    $289
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${selected.accent}20`, border: `1px solid ${selected.accent}44`, transition: 'all 0.4s ease' }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: selected.swatch, transition: 'background 0.3s ease' }}
                  />
                </div>
              </div>

              <button
                className="w-full h-12 rounded-xl font-semibold text-base transition-all duration-200"
                style={{
                  background: selected.accent,
                  color: '#080810',
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  border: `1px solid ${selected.accent}`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '0.88';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${selected.swatchGlow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                Add to cart — {selected.label}
              </button>

              <p
                className="text-center text-xs mt-3"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', color: '#7a7a8a' }}
              >
                Free shipping · 30-day returns · 2-year warranty
              </p>
            </div>
          </div>
        </div>

        {/* Bottom all-colors strip */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[rgba(200,169,110,0.08)]">
          <p
            className="text-sm"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', color: '#7a7a8a' }}
          >
            All colorways are hand-anodized in small batches. Lead time: 2–3 weeks.
          </p>
          <div className="flex items-center gap-2">
            {COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleColorSelect(opt)}
                className="transition-all duration-200"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: opt.swatch,
                  border: selected.id === opt.id ? `2px solid #f0ede6` : '2px solid transparent',
                  outline: selected.id === opt.id ? `2px solid ${opt.swatch}` : 'none',
                  outlineOffset: '2px',
                  transform: selected.id === opt.id ? 'scale(1.25)' : 'scale(1)',
                }}
                aria-label={opt.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
