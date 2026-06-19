'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { registerGSAP, gsap } from '@/lib/gsap';
import { Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const THEME_IMAGES = [
  {
    id: 'theme_01',
    src: '/dune_theme_01.png',
    label: 'Keyboard Top View',
    desc: 'Bespoke hand-finished casing with matching keycap set.',
  },
  {
    id: 'theme_02',
    src: '/dune_theme_02.png',
    label: 'Keycap Detail',
    desc: 'Custom doubleshot legend keycaps in warm desert sand tone.',
  },
  {
    id: 'theme_04',
    src: '/dune_theme_04.png',
    label: 'Angle View',
    desc: 'Anodized chassis profile displaying the 7-degree typing angle.',
  },
  {
    id: 'theme_05',
    src: '/dune_theme_05.png',
    label: 'Brass Accent Detail',
    desc: 'Signature polished brass backweight engraving.',
  },
];

const THEME_SPECS = [
  { label: 'Plate Material', value: 'Brushed Copper' },
  { label: 'Keycaps', value: 'Dye-Sub PBT (Oasis Edition)' },
  { label: 'Switches', value: 'Custom Gateron Tactile (Hand-lubed)' },
  { label: 'Case Treatment', value: 'Bead-blasted & Anodized Sand' },
  { label: 'Mounting Style', value: 'Gasket Mount (Silicone Socks)' },
  { label: 'Internal Foam', value: 'IXPE Switch Pad + Poron Case Foam' },
];

export default function ThemeProductSection() {
  const [activeImage, setActiveImage] = useState(THEME_IMAGES[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Gallery scroll trigger
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Info scroll trigger
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
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
      id="dune-theme-detail"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#080810] overflow-hidden border-t border-[rgba(200,169,110,0.06)]"
      aria-labelledby="theme-detail-heading"
    >
      {/* Glow Effects */}
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(200, 169, 110, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <span className="section-eyebrow">02 / Limited Edition</span>
          <h2
            id="theme-detail-heading"
            className="section-heading mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            The Dune Theme.
          </h2>
          <p
            className="text-lg text-[#7a7a8a]"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', maxWidth: '520px' }}
          >
            A cohesive aesthetic experience, combining sand-blasted casing textures with custom tactile feel.
          </p>
        </div>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Interactive Gallery */}
          <div ref={galleryRef} className="lg:col-span-7 flex flex-col gap-6">
            {/* Main Image Frame */}
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-[#0a0a18] shadow-[0_0_80px_rgba(200,169,110,0.04)] border border-[rgba(200,169,110,0.1)]"
              style={{ aspectRatio: '16/10' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={`${basePath}${activeImage.src}`}
                    alt={activeImage.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                    priority
                  />
                  {/* Subtle caption overlay */}
                  <div
                    className="absolute bottom-0 inset-x-0 p-5 text-left"
                    style={{
                      background: 'linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 100%)',
                    }}
                  >
                    <p
                      className="text-xs font-semibold text-[#c8a96e] uppercase tracking-[2px] mb-0.5"
                      style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                    >
                      {activeImage.label}
                    </p>
                    <p
                      className="text-sm text-[#7a7a8a]"
                      style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                    >
                      {activeImage.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-4">
              {THEME_IMAGES.map((img) => {
                const isActive = img.id === activeImage.id;
                return (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(img)}
                    className="relative rounded-lg overflow-hidden border transition-all duration-300 bg-[#0a0a18]"
                    style={{
                      aspectRatio: '16/10',
                      borderColor: isActive ? 'rgba(200, 169, 110, 0.6)' : 'rgba(200,169,110,0.1)',
                      boxShadow: isActive ? '0 0 15px rgba(200, 169, 110, 0.2)' : 'none',
                      transform: isActive ? 'scale(1.03)' : 'scale(1)',
                    }}
                    aria-label={`Show ${img.label}`}
                    aria-pressed={isActive}
                  >
                    <Image
                      src={`${basePath}${img.src}`}
                      alt={img.label}
                      fill
                      sizes="200px"
                      className="object-cover transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0.4 }}
                    />
                    <div
                      className="absolute inset-0 hover:bg-black/10 transition-colors duration-200"
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Product specs + Checkout */}
          <div ref={infoRef} className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span
                className="text-[11px] tracking-[4px] uppercase font-bold text-[#c8a96e]"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                THEMED SELECTION
              </span>
              <h3
                className="text-[#f0ede6] font-bold text-3xl md:text-4xl mt-2"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                Oasis Edition
              </h3>
              <p
                className="mt-3 text-sm text-[#7a7a8a]"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', lineHeight: 1.7 }}
              >
                Hand-built on demand with a bespoke acoustic profiling process. This build focuses on low-frequency, deep acoustic feedback (the "thock" sound profile) using real copper weighting plates and sound barriers.
              </p>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-4">
              {THEME_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl p-3 border border-[rgba(200,169,110,0.06)] bg-[rgba(255,255,255,0.01)]"
                >
                  <p
                    className="text-[9px] tracking-[2px] uppercase text-[#7a7a8a] mb-1"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {spec.label}
                  </p>
                  <p
                    className="text-xs font-semibold text-[#f0ede6]"
                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                  >
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Checkout panel */}
            <div
              className="rounded-2xl p-6 border border-[rgba(200,169,110,0.15)]"
              style={{
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p
                    className="text-[10px] tracking-[3px] uppercase text-[#7a7a8a] mb-1"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    Limited-Edition Price
                  </p>
                  <p
                    className="text-3xl font-black text-[#c8a96e]"
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  >
                    $349 <span className="text-xs text-[#7a7a8a] font-normal font-sans">USD</span>
                  </p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-[9px] tracking-[2px] font-bold border border-[#c8a96e]/30 bg-[#c8a96e]/10 text-[#c8a96e]"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  IN STOCK
                </div>
              </div>

              <button
                className="w-full h-12 rounded-xl font-bold text-sm text-[#080810] bg-[#c8a96e] border border-[#c8a96e] transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '0.9';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(200, 169, 110, 0.35)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                Buy Limited Edition
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[rgba(200,169,110,0.06)]">
                <div className="flex flex-col items-center gap-1 text-center">
                  <ShieldCheck size={16} className="text-[#c8a96e]" />
                  <span className="text-[9px] text-[#7a7a8a] font-medium leading-none">3-Yr Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Truck size={16} className="text-[#c8a96e]" />
                  <span className="text-[9px] text-[#7a7a8a] font-medium leading-none">Free Global Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <RotateCcw size={16} className="text-[#c8a96e]" />
                  <span className="text-[9px] text-[#7a7a8a] font-medium leading-none">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
