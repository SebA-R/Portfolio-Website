'use client';

import { useEffect, useRef } from 'react';
import { useScrollStore } from '@stores';

/**
 * Replaces the native scrollbar with a clean bar that grows from the top.
 * Uses Zustand subscribe + direct DOM mutation so it never triggers React re-renders.
 */
const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial height in case progress is already > 0
    if (barRef.current) {
      barRef.current.style.height = `${useScrollStore.getState().scrollProgress * 100}%`;
    }

    return useScrollStore.subscribe((state) => {
      if (barRef.current) {
        barRef.current.style.height = `${state.scrollProgress * 100}%`;
      }
    });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '7px',
        height: '100dvh',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '0%',
          background: 'var(--scrollbarColor)',
          borderRadius: '0 0 4px 4px',
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
