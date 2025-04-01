import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patternDetails } from '../../data/patternData';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { PatternViewer3D } from './PatternViewer3D';
import { 
  FiSave, 
  FiShoppingCart, 
  FiShare2, 
  FiChevronLeft, 
  FiLayers, 
  FiSliders,
  FiMaximize,
  FiGrid,
  FiDroplet,
  FiRotateCw
} from 'react-icons/fi';

// Mock token ID generation based on pattern ID
const getTokenId = (id: string) => {
  const numId = parseInt(id.replace('pattern-', ''));
  return `PAT-${100 + numId}`;
};

export function PatternCustomizer() {
  const { patternId } = useParams<{ patternId: string }>();
  const navigate = useNavigate();
  const [pattern, setPattern] = useState(patternDetails.find(p => p.id === patternId));
  const [customizedPattern, setCustomizedPattern] = useState(pattern);
  const [activeView, setActiveView] = useState<'2d' | '3d'>('3d');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedMaterial, setSelectedMaterial] = useState(
    pattern?.recommendedMaterials[0].type || ''
  );
  const [customMeasurements, setCustomMeasurements] = useState<Record<string, number>>({});
  const [colorScheme, setColorScheme] = useState('default');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Color schemes for pattern visualization
  const colorSchemes = {
    default: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
    monochrome: { primary: '#4B5563', secondary: '#1F2937', accent: '#E5E7EB' },
    vibrant: { primary: '#EC4899', secondary: '#9D174D', accent: '#FCE7F3' },
    earth: { primary: '#92400E', secondary: '#78350F', accent: '#FEF3C7' },
    cool: { primary: '#0EA5E9', secondary: '#0369A1', accent: '#E0F2FE' },
  };

  // Size chart with measurements
  const sizeChart = {
    'XS': { chest: 86, waist: 70, hip: 94, length: 66 },
    'S': { chest: 90, waist: 74, hip: 98, length: 68 },
    'M': { chest: 96, waist: 80, hip: 104, length: 70 },
    'L': { chest: 102, waist: 86, hip: 110, length: 72 },
    'XL': { chest: 110, waist: 94, hip: 118, length: 74 },
    'XXL': { chest: 118, waist: 102, hip: 126, length: 76 },
  };

  // Initialize custom measurements based on selected size
  useEffect(() => {
    if (pattern && selectedSize) {
      // @ts-ignore - we know the selectedSize is a key of sizeChart
      const baseMeasurements = sizeChart[selectedSize];
      setCustomMeasurements(baseMeasurements);
    }
  }, [pattern, selectedSize]);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    // @ts-ignore - we know the size is a key of sizeChart
    setCustomMeasurements(sizeChart[size]);
    setHasUnsavedChanges(true);
  };

  const handleMeasurementChange = (measurement: string, value: number) => {
    setCustomMeasurements({
      ...customMeasurements,
      [measurement]: value
    });
    setHasUnsavedChanges(true);
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    setHasUnsavedChanges(true);
  };

  const handleColorSchemeChange = (scheme: string) => {
    // @ts-ignore - we know the scheme is a key of colorSchemes
    setColorScheme(scheme);
    setHasUnsavedChanges(true);
  };

  const handleSaveCustomization = () => {
    // Here we would normally save to a database
    // For now, just update the local state and mark as saved
    setCustomizedPattern({
      ...pattern!,
      measurements: {
        ...pattern!.measurements,
        size: selectedSize,
      },
      recommendedMaterials: [
        {
          ...pattern!.recommendedMaterials[0],
          type: selectedMaterial,
        },
        ...pattern!.recommendedMaterials.slice(1),
      ]
    });
    setHasUnsavedChanges(false);
    alert('Customization saved successfully!');
  };

  const handlePurchase = () => {
    // Save customization before purchase
    handleSaveCustomization();
    // Redirect to checkout
    navigate('/checkout');
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to go back?');
      if (!confirm) return;
    }
    navigate('/patterns');
  };

  if (!pattern) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-red-800">Pattern Not Found</h1>
          <p className="mt-2 text-red-600">
            The pattern you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate('/patterns')}
            className="mt-4"
          >
            Back to Patterns
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header with back button and pattern details */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mr-4"
          >
            <FiChevronLeft className="mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{pattern.name}</h1>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="mr-2">Token #{getTokenId(pattern.id)}</Badge>
              <Badge variant="secondary" className="mr-2">{pattern.skillLevel}</Badge>
              <span className="text-sm text-gray-500">
                {pattern.pieces.length} pieces
              </span>
            </div>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => alert('Pattern shared!')}
            className="flex items-center"
          >
            <FiShare2 className="mr-1 h-4 w-4" />
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled={!hasUnsavedChanges}
            onClick={handleSaveCustomization}
            className="flex items-center"
          >
            <FiSave className="mr-1 h-4 w-4" />
            Save
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handlePurchase}
            className="flex items-center"
          >
            <FiShoppingCart className="mr-1 h-4 w-4" />
            Purchase
          </Button>
        </div>
      </div>

      {/* Main content with 3D viewer and customization panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel - 3D/2D viewer */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden h-[560px]">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex space-x-2">
              <Button 
                variant={activeView === '3d' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setActiveView('3d')}
                className="flex items-center"
              >
                <FiGrid className="mr-1 h-4 w-4" />
                3D View
              </Button>
              <Button 
                variant={activeView === '2d' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setActiveView('2d')}
                className="flex items-center"
              >
                <FiLayers className="mr-1 h-4 w-4" />
                2D Pattern
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => alert('Fullscreen mode')}
                className="flex items-center"
              >
                <FiMaximize className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => alert('Rotate view')}
                className="flex items-center"
              >
                <FiRotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Pattern Viewer with 3D and 2D options */}
          <div className="h-full bg-gray-50">
            {activeView === '3d' ? (
              <div className="w-full h-full">
                {/* Import and use the 3D Viewer component */}
                <PatternViewer3D 
                  pattern={pattern}
                  color={colorSchemes[colorScheme as keyof typeof colorSchemes].primary}
                  initialRotation={true}
                  // Choose model type based on pattern type if available
                  modelType={
                    pattern.name.toLowerCase().includes('jacket') ? 'jacket' : 
                    pattern.name.toLowerCase().includes('dress') ? 'dress' : 
                    pattern.name.toLowerCase().includes('pants') || pattern.name.toLowerCase().includes('trouser') ? 'pants' : 
                    'tshirt'
                  }
                />
                
                {/* Overlay information about the pattern */}
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg text-sm pointer-events-none">
                  <p className="font-medium">{pattern.name}</p>
                  <p className="text-xs text-gray-600">
                    Size: {selectedSize} | Material: {selectedMaterial}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white border border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">2D Pattern View</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    * 2D pattern pieces with measurements would display here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel - Customization options */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Tabs defaultValue="size">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="size">Size</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
              <TabsTrigger value="material">Material</TabsTrigger>
              <TabsTrigger value="visual">Visual</TabsTrigger>
            </TabsList>
            
            {/* Size Tab */}
            <TabsContent value="size" className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(sizeChart).map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleSizeChange(size)}
                      className="justify-center"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Size Information</h3>
                <div className="bg-gray-50 p-3 rounded-md text-xs">
                  <p>Our sizes are based on standard measurements. For the best fit, please check the detailed measurements in the next tab and adjust as needed.</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Recommended For</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
                  <p className="text-sm text-blue-800">
                    This pattern is designed for {pattern.skillLevel} skill level and works best with {selectedMaterial} fabric.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Measurements Tab */}
            <TabsContent value="measurements" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Custom Measurements</h3>
                  <span className="text-xs text-gray-500">Based on size {selectedSize}</span>
                </div>
                
                {Object.entries(customMeasurements).map(([measurement, value]) => (
                  <div key={measurement} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-600 capitalize">
                        {measurement} (cm)
                      </label>
                      <Input
                        type="number"
                        min={value - 10}
                        max={value + 10}
                        value={value}
                        onChange={(e) => handleMeasurementChange(measurement, Number(e.target.value))}
                        className="w-20 text-right"
                      />
                    </div>
                    <Slider
                      value={[value]}
                      min={value - 10}
                      max={value + 10}
                      step={0.5}
                      onValueChange={(values) => handleMeasurementChange(measurement, values[0])}
                    />
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button 
                    onClick={() => {
                      // @ts-ignore - we know the selectedSize is a key of sizeChart
                      setCustomMeasurements(sizeChart[selectedSize]);
                      alert('Measurements reset to default for size ' + selectedSize);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Reset to Default
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Material Tab */}
            <TabsContent value="material" className="p-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Recommended Materials</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {pattern.recommendedMaterials.map((material, index) => (
                    <div
                      key={index}
                      className={`border p-3 rounded-md cursor-pointer ${
                        selectedMaterial === material.type 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleMaterialChange(material.type)}
                    >
                      <p className="font-medium text-sm">{material.type}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Weight: {material.weight}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stretch: {material.stretch}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Material Properties</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Weight (g/m²)</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        defaultValue="medium"
                      >
                        <option value="light">Light (100-150)</option>
                        <option value="medium">Medium (150-250)</option>
                        <option value="heavy">Heavy (250+)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Stretch</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        defaultValue="moderate"
                      >
                        <option value="none">None</option>
                        <option value="slight">Slight</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Visual Tab */}
            <TabsContent value="visual" className="p-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Color Scheme</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(colorSchemes).map(([scheme, colors]) => (
                    <div
                      key={scheme}
                      className={`border p-3 rounded-md cursor-pointer ${
                        colorScheme === scheme 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleColorSchemeChange(scheme)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm capitalize">{scheme}</span>
                        {colorScheme === scheme && (
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <div 
                          className="w-8 h-8 rounded-full" 
                          style={{ backgroundColor: colors.primary }}
                        ></div>
                        <div 
                          className="w-8 h-8 rounded-full" 
                          style={{ backgroundColor: colors.secondary }}
                        ></div>
                        <div 
                          className="w-8 h-8 rounded-full" 
                          style={{ backgroundColor: colors.accent }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Texture Options</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border border-gray-200 rounded-md p-2 hover:border-gray-300 cursor-pointer">
                      <div className="h-16 bg-gray-100 rounded-md mb-1"></div>
                      <p className="text-xs text-center">Smooth</p>
                    </div>
                    <div className="border border-gray-200 rounded-md p-2 hover:border-gray-300 cursor-pointer">
                      <div className="h-16 bg-gray-100 rounded-md mb-1 
                                    bg-[repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0_10px,#f8f8f8_10px,#f8f8f8_20px)]"></div>
                      <p className="text-xs text-center">Striped</p>
                    </div>
                    <div className="border border-gray-200 rounded-md p-2 hover:border-gray-300 cursor-pointer">
                      <div className="h-16 bg-gray-100 rounded-md mb-1 
                                    bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] bg-[length:6px_6px]"></div>
                      <p className="text-xs text-center">Dotted</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Pattern Information */}
          <div className="p-4 mt-2 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Pattern Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Skill Level:</span>
                <span className="font-medium">{pattern.skillLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pieces:</span>
                <span className="font-medium">{pattern.pieces.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium capitalize">{pattern.primaryCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Token ID:</span>
                <span className="font-medium">#{getTokenId(pattern.id)}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button 
                onClick={handlePurchase}
                className="w-full"
              >
                <FiShoppingCart className="mr-2 h-4 w-4" />
                Purchase Pattern ($19.99)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}