import posthog from "posthog-js";
import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import ProjectTile from "./ProjectTile";

import { PROJECTS } from "@constants";
import { usePortalStore } from "@stores";

const ProjectsCarousel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");

  useEffect(() => {
    if (!isActive) setActiveId(null);
  }, [isActive]);

  const onClick = (id: number) => {
    if (!isMobile) return;
    const isExpanding = id !== activeId;
    setActiveId(id === activeId ? null : id);
    posthog.capture('project_mobile_selected', {
      project_index: id,
      project_title: PROJECTS[id]?.title,
      is_expanded: isExpanding,
    });
  };

  const tiles = useMemo(() => {
    const numCols = 3;
    const rowSpacing = 3;
    const fov = Math.PI * 0.75;
    const distance = 13;
    const startAngle = (Math.PI - fov) / 2;

    return PROJECTS.map((project, i) => {
      const col = i % numCols;
      const row = Math.floor(i / numCols);
      const angle = numCols > 1
        ? startAngle + (fov / (numCols - 1)) * col
        : Math.PI / 2;
      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);
      const rotY = Math.PI / 2 - angle;
      const y = 1 - row * rowSpacing;

      return (
        <ProjectTile
          key={i}
          project={project}
          index={i}
          position={[x, y, z]}
          rotation={[0, rotY, 0]}
          activeId={activeId}
          onClick={() => onClick(i)}
        />
      );
    });
  }, [activeId, isActive]);

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      {tiles}
    </group>
  );
};

export default ProjectsCarousel;