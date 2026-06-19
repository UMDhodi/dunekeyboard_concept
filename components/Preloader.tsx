'use client';

import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'drawing' | 'progress' | 'pulsing' | 'exiting'>('drawing');

  useEffect(() => {
    // Phase 1: drawing (0 → 1.8s)
    const t1 = setTimeout(() => setPhase('progress'), 100);
    // Phase 2: progress fills (1.8 → 2.2s after start)
    const t2 = setTimeout(() => setPhase('pulsing'), 2300);
    // Phase 3: pulse then exit
    const t3 = setTimeout(() => {
      setPhase('exiting');
    }, 2700);
    // Phase 4: call onComplete after exit animation
    const t4 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const letters = ['D', 'U', 'N', 'E'];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080810]"
      style={{
        opacity: phase === 'exiting' ? 0 : 1,
        transform: phase === 'exiting' ? 'scale(0.98)' : 'scale(1)',
        transition: phase === 'exiting' ? 'opacity 0.5s ease-out, transform 0.5s ease-out' : 'none',
        pointerEvents: phase === 'exiting' ? 'none' : 'all',
      }}
      aria-hidden="true"
    >
      {/* SVG Logo — stroke-dash animation per letter */}
      <div className="flex items-center gap-2 mb-12">
        <svg
          viewBox="0 0 480 100"
          className="w-64 md:w-96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* D */}
          <text
            x="10"
            y="85"
            fontFamily="'Orbitron', sans-serif"
            fontSize="96"
            fontWeight="900"
            fill="none"
            stroke="#c8a96e"
            strokeWidth="2"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: phase === 'drawing' ? 400 : 0,
              transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: '0s',
              fill: phase !== 'drawing' ? 'rgba(200, 169, 110, 0.1)' : 'none',
            }}
          >
            D
          </text>
          {/* U */}
          <text
            x="130"
            y="85"
            fontFamily="'Orbitron', sans-serif"
            fontSize="96"
            fontWeight="900"
            fill="none"
            stroke="#c8a96e"
            strokeWidth="2"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: phase === 'drawing' ? 400 : 0,
              transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: '0.2s',
              fill: phase !== 'drawing' ? 'rgba(200, 169, 110, 0.1)' : 'none',
            }}
          >
            U
          </text>
          {/* N */}
          <text
            x="255"
            y="85"
            fontFamily="'Orbitron', sans-serif"
            fontSize="96"
            fontWeight="900"
            fill="none"
            stroke="#c8a96e"
            strokeWidth="2"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: phase === 'drawing' ? 400 : 0,
              transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: '0.4s',
              fill: phase !== 'drawing' ? 'rgba(200, 169, 110, 0.1)' : 'none',
            }}
          >
            N
          </text>
          {/* E */}
          <text
            x="370"
            y="85"
            fontFamily="'Orbitron', sans-serif"
            fontSize="96"
            fontWeight="900"
            fill="none"
            stroke="#c8a96e"
            strokeWidth="2"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: phase === 'drawing' ? 400 : 0,
              transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)',
              transitionDelay: '0.6s',
              fill: phase !== 'drawing' ? 'rgba(200, 169, 110, 0.1)' : 'none',
            }}
          >
            E
          </text>
        </svg>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-[rgba(200,169,110,0.2)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#c8a96e] rounded-full"
          style={{
            width: phase === 'drawing' ? '0%' : '100%',
            transition: 'width 2.2s ease-in-out',
            opacity: phase === 'pulsing' ? 0.4 : 1,
            animation: phase === 'pulsing' ? 'pulseBar 0.4s ease-in-out' : 'none',
          }}
        />
      </div>

      {/* Tagline */}
      <p
        className="mt-6 text-[#7a7a8a] text-xs tracking-[4px] uppercase"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          opacity: phase === 'drawing' ? 0 : 1,
          transition: 'opacity 0.5s ease',
          transitionDelay: '0.8s',
        }}
      >
        Mechanical Keyboards · 2026
      </p>
    </div>
  );
}
