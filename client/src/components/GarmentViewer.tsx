import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGarment } from '@/lib/stores/useGarment';
import GarmentModel from './GarmentModel';
import Controls, { useControlsStore } from './Controls';

// This component is within Canvas context and can access R3F hooks safely
const OrbitControlsSetup = () => {
  const controlsRef = useRef<any>(null);
  const { selectedGarment } = useGarment();
  const { setOrbitControls } = useControlsStore();
  
  useEffect(() => {
    if (controlsRef.current) {
      // Store the controls reference in our zustand store
      setOrbitControls(controlsRef.current);
      
      // Reset camera position when garment changes
      controlsRef.current.reset();
    }
  }, [selectedGarment?.id, setOrbitControls]);
  
  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={false}
      minDistance={2}
      maxDistance={10}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 1.5}
      makeDefault
    />
  );
};

const GarmentViewer = () => {
  const { setInitialized } = useGarment();

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#F8F9FA] to-white">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#F8F9FA']} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <directionalLight position={[0, -5, 0]} intensity={0.1} />
        
        <Environment preset="city" />
        
        <OrbitControlsSetup />
        
        <Suspense fallback={null}>
          <group position={[0, -1, 0]} onUpdate={() => setInitialized(true)}>
            <GarmentModel />
            
            {/* Measurement helper - a grid to show scale */}
            <gridHelper 
              args={[10, 10, '#0047AB', '#CCCCCC']} 
              position={[0, -0.01, 0]} 
              rotation={[0, 0, 0]}
            />
            
            {/* Coordinate axes for reference */}
            <axesHelper args={[1]} />
          </group>
        </Suspense>
      </Canvas>
      
      <Controls />
    </div>
  );
};

export default GarmentViewer;
