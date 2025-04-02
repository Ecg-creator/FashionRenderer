import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiBarChart2, FiBox, FiCalendar, FiDollarSign, FiGrid, FiMap, FiPackage, FiPieChart, FiShoppingBag, FiUsers, FiDatabase, FiCode } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

interface DashboardMetric {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

interface SystemComponent {
  id: string;
  name: string;
  description: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  icon: React.ReactNode;
  path: string;
}

const Dashboard: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  
  const metrics: DashboardMetric[] = [
    {
      title: 'Total Orders',
      value: '245',
      change: '+12.5%',
      trend: 'up',
      icon: <FiPackage className="h-5 w-5 text-blue-500" />
    },
    {
      title: 'Active Manufacturers',
      value: '37',
      change: '+5.3%',
      trend: 'up',
      icon: <FiUsers className="h-5 w-5 text-purple-500" />
    },
    {
      title: 'Pattern Sales',
      value: '1,348',
      change: '+22.4%',
      trend: 'up',
      icon: <FiGrid className="h-5 w-5 text-green-500" />
    },
    {
      title: 'Revenue',
      value: '$128,450',
      change: '+8.1%',
      trend: 'up',
      icon: <FiDollarSign className="h-5 w-5 text-amber-500" />
    },
  ];
  
  const upcomingOrders = [
    { id: 'OR-8721', customer: 'Zara', date: 'Apr 05, 2025', status: 'processing', amount: '$12,450' },
    { id: 'OR-8654', customer: 'H&M', date: 'Apr 07, 2025', status: 'pending', amount: '$8,320' },
    { id: 'OR-8547', customer: 'Gap Inc.', date: 'Apr 10, 2025', status: 'confirmed', amount: '$15,780' },
    { id: 'OR-8432', customer: 'Levi Strauss', date: 'Apr 12, 2025', status: 'pending', amount: '$9,650' },
  ];
  
  const topPatterns = [
    { name: 'WOODSMAN F Collection', sales: 256, revenue: '$19,200', category: 'Menswear' },
    { name: 'TRACK SKINNY', sales: 198, revenue: '$11,880', category: 'Streetwear' },
    { name: 'BORRIS Slim Fit', sales: 182, revenue: '$12,740', category: 'Casual' },
    { name: 'ARTURO Collection', sales: 145, revenue: '$10,875', category: 'Formal' },
  ];
  
