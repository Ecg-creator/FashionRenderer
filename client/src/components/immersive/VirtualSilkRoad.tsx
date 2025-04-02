import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html, PerspectiveCamera, Box, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ShoppingBag, 
  FileText, 
  Layers, 
  Truck, 
  Scissors, 
  Users, 
  Box as BoxIcon, 
  ArrowUpRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

// Empire OS Brand Building
function BrandBuilding(props: any) {
  const { position = [0, 0, 0], onClick } = props;
  
  return (
    <group position={position} onClick={onClick}>
      <Box args={[3, 5, 3]} castShadow>
        <meshStandardMaterial color="#4361ee" />
      </Box>
      <Text
        position={[0, 3, 0]}
        fontSize={0.7}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        BRAND SHOWROOM
      </Text>
      <Html position={[0, 1, 2]}>
        <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none">
          Fashion Brands
        </Badge>
      </Html>
    </group>
  );
}

// Manufacturing Hub
function ManufacturingHub(props: any) {
  const { position = [8, 0, -5], onClick } = props;
  
  return (
    <group position={position} onClick={onClick}>
      <Box args={[4, 3, 5]} castShadow>
        <meshStandardMaterial color="#3a86ff" />
      </Box>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.7}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        MANUFACTURING HUB
      </Text>
      <Html position={[0, 1, 2]}>
        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-none">
          Production Facilities
        </Badge>
      </Html>
    </group>
  );
}

// Materials warehouse
function MaterialsWarehouse(props: any) {
  const { position = [-8, 0, -5], onClick } = props;
  
  return (
    <group position={position} onClick={onClick}>
      <Box args={[5, 2, 4]} castShadow>
        <meshStandardMaterial color="#fb8500" />
      </Box>
      <Text
        position={[0, 2, 0]}
        fontSize={0.7}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        MATERIALS LIBRARY
      </Text>
      <Html position={[0, 1, 2]}>
        <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-none">
          Fabric & Components
        </Badge>
      </Html>
    </group>
  );
}

// Logistics Hub
function LogisticsHub(props: any) {
  const { position = [0, 0, -10], onClick } = props;
  
  return (
    <group position={position} onClick={onClick}>
      <Box args={[4, 2, 3]} castShadow>
        <meshStandardMaterial color="#2a9d8f" />
      </Box>
      <Text
        position={[0, 2, 0]}
        fontSize={0.7}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        LOGISTICS HUB
      </Text>
      <Html position={[0, 1, 2]}>
        <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none">
          Sample & Delivery
        </Badge>
      </Html>
    </group>
  );
}

// Simple terrain
function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#8baa98" />
    </mesh>
  );
}

