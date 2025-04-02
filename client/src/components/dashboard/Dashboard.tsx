import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Box, 
  ShoppingBag, 
  Truck, 
  Grid, 
  FileText, 
  PieChart, 
  Users,
  Scissors,
  Clock,
  BarChart2,
  Maximize
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

interface DashboardMetric {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

interface Process {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  dueDate: string;
}

interface ActiveOrder {
  id: string;
  customer: string;
  product: string;
  status: string;
  quantity: number;
  delivery: string;
}

const Dashboard = () => {
  const [view, setView] = useState<'grid' | 'timeline'>('grid');

  const metrics: DashboardMetric[] = [
    { 
      title: 'Total Orders', 
      value: 456, 
      change: 12.5, 
      icon: <ShoppingBag className="w-5 h-5 text-blue-600" /> 
    },
    { 
      title: 'Material Utilization', 
      value: '87%', 
      change: 3.2, 
      icon: <Layers className="w-5 h-5 text-green-600" /> 
    },
    { 
      title: 'On-time Delivery', 
      value: '94%', 
      change: -1.8, 
      icon: <Truck className="w-5 h-5 text-amber-600" /> 
    },
    { 
      title: 'Product Mix', 
      value: 32, 
      change: 8.1, 
      icon: <Grid className="w-5 h-5 text-purple-600" /> 
    }
  ];

  const processes: Process[] = [
    { 
      id: 'p1', 
      name: 'BORRIS Slim Fit - Sample Development', 
      progress: 65, 
      status: 'in-progress',
      dueDate: '2025-04-15' 
    },
    { 
      id: 'p2', 
      name: 'TRACK SKINNY - Production Run', 
      progress: 90, 
      status: 'in-progress',
      dueDate: '2025-04-10' 
    },
    { 
      id: 'p3', 
      name: 'WOODSMAN Collection - Material Sourcing', 
      progress: 30, 
      status: 'pending',
      dueDate: '2025-04-30' 
    },
    { 
      id: 'p4', 
      name: 'ARTURO - Pattern Adjustments', 
      progress: 100, 
      status: 'completed',
      dueDate: '2025-04-01' 
    }
  ];

  const activeOrders: ActiveOrder[] = [
    {
      id: 'ORD-8752',
      customer: 'Fashion Brand Co.',
      product: 'TRACK SKINNY',
      status: 'Production',
      quantity: 2500,
      delivery: '2025-05-15'
    },
    {
      id: 'ORD-8745',
      customer: 'Urban Styles Inc.',
      product: 'BORRIS',
      status: 'Sampling',
      quantity: 50,
      delivery: '2025-04-20'
    },
    {
      id: 'ORD-8741',
      customer: 'Premium Retail Ltd.',
      product: 'WOODSMAN Collection',
      status: 'Material Approval',
      quantity: 1200,
      delivery: '2025-06-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      case 'production':
        return 'bg-purple-100 text-purple-800';
      case 'sampling':
        return 'bg-indigo-100 text-indigo-800';
      case 'material approval':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Woven Supply Dashboard</h1>
          <p className="text-gray-600 mt-1">
            End-to-end management from idea to delivery
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" /> Reports
          </Button>
          <Button size="sm">
            <Box className="w-4 h-4 mr-2" /> Create Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
                {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Production Pipeline</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant={view === 'grid' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setView('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={view === 'timeline' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setView('timeline')}
                >
                  <Clock className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              Track production status across all processes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {processes.map((process) => (
                <div key={process.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{process.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(process.status)}`}>
                      {process.status.charAt(0).toUpperCase() + process.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress value={process.progress} className="flex-1" />
                    <span className="text-sm text-gray-500">{process.progress}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Due: {new Date(process.dueDate).toLocaleDateString()}</span>
                    <Link to="#" className="text-blue-600 hover:underline">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
            <CardDescription>
              Orders currently in progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeOrders.map((order, index) => (
                <div key={order.id} className={`p-3 rounded-lg ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{order.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <div className="flex justify-between mt-1 text-sm">
                    <span className="text-gray-500">Product: {order.product}</span>
                    <span className="text-gray-500">Qty: {order.quantity}</span>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span className="text-gray-500">Delivery: {new Date(order.delivery).toLocaleDateString()}</span>
                    <Link to="#" className="text-blue-600 hover:underline text-xs">Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 pb-0">
            <Button variant="ghost" className="w-full text-blue-600" size="sm">
              View All Orders
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>
              Navigate to key platform features
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-24 flex flex-col justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
              <Layers className="h-6 w-6 mb-2" />
              <span>Material Library</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
              <ShoppingBag className="h-6 w-6 mb-2" />
              <span>Marketplace</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
              <Scissors className="h-6 w-6 mb-2" />
              <span>Patterns</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
              <Truck className="h-6 w-6 mb-2" />
              <span>Logistics</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
              <FileText className="h-6 w-6 mb-2" />
              <span>BOM Builder</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
              <Users className="h-6 w-6 mb-2" />
              <span>Supplier Network</span>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <Tabs defaultValue="analytics">
              <div className="flex justify-between items-center">
                <CardTitle>Business Intelligence</CardTitle>
                <TabsList>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="forecast">Forecast</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                Track key performance metrics across your supply chain
              </CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <BarChart2 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Analytics Dashboard</h3>
                <p className="text-gray-500 mb-4 max-w-md">
                  Track performance metrics, analyze trends, and make data-driven decisions with our comprehensive analytics tools
                </p>
                <Button>
                  <Maximize className="h-4 w-4 mr-2" />
                  Open Analytics Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;