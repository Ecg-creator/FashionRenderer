import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Search, Filter, Download, Info, ArrowRight } from 'lucide-react';

interface HSNCode {
  code: string;
  description: string;
  section: string;
  chapter: string;
  gstRate: string;
  applicableTo: string[];
  exportRestrictions?: string;
}

interface MaterialWithHSN {
  id: string;
  name: string;
  type: string;
  hsnCode: string;
  gstRate: string;
  composition: string;
  usage: string[];
}

// Sample HSN codes data
const hsnCodesData: HSNCode[] = [
  {
    code: "5208",
    description: "Woven fabrics of cotton, containing 85% or more cotton by weight, weighing not more than 200 g/m²",
    section: "XI",
    chapter: "52",
    gstRate: "5%",
    applicableTo: ["Shirts", "Dresses", "Light summer wear"],
  },
  {
    code: "5209",
    description: "Woven fabrics of cotton, containing 85% or more cotton by weight, weighing more than 200 g/m²",
    section: "XI",
    chapter: "52",
    gstRate: "5%",
    applicableTo: ["Jeans", "Heavy shirts", "Work wear"],
  },
  {
    code: "5407",
    description: "Woven fabrics of synthetic filament yarn",
    section: "XI",
    chapter: "54",
    gstRate: "12%",
    applicableTo: ["Athletic wear", "Outdoor clothing", "Formal wear"],
  },
  {
    code: "6001",
    description: "Pile fabrics, including 'long pile' fabrics and terry fabrics, knitted or crocheted",
    section: "XI",
    chapter: "60",
    gstRate: "5%",
    applicableTo: ["Sweatshirts", "Winter wear", "Home textiles"],
  },
  {
    code: "5602",
    description: "Felt, whether or not impregnated, coated, covered or laminated",
    section: "XI",
    chapter: "56",
    gstRate: "12%",
    applicableTo: ["Accessories", "Industrial use", "Crafts"],
  },
  {
    code: "9606",
    description: "Buttons, press-fasteners, snap-fasteners and press-studs, button moulds and other parts of these articles; button blanks",
    section: "XX",
    chapter: "96",
    gstRate: "18%",
    applicableTo: ["All garments with buttons", "Accessories"],
    exportRestrictions: "None",
  },
  {
    code: "9607",
    description: "Slide fasteners (zippers) and parts thereof",
    section: "XX",
    chapter: "96",
    gstRate: "18%",
    applicableTo: ["Jeans", "Jackets", "Bags", "Footwear"],
    exportRestrictions: "None",
  },
  {
    code: "6117",
    description: "Other made up clothing accessories, knitted or crocheted; knitted or crocheted parts of garments",
    section: "XI",
    chapter: "61",
    gstRate: "12%",
    applicableTo: ["Socks", "Gloves", "Scarves", "Accessories"],
  },
  {
    code: "6204",
    description: "Women's or girls' suits, ensembles, jackets, blazers, dresses, skirts, divided skirts, trousers, bib and brace overalls, breeches and shorts (other than swimwear)",
    section: "XI",
    chapter: "62",
    gstRate: "12%",
    applicableTo: ["Women's clothing", "Fashion items"],
    exportRestrictions: "None",
  },
  {
    code: "6203",
    description: "Men's or boys' suits, ensembles, jackets, blazers, trousers, bib and brace overalls, breeches and shorts (other than swimwear)",
    section: "XI",
    chapter: "62",
    gstRate: "12%",
    applicableTo: ["Men's clothing", "Fashion items"],
    exportRestrictions: "None",
  },
];