// Roads connecting buildings
function Roads() {
  return (
    <group position={[0, -0.48, 0]}>
      {/* Main road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[3, 30]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Cross roads */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <planeGeometry args={[3, 30]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Road markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[0.2, 30]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.01, 0]}>
        <planeGeometry args={[0.2, 30]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Information card for selected location
interface LocationInfoProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  primaryAction: string;
  secondaryAction?: string;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  licenseOptions?: Array<{name: string, price: string, features: string[]}>;
  position?: [number, number, number];
}

function LocationInfo({ 
  name, 
  description, 
  icon, 
  primaryAction,
  secondaryAction,
  onPrimaryAction,
  onSecondaryAction,
  licenseOptions,
  position = [0, 6, 0]
}: LocationInfoProps) {
  const [activeTab, setActiveTab] = useState<string>("info");
  
  return (
    <Html position={position} center>
      <Card className="w-[32rem] bg-white/90 backdrop-blur-sm shadow-xl border-blue-200 max-h-[28rem] overflow-y-auto">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <CardTitle className="text-xl">{name}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="licenses">License Options</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="info" className="mt-0">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="rounded-md bg-blue-50 p-3">
                  <h3 className="font-medium text-blue-900">Empire OS Integration</h3>
                  <p className="text-sm text-blue-700 mt-1">This node is fully integrated with the Empire OS license management system, with role-based access controls and real-time governance.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Key Features:</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Complete supply chain visibility with real-time tracking</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Smart contracts for transparent transactions and governance</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>HSN code integration for automated taxation compliance</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>API-driven integration with existing business systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="licenses" className="mt-0">
            <CardContent className="pt-4">
              <div className="space-y-4">
                {licenseOptions && licenseOptions.map((option, index) => (
                  <div key={index} className="rounded-md border border-blue-100 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-blue-900">{option.name}</h3>
                      <Badge variant="outline" className="bg-blue-50">{option.price}</Badge>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex gap-2 pt-2">
          <Button className="flex-1" onClick={onPrimaryAction}>
            {primaryAction} <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
          {secondaryAction && onSecondaryAction && (
            <Button variant="outline" className="flex-1" onClick={onSecondaryAction}>
              {secondaryAction}
            </Button>
          )}
        </CardFooter>
      </Card>
    </Html>
  );
}

export function VirtualSilkRoad() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const controlsRef = useRef<any>();
  
  const zoomToLocation = (position: [number, number, number]) => {
    if (controlsRef.current) {
      controlsRef.current.target.set(position[0], position[1], position[2]);
      controlsRef.current.update();
    }
  };
  
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setSelectedLocation(null);
  };
  
  const getLocationInfo = () => {
    switch (selectedLocation) {
      case 'brand':
        return {
          name: 'Brand Showroom',
          description: 'Immersive virtual showroom for brand collections, order placement, and customer experience',
          icon: <ShoppingBag className="h-5 w-5 text-blue-600" />,
          primaryAction: 'Enter Showroom',
          secondaryAction: 'Apply for License',
          onPrimaryAction: () => console.log('Entering brand showroom'),
          onSecondaryAction: () => console.log('Applying for brand license'),
          licenseOptions: [
            {
              name: 'Brand License',
              price: '₹45,000/month',
              features: [
                'Procurement & buying tools',
                'Model Builder for supply chain optimization',
                'Smart Contract integration for vendor management',
                'Retail distribution channels',
                'Commune Connect marketplace access'
              ]
            },
            {
              name: 'Retailer License',
              price: '₹25,000/month',
              features: [
                'Retail sales & distribution dashboard',
                'Last Smile logistics integration',
                'Commune Connect virtual mall',
                'Sales analytics & performance tracking',
                'Returns management system'
              ]
            }
          ],
          position: [0, 6, 0] as [number, number, number]
        };
        
      case 'manufacturing':
        return {
          name: 'Manufacturing Hub',
          description: 'Integrated production management platform with real-time tracking and quality control',
          icon: <BoxIcon className="h-5 w-5 text-blue-600" />,
          primaryAction: 'View Manufacturers',
          secondaryAction: 'Request Production',
          onPrimaryAction: () => console.log('Viewing manufacturers'),
          onSecondaryAction: () => console.log('Requesting production'),
          licenseOptions: [
            {
              name: 'Manufacturer FOB License',
              price: '₹50,000/month',
              features: [
                'Full MES dashboard access',
                'Vendor management tools',
                'Supply Chain Finance integration',
                'Logistics & packaging coordination',
                'Compliance & export documentation'
              ]
            },
            {
              name: 'Manufacturer CMP License',
              price: '₹30,000/month',
              features: [
                'MES for Cut, Make, Pack operations',
                'Raw material issuance control',
                'Vendor onboarding for contractors',
                'Compliance logs & reporting',
                'Optional financier access'
              ]
            },
            {
              name: 'White-Label Manufacturing',
              price: '₹40,000/month',
              features: [
                'Hybrid FOB/CMP features',
                'Private label module',
                'Custom packaging solutions',
                'Commune Connect retail portal',
                'Smart contract execution for payments'
              ]
            }
          ],
          position: [8, 6, -5] as [number, number, number]
        };
        
      case 'materials':
        return {
          name: 'Materials Library',
          description: 'Comprehensive database of fabrics, trims, and components with detailed HSN codes and specifications',
          icon: <Layers className="h-5 w-5 text-blue-600" />,
          primaryAction: 'Browse Materials',
          secondaryAction: 'Request Samples',
          onPrimaryAction: () => console.log('Browsing materials library'),
          onSecondaryAction: () => console.log('Requesting material samples'),
          licenseOptions: [
            {
              name: 'Supplier License',
              price: '₹20,000/month',
              features: [
                'Material catalog management',
                'Order management dashboard',
                'HSN code compliance tools',
                'Quality certification uploads',
                'Sustainability metrics tracking'
              ]
            }
          ],
          position: [-8, 6, -5] as [number, number, number]
        };
        
      case 'logistics':
        return {
          name: 'Logistics Hub',
          description: 'Integrated logistics platform for sample requests, deliveries, and last-mile tracking',
          icon: <Truck className="h-5 w-5 text-blue-600" />,
          primaryAction: 'Manage Logistics',
          secondaryAction: 'Track Shipments',
          onPrimaryAction: () => console.log('Managing logistics'),
          onSecondaryAction: () => console.log('Tracking shipments'),
          licenseOptions: [
            {
              name: 'Logistics Provider License',
              price: '₹15,000/month',
              features: [
                'Last-mile delivery management',
                'Route optimization',
                'Delivery confirmation system',
                'SLA tracking & monitoring',
                'Integration with Commune Connect'
              ]
            }
          ],
          position: [0, 6, -10] as [number, number, number]
        };
        
      default:
        return null;
    }
  };
  
  const locationInfo = getLocationInfo();
  
  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Virtual Silk Road</h2>
        <p className="text-sm text-gray-600 mb-3">Integrated woven supply chain ecosystem powered by Empire OS</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetCamera}>
            <RotateCcw className="h-4 w-4 mr-1" /> Reset View
          </Button>
          <Button variant="outline" size="sm" onClick={() => controlsRef.current?.zoomIn()}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => controlsRef.current?.zoomOut()}>
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 10, 20]} />
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <Suspense fallback={null}>
          <Terrain />
          <Roads />
          
          <BrandBuilding onClick={() => {
            setSelectedLocation('brand');
            zoomToLocation([0, 2, 0]);
          }} />
          
          <ManufacturingHub onClick={() => {
            setSelectedLocation('manufacturing');
            zoomToLocation([8, 2, -5]);
          }} />
          
          <MaterialsWarehouse onClick={() => {
            setSelectedLocation('materials');
            zoomToLocation([-8, 2, -5]);
          }} />
          
          <LogisticsHub onClick={() => {
            setSelectedLocation('logistics');
            zoomToLocation([0, 2, -10]);
          }} />
          
          {selectedLocation && locationInfo && (
            <LocationInfo {...locationInfo} />
          )}
          
          <OrbitControls 
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 right-4 z-10 flex flex-col space-y-2">
        <Button 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none"
          onClick={() => console.log('Enter dashboard')}
        >
          <FileText className="h-4 w-4 mr-2" /> Empire Dashboard
        </Button>
        <Button 
          variant="outline" 
          className="bg-white/80 backdrop-blur-sm"
          onClick={() => console.log('Enter BOM builder')}
        >
          <Scissors className="h-4 w-4 mr-2" /> BOM Builder
        </Button>
      </div>
    </div>
  );
}

export default VirtualSilkRoad;