import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patternDetails } from '../../data/patternData';
import { patternCategories } from '../../data/patternCategories';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FiArrowLeft, FiDownload, FiPrinter, FiShare2 } from 'react-icons/fi';

export function PatternDetail() {
  const { patternId } = useParams<{ patternId: string }>();
  const navigate = useNavigate();
  
  const pattern = patternDetails.find(p => p.id === patternId);
  
  if (!pattern) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">Pattern not found</h2>
        <p className="mt-2 text-gray-600">The pattern you're looking for doesn't exist or has been removed.</p>
        <Button 
          className="mt-6" 
          onClick={() => navigate('/patterns')}
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Patterns
        </Button>
      </div>
    );
  }
  
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
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <button 
            onClick={() => navigate('/patterns')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-1 h-4 w-4" />
            <span>Back to Patterns</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{pattern.name}</h1>
          <div className="flex items-center mt-1">
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
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500">{getCategoryName(pattern.primaryCategory)} / {getSubcategoryName(pattern.primaryCategory, pattern.subcategory)}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button 
            onClick={() => navigate(`/patterns/${patternId}/customize`)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            Customize Pattern
          </Button>
          <Button variant="outline" size="sm">
            <FiPrinter className="mr-1 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <FiDownload className="mr-1 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <FiShare2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Pattern preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-80 bg-gray-100 flex items-center justify-center">
              <span className="text-6xl text-gray-300">{pattern.name.charAt(0)}</span>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900">Available Downloads</h3>
              <div className="mt-2 space-y-2">
                {pattern.patternFiles.map((file, index) => (
                  <button 
                    key={index} 
                    className="w-full flex items-center justify-between p-2 border border-gray-200 rounded hover:bg-gray-50"
                  >
                    <span className="text-sm">
                      {pattern.name} ({file.fileType.toUpperCase()})
                    </span>
                    <FiDownload className="h-4 w-4 text-gray-600" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900">Tags</h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {pattern.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recommended materials */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium text-gray-900">Recommended Materials</h3>
            <div className="mt-3 space-y-4">
              {pattern.recommendedMaterials.map((material, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="font-medium text-sm">{material.type}</div>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Weight:</span> {material.weight}
                    </div>
                    <div>
                      <span className="font-medium">Stretch:</span> {material.stretch}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-medium text-gray-500">Alternatives:</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {material.alternatives.map(alt => (
                        <Badge key={alt} variant="outline" className="text-xs bg-gray-50">
                          {alt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Pattern details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="instructions" className="flex-1">Instructions</TabsTrigger>
              <TabsTrigger value="measurements" className="flex-1">Measurements</TabsTrigger>
              <TabsTrigger value="technical" className="flex-1">Technical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                <p className="mt-2 text-gray-700 leading-relaxed">{pattern.description}</p>
                
                <h3 className="mt-6 text-lg font-medium text-gray-900">Pattern Pieces</h3>
                <div className="mt-3 space-y-3">
                  {pattern.pieces.map((piece, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">{piece.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{piece.description}</p>
                        <Badge 
                          variant="outline" 
                          className={`mt-2 text-xs ${
                            piece.skillLevel === 'beginner' ? 'bg-green-50 text-green-700' :
                            piece.skillLevel === 'intermediate' ? 'bg-blue-50 text-blue-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}
                        >
                          {piece.skillLevel}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="mt-6 text-lg font-medium text-gray-900">Occasions</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pattern.occasions.map(occasion => (
                    <Badge key={occasion} className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                      {occasion}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="mt-6 text-lg font-medium text-gray-900">Associated Garments</h3>
                {pattern.associatedGarments.length > 0 ? (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pattern.associatedGarments.map(garment => (
                      <div 
                        key={garment.id}
                        className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 transition-colors cursor-pointer"
                        onClick={() => navigate(`/garments/${garment.id}`)}
                      >
                        <h4 className="font-medium text-gray-900">{garment.name}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{garment.description}</p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span className="font-medium">Type:</span>
                          <span className="ml-1">{garment.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-gray-500">No associated garments available.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="instructions" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900">Step-by-Step Instructions</h2>
                <p className="mt-2 text-sm text-gray-500">Follow these steps to create your garment using this pattern.</p>
                
                <div className="mt-6 space-y-8">
                  {pattern.instructionSteps.map(step => (
                    <div key={step.stepNumber} className="flex">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-medium flex items-center justify-center flex-shrink-0">
                        {step.stepNumber}
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-gray-900">{step.title}</h3>
                        <p className="mt-1 text-gray-600">{step.description}</p>
                        
                        {step.tips && step.tips.length > 0 && (
                          <div className="mt-3 bg-yellow-50 p-3 rounded-md">
                            <h4 className="text-sm font-medium text-yellow-800">Tips:</h4>
                            <ul className="mt-1 text-sm text-yellow-700 space-y-1 list-disc list-inside">
                              {step.tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {step.imageUrl && (
                          <div className="mt-3 h-48 bg-gray-100 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Instruction image placeholder</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="measurements" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900">Measurements</h2>
                <p className="mt-2 text-sm text-gray-500">Available sizes and measurement points for this pattern.</p>
                
                <h3 className="mt-6 text-lg font-medium text-gray-900">Available Sizes</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pattern.measurements.sizeRange.map(size => (
                    <Badge key={size} variant="outline" className="text-base">
                      {size}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="mt-6 text-lg font-medium text-gray-900">Measurement Points</h3>
                <div className="mt-3 space-y-4">
                  {pattern.measurements.measurementPoints.map((point, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <h4 className="font-medium text-gray-900">{point.name}</h4>
                      <p className="mt-1 text-sm text-gray-600">{point.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="mt-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900">Technical Details</h2>
                <p className="mt-2 text-sm text-gray-500">Advanced construction and finishing techniques used in this pattern.</p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Seam Types</h3>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                      {pattern.technicalDetails.seams.map((seam, index) => (
                        <li key={index}>{seam}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Closures</h3>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                      {pattern.technicalDetails.closures.map((closure, index) => (
                        <li key={index}>{closure}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Construction Techniques</h3>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                      {pattern.technicalDetails.constructionTechniques.map((technique, index) => (
                        <li key={index}>{technique}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Finishing Methods</h3>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                      {pattern.technicalDetails.finishingMethods.map((method, index) => (
                        <li key={index}>{method}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}