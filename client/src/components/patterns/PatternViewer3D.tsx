import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MeshWobbleMaterial } from '@react-three/drei';
import { PatternSummary } from '../../types/pattern';
import { Button } from '../ui/button';
import { 
  FiRotateCw,
  FiPlay,
  FiPause,
  FiMaximize2,
  FiMinimize2,
  FiZoomIn,
  FiZoomOut,
  FiBox
} from 'react-icons/fi';

// Types for animation and garment material properties
interface AnimationState {
  autoRotate: boolean;
  simulating: boolean;
  speed: number;
}

interface MaterialProperties {
  color: string;
  roughness: number;
  metalness: number;
  envMapIntensity: number;
  bumpScale: number;
  wireframe: boolean;
}

// Simple placeholder model for patterns
function GarmentModel({ 
  color = '#3B82F6', 
  animationState,
  gravity = 0.05,
  stiffness = 0.8,
  wind = 0.2,
  material,
  modelType = 'tshirt',
}: { 
  color?: string;
  animationState: AnimationState;
  gravity?: number;
  stiffness?: number;
  wind?: number;
  material: MaterialProperties;
  modelType?: 'tshirt' | 'dress' | 'jacket' | 'pants';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const clothRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  const initialPositions = useRef<Float32Array | null>(null);
  const { size, viewport } = useThree();
  
  const clothMap = {
    tshirt: { width: 2, height: 3, segments: 20 },
    dress: { width: 2, height: 4, segments: 30 },
    jacket: { width: 2.5, height: 2.5, segments: 25 },
    pants: { width: 1.5, height: 4, segments: 20 },
  };
  
  const { width, height, segments } = clothMap[modelType];
  
  useEffect(() => {
    if (geometryRef.current) {
      // Store initial positions for simulation reset
      const positions = geometryRef.current.attributes.position.array as Float32Array;
      initialPositions.current = positions.slice();
    }
  }, []);

  // Simulate garment physics
  useFrame((state, delta) => {
    time.current += delta;
    
    if (meshRef.current) {
      // Basic rotation animation
      if (animationState.autoRotate) {
        meshRef.current.rotation.y += 0.01 * animationState.speed;
      }
      
      // Fabric physics simulation
      if (animationState.simulating && geometryRef.current && initialPositions.current) {
        const positions = geometryRef.current.attributes.position.array as Float32Array;
        
        for (let i = 0; i < positions.length; i += 3) {
          // Get base position
          const baseX = initialPositions.current[i];
          const baseY = initialPositions.current[i + 1];
          const baseZ = initialPositions.current[i + 2];
          
          // Skip fixed points (e.g., shoulders or waist attachment points)
          if (baseY > height * 0.8) continue;
          
          // Apply gravity
          positions[i + 1] = baseY + Math.sin(time.current + baseX * 2) * gravity * baseY;
          
          // Add wind effect
          positions[i] = baseX + Math.sin(time.current + baseY) * wind;
          positions[i + 2] = baseZ + Math.cos(time.current + baseY * 0.5) * wind * 0.5;
          
          // Apply stiffness (tendency to return to original shape)
          positions[i] = baseX + (positions[i] - baseX) * stiffness;
          positions[i + 1] = baseY + (positions[i + 1] - baseY) * stiffness;
          positions[i + 2] = baseZ + (positions[i + 2] - baseZ) * stiffness;
        }
        
        geometryRef.current.attributes.position.needsUpdate = true;
        geometryRef.current.computeVertexNormals();
      }
    }
  });

  // Create cloth-like geometry based on the model type
  const createGarmentGeometry = () => {
    switch (modelType) {
      case 'tshirt':
        return (
          <group position={[0, 0, 0]}>
            {/* Main body of the shirt */}
            <mesh>
              <cylinderGeometry args={[1, 0.8, 2, 16, segments, true]} ref={geometryRef} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
            
            {/* Sleeves */}
            <mesh position={[0.8, 0.3, 0]}>
              <cylinderGeometry args={[0.3, 0.25, 0.8, 16, 8, true]} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
            <mesh position={[-0.8, 0.3, 0]}>
              <cylinderGeometry args={[0.3, 0.25, 0.8, 16, 8, true]} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
          </group>
        );
        
      case 'dress':
        return (
          <mesh ref={clothRef}>
            <parametricGeometry 
              args={[
                (u: number, v: number, target: THREE.Vector3) => {
                  const waistNarrow = 0.3;
                  
                  // Compute x based on a shape function that creates a dress silhouette
                  let r = 1.5 - v * 0.5;  // Radius decreases as we go down
                  if (v > 0.3 && v < 0.5) {
                    // Create waist narrowing
                    r = r - waistNarrow * Math.sin((v - 0.3) / 0.2 * Math.PI);
                  }
                  
                  // Apply some ripples to the dress
                  const ripple = 0.05 * Math.sin(v * 10) * Math.sin(u * 20);
                  
                  const x = r * Math.cos(u * Math.PI * 2) + ripple;
                  const y = (1 - v) * height - 1.5;
                  const z = r * Math.sin(u * Math.PI * 2) + ripple;
                  
                  target.set(x, y, z);
                }, 
                20, 
                segments
              ]} 
              ref={geometryRef}
            />
            <meshStandardMaterial 
              color={color} 
              side={THREE.DoubleSide} 
              roughness={material.roughness}
              metalness={material.metalness}
              wireframe={material.wireframe}
            />
          </mesh>
        );
        
      case 'jacket':
        return (
          <group position={[0, 0, 0]}>
            {/* Main body of the jacket */}
            <mesh>
              <cylinderGeometry args={[1.2, 1, 2, 16, segments, true]} ref={geometryRef} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
            
            {/* Open front - create a cut */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.5, 2, 2.4]} />
              <meshStandardMaterial 
                color="black" 
                transparent={true} 
                opacity={0}
                side={THREE.DoubleSide}
                depthWrite={false}
                colorWrite={false}
              />
            </mesh>
            
            {/* Sleeves */}
            <mesh position={[0.9, 0.2, 0]}>
              <cylinderGeometry args={[0.35, 0.3, 1, 16, 8, true]} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
            <mesh position={[-0.9, 0.2, 0]}>
              <cylinderGeometry args={[0.35, 0.3, 1, 16, 8, true]} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
            
            {/* Collar */}
            <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.7, 0.2, 16, 30, Math.PI]} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
          </group>
        );
        
      case 'pants':
        return (
          <group position={[0, 0, 0]}>
            {/* Waist band */}
            <mesh position={[0, 1.5, 0]}>
              <torusGeometry args={[0.8, 0.2, 16, 30]} />
              <meshStandardMaterial 
                color={color} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
            
            {/* Left leg */}
            <mesh position={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.4, 0.3, 3, 16, segments, true]} ref={geometryRef} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
            
            {/* Right leg */}
            <mesh position={[-0.4, 0, 0]}>
              <cylinderGeometry args={[0.4, 0.3, 3, 16, segments, true]} />
              <meshStandardMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                roughness={material.roughness}
                metalness={material.metalness}
                wireframe={material.wireframe}
              />
            </mesh>
          </group>
        );
    }
  };
  
  return (
    <group ref={meshRef}>
      {createGarmentGeometry()}
    </group>
  );
}

