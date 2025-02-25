"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, RoundedBox, Sphere, Circle, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { WeatherData } from './weather-service'

interface CitySceneProps {
  weatherData: WeatherData & { performanceMode?: boolean };
}

export default function CityScene({ weatherData }: CitySceneProps) {
  const isDay = weatherData?.isDay ?? true
  const performanceMode = weatherData?.performanceMode ?? false
  
  // Adjust counts based on performance mode
  const buildingCount = performanceMode ? 40 : 70
  const treeCount = performanceMode ? 80 : 150
  const carCount = performanceMode ? 15 : 30
  const peopleCount = performanceMode ? 20 : 40
  const streetLightCount = performanceMode ? 20 : 40
  
  return (
    <group>
      {/* Ground */}
      <Ground isDay={isDay} />
      
      {/* City buildings */}
      <Buildings isDay={isDay} count={buildingCount} performanceMode={performanceMode} />
      
      {/* Roads */}
      <Roads />
      
      {/* Trees and parks */}
      <Trees count={treeCount} />
      
      {/* Cars */}
      <Cars count={carCount} isDay={isDay} performanceMode={performanceMode} />
      
      {/* People */}
      <People count={peopleCount} isDay={isDay} performanceMode={performanceMode} />
      
      {/* Park and fountain in the center */}
      <CentralPark isDay={isDay} />
      
      {/* Street lights (always visible but only lit at night) */}
      <StreetLights count={streetLightCount} isLit={!isDay} performanceMode={performanceMode} />
    </group>
  )
}

