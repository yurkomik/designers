"use client"

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Define different camera view positions
const VIEW_MODES = {
  OVERVIEW: 'overview',
  STREET: 'street',
  AERIAL: 'aerial',
  CLOSEUP: 'closeup'
}

interface CameraControllerProps {
  initialView?: string;
  onViewChange?: (view: string) => void;
}

// Export the component types for ref
export interface CameraControllerHandle {
  changeView: (view: string) => void;
}

const CameraController = forwardRef<CameraControllerHandle, CameraControllerProps>(({ 
  initialView = VIEW_MODES.OVERVIEW,
  onViewChange
}, ref) => {
  const { camera, size, gl } = useThree()
  const controlsRef = useRef<any>(null)
  const [currentView, setCurrentView] = useState(initialView)
  const [targetPosition, setTargetPosition] = useState(getCameraPositionForView(initialView))
  const [targetLookAt, setTargetLookAt] = useState(getCameraLookAtForView(initialView))
  const transitionRef = useRef({
    inProgress: false,
    startPosition: new THREE.Vector3(),
    startLookAt: new THREE.Vector3(),
    elapsedTime: 0,
    duration: 2.0 // seconds
  })
  
  // Get camera position for a specific view
  function getCameraPositionForView(view: string): THREE.Vector3 {
    switch (view) {
      case VIEW_MODES.OVERVIEW:
        return new THREE.Vector3(80, 60, 80)
      case VIEW_MODES.STREET:
        return new THREE.Vector3(15, 2, 15)
      case VIEW_MODES.AERIAL:
        return new THREE.Vector3(0, 80, 0)
      case VIEW_MODES.CLOSEUP:
        return new THREE.Vector3(30, 20, 30)
      default:
        return new THREE.Vector3(80, 60, 80)
    }
  }
  
  // Get look-at point for a specific view
  function getCameraLookAtForView(view: string): THREE.Vector3 {
    switch (view) {
      case VIEW_MODES.OVERVIEW:
        return new THREE.Vector3(0, 0, 0)
      case VIEW_MODES.STREET:
        return new THREE.Vector3(0, 2, 0)
      case VIEW_MODES.AERIAL:
        return new THREE.Vector3(0, 0, 0)
      case VIEW_MODES.CLOSEUP:
        return new THREE.Vector3(0, 10, 0)
      default:
        return new THREE.Vector3(0, 0, 0)
    }
  }
  
  // Change the current view
  function changeView(view: string) {
    if (view === currentView) return
    
    // Start transition
    const transition = transitionRef.current
    transition.inProgress = true
    transition.startPosition.copy(camera.position)
    
    // Get current lookAt point
    if (controlsRef.current) {
      transition.startLookAt.copy(controlsRef.current.target)
    }
    
    transition.elapsedTime = 0
    
    // Set new targets
    setTargetPosition(getCameraPositionForView(view))
    setTargetLookAt(getCameraLookAtForView(view))
    setCurrentView(view)
    
    // Notify parent component
    if (onViewChange) {
      onViewChange(view)
    }
  }

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    changeView
  }));
  
  // Set up keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') changeView(VIEW_MODES.OVERVIEW)
      if (e.key === '2') changeView(VIEW_MODES.STREET)
      if (e.key === '3') changeView(VIEW_MODES.AERIAL)
      if (e.key === '4') changeView(VIEW_MODES.CLOSEUP)
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentView])
  
  // Initialize camera position
  useEffect(() => {
    if (camera && initialView) {
      const initialPosition = getCameraPositionForView(initialView)
      const initialLookAt = getCameraLookAtForView(initialView)
      
      camera.position.copy(initialPosition)
      if (controlsRef.current) {
        controlsRef.current.target.copy(initialLookAt)
        controlsRef.current.update()
      }
    }
  }, [camera, initialView])
  
  // Handle camera transitions and animation
  useFrame((state, delta) => {
    const transition = transitionRef.current
    
    if (transition.inProgress) {
      transition.elapsedTime += delta
      
      // Calculate progress with easing
      const progress = Math.min(transition.elapsedTime / transition.duration, 1.0)
      const easedProgress = easeInOutCubic(progress)
      
      // Interpolate camera position
      camera.position.lerpVectors(
        transition.startPosition,
        targetPosition,
        easedProgress
      )
      
      // Interpolate look-at point
      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(
          transition.startLookAt,
          targetLookAt,
          easedProgress
        )
        controlsRef.current.update()
      }
      
      // End transition
      if (progress >= 1.0) {
        transition.inProgress = false
      }
    } else {
      // Add subtle camera breathing effect based on the current view
      if (currentView === VIEW_MODES.OVERVIEW) {
        // Gentle orbital movement
        const time = state.clock.getElapsedTime()
        camera.position.x = targetPosition.x + Math.sin(time * 0.1) * 2
        camera.position.z = targetPosition.z + Math.cos(time * 0.1) * 2
      } else if (currentView === VIEW_MODES.STREET) {
        // Slight bobbing for street view
        const time = state.clock.getElapsedTime()
        camera.position.y = targetPosition.y + Math.sin(time * 1.5) * 0.05
      } else if (currentView === VIEW_MODES.AERIAL) {
        // Slow drift for aerial view
        const time = state.clock.getElapsedTime()
        camera.position.x = targetPosition.x + Math.sin(time * 0.2) * 3
        camera.position.z = targetPosition.z + Math.cos(time * 0.2) * 3
      }
      
      if (controlsRef.current) {
        controlsRef.current.update()
      }
    }
  })
  
  // Helper function for smooth easing
  function easeInOutCubic(t: number): number {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  }
  
  return (
    <>
      <OrbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going below ground
        minDistance={5}
        maxDistance={150}
      />
    </>
  )
});

// Display name for debugging
CameraController.displayName = 'CameraController';

export default CameraController; 