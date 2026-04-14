'use client';

import { Text, useProgress, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";

const MIN_SCALE = 0.004;

const Hero = () => {
  const groupRef = useRef<THREE.Group>(null);
  const rectRef = useRef<THREE.Mesh>(null);
  const loadProgressRef = useRef(0);
  const { progress } = useProgress();
  const { viewport } = useThree();
  const data = useScroll();

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

  const baseFontSize = Math.min(1.2, viewport.width * 0.13);
  const fontSize = Math.max(0.6, baseFontSize);

  const rectWidth = viewport.width * 0.9 + fontSize * 2;
  const rectHeight = fontSize * 2.2;

  return (
    <>
      <group ref={groupRef} position={[0, 2, -10]}>
        <mesh ref={rectRef} position={[0, 0, -0.01]} scale={[1, MIN_SCALE, 1]}>
          <planeGeometry args={[rectWidth, rectHeight]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.35} depthWrite={false} />
        </mesh>
        <Text position={[0, 0, 0]} font="./soria-font.ttf" fontSize={fontSize} maxWidth={viewport.width * 1} color="white" anchorX="center" anchorY="middle">
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