// Ground component with improved texturing
function Ground({ isDay }: { isDay: boolean }) {
  // Different colors for different ground areas to create variation
  const grassColor = isDay ? '#7ec850' : '#0c3b0c'
  const dirtColor = isDay ? '#c2b280' : '#3d3424'
  
  return (
    <group>
      {/* Main ground */}
      <Box 
        args={[200, 1, 200]} 
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color={grassColor} 
          roughness={0.9}
          metalness={0.1}
        />
      </Box>
      
      {/* Dirt patches randomly placed */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Circle
          key={`dirt-${i}`}
          args={[2 + Math.random() * 5, 32]}
          position={[
            (Math.random() - 0.5) * 160,
            -0.48,
            (Math.random() - 0.5) * 160
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial 
            color={dirtColor} 
            roughness={1}
          />
        </Circle>
      ))}
      
      {/* Sidewalks */}
      <Box 
        args={[160, 0.15, 12]} 
        position={[0, -0.4, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color="#aaaaaa" roughness={0.8} />
      </Box>
      <Box 
        args={[12, 0.15, 160]} 
        position={[0, -0.4, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color="#aaaaaa" roughness={0.8} />
      </Box>
    </group>
  )
}

// Enhanced buildings component
function Buildings({ count = 70, isDay = true, performanceMode = false }) {
  // Enhanced color palette for more visual variety
  const buildingColors = isDay 
    ? ['#f5f5f5', '#e0e0e0', '#d0d0d0', '#c0c0c0', '#ededed', '#e8e5dc', '#d9e0e3', '#f0eade']
    : ['#222222', '#333333', '#444444', '#555555', '#242424', '#1a1a1a', '#2a2a2a', '#303030'];
  
  const windowColor = isDay ? '#87CEEB' : '#FFDB58';
  
  // Use one light to simulate many windows at night
  const windowLightEffect = useMemo(() => {
    if (isDay) return null;
    
    // Just create a small number of actual lights
    return Array.from({ length: 20 }).map((_, i) => {
      const randomHeight = 5 + Math.random() * 20;
      const angle = (i / 20) * Math.PI * 2;
      const radius = 30 + Math.random() * 40;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return (
        <pointLight 
          key={`window-light-${i}`}
          position={[x, randomHeight, z]} 
          color={windowColor} 
          distance={50} 
          intensity={0.2}
          castShadow={false}
        />
      );
    });
  }, [isDay, windowColor]);
  
  const buildings = []
  
  // Create random buildings with more variation
  for (let i = 0; i < count; i++) {
    const posX = (Math.random() - 0.5) * 180
    const posZ = (Math.random() - 0.5) * 180
    
    // Skip if too close to center (leave space for a central area)
    if (Math.abs(posX) < 25 && Math.abs(posZ) < 25) continue
    
    // Skip if too close to main roads
    if ((Math.abs(posX) < 12 && Math.abs(posZ) < 85) || 
        (Math.abs(posX) < 85 && Math.abs(posZ) < 12)) continue
    
    // More varied building heights and sizes
    const height = 3 + Math.random() * 30
    const width = 3 + Math.random() * 12
    const depth = 3 + Math.random() * 12
    
    const colorIndex = Math.floor(Math.random() * buildingColors.length)
    const buildingType = Math.random() > 0.7 ? 'modern' : 'classic'
    
    // For performance, we'll reduce the detail level of buildings far from the center
    const distanceFromCenter = Math.sqrt(posX * posX + posZ * posZ);
    const isDetailedBuilding = distanceFromCenter < 80;
    
    buildings.push(
      <Building 
        key={i}
        position={[posX, height / 2, posZ]}
        size={[width, height, depth]}
        color={buildingColors[colorIndex]}
        windowColor={windowColor}
        isDay={isDay}
        type={buildingType}
        isDetailed={isDetailedBuilding}
      />
    )
  }
  
  return (
    <group>
      {windowLightEffect}
      {buildings}
    </group>
  )
}

// Building component - fix window flickering
function Building({ 
  position, 
  size, 
  color, 
  windowColor,
  isDay,
  type = 'classic',
  isDetailed = true
}: { 
  position: [number, number, number], 
  size: [number, number, number],
  color: string,
  windowColor: string,
  isDay: boolean,
  type?: 'classic' | 'modern',
  isDetailed?: boolean
}) {
  // Create windows on the building
  const buildingRef = useRef<THREE.Mesh>(null)
  const windowsRef = useRef<THREE.Mesh>(null)
  const initializedRef = useRef(false)
  const buildingId = useRef(Math.floor(Math.random() * 1000)) // Unique ID for each building
  
  // Use time-based window animation instead of random flickering
  useFrame(({ clock }) => {
    if (windowsRef.current && !isDay && isDetailed) {
      const time = clock.getElapsedTime()
      
      // Only animate windows for detailed buildings and only at night
      // Use building ID to create offset in animations between buildings
      const offset = buildingId.current * 0.1
      
      // Pattern 1: Slow oscillation for overall window intensity
      const baseIntensity = 0.3 + Math.sin(time * 0.1 + offset) * 0.1
      
      // Pattern 2: Occasional blink based on time not random
      // Each building will blink at different times based on its ID
      const shouldBlink = Math.sin(time * 0.05 + offset * 10) > 0.96
      
      // Combine patterns for final intensity
      const finalIntensity = shouldBlink ? 0.1 : baseIntensity
      
      // Apply the new intensity - smoothly
      if (windowsRef.current.material.emissiveIntensity !== finalIntensity) {
        windowsRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
          windowsRef.current.material.emissiveIntensity,
          finalIntensity,
          0.05
        )
      }
      
      // Initialize window color once instead of changing randomly
      if (!initializedRef.current) {
        windowsRef.current.material.emissive.set(windowColor)
        initializedRef.current = true
      }
    }
  })
  
  return (
    <group position={position}>
      {/* Main building structure */}
      <RoundedBox 
        ref={buildingRef}
        args={size} 
        radius={type === 'modern' ? 0.2 : 0.05} 
        smoothness={isDetailed ? 4 : 2}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={type === 'modern' ? 0.2 : 0}
        />
      </RoundedBox>
      
      {/* Windows - add a small offset to prevent z-fighting */}
      <RoundedBox
        ref={windowsRef}
        args={[size[0] * 0.99, size[1] * 0.99, size[2] * 0.99]}
        radius={type === 'modern' ? 0.18 : 0.03}
        smoothness={isDetailed ? 4 : 2}
        position={[0, 0, 0.002]} // Slightly larger offset to prevent z-fighting
      >
        <meshStandardMaterial
          color={color}
          emissive={isDay ? '#000000' : windowColor}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={type === 'modern' ? 0.8 : 0.1}
          transparent
          opacity={0.9}
          depthWrite={true} // Ensure proper depth handling
        />
      </RoundedBox>
      
      {/* Only add rooftop elements for detailed buildings */}
      {isDetailed && size[1] > 15 && (
        <group position={[0, size[1] / 2 + 0.5, 0]}>
          {/* Antenna or water tower */}
          <Cylinder 
            args={[0.1, 0.1, 3, 8]} 
            position={[0, 1.5, 0]}
          >
            <meshStandardMaterial color="#888888" />
          </Cylinder>
          
          {/* AC units or other mechanical elements */}
          <Box 
            args={[1, 0.8, 1]} 
            position={[size[0] * 0.2, 0, size[2] * 0.2]}
          >
            <meshStandardMaterial color="#555555" />
          </Box>
          
          {/* Modern buildings sometimes get a helipad */}
          {type === 'modern' && size[1] > 25 && (
            <group position={[0, 0.2, 0]}>
              <Circle 
                args={[2, 32]} 
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
              >
                <meshStandardMaterial color="#333333" />
              </Circle>
              <Circle 
                args={[1.8, 32]} 
                position={[0, 0.01, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <meshStandardMaterial color="#666666" />
              </Circle>
              <Box 
                args={[0.8, 0.1, 0.8]} 
                position={[0, 0.1, 0]}
              >
                <meshStandardMaterial color="#ff3333" />
              </Box>
            </group>
          )}
        </group>
      )}
    </group>
  )
}

// Enhanced roads with markings and details
function Roads() {
  return (
    <group position={[0, 0.01, 0]}>
      {/* Main roads in a cross pattern */}
      <Box args={[150, 0.1, 10]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#444444" roughness={0.9} />
      </Box>
      <Box args={[10, 0.1, 150]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#444444" roughness={0.9} />
      </Box>
      
      {/* Road markings - center lines */}
      <Box args={[150, 0.11, 0.3]} position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </Box>
      <Box args={[0.3, 0.11, 150]} position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </Box>
      
      {/* Dashed lines for lane divisions */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Box 
          key={`dashx-${i}`}
          args={[2, 0.11, 0.15]} 
          position={[(i - 15) * 5, 0.05, 2.5]}
        >
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </Box>
      ))}
      
      {Array.from({ length: 30 }).map((_, i) => (
        <Box 
          key={`dashx2-${i}`}
          args={[2, 0.11, 0.15]} 
          position={[(i - 15) * 5, 0.05, -2.5]}
        >
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </Box>
      ))}
      
      {Array.from({ length: 30 }).map((_, i) => (
        <Box 
          key={`dashy-${i}`}
          args={[0.15, 0.11, 2]} 
          position={[2.5, 0.05, (i - 15) * 5]}
        >
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </Box>
      ))}
      
      {Array.from({ length: 30 }).map((_, i) => (
        <Box 
          key={`dashy2-${i}`}
          args={[0.15, 0.11, 2]} 
          position={[-2.5, 0.05, (i - 15) * 5]}
        >
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </Box>
      ))}
      
      {/* Crosswalks at the intersection */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Box 
          key={`crosswalk-x-${i}`}
          args={[1, 0.12, 8]} 
          position={[(i - 3) * 1.5, 0.06, 0]}
        >
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </Box>
      ))}
      
      {Array.from({ length: 6 }).map((_, i) => (
        <Box 
          key={`crosswalk-y-${i}`}
          args={[8, 0.12, 1]} 
          position={[0, 0.06, (i - 3) * 1.5]}
        >
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </Box>
      ))}
    </group>
  )
}

// Enhanced trees with more variety
function Trees({ count = 150 }) {
  const trees = useMemo(() => {
    const items = []
    
    for (let i = 0; i < count; i++) {
      const posX = (Math.random() - 0.5) * 170
      const posZ = (Math.random() - 0.5) * 170
      
      // Skip if too close to roads
      if ((Math.abs(posX) < 12 && Math.abs(posZ) < 80) || 
          (Math.abs(posX) < 80 && Math.abs(posZ) < 12)) continue
      
      const treeScale = 0.5 + Math.random() * 1.5
      const treeType = Math.floor(Math.random() * 3) // 0: pine, 1: maple, 2: bush
      
      items.push(
        <Tree 
          key={i}
          position={[posX, 0, posZ]}
          scale={[treeScale, treeScale, treeScale]}
          type={treeType}
        />
      )
    }
    
    return items
  }, [count])
  
  return <group>{trees}</group>
}

// Individual tree with variety
function Tree({ 
  position, 
  scale = [1, 1, 1],
  type = 0
}: { 
  position: [number, number, number],
  scale?: [number, number, number],
  type?: number
}) {
  const trunkColor = '#8B4513'
  const pineColor = '#2d5f3d'
  const mapleColor = '#44a03b'
  const bushColor = '#2e7d32'
  
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <Cylinder 
        args={[0.2, 0.3, 2, 8]} 
        position={[0, 1, 0]} 
        castShadow
      >
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </Cylinder>
      
      {/* Tree type based on parameter */}
      {type === 0 && (
        // Pine tree
        <>
          <Cylinder args={[0, 1.5, 3, 8]} position={[0, 3, 0]} castShadow>
            <meshStandardMaterial color={pineColor} roughness={0.8} />
          </Cylinder>
          <Cylinder args={[0, 1.8, 2.5, 8]} position={[0, 4.5, 0]} castShadow>
            <meshStandardMaterial color={pineColor} roughness={0.8} />
          </Cylinder>
        </>
      )}
      
      {type === 1 && (
        // Maple/deciduous tree
        <Sphere args={[1.8, 16, 16]} position={[0, 3.5, 0]} castShadow>
          <meshStandardMaterial color={mapleColor} roughness={0.8} />
        </Sphere>
      )}
      
      {type === 2 && (
        // Bush/small tree
        <Sphere args={[1.2, 16, 16]} position={[0, 1.5, 0]} castShadow>
          <meshStandardMaterial color={bushColor} roughness={0.8} />
        </Sphere>
      )}
    </group>
  )
}

// Cars that move along the roads
function Cars({ count = 30, isDay = true, performanceMode = false }) {
  const carRefs = useRef<THREE.Group[]>([])
  
  // Pre-calculate car positions and properties
  const cars = useMemo(() => {
    const carColors = [
      '#ff4444', '#4444ff', '#44ff44', '#ffff44', 
      '#44ffff', '#ff44ff', '#ffffff', '#000000', 
      '#888888', '#448844', '#884444', '#444488'
    ]
    
    return Array.from({ length: count }).map((_, i) => {
      const isHorizontal = Math.random() < 0.5
      let posX, posZ, rotY
      
      if (isHorizontal) {
        posX = (Math.random() - 0.5) * 140
        posZ = (Math.random() < 0.5 ? 2.5 : -2.5)
        rotY = posZ > 0 ? Math.PI / 2 : -Math.PI / 2
      } else {
        posX = (Math.random() < 0.5 ? 2.5 : -2.5)
        posZ = (Math.random() - 0.5) * 140
        rotY = posX > 0 ? Math.PI : 0
      }
      
      const speed = 0.05 + Math.random() * 0.1
      const colorIndex = Math.floor(Math.random() * carColors.length)
      
      return { 
        position: [posX, 0.3, posZ], 
        rotation: [0, rotY, 0],
        color: carColors[colorIndex],
        speed,
        isHorizontal,
        direction: isHorizontal ? (posZ > 0 ? 1 : -1) : (posX > 0 ? 1 : -1)
      }
    })
  }, [count])
  
  // Animate cars
  useFrame(() => {
    carRefs.current.forEach((car, i) => {
      if (!car) return
      
      const carData = cars[i]
      // Add null check to prevent accessing properties of undefined
      if (!carData) return
      
      if (carData.isHorizontal) {
        // Move along Z axis
        car.position.z += carData.speed * carData.direction
        
        // Reset position if out of bounds
        if (Math.abs(car.position.z) > 75) {
          car.position.z = -75 * Math.sign(car.position.z)
        }
      } else {
        // Move along X axis
        car.position.x += carData.speed * carData.direction
        
        // Reset position if out of bounds
        if (Math.abs(car.position.x) > 75) {
          car.position.x = -75 * Math.sign(car.position.x)
        }
      }
    })
  })
  
  // Shared materials for better performance
  const headlightMaterial = useMemo(() => 
    new THREE.MeshBasicMaterial({ color: "#ffffff" })
  , [])
  
  const tailLightMaterial = useMemo(() => 
    new THREE.MeshBasicMaterial({ color: "#ff0000" })
  , [])
  
  // Shared light for night mode instead of per-car lights
  const headlightEffect = useMemo(() => {
    if (isDay) return null;
    
    // Create only a few actual lights instead of per car
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 40;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return (
        <pointLight 
          key={`car-light-${i}`}
          position={[x, 1, z]} 
          color="#ffffff" 
          distance={60} 
          intensity={0.4}
        />
      );
    });
  }, [isDay]);
  
  return (
    <group>
      {headlightEffect}
      
      {cars.map((car, i) => (
        <group 
          key={`car-${i}`}
          ref={el => el && (carRefs.current[i] = el)}
          position={car.position as [number, number, number]}
          rotation={car.rotation as [number, number, number]}
        >
          {/* Car body - using shared instanced materials would be even better */}
          <Box args={[1.8, 0.4, 0.9]} castShadow>
            <meshStandardMaterial color={car.color} metalness={0.7} roughness={0.3} />
          </Box>
          
          {/* Car top */}
          <Box args={[1, 0.35, 0.8]} position={[0.1, 0.4, 0]} castShadow>
            <meshStandardMaterial color={car.color} metalness={0.7} roughness={0.3} />
          </Box>
          
          {/* Wheels */}
          <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[0.5, -0.2, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </Cylinder>
          <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[0.5, -0.2, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </Cylinder>
          <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[-0.5, -0.2, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </Cylinder>
          <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[-0.5, -0.2, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </Cylinder>
          
          {/* Headlights (only visible at night) - using shared material */}
          {!isDay && (
            <>
              <Box args={[0.1, 0.1, 0.1]} position={[0.9, 0.1, 0.3]} material={headlightMaterial} />
              <Box args={[0.1, 0.1, 0.1]} position={[0.9, 0.1, -0.3]} material={headlightMaterial} />
              
              {/* Tail lights - using shared material */}
              <Box args={[0.1, 0.1, 0.2]} position={[-0.9, 0.1, 0.3]} material={tailLightMaterial} />
              <Box args={[0.1, 0.1, 0.2]} position={[-0.9, 0.1, -0.3]} material={tailLightMaterial} />
            </>
          )}
        </group>
      ))}
    </group>
  )
}

// People walking around
function People({ count = 40, isDay = true, performanceMode = false }) {
  const peopleRefs = useRef<THREE.Group[]>([])
  
  // Pre-calculate people positions and properties
  const people = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Positioning people on sidewalks and in the park
      let posX, posZ, rotY
      const inPark = Math.random() < 0.3
      
      if (inPark) {
        // In the central park
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 20
        posX = Math.cos(angle) * radius
        posZ = Math.sin(angle) * radius
        rotY = Math.random() * Math.PI * 2
      } else {
        // On sidewalks
        const onMainSidewalk = Math.random() < 0.7
        
        if (onMainSidewalk) {
          const alongX = Math.random() < 0.5
          if (alongX) {
            posX = (Math.random() - 0.5) * 140
            posZ = (Math.random() < 0.5 ? 6 : -6)
            rotY = posZ > 0 ? Math.PI / 2 : -Math.PI / 2
          } else {
            posX = (Math.random() < 0.5 ? 6 : -6)
            posZ = (Math.random() - 0.5) * 140
            rotY = posX > 0 ? Math.PI : 0
          }
        } else {
          // Random placements in the city
          posX = (Math.random() - 0.5) * 160
          posZ = (Math.random() - 0.5) * 160
          rotY = Math.random() * Math.PI * 2
          
          // Skip if on a road
          if ((Math.abs(posX) < 5 && Math.abs(posZ) < 70) || 
              (Math.abs(posX) < 70 && Math.abs(posZ) < 5)) {
            posX += (posX > 0 ? 5 : -5)
            posZ += (posZ > 0 ? 5 : -5)
          }
        }
      }
      
      const speed = 0.02 + Math.random() * 0.03
      const shirtColor = [
        '#ff4444', '#4444ff', '#44ff44', '#ffff44', 
        '#44ffff', '#ff44ff', '#ffffff', '#000000', 
        '#888888', '#448844', '#884444', '#444488'
      ][Math.floor(Math.random() * 12)]
      
      const pantsColor = [
        '#222222', '#444444', '#3c64b1', '#2b4562', 
        '#372e29', '#0a0a0a', '#2a2a2a', '#3b1e00'
      ][Math.floor(Math.random() * 8)]
      
      return { 
        position: [posX, 0, posZ], 
        rotation: [0, rotY, 0],
        shirtColor,
        pantsColor,
        speed,
        direction: Math.random() < 0.5 ? 1 : -1,
        inPark,
        walkRadius: inPark ? 5 + Math.random() * 15 : 0,
        walkAngle: Math.random() * Math.PI * 2,
        walkCenterX: inPark ? posX : 0,
        walkCenterZ: inPark ? posZ : 0
      }
    })
  }, [count])
  
  // Animate people walking
  useFrame(({ clock }) => {
    peopleRefs.current.forEach((person, i) => {
      if (!person) return
      
      const personData = people[i]
      
      if (personData.inPark) {
        // Walk in circular/random patterns in the park
        personData.walkAngle += personData.speed * 0.05
        
        person.position.x = personData.walkCenterX + Math.cos(personData.walkAngle) * personData.walkRadius
        person.position.z = personData.walkCenterZ + Math.sin(personData.walkAngle) * personData.walkRadius
        
        // Make person face the direction of movement
        const targetRotY = Math.atan2(
          Math.cos(personData.walkAngle + Math.PI/2),
          Math.sin(personData.walkAngle + Math.PI/2)
        )
        person.rotation.y = targetRotY
      } else {
        // Walk in straight lines on sidewalks
        if (Math.abs(personData.rotation[1]) === 0 || 
            Math.abs(personData.rotation[1]) === Math.PI) {
          // Walking along X axis
          person.position.x += personData.speed * personData.direction
          
          // Turn around at edges
          if (Math.abs(person.position.x) > 70) {
            personData.direction *= -1
            person.rotation.y = personData.direction > 0 ? 0 : Math.PI
          }
        } else {
          // Walking along Z axis
          person.position.z += personData.speed * personData.direction
          
          // Turn around at edges
          if (Math.abs(person.position.z) > 70) {
            personData.direction *= -1
            person.rotation.y = personData.direction > 0 ? Math.PI/2 : -Math.PI/2
          }
        }
      }
      
      // Add a slight bobbing motion when walking
      const time = clock.getElapsedTime()
      const bob = Math.sin(time * 5 + i) * 0.05
      person.position.y = 0.05 + bob
    })
  })
  
  return (
    <group>
      {people.map((person, i) => (
        <group 
          key={`person-${i}`}
          ref={el => el && (peopleRefs.current[i] = el)}
          position={person.position as [number, number, number]}
          rotation={person.rotation as [number, number, number]}
        >
          {/* Person body - simple representation */}
          {/* Head */}
          <Sphere args={[0.12, 8, 8]} position={[0, 0.82, 0]} castShadow>
            <meshStandardMaterial color="#f5d0b0" roughness={0.7} />
          </Sphere>
          
          {/* Torso */}
          <Box args={[0.25, 0.4, 0.15]} position={[0, 0.55, 0]} castShadow>
            <meshStandardMaterial color={person.shirtColor} roughness={0.9} />
          </Box>
          
          {/* Legs */}
          <Box args={[0.12, 0.35, 0.12]} position={[0.07, 0.2, 0]} castShadow>
            <meshStandardMaterial color={person.pantsColor} roughness={0.9} />
          </Box>
          <Box args={[0.12, 0.35, 0.12]} position={[-0.07, 0.2, 0]} castShadow>
            <meshStandardMaterial color={person.pantsColor} roughness={0.9} />
          </Box>
          
          {/* Arms */}
          <Box args={[0.1, 0.3, 0.1]} position={[0.18, 0.5, 0]} castShadow>
            <meshStandardMaterial color={person.shirtColor} roughness={0.9} />
          </Box>
          <Box args={[0.1, 0.3, 0.1]} position={[-0.18, 0.5, 0]} castShadow>
            <meshStandardMaterial color={person.shirtColor} roughness={0.9} />
          </Box>
        </group>
      ))}
    </group>
  )
}

