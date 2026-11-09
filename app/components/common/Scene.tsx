'use client';

import { AdaptiveDpr, Preload, ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { useLoadStore } from "@stores";

import Experience from "../experience";
import Footer from "../footer";
import Hero from "../hero";
import Preloader from "./Preloader";
import ScrollWrapper from "./ScrollWrapper";

const BASE_CANVAS_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  opacity: 0,
  overflow: "hidden",
};

// Desktop shows the scene inside a 1rem frame.
const DESKTOP_FRAME_STYLE: React.CSSProperties = {
  inset: '1rem',
  width: 'calc(100% - 2rem)',
  height: 'calc(100% - 2rem)',
};

// Mirrors drei's loading progress into the shell's store.
const ProgressReporter = () => {
  const { progress } = useProgress();
  const setProgress = useLoadStore((state) => state.setProgress);

  useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  return null;
};

// Everything that needs three.js. Loaded with next/dynamic from CanvasLoader
// so the page shell (poster, hero text, loader) paints before this bundle.
const Scene = () => {
  const [canvasStyle, setCanvasStyle] = useState<React.CSSProperties>(BASE_CANVAS_STYLE);

  useEffect(() => {
    if (!isMobile) {
      setCanvasStyle({ ...BASE_CANVAS_STYLE, ...DESKTOP_FRAME_STYLE });
    }
  }, []);

  return (
    <>
      <ProgressReporter />
      <Canvas className="base-canvas" aria-hidden="true"
        shadows
        style={canvasStyle}
        gl={{ alpha: true }}
        dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />

          <ScrollControls pages={4} damping={0.4} maxSpeed={1} distance={1} style={{ zIndex: 1 }}>
            <ScrollWrapper>
              <Hero/>
              <Experience/>
              <Footer/>
            </ScrollWrapper>
            <Preloader />
          </ScrollControls>

          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </>
  );
};

export default Scene;
