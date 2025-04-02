import React from 'react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, Eye, Bookmark, Plus } from "lucide-react";
import { MaterialType } from "../../types/material";

interface MaterialCardProps {
  material: MaterialType;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export function MaterialCard({ material, viewMode, onClick }: MaterialCardProps) {
  const isGrid = viewMode === "grid";

  // Format price to 2 decimal places and add currency symbol
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden
        transition-all duration-200 hover:shadow-md hover:border-gray-300
        ${isGrid ? 'flex flex-col' : 'flex flex-row'}
      `}
      onClick={onClick}
    >
      <div 
        className={`
          bg-gray-100 relative group
          ${isGrid ? 'w-full aspect-square' : 'w-24 h-24'}
        `}
      >
        <img 
          src={material.imageUrl} 
          alt={material.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button variant="secondary" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        </div>
      </div>
      
      <div className={`p-4 ${isGrid ? 'w-full' : 'flex-1'}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{material.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {material.category}
              {material.composition && ` • ${material.composition}`}
            </p>
          </div>
          {!isGrid && (
            <div className="flex items-center">
              <Badge variant={material.inStock ? "default" : "secondary"} className="ml-2">
                {material.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          )}
        </div>
        
        {isGrid && (
          <>
            <div className="flex flex-wrap gap-1 mt-1 mb-2">
              {material.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {material.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{material.tags.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <p className="font-semibold text-gray-900">
                {material.price ? formatPrice(material.price) : "Price varies"}
              </p>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
        
        {!isGrid && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-2">
            <div className="flex flex-wrap gap-1 mb-2 lg:mb-0">
              {material.tags.slice(0, 4).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {material.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{material.tags.length - 4}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <p className="font-semibold text-gray-900">
                {material.price ? formatPrice(material.price) : "Price varies"}
              </p>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}