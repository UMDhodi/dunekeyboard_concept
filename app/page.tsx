'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AllProductsSection from '@/components/AllProductsSection';
import ProductSection from '@/components/ProductSection';
import ThemeBanner from '@/components/ThemeBanner';
import ThemeProductSection from '@/components/ThemeProductSection';
import ConfigureSection from '@/components/ConfigureSection';
import FeatureGrid from '@/components/FeatureGrid';
import VideoBreak from '@/components/VideoBreak';
import Footer from '@/components/Footer';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={preloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Navbar />

        <main id="main-content">
          {/* 1. Hero — fullscreen video */}
          <HeroSection />

          {/* 2. Products — Dune Light + Dune theme cards */}
          <AllProductsSection />

          {/* 3. Product detail — product.png spotlight */}
          <ProductSection />

          {/* Limited Edition Dune Theme Banner */}
          <ThemeBanner />

          {/* Limited Edition Theme Detail & Gallery */}
          <ThemeProductSection />

          {/* 4. Configure — circular color swatches */}
          <ConfigureSection />

          {/* 5. Technology — feature grid */}
          <FeatureGrid />

          {/* 6. Cinematic video break */}
          <VideoBreak />
        </main>

        <Footer />
      </motion.div>
    </>
  );
}
