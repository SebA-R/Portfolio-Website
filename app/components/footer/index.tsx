import { Svg, Text, useCursor, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FOOTER_LINKS } from "../../constants";
import { FooterLink } from "../../types";

// Target visual size (world units) for all mobile icons
const ICON_TARGET_SIZE = 0.35;
// Base viewBox reference size — scale is computed relative to this
const ICON_BASE_VIEWBOX = 256;

const useResponsive = () => {
  const { viewport } = useThree();
  const width = viewport.width;

  // Scale everything based on viewport width
  const isMobile = width < 6;
  const isTablet = width >= 6 && width < 10;

  // Dynamic spacing that scales with viewport
  let spacing: number;
  let fontSize: number;
  let iconScale: number;

  if (isMobile) {
    spacing = Math.max(0.8, width * 0.18);
    fontSize = Math.max(0.18, width * 0.04);
    iconScale = ICON_TARGET_SIZE / ICON_BASE_VIEWBOX;
  } else if (isTablet) {
    spacing = Math.max(1.2, width * 0.15);
    fontSize = 0.22;
    iconScale = ICON_TARGET_SIZE / ICON_BASE_VIEWBOX;
  } else {
    spacing = Math.min(2, width * 0.12);
    fontSize = 0.25;
    iconScale = ICON_TARGET_SIZE / ICON_BASE_VIEWBOX;
  }

  return { isMobile, spacing, fontSize, iconScale };
};

const FooterLinkItem = ({ link, isMobile, fontSize, iconScale }: { link: FooterLink; isMobile: boolean; fontSize: number; iconScale: number; }) => {
  // Normalize icon scale so all icons appear the same visual size regardless of viewBox
  const normalizedIconScale = iconScale * (ICON_BASE_VIEWBOX / (link.iconViewBoxSize ?? ICON_BASE_VIEWBOX));
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const onPointerOver = () => setHovered(true);
  const onPointerOut = () => setHovered(false);
  const onClick = () => {
    posthog.capture('footer_link_clicked', { link_name: link.name, link_url: link.url });
    window.open(link.url, '_blank');
  };
  const onPointerMove = (e: MouseEvent) => {
    if (isMobile) return;
    const hoverDiv = document.getElementById(`footer-link-${link.name}`);
    gsap.to(hoverDiv, {
      top: `${e.clientY + 14}px`,
      left: `${e.clientX}px`,
      duration: 0.6,
    });
  };

  const fontProps = {
    font: "./Vercetti-Regular.woff",
    fontSize: fontSize,
    color: 'white',
    onPointerOver,
    onPointerMove,
    onPointerOut,
    onClick,
  };

  useEffect(() => {
    if (!document.getElementById(`footer-link-${link.name}`)) {
      const hoverDiv = document.createElement('div');
      hoverDiv.id = `footer-link-${link.name}`;
      hoverDiv.textContent = link.hoverText ?? link.name.toUpperCase();
      hoverDiv.style.position = 'fixed';
      hoverDiv.style.zIndex = '2';
      hoverDiv.style.bottom = '0';
      hoverDiv.style.opacity = '0';
      hoverDiv.style.left = window.innerWidth / 2 + 'px';
      hoverDiv.style.fontSize = '0.8rem';
      hoverDiv.style.pointerEvents = 'none';
      document.body.appendChild(hoverDiv);
    }
  }, [])

  useEffect(() => {
    if (isMobile) return

    const hoverDiv = document.getElementById(`footer-link-${link.name}`);

    if (hovered) {
      gsap.fromTo(hoverDiv, { opacity: 0 }, { opacity: 0.5, delay: 0.2 });
    } else {
      gsap.to(hoverDiv, { opacity: 0 });
    }

    gsap.to(textRef.current, {
      letterSpacing: hovered ? 0.3 : 0,
      duration: 0.3,
    });

    return () => {
      gsap.killTweensOf(hoverDiv);
      gsap.killTweensOf(textRef.current);
    }
  }, [hovered]);

  useCursor(hovered);

  if (isMobile) {
    return <Svg onClick={onClick} scale={normalizedIconScale} position={[0, 0, 0]} src={link.icon} />;
  }

  return (
    <Text ref={textRef} {...fontProps} >
      {link.name.toUpperCase()}
    </Text>
  )
}

const Footer = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const { isMobile, spacing, fontSize, iconScale } = useResponsive();

  useFrame(() => {
    const d = data.range(0.8, 0.2);
    if (groupRef.current) {
      groupRef.current.visible = d > 0;
    }
  });

  // Calculate offset to center the links dynamically
  const linkCount = FOOTER_LINKS.length;
  const totalWidth = (linkCount - 1) * spacing;
  const offsetX = -totalWidth / 2;

  return (
    <group position={[0, -44, 18]} rotation={[-Math.PI / 2, 0, 0]} ref={groupRef}>
      <group position={[offsetX, 0, 0]}>
        {FOOTER_LINKS.map((link, i) => (
          <group key={link.name} position={[i * spacing, 0, 0]}>
            <FooterLinkItem link={link} isMobile={isMobile} fontSize={fontSize} iconScale={iconScale} />
          </group>
        ))}
      </group>
    </group>
  );
};

export default Footer;
