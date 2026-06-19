'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    if (!section || !video || !content) return;

    // Parallax: video at 0.4x scroll speed
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    videoTl.to(video, { y: '40%', ease: 'none' });

    // Hero text exits faster at 0.6x
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    contentTl.to(content, { y: '-20%', opacity: 0.2, ease: 'none' });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      aria-label="Hero"
    >
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dune.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        />
      </div>

      {/* DARK GRADIENT OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute inset-0 video-overlay"
        aria-hidden="true"
      />

      {/* HERO CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ willChange: 'transform' }}
      >
        {/* Mono badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 flex items-center gap-2"
        >
          <span
            className="text-[#c8a96e] text-xs tracking-[4px] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            ◆ Mechanical Keyboard · 2026
          </span>
        </motion.div>

        {/* H1 — staggered words */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
          aria-label="Engineered for silence"
        >
          <div className="overflow-hidden">
            <motion.h1
              variants={wordVariants}
              className="block"
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 900,
                letterSpacing: '-1px',
                color: '#f0ede6',
                lineHeight: 1.05,
              }}
            >
              Engineered
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={wordVariants}
              className="block"
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 900,
                letterSpacing: '-1px',
                color: '#f0ede6',
                lineHeight: 1.05,
              }}
            >
              for{' '}
              <span className="text-gradient-gold">Silence.</span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mb-10 max-w-md"
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#7a7a8a',
            lineHeight: 1.75,
          }}
        >
          72 keys. Zero compromise. One instrument.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            size="lg"
            className="btn-gold px-8 h-12 text-base"
            onClick={() => {
              document.querySelector('#product')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="btn-ice-outline px-8 h-12 text-base"
          >
            Watch Film
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <ChevronDown
            size={20}
            color="#c8a96e"
            className="scroll-chevron"
            aria-hidden="true"
          />
          <span
            className="text-[#c8a96e] text-[10px] tracking-[4px] uppercase"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
