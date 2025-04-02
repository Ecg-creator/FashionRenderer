import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  X, 
  Download, 
  Bookmark, 
  Share2, 
  Plus, 
  Minus, 
  Info, 
  History, 
  FileText, 
  Truck, 
  Ruler 
} from "lucide-react";
import { MaterialType } from "../../types/material";
import { MaterialVisualization } from "./MaterialVisualization";

interface MaterialDetailProps {
  material: MaterialType;
  onClose: () => void;
}

export function MaterialDetail({ material, onClose }: MaterialDetailProps) {
  const [activeTab, setActiveTab] = useState("visualization");
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">{material.name}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 border-r border-b md:border-b-0">
          <div className="aspect-square w-full bg-gray-100 relative">
            <img
              src={material.imageUrl}
              alt={material.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 flex space-x-2">
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="secondary" size="icon" size-="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" size-="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">Material Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium text-gray-900">{material.category}</span>
              </div>
              
              {material.composition && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Composition:</span>
                  <span className="font-medium text-gray-900">{material.composition}</span>
                </div>
              )}
              
              {material.weight && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium text-gray-900">{material.weight} g/m²</span>
                </div>
              )}
              
              {material.width && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Width:</span>
                  <span className="font-medium text-gray-900">{material.width} cm</span>
                </div>
              )}
              
              {material.stretch && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Stretch:</span>
                  <span className="font-medium text-gray-900">{material.stretch}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium text-gray-900">
                  {material.price ? formatPrice(material.price) : "Price varies"}
                  <span className="text-gray-600 ml-1">{material.priceUnit || "/meter"}</span>
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Availability:</span>
                <Badge variant={material.inStock ? "default" : "secondary"}>
                  {material.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Order:</span>
                <span className="font-medium text-gray-900">{material.minimumOrder || "1"} {material.unit || "meter"}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {material.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center">
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="sm" className="px-2 h-8">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">1</span>
                  <Button variant="ghost" size="sm" className="px-2 h-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="ml-2 text-gray-500">{material.unit || "meter"}</span>
              </div>
              
              <Button className="w-full">Add to Project</Button>
              <Button variant="outline" className="w-full">Request Sample</Button>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 p-0">
          <Tabs defaultValue="visualization" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full rounded-none border-b">
              <TabsTrigger value="visualization" className="rounded-none">
                Visualization
              </TabsTrigger>
              <TabsTrigger value="technical" className="rounded-none">
                Technical Details
              </TabsTrigger>
              <TabsTrigger value="documentation" className="rounded-none">
                Documentation
              </TabsTrigger>
              <TabsTrigger value="sustainability" className="rounded-none">
                Sustainability
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualization" className="p-0 m-0 border-0">
              <MaterialVisualization material={material} />
            </TabsContent>
            
            <TabsContent value="technical" className="p-0 pt-4 m-0 border-0">
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="flex items-center text-lg font-medium mb-2">
                        <Info className="h-5 w-5 mr-2 text-blue-500" />
                        Properties
                      </h3>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {material.properties?.map((prop, index) => (
                          <React.Fragment key={index}>
                            <dt className="text-gray-600">{prop.name}:</dt>
                            <dd className="text-gray-900">{prop.value}</dd>
                          </React.Fragment>
                        ))}
                      </dl>
                    </div>
                    
                    <div>
                      <h3 className="flex items-center text-lg font-medium mb-2">
                        <History className="h-5 w-5 mr-2 text-blue-500" />
                        Care Instructions
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {material.careInstructions?.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="flex items-center text-lg font-medium mb-2">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        Specifications
                      </h3>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {material.specifications?.map((spec, index) => (
                          <React.Fragment key={index}>
                            <dt className="text-gray-600">{spec.name}:</dt>
                            <dd className="text-gray-900">{spec.value}</dd>
                          </React.Fragment>
                        ))}
                      </dl>
                    </div>
                    
                    <div>
                      <h3 className="flex items-center text-lg font-medium mb-2">
                        <Truck className="h-5 w-5 mr-2 text-blue-500" />
                        Supplier Information
                      </h3>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <dt className="text-gray-600">Supplier:</dt>
                        <dd className="text-gray-900">{material.supplier?.name || "Various"}</dd>
                        
                        <dt className="text-gray-600">Origin:</dt>
                        <dd className="text-gray-900">{material.supplier?.origin || "N/A"}</dd>
                        
                        <dt className="text-gray-600">Lead Time:</dt>
                        <dd className="text-gray-900">{material.supplier?.leadTime || "N/A"}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                
                {material.performanceData && (
                  <div className="mt-6">
                    <h3 className="flex items-center text-lg font-medium mb-2">
                      <Ruler className="h-5 w-5 mr-2 text-blue-500" />
                      Performance Data
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {material.performanceData.map((data, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{data.value}</div>
                            <div className="text-sm text-gray-600">{data.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="documentation" className="p-4 m-0 border-0">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Technical Documents</h3>
                  <ul className="space-y-2">
                    {material.documents?.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-blue-500" />
                          {doc.name}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Usage Guidelines</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      {material.usageGuidelines || 
                        "This material is suitable for a variety of applications in garment manufacturing. Follow industry standard practices for cutting, sewing, and finishing."}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {material.certifications?.map((cert, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sustainability" className="p-4 m-0 border-0">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Sustainability Profile</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3">
                        <div className="text-2xl font-bold text-green-600">
                          {material.sustainabilityRating?.water || "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">Water Usage</div>
                      </div>
                      <div className="text-center p-3">
                        <div className="text-2xl font-bold text-green-600">
                          {material.sustainabilityRating?.carbon || "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">Carbon Footprint</div>
                      </div>
                      <div className="text-center p-3">
                        <div className="text-2xl font-bold text-green-600">
                          {material.sustainabilityRating?.overall || "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">Overall Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Environmental Impact</h3>
                  <p className="text-sm text-gray-700">
                    {material.environmentalImpact || 
                      "Detailed environmental impact information for this material is currently being compiled. Please check back later for updates."}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Recycling & End of Life</h3>
                  <p className="text-sm text-gray-700">
                    {material.recyclingInfo || 
                      "Information about recycling options and end-of-life considerations for this material is currently being compiled."}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}