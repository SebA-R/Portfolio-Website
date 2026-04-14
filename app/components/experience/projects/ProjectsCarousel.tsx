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
    const maxCols = 5;
    const rowSpacing = 3;
    const tileAngularSpacing = Math.PI * 0.15; // fixed spacing between adjacent tiles
    const distance = 13;

    const total = PROJECTS.length;
    const remainder = total % maxCols; // tiles in the partial (top) row

    return PROJECTS.map((project, i) => {
      let row: number, col: number, tilesInRow: number;

      if (remainder > 0 && i < remainder) {
        // Partial row sits at the top
        row = 0;
        col = i;
        tilesInRow = remainder;
      } else {
        // Full rows fill from below the partial row
        const j = remainder > 0 ? i - remainder : i;
        row = (remainder > 0 ? 1 : 0) + Math.floor(j / maxCols);
        col = j % maxCols;
        tilesInRow = Math.min(maxCols, total - (remainder > 0 ? remainder : 0) - Math.floor(j / maxCols) * maxCols);
      }

      // Arc for this row, centered on the same axis
      const rowFov = (tilesInRow - 1) * tileAngularSpacing;
      const startAngle = (Math.PI - rowFov) / 2;
      const angle = tilesInRow === 1 ? Math.PI / 2 : startAngle + tileAngularSpacing * col;

      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);
      const rotY = Math.PI / 2 - angle;
      const y = 1 + rowSpacing - row * rowSpacing;

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