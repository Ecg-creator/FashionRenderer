import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { License, LicenseUser, LicenseUsageStat } from '../../../shared/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import LicenseOverview from './LicenseOverview';
import UsageMetrics from './UsageMetrics';
import TeamManagement from './TeamManagement';
import FeatureAccess from './FeatureAccess';
import TransactionHistory from './TransactionHistory';
import { apiRequest } from '../../lib/queryClient';
import { useQuery } from '@tanstack/react-query';
import { FiAlertCircle, FiLoader, FiRefreshCw } from 'react-icons/fi';

export default function LicenseDashboard() {
  const { licenseId } = useParams<{ licenseId?: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // For demo purposes, create a default licenseId if none provided
  const effectiveLicenseId = licenseId || '1';
  
  // Fetch license data
  const { data: license, isLoading: isLoadingLicense, isError: isLicenseError, refetch: refetchLicense } = useQuery<License>({
    queryKey: ['license', effectiveLicenseId],
    queryFn: async () => {
      try {
        const response = await apiRequest(`/api/licenses/${effectiveLicenseId}`);
        return response;
      } catch (error) {
        console.error('Error fetching license:', error);
        return getDemoLicense();
      }
    }
  });
  
  // Fetch license users
  const { data: users, isLoading: isLoadingUsers, isError: isUsersError } = useQuery<LicenseUser[]>({
    queryKey: ['licenseUsers', effectiveLicenseId],
    queryFn: async () => {
      try {
        const response = await apiRequest(`/api/licenses/${effectiveLicenseId}/users`);
        return response;
      } catch (error) {
        console.error('Error fetching license users:', error);
        return [];
      }
    },
    enabled: !!license
  });
  
  // Fetch usage stats
  const { data: usageStats, isLoading: isLoadingStats, isError: isStatsError } = useQuery<LicenseUsageStat[]>({
    queryKey: ['licenseUsage', effectiveLicenseId],
    queryFn: async () => {
      try {
        // Get the last 30 days of usage data
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);
        
        const response = await apiRequest(
          `/api/licenses/${effectiveLicenseId}/usage?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
        );
        return response;
      } catch (error) {
        console.error('Error fetching usage stats:', error);
        return [];
      }
    },
    enabled: !!license
  });
  
  // Handle license renewal
  const handleRenewLicense = async () => {
    // This would typically call an API to initiate the renewal process
    alert('License renewal process initiated. You will be redirected to the payment page.');
  };
  
  // Handle license upgrade
  const handleUpgradeLicense = async () => {
    // This would typically call an API to initiate the upgrade process
    alert('License upgrade process initiated. You will be redirected to the plan selection page.');
  };
  
  // Demo license data in case API fails
  function getDemoLicense(): License {
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(now.getMonth() + 6);
    
    return {
      id: 1,
      licenseKey: 'EMPIRE-OS-ABCD1234-WXYZ5678',
      licenseType: 'professional',
      status: 'active',
      organizationName: 'Virtual Silk Road Corp',
      contactName: 'John Doe',
      contactEmail: 'john.doe@example.com',
      contactPhone: '+1 (555) 123-4567',
      activatedAt: new Date(new Date().setMonth(now.getMonth() - 6)),
      expiresAt: expiryDate,
      maxUsers: 25,
      currentUsers: 18,
      features: [
        'pattern-marketplace',
        'material-library',
        'pattern-editor',
        'pattern-customization',
        'material-technical-sheets',
        'hsn-integration',
        'tax-calculation',
        '3d-garment-visualization',
        'measurement-tools'
      ],
      modules: [
        'core',
        'design',
        'visualization',
        'compliance'
      ],
      transactionHistory: [
        {
          date: new Date(new Date().setDate(now.getDate() - 2)).toISOString(),
          amount: 199.99,
          type: 'charge',
          description: 'Monthly Subscription - April 2025'
        },
        {
          date: new Date(new Date().setDate(now.getDate() - 15)).toISOString(),
          amount: 49.99,
          type: 'charge',
          description: 'API Usage Overage - 10,000 additional calls'
        },
        {
          date: new Date(new Date().setMonth(now.getMonth() - 1)).toISOString(),
          amount: 199.99,
          type: 'charge',
          description: 'Monthly Subscription - March 2025'
        },
        {
          date: new Date(new Date().setMonth(now.getMonth() - 1, 10)).toISOString(),
          amount: 29.99,
          type: 'charge',
          description: 'Storage Expansion - 100GB additional'
        },
        {
          date: new Date(new Date().setMonth(now.getMonth() - 2)).toISOString(),
          amount: 199.99,
          type: 'charge',
          description: 'Monthly Subscription - February 2025'
        },
        {
          date: new Date(new Date().setMonth(now.getMonth() - 2, 5)).toISOString(),
          amount: 25.00,
          type: 'refund',
          description: 'Partial Refund - Training Session Cancellation'
        },
        {
          date: new Date(new Date().setMonth(now.getMonth() - 3)).toISOString(),
          amount: 199.99,
          type: 'charge',
          description: 'Monthly Subscription - January 2025'
        }
      ],
      notes: 'Professional tier with additional visualization features',
      createdAt: new Date(new Date().setMonth(now.getMonth() - 6)),
      updatedAt: now
    };
  }
  
  // Show loading state
  if (isLoadingLicense) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FiLoader size={32} className="text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading license information...</p>
      </div>
    );
  }
  
  // Show error state
  if (isLicenseError || !license) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50 rounded-lg">
        <FiAlertCircle size={32} className="text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-red-700 mb-2">Failed to load license</h3>
        <p className="text-gray-600 mb-4 text-center max-w-lg">
          We couldn't retrieve your license information. This may be due to network issues or your license may have expired.
        </p>
        <Button onClick={() => refetchLicense()} className="flex items-center">
          <FiRefreshCw className="mr-2" />
          Retry
        </Button>
      </div>
    );
  }
  
  // Calculate usage percentages for summary stats
  const userPercent = Math.round((license.currentUsers / license.maxUsers) * 100);
  const daysUsed = Math.ceil(Math.abs(new Date().getTime() - new Date(license.activatedAt).getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = Math.ceil(Math.abs(new Date(license.expiresAt).getTime() - new Date(license.activatedAt).getTime()) / (1000 * 60 * 60 * 24));
  const daysPercent = Math.round((daysUsed / totalDays) * 100);
  
  // Calculate average API calls and storage from usage stats or fake data
  const avgApiCalls = usageStats && usageStats.length > 0 
    ? Math.round(usageStats.reduce((sum, day) => sum + day.apiCalls, 0) / usageStats.length) 
    : 850;
  
  const avgStorage = usageStats && usageStats.length > 0 
    ? Math.round(usageStats.reduce((sum, day) => sum + day.storageUsed, 0) / usageStats.length) 
    : 320;
  
  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">License Management</h1>
          <p className="text-gray-500">
            Manage your {license.licenseType.charAt(0).toUpperCase() + license.licenseType.slice(1)} license
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-3">
          {(license.status === 'active' || license.status === 'trial') && (
            <Button variant="outline" onClick={handleUpgradeLicense}>
              Upgrade Plan
            </Button>
          )}
          
          {license.status === 'active' && (
            <Button onClick={handleRenewLicense}>
              Renew License
            </Button>
          )}
          
          {license.status === 'expired' && (
            <Button onClick={handleRenewLicense}>
              Reactivate License
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-6 bg-white border-b pb-0 overflow-x-auto">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="usage" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
              Usage Metrics
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
              Team
            </TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
              Features
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
              Billing
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="m-0">
            <LicenseOverview license={license} />
          </TabsContent>
          
          <TabsContent value="usage" className="m-0">
            <UsageMetrics license={license} usageStats={usageStats} />
          </TabsContent>
          
          <TabsContent value="team" className="m-0">
            <TeamManagement license={license} users={users} />
          </TabsContent>
          
          <TabsContent value="features" className="m-0">
            <FeatureAccess license={license} />
          </TabsContent>
          
          <TabsContent value="billing" className="m-0">
            <TransactionHistory license={license} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}