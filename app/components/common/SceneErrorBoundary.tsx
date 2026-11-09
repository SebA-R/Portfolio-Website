'use client';

import { Component, type ReactNode } from "react";

// If the 3D scene fails (a model, texture or font request fails, or the
// chunk itself does not load), keep the page shell - poster, video and the
// HTML title - instead of letting the error take down the whole page.
class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('3D scene failed to load', error);
  }

  render() {
    if (this.state.failed) {
      return null;
    }
    return this.props.children;
  }
}

export default SceneErrorBoundary;
