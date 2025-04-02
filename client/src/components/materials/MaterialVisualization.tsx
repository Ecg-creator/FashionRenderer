import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";
import { MaterialType } from "../../types/material";
import * as THREE from 'three';
import { 
  Fullscreen, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sun, 
  Moon, 
  Palette, 
  Shirt, 
  Scissors, 
  Minimize 
} from "lucide-react";

interface MaterialVisualizationProps {
  material: MaterialType;
}

// Simple shirt model component
function ShirtModel({ material, color = "#ffffff" }: { material: MaterialType, color?: string }) {
  const { scene } = useGLTF('/models/shirt.glb');
  const modelRef = useRef<THREE.Group>();
  
  // Apply material texture or color to the model
  React.useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color.set(color);
          // If material has texture, apply it
          if (material.textureUrl) {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(material.textureUrl, (texture) => {
              child.material.map = texture;
              child.material.needsUpdate = true;
            });
          }
        }
      });
    }
  }, [material, color]);
  
  return (
    <primitive 
      ref={modelRef} 
      object={scene.clone()} 
      scale={[1.5, 1.5, 1.5]} 
      position={[0, -1, 0]} 
      rotation={[0, 0, 0]}
    />
  );
}

// Simple flat material sample
function FlatMaterialSample({ material, color = "#ffffff" }: { material: MaterialType, color?: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[3, 2]} />
      <meshStandardMaterial 
        color={color} 
        map={material.textureUrl ? new THREE.TextureLoader().load(material.textureUrl) : undefined}
        roughness={0.7}
      />
    </mesh>
  );
}

// Button component
function ButtonModel({ material }: { material: MaterialType }) {
  const { scene } = useGLTF('/models/button.glb');
  const modelRef = useRef<THREE.Group>();
  
  // Apply material colors or textures
  React.useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color.set(material.color || "#8B4513");
        }
      });
    }
  }, [material]);
  
  return (
    <primitive 
      ref={modelRef} 
      object={scene.clone()} 
      scale={[0.5, 0.5, 0.5]} 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]}
    />
  );
}

// Draped fabric model
function DrapedFabric({ material, color = "#ffffff" }: { material: MaterialType, color?: string }) {
  const { scene } = useGLTF('/models/draped_fabric.glb');
  const modelRef = useRef<THREE.Group>();
  
  // Apply material texture or color to the model
  React.useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color.set(color);
          // If material has texture, apply it
          if (material.textureUrl) {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(material.textureUrl, (texture) => {
              child.material.map = texture;
              child.material.needsUpdate = true;
            });
          }
        }
      });
    }
  }, [material, color]);
  
  return (
    <primitive 
      ref={modelRef} 
      object={scene.clone()} 
      scale={[2, 2, 2]} 
      position={[0, -1, 0]} 
      rotation={[0, 0, 0]}
    />
  );
}

// Scene renderer
function SceneRenderer({ 
  material, 
  displayMode, 
  color, 
  lightIntensity
}: { 
  material: MaterialType;
  displayMode: string;
  color: string;
  lightIntensity: number;
}) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <ambientLight intensity={lightIntensity * 0.5} />
          <pointLight position={[10, 10, 10]} intensity={lightIntensity} />
          
          {displayMode === "flat" && (
            <FlatMaterialSample material={material} color={color} />
          )}
          
          {displayMode === "draped" && (
            <DrapedFabric material={material} color={color} />
          )}
          
          {displayMode === "garment" && (
            <ShirtModel material={material} color={color} />
          )}
          
          {displayMode === "button" && (
            <ButtonModel material={material} />
          )}
          
          <Environment preset="studio" />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function MaterialVisualization({ material }: MaterialVisualizationProps) {
  const [displayMode, setDisplayMode] = useState("flat");
  const [color, setColor] = useState(material.color || "#ffffff");
  const [lightIntensity, setLightIntensity] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };
  
  const predefinedColors = [
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "Navy", value: "#000080" },
    { name: "Red", value: "#ff0000" },
    { name: "Green", value: "#008000" },
    { name: "Blue", value: "#0000ff" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Purple", value: "#800080" },
    { name: "Gray", value: "#808080" },
    { name: "Brown", value: "#8B4513" },
  ];
  
  return (
    <div ref={containerRef} className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div>
            <span className="text-sm text-gray-600 block mb-1">Display Mode</span>
            <Select value={displayMode} onValueChange={setDisplayMode}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select display mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat Sample</SelectItem>
                <SelectItem value="draped">Draped Fabric</SelectItem>
                <SelectItem value="garment">On Garment</SelectItem>
                {material.category === "buttons" && (
                  <SelectItem value="button">Button View</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <span className="text-sm text-gray-600 block mb-1">Color Variation</span>
            <div className="flex flex-wrap gap-1 max-w-xs">
              {predefinedColors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  className={`w-6 h-6 rounded-full border ${
                    color === colorOption.value ? 'ring-2 ring-blue-500 ring-offset-2' : 'ring-1 ring-gray-300'
                  }`}
                  style={{ backgroundColor: colorOption.value }}
                  onClick={() => setColor(colorOption.value)}
                  title={colorOption.name}
                />
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <span className="text-sm text-gray-600 block mb-1">Lighting</span>
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-gray-500" />
              <Slider
                value={[lightIntensity]}
                min={0.2}
                max={2}
                step={0.1}
                onValueChange={(value) => setLightIntensity(value[0])}
                className="w-full"
              />
              <Sun className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative flex-1 min-h-[400px]">
        <SceneRenderer 
          material={material} 
          displayMode={displayMode}
          color={color}
          lightIntensity={lightIntensity}
        />
        
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button variant="secondary" size="sm" onClick={toggleFullscreen}>
            {fullscreen ? (
              <Minimize className="h-4 w-4 mr-1" />
            ) : (
              <Fullscreen className="h-4 w-4 mr-1" />
            )}
            {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <Tabs defaultValue="visualize">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="visualize">
              <Palette className="h-4 w-4 mr-1" />
              Visualize
            </TabsTrigger>
            <TabsTrigger value="applications">
              <Shirt className="h-4 w-4 mr-1" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="details">
              <Scissors className="h-4 w-4 mr-1" />
              Sewing Details
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="visualize" className="pt-4">
            <p className="text-sm text-gray-700">
              Use the controls above to adjust the visualization. You can change the display mode, 
              color variations, and lighting to see how this material would appear in different contexts.
            </p>
          </TabsContent>
          
          <TabsContent value="applications" className="pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Recommended Applications</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {material.recommendedApplications?.map((app, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                  {app}
                </div>
              )) || (
                <>
                  <div className="bg-gray-50 p-2 rounded text-sm">Shirts</div>
                  <div className="bg-gray-50 p-2 rounded text-sm">Dresses</div>
                  <div className="bg-gray-50 p-2 rounded text-sm">Casual Wear</div>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Sewing Recommendations</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              {material.sewingDetails?.map((detail, index) => (
                <li key={index}>{detail}</li>
              )) || (
                <>
                  <li>Use a standard needle size appropriate for fabric weight</li>
                  <li>Standard seam allowance of 1.5cm recommended</li>
                  <li>Press seams open for best results</li>
                </>
              )}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}