'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    posthog.init(key, {
      api_host: 'https://t.sebastian.wiki',
      ui_host: 'https://us.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      capture_exceptions: true,
      defaults: '2026-01-30',
      capture_performance: {
        web_vitals: true,
        network_timing: true,
      },
      session_recording: {
        maskAllInputs: false,
        captureCanvas: {
          recordCanvas: true,
          canvasFps: 4,
          canvasQuality: 'low',
        },
      },
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.opt_out_capturing();
      },
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