  const systemComponents: SystemComponent[] = [
    {
      id: 'garment-viewer',
      name: 'Garment Viewer',
      description: '3D visualization engine for garment design and customization',
      status: 'operational',
      icon: <FiBox />,
      path: '/'
    },
    {
      id: 'material-library',
      name: 'Material Library',
      description: 'Comprehensive database of fabrics and materials with technical specifications',
      status: 'operational',
      icon: <FiGrid />,
      path: '/materials'
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      description: 'Trading platform connecting designers, manufacturers and brands',
      status: 'operational',
      icon: <FiShoppingBag />,
      path: '/marketplace'
    },
    {
      id: 'virtual-silk-road',
      name: 'Virtual Silk Road',
      description: 'Immersive 3D world representing the entire fashion supply chain',
      status: 'operational',
      icon: <FiMap />,
      path: '/virtual-silk-road'
    },
    {
      id: 'hsn-integration',
      name: 'HSN Integration',
      description: 'Taxation logic through Harmonized System Nomenclature codes',
      status: 'operational',
      icon: <FiDatabase />,
      path: '/hsn'
    },
    {
      id: 'architecture',
      name: 'System Architecture',
      description: 'Modular block structure of the entire platform',
      status: 'operational',
      icon: <FiCode />,
      path: '/documentation/architecture'
    }
  ];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">EmpireOS Dashboard</h1>
          <p className="text-gray-500">Control center for your Virtual Silk Road ecosystem</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FiCalendar className="h-4 w-4" />
            <span>Apr 2025</span>
          </Button>
          <Button variant="default" size="sm">Generate Report</Button>
        </div>
      </div>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`text-xs flex items-center mt-1 ${
                metric.trend === 'up' 
                  ? 'text-green-600' 
                  : metric.trend === 'down' 
                    ? 'text-red-600' 
                    : 'text-gray-500'
              }`}>
                {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="patterns">Top Patterns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Orders</CardTitle>
                  <CardDescription>
                    Orders that require attention in the coming days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium py-2">Order ID</th>
                          <th className="text-left font-medium py-2">Customer</th>
                          <th className="text-left font-medium py-2">Due Date</th>
                          <th className="text-left font-medium py-2">Status</th>
                          <th className="text-right font-medium py-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100">
                            <td className="py-3 font-medium">{order.id}</td>
                            <td className="py-3">{order.customer}</td>
                            <td className="py-3">{order.date}</td>
                            <td className="py-3">
                              <Badge variant={
                                order.status === 'processing' ? 'default' : 
                                order.status === 'confirmed' ? 'success' : 'outline'
                              }>
                                {order.status}
                              </Badge>
                            </td>
                            <td className="py-3 text-right">{order.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">Previous</Button>
                  <Button variant="ghost" size="sm">Next</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Production Timeline</CardTitle>
                  <CardDescription>
                    Current active production stages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>WOODSMAN F Collection - Batch #542</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Cutting completed</span>
                        <span>Quality check pending</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>TRACK SKINNY - Batch #328</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Sewing in progress</span>
                        <span>Est. completion: Apr 15</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>ARTURO Collection - Batch #217</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Final inspection</span>
                        <span>Shipping tomorrow</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patterns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Patterns</CardTitle>
                  <CardDescription>
                    Most popular pattern designs over the last {activePeriod} period
                  </CardDescription>
                  <div className="flex space-x-1 mt-2">
                    <Button 
                      variant={activePeriod === 'daily' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActivePeriod('daily')}
                    >
                      Daily
                    </Button>
                    <Button 
                      variant={activePeriod === 'weekly' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActivePeriod('weekly')}
                    >
                      Weekly
                    </Button>
                    <Button 
                      variant={activePeriod === 'monthly' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActivePeriod('monthly')}
                    >
                      Monthly
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium py-2">Pattern Name</th>
                          <th className="text-left font-medium py-2">Category</th>
                          <th className="text-center font-medium py-2">Sales</th>
                          <th className="text-right font-medium py-2">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topPatterns.map((pattern, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 font-medium">{pattern.name}</td>
                            <td className="py-3">{pattern.category}</td>
                            <td className="py-3 text-center">{pattern.sales}</td>
                            <td className="py-3 text-right">{pattern.revenue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Patterns
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pattern Categories Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of pattern categories by sales volume
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[200px] w-[200px] flex items-center justify-center">
                    <FiPieChart className="h-full w-full text-gray-200" />
                    <div className="absolute text-center">
                      <div className="text-sm font-medium">Total Patterns</div>
                      <div className="text-2xl font-bold">5,247</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 justify-center">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                    Menswear: 32%
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                    Womenswear: 45%
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">
                    Streetwear: 18%
                  </Badge>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
                    Other: 5%
                  </Badge>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>
                    Key metrics across all components of the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="w-full">
                    <FiBarChart2 className="h-full w-full text-gray-200" />
                    <div className="text-center text-gray-500 mt-4">
                      Interactive analytics visualization
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>
                    Activity metrics across manufacturers, designers, and brands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Daily Active Users</span>
                        <span>832</span>
                      </div>
                      <Progress value={83} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>+12% from last week</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>New Registrations</span>
                        <span>47</span>
                      </div>
                      <Progress value={47} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>+5% from last week</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Subscription Renewals</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>+2% from last month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current status of all platform components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemComponents.map((component) => (
                  <Link to={component.path} key={component.id} className="block">
                    <div className="flex items-start p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="mr-4 mt-0.5 text-gray-500">
                        {component.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{component.name}</h4>
                          <Badge variant={
                            component.status === 'operational' ? 'success' :
                            component.status === 'degraded' ? 'warning' :
                            component.status === 'maintenance' ? 'outline' : 'destructive'
                          }>
                            {component.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{component.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest events across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New manufacturer onboarded</p>
                    <p className="text-xs text-gray-500">FashionTech Ltd. joined the platform</p>
                    <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order status updated</p>
                    <p className="text-xs text-gray-500">Order #OR-8547 marked as confirmed</p>
                    <p className="text-xs text-gray-400 mt-1">25 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-purple-500 ring-4 ring-purple-100" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New pattern uploaded</p>
                    <p className="text-xs text-gray-500">WOODSMAN Summer Collection added</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">System maintenance completed</p>
                    <p className="text-xs text-gray-500">All services running normally</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;