'use client';

import { useEffect, useRef } from 'react';

/**
 * Returns a ref { gamma, beta } updated in real-time from DeviceOrientationEvent.
 * Uses a ref (not state) so reads in useFrame don't trigger re-renders.
 * On iOS 13+ the permission prompt is deferred to the first touchstart.
 */
export const useDeviceOrientation = () => {
  const orientation = useRef({ gamma: 0, beta: 0 });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      orientation.current.gamma = e.gamma ?? 0;
      orientation.current.beta = e.beta ?? 0;
    };

    const attach = () => {
      window.addEventListener('deviceorientation', handleOrientation);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DOE = DeviceOrientationEvent as any;
    const needsPermission =
      typeof DOE !== 'undefined' &&
      typeof DOE.requestPermission === 'function';

    if (needsPermission) {
      const requestOnTouch = () => {
        DOE.requestPermission()
          .then((result: string) => { if (result === 'granted') attach(); })
          .catch(() => {});
      };
      window.addEventListener('touchstart', requestOnTouch, { once: true });
      return () => window.removeEventListener('touchstart', requestOnTouch);
    } else {
      attach();
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

  return orientation;
};
