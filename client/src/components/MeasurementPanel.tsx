import { FC } from 'react';
import { Garment } from '@/types/garment';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FiMaximize2, FiMinimize2, FiTool } from 'react-icons/fi';

interface MeasurementPanelProps {
  garment?: Garment;
}

const MeasurementPanel: FC<MeasurementPanelProps> = ({ garment }) => {
  if (!garment) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-[#0047AB]">Measurements</h2>
        <p className="text-muted-foreground">Select a garment to view measurements</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <FiTool className="mr-2 h-5 w-5 text-[#0047AB]" />
        <h2 className="text-xl font-semibold text-[#0047AB]">Measurements</h2>
      </div>
      
      <Separator className="mb-4" />
      
      <div className="space-y-4">
        <Card className="p-4 shadow-sm">
          <h3 className="font-medium mb-2 flex items-center">
            <FiMaximize2 className="mr-2 h-4 w-4" />
            Size
          </h3>
          <p className="text-lg font-bold">{garment.measurements.size}</p>
        </Card>
        
        <div className="grid grid-cols-2 gap-3">
          <MeasurementItem 
            label="Chest" 
            value={`${garment.measurements.chest} cm`} 
          />
          <MeasurementItem 
            label="Waist" 
            value={`${garment.measurements.waist} cm`} 
          />
          <MeasurementItem 
            label="Hip" 
            value={`${garment.measurements.hip} cm`} 
          />
          <MeasurementItem 
            label="Length" 
            value={`${garment.measurements.length} cm`} 
          />
          <MeasurementItem 
            label="Shoulder" 
            value={`${garment.measurements.shoulder} cm`} 
          />
          <MeasurementItem 
            label="Sleeve" 
            value={`${garment.measurements.sleeve} cm`} 
          />
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Pattern Measurements</h3>
          <div className="p-3 bg-white rounded border border-gray-200">
            <div className="aspect-video bg-gray-100 flex items-center justify-center mb-2">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                {/* Simple pattern visualization */}
                <path 
                  d="M 50,20 L 150,20 L 150,80 L 50,80 Z" 
                  fill="none" 
                  stroke="#0047AB" 
                  strokeWidth="1"
                />
                <path 
                  d="M 50,20 C 80,10 120,10 150,20" 
                  fill="none" 
                  stroke="#0047AB" 
                  strokeWidth="1" 
                  strokeDasharray="3,2"
                />
                <path 
                  d="M 100,20 L 100,80" 
                  fill="none" 
                  stroke="#0047AB" 
                  strokeWidth="1" 
                  strokeDasharray="3,2"
                />
                <text x="90" y="15" fontSize="5" fill="#2C3E50">Front</text>
                <text x="100" y="50" fontSize="4" fill="#FF4081">{garment.measurements.chest} cm</text>
                <text x="160" y="50" fontSize="4" fill="#FF4081">{garment.measurements.length} cm</text>
              </svg>
            </div>
            <p className="text-xs text-gray-500">Pattern schematic with key measurements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MeasurementItemProps {
  label: string;
  value: string;
}

const MeasurementItem: FC<MeasurementItemProps> = ({ label, value }) => (
  <div className="bg-white p-2 rounded border border-gray-200">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default MeasurementPanel;
