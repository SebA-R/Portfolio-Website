import { create } from 'zustand';

// Asset loading progress (0-100) reported by the 3D scene, so the page shell
// can react to it without importing three.js or drei.
interface LoadStore {
  progress: number;
  setProgress: (progress: number) => void;
}

export const useLoadStore = create<LoadStore>((set) => ({
  progress: 0,
  setProgress: (progress) => set(() => ({ progress })),
}));