// Street lights component with improved appearance
function StreetLights({ count = 40, isLit = false, performanceMode = false }) {
  // Memoized materials for better performance
  const poleMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({ color: "#555555", roughness: 0.5 })
  , []);
  
  const fixtureMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({ color: "#333333", roughness: 0.5 })
  , []);
  
  const bulbMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({ 
      color: isLit ? "#ffffe0" : "#dddddd", 
      emissive: isLit ? "#ffffe0" : "#000000",
      emissiveIntensity: isLit ? 1 : 0
    })
  , [isLit]);
  
  // Use fewer actual lights for better performance
  const streetLightEffect = useMemo(() => {
    if (!isLit) return null;
    
    // Just create a small number of actual lights instead of one per streetlight
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 50;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return (
        <pointLight 
          key={`street-light-${i}`}
          position={[x, 8, z]} 
          color="#fff5c0" 
          distance={40} 
          intensity={0.6}
          castShadow={false}
        />
      );
    });
  }, [isLit]);
  
  const lights = useMemo(() => {
    const items = []
    
    // Create evenly spaced street lights along roads
    for (let i = 0; i < count; i++) {
      // Position lights along the roads
      const isXAxis = Math.random() < 0.5
      
      let posX, posZ
      
      if (isXAxis) {
        posX = (Math.random() - 0.5) * 140
        posZ = 7 * (Math.random() < 0.5 ? 1 : -1)
      } else {
        posX = 7 * (Math.random() < 0.5 ? 1 : -1)
        posZ = (Math.random() - 0.5) * 140
      }
      
      items.push(
        <StreetLight 
          key={i}
          position={[posX, 0, posZ]} 
          isLit={isLit}
          poleMaterial={poleMaterial}
          fixtureMaterial={fixtureMaterial}
          bulbMaterial={bulbMaterial}
        />
      )
    }
    
    return items
  }, [count, isLit, poleMaterial, fixtureMaterial, bulbMaterial])
  
  return (
    <group>
      {streetLightEffect}
      {lights}
    </group>
  )
}

