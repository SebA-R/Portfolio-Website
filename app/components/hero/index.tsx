'use client';

import { Text, useProgress, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";

const MIN_SCALE = 0.004;
const PADDING_X = 0.4;
const PADDING_Y = 0.4;

const Hero = () => {
  const groupRef = useRef<THREE.Group>(null);
  const rectRef = useRef<THREE.Mesh>(null);
  const loadProgressRef = useRef(0);
  const { progress } = useProgress();
  const { viewport } = useThree();
  const data = useScroll();
  const [textBounds, setTextBounds] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    if (progress === 100 && groupRef.current) {
      gsap.fromTo(groupRef.current.position, { y: -10 }, { y: 0, duration: 3 });
      gsap.to(loadProgressRef, { current: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    }
  }, [progress]);

  useFrame((_, delta) => {
    if (!rectRef.current) return;
    const scrolled = data.range(0, 0.2);
    const target = MIN_SCALE + (1 - MIN_SCALE) * loadProgressRef.current * (1 - scrolled);
    rectRef.current.scale.y = THREE.MathUtils.damp(rectRef.current.scale.y, target, 6, delta);
  });

  const baseFontSize = Math.min(1.2, viewport.width * 0.3);
  const fontSize = Math.max(0.6, baseFontSize);
  const maxWidth = viewport.width * 0.9;

  // Use actual measured text bounds so the rect covers all wrapped lines
  const rectWidth = (textBounds?.w ?? maxWidth) + PADDING_X * 2;
  const rectHeight = (textBounds?.h ?? fontSize * 1.4) + PADDING_Y * 2;

  return (
    <>
      <group ref={groupRef} position={[0, 2, -10]}>
        <mesh ref={rectRef} position={[0, 0, -0.001]} scale={[1, MIN_SCALE, 1]}>
          <planeGeometry args={[rectWidth, rectHeight]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.65} depthWrite={false} />
        </mesh>
        <Text
          position={[0, 0, 0]}
          font="./soria-font.ttf"
          fontSize={fontSize}
          maxWidth={maxWidth}
          color="white"
          anchorX="center"
          anchorY="middle"
          onSync={(troika: any) => {
            const b = troika?.textRenderInfo?.blockBounds;
            if (b) setTextBounds({ w: b[2] - b[0], h: b[3] - b[1] });
          }}
        >
          I'm Sebastian Arellano-Rubach
        </Text>
      </group>
      <StarsContainer />
      <group position={[0, -25, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10} />
        <WindowModel receiveShadow />
        <TextWindow />
      </group>
    </>
  );
};

export default Hero;
