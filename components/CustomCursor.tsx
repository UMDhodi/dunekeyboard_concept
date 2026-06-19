'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Detect touch device — disable custom cursor
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('label')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // RAf loop for lag effect
    const animate = () => {
      if (!dotRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Lerp toward target position (0.12 lag)
      currentPos.current.x += (posRef.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (posRef.current.y - currentPos.current.y) * 0.12;

      dotRef.current.style.transform = `translate(${currentPos.current.x - (isHovering ? 16 : 4)}px, ${currentPos.current.y - (isHovering ? 16 : 4)}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full transition-[width,height,background-color,opacity] duration-150"
      style={{
        width: isHovering ? '32px' : '8px',
        height: isHovering ? '32px' : '8px',
        backgroundColor: isHovering ? 'rgba(200, 169, 110, 0.15)' : '#c8a96e',
        border: isHovering ? '1px solid rgba(200, 169, 110, 0.6)' : 'none',
        willChange: 'transform',
      }}
    />
  );
}
