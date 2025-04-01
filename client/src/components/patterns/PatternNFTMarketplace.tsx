import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patternSummaries } from '../../data/patternData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FiSearch, FiFilter, FiGrid, FiList, FiShoppingCart, FiHeart, FiArrowDown, FiArrowUp } from 'react-icons/fi';

// Extended pattern data with NFT-specific properties
const patternNFTs = patternSummaries.map((pattern, index) => ({
  ...pattern,
  tokenId: `PAT-${100 + index}`,
  price: (19.99 + index * 5).toFixed(2),
  creator: ['FashionDAO', 'PatternLabs', 'MetaThread', 'DigitalCouture', 'StyleToken'][index % 5],
  likes: Math.floor(Math.random() * 100) + 5,
  available: Math.floor(Math.random() * 10) + 1,
  totalMinted: Math.floor(Math.random() * 50) + 10,
  blockchain: 'Ethereum',
  royalty: '5%',
}));

export function PatternNFTMarketplace() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Filter patterns based on search and filters
  const filteredPatterns = patternNFTs.filter(pattern => {
    // Search term filter
    const matchesSearch = 
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.tokenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Price range filter
    const price = parseFloat(pattern.price);
    const matchesPriceRange = price >= priceRange[0] && price <= priceRange[1];
    
    // Category filter
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(pattern.primaryCategory);
    
    return matchesSearch && matchesPriceRange && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'popular':
        return b.likes - a.likes;
      case 'newest':
      default:
        return b.tokenId.localeCompare(a.tokenId);
    }
  });
  
  const handlePatternClick = (patternId: string) => {
    navigate(`/patterns/${patternId}`);
  };
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Digital Pattern Collection</h1>
          <p className="text-gray-600">Exclusive digital pattern NFTs for your next fashion creation. Each pattern is unique, verified on blockchain, and comes with full commercial rights.</p>
        </div>
        
        {/* Search and filter bar */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search patterns, creators, or token IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <FiFilter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
                >
                  <FiGrid className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                >
                  <FiList className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Extended filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div>
                <h3 className="font-medium text-sm mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['ergonomic', 'technical', 'outdoor', 'formal', 'ethnic'].map(category => (
                    <Badge 
                      key={category}
                      variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                      className="cursor-pointer text-xs"
                      onClick={() => toggleCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Price Range (ETH)</h3>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number" 
                    value={priceRange[0]} 
                    min={0}
                    max={priceRange[1]}
                    onChange={(e) => setPriceRange([parseFloat(e.target.value) || 0, priceRange[1]])}
                    className="w-20" 
                  />
                  <span>to</span>
                  <Input 
                    type="number" 
                    value={priceRange[1]} 
                    min={priceRange[0]}
                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value) || 100])}
                    className="w-20" 
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Status</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" defaultChecked />
                    <span className="ml-2 text-sm">Available</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm">Sold Out</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Pattern NFT Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatterns.map(pattern => (
              <PatternNFTCard key={pattern.id} pattern={pattern} onClick={handlePatternClick} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {filteredPatterns.map(pattern => (
              <PatternNFTListItem key={pattern.id} pattern={pattern} onClick={handlePatternClick} />
            ))}
          </div>
        )}
        
        {filteredPatterns.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No patterns found</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              We couldn't find any pattern NFTs matching your search criteria. Try adjusting your filters or search term.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 100]);
                setSelectedCategories([]);
              }}
              className="mt-4"
              variant="outline"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface PatternNFTCardProps {
  pattern: typeof patternNFTs[0];
  onClick: (id: string) => void;
}

function PatternNFTCard({ pattern, onClick }: PatternNFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(pattern.id)}
    >
      <div className="relative">
        {/* NFT Image */}
        <div className="h-52 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-300">{pattern.name.charAt(0)}</div>
            <div className="text-xs mt-2 text-indigo-400">Pattern #{pattern.tokenId}</div>
          </div>
        </div>
        
        {/* Badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            variant="outline" 
            className="bg-white/80 backdrop-blur-sm"
          >
            {pattern.primaryCategory.charAt(0).toUpperCase() + pattern.primaryCategory.slice(1)}
          </Badge>
        </div>
        
        {/* Like button */}
        <button 
          onClick={handleLike}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <FiHeart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 truncate">{pattern.name}</h3>
            <p className="text-xs text-gray-500 mt-1">Created by <span className="text-blue-600">{pattern.creator}</span></p>
          </div>
          
          <div className="text-xs bg-indigo-100 px-2 py-1 rounded-md text-indigo-800 font-medium">
            {pattern.available} available
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-base font-bold text-gray-900">${pattern.price} <span className="text-xs font-normal text-gray-500">USD</span></p>
          </div>
          
          <div className="flex space-x-1">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 px-2">
              <FiShoppingCart className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/patterns/${pattern.id}/customize`);
              }}
            >
              Customize
            </Button>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center text-xs text-gray-500 justify-between">
          <div className="flex items-center">
            <FiHeart className="h-3 w-3 mr-1" />
            {pattern.likes} likes
          </div>
          <div>Token #{pattern.tokenId}</div>
        </div>
      </div>
    </div>
  );
}

function PatternNFTListItem({ pattern, onClick }: PatternNFTCardProps) {
  const navigate = useNavigate();
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-indigo-400 transition-colors cursor-pointer flex"
      onClick={() => onClick(pattern.id)}
    >
      <div className="h-24 w-24 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center rounded-md flex-shrink-0">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-300">{pattern.name.charAt(0)}</div>
          <div className="text-[10px] mt-1 text-indigo-400">#{pattern.tokenId}</div>
        </div>
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center">
              <h3 className="font-semibold text-gray-900">{pattern.name}</h3>
              <Badge 
                variant="outline" 
                className="ml-2 text-xs"
              >
                {pattern.primaryCategory}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1">Created by <span className="text-blue-600">{pattern.creator}</span></p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{pattern.description}</p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-xs bg-indigo-100 px-2 py-1 rounded-md text-indigo-800 font-medium mb-2">
              {pattern.available} available
            </div>
            <p className="text-base font-bold text-gray-900">${pattern.price}</p>
            <div className="flex mt-2 space-x-1">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 px-2">
                <FiShoppingCart className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/patterns/${pattern.id}/customize`);
                }}
              >
                Customize
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
          <div className="flex items-center">
            <FiHeart className="h-3 w-3 mr-1" />
            {pattern.likes} likes
          </div>
          <div>Royalty: {pattern.royalty}</div>
          <div>Total minted: {pattern.totalMinted}</div>
        </div>
      </div>
    </div>
  );
}