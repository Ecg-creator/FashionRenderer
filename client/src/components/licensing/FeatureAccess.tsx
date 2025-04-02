import React from 'react';
import { License } from '../../../shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { FiCheck, FiX, FiPackage, FiBox, FiGrid, FiStar } from 'react-icons/fi';

interface FeatureAccessProps {
  license: License;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  included: boolean;
}

interface Module {
  id: string;
  name: string;
  description: string;
  included: boolean;
  features: string[];
}

export default function FeatureAccess({ license }: FeatureAccessProps) {
  // Define license feature details
  const features: Feature[] = React.useMemo(() => [
    // Pattern & Material Features
    { 
      id: 'pattern-marketplace', 
      name: 'Pattern Marketplace', 
      description: 'Access to browse, purchase, and sell digital patterns', 
      category: 'core',
      included: license.features.includes('pattern-marketplace')
    },
    { 
      id: 'material-library', 
      name: 'Material Library', 
      description: 'Browse and search materials with technical specifications', 
      category: 'core',
      included: license.features.includes('material-library')
    },
    { 
      id: 'pattern-editor', 
      name: 'Pattern Editor', 
      description: 'Create and edit digital patterns with real-time visualization', 
      category: 'design',
      included: license.features.includes('pattern-editor')
    },
    { 
      id: 'pattern-customization', 
      name: 'Pattern Customization', 
      description: 'Customize patterns with measurements and style variations', 
      category: 'design',
      included: license.features.includes('pattern-customization')
    },
    { 
      id: 'material-technical-sheets', 
      name: 'Material Technical Sheets', 
      description: 'Generate detailed technical specifications for materials', 
      category: 'technical',
      included: license.features.includes('material-technical-sheets')
    },
    
    // HSN and Tax Features
    { 
      id: 'hsn-integration', 
      name: 'HSN Code Integration', 
      description: 'Assign HSN codes to materials and products', 
      category: 'compliance',
      included: license.features.includes('hsn-integration')
    },
    { 
      id: 'tax-calculation', 
      name: 'Tax Calculation', 
      description: 'Automatic tax calculations based on HSN codes', 
      category: 'compliance',
      included: license.features.includes('tax-calculation')
    },
    { 
      id: 'import-export-compliance', 
      name: 'Import/Export Compliance', 
      description: 'Tools for managing international trade compliance', 
      category: 'compliance',
      included: license.features.includes('import-export-compliance')
    },
    
    // Visualization Features
    { 
      id: '3d-garment-visualization', 
      name: '3D Garment Visualization', 
      description: 'Visualize garments in 3D with realistic materials', 
      category: 'visualization',
      included: license.features.includes('3d-garment-visualization')
    },
    { 
      id: 'measurement-tools', 
      name: 'Measurement Tools', 
      description: 'Digital tools for precise measurements', 
      category: 'visualization',
      included: license.features.includes('measurement-tools')
    },
    { 
      id: 'virtual-fitting', 
      name: 'Virtual Fitting', 
      description: 'Try garments on digital avatars with different body types', 
      category: 'visualization',
      included: license.features.includes('virtual-fitting')
    },
    
    // Manufacturing Features
    { 
      id: 'bom-generation', 
      name: 'BOM Generation', 
      description: 'Automatic bill of materials generation', 
      category: 'manufacturing',
      included: license.features.includes('bom-generation')
    },
    { 
      id: 'production-planning', 
      name: 'Production Planning', 
      description: 'Tools for planning and scheduling production', 
      category: 'manufacturing',
      included: license.features.includes('production-planning')
    },
    { 
      id: 'quality-control', 
      name: 'Quality Control', 
      description: 'Digital quality control and inspection tools', 
      category: 'manufacturing',
      included: license.features.includes('quality-control')
    },
    
    // Supply Chain Features
    { 
      id: 'supplier-management', 
      name: 'Supplier Management', 
      description: 'Manage supplier relationships and orders', 
      category: 'supply-chain',
      included: license.features.includes('supplier-management')
    },
    { 
      id: 'logistics-integration', 
      name: 'Logistics Integration', 
      description: 'Integration with logistics and shipping providers', 
      category: 'supply-chain',
      included: license.features.includes('logistics-integration')
    },
    { 
      id: 'inventory-management', 
      name: 'Inventory Management', 
      description: 'Track and manage material and product inventory', 
      category: 'supply-chain',
      included: license.features.includes('inventory-management')
    },
  ], [license.features]);
  
  // Define modules
  const modules: Module[] = React.useMemo(() => [
    {
      id: 'core',
      name: 'Core Platform',
      description: 'Essential features for all users',
      included: license.modules.includes('core'),
      features: ['pattern-marketplace', 'material-library']
    },
    {
      id: 'design',
      name: 'Design Studio',
      description: 'Tools for designers to create and modify patterns',
      included: license.modules.includes('design'),
      features: ['pattern-editor', 'pattern-customization']
    },
    {
      id: 'visualization',
      name: 'Visualization Suite',
      description: '3D visualization and measurement tools',
      included: license.modules.includes('visualization'),
      features: ['3d-garment-visualization', 'measurement-tools', 'virtual-fitting']
    },
    {
      id: 'compliance',
      name: 'Compliance Manager',
      description: 'HSN and tax compliance tools',
      included: license.modules.includes('compliance'),
      features: ['hsn-integration', 'tax-calculation', 'import-export-compliance']
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing Hub',
      description: 'Tools for production planning and execution',
      included: license.modules.includes('manufacturing'),
      features: ['bom-generation', 'production-planning', 'quality-control']
    },
    {
      id: 'supply-chain',
      name: 'Supply Chain Control',
      description: 'Manage the entire supply chain from suppliers to delivery',
      included: license.modules.includes('supply-chain'),
      features: ['supplier-management', 'logistics-integration', 'inventory-management']
    },
  ], [license.modules]);
  
  // Group features by category for the tabs
  const coreFeatures = features.filter(f => f.category === 'core');
  const designFeatures = features.filter(f => f.category === 'design');
  const visualizationFeatures = features.filter(f => f.category === 'visualization');
  const complianceFeatures = features.filter(f => f.category === 'compliance');
  const manufacturingFeatures = features.filter(f => f.category === 'manufacturing');
  const supplyChainFeatures = features.filter(f => f.category === 'supply-chain');
  
  // Render a feature item
  const renderFeatureItem = (feature: Feature) => (
    <div key={feature.id} className="flex items-start justify-between p-3 border-b border-gray-100 last:border-0">
      <div>
        <div className="font-medium flex items-center">
          {feature.name}
          {feature.included && (
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-100">
              Included
            </Badge>
          )}
        </div>
        <div className="text-sm text-gray-500 mt-1">{feature.description}</div>
      </div>
      <div className={`flex-shrink-0 rounded-full ${feature.included ? 'text-green-500' : 'text-red-500'} flex items-center justify-center mt-1`}>
        {feature.included ? <FiCheck size={20} /> : <FiX size={20} />}
      </div>
    </div>
  );
  
  // Render a module card
  const renderModuleCard = (module: Module) => (
    <div 
      key={module.id} 
      className={`relative rounded-lg p-4 border ${module.included ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
    >
      <div className="absolute top-4 right-4">
        {module.included ? (
          <div className="rounded-full bg-green-100 text-green-600 p-1">
            <FiCheck size={16} />
          </div>
        ) : (
          <div className="rounded-full bg-gray-200 text-gray-500 p-1">
            <FiX size={16} />
          </div>
        )}
      </div>
      
      <div className="mb-2">
        {module.id === 'core' && <FiPackage className="text-blue-500" size={24} />}
        {module.id === 'design' && <FiStar className="text-purple-500" size={24} />}
        {module.id === 'visualization' && <FiGrid className="text-indigo-500" size={24} />}
        {module.id === 'compliance' && <FiBox className="text-amber-500" size={24} />}
        {module.id === 'manufacturing' && <FiGrid className="text-teal-500" size={24} />}
        {module.id === 'supply-chain' && <FiPackage className="text-cyan-500" size={24} />}
      </div>
      
      <h3 className="text-lg font-semibold">{module.name}</h3>
      <p className="text-sm text-gray-600 mt-1 mb-3">{module.description}</p>
      
      <div className="space-y-1 mt-2">
        {module.features.map(featureId => {
          const feature = features.find(f => f.id === featureId);
          if (!feature) return null;
          
          return (
            <div key={featureId} className="text-sm flex items-center">
              <div className={`mr-2 ${feature.included ? 'text-green-500' : 'text-gray-400'}`}>
                {feature.included ? <FiCheck size={14} /> : <FiX size={14} />}
              </div>
              {feature.name}
            </div>
          );
        })}
      </div>
    </div>
  );
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Feature Access</CardTitle>
        <CardDescription>Features and modules included in your license</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map(renderModuleCard)}
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Features by Category</h3>
          <Tabs defaultValue="core">
            <TabsList className="mb-4">
              <TabsTrigger value="core">Core</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
              <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
            </TabsList>
            
            <TabsContent value="core" className="space-y-1">
              {coreFeatures.map(renderFeatureItem)}
            </TabsContent>
            
            <TabsContent value="design" className="space-y-1">
              {designFeatures.map(renderFeatureItem)}
            </TabsContent>
            
            <TabsContent value="visualization" className="space-y-1">
              {visualizationFeatures.map(renderFeatureItem)}
            </TabsContent>
            
            <TabsContent value="compliance" className="space-y-1">
              {complianceFeatures.map(renderFeatureItem)}
            </TabsContent>
            
            <TabsContent value="manufacturing" className="space-y-1">
              {manufacturingFeatures.map(renderFeatureItem)}
            </TabsContent>
            
            <TabsContent value="supply-chain" className="space-y-1">
              {supplyChainFeatures.map(renderFeatureItem)}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}