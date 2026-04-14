'use client';

import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { useDeviceOrientation } from "@/app/hooks/useDeviceOrientation";
import { usePortalStore, useScrollStore } from "@stores";

const ScrollWrapper = (props: { children: React.ReactNode | React.ReactNode[]}) => {
  const { camera } = useThree();
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);
  const orientation = useDeviceOrientation();
  // Normalised -1..1 touch x position; 0 when no finger is down
  const touchX = useRef(0);

  useEffect(() => {
    if (!isMobile) return;

    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) touchX.current = (t.clientX / window.innerWidth) * 2 - 1;
    };
    const onEnd = () => { touchX.current = 0; };

    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);
    return () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
    };
  }, []);

  useFrame((state, delta) => {
    if (data) {
      const a = data.range(0, 0.3);
      const b = data.range(0.3, 0.5);
      const d = data.range(0.85, 0.18);

      if (!isActive) {
        camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -0.5 * Math.PI * a, 5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, -37 * b, 7, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 5 + 10 * d, 7, delta);

        setScrollProgress(data.range(0, 1));
      }

      if (!isActive) {
        if (isMobile) {
          const gyro  = -(orientation.current.gamma / 90) * (Math.PI / 10);
          const touch = -(touchX.current * Math.PI) / 90;
          camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, gyro + touch, 0.07);
        } else {
          camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 90, 0.05);
        }
      }
    }
  });

  const children = Array.isArray(props.children) ? props.children : [props.children];

  return <>
    {children.map((child, index) => {
      return <group key={index}>
        {child}
      </group>
    })}
  </>
}

export default ScrollWrapper;