// Sample materials with HSN codes
const materialsWithHSN: MaterialWithHSN[] = [
  {
    id: "m001",
    name: "Premium Cotton Twill",
    type: "Fabric",
    hsnCode: "5208",
    gstRate: "5%",
    composition: "100% Cotton",
    usage: ["BORRIS Slim Fit", "TRACK SKINNY", "WOODSMAN Collection"]
  },
  {
    id: "m002",
    name: "Stretch Denim",
    type: "Fabric",
    hsnCode: "5209",
    gstRate: "5%",
    composition: "98% Cotton, 2% Elastane",
    usage: ["TRACK SKINNY", "ARTURO"]
  },
  {
    id: "m003",
    name: "Technical Polyester",
    type: "Fabric",
    hsnCode: "5407",
    gstRate: "12%",
    composition: "100% Polyester",
    usage: ["WOODSMAN Collection", "Athletic pieces"]
  },
  {
    id: "m004",
    name: "Recycled Fleece",
    type: "Fabric",
    hsnCode: "6001",
    gstRate: "5%",
    composition: "80% Cotton, 20% Polyester",
    usage: ["WOODSMAN Collection"]
  },
  {
    id: "m005",
    name: "Metal Buttons",
    type: "Trim",
    hsnCode: "9606",
    gstRate: "18%",
    composition: "Zinc Alloy",
    usage: ["BORRIS", "WOODSMAN Collection"]
  },
  {
    id: "m006",
    name: "YKK Zippers",
    type: "Trim",
    hsnCode: "9607",
    gstRate: "18%",
    composition: "Metal + Polyester Tape",
    usage: ["All jeans", "Jackets"]
  },
  {
    id: "m007",
    name: "Ribbed Cuffs",
    type: "Trim",
    hsnCode: "6117",
    gstRate: "12%",
    composition: "95% Cotton, 5% Elastane",
    usage: ["WOODSMAN Collection"]
  },
  {
    id: "m008",
    name: "Finished WOODSMAN Jacket",
    type: "Finished Product",
    hsnCode: "6203",
    gstRate: "12%",
    composition: "Mixed Materials",
    usage: ["Ready for retail"]
  },
  {
    id: "m009",
    name: "Finished TRACK SKINNY",
    type: "Finished Product",
    hsnCode: "6203",
    gstRate: "12%",
    composition: "98% Cotton, 2% Elastane",
    usage: ["Ready for retail"]
  },
  {
    id: "m010",
    name: "ARTURO Women's Version",
    type: "Finished Product",
    hsnCode: "6204",
    gstRate: "12%",
    composition: "Mixed Materials",
    usage: ["Ready for retail"]
  },
];

