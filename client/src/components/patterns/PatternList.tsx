import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patternSummaries } from '../../data/patternData';
import { patternCategories } from '../../data/patternCategories';
import { PatternSummary } from '../../types/pattern';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';

export function PatternList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('all');
  
  // Filter patterns based on search and filters
  const filteredPatterns = patternSummaries.filter(pattern => {
    // Search term filter
    const matchesSearch = 
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = 
      selectedCategory === 'all' || pattern.primaryCategory === selectedCategory;
    
    // Skill level filter
    const matchesSkill = 
      selectedSkillLevel === 'all' || pattern.skillLevel === selectedSkillLevel;
    
    return matchesSearch && matchesCategory && matchesSkill;
  });
  
  const handlePatternClick = (patternId: string) => {
    navigate(`/patterns/${patternId}`);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Pattern Library</h1>
          
          <div className="flex items-center space-x-2">
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
        
        {/* Search and filter bar */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              {patternCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            
            <select
              value={selectedSkillLevel}
              onChange={(e) => setSelectedSkillLevel(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Skill Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
            
            <button className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md">
              <FiFilter className="h-4 w-4" />
              <span className="text-sm">More Filters</span>
            </button>
          </div>
        </div>
        
        {/* Tabs for categories */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="flex space-x-2 overflow-x-auto pb-2">
            <TabsTrigger value="all">All Patterns</TabsTrigger>
            {patternCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPatterns.map(pattern => (
                  <PatternCard key={pattern.id} pattern={pattern} onClick={handlePatternClick} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {filteredPatterns.map(pattern => (
                  <PatternListItem key={pattern.id} pattern={pattern} onClick={handlePatternClick} />
                ))}
              </div>
            )}
            
            {filteredPatterns.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No patterns found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedSkillLevel('all');
                  }}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </TabsContent>
          
          {patternCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                <p className="text-gray-600 mt-1">{category.description}</p>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Subcategories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {category.subcategories.map(subcategory => (
                  <div 
                    key={subcategory.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                    onClick={() => console.log(`Selected subcategory: ${subcategory.id}`)}
                  >
                    <h4 className="font-medium text-gray-900">{subcategory.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {subcategory.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-4">Patterns</h3>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPatterns
                    .filter(p => p.primaryCategory === category.id)
                    .map(pattern => (
                      <PatternCard key={pattern.id} pattern={pattern} onClick={handlePatternClick} />
                    ))}
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  {filteredPatterns
                    .filter(p => p.primaryCategory === category.id)
                    .map(pattern => (
                      <PatternListItem key={pattern.id} pattern={pattern} onClick={handlePatternClick} />
                    ))}
                </div>
              )}
              
              {filteredPatterns.filter(p => p.primaryCategory === category.id).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No patterns found in this category matching your filters.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

interface PatternCardProps {
  pattern: PatternSummary;
  onClick: (id: string) => void;
}

function PatternCard({ pattern, onClick }: PatternCardProps) {
  const getCategoryName = (categoryId: string) => {
    const category = patternCategories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  const getSubcategoryName = (categoryId: string, subcategoryId: string) => {
    const category = patternCategories.find(cat => cat.id === categoryId);
    if (!category) return subcategoryId;
    
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
    return subcategory ? subcategory.name : subcategoryId;
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
      onClick={() => onClick(pattern.id)}
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-lg text-gray-400">{pattern.name.charAt(0)}</span>
        </div>
        {/* <img 
          src={pattern.thumbnailUrl} 
          alt={pattern.name}
          className="w-full h-full object-cover object-center"
        /> */}
        
        <div className="absolute top-2 right-2">
          <Badge 
            variant="secondary" 
            className={`${
              pattern.skillLevel === 'beginner' ? 'bg-green-100 text-green-800' :
              pattern.skillLevel === 'intermediate' ? 'bg-blue-100 text-blue-800' :
              pattern.skillLevel === 'advanced' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}
          >
            {pattern.skillLevel}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="font-medium text-gray-900">{pattern.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{pattern.description}</p>
        </div>
        
        <div className="mt-3 flex flex-col space-y-1">
          <div className="flex items-center text-xs text-gray-500">
            <span className="font-medium">Category:</span>
            <span className="ml-1">{getCategoryName(pattern.primaryCategory)}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span className="font-medium">Type:</span>
            <span className="ml-1">{getSubcategoryName(pattern.primaryCategory, pattern.subcategory)}</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {pattern.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {pattern.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{pattern.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

function PatternListItem({ pattern, onClick }: PatternCardProps) {
  const getCategoryName = (categoryId: string) => {
    const category = patternCategories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-blue-400 transition-colors cursor-pointer"
      onClick={() => onClick(pattern.id)}
    >
      <div className="flex items-start">
        <div className="h-20 w-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
          <span className="text-lg text-gray-400">{pattern.name.charAt(0)}</span>
        </div>
        
        <div className="ml-4 flex-grow">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-gray-900">{pattern.name}</h3>
            <Badge 
              variant="secondary" 
              className={`ml-2 ${
                pattern.skillLevel === 'beginner' ? 'bg-green-100 text-green-800' :
                pattern.skillLevel === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                pattern.skillLevel === 'advanced' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {pattern.skillLevel}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">{pattern.description}</p>
          
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-xs text-gray-500">
              <span className="font-medium">Category:</span> {getCategoryName(pattern.primaryCategory)}
            </span>
            
            <div className="flex flex-wrap gap-1">
              {pattern.tags.slice(0, 4).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {pattern.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{pattern.tags.length - 4}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}