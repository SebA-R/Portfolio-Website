'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import manifest from "@/app/generated/video-manifest.json";

type BackgroundVideoProps = {
  // Start downloading and playing only once this is true, so the video does
  // not compete with the JS bundle and 3D models during the initial load.
  start: boolean;
};

// If the 3D scene never finishes loading (a failed model or chunk), play the
// video anyway after this long rather than leaving only the poster.
const FALLBACK_START_MS = 10000;

const VIDEO_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

// Sources come from scripts/encode-video.mjs: 720p for phones (H.264 first),
// 1080p otherwise (AV1 first). The poster paints at once.
const BackgroundVideo = forwardRef<HTMLVideoElement, BackgroundVideoProps>(({ start }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTimedOut(true), FALLBACK_START_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const shouldPlay = start || timedOut;

  useEffect(() => {
    const video = videoRef.current;
    if (!shouldPlay || !video) return;

    const play = () => {
      // Autoplay of a muted video can still be refused (e.g. low-power mode);
      // the poster stays up in that case.
      video.play().catch(() => {});
    };

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        play();
      }
    };

    play();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [shouldPlay]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      aria-hidden="true"
      preload="none"
      poster={manifest.poster}
      style={VIDEO_STYLE}
    >
      {manifest.sources.map((source) => (
        <source
          key={source.src}
          src={source.src}
          type={source.type}
          media={source.media ?? undefined}
        />
      ))}
    </video>
  );
});

BackgroundVideo.displayName = 'BackgroundVideo';

export default BackgroundVideo;
