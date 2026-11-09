'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import manifest from "@/app/generated/video-manifest.json";

type BackgroundVideoProps = {
  // Start downloading and playing only once this is true, so the video does
  // not compete with the JS bundle and 3D models during the initial load.
  start: boolean;
};

const VIDEO_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

// Sources come from scripts/encode-video.mjs: 720p for phones, 1080p
// otherwise, AV1 first with H.264 as the fallback. The poster paints at once.
const BackgroundVideo = forwardRef<HTMLVideoElement, BackgroundVideoProps>(({ start }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

  useEffect(() => {
    const video = videoRef.current;
    if (!start || !video) return;

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
  }, [start]);

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
