'use client';

import { useGSAP } from "@gsap/react";
import { AdaptiveDpr, Preload, ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

import Preloader from "./Preloader";
import ProgressLoader from "./ProgressLoader";
import { ScrollHint } from "./ScrollHint";
import ThemeSwitcher from "./ThemeSwitcher";

const CanvasLoader = (props: { children: React.ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { progress } = useProgress();
  const [canvasStyle, setCanvasStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    overflow: "hidden",
  });

  useEffect(() => {
    if (!isMobile) {
      const borderStyle = {
        inset: '1rem',
        width: 'calc(100% - 2rem)',
        height: 'calc(100% - 2rem)',
      };
      setCanvasStyle({ ...canvasStyle, ...borderStyle });
    }
  }, [isMobile]);

  // Scale the video up so mouse panning never reveals an edge
  useEffect(() => {
    if (videoRef.current) {
      gsap.set(videoRef.current, { scale: 1.15 });
    }
  }, []);

  // Pan the video to follow the camera's mouse-driven rotation
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;   // -1 to 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;  // -1 to 1
      gsap.to(videoRef.current, {
        x: -nx * window.innerWidth * 0.025,
        y: -ny * window.innerHeight * 0.015,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    if (progress === 100) {
      gsap.to('.base-canvas', { opacity: 1, duration: 3, delay: 1 });
    }
  }, [progress]);

  return (
    <div className="h-[100dvh] wrapper relative">
      <div className="h-[100dvh] relative" style={{ overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.001) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="stitched6.webm" type="video/webm" />
          <source src="stitched6-h265.mp4" type='video/mp4; codecs="hvc1"' />
          <source src="stitched6-compressed.mp4" type="video/mp4" />
        </video>
        <Canvas className="base-canvas"
          shadows
          style={canvasStyle}
          gl={{ alpha: true }}
          dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />

            <ScrollControls pages={4} damping={0.4} maxSpeed={1} distance={1} style={{ zIndex: 1 }}>
              {props.children}
              <Preloader />
            </ScrollControls>

            <Preload all />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
        <ProgressLoader progress={progress} />
      </div>
      <ThemeSwitcher />
      <ScrollHint />
    </div>
  );
};

export default CanvasLoader;
