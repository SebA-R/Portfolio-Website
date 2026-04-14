import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2023',
    title: 'UofT Aspuru-Guzik Lab',
    subtitle: 'Research Assistant',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2024',
    title: 'Hatch Coding',
    subtitle: 'Project Lead Developer',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2025',
    title: 'Sun Life Canada',
    subtitle: 'Data Engineering Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2025',
    title: 'UWaterloo + Laurier',
    subtitle: "BCS + BBA Double Degree · President's Gold Scholarship",
    position: 'left',
  },
  {
    point: new THREE.Vector3(2, 0, -13),
    year: '2026',
    title: 'Hack Canada',
    subtitle: '1st Place Overall — wallhacks.',
    position: 'right',
  },
  {
    point: new THREE.Vector3(1, 1, -15),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: '?',
    subtitle: 'Building the future',
    position: 'right',
  }
]
