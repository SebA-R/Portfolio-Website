import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

/**
 * Claude generated this. Very good code ngl.
 *
 * @returns
 */
export const TouchPanControls = () => {
  const { camera } = useThree()
  const touchStartRef = useRef({ x: 0, y: 0 })
  const cameraRotationRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const cameraStartYRef = useRef(0)
  const targetCameraYRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  // Set initial camera and target rotation values
  useEffect(() => {
    cameraRotationRef.current = { x: camera.rotation.y, y: camera.rotation.x }
    targetRotationRef.current = { x: camera.rotation.y, y: camera.rotation.x }
    targetCameraYRef.current = camera.position.y
  }, [camera])

  // Animation loop for smooth camera movement
  useFrame(() => {
    if (!camera) return

    const dampingFactor = 0.05
    camera.rotation.y += (targetRotationRef.current.x - camera.rotation.y) * dampingFactor
    camera.position.y += (targetCameraYRef.current - camera.position.y) * dampingFactor
    camera.updateProjectionMatrix()
  })

  // Handle touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true)
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        cameraRotationRef.current = { x: targetRotationRef.current.x, y: targetRotationRef.current.y }
        cameraStartYRef.current = targetCameraYRef.current
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return

      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const deltaX = touchX - touchStartRef.current.x
      const deltaY = touchY - touchStartRef.current.y

      // Horizontal → rotation.y
      const maxRotation = Math.PI / 3
      const newRotationY = cameraRotationRef.current.x + deltaX * 0.005
      targetRotationRef.current.x = Math.max(Math.min(newRotationY, maxRotation), -maxRotation)

      // Vertical → camera.position.y (navigate rows); numRows=3, rowSpacing=3
      const newY = cameraStartYRef.current + deltaY * 0.04
      targetCameraYRef.current = Math.max(-47, Math.min(-33, newY))
    }

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false)
      }
    }

    // Momentum scrolling when finger is lifted
    const handleTouchMomentum = () => {
      if (!isDragging && Math.abs(targetRotationRef.current.x - camera.rotation.y) < 0.001) {
        // When movement nearly stops, update the reference point
        cameraRotationRef.current = {
          x: camera.rotation.y,
          y: camera.rotation.x
        }
      }
    }

    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    // For momentum effect
    const momentumInterval = setInterval(handleTouchMomentum, 100)

    // Clean up event listeners
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      clearInterval(momentumInterval)
    }
  }, [camera, isDragging])

  return null
}