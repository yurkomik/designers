"use client"

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Cloud, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { WeatherData } from './weather-service'

interface WeatherEffectsProps {
  weatherData: WeatherData & { performanceMode?: boolean };
}

export default function WeatherEffects({ weatherData }: WeatherEffectsProps) {
  const condition = weatherData?.condition?.toLowerCase() || 'clear'
  const isDay = weatherData?.isDay ?? true
  const performanceMode = weatherData?.performanceMode ?? false
  const { scene } = useThree()
  const [previousCondition, setPreviousCondition] = useState(condition)
  const [previousDayState, setPreviousDayState] = useState(isDay)
  
  // Adjust stars and particle counts based on performance mode
  const starsCount = performanceMode ? 800 : 1500
  const sparklesCount = performanceMode ? 30 : 50
  
  // Refs for animation
  const rainRef = useRef<THREE.Group>(null)
  const snowRef = useRef<THREE.Group>(null)
  const lightningRef = useRef<THREE.PointLight>(null)
  
  // Sky colors for different times and conditions
  const skyColor = useMemo(() => {
    if (!isDay) return '#001529' // Night sky
    
    // Day sky colors based on weather
    switch(condition) {
      case 'clear': return '#87ceeb'
      case 'partly cloudy': return '#7cb9e8'
      case 'cloudy': return '#b0c4de'
      case 'rainy': return '#708090'
      case 'stormy': 
      case 'thunderstorm': return '#4a646c'
      case 'snowy': return '#e6eaf2'
      case 'foggy': return '#d3d3d3'
      default: return '#87ceeb' // Default blue sky
    }
  }, [condition, isDay])
  
  // Update fog only when condition or day/night state changes
  useEffect(() => {
    if (condition !== previousCondition || isDay !== previousDayState) {
      // Update fog based on conditions
      if (condition === 'foggy') {
        scene.fog = new THREE.FogExp2('#c8c8c8', 0.022)
      } else if (condition === 'rainy' || condition === 'snowy') {
        scene.fog = new THREE.FogExp2('#abb0bc', 0.010) 
      } else if (!isDay) {
        scene.fog = new THREE.FogExp2('#000b14', 0.004)
      } else if (condition === 'cloudy') {
        scene.fog = new THREE.FogExp2('#cfd7e4', 0.002)
      } else {
        scene.fog = null
      }
      
      // Update state
      setPreviousCondition(condition)
      setPreviousDayState(isDay)
    }
  }, [condition, isDay, scene, previousCondition, previousDayState])
  
  // Cache to skip update frames for better performance
  const frameCounter = useRef(0);
  const lastLightningTime = useRef(0);
  
  // Handle lightning separately in useFrame for random timing
  useFrame(({ clock }) => {
    // Throttle frame updates to improve performance
    frameCounter.current += 1;
    
    // Skip most frames to reduce flickering and improve performance
    if (frameCounter.current % 3 !== 0) return;
    
    // Random lightning for storms - only update when needed
    if ((condition === 'stormy' || condition === 'thunderstorm') && lightningRef.current) {
      const time = clock.getElapsedTime();
      // Add time-based throttling to prevent flickering
      if (Math.random() < 0.005 && time - lastLightningTime.current > 3) {
        lastLightningTime.current = time;
        lightningRef.current.intensity = 1.5 + Math.random() * 5
        lightningRef.current.position.set(
          (Math.random() - 0.5) * 100,
          30 + Math.random() * 30,
          (Math.random() - 0.5) * 100
        )
        
        // Fade out lightning
        setTimeout(() => {
          if (lightningRef.current) {
            lightningRef.current.intensity = 0
          }
        }, 200)
      }
    }
  })
  
  // Animate snow and rain - use frame skipping for better performance
  useFrame(() => {
    // Only process every third frame to improve performance and reduce flickering
    if (frameCounter.current % 3 !== 0) return;
    
    // Animate rain
    if (rainRef.current && (condition === 'rainy' || condition === 'stormy' || condition === 'thunderstorm')) {
      rainRef.current.children.forEach((drop: THREE.Mesh) => {
        // Reset drops that hit the ground
        drop.position.y -= 0.8
        if (drop.position.y < 0) {
          drop.position.y = 60 + Math.random() * 40
          drop.position.x = (Math.random() - 0.5) * 200
          drop.position.z = (Math.random() - 0.5) * 200
        }
      })
    }
    
    // Animate snow
    if (snowRef.current && condition === 'snowy') {
      snowRef.current.children.forEach((flake: THREE.Mesh) => {
        // Add some horizontal drift to snow
        flake.position.x += Math.sin(Date.now() * 0.001 + flake.position.z) * 0.02
        flake.position.y -= 0.1 + Math.random() * 0.1
        
        // Reset flakes that hit the ground
        if (flake.position.y < 0) {
          flake.position.y = 50 + Math.random() * 30
          flake.position.x = (Math.random() - 0.5) * 150
          flake.position.z = (Math.random() - 0.5) * 150
        }
        
        // Rotate snowflakes gently - less frequent updates
        if (frameCounter.current % 6 === 0) {
          flake.rotation.x += 0.01
          flake.rotation.y += 0.01
        }
      })
    }
  })
  
  // Generate rain drops - Reduce count for better performance
  const rainDrops = useMemo(() => {
    const drops = []
    const raindropMaterial = new THREE.MeshBasicMaterial({ 
      color: '#a4c8e3',
      transparent: true,
      opacity: 0.6
    })
    
    // Shared geometry for better performance
    const dropGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 4)
    
    // Create rain drops with varied sizes for heavy/light rain - reduced count
    const count = condition === 'stormy' || condition === 'thunderstorm' ? 1000 : 500
    
    for (let i = 0; i < count; i++) {
      const drop = new THREE.Mesh(dropGeometry, raindropMaterial)
      
      // Random positions in the sky
      drop.position.set(
        (Math.random() - 0.5) * 200,
        Math.random() * 100,
        (Math.random() - 0.5) * 200
      )
      
      drop.rotation.x = Math.PI / 2
      drops.push(drop)
    }
    
    return drops
  }, [condition])
  
  // Generate snowflakes - Reduce count for better performance
  const snowFlakes = useMemo(() => {
    const flakes = []
    const snowMaterial = new THREE.MeshBasicMaterial({ 
      color: '#ffffff',
      transparent: true,
      opacity: 0.8
    })
    
    // Shared geometries for better performance
    const octaGeometry = new THREE.OctahedronGeometry(0.15, 0);
    const tetraGeometry = new THREE.TetrahedronGeometry(0.15, 0);
    const boxGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    
    // Reduced count for better performance
    const count = 500;
    
    for (let i = 0; i < count; i++) {
      // Alternate between different snowflake shapes
      let flakeGeometry
      const flakeType = Math.floor(Math.random() * 3)
      
      if (flakeType === 0) {
        flakeGeometry = octaGeometry;
      } else if (flakeType === 1) {
        flakeGeometry = tetraGeometry;
      } else {
        flakeGeometry = boxGeometry;
      }
      
      const flake = new THREE.Mesh(flakeGeometry, snowMaterial)
      
      // Random positions in the sky
      flake.position.set(
        (Math.random() - 0.5) * 150,
        Math.random() * 80,
        (Math.random() - 0.5) * 150
      )
      
      flakes.push(flake)
    }
    
    return flakes
  }, [])
  
  // Clean up resources when component unmounts or conditions change
  useEffect(() => {
    return () => {
      // Clean up fog when component unmounts
      if (scene) {
        scene.fog = null
      }
    }
  }, [scene])
  
  // Night sky with stars - optimized for performance
  const NightSky = useMemo(() => {
    if (isDay) return null;
    
    return (
      <group>
        <Stars 
          radius={150} 
          depth={50} 
          count={starsCount} // Adjusted based on performance mode
          factor={4} 
          saturation={0.5} 
          fade
        />
        
        {/* Reduced sparkle count */}
        <Sparkles 
          count={sparklesCount} // Adjusted based on performance mode
          scale={120}
          size={6}
          speed={0.3}
          noise={0.2}
          color="#ffffff"
        />
      </group>
    );
  }, [isDay, starsCount, sparklesCount]);
  
  // Clouds based on condition - Memoized for performance
  const CloudsGroup = useMemo(() => {
    if (condition === 'clear') return null;
    
    if (condition === 'partly cloudy') {
      return (
        <group>
          <Cloud position={[40, 30, -30]} args={[10, 10]} color="#ffffff" opacity={0.9} />
          <Cloud position={[-50, 25, 10]} args={[15, 15]} color="#ffffff" opacity={0.8} />
          <Cloud position={[20, 35, 40]} args={[8, 8]} color="#ffffff" opacity={0.7} />
        </group>
      );
    }
    
    if (condition === 'cloudy' || condition === 'foggy') {
      return (
        <group>
          <Cloud position={[0, 30, 0]} args={[20, 20]} color="#e6e6e6" opacity={0.9} />
          <Cloud position={[40, 25, -20]} args={[25, 25]} color="#d4d4d4" opacity={0.95} />
          <Cloud position={[-30, 35, 30]} args={[30, 30]} color="#e0e0e0" opacity={0.9} />
          <Cloud position={[50, 30, 50]} args={[20, 20]} color="#dadada" opacity={0.8} />
          <Cloud position={[-50, 28, -50]} args={[25, 25]} color="#d8d8d8" opacity={0.85} />
        </group>
      );
    }
    
    if (condition === 'rainy' || condition === 'stormy' || condition === 'thunderstorm') {
      return (
        <group>
          <Cloud position={[0, 40, 0]} args={[30, 30]} color="#5c5c5c" opacity={0.9} />
          <Cloud position={[50, 35, -30]} args={[35, 35]} color="#545454" opacity={0.95} />
          <Cloud position={[-50, 40, 20]} args={[40, 40]} color="#4a4a4a" opacity={0.9} />
          <Cloud position={[40, 30, 40]} args={[30, 30]} color="#626262" opacity={0.95} />
          <Cloud position={[-70, 32, -40]} args={[35, 35]} color="#505050" opacity={0.9} />
        </group>
      );
    }
    
    if (condition === 'snowy') {
      return (
        <group>
          <Cloud position={[0, 40, 0]} args={[30, 30]} color="#b8c5db" opacity={0.8} />
          <Cloud position={[40, 35, -30]} args={[25, 25]} color="#cedbe8" opacity={0.75} />
          <Cloud position={[-50, 30, 10]} args={[30, 30]} color="#c4d4e8" opacity={0.8} />
          <Cloud position={[30, 25, 40]} args={[20, 20]} color="#bbc7d9" opacity={0.7} />
          <Cloud position={[-40, 38, -40]} args={[25, 25]} color="#c8d3e0" opacity={0.75} />
        </group>
      );
    }
    
    return null;
  }, [condition]);
  
  // Celestial body (sun/moon) - memoized
  const CelestialBody = useMemo(() => {
    if (condition !== 'clear' && condition !== 'partly cloudy') return null;
    
    return (
      <mesh position={[isDay ? 100 : -100, 100, -100]} castShadow>
        <sphereGeometry args={[isDay ? 20 : 15, 32, 32]} />
        <meshBasicMaterial color={isDay ? '#FFDB58' : '#FFF8DC'} />
        <pointLight 
          color={isDay ? '#FFF8E0' : '#EEEAE0'} 
          intensity={isDay ? 1.5 : 0.8} 
          distance={1000} 
          castShadow
          shadow-mapSize-width={1024} // Reduced from 2048 for performance
          shadow-mapSize-height={1024} // Reduced from 2048 for performance
        />
      </mesh>
    );
  }, [condition, isDay]);
  
  return (
    <group>
      {/* Sky background */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[300, 32, 32]} />
        <meshBasicMaterial color={skyColor} side={THREE.BackSide} />
      </mesh>
      
      {/* Sun/Moon - only in clear/partly cloudy conditions */}
      {CelestialBody}
      
      {/* Stars (only at night) */}
      {NightSky}
      
      {/* Clouds based on weather condition */}
      {CloudsGroup}
      
      {/* Rain */}
      {(condition === 'rainy' || condition === 'stormy' || condition === 'thunderstorm') && (
        <group ref={rainRef}>
          {rainDrops.map((drop, i) => (
            <primitive key={i} object={drop} />
          ))}
        </group>
      )}
      
      {/* Snow */}
      {condition === 'snowy' && (
        <group ref={snowRef}>
          {snowFlakes.map((flake, i) => (
            <primitive key={i} object={flake} />
          ))}
        </group>
      )}
      
      {/* Lightning for storms */}
      {(condition === 'stormy' || condition === 'thunderstorm') && (
        <pointLight 
          ref={lightningRef} 
          color="#e0f0ff" 
          intensity={0} 
          distance={400}
          position={[0, 40, 0]} 
        />
      )}
      
      {/* Add ambient light with color based on time of day */}
      <ambientLight color={isDay ? '#c2d6f0' : '#0a101f'} intensity={isDay ? 0.7 : 0.2} />
      
      {/* Add hemisphere light for better shade transitions */}
      <hemisphereLight
        color={isDay ? '#cae2ff' : '#001429'}
        groundColor={isDay ? '#4a7341' : '#111111'}
        intensity={isDay ? 0.8 : 0.3}
      />
    </group>
  )
} 