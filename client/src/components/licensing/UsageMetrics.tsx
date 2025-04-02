import React from 'react';
import { License, LicenseUsageStat } from '../../../shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FiActivity, FiDatabase, FiServer, FiShoppingCart } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UsageMetricsProps {
  license: License;
  usageStats?: LicenseUsageStat[];
}

export default function UsageMetrics({ license, usageStats = [] }: UsageMetricsProps) {
  // Generate demo data if no stats provided
  const demoUsageData = React.useMemo(() => {
    if (usageStats && usageStats.length > 0) return usageStats;
    
    // Generate last 30 days of mock data
    const mockData: LicenseUsageStat[] = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      
      // Generate some random values that follow a general trend upward
      const baseUsers = Math.max(2, Math.min(license.currentUsers - 3, license.currentUsers * 0.7));
      const baseCalls = 120;
      const baseStorage = 100;
      const baseTxns = 25;
      
      // Add some random variation, weighted more heavily toward the end
      const dayFactor = 1 + (i / 30) * 2; // Higher factor for more recent days
      const randomFactor = () => 0.7 + Math.random() * 0.6; // Random between 0.7 and 1.3
      
      mockData.push({
        id: i + 1,
        licenseId: license.id,
        date: date,
        activeUsers: Math.min(license.currentUsers, Math.round(baseUsers * randomFactor() * dayFactor)),
        apiCalls: Math.round(baseCalls * randomFactor() * dayFactor),
        storageUsed: Math.round(baseStorage * randomFactor() * dayFactor),
        transactionsProcessed: Math.round(baseTxns * randomFactor() * dayFactor)
      });
    }
    
    return mockData;
  }, [license, usageStats]);
  
  // Process data for charts
  const chartData = React.useMemo(() => {
    return demoUsageData.map(stat => ({
      date: new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      activeUsers: stat.activeUsers,
      apiCalls: stat.apiCalls,
      storageUsed: stat.storageUsed,
      transactionsProcessed: stat.transactionsProcessed
    }));
  }, [demoUsageData]);

  // Create summary metrics
  const summaryMetrics = React.useMemo(() => {
    if (chartData.length === 0) return { users: 0, calls: 0, storage: 0, transactions: 0 };
    
    // Get last 7 days of data
    const lastWeekData = chartData.slice(-7);
    
    // Calculate averages
    const users = Math.round(lastWeekData.reduce((sum, day) => sum + day.activeUsers, 0) / lastWeekData.length);
    const calls = Math.round(lastWeekData.reduce((sum, day) => sum + day.apiCalls, 0) / lastWeekData.length);
    const storage = Math.round(lastWeekData.reduce((sum, day) => sum + day.storageUsed, 0) / lastWeekData.length);
    const transactions = Math.round(lastWeekData.reduce((sum, day) => sum + day.transactionsProcessed, 0) / lastWeekData.length);
    
    return { users, calls, storage, transactions };
  }, [chartData]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Usage Metrics</CardTitle>
        <CardDescription>Analytics and usage statistics for your license</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="bg-blue-50 p-2 rounded-full mr-2">
                <FiUsers className="text-blue-500" size={16} />
              </div>
              <span className="text-sm font-medium text-gray-600">Active Users</span>
            </div>
            <div className="text-2xl font-semibold">{summaryMetrics.users}</div>
            <div className="text-xs text-gray-500 mt-1">7-day average</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="bg-green-50 p-2 rounded-full mr-2">
                <FiActivity className="text-green-500" size={16} />
              </div>
              <span className="text-sm font-medium text-gray-600">API Calls</span>
            </div>
            <div className="text-2xl font-semibold">{summaryMetrics.calls}</div>
            <div className="text-xs text-gray-500 mt-1">7-day average</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="bg-purple-50 p-2 rounded-full mr-2">
                <FiDatabase className="text-purple-500" size={16} />
              </div>
              <span className="text-sm font-medium text-gray-600">Storage (MB)</span>
            </div>
            <div className="text-2xl font-semibold">{summaryMetrics.storage}</div>
            <div className="text-xs text-gray-500 mt-1">7-day average</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="bg-amber-50 p-2 rounded-full mr-2">
                <FiShoppingCart className="text-amber-500" size={16} />
              </div>
              <span className="text-sm font-medium text-gray-600">Transactions</span>
            </div>
            <div className="text-2xl font-semibold">{summaryMetrics.transactions}</div>
            <div className="text-xs text-gray-500 mt-1">7-day average</div>
          </div>
        </div>
        
        <Tabs defaultValue="users" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="api">API Calls</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="activeUsers" stroke="#0047AB" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="api" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="apiCalls" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="storage" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="storageUsed" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="transactions" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="transactionsProcessed" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Missing icon definition
const FiUsers = (props: any) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
};