'use client';

import gsap from "gsap";
import { useEffect, useRef } from "react";

// Plain-HTML version of the 3D hero title. It is in the static HTML, so it
// paints with the first frame (and is what crawlers and screen readers read),
// then fades out as the WebGL title takes over.
const HeroFallback = ({ loaded }: { loaded: boolean }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded || !boxRef.current) return;
    // Gone before the canvas starts fading in (CanvasLoader delays it by 1 s),
    // so the two titles never show at once.
    gsap.to(boxRef.current, { opacity: 0, duration: 0.8, ease: 'power2.out' });
  }, [loaded]);

  return (
    <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none px-4">
      <div
        ref={boxRef}
        className="bg-black/65 px-6 py-5 text-white text-center font-serif font-normal leading-tight max-w-[90vw] text-[clamp(2.25rem,4.2vw,3.5rem)]"
      >
        <h1>I&apos;m Sebastian Arellano-Rubach</h1>
      </div>
    </div>
  );
};

export default HeroFallback;