// Main Pattern Viewer component
export function PatternViewer3D({ 
  pattern,
  color = '#3B82F6', 
  initialRotation = false,
  modelType = 'tshirt',
}: { 
  pattern?: PatternSummary;
  color?: string;
  initialRotation?: boolean; 
  modelType?: 'tshirt' | 'dress' | 'jacket' | 'pants';
}) {
  const [animationState, setAnimationState] = useState<AnimationState>({
    autoRotate: initialRotation,
    simulating: true,
    speed: 1,
  });
  
  const [material, setMaterial] = useState<MaterialProperties>({
    color: color,
    roughness: 0.7,
    metalness: 0.2,
    envMapIntensity: 1,
    bumpScale: 0.05,
    wireframe: false,
  });
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const toggleRotation = () => {
    setAnimationState({
      ...animationState,
      autoRotate: !animationState.autoRotate,
    });
  };
  
  const toggleSimulation = () => {
    setAnimationState({
      ...animationState,
      simulating: !animationState.simulating,
    });
  };
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  
  const setWireframe = (enabled: boolean) => {
    setMaterial({
      ...material,
      wireframe: enabled,
    });
  };
  
  useEffect(() => {
    // Update material color when color prop changes
    setMaterial(prev => ({
      ...prev,
      color,
    }));
  }, [color]);
  
  useEffect(() => {
    // Add fullscreenchange listener
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${isFullScreen ? 'w-screen h-screen' : 'w-full h-full'}`}
    >
      {/* Canvas for 3D rendering */}
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 40 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#f8f9fa']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.5} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.2} />
        <pointLight position={[0, 0, 5]} intensity={0.5} />
        
        {/* Garment model */}
        <GarmentModel 
          color={material.color} 
          animationState={animationState} 
          material={material}
          modelType={modelType}
        />
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={animationState.autoRotate}
          autoRotateSpeed={animationState.speed * 2}
        />
      </Canvas>
      
      {/* Control panel */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={toggleRotation}
          title={animationState.autoRotate ? "Stop Rotation" : "Start Rotation"}
        >
          <FiRotateCw className={`h-4 w-4 ${animationState.autoRotate ? 'text-blue-500' : 'text-gray-500'}`} />
        </Button>
        
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={toggleSimulation}
          title={animationState.simulating ? "Pause Simulation" : "Resume Simulation"}
        >
          {animationState.simulating ? (
            <FiPause className="h-4 w-4 text-blue-500" />
          ) : (
            <FiPlay className="h-4 w-4 text-gray-500" />
          )}
        </Button>
        
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => setWireframe(!material.wireframe)}
          title={material.wireframe ? "Hide Wireframe" : "Show Wireframe"}
        >
          <FiBox className={`h-4 w-4 ${material.wireframe ? 'text-blue-500' : 'text-gray-500'}`} />
        </Button>
        
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={toggleFullScreen}
          title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullScreen ? (
            <FiMinimize2 className="h-4 w-4" />
          ) : (
            <FiMaximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {/* Optional pattern name overlay */}
      {pattern && (
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-sm">
          {pattern.name}
        </div>
      )}
    </div>
  );
}