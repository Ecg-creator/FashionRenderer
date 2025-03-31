import { useState } from 'react';
import { useGarment } from '@/lib/stores/useGarment';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { FiDroplet, FiLayers } from 'react-icons/fi';

const ColorVariationPanel = () => {
  const { selectedGarment, updateGarmentColor, updateGarmentTexture } = useGarment();
  const [selectedColor, setSelectedColor] = useState('#0047AB');
  
  if (!selectedGarment) {
    return (
      <div className="p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4 text-[#0047AB]">Customization</h2>
        <p className="text-muted-foreground">Select a garment to customize</p>
      </div>
    );
  }
  
  const colorOptions = [
    { name: 'Blue', value: '#0047AB' },
    { name: 'Pink', value: '#FF4081' },
    { name: 'Black', value: '#2C3E50' },
    { name: 'White', value: '#F8F9FA' },
    { name: 'Red', value: '#E53935' },
    { name: 'Green', value: '#43A047' },
  ];
  
  const textureOptions = [
    { name: 'Plain', value: 'none' },
    { name: 'Wood', value: 'wood.jpg' },
    { name: 'Asphalt', value: 'asphalt.png' },
  ];
  
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateGarmentColor(color);
  };
  
  const handleTextureChange = (texture: string) => {
    updateGarmentTexture(texture);
  };
  
  return (
    <div className="p-4 mt-4 border-t border-gray-200">
      <div className="flex items-center mb-4">
        <FiDroplet className="mr-2 h-5 w-5 text-[#0047AB]" />
        <h2 className="text-xl font-semibold text-[#0047AB]">Customization</h2>
      </div>
      
      <Separator className="mb-4" />
      
      <div className="space-y-4">
        <Card className="p-4 shadow-sm">
          <h3 className="font-medium mb-3">Color Variations</h3>
          <div className="grid grid-cols-3 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                className="flex flex-col items-center"
                onClick={() => handleColorChange(color.value)}
              >
                <div 
                  className="w-8 h-8 rounded-full border-2 transition-all mb-1"
                  style={{ 
                    backgroundColor: color.value,
                    borderColor: selectedColor === color.value ? '#FF4081' : 'transparent'
                  }}
                />
                <span className="text-xs">{color.name}</span>
              </button>
            ))}
          </div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <FiLayers className="mr-2 h-4 w-4" />
            <h3 className="font-medium">Fabric Textures</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {textureOptions.map((texture) => (
              <button
                key={texture.value}
                className="p-1 border rounded hover:bg-gray-100 transition"
                onClick={() => handleTextureChange(texture.value)}
              >
                <div className="aspect-square bg-gray-200 mb-1 rounded overflow-hidden">
                  {texture.value !== 'none' && (
                    <img 
                      src={`/textures/${texture.value}`} 
                      alt={texture.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span className="text-xs block text-center">{texture.name}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ColorVariationPanel;