export const HSNCodeIntegration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedHSN, setSelectedHSN] = useState<HSNCode | null>(null);
  
  const filteredMaterials = materialsWithHSN.filter(material => {
    const matchesSearch = 
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.hsnCode.includes(searchTerm) ||
      material.composition.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && material.type === filterType;
  });
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HSN Code Integration</h1>
        <p className="text-gray-600">
          Comprehensive HSN (Harmonized System Nomenclature) code management for accurate taxation and compliance
        </p>
      </div>
      
      <Tabs defaultValue="materials">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="materials">Materials & Products</TabsTrigger>
          <TabsTrigger value="hsn-database">HSN Database</TabsTrigger>
          <TabsTrigger value="tax-calculator">Tax Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle>Materials with HSN Codes</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="Search materials or HSN codes..." 
                          className="pl-9 w-full md:w-[240px]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[130px]">
                          <Filter className="h-4 w-4 mr-2" />
                          <span>Filter</span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Fabric">Fabrics</SelectItem>
                          <SelectItem value="Trim">Trims</SelectItem>
                          <SelectItem value="Finished Product">Finished Products</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Material</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>HSN Code</TableHead>
                          <TableHead>GST Rate</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMaterials.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                              No materials found matching your criteria
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredMaterials.map((material) => (
                            <TableRow key={material.id}>
                              <TableCell className="font-medium">{material.name}</TableCell>
                              <TableCell>
                                <Badge variant={
                                  material.type === 'Fabric' ? 'default' : 
                                  material.type === 'Trim' ? 'outline' : 
                                  'secondary'
                                }>
                                  {material.type}
                                </Badge>
                              </TableCell>
                              <TableCell>{material.hsnCode}</TableCell>
                              <TableCell>{material.gstRate}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    const hsn = hsnCodesData.find(h => h.code === material.hsnCode);
                                    if (hsn) setSelectedHSN(hsn);
                                  }}
                                >
                                  <Info className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {filteredMaterials.length} of {materialsWithHSN.length} materials
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export HSN Data
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>HSN Details</CardTitle>
                  <CardDescription>
                    {selectedHSN ? 
                      `Information for HSN code ${selectedHSN.code}` : 
                      "Select a material to view HSN details"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedHSN ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">HSN Code</h3>
                        <p className="mt-1 text-lg font-semibold">{selectedHSN.code}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <p className="mt-1">{selectedHSN.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Section</h3>
                          <p className="mt-1 font-medium">{selectedHSN.section}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Chapter</h3>
                          <p className="mt-1 font-medium">{selectedHSN.chapter}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">GST Rate</h3>
                        <div className="mt-1">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 text-base px-3 py-1">
                            {selectedHSN.gstRate}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Typically Used For</h3>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {selectedHSN.applicableTo.map((item, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {selectedHSN.exportRestrictions && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Export Restrictions</h3>
                          <p className="mt-1">{selectedHSN.exportRestrictions}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      <Info className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>Select a material from the table to view its HSN code details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="hsn-database">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>HSN Code Database</CardTitle>
                  <CardDescription>
                    Comprehensive database of Harmonized System Nomenclature codes for textiles and garments
                  </CardDescription>
                </div>
                <div className="relative w-full md:w-[320px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search HSN codes or descriptions..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>HSN Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Chapter</TableHead>
                      <TableHead>GST Rate</TableHead>
                      <TableHead>Applicable To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hsnCodesData
                      .filter(hsn => 
                        hsn.code.includes(searchTerm) || 
                        hsn.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((hsn) => (
                        <TableRow key={hsn.code}>
                          <TableCell className="font-medium">{hsn.code}</TableCell>
                          <TableCell className="max-w-xs truncate">{hsn.description}</TableCell>
                          <TableCell>{hsn.section}</TableCell>
                          <TableCell>{hsn.chapter}</TableCell>
                          <TableCell>{hsn.gstRate}</TableCell>
                          <TableCell className="max-w-[150px] truncate">{hsn.applicableTo.join(", ")}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax-calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>GST Tax Calculator</CardTitle>
                <CardDescription>
                  Calculate taxes for different products based on their HSN codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Select Product Type
                    </label>
                    <Select defaultValue="fabric">
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fabric">Fabric</SelectItem>
                        <SelectItem value="garment">Finished Garment</SelectItem>
                        <SelectItem value="accessory">Accessory</SelectItem>
                        <SelectItem value="trim">Trims & Components</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Select HSN Code
                    </label>
                    <Select defaultValue="5208">
                      <SelectTrigger>
                        <SelectValue placeholder="Select HSN code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5208">5208 - Cotton fabrics &le; 200g/m²</SelectItem>
                        <SelectItem value="5209">5209 - Cotton fabrics &gt; 200g/m²</SelectItem>
                        <SelectItem value="5407">5407 - Synthetic filament fabrics</SelectItem>
                        <SelectItem value="6203">6203 - Men's or boys' suits, jackets, etc.</SelectItem>
                        <SelectItem value="6204">6204 - Women's or girls' suits, jackets, etc.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Base Price (₹)
                    </label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Quantity
                    </label>
                    <Input type="number" defaultValue="1" />
                  </div>
                  
                  <Button className="w-full">Calculate Tax</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Results</CardTitle>
                <CardDescription>
                  Detailed breakdown of taxes based on HSN code 5208
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4 mb-4">
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Base Price:</p>
                      <p className="font-medium">₹1,000.00</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">HSN Code:</p>
                      <p className="font-medium">5208</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GST Rate:</p>
                      <p className="font-medium">5%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity:</p>
                      <p className="font-medium">1</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Base Amount</span>
                    <span className="font-medium">₹1,000.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">CGST (2.5%)</span>
                    <span className="font-medium">₹25.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">SGST (2.5%)</span>
                    <span className="font-medium">₹25.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Total GST</span>
                    <span className="font-medium">₹50.00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-dashed">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-lg font-bold">₹1,050.00</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Export Documentation</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>HSN code 5208 requires standard export documentation</span>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>No special permit needed for exporting cotton fabrics</span>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Certificate of Origin recommended for duty benefits</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HSNCodeIntegration;