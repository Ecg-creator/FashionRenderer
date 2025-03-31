import { FC } from 'react';
import { Garment } from '@/types/garment';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FiInfo, FiTag, FiFileText } from 'react-icons/fi';

interface SpecificationPanelProps {
  garment?: Garment;
}

const SpecificationPanel: FC<SpecificationPanelProps> = ({ garment }) => {
  if (!garment) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-[#0047AB]">Specifications</h2>
        <p className="text-muted-foreground">Select a garment to view specifications</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <FiInfo className="mr-2 h-5 w-5 text-[#0047AB]" />
        <h2 className="text-xl font-semibold text-[#0047AB]">Specifications</h2>
      </div>
      
      <Separator className="mb-4" />
      
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-1">{garment.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Design ID: {garment.id}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {garment.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-[#F8F9FA] text-[#0047AB]">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm">{garment.description}</p>
      </div>
      
      <div className="space-y-4">
        <SpecSection 
          title="Material"
          icon={<FiTag className="mr-2 h-4 w-4" />} 
        >
          <div>
            <p className="mb-1">
              <span className="font-medium">Composition:</span> {garment.material.composition}
            </p>
            <p className="mb-1">
              <span className="font-medium">Weight:</span> {garment.material.weight} g/m²
            </p>
            <p className="mb-1">
              <span className="font-medium">Stretch:</span> {garment.material.stretch}
            </p>
          </div>
        </SpecSection>
        
        <SpecSection 
          title="Construction" 
          icon={<FiFileText className="mr-2 h-4 w-4" />}
        >
          <div>
            {garment.construction.map((item, index) => (
              <p key={index} className="mb-1 text-sm">
                • {item}
              </p>
            ))}
          </div>
        </SpecSection>
        
        <SpecSection 
          title="Care Instructions"
          icon={<FiInfo className="mr-2 h-4 w-4" />} 
        >
          <div className="text-sm">
            {garment.careInstructions.map((instruction, index) => (
              <p key={index} className="mb-1">
                • {instruction}
              </p>
            ))}
          </div>
        </SpecSection>
      </div>
    </div>
  );
};

interface SpecSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const SpecSection: FC<SpecSectionProps> = ({ title, children, icon }) => (
  <Card className="p-4 shadow-sm">
    <h3 className="font-medium mb-3 flex items-center text-[#2C3E50]">
      {icon}
      {title}
    </h3>
    {children}
  </Card>
);

export default SpecificationPanel;
