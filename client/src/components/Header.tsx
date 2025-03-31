import { FiShoppingBag, FiUser, FiSearch, FiHelpCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="font-bold text-xl text-[#0047AB] mr-4 flex items-center">
          <FiShoppingBag className="mr-2" />
          <span>Garment3D</span>
        </div>
        
        <nav className="hidden md:flex space-x-4">
          <NavLink label="Designs" active />
          <NavLink label="Patterns" />
          <NavLink label="Collections" />
          <NavLink label="Materials" />
        </nav>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative w-40 md:w-64 mr-2">
          <Input 
            type="text" 
            placeholder="Search designs..."
            className="pl-8 text-sm"
          />
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <Button variant="ghost" size="icon" className="text-[#2C3E50]">
          <FiHelpCircle className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-[#2C3E50]">
          <FiUser className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

interface NavLinkProps {
  label: string;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ label, active }) => (
  <a 
    href="#" 
    className={`text-sm px-3 py-1 rounded-md ${
      active 
        ? 'bg-[#F8F9FA] text-[#0047AB] font-medium' 
        : 'text-[#2C3E50] hover:bg-[#F8F9FA]'
    }`}
  >
    {label}
  </a>
);

export default Header;
