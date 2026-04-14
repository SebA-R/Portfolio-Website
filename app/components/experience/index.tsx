import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import { useMemo, useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from 'three';
import GridTile from "./GridTile";
import Projects from "./projects";
import Work from "./work";

const FONT_PROPS = {
  font: "./soria-font.ttf",
  fontSize: 0.4,
  color: 'white',
};

const TITLE_CHARS = 'EXPERIENCE'.split('');

const Experience = () => {
  const titleRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);

  const diff = isMobile ? 0.4 : 0.8;
  const titleElements = useMemo(() => TITLE_CHARS.map((char, i) => (
    <Text key={i} {...FONT_PROPS} position={[i * diff, 2, 1]}>{char}</Text>
  )), [diff]);

  useFrame((_, delta) => {
    const d = data.range(0.8, 0.2);
    const e = data.range(0.7, 0.2);

    if (groupRef.current && !isActive) {
      groupRef.current.position.y = d > 0 ? -1 : -30;
      groupRef.current.visible = d > 0;
    }

    if (titleRef.current) {
      titleRef.current.children.forEach((text, i) => {
        const y =  Math.max(Math.min((1 - d) * (10 - i), 10), 0.5);
        text.position.y = THREE.MathUtils.damp(text.position.y, y, 7, delta);
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        (text as any).fillOpacity = e;
      });
    }
  });

  return (
    <group position={[0, -41.5, 12]} rotation={[-Math.PI / 2, 0 ,-Math.PI / 2]}>
      <group rotation={[0, 0, Math.PI / 2]}>
        <group ref={titleRef} position={[isMobile ? -1.8 : -3.6, 2, -2]}>
          {titleElements}
        </group>

        <group position={[0, -1, 0]} ref={groupRef}>
          <GridTile title='WORK AND EDUCATION'
            id="work"
            color='#b9c6d6'
            textAlign='left'
            position={new THREE.Vector3(isMobile ? -1 : -2, 0, isMobile ? 0.4 : 0)}>
            <Work/>
          </GridTile>
          <GridTile title='SIDE PROJECTS'
            id="projects"
            color='#bdd1e3'
            textAlign='right'
            position={new THREE.Vector3(isMobile ? 1 : 2, 0, 0)}>
            <Projects/>
          </GridTile>
        </group>
      </group>
    </group>
  );
};

export default Experience;