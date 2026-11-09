import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  output: 'export',
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'gsap', 'three'],
  },
};

export default nextConfig;