// Individual street light with improved design
function StreetLight({ 
  position, 
  isLit = false,
  poleMaterial,
  fixtureMaterial,
  bulbMaterial
}: { 
  position: [number, number, number], 
  isLit?: boolean,
  poleMaterial: THREE.Material,
  fixtureMaterial: THREE.Material,
  bulbMaterial: THREE.Material
}) {
  return (
    <group position={position}>
      {/* Pole */}
      <Cylinder args={[0.1, 0.15, 6, 8]} position={[0, 3, 0]} material={poleMaterial} />
      
      {/* Arm extending from pole */}
      <Cylinder args={[0.05, 0.05, 1.2, 8]} position={[0.6, 5.7, 0]} rotation={[0, 0, -Math.PI / 4]} material={poleMaterial} />
      
      {/* Light fixture */}
      <group position={[1.2, 5.5, 0]}>
        <Cylinder args={[0.2, 0.15, 0.3, 8]} rotation={[Math.PI / 2, 0, 0]} material={fixtureMaterial} />
        
        {/* Light bulb */}
        <Sphere args={[0.12, 16, 16]} position={[0, -0.15, 0]} material={bulbMaterial} />
      </group>
    </group>
  )
}

// Central park with fountain and benches
function CentralPark({ isDay }: { isDay: boolean }) {
  const waterColor = isDay ? '#4d94ff' : '#1a3b66'
  const grassColor = isDay ? '#7ec850' : '#0c3b0c'
  
  // Animate water in fountain
  const waterRef = useRef<THREE.Mesh>(null)
  const lastUpdateTime = useRef(0)
  
  useFrame(({ clock }) => {
    if (waterRef.current) {
      const time = clock.getElapsedTime()
      
      // Reduce update frequency to every 100ms to prevent flickering
      if (time - lastUpdateTime.current > 0.1) {
        lastUpdateTime.current = time
        
        // Create gentle ripple effect - reduce amplitude
        waterRef.current.position.y = Math.sin(time * 1.5) * 0.03 + 0.3
        waterRef.current.rotation.y += 0.005 // Slower rotation
      }
    }
  })
  
  return (
    <group position={[0, 0, 0]}>
      {/* Central park area - grass circle */}
      <Circle 
        args={[22, 32]} 
        position={[0, 0.01, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial 
          color={grassColor} 
          roughness={0.9}
          polygonOffset={true}
          polygonOffsetFactor={-0.1}
        />
      </Circle>
      
      {/* Footpaths - add increasing z offsets to prevent z-fighting */}
      <Circle 
        args={[20, 32, 0, Math.PI * 2]} 
        position={[0, 0.015, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial 
          color="#c7b299" 
          roughness={0.9}
          polygonOffset={true}
          polygonOffsetFactor={-0.2}
        />
      </Circle>
      
      <Circle 
        args={[18, 32]} 
        position={[0, 0.02, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial 
          color={grassColor} 
          roughness={0.9}
          polygonOffset={true}
          polygonOffsetFactor={-0.3}
        />
      </Circle>
      
      {/* Fountain base */}
      <Cylinder 
        args={[8, 8, 0.5, 32]} 
        position={[0, 0.25, 0]}
      >
        <meshStandardMaterial color="#a0a0a0" roughness={0.7} />
      </Cylinder>
      
      {/* Fountain water */}
      <Cylinder 
        ref={waterRef}
        args={[7, 7, 0.2, 32]} 
        position={[0, 0.3, 0]}
      >
        <meshStandardMaterial 
          color={waterColor} 
          transparent={true} 
          opacity={0.8}
          metalness={0.3}
          roughness={0.2}
          depthWrite={true} // Ensure proper depth writing
          polygonOffset={true}
          polygonOffsetFactor={-1}
        />
      </Cylinder>
      
      {/* Fountain center piece */}
      <Cylinder 
        args={[1, 1, 2.5, 16]} 
        position={[0, 1.25, 0]}
      >
        <meshStandardMaterial color="#909090" roughness={0.7} />
      </Cylinder>
      
      <Sphere
        args={[1.2, 16, 16]}
        position={[0, 2.5, 0]}
      >
        <meshStandardMaterial color="#909090" roughness={0.7} />
      </Sphere>
      
      {/* Water jets - ensure proper positioning and depth */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 3
        const z = Math.sin(angle) * 3
        
        return (
          <group key={`jet-${i}`} position={[x, 0.5, z]}>
            <Cylinder 
              args={[0.1, 0.1, 1, 8]} 
              position={[0, 0.5, 0]}
            >
              <meshStandardMaterial 
                color={waterColor}
                transparent={true}
                opacity={0.7}
                depthWrite={true}
              />
            </Cylinder>
          </group>
        )
      })}
      
      {/* Benches around the fountain */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 12
        const z = Math.sin(angle) * 12
        
        return (
          <group 
            key={`bench-${i}`} 
            position={[x, 0, z]}
            rotation={[0, angle + Math.PI / 2, 0]}
          >
            {/* Bench seat */}
            <Box args={[2, 0.1, 0.6]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color="#8B4513" roughness={0.9} />
            </Box>
            
            {/* Bench back */}
            <Box args={[2, 0.6, 0.1]} position={[0, 0.8, -0.25]}>
              <meshStandardMaterial color="#8B4513" roughness={0.9} />
            </Box>
            
            {/* Bench legs */}
            <Box args={[0.1, 0.5, 0.5]} position={[0.8, 0.25, 0]}>
              <meshStandardMaterial color="#5A3928" roughness={0.9} />
            </Box>
            <Box args={[0.1, 0.5, 0.5]} position={[-0.8, 0.25, 0]}>
              <meshStandardMaterial color="#5A3928" roughness={0.9} />
            </Box>
          </group>
        )
      })}
    </group>
  )
} 