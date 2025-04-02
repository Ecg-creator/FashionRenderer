import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  KeyboardControls, 
  useKeyboardControls, 
  useGLTF, 
  Sky, 
  Grid, 
  Loader 
} from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

// Define controls enum
enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

// Player component
function Player() {
  const playerRef = useRef<THREE.Group>(null);
  const [, getKeys] = useKeyboardControls<Controls>();
  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 0.5, 0));
  const [playerRotation, setPlayerRotation] = useState(0);
  const speed = 0.15;
  const rotationSpeed = 0.1;

  useFrame(() => {
    if (!playerRef.current) return;

    const keys = getKeys();
    const moveVector = new THREE.Vector3(0, 0, 0);

    if (keys.forward) {
      moveVector.z -= speed;
    }
    if (keys.back) {
      moveVector.z += speed;
    }
    if (keys.left) {
      setPlayerRotation(playerRotation - rotationSpeed);
    }
    if (keys.right) {
      setPlayerRotation(playerRotation + rotationSpeed);
    }

    // Apply rotation to movement vector
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(playerRotation);
    moveVector.applyMatrix4(rotationMatrix);

    // Update position
    setPlayerPosition(prev => new THREE.Vector3(
      prev.x + moveVector.x,
      prev.y + moveVector.y,
      prev.z + moveVector.z
    ));

    // Update player ref position and rotation
    playerRef.current.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
    playerRef.current.rotation.y = playerRotation;

    // Log movement for debugging
    if (keys.forward || keys.back || keys.left || keys.right) {
      console.log('Player moving:', { 
        position: playerPosition,
        rotation: playerRotation,
        controls: keys
      });
    }
  });

  return (
    <group ref={playerRef} position={[playerPosition.x, playerPosition.y, playerPosition.z]}>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
    </group>
  );
}

// Terrain component
function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#8BC34A" />
    </mesh>
  );
}

// Enemy component
function Enemy({ position }: { position: [number, number, number] }) {
  return (
    <mesh castShadow position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e74c3c" />
    </mesh>
  );
}

// Camera that follows the player
function FollowCamera({ target }: { target: THREE.Vector3 }) {
  const { camera } = useThree();
  
  useFrame(() => {
    // Position camera above and behind the player
    camera.position.x = target.x - 5;
    camera.position.y = target.y + 5;
    camera.position.z = target.z + 5;
    camera.lookAt(target);
  });
  
  return null;
}

// Game wrapper component
export function GameShowcase() {
  const [playerPosition] = useState(new THREE.Vector3(0, 0.5, 0));
  const keyboardMap = [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ];

  useEffect(() => {
    console.log('Game showcase mounted. Use WASD or arrow keys to move.');
  }, []);

  return (
    <div className="w-full h-[500px] bg-slate-900 rounded-lg shadow-lg">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <Sky />
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize={[2048, 2048]} 
            />
            <Terrain />
            <Player />
            <Enemy position={[5, 0.5, 5]} />
            <Enemy position={[-5, 0.5, -5]} />
            <Enemy position={[5, 0.5, -5]} />
            <FollowCamera target={playerPosition} />
            <Grid infiniteGrid fadeDistance={50} fadeStrength={5} />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <Loader />
      <div className="absolute bottom-4 left-4 bg-black/70 text-white p-2 rounded">
        <p className="text-sm">WASD or Arrow Keys to move</p>
      </div>
    </div>
  );
}

// Export a showcase with UI
export function GameShowcaseWithUI() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">3D Garment Game Environment</h2>
        <p className="text-gray-600">
          Explore our experimental 3D environment for virtual garment try-on and interaction
        </p>
      </div>
      <GameShowcase />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-lg mb-2">Interactive Environment</h3>
          <p className="text-gray-700 text-sm">
            Move your character around the environment to test how garments would interact with
            different surfaces and conditions
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-lg mb-2">Physics Simulation</h3>
          <p className="text-gray-700 text-sm">
            Our 3D engine simulates realistic physics, allowing designers to see how their
            garments might respond to movement and environmental factors
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-lg mb-2">Immersive Testing</h3>
          <p className="text-gray-700 text-sm">
            Test your garment designs in different virtual situations before moving to physical
            production, saving time and resources
          </p>
        </div>
      </div>
    </div>
  );
}