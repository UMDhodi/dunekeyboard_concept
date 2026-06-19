'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { registerGSAP, gsap, ScrollTrigger } from '@/lib/gsap';

export default function VideoBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const inView = useInView(textRef, { once: true, amount: 0.4 });

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Parallax: video moves at 0.3x scroll speed
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { y: '-15%' },
          {
            y: '15%',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '70vh' }}
      aria-labelledby="video-break-heading"
    >
      {/* VIDEO */}
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

      {/* DARK OVERLAY */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(8, 8, 16, 0.72)' }}
        aria-hidden="true"
      />

      {/* TEXT BLOCK */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div
          ref={textRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.h2
            id="video-break-heading"
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-orbitron), sans-serif',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 900,
              color: '#f0ede6',
              lineHeight: 1.1,
            }}
          >
            Every keystroke,
            <br />
            intentional.
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="gold-divider mt-8 mb-6"
            aria-hidden="true"
          />

          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: '#7a7a8a',
              lineHeight: 1.75,
            }}
          >
            Precision manufactured in Japan. Assembled by hand.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
