import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGarment } from '@/lib/stores/useGarment';
import { useTexture } from '@react-three/drei';

const GarmentModel = () => {
  const { selectedGarment, selectedColor, selectedTexture } = useGarment();
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a simple garment model if no specific model is available
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load texture based on selection
  let texture;
  try {
    if (selectedTexture && selectedTexture !== 'none') {
      texture = useTexture(`/textures/${selectedTexture}`);
      if (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
      }
    }
  } catch (error) {
    console.warn("Failed to load texture:", error);
    texture = null;
  }
  
  useEffect(() => {
    if (meshRef.current) {
      // Apply color to the material
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.color.set(selectedColor);
      }
    }
  }, [selectedColor]);
  
  useFrame((state, delta) => {
    // Gentle floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });
  
  if (!selectedGarment) {
    return null;
  }
  
  // Create a simple garment model based on type
  let modelGeometry;
  
  switch (selectedGarment.type) {
    case 'tshirt':
      modelGeometry = (
        <group>
          {/* Torso */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.4, 1, 16]} />
            <meshStandardMaterial 
              ref={meshRef}
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Left sleeve */}
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
            <meshStandardMaterial 
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Right sleeve */}
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
            <meshStandardMaterial 
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Neck */}
          <mesh position={[0, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            <meshStandardMaterial 
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
        </group>
      );
      break;
      
    case 'dress':
      modelGeometry = (
        <group>
          {/* Upper part */}
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.5, 0.8, 16]} />
            <meshStandardMaterial 
              ref={meshRef}
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Lower part - skirt */}
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.8, 1, 16]} />
            <meshStandardMaterial 
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Neck */}
          <mesh position={[0, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            <meshStandardMaterial 
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
        </group>
      );
      break;
      
    case 'jacket':
      modelGeometry = (
        <group>
          {/* Torso */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.55, 0.45, 1, 16]} />
            <meshStandardMaterial 
              ref={meshRef}
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Left sleeve */}
          <mesh position={[-0.55, 0, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.6, 16]} />
            <meshStandardMaterial 
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Right sleeve */}
          <mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.6, 16]} />
            <meshStandardMaterial 
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Collar */}
          <mesh position={[0, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.25, 0.15, 16]} />
            <meshStandardMaterial 
              color={selectedColor} 
              roughness={0.7} 
              metalness={0.1}
              map={texture || undefined}
            />
          </mesh>
          
          {/* Front opening */}
          <mesh position={[0, 0.1, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <planeGeometry args={[0.2, 0.8]} />
            <meshStandardMaterial 
              color="#000000" 
              roughness={0.9} 
              metalness={0.1}
            />
          </mesh>
        </group>
      );
      break;
      
    default:
      modelGeometry = (
        <mesh ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={selectedColor} 
            roughness={0.7} 
            metalness={0.1}
            map={texture || undefined}
          />
        </mesh>
      );
  }
  
  return (
    <group ref={groupRef}>
      {modelGeometry}
      
      {/* Label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.1}
        color="#2C3E50"
        anchorX="center"
        anchorY="middle"
      >
        {selectedGarment.name}
      </Text>
      
      {/* Measurement points - simplified */}
      <group>
        {/* Chest measurement line */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.01, 0.01]} />
          <meshBasicMaterial color="#FF4081" />
        </mesh>
        
        {/* Length measurement line */}
        <mesh position={[0, -0.5, 0.5]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1, 0.01, 0.01]} />
          <meshBasicMaterial color="#FF4081" />
        </mesh>
      </group>
    </group>
  );
};

export default GarmentModel;
