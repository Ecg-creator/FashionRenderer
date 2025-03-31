import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipProvider, 
  TooltipTrigger, 
  TooltipContent 
} from '@/components/ui/tooltip';
import { 
  FiMenu, 
  FiGrid, 
  FiDownload, 
  FiShare2, 
  FiPrinter
} from 'react-icons/fi';
import { useGarment } from '@/lib/stores/useGarment';

interface ToolbarProps {
  onTogglePanel: () => void;
}

const Toolbar: FC<ToolbarProps> = ({ onTogglePanel }) => {
  const { garments, selectGarment, selectedGarment } = useGarment();
  
  return (
    <div className="absolute top-4 left-4 flex flex-col space-y-2">
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onTogglePanel} 
                variant="ghost" 
                size="icon"
                className="rounded-full h-10 w-10 text-[#0047AB] hover:bg-[#0047AB] hover:text-white"
              >
                <FiMenu className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Panel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md space-y-2">
        <h3 className="text-xs font-medium px-2 py-1 text-[#2C3E50]">Garments</h3>
        
        {garments.map((garment) => (
          <Button
            key={garment.id}
            variant="ghost"
            className={`w-full justify-start text-sm ${
              selectedGarment?.id === garment.id 
                ? 'bg-[#0047AB] text-white' 
                : 'text-[#2C3E50] hover:bg-[#F8F9FA]'
            }`}
            onClick={() => selectGarment(garment.id)}
          >
            {garment.name}
          </Button>
        ))}
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md space-y-1">
        <ToolbarButton 
          icon={<FiGrid className="h-4 w-4" />} 
          label="Patterns" 
        />
        <ToolbarButton 
          icon={<FiDownload className="h-4 w-4" />} 
          label="Export" 
        />
        <ToolbarButton 
          icon={<FiShare2 className="h-4 w-4" />} 
          label="Share" 
        />
        <ToolbarButton 
          icon={<FiPrinter className="h-4 w-4" />} 
          label="Print" 
        />
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({ icon, label, onClick }) => (
  <Button
    variant="ghost"
    size="sm"
    className="w-full justify-start text-[#2C3E50] hover:bg-[#F8F9FA]"
    onClick={onClick}
  >
    <span className="mr-2">{icon}</span>
    <span className="text-xs">{label}</span>
  </Button>
);

export default Toolbar;
