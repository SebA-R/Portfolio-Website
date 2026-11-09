'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";

import { useLoadStore } from "@stores";

import BackgroundVideo from "./BackgroundVideo";
import HeroFallback from "./HeroFallback";
import ProgressLoader from "./ProgressLoader";
import SceneErrorBoundary from "./SceneErrorBoundary";
import ScrollProgressBar from "./ScrollProgressBar";
import { ScrollHint } from "./ScrollHint";
import ThemeSwitcher from "./ThemeSwitcher";

// three.js, R3F and drei load after the shell has painted.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

const CanvasLoader = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useLoadStore((state) => state.progress);

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
    <main role="main" aria-label="Portfolio" className="h-[100dvh] wrapper relative">
      <div className="h-[100dvh] relative" style={{ overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.001) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
        <BackgroundVideo ref={videoRef} start={progress === 100} />
        <HeroFallback loaded={progress === 100} />
        <SceneErrorBoundary>
          <Scene />
        </SceneErrorBoundary>
        <ProgressLoader progress={progress} />
      </div>
      <ThemeSwitcher />
      <ScrollHint />
      <ScrollProgressBar />
    </main>
  );
};

export default CanvasLoader;
