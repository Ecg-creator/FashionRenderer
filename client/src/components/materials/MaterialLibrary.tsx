import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { materialTypes, fabricTypes, buttonTypes, trimTypes } from "../../data/materialData";
import { MaterialCard } from "./MaterialCard";
import { MaterialDetail } from "./MaterialDetail";

export function MaterialLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null);

  // Filter materials based on search query and category
  const filteredMaterials = (category: string) => {
    let materials = [];
    
    switch(category) {
      case 'fabrics':
        materials = fabricTypes;
        break;
      case 'buttons':
        materials = buttonTypes;
        break;
      case 'trims':
        materials = trimTypes;
        break;
      default:
        materials = [...fabricTypes, ...buttonTypes, ...trimTypes];
        break;
    }
    
    if (searchQuery.trim() === "") return materials;
    
    return materials.filter(material => 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const handleMaterialSelect = (material: any) => {
    setSelectedMaterial(material);
  };

  const handleCloseDetail = () => {
    setSelectedMaterial(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Material Library</h1>
          <p className="text-gray-600 mt-1">
            Explore our comprehensive collection of materials for garment design and production
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search materials..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-gray-900 mb-3">Material Categories</h3>
            <div className="space-y-2">
              {materialTypes.map((type) => (
                <div key={type.id} className="flex items-center">
                  <button
                    className={`w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 ${
                      selectedCategory === type.id ? "bg-blue-50 text-blue-700 font-medium" : ""
                    }`}
                    onClick={() => setSelectedCategory(type.id)}
                  >
                    {type.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-gray-900 mb-3">Material Properties</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm text-gray-700 mb-1">Weight</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Light</Button>
                  <Button variant="outline" size="sm">Medium</Button>
                  <Button variant="outline" size="sm">Heavy</Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-700 mb-1">Stretch</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">None</Button>
                  <Button variant="outline" size="sm">Minimal</Button>
                  <Button variant="outline" size="sm">2-Way</Button>
                  <Button variant="outline" size="sm">4-Way</Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-700 mb-1">Sustainability</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Organic</Button>
                  <Button variant="outline" size="sm">Recycled</Button>
                  <Button variant="outline" size="sm">Eco-friendly</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-3/4">
          {selectedMaterial ? (
            <MaterialDetail material={selectedMaterial} onClose={handleCloseDetail} />
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>All</TabsTrigger>
                <TabsTrigger value="fabrics" onClick={() => setSelectedCategory("fabrics")}>Fabrics</TabsTrigger>
                <TabsTrigger value="buttons" onClick={() => setSelectedCategory("buttons")}>Buttons</TabsTrigger>
                <TabsTrigger value="trims" onClick={() => setSelectedCategory("trims")}>Trims</TabsTrigger>
              </TabsList>
              
              {["all", "fabrics", "buttons", "trims"].map(category => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "grid-cols-1 gap-2"}`}>
                    {filteredMaterials(category).map((material, index) => (
                      <MaterialCard
                        key={`${material.id}-${index}`}
                        material={material}
                        viewMode={viewMode}
                        onClick={() => handleMaterialSelect(material)}
                      />
                    ))}
                  </div>
                  
                  {filteredMaterials(category).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Search className="h-12 w-12 text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No materials found</h3>
                      <p className="text-gray-600">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}