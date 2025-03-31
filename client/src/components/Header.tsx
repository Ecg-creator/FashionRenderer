import { FiShoppingBag, FiUser, FiSearch, FiHelpCircle, FiPackage } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isMarketplace = location.pathname.includes('/marketplace');
  
  return (
    <header className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="font-bold text-xl text-[#0047AB] mr-4 flex items-center">
          <FiShoppingBag className="mr-2" />
          <span>Garment3D</span>
        </Link>
        
        <nav className="hidden md:flex space-x-4">
          <NavLink to="/" label="Designs" active={isHome} />
          <NavLink to="/marketplace" label="Marketplace" active={isMarketplace} />
          <NavLink to="#" label="Patterns" />
          <NavLink to="#" label="Collections" />
          <NavLink to="#" label="Materials" />
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
        
        <Link to="/marketplace">
          <Button variant="ghost" size="icon" className="text-[#2C3E50] relative">
            <FiPackage className="h-5 w-5" />
            {isMarketplace && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#0047AB]" />}
          </Button>
        </Link>
        
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
  to: string;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ label, to, active }) => (
  <Link 
    to={to} 
    className={`text-sm px-3 py-1 rounded-md ${
      active 
        ? 'bg-[#F8F9FA] text-[#0047AB] font-medium' 
        : 'text-[#2C3E50] hover:bg-[#F8F9FA]'
    }`}
  >
    {label}
  </Link>
);

export default Header;
